# 🚀 AWS DEPLOYMENT GUIDE - LETWASH PLATFORM

## 📋 OVERVIEW

This guide will help you deploy the Letwash platform to AWS with a production-ready infrastructure.

### Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    USERS (Customers)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Route 53 (DNS)                                  │
│              - app.letwash.com                               │
│              - api.letwash.com                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌───────────────┐            ┌────────────────┐
│  CloudFront   │            │  CloudFront    │
│  + WAF        │            │  + WAF         │
│  (Frontend)   │            │  (API)         │
└───────┬───────┘            └────────┬───────┘
        │                             │
        ▼                             ▼
┌───────────────┐            ┌────────────────┐
│  S3 Bucket    │            │  ALB           │
│  (Static)     │            │  (Load Bal.)   │
└───────────────┘            └────────┬───────┘
                                      │
                             ┌────────┴────────┐
                             │                 │
                             ▼                 ▼
                      ┌──────────┐      ┌──────────┐
                      │  ECS     │      │  ECS     │
                      │  Task 1  │      │  Task 2  │
                      └────┬─────┘      └────┬─────┘
                           │                 │
                           └────────┬────────┘
                                    ▼
                           ┌─────────────────┐
                           │  RDS PostgreSQL │
                           │  (Multi-AZ)     │
                           └─────────────────┘
```

---

## 🎯 DEPLOYMENT STEPS

### PHASE 1: INFRASTRUCTURE SETUP (30 mins)

#### 1.1 Create RDS PostgreSQL Database

```bash
# Create DB subnet group
aws rds create-db-subnet-group \
  --db-subnet-group-name letwash-db-subnet \
  --db-subnet-group-description "Letwash DB Subnet Group" \
  --subnet-ids subnet-xxx subnet-yyy

# Create security group for RDS
aws ec2 create-security-group \
  --group-name letwash-db-sg \
  --description "Letwash Database Security Group" \
  --vpc-id vpc-xxx

# Allow PostgreSQL access from backend security group
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 5432 \
  --source-group sg-backend-xxx

# Create RDS instance (Staging - small)
aws rds create-db-instance \
  --db-instance-identifier letwash-db-staging \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 15.4 \
  --master-username letwash_admin \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 20 \
  --storage-type gp3 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name letwash-db-subnet \
  --backup-retention-period 7 \
  --preferred-backup-window "03:00-04:00" \
  --preferred-maintenance-window "sun:04:00-sun:05:00" \
  --publicly-accessible false

# Create RDS instance (Production - Multi-AZ)
aws rds create-db-instance \
  --db-instance-identifier letwash-db-prod \
  --db-instance-class db.t3.small \
  --engine postgres \
  --engine-version 15.4 \
  --master-username letwash_admin \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 50 \
  --storage-type gp3 \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name letwash-db-subnet \
  --backup-retention-period 30 \
  --multi-az \
  --publicly-accessible false

# Wait for DB to be available (takes ~5-10 mins)
aws rds wait db-instance-available --db-instance-identifier letwash-db-staging
```

**Get Database Endpoint:**
```bash
aws rds describe-db-instances \
  --db-instance-identifier letwash-db-staging \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text

# Output: letwash-db-staging.xxx.rds.amazonaws.com
```

---

#### 1.2 Create ECR Repositories

```bash
# Create ECR repository for backend
aws ecr create-repository \
  --repository-name letwash-backend \
  --region us-east-1

# Create ECR repository for frontend (optional, if using Docker)
aws ecr create-repository \
  --repository-name letwash-frontend \
  --region us-east-1

# Get login command
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

---

#### 1.3 Create S3 Bucket for Frontend

```bash
# Create S3 bucket
aws s3 mb s3://letwash-app-frontend --region us-east-1

# Enable static website hosting
aws s3 website s3://letwash-app-frontend \
  --index-document index.html \
  --error-document index.html

# Set bucket policy (public read)
cat > bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::letwash-app-frontend/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket letwash-app-frontend \
  --policy file://bucket-policy.json
```

---

#### 1.4 Create CloudFront Distribution

```bash
# Frontend CloudFront
aws cloudfront create-distribution \
  --origin-domain-name letwash-app-frontend.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html

# Get distribution ID
aws cloudfront list-distributions \
  --query 'DistributionList.Items[0].Id' \
  --output text
```

---

### PHASE 2: BACKEND DEPLOYMENT (1 hour)

#### 2.1 Build and Push Docker Image

```bash
cd backend

# Build Docker image
docker build -t letwash-backend:latest .

# Tag for ECR
docker tag letwash-backend:latest \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-backend:latest

# Push to ECR
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-backend:latest
```

---

#### 2.2 Create ECS Cluster & Service

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name letwash-cluster

# Create task definition
cat > task-definition.json <<EOF
{
  "family": "letwash-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "letwash-backend",
      "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "PORT",
          "value": "5000"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:xxx:secret:letwash/database-url"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:xxx:secret:letwash/jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/letwash-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
EOF

aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create ECS service
aws ecs create-service \
  --cluster letwash-cluster \
  --service-name letwash-backend-service \
  --task-definition letwash-backend \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx,subnet-yyy],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

---

#### 2.3 Create Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name letwash-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx \
  --scheme internet-facing

# Create target group
aws elbv2 create-target-group \
  --name letwash-backend-tg \
  --protocol HTTP \
  --port 5000 \
  --vpc-id vpc-xxx \
  --target-type ip \
  --health-check-path /health

# Create listener
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:... \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...
```

---

### PHASE 3: DATABASE MIGRATIONS (15 mins)

```bash
cd backend

# Set DATABASE_URL
export DATABASE_URL="postgresql://letwash_admin:PASSWORD@letwash-db-staging.xxx.rds.amazonaws.com:5432/letwash"

