# 🐳 Docker ile Local Test Rehberi

## ✅ Ön Gereksinimler

- ✅ Docker Desktop kurulu (Mac/Windows/Linux)
- ✅ Git kurulu
- ✅ Terminal/Command Prompt erişimi

---

## 🚀 HIZLI BAŞLANGIÇ (5 Dakika)

### **ADIM 1: Projeyi Clone Et**

```bash
cd ~/Desktop
git clone https://github.com/Smyrgzr/V37.git
cd V37
```

### **ADIM 2: Docker Compose ile Başlat**

```bash
# Tüm servisleri başlat (PostgreSQL + Backend + Frontend)
docker-compose up --build
```

**İlk çalıştırmada 5-10 dakika sürebilir (image download + build)**

### **ADIM 3: Database Migration & Seed**

Yeni bir terminal açın:

```bash
# Backend container'a gir
docker exec -it letwash-backend sh

# Migration çalıştır
npx prisma migrate deploy

# Seed data ekle
npm run seed

# Container'dan çık
exit
```

### **ADIM 4: Tarayıcıda Aç**

```
Frontend:  http://localhost
Backend:   http://localhost:5000
Health:    http://localhost:5000/health
```

### **ADIM 5: Test Kredensiyelleri ile Giriş Yap**

```
Root Owner:    admin@letwash.com / Letwash123!
Owner 1:       owner1@letwash.com / Letwash123!
Owner 2:       owner2@letwash.com / Letwash123!
```

---

## 📋 Detaylı Adımlar

### **1. Docker Servisleri**

Docker Compose 3 servis başlatır:

```yaml
postgres:   Port 5432
backend:    Port 5000
frontend:   Port 80
```

**Logları İzle:**

```bash
# Tüm servislerin logları
docker-compose logs -f

# Sadece backend
docker-compose logs -f backend

# Sadece frontend
docker-compose logs -f frontend
```

### **2. Database İşlemleri**

**PostgreSQL'e Bağlan:**

```bash
# psql ile bağlan
docker exec -it letwash-db psql -U letwash -d letwash

# Tabloları listele
\dt

# Kullanıcıları gör
SELECT id, email, role FROM users;

# Sözleşmeleri gör
SELECT type, version, title FROM agreements;

# Çık
\q
```

**Migration Komutları:**

```bash
# Backend container'a gir
docker exec -it letwash-backend sh

# Yeni migration oluştur
npx prisma migrate dev --name your_migration_name

# Migration uygula
npx prisma migrate deploy

# Prisma Studio aç (database GUI)
npx prisma studio
# Tarayıcıda: http://localhost:5555
```

### **3. Backend API Test**

**Health Check:**

```bash
curl http://localhost:5000/health
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner1@letwash.com",
    "password": "Letwash123!"
  }'
```

**Agreements Listele:**

```bash
curl http://localhost:5000/api/v1/agreements
```

**SSO Test (Google OAuth):**

Tarayıcıda aç:
```
http://localhost:5000/api/v1/sso/google
```

### **4. Frontend Test**

**SSO Login Akışı:**

1. `http://localhost` aç
2. "Sign in with Google" tıkla
3. Google OAuth sayfası açılır
4. Giriş yap
5. Sözleşmeleri imzala (Agreement Dialog)
6. Dashboard'a yönlendir

**Komisyon Dashboard:**

1. Owner olarak giriş yap
2. Sol menüde "Commissions" tıkla
3. Komisyon geçmişini gör
4. Payout durumunu kontrol et

---

## 🛠️ Docker Komutları

### **Temel Komutlar**

```bash
# Servisleri başlat
docker-compose up

# Arka planda başlat
docker-compose up -d

# Build + başlat
docker-compose up --build

# Durdur
docker-compose down

# Durdur + volume'ları sil (database temizlenir!)
docker-compose down -v

# Logları izle
docker-compose logs -f

# Container'lara gir
docker exec -it letwash-backend sh
docker exec -it letwash-frontend sh
docker exec -it letwash-db sh
```

### **Debugging**

```bash
# Çalışan container'ları listele
docker ps

# Tüm container'ları listele (durmuş olanlar dahil)
docker ps -a

# Container loglarını göster
docker logs letwash-backend
docker logs letwash-frontend
docker logs letwash-db

# Container kaynaklarını göster
docker stats
```

### **Temizlik**

```bash
# Durmuş container'ları temizle
docker container prune

# Kullanılmayan image'ları temizle
docker image prune

# Tüm Docker cache'i temizle
docker system prune -a
```

---

## 🐛 Sorun Giderme

### **Problem: Port 5432 already in use**

**Çözüm:** Local PostgreSQL çalışıyor, durdur:

```bash
# Mac
brew services stop postgresql

# Linux
sudo systemctl stop postgresql

# Veya docker-compose.yml'de port değiştir
ports:
  - "5433:5432"  # 5433 kullan
```

