# ✅ Letwash Kurulum Kontrol Listesi

**Adım adım kurulum takibi** - Her adımı tamamladıkça işaretle!

---

## 📋 Kurulum Öncesi

### **Sistem Gereksinimleri**

- [ ] İşletim sistemi: Windows 10/11, macOS 11+, veya Linux
- [ ] RAM: Minimum 4GB (8GB önerilir)
- [ ] Disk: Minimum 10GB boş alan
- [ ] İnternet bağlantısı (ilk kurulum için)

---

## 🐳 Docker Kurulum

### **Windows Kullanıcıları**

- [ ] Virtualization BIOS'ta aktif
- [ ] WSL 2 kuruldu (`wsl --install`)
- [ ] Docker Desktop indirildi (https://www.docker.com/products/docker-desktop/)
- [ ] Docker Desktop kuruldu ("Use WSL 2" seçeneği ile)
- [ ] Docker Desktop başlatıldı
- [ ] `docker --version` komutu çalışıyor
- [ ] `docker-compose --version` komutu çalışıyor
- [ ] `docker run hello-world` başarılı

### **Mac Kullanıcıları**

- [ ] Mac türü belirlendi (Intel vs Apple Silicon)
- [ ] Docker Desktop doğru sürüm indirildi
- [ ] Docker.dmg kuruldu (Applications klasörüne)
- [ ] Docker başlatıldı ve izinler verildi
- [ ] `docker --version` komutu çalışıyor
- [ ] `docker-compose --version` komutu çalışıyor
- [ ] `docker run hello-world` başarılı

### **Linux Kullanıcıları**

- [ ] Docker kuruldu (`curl -fsSL https://get.docker.com | sh`)
- [ ] Kullanıcı docker grubuna eklendi (`sudo usermod -aG docker $USER`)
- [ ] Logout/login yapıldı veya restart edildi
- [ ] `docker --version` komutu çalışıyor
- [ ] `docker compose version` komutu çalışıyor
- [ ] `docker run hello-world` başarılı

**📖 Detaylı rehber:** [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md)

---

## 📁 Proje Hazırlığı

### **Dosya Yapısı**

- [ ] Proje klasörü doğru konumda (örn: `~/Desktop/V37`)
- [ ] `docker-compose.yml` dosyası var
- [ ] `backend/` klasörü var
- [ ] `components/` klasörü var
- [ ] `package.json` var

### **Environment Variables**

#### **Backend .env**

- [ ] `cd backend` klasörüne gidildi
- [ ] `.env.example` dosyası kopyalandı: `cp .env.example .env`
- [ ] `.env` dosyası düzenlendi (varsayılan değerler yeterli)

**Minimum gerekli değerler:**
```env
✅ DATABASE_URL (✓ varsayılan değer tamam)
✅ JWT_SECRET (✓ varsayılan değer tamam)
✅ SESSION_SECRET (✓ varsayılan değer tamam)
✅ CORS_ORIGIN (✓ varsayılan değer tamam)
```

#### **Frontend .env**

- [ ] Ana dizine dönüldü: `cd ..`
- [ ] `.env.example` dosyası kopyalandı: `cp .env.example .env`
- [ ] `.env` dosyası düzenlendi (varsayılan değerler yeterli)

**Minimum gerekli değerler:**
```env
✅ VITE_API_BASE_URL (✓ varsayılan değer tamam)
```

---

## 🚀 Docker Başlatma

### **İlk Çalıştırma**

- [ ] Terminal/PowerShell açıldı
- [ ] Proje klasörüne gidildi: `cd ~/Desktop/V37`
- [ ] Docker başlatıldı: `docker-compose up --build`
- [ ] Container'lar başarıyla build edildi (5-10 dakika)
- [ ] 3 container çalışıyor:
  - [ ] `postgres` (Database)
  - [ ] `letwash-backend` (API)
  - [ ] `letwash-frontend` (React)

**Başarılı çıktı:**
```
✅ letwash-backend  | Server is running on port 5000
✅ letwash-frontend | Local: http://localhost:5173
```

---

## 🗄️ Database Setup

### **Migration & Seed**

**Yeni bir terminal/PowerShell penceresi aç** (önceki çalışmaya devam etmeli)

- [ ] Yeni terminal açıldı
- [ ] Proje klasörüne gidildi: `cd ~/Desktop/V37`
- [ ] Migration çalıştırıldı:
  ```bash
  docker exec -it letwash-backend npx prisma migrate deploy
  ```
- [ ] Migration başarılı (tablolar oluşturuldu)
- [ ] Seed çalıştırıldı:
  ```bash
  docker exec -it letwash-backend npm run seed
  ```
- [ ] Seed başarılı, çıktıda görünüyor:
  - [ ] ✅ Created 3 users
  - [ ] ✅ Created 3 branches
  - [ ] ✅ Created 13 stations
  - [ ] ✅ Created 15 services
  - [ ] ✅ Created subscriptions
  - [ ] ✅ Created agreements

---

## 🌐 Tarayıcı Testi

### **Frontend Erişimi**

- [ ] Tarayıcı açıldı
- [ ] `http://localhost` adresine gidildi
- [ ] Login sayfası görünüyor
- [ ] "letwash" logosu görünüyor
- [ ] 2 tab var: "Carwash Center" ve "Admin"
- [ ] Sağ tarafta "Demo Credentials" kartı görünüyor

---

## 👥 Demo Login Testi

### **Quick Login (En Hızlı)**

- [ ] "Quick Login as Letwash Admin" butonuna tıklandı
- [ ] Otomatik giriş yapıldı
- [ ] Dashboard açıldı

### **Manuel Login**

- [ ] Email: `admin@letwash.com`
- [ ] Password: `Letwash123!`
- [ ] "Sign In" tıklandı
- [ ] Login başarılı

### **Diğer Kullanıcılar**

- [ ] Owner1 login testi: `owner1@letwash.com` / `Letwash123!`
- [ ] Owner2 login testi: `owner2@letwash.com` / `Letwash123!`

**📖 Demo rehberi:** [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md)

---

## 📊 Dashboard Kontrolleri

### **Admin Dashboard**

- [ ] Sidebar açılıyor
- [ ] "Dashboard" menüsü var
- [ ] "Branches" menüsü var
- [ ] "Services" menüsü var
- [ ] "Bookings" menüsü var
- [ ] "Commission" menüsü var (admin için)

### **Data Görünürlüğü**

- [ ] Branches sayfası açılıyor
- [ ] 3 branch görünüyor:
  - [ ] Downtown Auto Spa
  - [ ] Airport Express Wash
  - [ ] Westside Detail Center
- [ ] Stations sayfası açılıyor
- [ ] Stations görünüyor (toplam 13)
- [ ] Services sayfası açılıyor
- [ ] Services görünüyor (toplam 15)

---

## 🎯 Booking Testi

### **Yeni Booking Oluşturma**

- [ ] "Bookings" menüsüne gidildi
- [ ] "Create Booking" butonuna tıklandı
- [ ] Branch seçildi
- [ ] Service seçildi
- [ ] Vehicle type seçildi (örn: Sedan)
- [ ] Date ve time seçildi
- [ ] Customer bilgileri girildi
- [ ] "Create Booking" tıklandı
- [ ] Booking başarıyla oluşturuldu
- [ ] Booking listede görünüyor

---

## 💳 Stripe Payment (Opsiyonel)

### **Stripe Hesap Kurulumu**

- [ ] Stripe hesabı oluşturuldu: https://dashboard.stripe.com/register
- [ ] Test mode aktif
- [ ] API keys alındı: https://dashboard.stripe.com/test/apikeys
  - [ ] Publishable key (pk_test_...)
  - [ ] Secret key (sk_test_...)

### **Environment Variables Güncelleme**

#### **Backend .env**

- [ ] `backend/.env` açıldı
- [ ] Stripe keys eklendi:
  ```env
  STRIPE_SECRET_KEY=sk_test_...
  STRIPE_PUBLISHABLE_KEY=pk_test_...
  ```

#### **Frontend .env**

- [ ] `.env` açıldı
- [ ] Stripe publishable key eklendi:
  ```env
  VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
  ```

### **Webhook Setup**

- [ ] Stripe CLI kuruldu: `brew install stripe/stripe-cli/stripe` (Mac)
- [ ] Stripe login: `stripe login`
- [ ] Webhook listener başlatıldı (yeni terminal):
  ```bash
  stripe listen --forward-to localhost:5000/api/v1/stripe/webhook
  ```
- [ ] Webhook secret kopyalandı (whsec_...)
- [ ] `backend/.env` dosyasına eklendi:
  ```env
  STRIPE_WEBHOOK_SECRET=whsec_...
  ```
- [ ] Backend restart: `docker-compose restart backend`

### **Payment Test**

- [ ] Yeni booking oluşturuldu
- [ ] "Pay Now" butonuna tıklandı
- [ ] Payment dialog açıldı
- [ ] Test card girildi: `4242 4242 4242 4242`
- [ ] Expiry: `12/34`, CVC: `123`
- [ ] "Pay" butonuna tıklandı
- [ ] Payment başarılı
- [ ] Success page görüldü
- [ ] Booking status "PAID" oldu
- [ ] Commission oluşturuldu (admin dashboard'da görünüyor)

**📖 Stripe rehberi:** [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

## 🔐 SSO Setup (Opsiyonel)

### **Google OAuth**

- [ ] Google Cloud Console'da proje oluşturuldu
- [ ] OAuth credentials oluşturuldu
- [ ] Client ID ve Secret alındı
- [ ] `backend/.env` dosyasına eklendi
- [ ] Google login testi yapıldı

### **Apple Sign In**

- [ ] Apple Developer hesabı var
- [ ] App ID oluşturuldu
- [ ] Service ID yapılandırıldı
- [ ] Private key oluşturuldu
- [ ] `backend/.env` dosyasına eklendi
- [ ] Apple login testi yapıldı

**📖 SSO rehberi:** [SSO_SETUP_GUIDE.md](SSO_SETUP_GUIDE.md)

---

## 🧪 Genel Testler

### **Fonksiyonel Testler**

- [ ] Login/Logout çalışıyor
- [ ] Branch CRUD işlemleri çalışıyor
- [ ] Service CRUD işlemleri çalışıyor
- [ ] Booking CRUD işlemleri çalışıyor
- [ ] Station management çalışıyor
- [ ] Analytics dashboard veri gösteriyor
- [ ] Notifications çalışıyor

### **Role-Based Access**

- [ ] Admin tüm özelliklere erişebiliyor
- [ ] Owner sadece kendi branch'lerine erişebiliyor
- [ ] Manager yetkileri doğru çalışıyor

### **Responsive Design**

- [ ] Desktop görünüm (>1024px) düzgün
- [ ] Tablet görünüm (768-1024px) düzgün
- [ ] Mobile görünüm (<768px) düzgün

---

## 🔧 Docker Komutları Test

### **Temel Komutlar**

- [ ] `docker ps` - Çalışan container'ları gösteriyor
- [ ] `docker-compose logs` - Logları gösteriyor
- [ ] `docker-compose restart` - Restart çalışıyor
- [ ] `docker exec -it letwash-backend bash` - Backend'e girebiliyor
- [ ] `docker exec -it letwash-db psql -U letwash -d letwash` - Database'e girebiliyor

---

## 📚 Dokümantasyon Kontrolü

### **Dosyalar Okundu**

- [ ] [README.md](README.md) - Genel bakış
- [ ] [QUICK_START.md](QUICK_START.md) - Hızlı başlangıç
- [ ] [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md) - Docker kurulum
- [ ] [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md) - Demo mode
- [ ] [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md) - Payment setup
- [ ] [STRIPE_INTEGRATION_COMPLETE.md](STRIPE_INTEGRATION_COMPLETE.md) - Stripe özellikleri

---

## 🐛 Sorun Giderme

### **Yaşanan Sorunlar ve Çözümleri**

**Sorun 1:**
```
Problem: _________________
Çözüm: _________________
✅ Çözüldü
```

**Sorun 2:**
```
Problem: _________________
Çözüm: _________________
✅ Çözüldü
```

**📖 Troubleshooting:** [DOCKER_SETUP_COMPLETE.md#troubleshooting](DOCKER_SETUP_COMPLETE.md#troubleshooting)

---

## ✅ Final Kontrol

### **Kurulum Tamamlandı**

- [ ] Docker çalışıyor ve container'lar healthy
- [ ] Database migration ve seed başarılı
- [ ] Frontend erişilebilir (http://localhost)
- [ ] Demo login çalışıyor
- [ ] Dashboard ve tüm sayfalar açılıyor
- [ ] CRUD işlemleri çalışıyor
- [ ] (Opsiyonel) Stripe payment çalışıyor
- [ ] (Opsiyonel) SSO login çalışıyor

### **Production Hazırlığı** (Gelecek)

- [ ] Environment variables production için güncellendi
- [ ] SSL sertifikası kuruldu
- [ ] Domain ayarlandı
- [ ] Database backup stratejisi belirlendi
- [ ] Monitoring kuruldu
- [ ] Error tracking (Sentry vb.) eklendi

---

## 🎉 Tebrikler!

**Kurulum başarıyla tamamlandı! 🚀**

### **Sonraki Adımlar:**

1. **Platform'u keşfet:**
   - Tüm menüleri dolaş
   - Farklı demo kullanıcılarla test et
   - Booking oluştur ve yönet

2. **Stripe entegrasyonu:**
   - Test ödemeleri yap
   - Commission dashboard'u incele
   - Refund işlemlerini test et

3. **Özelleştirme:**
   - Kendi branch'lerini ekle
   - Services'leri özelleştir
   - Pricing'i ayarla

4. **Production'a hazırla:**
   - Live Stripe keys al
   - Domain ayarla
   - SSL kur
   - Deploy et!

---

## 📞 Destek

**Takıldın mı?**

1. Dokümantasyonu kontrol et
2. Docker logs'a bak: `docker-compose logs -f`
3. GitHub Issues: [Create Issue](https://github.com/Smyrgzr/V37/issues)
4. Email: support@letwash.com

---

**Başarılar! 🎊✨🚗💦**

---

## 📝 Notlar

**Kurulum sırasında aldığın notlar:**

```
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
```
