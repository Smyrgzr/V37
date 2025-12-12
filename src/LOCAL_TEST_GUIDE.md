# 🧪 LOCAL TEST GUIDE - Letwash Platform

Bu rehber, Letwash platformunu local ortamda test etmek için adım adım talimatlar içerir.

---

## 🎯 ÖN HAZIRLIK

### Gereksinimler
✅ Node.js 18+  
✅ Docker Desktop  
✅ Git  
✅ Terminal/Command Prompt  

### Kurulum Kontrolü
```bash
node --version     # v18.0.0 veya üzeri
npm --version      # v9.0.0 veya üzeri
docker --version   # 20.0.0 veya üzeri
```

---

## 🚀 HIZLI BAŞLANGIÇ (5 Dakika)

### 1️⃣ Environment Dosyalarını Oluştur

```bash
# Root directory'de
cp .env.example .env

# Backend directory'de
cp backend/.env.example backend/.env
```

### 2️⃣ Docker ile Başlat

```bash
# Tüm servisleri başlat (frontend, backend, database)
docker-compose up -d

# Logları izle
docker-compose logs -f
```

### 3️⃣ Database'i Seed Et

```bash
# Backend container'ına gir
docker exec -it letwash-backend sh

# Migrations ve seed
npx prisma migrate deploy
npx prisma db seed

# Container'dan çık
exit
```

### 4️⃣ Test Et!

- **Frontend:** http://localhost
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## 🔐 TEST HESAPLARI

### Root Owner (Tüm yetkilere sahip)
```
Email:    admin@letwash.com
Password: Letwash123!
```

### Carwash Owner 1 (Professional Plan)
```
Email:    owner1@letwash.com
Password: Letwash123!
Branches: Letwash Downtown, Letwash Mall
```

### Carwash Owner 2 (Starter Plan)
```
Email:    owner2@letwash.com
Password: Letwash123!
Branches: Express Wash
```

---

## 🧪 TEST SENARYOLARI

### Senaryo 1: Yeni Kullanıcı Kaydı
1. http://localhost adresine git
2. "Sign Up" tıkla
3. Bilgileri doldur:
   - Email: test@example.com
   - Password: Test123!
   - Full Name: Test User
   - Business Modules: IN_BAY seç
   - Subscription: STARTER seç
4. "Create Account" tıkla
5. ✅ Dashboard'a yönlendirilmelisin

### Senaryo 2: Şube Oluşturma
1. Login ol (owner1@letwash.com)
2. Sidebar'dan "Branches" → "Add Branch"
3. Şube bilgilerini doldur
4. Business models seç
5. "Create Branch" tıkla
6. ✅ Yeni şube listede görünmeli

### Senaryo 3: Servis Ekleme
1. Bir şube seç
2. "Services" sekmesine git
3. "Add Service" tıkla
4. Servis detaylarını gir:
   - Name: Test Wash
   - Business Model: IN_BAY
   - Base Price: 50
   - Duration: 15 mins
5. Vehicle type multipliers ayarla
6. "Save Service" tıkla
7. ✅ Servis oluşturulmalı

### Senaryo 4: Rezervasyon Oluşturma
1. "Bookings" → "New Booking"
2. Branch ve service seç
3. Müşteri bilgilerini gir
4. Vehicle type seç
5. Tarih ve saat seç
6. ✅ Rezervasyon oluşturulmalı
7. ✅ Fiyat otomatik hesaplanmalı

### Senaryo 5: Analytics Görüntüleme
1. "Analytics" sayfasına git
2. ✅ Dashboard widget'ları yüklenmeli
3. ✅ Grafikler görünmeli
4. Date range değiştir
5. ✅ Veriler güncellenmeli

---

## 🔍 API TEST

### cURL ile Test

#### Health Check
```bash
curl http://localhost:5000/health
```

**Beklenen yanıt:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "v1"
}
```

#### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@letwash.com",
    "password": "Letwash123!"
  }'
```

**Token'ı kaydet:**
```bash
export TOKEN="eyJhbGc..."
```

#### Branches Listesi
```bash
curl http://localhost:5000/api/v1/branches \
  -H "Authorization: Bearer $TOKEN"
```

#### Yeni Branch Oluştur
```bash
curl -X POST http://localhost:5000/api/v1/branches \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Branch",
    "address": "123 Test St",
    "city": "Istanbul",
    "country": "Turkey",
    "phone": "+90 555 999 9999",
    "businessModels": ["IN_BAY"]
  }'
```

---

## 🗄️ DATABASE YÖNETIMI

### Prisma Studio (GUI)
```bash
cd backend
npx prisma studio
```
📍 **Açılır:** http://localhost:5555

