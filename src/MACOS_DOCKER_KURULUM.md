# 🍎 macOS'ta Letwash Docker Kurulum Rehberi

**Adım adım Docker kurulumu ve projeyi çalıştırma**

---

## ✅ Ön Gereksinimler

1. **macOS:** 10.15 (Catalina) veya üzeri
2. **RAM:** En az 4GB (8GB önerilir)
3. **Disk:** En az 10GB boş alan

---

## 📦 ADIM 1: Docker Desktop Kurulumu

### **1.1 Docker Desktop İndir**

```
🌐 https://www.docker.com/products/docker-desktop
```

1. "Download for Mac" butonuna tıklayın
2. **Mac with Intel chip** veya **Mac with Apple chip** seçin:
   - **Intel Mac:** `Docker.dmg` (Intel)
   - **M1/M2/M3 Mac:** `Docker.dmg` (Apple Silicon)

### **1.2 Docker Desktop Kur**

```bash
# DMG dosyasını çift tıklayın
# Docker.app'i Applications klasörüne sürükleyin
# Applications'tan Docker'ı açın
```

### **1.3 Docker'ı Başlat**

1. **Launchpad** → **Docker** açın
2. İlk açılışta izinler isteyecek → **"OK"** tıklayın
3. Şifrenizi girin (admin şifresi)
4. Menü çubuğunda 🐳 ikonu görünene kadar bekleyin (1-2 dakika)

### **1.4 Docker Kurulumunu Doğrula**

Terminal açın (`Cmd + Space` → "Terminal" yazın):

```bash
# Docker versiyonunu kontrol et
docker --version
# Beklenen: Docker version 24.x.x veya üzeri

# Docker Compose versiyonu
docker-compose --version
# Beklenen: Docker Compose version v2.x.x veya üzeri

# Test çalıştırması
docker run hello-world
# Beklenen: "Hello from Docker!" mesajı
```

✅ Bu komutlar başarılıysa, Docker kurulumu tamamdır!

---

## 🚨 ADIM 2: Dockerfile Klasör Sorununu Düzelt

**⚠️ ÖNEMLİ:** Şu anda `backend/Dockerfile` bir **klasör** durumunda, ama **dosya** olmalı!

### **2.1 Terminal Açın**

```bash
# Cmd + Space → "Terminal" yazın → Enter
```

### **2.2 Proje Klasörüne Git**

```bash
# Projenizin bulunduğu yere gidin (örnek):
cd ~/Desktop/V37
# veya
cd ~/Documents/V37
# veya projenizin tam yolunu yazın
```

### **2.3 Mevcut Dockerfile Klasörünü Sil**

```bash
# Dockerfile klasörünü ve içindekileri sil
rm -rf backend/Dockerfile

# Kontrol et - artık olmamalı
ls -la backend/ | grep Dockerfile
```

### **2.4 Doğru Dockerfile Dosyasını Oluştur**

```bash
# Doğru Dockerfile'ı oluştur
cat > backend/Dockerfile << 'EOF'
# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/prisma ./prisma
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/index.js"]
EOF
```

### **2.5 Doğrula**

```bash
# Dockerfile'ın dosya olduğunu kontrol et
file backend/Dockerfile

# Beklenen çıktı:
# backend/Dockerfile: ASCII text

# İçeriği görüntüle
cat backend/Dockerfile
```

✅ "ASCII text" veya benzer çıktı görüyorsanız başarılı!

---

## 🚀 ADIM 3: Docker ile Projeyi Başlat

### **3.1 Eski Container'ları Temizle**

```bash
# Proje dizininde olduğunuzdan emin olun
pwd
# Çıktı: /Users/yourname/.../V37 gibi olmalı

# Eski container'ları durdur ve sil
docker-compose down -v

# Docker cache temizle (isteğe bağlı)
docker system prune -f
```

### **3.2 Docker Build Başlat**

```bash
# Build ve çalıştır (5-10 dakika sürer)
docker-compose up --build
```

**Beklenen Çıktı:**

```
[+] Building 180.5s (23/23) FINISHED
 ✔ postgres Pulled
 ✔ backend Built
 ✔ frontend Built

[+] Running 4/4
 ✔ Network letwash_letwash-network   Created
 ✔ Volume "letwash_postgres_data"    Created
 ✔ Container letwash-db              Healthy
 ✔ Container letwash-backend         Started
 ✔ Container letwash-frontend        Started
```

