#!/bin/bash

# ============================================
# LETWASH - PRODUCTION DEPLOYMENT SCRIPT
# ============================================
# Usage: ./scripts/deploy.sh [environment]
# Example: ./scripts/deploy.sh production

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Environment (default: production)
ENV=${1:-production}

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}LETWASH DEPLOYMENT SCRIPT${NC}"
echo -e "${GREEN}Environment: $ENV${NC}"
echo -e "${GREEN}============================================${NC}"

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo -e "${RED}Error: .env.production not found!${NC}"
    echo -e "${YELLOW}Copy .env.production.example and fill in values${NC}"
    exit 1
fi

# Check for required commands
for cmd in docker docker-compose git; do
    if ! command -v $cmd &> /dev/null; then
        echo -e "${RED}Error: $cmd is not installed${NC}"
        exit 1
    fi
done

echo -e "${YELLOW}Step 1/8: Pulling latest code...${NC}"
git pull origin main

echo -e "${YELLOW}Step 2/8: Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo -e "${YELLOW}Step 3/8: Building Docker images...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}Step 4/8: Starting containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}Step 5/8: Waiting for database to be ready...${NC}"
sleep 10

echo -e "${YELLOW}Step 6/8: Running database migrations...${NC}"
docker exec -it letwash-backend-prod npx prisma migrate deploy

echo -e "${YELLOW}Step 7/8: Checking container health...${NC}"
sleep 5
docker-compose -f docker-compose.prod.yml ps

echo -e "${YELLOW}Step 8/8: Running health checks...${NC}"
# Backend health
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    exit 1
fi

# Frontend health
if curl -f http://localhost/ > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is healthy${NC}"
else
    echo -e "${RED}❌ Frontend health check failed${NC}"
    exit 1
fi

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}Frontend: http://localhost${NC}"
echo -e "${GREEN}Backend: http://localhost:5000${NC}"
echo -e "${GREEN}Logs: docker-compose -f docker-compose.prod.yml logs -f${NC}"
echo -e "${GREEN}============================================${NC}"