### PostgreSQL CLI
```bash
# Database container'ına bağlan
docker exec -it letwash-db psql -U letwash -d letwash

# Örnek sorgular
\dt                          # Tabloları listele
SELECT * FROM users;         # Kullanıcıları listele
SELECT * FROM branches;      # Şubeleri listele
\q                           # Çık
```

### Database Reset
```bash
cd backend

# Tüm data'yı sil ve yeniden seed et
npx prisma migrate reset

# Sadece seed et (data silmeden)
npx prisma db seed
```

---

## 📊 LOGS & DEBUGGING

### Container Logları
```bash
# Tüm loglar
docker-compose logs -f

# Sadece backend
docker-compose logs -f backend

# Sadece frontend
docker-compose logs -f frontend

# Sadece database
docker-compose logs -f postgres
```

### Backend Error Logs
```bash
# Backend container'da
docker exec -it letwash-backend tail -f /app/logs/error.log
```

---

## 🛠️ TROUBLESHOOTING

### Problem: Frontend yüklenmiyor
```bash
# Container'ı yeniden başlat
docker-compose restart frontend

# Logs kontrol et
docker-compose logs frontend

# Browser cache temizle
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Problem: Backend bağlanamıyor
```bash
# Health check test et
curl http://localhost:5000/health

# Container çalışıyor mu?
docker ps | grep letwash-backend

# Backend logs
docker-compose logs backend
```

### Problem: Database connection error
```bash
# Database container çalışıyor mu?
docker ps | grep letwash-db

# Database logs
docker-compose logs postgres

# Database'e bağlan
docker exec -it letwash-db psql -U letwash -d letwash
```

### Problem: Migration hatası
```bash
cd backend

# Prisma client yeniden generate et
npx prisma generate

# Migration'ları tekrar çalıştır
npx prisma migrate deploy

# Reset (dikkat: tüm data silinir)
npx prisma migrate reset
```

### Problem: Port already in use
```bash
# Port kullanan process'i bul
lsof -i :5000  # Backend port
lsof -i :80    # Frontend port
lsof -i :5432  # Database port

# Process'i öldür
kill -9 <PID>

# Veya Docker'ı yeniden başlat
docker-compose down
docker-compose up -d
```

---

## 🧹 CLEANUP

### Tüm Servisleri Durdur
```bash
docker-compose down
```

### Volumes ile Birlikte Sil (tüm data silinir)
```bash
docker-compose down -v
```

### Docker Images Temizle
```bash
docker system prune -a
```

---

## 📈 PERFORMANCE TEST

### Backend Load Test (Apache Bench)
```bash
# 100 request, 10 concurrent
ab -n 100 -c 10 http://localhost:5000/health

# Auth endpoint test
ab -n 50 -c 5 -p login.json -T application/json \
  http://localhost:5000/api/v1/auth/login
```

### Frontend Load Test
```bash
# Chrome DevTools
# Network tab → Throttling → Fast 3G
# Reload page ve timing'leri kontrol et
```

---

## ✅ CHECKLIST (Production'a Geçmeden Önce)

### Functionality
- [ ] Kullanıcı kaydı çalışıyor
- [ ] Login/Logout çalışıyor
- [ ] Branch CRUD işlemleri çalışıyor
- [ ] Service CRUD işlemleri çalışıyor
- [ ] Booking oluşturma çalışıyor
- [ ] Vehicle type pricing doğru hesaplanıyor
- [ ] Analytics verileri doğru görünüyor
- [ ] Notifications çalışıyor
- [ ] Campaign sistemi çalışıyor

### Security
- [ ] JWT token authentication çalışıyor
- [ ] Refresh token çalışıyor
- [ ] Password hashing çalışıyor
- [ ] Authorization (role-based) çalışıyor
- [ ] CORS ayarları doğru

### Performance
- [ ] API response time < 200ms
- [ ] Frontend load time < 2s
- [ ] Database queries optimize edilmiş
- [ ] No memory leaks

### UI/UX
- [ ] Responsive design çalışıyor
- [ ] Error messages görünüyor
- [ ] Loading states çalışıyor
- [ ] Form validations çalışıyor
- [ ] Navigation sorunsuz

---

## 🎓 SONRAKI ADIMLAR

1. ✅ **Local test tamamlandı**
2. 📤 **GitHub'a push et**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```
3. 🚀 **AWS Staging deploy**
   - [AWS_DEPLOYMENT_COMPLETE_GUIDE.md](./AWS_DEPLOYMENT_COMPLETE_GUIDE.md) takip et
4. 🧪 **Staging'de test et**
5. 🎉 **Production'a çık!**

---

## 📞 YARDIM

- **Documentation:** [README.md](./README.md)
- **API Docs:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **AWS Guide:** [AWS_DEPLOYMENT_COMPLETE_GUIDE.md](./AWS_DEPLOYMENT_COMPLETE_GUIDE.md)

---

**🎉 Happy Testing!**
