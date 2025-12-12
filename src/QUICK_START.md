# ⚡ Letwash - Hızlı Başlangıç Rehberi

**5 dakikada başlat! 🚀**

---

## 🎯 Önce Bu!

### **1. Docker Kurulu mu?**

```bash
docker --version
```

✅ **Kuruluysa** → [Adım 2](#2-proje-klasörüne-git)'ye geç  
❌ **Kurulu değilse** → [Docker Kurulum](#docker-kurulum)'u oku

---

## 🐳 Docker Kurulum

### **Windows**

```
1. https://www.docker.com/products/docker-desktop/ indir
2. Docker Desktop Installer.exe çalıştır
3. "Use WSL 2" seçeneğini işaretle ✅
4. Kur ve restart et
5. Docker Desktop'ı başlat
```

### **Mac**

```
1. https://www.docker.com/products/docker-desktop/ indir
2. Docker.dmg'yi aç
3. Docker'ı Applications'a sürükle
4. Docker'ı başlat
```

### **Linux (Ubuntu/Debian)**

```bash
# Docker kur
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Kullanıcıyı docker grubuna ekle
sudo usermod -aG docker $USER

# Logout/login (veya restart)
```

**Detaylı kurulum:** `DOCKER_SETUP_COMPLETE.md`

---

## 🚀 Letwash Başlat (5 Dakika)

### **2. Proje Klasörüne Git**

```bash
# Terminal/PowerShell aç
cd ~/Desktop/V37

# Windows PowerShell:
cd C:\Users\KULLANICI_ADIN\Desktop\V37
```

---

### **3. Environment Variables (Hızlı)**

✅ **`.env` dosyaları zaten hazır!** Kopyalamana gerek yok.

**Dosyalar mevcut:**
- ✅ `backend/.env` → Backend config (hazır!)
- ✅ `.env` → Frontend config (hazır!)

**Eğer eksikse (nadiren):**

```bash
# Backend .env (sadece eksikse)
cp backend/.env.example backend/.env

# Frontend .env (sadece eksikse)
cp .env.example .env
```

**📖 Detaylı bilgi:** [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md)

---

### **4. Docker Başlat**

```bash
# Start all services (backend, frontend, database)
docker-compose up --build

# Or run in background (detached mode):
docker-compose up --build -d
```

**⏱️ Wait time:** ~2-3 minutes for first build

**Expected output:**
```
✔ Container letwash-db        Healthy
✔ Container letwash-backend   Started  
✔ Container letwash-frontend  Started
```

**❓ Troubleshooting:**
- Port 80 in use? Change to `8080:80` in docker-compose.yml
- Port 5000 in use? Stop other Node apps
- See [DOCKER_FIX_GUIDE.md](DOCKER_FIX_GUIDE.md) for solutions

---

### **5. Database Setup (Yeni Terminal Aç)**

**Önceki terminal çalışmaya devam etmeli!**

```bash
# Yeni terminal aç
cd ~/Desktop/V37

# Migration
docker exec -it letwash-backend npx prisma migrate deploy

# Seed (demo data)
docker exec -it letwash-backend npm run seed
```

**Başarılı çıktı:**

```
✅ Created 3 users
✅ Created 3 branches
✅ Created 13 stations
✅ Created 15 services
✅ Seed completed!
```

---

### **6. Tarayıcıda Aç**

```
http://localhost
```

**Login ekranı açılmalı! 🎉**

---

## 👥 Demo Kullanıcılar

### **Quick Login (1 Tıklama)**

Login sayfasında sağ tarafta "Demo Credentials" kartını gör.  
"Quick Login" butonuna tıkla → ✅ Giriş yapıldı!

### **Manuel Login**

```
Admin:
📧 admin@letwash.com
🔑 Letwash123!

Owner 1 (Professional - 10% komisyon):
📧 owner1@letwash.com
🔑 Letwash123!

Owner 2 (Starter - 15% komisyon):
📧 owner2@letwash.com
🔑 Letwash123!
```

---

## ✅ Test Et

```
1. Login yap (admin@letwash.com)
2. Dashboard açılmalı
3. ✅ Branches görünmeli
4. ✅ Stations görünmeli
5. ✅ Services görünmeli
6. ✅ Bookings oluşturabilmelisin
```

---

## 🔧 Sık Kullanılan Komutlar

```bash
# Docker başlat
docker-compose up

# Docker durdur
docker-compose down

# Logları gör
docker-compose logs -f

# Backend'e gir
docker exec -it letwash-backend bash

# Database'e gir
docker exec -it letwash-db psql -U letwash -d letwash

# Seed tekrar çalıştır
docker exec -it letwash-backend npm run seed

# Container'ları restart et
docker-compose restart

# Rebuild (sorun olursa)
docker-compose down
docker-compose up --build
```

---

## 🐛 Sorun mu Var?

### **Port zaten kullanılıyor**

```bash
# 5000 portunu kullanı durumu öğren ve kapat
# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### **Docker çalışmıyor**

```bash
# Docker Desktop çalışıyor mu kontrol et
# Windows: Görev çubuğunda Docker simgesi
# Mac: Menu bar'da Docker simgesi

# Docker Desktop'ı başlat
# Start → Docker Desktop
```

### **Login yapamıyorum**

```bash
# Seed çalıştı mı kontrol et
docker exec -it letwash-db psql -U letwash -d letwash
SELECT email, role FROM users;
# 3 kullanıcı görmelisin
\q

# Seed yoksa çalıştır
docker exec -it letwash-backend npm run seed
```

### **Beyaz ekran**

```bash
# Cache temizle: Ctrl + Shift + R (Windows/Linux) veya Cmd + Shift + R (Mac)

# Frontend restart
docker-compose restart frontend

# Rebuild
docker-compose down
docker-compose up --build
```

---

## 📚 Detaylı Dokümantasyon

```
📖 DOCKER_SETUP_COMPLETE.md    → Docker kurulum (adım adım)
📖 DEMO_MODE_GUIDE.md          → Demo kullanıcılar
📖 STRIPE_SETUP_GUIDE.md       → Payment entegrasyonu
📖 SSO_SETUP_GUIDE.md          → Google/Apple login
📖 ARCHITECTURE.md             → Sistem mimarisi
```

---

## 🎉 Başarılı!

**Letwash çalışıyor! 🚀**

**Sonraki adımlar:**

1. ✅ Demo mode ile test et
2. 💳 Stripe payment ekle
3. 🔐 SSO setup (Google, Apple)
4. 🚀 Production'a deploy et

**İyi çalışmalar! 🎊✨**

---

## 📞 Yardım

**Takıldın mı?**

```bash
# Backend logları
docker-compose logs backend

# Database kontrol
docker exec -it letwash-db psql -U letwash -d letwash

# Container durumu
docker ps

# Detaylı rehber
cat DOCKER_SETUP_COMPLETE.md
```

**Destek:** GitHub Issues veya support@letwash.com

---

## 🔄 Güncellemeler

```bash
# Son değişiklikleri çek
git pull

# Rebuild yap
docker-compose down
docker-compose up --build

# Migration çalıştır
docker exec -it letwash-backend npx prisma migrate deploy
```

---

## 🎯 Özet (Tek Komut Dizisi)

```bash
# 1. Klonla (ilk kez)
git clone <repo_url>
cd V37

# 2. Environment
cp backend/.env.example backend/.env
cp .env.example .env

# 3. Docker başlat
docker-compose up --build

# 4. Yeni terminal → Setup
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# 5. Tarayıcı
# http://localhost
# admin@letwash.com / Letwash123!
```

**5 dakika, 5 komut, hazır! ⚡**