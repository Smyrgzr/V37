# 🔐 Environment Variables Setup Guide

**.env dosyaları hazırlandı!** Artık projeyi başlatabilirsin.

---

## ✅ Oluşturulan Dosyalar

```
✅ /backend/.env.example     → Backend template
✅ /backend/.env             → Backend config (hazır!)
✅ /.env.example             → Frontend template
✅ /.env                     → Frontend config (hazır!)
```

---

## 🚀 Hızlı Başlangıç

### **Dosyalar Hazır!**

`.env` dosyaları zaten oluşturuldu ve development için hazır değerlerle dolduruldu.

**Hemen başla:**

```bash
# Proje klasörüne git
cd ~/Desktop/V37

# Docker başlat
docker-compose up --build

# Yeni terminal → Database setup
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# Tarayıcı: http://localhost
# Login: admin@letwash.com / Letwash123!
```

✅ **Herşey çalışacak! Stripe olmadan da test edebilirsin.**

---

## 📋 Environment Variables Açıklaması

### **Backend (.env)**

#### **🔴 Zorunlu (Değişiklik Gerektirmez)**

```env
# Database - Docker otomatik ayarlıyor
DATABASE_URL=postgresql://letwash:letwash123@postgres:5432/letwash?schema=public

# JWT - Development için hazır
JWT_SECRET=letwash-super-secret-jwt-key-for-development...
JWT_EXPIRES_IN=7d

# Session - Development için hazır
SESSION_SECRET=letwash-session-secret-key-for-development...

# CORS - Local development için hazır
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:80

# Server
PORT=5000
NODE_ENV=development
```

**✅ Bu değerler hazır! Değiştirmene gerek yok.**

---

#### **🟡 Opsiyonel (Şimdilik Boş Bırakılabilir)**

```env
# Stripe (Payment özelliği için)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

**Ne zaman doldur:** Payment sistemi test etmek istediğinde

**Nasıl alınır:**
1. https://dashboard.stripe.com/register → Hesap oluştur
2. https://dashboard.stripe.com/test/apikeys → Test keys al
3. `.env` dosyasına yapıştır

**📖 Detaylı rehber:** [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

```env
# SSO (Google, Apple, Microsoft login için)
AWS_COGNITO_USER_POOL_ID=
AWS_COGNITO_CLIENT_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Ne zaman doldur:** SSO (Google/Apple login) eklemek istediğinde

**Şimdilik:** Demo mode ile test edebilirsin (SSO gerekmez!)

**📖 Detaylı rehber:** [SSO_SETUP_GUIDE.md](SSO_SETUP_GUIDE.md)

---

### **Frontend (.env)**

#### **🔴 Zorunlu (Değişiklik Gerektirmez)**

```env
# API URL - Backend endpoint
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

**✅ Hazır! Değiştirme.**

---

#### **🟡 Opsiyonel (Şimdilik Boş)**

```env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=
```

**Ne zaman doldur:** Payment test ederken (backend ile aynı key)

---

## 🎯 Kullanım Senaryoları

### **Senaryo 1: Sadece Demo Mode (Şimdi)**

**Yapman gereken:** HİÇBİR ŞEY! ✅

`.env` dosyaları hazır. Stripe ve SSO olmadan test edebilirsin.

```bash
docker-compose up --build
# http://localhost
# admin@letwash.com / Letwash123!
```

---

### **Senaryo 2: Stripe Payment Eklemek İstiyorum**

**Adımlar:**

1. **Stripe hesabı oluştur:**
   ```
   https://dashboard.stripe.com/register
   ```

2. **Test API keys al:**
   ```
   https://dashboard.stripe.com/test/apikeys
   ```

3. **Backend .env'e ekle:**
   ```env
   # /backend/.env
   STRIPE_SECRET_KEY=sk_test_51ABC...XYZ
   STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...XYZ
   ```

4. **Frontend .env'e ekle:**
   ```env
   # /.env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...XYZ
   ```

5. **Webhook secret al:**
   ```bash
   # Terminal
   stripe login
   stripe listen --forward-to localhost:5000/api/v1/stripe/webhook
   
   # Çıktıda: whsec_... göreceksin
   ```

6. **Backend .env'e webhook secret ekle:**
   ```env
   # /backend/.env
   STRIPE_WEBHOOK_SECRET=whsec_abc123...
   ```

7. **Backend'i restart et:**
   ```bash
   docker-compose restart backend
   ```

8. **Test et:**
   ```
   Booking oluştur → Pay Now → 4242 4242 4242 4242 → ✅ Başarılı!
   ```

**📖 Detaylı:** [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

### **Senaryo 3: Google OAuth Eklemek İstiyorum**

**Adımlar:**

1. **Google Cloud Console:**
   ```
   https://console.cloud.google.com/
   ```

2. **OAuth credentials oluştur**

3. **Backend .env'e ekle:**
   ```env
   GOOGLE_CLIENT_ID=123456-abc.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abc123...
   ```

4. **Backend'i restart et:**
   ```bash
   docker-compose restart backend
   ```

5. **Test et:**
   ```
   Login page → "Continue with Google" → ✅
   ```

**📖 Detaylı:** [SSO_SETUP_GUIDE.md](SSO_SETUP_GUIDE.md)

---

## 🔍 Environment Variables Kontrol

### **Backend .env Kontrol**

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Environment variables göster
env | grep -E 'DATABASE_URL|JWT_SECRET|STRIPE|PORT'

# Çık
exit
```