# Run migrations
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

---

### PHASE 4: FRONTEND DEPLOYMENT (30 mins)

```bash
cd ..  # root directory

# Create .env file
cat > .env <<EOF
VITE_API_BASE_URL=https://api.letwash.com/api/v1
VITE_APP_ENV=production
EOF

# Install dependencies
npm install

# Build frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://letwash-app-frontend --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

### PHASE 5: DNS CONFIGURATION (15 mins)

```bash
# Create hosted zone (if not exists)
aws route53 create-hosted-zone --name letwash.com

# Get CloudFront domain name
CLOUDFRONT_DOMAIN=$(aws cloudfront list-distributions \
  --query 'DistributionList.Items[0].DomainName' \
  --output text)

# Create A record for frontend
cat > create-record-frontend.json <<EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "app.letwash.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "$CLOUDFRONT_DOMAIN",
          "EvaluateTargetHealth": false
        }
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch file://create-record-frontend.json

# Create A record for backend (ALB)
ALB_DOMAIN=$(aws elbv2 describe-load-balancers \
  --names letwash-alb \
  --query 'LoadBalancers[0].DNSName' \
  --output text)

# Similar for api.letwash.com...
```

---

### PHASE 6: SSL CERTIFICATES (30 mins)

```bash
# Request certificate
aws acm request-certificate \
  --domain-name letwash.com \
  --subject-alternative-names *.letwash.com \
  --validation-method DNS

# Get validation records
aws acm describe-certificate \
  --certificate-arn YOUR_CERT_ARN

# Add DNS validation records in Route 53
# (follow AWS console instructions)

# Wait for validation
aws acm wait certificate-validated --certificate-arn YOUR_CERT_ARN

# Update CloudFront to use HTTPS
# Update ALB listener to use HTTPS
```

---

### PHASE 7: SECRETS MANAGEMENT

```bash
# Create secrets in AWS Secrets Manager
aws secretsmanager create-secret \
  --name letwash/database-url \
  --secret-string "postgresql://letwash_admin:PASSWORD@letwash-db-prod.xxx.rds.amazonaws.com:5432/letwash"

aws secretsmanager create-secret \
  --name letwash/jwt-secret \
  --secret-string "$(openssl rand -base64 32)"

aws secretsmanager create-secret \
  --name letwash/google-oauth \
  --secret-string '{"clientId":"xxx","clientSecret":"yyy"}'

# Repeat for other secrets...
```

---

## 📊 POST-DEPLOYMENT CHECKLIST

### Security
- [ ] All secrets in AWS Secrets Manager
- [ ] HTTPS enabled on all endpoints
- [ ] WAF rules configured
- [ ] Security groups properly configured
- [ ] Database not publicly accessible
- [ ] CORS configured correctly

### Monitoring
- [ ] CloudWatch alarms set up
- [ ] Log groups created
- [ ] Sentry/error tracking enabled
- [ ] Performance monitoring configured
- [ ] Uptime monitoring enabled

### Backup & Recovery
- [ ] RDS automated backups enabled
- [ ] Database snapshots scheduled
- [ ] S3 versioning enabled
- [ ] Disaster recovery plan documented

### Performance
- [ ] CloudFront caching configured
- [ ] Database indexes created
- [ ] Connection pooling enabled
- [ ] Auto-scaling configured

---

## 💰 COST BREAKDOWN (Monthly Estimates)

### Staging Environment
| Service | Configuration | Cost |
|---------|--------------|------|
| RDS PostgreSQL | db.t3.micro | $15 |
| ECS Fargate | 2 tasks (0.5 vCPU, 1 GB) | $30 |
| ALB | 1 ALB | $20 |
| S3 + CloudFront | ~10GB transfer | $5 |
| **Total** | | **~$70/month** |

### Production Environment
| Service | Configuration | Cost |
|---------|--------------|------|
| RDS PostgreSQL | db.t3.small (Multi-AZ) | $60 |
| ECS Fargate | 4 tasks (1 vCPU, 2 GB) | $120 |
| ALB | 1 ALB | $20 |
| S3 + CloudFront | ~100GB transfer | $20 |
| Route 53 | 2 hosted zones | $1 |
| Secrets Manager | ~10 secrets | $4 |
| CloudWatch | Logs + Metrics | $10 |
| **Total** | | **~$235/month** |

---

## 🔧 MAINTENANCE

### Weekly
- Check CloudWatch logs for errors
- Review security group rules
- Monitor database performance

### Monthly
- Review AWS costs
- Update dependencies
- Database backup verification
- Security audit

---

## 🆘 TROUBLESHOOTING

### Backend not responding
```bash
# Check ECS tasks
aws ecs list-tasks --cluster letwash-cluster
aws ecs describe-tasks --cluster letwash-cluster --tasks TASK_ARN

# Check logs
aws logs tail /ecs/letwash-backend --follow
```

### Database connection issues
```bash
# Test connectivity from backend
aws ecs execute-command \
  --cluster letwash-cluster \
  --task TASK_ARN \
  --container letwash-backend \
  --interactive \
  --command "/bin/sh"

# Inside container:
nc -zv letwash-db-staging.xxx.rds.amazonaws.com 5432
```

### Frontend not loading
```bash
# Check S3 bucket
aws s3 ls s3://letwash-app-frontend

# Check CloudFront distribution
aws cloudfront get-distribution --id YOUR_DIST_ID

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

## 📞 SUPPORT

- AWS Documentation: https://docs.aws.amazon.com
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment
- ECS Best Practices: https://docs.aws.amazon.com/ecs/

---

**🎉 Deployment Complete! Your production environment is live!**
