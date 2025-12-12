# 🚀 Letwash - BURADAN BAŞLA!

**Yeni misin? İşte tek ihtiyacın olan rehber!**

---

## ⚡ 3 Adımda Başla

### **1️⃣ Docker Var mı?**

```bash
docker --version
```

✅ **Çalışıyorsa** → [Adım 2'ye geç](#2️⃣-docker-başlat)

❌ **Çalışmıyorsa** → [Docker Kur](#docker-kurulum)

---

### **Docker Kurulum**

#### **Windows:**
1. https://www.docker.com/products/docker-desktop/ indir
2. Kur ve restart et
3. Docker Desktop başlat

#### **Mac:**
1. https://www.docker.com/products/docker-desktop/ indir
2. Applications'a sürükle
3. Docker başlat

#### **Linux:**
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Logout/login
```

**📖 Detaylı:** [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md)

---

### **2️⃣ Docker Başlat**

```bash
# Proje klasörüne git
cd ~/Desktop/V37

# Docker başlat
docker-compose up --build
```

**İlk kez çalıştırıyorsan 5-10 dakika sürer. ☕**

---

### **3️⃣ Database Kur**

**Yeni terminal aç** (önceki çalışmaya devam etmeli)

```bash
# Migration
docker exec -it letwash-backend npx prisma migrate deploy

# Demo data (3 kullanıcı, branches, services)
docker exec -it letwash-backend npm run seed
```

---

## 🎉 Hazır!

```
http://localhost
```

**Login:**
```
📧 admin@letwash.com
🔑 Letwash123!
```

**VEYA:**

Sağ tarafta "Quick Login" butonuna tıkla! ⚡

---

## 📚 Daha Fazla Bilgi?

### **Hızlı Başlangıç (5 dk)**
→ [QUICK_START.md](QUICK_START.md)

### **Docker Kurulum (Detaylı)**
→ [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md)

### **Environment Variables**
→ [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md)
→ [ENV_FILES_CREATED.md](ENV_FILES_CREATED.md)

### **Demo Kullanıcılar**
→ [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md)

### **Stripe Payment**
→ [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

### **Tüm Dökümanlar**
→ [DOKUMANTASYON_OZET.md](DOKUMANTASYON_OZET.md)

---

## 🐛 Sorun mu Var?

### **"docker: command not found"**
→ Docker Desktop çalışıyor mu kontrol et

### **"Port already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### **"Login çalışmıyor"**
```bash
# Seed çalıştı mı?
docker exec -it letwash-backend npm run seed
```

### **".env dosyası eksik"**
✅ **Artık yok!** .env dosyaları hazır, kontrol et:
→ [ENV_FILES_CREATED.md](ENV_FILES_CREATED.md)

---

## ✅ Kontrol Listesi

- [ ] Docker kurulu ve çalışıyor
- [ ] `docker-compose up --build` çalıştı
- [ ] Migration başarılı
- [ ] Seed başarılı (3 kullanıcı oluştu)
- [ ] http://localhost açılıyor
- [ ] Login çalışıyor
- [ ] Dashboard görünüyor

---

## 🎯 Sıradaki Ne?

1. **Platform'u keşfet**
   - Branches, Services, Bookings sayfalarını dolaş
   - Farklı demo kullanıcılarla giriş yap

2. **Stripe ekle (opsiyonel)**
   - [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)
   - Test payment yap

3. **Production'a hazırla**
   - SSL kur
   - Domain ayarla
   - Deploy et!

---

## 📞 Yardım

**Dokümantasyon:**
- 📖 [README.md](README.md) - Genel bakış
- ⚡ [QUICK_START.md](QUICK_START.md) - 5 dakika
- 🐳 [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md) - Detaylı
- ✅ [INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md) - Adım adım

**Destek:**
- GitHub Issues: [Create Issue](https://github.com/Smyrgzr/V37/issues)
- Email: support@letwash.com

---

**Başarılar! 🚀✨**

**Hemen başla:** `docker-compose up --build`