**Not:** İlk build 5-10 dakika sürebilir. Sabırla bekleyin! ☕

### **3.3 Build Loglarını İzleyin**

Build sırasında şunları göreceksiniz:

```
letwash-backend  | > letwash-backend@1.0.0 start
letwash-backend  | > node src/index.js
letwash-backend  | 
letwash-backend  | ✅ Prisma schema loaded
letwash-backend  | ✅ Database connected
letwash-backend  | 🚀 Server running on port 5000
```

✅ Bu mesajları gördüğünüzde backend hazırdır!

---

## 💾 ADIM 4: Database Setup

Build tamamlandıktan sonra **YENİ BİR TERMINAL** açın:

### **4.1 Yeni Terminal Aç**

```bash
# Cmd + T (yeni tab)
# veya
# Cmd + N (yeni pencere)

# Proje dizinine git
cd ~/Desktop/V37
# (veya projenizin yolu)
```

### **4.2 Migrations Çalıştır**

```bash
# Database tablolarını oluştur
docker exec -it letwash-backend npx prisma migrate deploy
```

**Beklenen Çıktı:**

```
✅ Migrations applied:
  - 20240101000000_init
  - 20240102000000_add_payments
  - ...
```

### **4.3 Demo Data Yükle**

```bash
# Demo kullanıcıları ve verileri ekle
docker exec -it letwash-backend npm run seed
```

**Beklenen Çıktı:**

```
🌱 Seeding database...
✅ Created users
✅ Created car wash centers
✅ Created branches
✅ Created services
✅ Seeding completed!
```

---

## 🌐 ADIM 5: Uygulamayı Aç

### **5.1 Browser'da Aç**

```
🌐 http://localhost
```

Safari, Chrome, veya Firefox'ta açın.

### **5.2 Demo Hesaplarla Giriş Yap**

**Seçenek 1: Root Owner (Admin)**
```
📧 Email: root@letwash.com
🔑 Password: root123
```

**Seçenek 2: Carwash Owner**
```
📧 Email: owner@autowash.com
🔑 Password: owner123
```

**Seçenek 3: Branch Admin**
```
📧 Email: admin@branch.com
🔑 Password: admin123
```

---

## 📊 ADIM 6: Container'ları Kontrol Et

### **6.1 Container Durumunu Göster**

```bash
docker-compose ps
```

**Beklenen Çıktı:**

```
NAME                 STATUS         PORTS
letwash-db           Up (healthy)   5432/tcp
letwash-backend      Up             0.0.0.0:5000->5000/tcp
letwash-frontend     Up             0.0.0.0:80->80/tcp
```

### **6.2 Logları İzle**

```bash
# Tüm loglar (canlı)
docker-compose logs -f

# Sadece backend
docker-compose logs -f backend

# Sadece frontend
docker-compose logs -f frontend

# Çıkmak için: Ctrl + C
```

---

## 🔧 Günlük Kullanım Komutları

### **Container Başlat/Durdur**

```bash
# Başlat (build sonrası hızlı başlatma)
docker-compose up -d

# Durdur
docker-compose down

# Restart
docker-compose restart

# Belirli bir container'ı restart
docker-compose restart backend
```

### **Database İşlemleri**

```bash
# PostgreSQL console
docker exec -it letwash-db psql -U letwash -d letwash

# Kullanıcıları listele
SELECT email, role FROM users;

# Çıkmak için
\q

# Prisma Studio (Database GUI)
docker exec -it letwash-backend npx prisma studio
# Browser'da açılır: http://localhost:5555
```

### **Backend Shell**

```bash
# Backend container'a gir
docker exec -it letwash-backend sh

# Çıkmak için
exit
```

---

## 🐛 Sorun Giderme

### **Port 80 Kullanımda Hatası**

```bash
# Port 80'i kim kullanıyor?
sudo lsof -i :80

# Apache varsa kapat
sudo apachectl stop

# Veya docker-compose.yml'de portu değiştir:
frontend:
  ports:
    - "8080:80"  # 80 yerine 8080

# Sonra: http://localhost:8080
```

### **Build Başarısız**

```bash
# Cache'siz rebuild
docker-compose build --no-cache

# Sadece backend rebuild
docker-compose build --no-cache backend
```

### **"Cannot connect to Docker daemon"**

