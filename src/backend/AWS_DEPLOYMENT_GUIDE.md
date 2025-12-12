# 🚀 Letwash AWS Deployment Guide

Bu rehber, Letwash backend'ini AWS üzerinde production'a çıkarmanız için adım adım talimatlar içerir.

---

## 📋 Ön Gereksinimler

- AWS hesabı (aktif)
- AWS CLI yüklü ([İndirin](https://aws.amazon.com/cli/))
- Docker yüklü
- Node.js 18+ yüklü

---

## 🗄️ Adım 1: AWS RDS PostgreSQL Database Oluşturma

### 1.1 AWS Console'a giriş yapın
- [AWS RDS Console](https://console.aws.amazon.com/rds/) açın

### 1.2 Database oluşturun
```
1. "Create database" butonuna tıklayın
2. Engine type: PostgreSQL (15.x önerilir)
3. Template: 
   - Development/Test (küçük projeler için)
   - Production (ölçeklenebilir projeler için)
4. DB instance identifier: letwash-db
5. Master username: letwash_admin
6. Master password: [Güçlü bir şifre oluşturun]
7. DB instance class:
   - db.t3.micro (Free Tier, test için)
   - db.t3.small (küçük production)
   - db.t3.medium (orta ölçek)
8. Storage:
   - Allocated storage: 20 GB
   - Enable storage autoscaling: ✅
9. Connectivity:
   - Public access: Yes (geçici olarak, sonra VPC ile koruyacağız)
   - VPC security group: Yeni oluştur
10. Additional configuration:
    - Initial database name: letwash
11. "Create database" butonuna tıklayın
```

### 1.3 Database endpoint'i kaydedin
```
Endpoint: letwash-db.xxxxx.us-east-1.rds.amazonaws.com
Port: 5432
```

### 1.4 Security Group ayarları
```
1. RDS instance'ınızı seçin
2. "VPC security groups" kısmına tıklayın
3. Inbound rules > Edit inbound rules
4. Add rule:
   - Type: PostgreSQL
   - Port: 5432
   - Source: Your IP (geliştirme için)
   - Source: EC2 Security Group (production için)
```

---

## 🔐 Adım 2: Database Migration

### 2.1 .env dosyasını düzenleyin
```bash
cd backend
cp .env.example .env
```

`.env` dosyasını açın ve düzenleyin:
```env
DATABASE_URL="postgresql://letwash_admin:YOUR_PASSWORD@letwash-db.xxxxx.us-east-1.rds.amazonaws.com:5432/letwash?schema=public"
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

### 2.2 Bağımlılıkları yükleyin
```bash
npm install
```

### 2.3 Prisma migration'larını çalıştırın
```bash
# Migration dosyalarını oluştur
npx prisma migrate dev --name init

# Production'a deploy et
npx prisma migrate deploy

# Prisma Studio ile kontrol edin
npx prisma studio
```

---

## 📧 Adım 3: AWS SES (Email) Kurulumu

### 3.1 SES Console'a gidin
- [AWS SES Console](https://console.aws.amazon.com/ses/)

### 3.2 Email adresini doğrulayın
```
1. "Verified identities" > "Create identity"
2. Identity type: Email address
3. Email: noreply@letwash.com (veya kendi domain'inizden)
4. "Create identity" tıklayın
5. Gelen doğrulama emailini onaylayın
```

### 3.3 Production Access için başvuru yapın
```
SES başlangıçta "Sandbox Mode"dadır, sadece doğrulanmış emaillere gönderim yapar.

Production için:
1. SES Console > "Account dashboard"
2. "Request production access" butonuna tıklayın
3. Formu doldurun (genellikle 24 saat içinde onaylanır)
```

---

## 📱 Adım 4: AWS SNS (SMS) Kurulumu

### 4.1 SNS Console'a gidin
- [AWS SNS Console](https://console.aws.amazon.com/sns/)

### 4.2 SMS ayarlarını yapın
```
1. "Text messaging (SMS)" > "SMS settings"
2. Default message type: Transactional
3. Monthly spend limit: $10 (başlangıç için)
4. "Save changes"
```

### 4.3 SMS gönderme izni alın
```
SMS gönderimi için özel izin gerekebilir:
1. Support Center > "Create case"
2. Type: Service limit increase
3. Limit type: SNS Text Messaging
4. Region: Your region
5. Açıklama: "SMS notifications için limit artırımı"
```

---

## 🪣 Adım 5: AWS S3 (File Storage) Kurulumu

### 5.1 S3 Bucket oluşturun
```bash
# AWS CLI ile
aws s3 mb s3://letwash-uploads --region us-east-1
```

Ya da Console'dan:
```
1. S3 Console > "Create bucket"
2. Bucket name: letwash-uploads (globally unique olmalı)
3. Region: us-east-1 (veya tercih ettiğiniz region)
4. Block Public Access: Kapat (public uploads için)
5. "Create bucket"
```

### 5.2 CORS ayarlarını yapın
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://app.letwash.com", "http://localhost:5173"],
    "ExposeHeaders": ["ETag"]
  }
]
```

Bucket > Permissions > CORS configuration'a yapıştırın.

---

## 🚢 Adım 6: Backend Deployment Seçenekleri

### Seçenek A: AWS Elastic Beanstalk (Kolay) ⭐ ÖNERİLİR

#### 6.1 EB CLI'yi yükleyin
```bash
pip install awsebcli --upgrade
```

#### 6.2 EB uygulaması oluşturun
```bash
cd backend

# Initialize
eb init -p node.js-18 letwash-api --region us-east-1

# Create environment
eb create letwash-api-prod \
  --instance-type t3.small \
  --envvars \
    NODE_ENV=production,\
    DATABASE_URL="postgresql://...",\
    JWT_SECRET="your-secret",\
    AWS_REGION=us-east-1
```

#### 6.3 Deploy edin
```bash
eb deploy
```

#### 6.4 Environment variables ekleyin
```bash
eb setenv \
  DATABASE_URL="your-database-url" \
  JWT_SECRET="your-jwt-secret" \
  AWS_ACCESS_KEY_ID="your-key" \
  AWS_SECRET_ACCESS_KEY="your-secret" \
  AWS_S3_BUCKET="letwash-uploads" \
  AWS_SES_FROM_EMAIL="noreply@letwash.com"
```

---

### Seçenek B: AWS ECS Fargate (Scalable)

#### 6.1 ECR Repository oluşturun
```bash
aws ecr create-repository --repository-name letwash-api --region us-east-1
```

#### 6.2 Docker image'ı build edin ve push edin
```bash
# ECR'ye login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t letwash-api .

# Tag image
docker tag letwash-api:latest YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-api:latest

# Push image
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-api:latest
```

#### 6.3 ECS Cluster oluşturun
```
1. ECS Console > "Clusters" > "Create cluster"
2. Cluster name: letwash-cluster
3. Infrastructure: AWS Fargate
4. "Create"
```

#### 6.4 Task Definition oluşturun
```json
{
  "family": "letwash-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [
    {
      "name": "letwash-api",
      "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/letwash-api:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "PORT", "value": "5000"}
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT_ID:secret:letwash/database-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/letwash-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### 6.5 Service oluşturun
```
1. Cluster > "Services" > "Create"
2. Launch type: Fargate
3. Task Definition: letwash-api
4. Service name: letwash-api-service
5. Desired tasks: 2
6. Load balancer: Application Load Balancer
7. Target group: Create new (port 5000)
8. Health check: /health
9. "Create service"
```

---

### Seçenek C: AWS EC2 (Traditional)

#### 6.1 EC2 Instance başlatın
```
1. EC2 Console > "Launch instance"
2. Name: letwash-api-server
3. AMI: Amazon Linux 2023
4. Instance type: t3.small
5. Key pair: Oluşturun veya mevcut olanı seçin
6. Security group:
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere
   - HTTPS (443) - Anywhere
   - Custom TCP (5000) - Anywhere (geçici)
7. "Launch instance"
```

#### 6.2 Server'a bağlanın
```bash
ssh -i your-key.pem ec2-user@your-instance-public-ip
```

#### 6.3 Node.js ve PM2 yükleyin
```bash
# Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# PM2
sudo npm install -g pm2

# Git
sudo yum install -y git
```

#### 6.4 Backend'i deploy edin
```bash
# Clone repository (veya SCP ile upload)
git clone https://github.com/your-repo/letwash-backend.git
cd letwash-backend

# Install dependencies
npm ci --only=production

# .env dosyasını oluşturun
nano .env
# Environment variables'ları yapıştırın

# Prisma migrate
npx prisma migrate deploy

# PM2 ile başlatın
pm2 start src/index.js --name letwash-api
pm2 save
pm2 startup
```

#### 6.5 Nginx Reverse Proxy (Opsiyonel)
```bash
sudo yum install -y nginx

sudo nano /etc/nginx/conf.d/letwash.conf
```

```nginx
server {
    listen 80;
    server_name api.letwash.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 🌐 Adım 7: Domain & SSL

### 7.1 Route 53 ile Domain yönlendirme
```
1. Route 53 Console > "Hosted zones"
2. Domain'inizi seçin
3. "Create record"
4. Record name: api
5. Record type: A (veya CNAME)
6. Value: 
   - EC2 Public IP (EC2 için)
   - Load Balancer DNS (ECS için)
   - Elastic Beanstalk URL (EB için)
7. "Create records"
```

### 7.2 SSL Certificate (AWS Certificate Manager)
```
1. ACM Console > "Request certificate"
2. Domain names: 
   - api.letwash.com
   - *.letwash.com (wildcard)
3. Validation method: DNS validation
4. "Request"
5. Route 53'te CNAME record'u oluşturun (otomatik olabilir)
6. Certificate'i Load Balancer'a ekleyin
```

---

## 📊 Adım 8: Monitoring & Logs

### 8.1 CloudWatch Logs
```
Otomatik olarak oluşturulur:
- /aws/elasticbeanstalk/letwash-api-prod
- /ecs/letwash-api
```

### 8.2 CloudWatch Alarms
```
1. CloudWatch Console > "Alarms" > "Create alarm"
2. Metric: 
   - CPUUtilization > 80%
   - MemoryUtilization > 80%
   - HTTPCode_Target_5XX_Count > 10
3. Actions: SNS topic (email notification)
```

---

## 💰 Maliyet Tahmini

### Minimal Setup (Development/Test)
```
- RDS db.t3.micro: $15/ay
- EC2 t3.small: $15/ay
- S3: $1/ay
- SES: $0.10/1000 email
- SNS: $0.00645/SMS (Türkiye)
─────────────────────────
TOPLAM: ~$31/ay
```

### Production Setup (Recommended)
```
- RDS db.t3.small: $30/ay
- ECS Fargate (2 tasks): $30/ay
- ALB: $20/ay
- S3: $5/ay
- CloudWatch: $5/ay
- Route 53: $0.50/ay
- Data Transfer: $10/ay
─────────────────────────
TOPLAM: ~$100/ay
```

---

## 🔒 Güvenlik Best Practices

### 1. Environment Variables
```bash
# AWS Secrets Manager kullanın
aws secretsmanager create-secret \
  --name letwash/database-url \
  --secret-string "postgresql://..."
```

### 2. IAM Roles
```
EC2/ECS için IAM role oluşturun:
- S3: Read/Write access to letwash-uploads bucket
- SES: Send email permission
- SNS: Publish SMS permission
- CloudWatch: Logs write permission
```

### 3. Security Groups
```
- Database: Sadece backend security group'undan erişim
- Backend: Sadece Load Balancer'dan erişim
- Load Balancer: Public (80, 443)
```

### 4. VPC Configuration
```
- Public Subnet: Load Balancer
- Private Subnet: Backend, Database
- NAT Gateway: Internet erişimi için
```

---

## 🚀 Deployment Checklist

- [ ] RDS PostgreSQL oluşturuldu
- [ ] Database migrate edildi
- [ ] S3 bucket oluşturuldu
- [ ] SES email doğrulandı
- [ ] SNS SMS ayarlandı
- [ ] Backend deploy edildi (EB/ECS/EC2)
- [ ] Environment variables ayarlandı
- [ ] Domain yönlendirme yapıldı
- [ ] SSL certificate kuruldu
- [ ] CloudWatch alarms kuruldu
- [ ] Backup stratejisi oluşturuldu
- [ ] Load testing yapıldı

---

## 📞 Yardım & Destek

Herhangi bir sorun yaşarsanız:
1. CloudWatch Logs'u kontrol edin
2. Health check endpoint'ini test edin: `https://api.letwash.com/health`
3. AWS Support'a başvurun (Business/Enterprise plan gerekebilir)

**İyi şanslar! 🚀**