**Beklenen çıktı:**
```
DATABASE_URL=postgresql://letwash:letwash123@postgres:5432/letwash
JWT_SECRET=letwash-super-secret-jwt-key...
PORT=5000
STRIPE_SECRET_KEY=          (boş - henüz eklenmedi)
```

---

### **Frontend .env Kontrol**

```bash
# Frontend container'a gir
docker exec -it letwash-frontend sh

# Environment variables göster
env | grep VITE

# Çık
exit
```

**Beklenen çıktı:**
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Letwash
VITE_ENABLE_DEMO_MODE=true
```

---

## 🛡️ Güvenlik Notları

### **Development (Şimdi)**

✅ **Varsayılan değerler güvenli** (sadece local)
- Database: localhost
- JWT secrets: development keys
- CORS: sadece localhost

---

### **Production (Gelecek)**

⚠️ **ÖNEMLİ: Production'da şunları DEĞİŞTİR:**

```env
# ❌ ASLA production'da kullanma:
JWT_SECRET=letwash-super-secret-jwt-key...

# ✅ Production'da kullan:
JWT_SECRET=<32+ karakter rastgele string>

# Oluşturma:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Production checklist:**
- [ ] Tüm SECRET değerlerini değiştir
- [ ] DATABASE_URL'i production database ile değiştir
- [ ] CORS_ORIGIN'i production domain ile değiştir
- [ ] NODE_ENV=production
- [ ] Stripe LIVE keys kullan (sk_live_..., pk_live_...)
- [ ] `.env` dosyasını Git'e commit ETME! (.gitignore'da var mı kontrol et)

---

## 🔧 Sorun Giderme

### **Problem: "Environment variable not found"**

```bash
# .env dosyası var mı kontrol et
ls -la backend/.env
ls -la .env

# .env dosyası yoksa:
cp backend/.env.example backend/.env
cp .env.example .env

# Docker'ı restart et
docker-compose restart
```

---

### **Problem: "Database connection failed"**

```bash
# DATABASE_URL doğru mu?
# backend/.env dosyasında:
DATABASE_URL=postgresql://letwash:letwash123@postgres:5432/letwash?schema=public

# DİKKAT: "postgres" host adı doğru (Docker service name)
# localhost DEĞİL!

# Postgres container çalışıyor mu?
docker ps | grep postgres

# Restart
docker-compose restart postgres backend
```

---

### **Problem: "CORS error"**

```bash
# backend/.env dosyasında:
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:80,http://localhost

# Frontend URL'i eklenmiş mi?
# Tarayıcıda hangi URL kullanıyorsun? (http://localhost:80)

# Backend restart
docker-compose restart backend
```

---

### **Problem: "Stripe key invalid"**

```bash
# Test mode keys mi?
# sk_test_... (secret key)
# pk_test_... (publishable key)

# Live keys kullanma development'ta!
# sk_live_... ❌

# Keys doğru kopyalandı mı?
# Space veya newline olmamalı

# Backend restart
docker-compose restart backend
```

---

## 📁 Dosya Yapısı

```
V37/
├── backend/
│   ├── .env.example          ← Template (commit edilir)
│   ├── .env                  ← Gerçek config (commit edilmez!)
│   └── ...
├── .env.example              ← Frontend template (commit edilir)
├── .env                      ← Frontend config (commit edilmez!)
└── ...
```

**⚠️ UYARI:**
- `.env.example` → Git'e commit edil (template)
- `.env` → Git'e commit edilmez (secrets içerir)

---

## ✅ Hızlı Referans

### **Minimum Gerekli (Development)**

**Backend:**
```env
DATABASE_URL=postgresql://letwash:letwash123@postgres:5432/letwash
JWT_SECRET=any-32-character-string
SESSION_SECRET=any-32-character-string
CORS_ORIGIN=http://localhost:5173,http://localhost:80
PORT=5000
```

**Frontend:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

✅ **Bu değerler zaten .env dosyalarında var!**

---

### **Stripe Eklemek İçin (Opsiyonel)**

**Backend:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Frontend:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

📖 **Rehber:** [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

### **SSO Eklemek İçin (Opsiyonel)**

**Backend:**
```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

📖 **Rehber:** [SSO_SETUP_GUIDE.md](SSO_SETUP_GUIDE.md)

---

## 🎉 Özet

✅ **`.env` dosyaları oluşturuldu!**  
✅ **Development değerleri hazır!**  
✅ **Stripe ve SSO opsiyonel!**  

**Hemen başla:**

```bash
docker-compose up --build
# http://localhost
# admin@letwash.com / Letwash123!
```

**Stripe eklemek için:**
```bash
# STRIPE_SETUP_GUIDE.md'yi oku
```

**Başarılar! 🔐✨🚀**
