#!/bin/bash

# ============================================
# Letwash - Hızlı Başlangıç (macOS)
# ============================================

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════╗"
echo "║                                               ║"
echo "║      🚗 LETWASH - HIZLI BAŞLANGIÇ 🚗        ║"
echo "║                                               ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# 1. Docker kontrol
echo -e "${YELLOW}[1/6] Docker kontrol ediliyor...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker bulunamadı!${NC}"
    echo ""
    echo -e "${YELLOW}Docker Desktop'ı yükleyin:${NC}"
    echo "   🌐 https://www.docker.com/products/docker-desktop"
    echo ""
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker çalışmıyor!${NC}"
    echo ""
    echo -e "${YELLOW}Docker Desktop'ı başlatın:${NC}"
    echo "   Applications → Docker → Başlat"
    echo "   Menü çubuğunda 🐳 ikonunu bekleyin"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Docker çalışıyor${NC}"
echo ""

# 2. Dockerfile düzelt
echo -e "${YELLOW}[2/6] Dockerfile düzeltiliyor...${NC}"
./fix-dockerfile.sh > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dockerfile düzeltildi${NC}"
else
    echo -e "${RED}❌ Dockerfile düzeltme başarısız!${NC}"
    echo ""
    echo -e "${YELLOW}Manuel olarak çalıştırın:${NC}"
    echo "   ./fix-dockerfile.sh"
    echo ""
    exit 1
fi
echo ""

# 3. Eski container'ları temizle
echo -e "${YELLOW}[3/6] Eski container'lar temizleniyor...${NC}"
docker-compose down -v > /dev/null 2>&1
echo -e "${GREEN}✅ Temizlendi${NC}"
echo ""

# 4. Build başlat
echo -e "${YELLOW}[4/6] Docker build başlatılıyor...${NC}"
echo -e "${BLUE}     (Bu işlem 5-10 dakika sürebilir ☕)${NC}"
echo ""

docker-compose up --build -d

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ Docker build başarısız!${NC}"
    echo ""
    echo -e "${YELLOW}Logları kontrol edin:${NC}"
    echo "   docker-compose logs"
    echo ""
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Build tamamlandı!${NC}"
echo ""

# Container'ların başlamasını bekle
echo -e "${YELLOW}Container'lar başlatılıyor...${NC}"
sleep 10

# 5. Database migrations
echo ""
echo -e "${YELLOW}[5/6] Database migrations çalıştırılıyor...${NC}"

docker exec -it letwash-backend npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations tamamlandı${NC}"
else
    echo -e "${RED}⚠️  Migration hatası (devam ediliyor)${NC}"
fi
echo ""

# 6. Seed data
echo -e "${YELLOW}[6/6] Demo veriler yükleniyor...${NC}"

docker exec -it letwash-backend npm run seed

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Demo veriler yüklendi${NC}"
else
    echo -e "${RED}⚠️  Seed hatası (devam ediliyor)${NC}"
fi

# Durum kontrolü
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Container Durumu:${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
docker-compose ps
echo ""

# Başarı mesajı
echo -e "${GREEN}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║            ✅ KURULUM TAMAMLANDI! ✅          ║${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${CYAN}🌐 Uygulama: ${NC}${YELLOW}http://localhost${NC}"
echo ""
echo -e "${CYAN}📧 Demo Hesaplar:${NC}"
echo ""
echo -e "${GREEN}   Root Owner:${NC}"
echo -e "   📧 root@letwash.com"
echo -e "   🔑 root123"
echo ""
echo -e "${GREEN}   Carwash Owner:${NC}"
echo -e "   📧 owner@autowash.com"
echo -e "   🔑 owner123"
echo ""
echo -e "${GREEN}   Branch Admin:${NC}"
echo -e "   📧 admin@branch.com"
echo -e "   🔑 admin123"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${CYAN}💡 Faydalı Komutlar:${NC}"
echo ""
echo "   📊 Durum:        docker-compose ps"
echo "   📝 Loglar:       docker-compose logs -f"
echo "   🔄 Restart:      docker-compose restart"
echo "   🛑 Durdur:       docker-compose down"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}Tarayıcınızı açın: ${NC}${BLUE}http://localhost${NC}"
echo ""
echo -e "${CYAN}Happy washing! 🚗💦✨${NC}"
echo ""
