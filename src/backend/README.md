# 🚗 Letwash Backend API

Letwash araç yıkama yönetim platformu için RESTful API backend.

## 🏗️ Teknoloji Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL (AWS RDS)
- **ORM:** Prisma
- **Authentication:** JWT
- **Cloud Services:** AWS (S3, SES, SNS)
- **Containerization:** Docker

---

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler
```bash
node --version  # v18+
npm --version   # v9+
docker --version
```

### 2. Kurulum
```bash
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# .env dosyasını düzenleyin
```

### 3. Database Setup
```bash
# Docker ile local PostgreSQL
docker-compose up -d postgres

# Prisma migrate
npx prisma migrate dev

# Seed data (opsiyonel)
npm run seed

# Prisma Studio (database GUI)
npm run studio
```

### 4. Development Server
```bash
# Start server
npm run dev

# Server çalışacak: http://localhost:5000
```

---

## 📁 Proje Yapısı

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/            # AWS, database config
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Auth, validation, errors
│   ├── routes/            # API routes
│   └── index.js          # Entry point
├── .env.example          # Environment template
├── Dockerfile            # Docker image
├── docker-compose.yml    # Local development
└── package.json
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register      # Kullanıcı kaydı
POST   /api/v1/auth/login         # Giriş
POST   /api/v1/auth/refresh       # Token yenileme
POST   /api/v1/auth/logout        # Çıkış
GET    /api/v1/auth/me            # Mevcut kullanıcı
PUT    /api/v1/auth/password      # Şifre değiştir
```

### Branches (Şubeler)
```
GET    /api/v1/branches           # Tüm şubeler
GET    /api/v1/branches/:id       # Tek şube
POST   /api/v1/branches           # Şube oluştur
PUT    /api/v1/branches/:id       # Şube güncelle
DELETE /api/v1/branches/:id       # Şube sil
```

### Stations (İstasyonlar)
```
GET    /api/v1/stations           # Tüm istasyonlar
POST   /api/v1/stations           # İstasyon oluştur
PUT    /api/v1/stations/:id       # İstasyon güncelle
DELETE /api/v1/stations/:id       # İstasyon sil
```

### Services (Servisler)
```
GET    /api/v1/services           # Tüm servisler
POST   /api/v1/services           # Servis oluştur
PUT    /api/v1/services/:id       # Servis güncelle
DELETE /api/v1/services/:id       # Servis sil
```

### Bookings (Rezervasyonlar)
```
GET    /api/v1/bookings           # Tüm rezervasyonlar
GET    /api/v1/bookings/:id       # Tek rezervasyon
POST   /api/v1/bookings           # Rezervasyon oluştur (Public)
PUT    /api/v1/bookings/:id       # Rezervasyon güncelle
DELETE /api/v1/bookings/:id       # Rezervasyon iptal
GET    /api/v1/bookings/stats/summary  # İstatistikler
```

### Customers (Müşteriler)
```
GET    /api/v1/customers          # Tüm müşteriler
POST   /api/v1/customers          # Müşteri oluştur
PUT    /api/v1/customers/:id      # Müşteri güncelle
```

### Campaigns (Kampanyalar)
```
GET    /api/v1/campaigns          # Aktif kampanyalar
POST   /api/v1/campaigns          # Kampanya oluştur
PUT    /api/v1/campaigns/:id      # Kampanya güncelle
DELETE /api/v1/campaigns/:id      # Kampanya sil
```

### Analytics (Analizler)
```
GET    /api/v1/analytics/dashboard  # Dashboard verileri
```

### Notifications (Bildirimler)
```
GET    /api/v1/notifications         # Tüm bildirimler
PUT    /api/v1/notifications/:id/read  # Okundu işaretle
PUT    /api/v1/notifications/read-all  # Tümünü okundu işaretle
```

---

## 🔐 Authentication

API JWT token kullanır. Token almak için:

### 1. Register/Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@letwash.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "owner@letwash.com",
      "role": "CARWASH_OWNER"
    },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

### 2. Protected Endpoint'leri Kullanma
```bash
curl -X GET http://localhost:5000/api/v1/branches \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 🧪 Test

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage
npm run test:coverage
```

---

## 🐳 Docker

### Local Development
```bash
# Start all services
docker-compose up

# Stop services
docker-compose down

# Rebuild
docker-compose up --build
```

### Production Build
```bash
# Build image
docker build -t letwash-api .

# Run container
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  letwash-api
```

---

## 🌍 Environment Variables

Tüm environment variables için `.env.example` dosyasına bakın.

### Zorunlu Variables
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key-min-32-chars
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

### Opsiyonel Variables
```env
PORT=5000
NODE_ENV=development
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_SMS_NOTIFICATIONS=true
```

---

## 📊 Database Schema

### Ana Tablolar
- **users** - Kullanıcılar (ROOT_OWNER, CARWASH_OWNER)
- **branches** - Şubeler
- **stations** - Yıkama istasyonları
- **services** - Servisler
- **bookings** - Rezervasyonlar
- **customers** - Müşteriler
- **campaigns** - Kampanyalar
- **analytics** - Günlük istatistikler

### İlişkiler
```
User (1) ──→ (N) Branch
Branch (1) ──→ (N) Station
Branch (1) ──→ (N) Service
Branch (1) ──→ (N) Booking
Booking (N) ──→ (1) Service
Booking (N) ──→ (1) Station
Booking (N) ──→ (1) Customer
```

Detaylı schema için `prisma/schema.prisma` dosyasına bakın.

---

## 🚀 Production Deployment

AWS'ye deploy için **AWS_DEPLOYMENT_GUIDE.md** dosyasına bakın.

### Hızlı Deploy (AWS Elastic Beanstalk)
```bash
# EB CLI yükle
pip install awsebcli

# Initialize
eb init -p node.js-18 letwash-api

# Create environment
eb create letwash-api-prod

# Deploy
eb deploy
```

---

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "v1"
}
```

### Logs
```bash
# Development
npm run dev  # Console logs

# Production (PM2)
pm2 logs letwash-api

# Docker
docker-compose logs -f api

# AWS CloudWatch
aws logs tail /aws/elasticbeanstalk/letwash-api-prod --follow
```

---

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Test connection
npx prisma db push

# Check DATABASE_URL
echo $DATABASE_URL
```

### JWT Token Error
```bash
# Generate new secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Migration Error
```bash
# Reset database (CAUTION: deletes all data)
npx prisma migrate reset

# Apply specific migration
npx prisma migrate deploy
```

---

## 📞 Support

- **Documentation:** `/docs`
- **Issues:** GitHub Issues
- **Email:** support@letwash.com

---

## 📝 License

MIT License - see LICENSE file

---

## 🎉 Contributors

Made with ❤️ by Letwash Team
