# 🚀 Letwash Docker Quick Start

**Son Güncelleme:** 12 Aralık 2024  
**Durum:** ✅ Production Ready

---

## ⚡ 3 Dakikada Başla

### **Adım 1: Docker Başlat**

```bash
# Temiz başlat (önceki veriler silinir)
docker-compose down -v

# Build ve çalıştır
docker-compose up --build
```

**Beklenen Süre:** 5-10 dakika (ilk build)

---

### **Adım 2: Database Setup** (Yeni Terminal)

Build tamamlandıktan sonra yeni bir terminal açın:

```bash
# Migrations
docker exec -it letwash-backend npx prisma migrate deploy

# Demo data seed
docker exec -it letwash-backend npm run seed
```

---

### **Adım 3: Test Et**

```
🌐 URL: http://localhost
```

**Demo Hesaplar:**

| Email | Password | Role |
|-------|----------|------|
| `root@letwash.com` | `root123` | ROOT OWNER (Admin) |
| `owner@autowash.com` | `owner123` | Carwash Owner |
| `admin@branch.com` | `admin123` | Branch Admin |

---

## 🎯 Yeni Kullanıcı Kaydı (Sign Up Flow)

### **1. Sign Up**
- http://localhost açın
- "Sign up" tıklayın
- Formu doldurun:
  - Full Name
  - Email
  - Password
  - Business Name
  - Phone, Address, City, District

### **2. Business Modules**
Kullanacağınız iş modüllerini seçin:
- ✅ In-Bay Automatic
- ✅ Tunnel Wash
- ✅ Self-Service
- ✅ Mobile Wash
- ✅ Manual Detailing
- ✅ Mobile Detailing
- ✅ Pick-up & Drop-off Detailing

### **3. Subscription**
Plan seçin:
- **Starter:** $99/month, 15% commission
- **Professional:** $299/month, 10% commission  
- **Enterprise:** $699/month, 7.5% commission

### **4. Agreements** ✅
3 anlaşmayı kabul edin:
- ✅ Terms of Service
- ✅ Privacy Policy
- ✅ Transaction Agreement

### **5. Branch Setup**
İlk şubenizi oluşturun:
- Branch name
- Address
- Phone
- Working hours
- Staff count
- Or "Skip for now"

### **6. Dashboard** 🎉
Hoş geldiniz! Artık sistemdeyisiniz!

---

## 🏗️ Build Output

### **Başarılı Build:**

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

### **Backend Logs:**

```
letwash-backend  | ✅ Prisma schema loaded
letwash-backend  | ✅ Database connected
letwash-backend  | ✅ Server listening on port 5000
```

### **Frontend Logs:**

```
letwash-frontend | nginx started successfully
```

---

## 📊 Container'ları İzle

```bash
# Tüm logs (canlı)
docker-compose logs -f

# Sadece backend
docker-compose logs -f backend

# Sadece frontend
docker-compose logs -f frontend

# Container durumu
docker-compose ps
```

**Beklenen Output:**

```
NAME                 STATUS         PORTS
letwash-db           Up (healthy)   5432/tcp
letwash-backend      Up             0.0.0.0:5000->5000/tcp
letwash-frontend     Up             0.0.0.0:80->80/tcp
```

---

## 🔧 Komutlar

### **Container Management**

```bash
# Başlat (arka planda)
docker-compose up -d

# Durdur
docker-compose down

# Restart
docker-compose restart

# Rebuild (değişiklik sonrası)
docker-compose up --build

# Tamamen temizle (data dahil)
docker-compose down -v
docker system prune -a --volumes
```

### **Database**

```bash
# PostgreSQL console
docker exec -it letwash-db psql -U letwash -d letwash

# Users listele
SELECT email, role FROM users;

# Migrations
docker exec -it letwash-backend npx prisma migrate deploy

# Seed data
docker exec -it letwash-backend npm run seed

# Prisma Studio (database GUI)
docker exec -it letwash-backend npx prisma studio
```

### **Backend Shell**

```bash
# Backend container'a gir
docker exec -it letwash-backend bash

# Node version
docker exec -it letwash-backend node --version

# Package list
docker exec -it letwash-backend npm list
```

---

## 🐛 Sorun Giderme

### **Port 80 kullanımda**

```bash
# Farklı port kullan
# docker-compose.yml içinde:
frontend:
  ports:
    - "8080:80"  # 80 yerine 8080

# Sonra http://localhost:8080
```

### **Build başarısız**

```bash
# Cache'siz build
docker-compose build --no-cache

# Tek container rebuild
docker-compose build --no-cache frontend
```

### **Database bağlanmıyor**

```bash
# Container sağlıklı mı?
docker-compose ps

# Backend logs kontrol
docker-compose logs backend

# Database restart
docker-compose restart postgres
```

### **Frontend 502 Bad Gateway**

```bash
# Backend çalışıyor mu?
curl http://localhost:5000/health

# Nginx logs
docker-compose logs frontend

# Restart
docker-compose restart frontend backend
```

### **Migrations başarısız**