### **Problem: Port 80 already in use**

**Çözüm:** Apache/Nginx çalışıyor, durdur:

```bash
# Mac
sudo apachectl stop

# Linux
sudo systemctl stop apache2

# Veya docker-compose.yml'de port değiştir
ports:
  - "3000:80"  # 3000 kullan
```

### **Problem: Backend başlamıyor**

**Kontrol Et:**

```bash
# Backend loglarına bak
docker logs letwash-backend

# Database connection kontrol et
docker exec -it letwash-backend sh
ping postgres  # Should resolve
```

**Yaygın Hatalar:**

```
Error: P1001: Can't reach database server
→ PostgreSQL henüz hazır değil, 30 saniye bekle ve tekrar dene

Error: MODULE_NOT_FOUND
→ npm install eksik, rebuild et:
   docker-compose down
   docker-compose up --build
```

### **Problem: Migration hatası**

**Çözüm:**

```bash
# Database'i sıfırla
docker-compose down -v
docker-compose up -d postgres

# Bekle (30 saniye)

# Migration çalıştır
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed
```

### **Problem: Frontend çalışmıyor**

**Kontrol Et:**

```bash
# Frontend loglarına bak
docker logs letwash-frontend

# Nginx config kontrol et
docker exec -it letwash-frontend cat /etc/nginx/nginx.conf

# Build edilen dosyaları kontrol et
docker exec -it letwash-frontend ls -la /usr/share/nginx/html
```

---

## 🧪 Test Senaryoları

### **Test 1: Full SSO Login Flow**

```bash
# 1. Frontend aç
open http://localhost

# 2. "Sign in with Google" tıkla

# 3. Google OAuth sayfasında test email kullan

# 4. Agreement dialog açılmalı:
#    - Terms of Service
#    - Privacy Policy
#    - Transaction Agreement

# 5. Hepsini kabul et

# 6. Dashboard'a yönlendirilmeli
```

### **Test 2: Transaction & Commission**

```bash
# API ile transaction oluştur
curl -X POST http://localhost:5000/api/v1/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "bookingId": "BOOKING_ID",
    "amount": 100,
    "paymentMethod": "CREDIT_CARD"
  }'

# Response:
{
  "grossAmount": 100,
  "commissionRate": 10,
  "commissionAmount": 10,
  "netAmount": 90
}

# Frontend'de commission dashboard'u görüntüle
# Pending commission: ₺10
```

### **Test 3: Agreement Signing**

```bash
# Sözleşme durumunu kontrol et
curl http://localhost:5000/api/v1/agreements/user/USER_ID/status

# Response:
{
  "allSigned": false,
  "missingAgreements": [
    {
      "id": "...",
      "type": "TERMS_OF_SERVICE",
      "title": "Letwash Kullanım Koşulları"
    }
  ]
}

# Sözleşmeyi imzala
curl -X POST http://localhost:5000/api/v1/agreements/sign \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "agreementId": "AGREEMENT_ID"
  }'
```

---

## 📊 Production vs Development

### **Development (Docker Compose)**

```yaml
Environment: development
Database: Local PostgreSQL (container)
Frontend: Vite dev server
Backend: Node.js dev server
Ports: 80, 5000, 5432
```

### **Production (AWS)**

```yaml
Environment: production
Database: RDS PostgreSQL
Frontend: CloudFront + S3
Backend: ECS Fargate + ALB
Ports: 443 (HTTPS only)
```

---

## 🎯 Sonraki Adımlar

1. **Payment Gateway Entegrasyonu**
   - Stripe veya iyzico
   - Test mode ile başla
   - Webhook URL: `http://localhost:5000/api/v1/transactions/webhook`

2. **Email Service**
   - SendGrid veya AWS SES
   - Sözleşme signed confirmation
   - Transaction receipts

3. **Monitoring**
   - Sentry (error tracking)
   - LogRocket (session replay)
   - Google Analytics

4. **AWS Deploy**
   - `/AWS_DEPLOYMENT_COMPLETE_GUIDE.md` dosyasına bak
   - CI/CD pipeline (GitHub Actions)
   - Blue/Green deployment

---

## 📞 Yardım

**Sorun mu yaşıyorsun?**

1. Logları kontrol et: `docker-compose logs -f`
2. Health check: `curl http://localhost:5000/health`
3. Database bağlantısı: `docker exec -it letwash-db psql -U letwash`
4. Container'ları yeniden başlat: `docker-compose restart`

**Hala çözülmedi mi?**

- GitHub Issues: https://github.com/Smyrgzr/V37/issues
- Email: support@letwash.com

---

## 🎉 Başarılı Test!

Sistemin çalıştığını doğruladıysan:

✅ SSO Login (Google/Apple/Microsoft)  
✅ Agreement Signature  
✅ Transaction Processing  
✅ Commission Tracking  
✅ Dashboard Access  

**Tebrikler! Production'a hazırsın! 🚀**