```bash
# Docker Desktop açık mı kontrol et
# Menü çubuğunda 🐳 ikonu olmalı

# Docker Desktop'ı restart et
# Docker Desktop → ⚙️ → Restart
```

### **Containers Çalışmıyor**

```bash
# Tamamen temizle
docker-compose down -v
docker system prune -a --volumes

# Yeniden başlat
docker-compose up --build
```

### **Database Bağlanamıyor**

```bash
# Postgres healthy mi?
docker-compose ps

# Postgres logları
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### **Frontend 502 Bad Gateway**

```bash
# Backend çalışıyor mu?
curl http://localhost:5000/health

# Backend restart
docker-compose restart backend

# Frontend restart
docker-compose restart frontend
```

---

## 🎯 Başarı Kontrol Listesi

- [ ] Docker Desktop yüklü ve çalışıyor (🐳 menü çubuğunda)
- [ ] `docker --version` çalışıyor
- [ ] `backend/Dockerfile` bir **dosya** (klasör değil!)
- [ ] `docker-compose up --build` başarılı
- [ ] 3 container çalışıyor (db, backend, frontend)
- [ ] `docker exec -it letwash-backend npx prisma migrate deploy` başarılı
- [ ] `docker exec -it letwash-backend npm run seed` başarılı
- [ ] http://localhost açılıyor
- [ ] Login sayfası görünüyor
- [ ] Demo hesapla giriş yapılıyor
- [ ] Dashboard açılıyor

**Hepsi ✅ ise tebrikler! 🎉**

---

## 💡 macOS İpuçları

### **Docker Desktop Ayarları**

```
Docker Desktop → ⚙️ Settings → Resources
```

- **CPUs:** 2-4 (ne kadar çok o kadar hızlı)
- **Memory:** 4-8 GB
- **Disk:** 20-60 GB

### **Otomatik Başlatma**

```
Docker Desktop → ⚙️ Settings → General
✅ Start Docker Desktop when you log in
```

### **Docker Menüsü (Menü Çubuğu)**

🐳 ikonu → Sağ tık:

- **Dashboard:** Container'ları görsel olarak yönet
- **Restart:** Docker'ı yeniden başlat
- **Quit:** Docker'ı kapat
- **Preferences:** Ayarlar

### **Terminal Shortcut**

```bash
# ~/.zshrc veya ~/.bash_profile'e ekle:
alias docker-start='docker-compose up -d'
alias docker-stop='docker-compose down'
alias docker-logs='docker-compose logs -f'

# Reload
source ~/.zshrc
```

---

## 📚 Faydalı Komutlar

```bash
# Disk kullanımı
docker system df

# Kullanılmayan her şeyi temizle
docker system prune -a --volumes

# Image'ları listele
docker images

# Container'ları listele
docker ps -a

# Network'leri listele
docker network ls

# Volume'ları listele
docker volume ls
```

---

## 🚀 Hızlı Başlangıç Özeti

```bash
# 1. Proje dizinine git
cd ~/Desktop/V37

# 2. Dockerfile düzelt (yukarıda anlatıldı)
rm -rf backend/Dockerfile
cat > backend/Dockerfile << 'EOF'
[Dockerfile içeriği...]
EOF

# 3. Build ve başlat
docker-compose up --build

# 4. Yeni terminal - Database
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# 5. Aç
open http://localhost
```

---

## 🎓 Sonraki Adımlar

1. ✅ Sistemle tanışın - demo verilerle oynayın
2. ✅ Branch oluşturun
3. ✅ Servis ekleyin
4. ✅ Test booking yapın
5. ✅ Payment flow test edin (Stripe test mode)

---

## 📞 Yardım

### **Dokümantasyon:**

- [DOCKER_QUICK_START.md](DOCKER_QUICK_START.md)
- [NEW_AUTH_FLOW_GUIDE.md](NEW_AUTH_FLOW_GUIDE.md)
- [README.md](README.md)

### **Komutlar Hatırlatma:**

```bash
# Başlat
docker-compose up -d

# Durdur
docker-compose down

# Loglar
docker-compose logs -f

# Status
docker-compose ps
```

---

**macOS'ta Docker kurulumu tamamlandı!** 🍎🐳✨

**Sorularınız için:** Her adımda terminal çıktılarını kontrol edin!

**Başarılar!** 🚀
