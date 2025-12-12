# 🍎 macOS Hızlı Başlangıç

**Letwash'i macOS'ta 3 dakikada çalıştırın!**

---

## ⚡ Tek Komut İle Başlat

```bash
# Terminal açın (Cmd + Space → "Terminal")
# Proje dizinine gidin
cd ~/Desktop/V37   # veya projenizin yolu

# Otomatik kurulum scripti çalıştırın
bash quick-start.sh
```

**Bu kadar!** 🎉

---

## 📋 Script Ne Yapar?

1. ✅ Docker'ı kontrol eder
2. ✅ Dockerfile'ı düzeltir
3. ✅ Eski container'ları temizler
4. ✅ Build başlatır (5-10 dakika)
5. ✅ Database migrations çalıştırır
6. ✅ Demo verileri yükler
7. ✅ Hazır! http://localhost

---

## 🛠️ Manuel Kurulum (Gerekirse)

### **1. Docker Yok İse**

```bash
# Docker Desktop indir ve kur
🌐 https://www.docker.com/products/docker-desktop

# Mac with Intel chip veya Mac with Apple chip seçin
# .dmg indir → Applications'a sürükle → Docker'ı başlat
```

### **2. Dockerfile Sorunu Varsa**

```bash
# Otomatik düzelt
bash fix-dockerfile.sh
```

### **3. Manuel Build**

```bash
# Temizlik
docker-compose down -v

# Build
docker-compose up --build

# Yeni terminal - Database
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# Aç
open http://localhost
```

---

## 🎯 Demo Hesaplar

| Email | Password | Rol |
|-------|----------|-----|
| `root@letwash.com` | `root123` | ROOT OWNER |
| `owner@autowash.com` | `owner123` | Carwash Owner |
| `admin@branch.com` | `admin123` | Branch Admin |

---

## 💡 Faydalı Komutlar

```bash
# Durum
docker-compose ps

# Loglar
docker-compose logs -f

# Restart
docker-compose restart

# Durdur
docker-compose down

# Tamamen temizle
docker-compose down -v
docker system prune -a --volumes
```

---

## 🐛 Sorunlar?

### **"Docker command not found"**
```bash
# Docker Desktop'ı başlatın
# Applications → Docker
# Menü çubuğunda 🐳 ikonunu bekleyin
```

### **Port 80 kullanımda**
```bash
# Apache varsa kapat
sudo apachectl stop

# Veya docker-compose.yml'de portu değiştir
```

### **Build başarısız**
```bash
# Cache temizle
docker system prune -f

# Yeniden dene
bash quick-start.sh
```

---

## 📚 Detaylı Rehber

Daha fazla bilgi için:

**📱 [MACOS_DOCKER_KURULUM.md](MACOS_DOCKER_KURULUM.md)** - Adım adım detaylı rehber

---

## 🚀 Hızlı Özet

```bash
# 1. Terminal aç
Cmd + Space → "Terminal"

# 2. Proje dizinine git
cd ~/Desktop/V37

# 3. Çalıştır
bash quick-start.sh

# 4. Aç
open http://localhost

# 5. Login
root@letwash.com / root123
```

**O kadar basit!** 🎊

---

**Hazır mısınız?** Terminali açın ve başlayın! 🚀

**Happy washing!** 🚗💦✨
