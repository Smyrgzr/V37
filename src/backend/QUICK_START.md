# ⚡ Letwash Backend - Quick Start Guide

5 dakikada backend'i ayağa kaldırın!

---

## 🚀 Hızlı Kurulum (Docker ile)

### 1. Docker Compose ile başlatın
```bash
cd backend

# Tüm servisleri başlat (PostgreSQL + API)
docker-compose up -d

# Logları izleyin
docker-compose logs -f
```

### 2. Test edin
```bash
# Health check
curl http://localhost:5000/health

# API documentation
open http://localhost:5000
```

### 3. Login yapın
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@letwash.com",
    "password": "owner123"
  }'
```

**✅ Hazır! API çalışıyor: http://localhost:5000**

---

## 🛠️ Manual Kurulum

### 1. Bağımlılıkları yükleyin
```bash
npm install
```

### 2. Environment variables
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin - en azından şunları ayarlayın:
```env
DATABASE_URL="postgresql://letwash:letwash123@localhost:5432/letwash"
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
```

### 3. Database'i başlatın
```bash
# PostgreSQL başlatın (Docker ile)
docker run --name letwash-postgres \
  -e POSTGRES_USER=letwash \
  -e POSTGRES_PASSWORD=letwash123 \
  -e POSTGRES_DB=letwash \
  -p 5432:5432 \
  -d postgres:15-alpine

# Migration
npx prisma migrate dev

# Seed data
npm run seed
```

### 4. Development server'ı başlatın
```bash
npm run dev
```

**✅ API: http://localhost:5000**

---

## 📝 Test Login Credentials

Backend'de 2 kullanıcı var:

### Root Owner (Tüm yetkilere sahip)
```
Email: admin@letwash.com
Password: admin123
```

### Carwash Owner (Kendi şubelerine erişim)
```
Email: owner@letwash.com
Password: owner123
```

---

## 🧪 API Test

### 1. Login
```bash
# Login yapın ve token alın
TOKEN=$(curl -s -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@letwash.com","password":"owner123"}' \
  | jq -r '.data.accessToken')

echo $TOKEN
```

### 2. Get Branches
```bash
curl -X GET http://localhost:5000/api/v1/branches \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Create Booking
```bash
curl -X POST http://localhost:5000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "00000000-0000-0000-0000-000000000001",
    "serviceId": "00000000-0000-0000-0000-000000000021",
    "customerName": "Test Customer",
    "customerPhone": "+905551234567",
    "vehicleType": "SEDAN",
    "startTime": "'$(date -u -v+2H +"%Y-%m-%dT%H:%M:%SZ")'",
    "endTime": "'$(date -u -v+2H -v+30M +"%Y-%m-%dT%H:%M:%SZ")'"
  }'
```

---

## 🗄️ Database Yönetimi

### Prisma Studio (Database GUI)
```bash
npx prisma studio

# Browser'da açılacak: http://localhost:5555
```

### Migration Commands
```bash
# Yeni migration oluştur
npx prisma migrate dev --name add_new_feature

# Production'a deploy et
npx prisma migrate deploy

# Database'i sıfırla (CAUTION!)
npx prisma migrate reset
```

---

## 🔧 Troubleshooting

### Port 5000 zaten kullanımda
```bash
# .env dosyasında PORT değiştir
PORT=3000
```

### Database connection error
```bash
# PostgreSQL çalışıyor mu kontrol et
docker ps | grep postgres

# Database URL'i doğru mu kontrol et
echo $DATABASE_URL
```

### JWT token expired
```bash
# Yeni token al (refresh endpoint)
curl -X POST http://localhost:5000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

---

## 📚 Daha Fazla Bilgi

- **README.md** - Detaylı documentation
- **AWS_DEPLOYMENT_GUIDE.md** - Production deployment
- **prisma/schema.prisma** - Database schema
- **Postman Collection** - API test collection (yakında)

---

## 🎉 Başarılı!

Backend hazır! Şimdi frontend'i bu API'ye bağlayabilirsiniz.

Frontend .env dosyası:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📞 Yardıma mı ihtiyacınız var?

Bir sorun mu yaşıyorsunuz?
1. Logs'u kontrol edin: `docker-compose logs -f api`
2. Health check: `curl http://localhost:5000/health`
3. Database: `npx prisma studio`

**İyi geliştirmeler! 🚀**