```bash
# Database sıfırla
docker-compose down -v
docker-compose up -d postgres
# Bekle 10 saniye
docker-compose up -d backend
docker exec -it letwash-backend npx prisma migrate deploy
```

---

## 📁 Dosya Yapısı

```
V37/
├── docker-compose.yml              # Docker Compose config
├── docker-compose.prod.yml         # Production config
├── Dockerfile.frontend             # Frontend build
├── backend/
│   ├── Dockerfile                  # Backend build
│   ├── .dockerignore               # Backend ignore rules
│   └── prisma/
│       ├── schema.prisma           # Database schema
│       └── seed.js                 # Demo data
├── nginx.conf                      # Nginx config
├── vite.config.ts                  # Vite build config
├── index.html                      # HTML entry
├── src/
│   └── main.tsx                    # React entry
└── .dockerignore                   # Frontend ignore rules
```

---

## 🌍 Production Deployment

```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build -d

# Environment variables
cp .env.production.example .env.production
# Edit .env.production with real values

# Migrations
docker exec -it letwash-backend-prod npx prisma migrate deploy

# Health check
curl http://your-domain.com/health
```

---

## 📈 Performance

### **Build Times**

| Phase | First Build | Cached Build |
|-------|-------------|--------------|
| Backend | ~120s | ~30s |
| Frontend | ~180s | ~45s |
| Postgres | ~10s | ~0s |
| **Total** | **~5 min** | **~1 min** |

### **Image Sizes**

```
letwash-frontend:latest    ~30MB   (optimized!)
letwash-backend:latest     ~200MB
postgres:15-alpine         ~240MB
```

### **Runtime Resources**

```
Backend:   ~100MB RAM, 0.5% CPU
Frontend:  ~10MB RAM, 0.1% CPU
Postgres:  ~50MB RAM, 0.2% CPU
───────────────────────────────
Total:     ~160MB RAM (very light!)
```

---

## ✅ Health Checks

### **1. Containers Running**

```bash
docker-compose ps
# All should be "Up" or "Up (healthy)"
```

### **2. Backend Health**

```bash
curl http://localhost:5000/health
# Expected: {"status":"ok"}
```

### **3. Frontend Accessible**

```bash
curl http://localhost
# Expected: HTML response
```

### **4. Database Connection**

```bash
docker exec -it letwash-backend npx prisma db pull
# Expected: No errors
```

### **5. Full System Test**

1. Open http://localhost
2. Click "Sign up"
3. Fill registration form
4. Complete flow to dashboard
5. ✅ Everything works!

---

## 🎓 Next Steps

### **After Installation:**

1. ✅ Login with demo account
2. ✅ Explore dashboard
3. ✅ Create a branch
4. ✅ Add services
5. ✅ Create test booking
6. ✅ Test payment flow (Stripe test mode)

### **Customize:**

1. Update environment variables
2. Configure Stripe keys
3. Add your logo
4. Customize branding
5. Add real data

### **Production:**

1. Use production Docker Compose
2. Set up SSL/HTTPS
3. Configure domain
4. Set up monitoring
5. Enable backups

---

## 📞 Support

### **Documentation:**

- [DOCKER_COMPLETE_FIX.md](DOCKER_COMPLETE_FIX.md) - Complete Docker setup
- [QUICK_START.md](QUICK_START.md) - General quick start
- [README.md](README.md) - Full documentation

### **Commands Reference:**

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Restart service
docker-compose restart backend

# Complete reset
docker-compose down -v && docker-compose up --build
```

---

## 🎉 Success Checklist

- [ ] `docker-compose up --build` completed successfully
- [ ] All 3 containers running (db, backend, frontend)
- [ ] Migrations executed without errors
- [ ] Seed data loaded
- [ ] http://localhost accessible
- [ ] Login page displayed
- [ ] Demo login works
- [ ] Sign up flow works
- [ ] Dashboard accessible
- [ ] No console errors

**All checked?** 🎊 You're ready to rock! 🚀

---

## 🔥 Pro Tips

1. **First time?** Wait for full build (~5-10 min)
2. **Cache hit?** Second build is <2 min
3. **Backend changes?** Only rebuild backend: `docker-compose build backend`
4. **Frontend changes?** Only rebuild frontend: `docker-compose build frontend`
5. **Database issues?** `docker-compose down -v` nukes everything
6. **Logs flooding?** Use `docker-compose logs -f backend | grep ERROR`
7. **Want GUI?** Use Docker Desktop for visual container management

---

**Quick Command Reference:**

```bash
# 🚀 Start
docker-compose up -d

# 🛑 Stop
docker-compose down

# 🔄 Restart
docker-compose restart

# 📊 Status
docker-compose ps

# 📝 Logs
docker-compose logs -f

# 🗑️ Clean
docker-compose down -v

# 🏗️ Rebuild
docker-compose up --build
```

---

**Ready?** Run: `docker-compose up --build` 🎯

**Need help?** Check logs: `docker-compose logs -f` 📋

**Happy washing!** 🚗💦✨
