#!/bin/bash

# ============================================
# Letwash - Dockerfile Otomatik Düzeltme
# ============================================

echo "🔧 Dockerfile düzeltiliyor..."
echo ""

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Backend Dockerfile klasörünü sil
if [ -d "backend/Dockerfile" ]; then
    echo -e "${YELLOW}⚠️  backend/Dockerfile bir klasör - siliniyor...${NC}"
    rm -rf backend/Dockerfile
    echo -e "${GREEN}✅ Eski Dockerfile klasörü silindi${NC}"
else
    echo -e "${GREEN}✅ Dockerfile klasörü yok${NC}"
fi

# Doğru Dockerfile dosyasını oluştur
echo ""
echo -e "${YELLOW}📝 Yeni Dockerfile oluşturuluyor...${NC}"

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

echo -e "${GREEN}✅ Yeni Dockerfile oluşturuldu${NC}"

# .dockerignore kontrolü
echo ""
if [ ! -f "backend/.dockerignore" ]; then
    echo -e "${YELLOW}📝 .dockerignore oluşturuluyor...${NC}"
    
    cat > backend/.dockerignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log
yarn-error.log
package-lock.json

# Environment files
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Git
.git/
.gitignore

# Documentation
*.md
!README.md

# Docker
Dockerfile
docker-compose*.yml
.dockerignore

# Test files
__tests__/
*.test.js
*.spec.js
coverage/

# Logs
logs/
*.log

# Misc
.prettierrc
.eslintrc*
tsconfig.json
EOF
    
    echo -e "${GREEN}✅ .dockerignore oluşturuldu${NC}"
else
    echo -e "${GREEN}✅ .dockerignore zaten var${NC}"
fi

# Doğrula
echo ""
echo -e "${YELLOW}🔍 Doğrulanıyor...${NC}"

# Dockerfile dosya mı kontrol et
if [ -f "backend/Dockerfile" ]; then
    FILE_TYPE=$(file backend/Dockerfile)
    if [[ $FILE_TYPE == *"ASCII text"* ]] || [[ $FILE_TYPE == *"text"* ]]; then
        echo -e "${GREEN}✅ backend/Dockerfile doğru - dosya!${NC}"
        echo -e "${GREEN}   Tip: $FILE_TYPE${NC}"
    else
        echo -e "${RED}❌ backend/Dockerfile hatalı tip!${NC}"
        echo -e "${RED}   Tip: $FILE_TYPE${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ backend/Dockerfile bulunamadı!${NC}"
    exit 1
fi

# İlk satırı göster
echo ""
echo -e "${GREEN}📄 Dockerfile ilk satırı:${NC}"
head -n 1 backend/Dockerfile

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Dockerfile başarıyla düzeltildi!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}🚀 Şimdi Docker'ı başlatabilirsiniz:${NC}"
echo ""
echo "   docker-compose down -v"
echo "   docker-compose up --build"
echo ""
echo -e "${YELLOW}📖 Detaylı rehber: MACOS_DOCKER_KURULUM.md${NC}"
echo ""
