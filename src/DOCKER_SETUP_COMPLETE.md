# 🐳 Docker Kurulum Rehberi - Baştan Sona

## 📋 İçindekiler

1. [Docker Nedir?](#docker-nedir)
2. [Windows Kurulum](#windows-kurulum)
3. [Mac Kurulum](#mac-kurulum)
4. [Linux Kurulum](#linux-kurulum)
5. [Docker Test](#docker-test)
6. [Letwash Projesi Kurulum](#letwash-projesi-kurulum)
7. [Troubleshooting](#troubleshooting)

---

## 🤔 Docker Nedir?

Docker, uygulamaları **container** (konteyner) içinde çalıştıran bir platformdur.

**Neden Docker?**
- ✅ Tutarlı ortam (Mac, Windows, Linux'ta aynı şekilde çalışır)
- ✅ Kolay kurulum (tüm dependencies tek komutla)
- ✅ İzolasyon (projeler birbirini etkilemez)
- ✅ Hızlı başlangıç

**Letwash Projesi için:**
```
Docker Container 1: PostgreSQL Database
Docker Container 2: Backend (Node.js API)
Docker Container 3: Frontend (React)
```

---

## 💻 Windows Kurulum

### **Sistem Gereksinimleri**

**Windows 10/11 (64-bit):**
- Windows 10 Pro/Enterprise/Education (Build 19041 veya üzeri)
- Windows 11 (Tüm sürümler)
- VEYA Windows 10 Home (Build 19041 veya üzeri) - WSL 2 ile

**Hardware:**
- 4GB RAM (minimum 8GB önerilir)
- BIOS'ta virtualization aktif

---

### **ADIM 1: Virtualization Kontrolü**

#### **1.1 Virtualization Aktif mi Kontrol Et**

**Task Manager ile:**
```
1. Ctrl + Shift + Esc (Task Manager aç)
2. "Performance" sekmesi
3. "CPU" seç
4. Sağ altta "Virtualization" yazısını bul
5. ✅ "Enabled" olmalı
```

**Eğer Disabled ise:**
```
1. Bilgisayarı restart et
2. BIOS'a gir (genellikle F2, F10, F12, veya Del tuşu)
3. "Virtualization Technology" veya "Intel VT-x" / "AMD-V" bul
4. "Enabled" yap
5. Save & Exit
```

---

### **ADIM 2: WSL 2 Kurulum** (Windows Home için gerekli)

#### **2.1 PowerShell'i Yönetici Olarak Aç**

```powershell
# Windows tuşu + X → "Windows PowerShell (Admin)" veya "Terminal (Admin)"
```

#### **2.2 WSL 2 Yükle**

```powershell
# WSL'i etkinleştir
wsl --install

# Bilgisayarı restart et
Restart-Computer
```

**Restart sonrası:**
```powershell
# WSL 2'yi varsayılan yap
wsl --set-default-version 2

# Ubuntu indir (opsiyonel ama önerilir)
wsl --install -d Ubuntu

# Kullanıcı adı ve şifre oluştur (Ubuntu ilk açılışta soracak)
```

#### **2.3 WSL 2 Kontrol**

```powershell
wsl --list --verbose

# Çıktı şöyle olmalı:
# NAME      STATE           VERSION
# Ubuntu    Running         2
```

---

### **ADIM 3: Docker Desktop Kurulum**

#### **3.1 Docker Desktop İndir**

```
1. https://www.docker.com/products/docker-desktop/ aç
2. "Download for Windows" tıkla
3. "Docker Desktop Installer.exe" indir (yaklaşık 500MB)
```

#### **3.2 Docker Desktop Yükle**

```
1. İndirilen "Docker Desktop Installer.exe" çift tıkla
2. "Use WSL 2 instead of Hyper-V" seçeneğini işaretle ✅
3. "OK" tıkla
4. Kurulum tamamlanınca "Close and restart" tıkla
5. Bilgisayar restart olacak
```

#### **3.3 Docker Desktop Başlat**

```
1. Restart sonrası Docker Desktop otomatik açılır
2. Eğer açılmazsa: Start menü → "Docker Desktop" ara → Aç
3. Docker Terms kabul et
4. "Skip" veya Docker Hub sign in (opsiyonel)
5. Sol altta 🐳 yeşil olmalı: "Docker Desktop is running"
```

#### **3.4 Ayarlar (Önerilen)**

```
1. Docker Desktop → Settings (⚙️ simge)
2. "Resources" → "Advanced":
   - CPUs: 4 (veya yarısı)
   - Memory: 4GB (8GB RAM'iniz varsa 4GB, 16GB varsa 6GB)
   - Swap: 1GB
   - Disk: 60GB
3. "Apply & Restart"
```

---

### **ADIM 4: Docker Test (Windows)**

```powershell
# PowerShell aç (yönetici olmasına gerek yok)

# Docker versiyonu
docker --version
# Çıktı: Docker version 24.x.x, build xxxxx

# Docker Compose versiyonu
docker-compose --version
# Çıktı: Docker Compose version v2.x.x

# Test container çalıştır
docker run hello-world

# Başarılı çıktı:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

**✅ Windows kurulum tamamlandı!** → [Letwash Projesi Kurulum](#letwash-projesi-kurulum) bölümüne geç.

---

## 🍎 Mac Kurulum

### **Sistem Gereksinimleri**

**Mac (Intel veya Apple Silicon):**
- macOS 11 Big Sur veya üzeri
- 4GB RAM (minimum 8GB önerilir)

---

### **ADIM 1: Mac Türünü Öğren**

```bash
# Terminal aç (Cmd + Space → "Terminal" yaz → Enter)

# Mac türünü öğren
uname -m

# Çıktı:
# x86_64        → Intel Mac
# arm64         → Apple Silicon (M1, M2, M3)
```

---

### **ADIM 2: Docker Desktop İndir**

#### **Intel Mac için:**

```
1. https://desktop.docker.com/mac/main/amd64/Docker.dmg
2. Docker.dmg indir (yaklaşık 600MB)
```

#### **Apple Silicon (M1/M2/M3) için:**

```
1. https://desktop.docker.com/mac/main/arm64/Docker.dmg
2. Docker.dmg indir (yaklaşık 400MB)
```

**VEYA:**

```
1. https://www.docker.com/products/docker-desktop/
2. "Download for Mac" tıkla
3. Mac türünü otomatik algılayacak
```

---

### **ADIM 3: Docker Desktop Kur**

```
1. İndirilen Docker.dmg çift tıkla
2. Docker simgesini Applications klasörüne sürükle
3. Applications klasöründe "Docker" simgesine çift tıkla
4. "Open" tıkla (security warning gelirse)
5. Şifrenizi girin (privileged access için)
6. Docker Terms kabul et
7. "Skip" veya Docker Hub sign in (opsiyonel)
```

#### **Docker Desktop İzinleri**

```
1. macOS izin isteyecek:
   ✅ "Allow" tıkla (Docker'ın network'e erişmesi için)
2. Sol altta 🐳 yeşil olmalı: "Docker Desktop is running"
```

---

### **ADIM 4: Ayarlar (Önerilen)**

```
1. Docker Desktop → Preferences (⚙️ simge)
2. "Resources":
   - CPUs: 4 (veya yarısı)
   - Memory: 4GB (8GB RAM'iniz varsa 4GB, 16GB varsa 6GB)
   - Swap: 1GB
   - Disk: 60GB
3. "Apply & Restart"
```

---

### **ADIM 5: Docker Test (Mac)**

```bash
# Terminal aç

# Docker versiyonu
docker --version
# Çıktı: Docker version 24.x.x, build xxxxx

# Docker Compose versiyonu
docker-compose --version
# Çıktı: Docker Compose version v2.x.x

# Test container çalıştır
docker run hello-world

# Başarılı çıktı:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

**✅ Mac kurulum tamamlandı!** → [Letwash Projesi Kurulum](#letwash-projesi-kurulum) bölümüne geç.

---

## 🐧 Linux Kurulum

### **Ubuntu/Debian**

#### **ADIM 1: Eski Docker'ı Kaldır**

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### **ADIM 2: Repository Setup**

```bash
# Update packages
sudo apt-get update

# Install dependencies
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's GPG key
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Setup repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

#### **ADIM 3: Docker Kur**

```bash
# Update packages
sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Versiyonu kontrol et
docker --version
```

#### **ADIM 4: Docker'ı sudo olmadan kullan**

```bash
# Docker grubuna kullanıcıyı ekle
sudo usermod -aG docker $USER

# Logout ve login (veya restart)
# Terminal'i kapat ve yeniden aç
```

#### **ADIM 5: Docker Test (Linux)**

```bash
# Docker versiyonu
docker --version

# Docker Compose versiyonu
docker compose version

# Test container
docker run hello-world
```

---

### **Fedora/RHEL/CentOS**

```bash
# Remove old versions
sudo dnf remove docker docker-common docker-selinux docker-engine

# Add Docker repo
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo

# Install Docker
sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER

# Test
docker run hello-world
```

**✅ Linux kurulum tamamlandı!** → [Letwash Projesi Kurulum](#letwash-projesi-kurulum) bölümüne geç.

---

## 🧪 Docker Test

### **Test 1: Docker Çalışıyor mu?**

```bash
docker run hello-world

# Başarılı çıktı:
# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

### **Test 2: Docker Compose Çalışıyor mu?**

```bash
docker compose version

# Çıktı:
# Docker Compose version v2.x.x
```

### **Test 3: Basit Container Çalıştır**

```bash
# Nginx web server çalıştır
docker run -d -p 8080:80 nginx

# Tarayıcıda aç: http://localhost:8080
# "Welcome to nginx!" görmelisin

# Container'ı durdur
docker ps  # Container ID'yi göreceksin (örn: a1b2c3d4e5f6)
docker stop a1b2c3d4e5f6
```

---

## 🚀 Letwash Projesi Kurulum

### **ADIM 1: Proje Klasörüne Git**

```bash
# Terminal/PowerShell aç

# Desktop'taki proje klasörüne git
cd ~/Desktop/V37

# VEYA Windows PowerShell:
cd C:\Users\KULLANICI_ADIN\Desktop\V37
```

### **ADIM 2: Dosyaları Kontrol Et**

```bash
# Proje dosyalarını listele
ls

# Görmemiz gerekenler:
# docker-compose.yml ✅
# backend/
# components/
# package.json
# ...
```

### **ADIM 3: Environment Variables**

#### **Backend .env**

```bash
# Backend klasörüne git
cd backend

# .env dosyası oluştur
cp .env.example .env

# .env dosyasını düzenle
# Windows: notepad .env
# Mac/Linux: nano .env veya code .env
```

**Minimum .env içeriği:**

```env
# Database
DATABASE_URL=postgresql://letwash:letwash123@postgres:5432/letwash?schema=public

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-characters
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-in-production
REFRESH_TOKEN_EXPIRES_IN=30d

# Session
SESSION_SECRET=your-super-secret-session-key-change-in-production

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:80
FRONTEND_URL=http://localhost:80

# Stripe (opsiyonel - şimdilik boş bırakılabilir)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
```

**Kaydet ve kapat.**

```bash
# Ana dizine dön
cd ..
```

#### **Frontend .env**

```bash
# Ana dizinde .env oluştur
cp .env.example .env

# .env dosyasını düzenle
# Windows: notepad .env
# Mac/Linux: nano .env
```

**.env içeriği:**

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api/v1

# Stripe (opsiyonel)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
```

**Kaydet ve kapat.**

---

### **ADIM 4: Docker Build & Start**

```bash
# Ana dizinde olduğundan emin ol
pwd
# Çıktı: /Users/.../V37 veya C:\Users\...\Desktop\V37

# Docker container'ları build et ve başlat
docker-compose up --build

# İlk çalıştırmada:
# - PostgreSQL database indirilecek (yaklaşık 100MB)
# - Node.js dependencies yüklenecek (yaklaşık 500MB)
# - Build yapılacak (5-10 dakika)
```

**Çıktıda göreceksin:**

```
✅ postgres-db     Started
✅ letwash-backend Starting
✅ letwash-backend Healthy
✅ letwash-frontend Started

...
letwash-backend  | Server is running on port 5000
letwash-frontend | Local: http://localhost:5173
```

---

### **ADIM 5: Database Migration & Seed**

**Yeni bir terminal aç** (önceki terminal'de Docker çalışmaya devam etmeli):

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Prisma migration çalıştır
npx prisma migrate deploy

# Seed data ekle (demo kullanıcılar, branches, vb.)
npm run seed

# Container'dan çık
exit
```

**Seed çıktısı:**

```
✅ Created admin user
✅ Created 2 carwash owners
✅ Created 3 branches
✅ Created 13 stations
✅ Created 15 services
✅ Created subscription tiers
✅ Seed completed!
```

---

### **ADIM 6: Tarayıcıda Aç**

```
http://localhost
```

**Login ekranı açılmalı!** 🎉

**Demo kullanıcılar:**
```
Admin:  admin@letwash.com / Letwash123!
Owner1: owner1@letwash.com / Letwash123!
Owner2: owner2@letwash.com / Letwash123!
```

---

### **ADIM 7: Test Et**

```bash
# Login yap (admin@letwash.com / Letwash123!)
# Dashboard açılmalı
# ✅ Branches görünmeli
# ✅ Stations görünmeli
# ✅ Services görünmeli
```

---

## 🔧 Docker Komutları (Sık Kullanılan)

### **Container Yönetimi**

```bash
# Container'ları başlat
docker-compose up

# Container'ları başlat (detached mode - arka planda)
docker-compose up -d

# Container'ları durdur
docker-compose down

# Container'ları durdur ve verileri sil
docker-compose down -v

# Container'ları rebuild et
docker-compose up --build

# Container'ları restart et
docker-compose restart

# Çalışan container'ları listele
docker ps

# Tüm container'ları listele (durmuş olanlar dahil)
docker ps -a
```

### **Logs (Logları Görme)**

```bash
# Tüm container logları
docker-compose logs

# Sadece backend logları
docker-compose logs backend

# Logları takip et (real-time)
docker-compose logs -f

# Son 100 satır
docker-compose logs --tail=100
```

### **Container'a Giriş**

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Database container'a gir
docker exec -it letwash-db psql -U letwash -d letwash

# Frontend container'a gir
docker exec -it letwash-frontend sh
```

### **Temizlik**

```bash
# Durmuş container'ları sil
docker container prune

# Kullanılmayan image'leri sil
docker image prune

# Kullanılmayan volume'leri sil
docker volume prune

# Tümünü temizle (DİKKAT: Tüm veriler silinir!)
docker system prune -a --volumes
```

---

## 🐛 Troubleshooting

### **Problem 1: "docker: command not found"**

**Çözüm:**

```bash
# Docker Desktop çalışıyor mu kontrol et
# Windows: Görev çubuğunda Docker simgesi yeşil mi?
# Mac: Menu bar'da Docker simgesi var mı?

# Docker Desktop'ı başlat
# Start → Docker Desktop

# Terminal'i yeniden başlat
```

---

### **Problem 2: "Cannot connect to the Docker daemon"**

**Windows:**

```powershell
# Docker Desktop'ı yeniden başlat
# Sağ tık Docker simgesi → Restart

# WSL 2 kontrol et
wsl --list --verbose
# VERSION sütunu "2" olmalı

# Docker Desktop → Settings → General
# "Use WSL 2 based engine" ✅ işaretli olmalı
```

**Mac/Linux:**

```bash
# Docker service'i başlat
sudo systemctl start docker  # Linux
# veya
open -a Docker  # Mac
```

---

### **Problem 3: "Port already in use"**

**5000 portu kullanılıyor:**

```bash
# Windows
netstat -ano | findstr :5000
# PID notunu al (örn: 12345)
taskkill /PID 12345 /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**80 portu kullanılıyor:**

```bash
# Windows
netstat -ano | findstr :80
taskkill /PID [PID] /F

# Mac/Linux
sudo lsof -ti:80 | xargs sudo kill -9
```

**VEYA docker-compose.yml'de portu değiştir:**

```yaml
ports:
  - "8080:80"  # 80 yerine 8080 kullan
```

---

### **Problem 4: "Database connection failed"**

```bash
# Container'ları kontrol et
docker ps

# postgres container çalışıyor mu?
# letwash-db görmelisin

# Backend logs kontrol et
docker-compose logs backend

# Database'i restart et
docker-compose restart postgres

# Database container'a gir ve kontrol et
docker exec -it letwash-db psql -U letwash -d letwash
# \dt  (tabloları listele)
# \q   (çık)
```

---

### **Problem 5: "npm install fails" veya "dependencies error"**

```bash
# Container'ları durdur
docker-compose down

# Node modules volume'ü sil
docker volume rm v37_node_modules

# Rebuild yap
docker-compose up --build
```

---

### **Problem 6: "Migration failed"**

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Database'i sıfırla
npx prisma migrate reset --force

# Migration çalıştır
npx prisma migrate deploy

# Seed yap
npm run seed

# Çık
exit
```

---

### **Problem 7: "Docker Desktop won't start (Windows)"**

```powershell
# WSL 2 güncelle
wsl --update

# WSL 2'yi restart et
wsl --shutdown

# Docker Desktop'ı tekrar başlat

# Hala çalışmıyorsa:
# 1. Docker Desktop'ı kaldır
# 2. %APPDATA%\Docker klasörünü sil
# 3. Docker Desktop'ı yeniden yükle
```

---

### **Problem 8: "Out of memory / Disk space"**

```bash
# Docker disk kullanımını kontrol et
docker system df

# Kullanılmayan şeyleri temizle
docker system prune -a

# Docker Desktop → Settings → Resources
# Disk limiti artır (örn: 60GB → 80GB)
```

---

### **Problem 9: "Seed data yok / Demo users yok"**

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Seed'i manuel çalıştır
npm run seed

# Database'de kullanıcıları kontrol et
docker exec -it letwash-db psql -U letwash -d letwash
SELECT email, role FROM users;
# 3 kullanıcı görmelisin
\q
```

---

### **Problem 10: "Frontend beyaz ekran"**

```bash
# Frontend logs kontrol et
docker-compose logs frontend

# Frontend'i restart et
docker-compose restart frontend

# Tarayıcı cache'ini temizle
# Ctrl + Shift + R (Windows/Linux)
# Cmd + Shift + R (Mac)

# Hala çalışmıyorsa rebuild:
docker-compose down
docker-compose up --build
```

---

## 📊 Container Status Kontrol

```bash
# Tüm container'lar çalışıyor mu?
docker ps

# Beklenen çıktı:
# CONTAINER ID   IMAGE                  STATUS         PORTS
# abc123         v37-frontend           Up 5 minutes   0.0.0.0:80->80/tcp
# def456         v37-backend            Up 5 minutes   0.0.0.0:5000->5000/tcp
# ghi789         postgres:15-alpine     Up 5 minutes   5432/tcp

# Health check
docker inspect letwash-backend | grep -A 5 "Health"

# Beklenen: "Status": "healthy"
```

---

## ✅ Final Checklist

```bash
# Docker kuruldu mu?
[ ] docker --version çalışıyor
[ ] docker-compose version çalışıyor
[ ] docker run hello-world başarılı

# Proje hazır mı?
[ ] docker-compose.yml var
[ ] backend/.env var
[ ] .env var (frontend)

# Container'lar çalışıyor mu?
[ ] docker ps → 3 container çalışıyor
[ ] Backend: http://localhost:5000/health → {"status":"ok"}
[ ] Frontend: http://localhost → Login sayfası

# Database hazır mı?
[ ] Migration çalıştı
[ ] Seed çalıştı
[ ] Demo users var (3 kullanıcı)

# Test
[ ] Login yapılabiliyor
[ ] Dashboard açılıyor
[ ] Branches görünüyor
```

---

## 🎯 Özet Komutlar

```bash
# 1. Proje klasörüne git
cd ~/Desktop/V37

# 2. Docker başlat
docker-compose up --build

# 3. Yeni terminal aç → Migration & Seed
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# 4. Tarayıcıda aç
http://localhost

# 5. Login
admin@letwash.com / Letwash123!
```

---

## 🎉 Başarılı!

Docker kurulumu ve Letwash projesi başarıyla çalışıyor olmalı! 🐳✨

**Sonraki adımlar:**
- 📖 `DEMO_MODE_GUIDE.md` - Demo kullanıcılarla test et
- 💳 `STRIPE_SETUP_GUIDE.md` - Payment entegrasyonu
- 🔐 `SSO_SETUP_GUIDE.md` - Google/Apple login

**Yardıma ihtiyacın varsa:**
- Docker logs: `docker-compose logs -f`
- Container'a gir: `docker exec -it letwash-backend bash`
- Database kontrol: `docker exec -it letwash-db psql -U letwash -d letwash`

**Tebrikler! 🎊🚀**
