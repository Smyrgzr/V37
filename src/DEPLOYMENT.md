# 🚀 Deployment Guide - Letwash

## GitHub'a Push Etme

### 1. Git Repository Oluşturma

GitHub'da yeni bir repository oluşturun:
- Repository adı: `letwash` (veya istediğiniz isim)
- Visibility: Private veya Public
- **Initialize repository'yi SEÇMEYİN** (README, .gitignore eklemeyin)

### 2. Local Git Başlatma

```bash
# Git repository başlat
git init

# Tüm dosyaları staging area'ya ekle
git add .

# İlk commit
git commit -m "Initial commit: Letwash platform with SSO, subscriptions, and business modules"

# Main branch oluştur
git branch -M main

# Remote repository ekle (YOUR_USERNAME değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/letwash.git

# Push to GitHub
git push -u origin main
```

### 3. Environment Variables (Production)

GitHub repository'nizde Settings > Secrets and variables > Actions'a gidin ve şu secrets ekleyin:

#### Database
- `DATABASE_URL`: PostgreSQL connection string

#### JWT & Session
- `JWT_SECRET`: Random güçlü string
- `JWT_EXPIRE`: 7d
- `REFRESH_TOKEN_SECRET`: Random güçlü string
- `REFRESH_TOKEN_EXPIRE`: 30d
- `SESSION_SECRET`: Random güçlü string

#### OAuth Providers
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `APPLE_CLIENT_ID`
- `APPLE_TEAM_ID`
- `APPLE_KEY_ID`
- `APPLE_PRIVATE_KEY`
- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`

#### AWS
- `AWS_COGNITO_USER_POOL_ID`
- `AWS_COGNITO_CLIENT_ID`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

---

## 🌐 AWS Deployment

### Architecture
```
CloudFront → S3 (Frontend)
              ↓
    API Gateway → Lambda (Backend)
              ↓
           RDS PostgreSQL
```

### 1. Frontend Deployment (S3 + CloudFront)

```bash
# Build frontend
npm run build

# Install AWS CLI
# aws configure

# Create S3 bucket
aws s3 mb s3://letwash-frontend

# Upload build files
aws s3 sync dist/ s3://letwash-frontend --delete

# Enable static website hosting
aws s3 website s3://letwash-frontend \
  --index-document index.html \
  --error-document index.html

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name letwash-frontend.s3.amazonaws.com
```

### 2. Backend Deployment (Lambda + API Gateway)

#### Option A: Serverless Framework
```bash
cd backend

# Install serverless
npm install -g serverless

# Create serverless.yml
# Deploy
serverless deploy
```

#### Option B: AWS Elastic Beanstalk
```bash
cd backend

# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p node.js letwash-api

# Create environment
eb create letwash-prod

# Deploy
eb deploy
```

### 3. Database Setup (RDS)

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier letwash-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YOUR_PASSWORD \
  --allocated-storage 20

# Run migrations
cd backend
DATABASE_URL="postgresql://admin:password@letwash-db.xxx.rds.amazonaws.com:5432/letwash" \
  npx prisma migrate deploy
```

---

## 🔵 Heroku Deployment (Alternative)

### Frontend (Static Site)
```bash
# Install Heroku CLI
# heroku login

# Create app
heroku create letwash-frontend

# Add buildpack
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static

# Create static.json
echo '{"root": "dist/"}' > static.json

# Deploy
git push heroku main
```

### Backend API
```bash
cd backend

# Create Heroku app
heroku create letwash-api

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set GOOGLE_CLIENT_ID=your-id
# ... (tüm environment variables)

# Deploy
git push heroku main

# Run migrations
heroku run npx prisma migrate deploy
```

---

## 🐳 Docker Deployment

### 1. Create Dockerfiles

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npx prisma generate
EXPOSE 5000
CMD ["npm", "start"]
```

### 2. Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/letwash
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=letwash
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 3. Deploy
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔐 Security Checklist (Production)

- [ ] Environment variables güvenli şekilde saklanıyor
- [ ] HTTPS aktif (SSL sertifikası)
- [ ] CORS doğru yapılandırılmış
- [ ] Rate limiting aktif
- [ ] Database şifreleri güçlü
- [ ] JWT secrets güçlü ve benzersiz
- [ ] OAuth callback URLs production URL'leri kullanıyor
- [ ] Database backups otomatik alınıyor
- [ ] Error messages production-safe (detay göstermiyor)
- [ ] Logging ve monitoring aktif

---

## 📊 Monitoring & Logging

### AWS CloudWatch
```bash
# Frontend logs
aws logs tail /aws/cloudfront/letwash --follow

# Backend logs
aws logs tail /aws/lambda/letwash-api --follow
```

### Heroku Logs
```bash
heroku logs --tail --app letwash-api
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://letwash-frontend --delete

  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: cd backend && npm install
      - run: cd backend && npx prisma generate
      - run: cd backend && npm run build
      # Deploy to your backend service
```

---

## 📝 Post-Deployment Checklist

- [ ] Frontend erişilebilir ve yükleniyor
- [ ] Backend API endpoint'leri çalışıyor
- [ ] Database migrations başarılı
- [ ] SSO providers test edildi (Google/Apple/Microsoft)
- [ ] Email notifications çalışıyor
- [ ] Analytics tracking aktif
- [ ] Error tracking (Sentry vb.) kuruldu
- [ ] Performance monitoring aktif
- [ ] Domain DNS ayarları yapıldı
- [ ] SSL sertifikası geçerli

---

## 🆘 Troubleshooting

### Frontend build hatası
```bash
# Cache temizle
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Backend database connection hatası
```bash
# DATABASE_URL'i kontrol et
echo $DATABASE_URL

# Prisma client yeniden generate et
npx prisma generate

# Migration yeniden çalıştır
npx prisma migrate deploy
```

### OAuth callback hatası
- Callback URL'lerini provider dashboard'larında kontrol et
- Production URL'leri güncelle (http değil https)
- Redirect URIs whitelist'e eklenmiş mi kontrol et

---

**🎉 Deployment tamamlandı! Başarılar!**
