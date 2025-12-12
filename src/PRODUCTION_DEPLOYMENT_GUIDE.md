# 🚀 Letwash - Production Deployment Guide

**Eksiksiz production deployment rehberi**

---

## 📋 İçindekiler

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Server Requirements](#server-requirements)
3. [SSL/TLS Setup](#ssltls-setup)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [Docker Deployment](#docker-deployment)
7. [Domain & DNS](#domain--dns)
8. [Monitoring & Logging](#monitoring--logging)
9. [Backup Strategy](#backup-strategy)
10. [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

### **Security**

- [ ] All environment variables use strong, unique secrets
- [ ] JWT secrets are minimum 64 characters
- [ ] Database password is strong (min 32 chars)
- [ ] `.env` files are in `.gitignore`
- [ ] SSL/TLS certificates are ready
- [ ] Stripe using LIVE keys (not test keys)
- [ ] Rate limiting configured
- [ ] CORS origins restricted to production domains

### **Configuration**

- [ ] `NODE_ENV=production` in backend
- [ ] `VITE_ENABLE_DEMO_MODE=false` in frontend
- [ ] Production database URL configured
- [ ] Email SMTP credentials configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Google Analytics) configured

### **Testing**

- [ ] All features tested in staging environment
- [ ] Payment flow tested with Stripe test mode
- [ ] Database migrations tested
- [ ] Backup/restore tested
- [ ] Load testing completed

---

## 💻 Server Requirements

### **Minimum Requirements**

| Resource | Minimum | Recommended |
|----------|---------|-------------|
| **CPU** | 2 cores | 4 cores |
| **RAM** | 4GB | 8GB |
| **Storage** | 50GB SSD | 100GB SSD |
| **Bandwidth** | 100Mbps | 1Gbps |
| **OS** | Ubuntu 20.04+ | Ubuntu 22.04 LTS |

### **Software Requirements**

```bash
# Docker
Docker version 24.0+
Docker Compose version 2.0+

# Optional (for non-Docker deployment)
Node.js 18+
PostgreSQL 15+
Nginx 1.18+
```

---

## 🔒 SSL/TLS Setup

### **Option 1: Let's Encrypt (Free)**

```bash
# Install Certbot
sudo apt update
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Certificates will be in:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem

# Copy to project
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./nginx/ssl/key.pem

# Set permissions
sudo chown $USER:$USER ./nginx/ssl/*.pem
chmod 600 ./nginx/ssl/*.pem
```

### **Option 2: Commercial Certificate**

```bash
# Create directory
mkdir -p ./nginx/ssl

# Copy your certificates
cp /path/to/certificate.crt ./nginx/ssl/cert.pem
cp /path/to/private.key ./nginx/ssl/key.pem

# Set permissions
chmod 600 ./nginx/ssl/*.pem
```

### **Auto-Renewal (Let's Encrypt)**

```bash
# Test renewal
sudo certbot renew --dry-run

# Add cron job for auto-renewal
sudo crontab -e

# Add this line (renew twice daily)
0 0,12 * * * certbot renew --quiet --post-hook "cp /etc/letsencrypt/live/yourdomain.com/*.pem /path/to/letwash/nginx/ssl/ && docker-compose restart frontend"
```

---

## 🗄️ Database Setup

### **Create Production Database**

```bash
# SSH to server
ssh user@your-server

# Install PostgreSQL (if not using Docker)
sudo apt update
sudo apt install postgresql-15

# Create database
sudo -u postgres psql

postgres=# CREATE DATABASE letwash;
postgres=# CREATE USER letwash WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD';
postgres=# GRANT ALL PRIVILEGES ON DATABASE letwash TO letwash;
postgres=# \q
```

### **Run Migrations**

```bash
# Using Docker
docker exec -it letwash-backend-prod npx prisma migrate deploy

# OR directly
cd backend
npx prisma migrate deploy
```

### **Seed Initial Data (Optional)**

```bash
# Production seed (admin user, subscription tiers, etc.)
docker exec -it letwash-backend-prod npm run seed:prod
```

---

## 🔐 Environment Configuration

### **Step 1: Copy Production Template**

```bash
cp .env.production.example .env.production
```

### **Step 2: Generate Strong Secrets**

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate refresh token secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate session secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **Step 3: Fill in Environment Variables**

```bash
# Edit .env.production
nano .env.production

# Required variables:
# - POSTGRES_PASSWORD (strong password)
# - JWT_SECRET (64 char hex)
# - REFRESH_TOKEN_SECRET (64 char hex)
# - SESSION_SECRET (64 char hex)
# - CORS_ORIGIN (your domain)
# - FRONTEND_URL (your domain)
# - STRIPE_SECRET_KEY (sk_live_...)
# - STRIPE_PUBLISHABLE_KEY (pk_live_...)
# - STRIPE_WEBHOOK_SECRET (whsec_...)
```

### **Step 4: Verify Configuration**

```bash
# Check all required variables are set
grep -E "CHANGE_THIS|YOUR_" .env.production

# Should return nothing if all filled
```

---

## 🐳 Docker Deployment

### **Step 1: Clone Repository**

```bash
# On server
cd /var/www
git clone https://github.com/yourcompany/letwash.git
cd letwash
```

### **Step 2: Setup Environment**

```bash
# Copy production env
cp .env.production.example .env.production

# Edit with your values
nano .env.production

# Copy to .env for docker-compose
cp .env.production .env
```

### **Step 3: Build & Deploy**

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# Expected output:
# letwash-db-prod        Up (healthy)
# letwash-backend-prod   Up (healthy)
# letwash-frontend-prod  Up (healthy)
# letwash-redis-prod     Up (healthy)
```

### **Step 4: Run Migrations**

```bash
# Execute migrations
docker exec -it letwash-backend-prod npx prisma migrate deploy

# Seed initial data
docker exec -it letwash-backend-prod npm run seed:prod
```

### **Step 5: Verify Deployment**

```bash
# Backend health
curl http://localhost:5000/health

# Frontend
curl http://localhost/

# Database
docker exec -it letwash-db-prod pg_isready -U letwash

# All should return success
```

---

## 🌐 Domain & DNS

### **DNS Configuration**

```
# A Records
yourdomain.com          →  YOUR_SERVER_IP
www.yourdomain.com      →  YOUR_SERVER_IP
api.yourdomain.com      →  YOUR_SERVER_IP

# CNAME (if using subdomain)
app.yourdomain.com      →  yourdomain.com
```

### **Nginx Configuration**

Update `nginx.conf`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Frontend
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    # API Proxy (if on same server)
    location /api/ {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### **Restart Nginx**

```bash
# Test configuration
docker exec letwash-frontend-prod nginx -t

# Reload
docker-compose -f docker-compose.prod.yml restart frontend
```

---

## 📊 Monitoring & Logging

### **Docker Logs**

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### **Setup Log Rotation**

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/docker-letwash

# Add:
/var/lib/docker/containers/*/*.log {
  rotate 7
  daily
  compress
  size 10M
  missingok
  delaycompress
  copytruncate
}
```

### **Sentry Error Tracking**

```bash
# Sign up: https://sentry.io
# Create new project
# Add DSN to .env.production

SENTRY_DSN=https://xxx@sentry.io/xxx
```

### **Uptime Monitoring**

**Options:**
- UptimeRobot (free)
- Pingdom
- StatusCake
- DataDog

**Setup:**
```
Monitor URL: https://yourdomain.com/health
Interval: 5 minutes
Alert: Email/SMS on downtime
```

---

## 💾 Backup Strategy

### **Automated Database Backups**

```bash
# Create backup script
nano /usr/local/bin/backup-letwash-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/backups/letwash"
DATE=$(date +%Y%m%d_%H%M%S)
FILENAME="letwash_backup_$DATE.sql.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
docker exec letwash-db-prod pg_dump -U letwash letwash | gzip > $BACKUP_DIR/$FILENAME

# Delete backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: $FILENAME"
```

```bash
# Make executable
chmod +x /usr/local/bin/backup-letwash-db.sh

# Add to crontab (daily at 2 AM)
crontab -e

0 2 * * * /usr/local/bin/backup-letwash-db.sh >> /var/log/letwash-backup.log 2>&1
```

### **Restore from Backup**

```bash
# List backups
ls -lh /backups/letwash/

# Restore specific backup
gunzip < /backups/letwash/letwash_backup_20241212_020000.sql.gz | \
  docker exec -i letwash-db-prod psql -U letwash letwash
```

### **File Uploads Backup**

```bash
# Backup uploads volume
docker run --rm \
  -v letwash_backend_uploads:/source \
  -v /backups/letwash:/backup \
  alpine tar czf /backup/uploads_$(date +%Y%m%d).tar.gz -C /source .

# Restore uploads
docker run --rm \
  -v letwash_backend_uploads:/target \
  -v /backups/letwash:/backup \
  alpine tar xzf /backup/uploads_20241212.tar.gz -C /target
```

---

## 🐛 Troubleshooting

### **Container Won't Start**

```bash
# Check logs
docker logs letwash-backend-prod

# Check environment
docker exec letwash-backend-prod env | grep DATABASE

# Restart container
docker-compose -f docker-compose.prod.yml restart backend
```

### **Database Connection Failed**

```bash
# Test database connection
docker exec -it letwash-db-prod psql -U letwash -d letwash

# Check DATABASE_URL
docker exec letwash-backend-prod env | grep DATABASE_URL

# Verify network
docker network inspect letwash_letwash-network
```

### **SSL Certificate Issues**

```bash
# Verify certificates exist
ls -la ./nginx/ssl/

# Check certificate validity
openssl x509 -in ./nginx/ssl/cert.pem -text -noout

# Test SSL connection
openssl s_client -connect yourdomain.com:443
```

### **Payment Webhook Not Working**

```bash
# Check webhook endpoint
curl https://yourdomain.com/api/v1/stripe/webhook

# Verify webhook secret
docker exec letwash-backend-prod env | grep STRIPE_WEBHOOK

# Check Stripe dashboard logs
# https://dashboard.stripe.com/webhooks
```

### **High Memory Usage**

```bash
# Check container stats
docker stats

# Increase memory limits (docker-compose.prod.yml)
deploy:
  resources:
    limits:
      memory: 4G  # Increase from 2G

# Restart
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔄 Updates & Maintenance

### **Deploy Updates**

```bash
# Pull latest code
git pull origin main

# Rebuild & redeploy
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Run new migrations
docker exec -it letwash-backend-prod npx prisma migrate deploy

# Check health
docker-compose -f docker-compose.prod.yml ps
```

### **Zero-Downtime Deployment**

```bash
# Using Docker Swarm or Kubernetes
# (Advanced - see separate guide)
```

---

## ✅ Post-Deployment Checklist

- [ ] All containers running and healthy
- [ ] Database migrations completed
- [ ] SSL certificate valid and auto-renewing
- [ ] Domain pointing to server correctly
- [ ] HTTPS redirect working
- [ ] API endpoints responding
- [ ] Stripe webhook receiving events
- [ ] Login/authentication working
- [ ] Payment flow tested
- [ ] Email notifications working (if configured)
- [ ] Monitoring alerts configured
- [ ] Backups running automatically
- [ ] Error tracking (Sentry) receiving errors
- [ ] Analytics (GA) tracking pageviews

---

## 📞 Support

**Issues during deployment?**

1. Check logs: `docker-compose logs -f`
2. Verify environment: `docker exec backend env`
3. Test database: `docker exec -it postgres psql`
4. Check documentation: [COMPLETE_SYSTEM_DOCUMENTATION.md](COMPLETE_SYSTEM_DOCUMENTATION.md)
5. Contact support: support@letwash.com

---

**Congratulations! 🎉 Your Letwash platform is now live in production!**

**Last Updated:** December 12, 2024
