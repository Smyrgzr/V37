#!/bin/bash

# ============================================
# LETWASH - HEALTH CHECK SCRIPT
# ============================================
# Usage: ./scripts/health-check.sh
# Cron: */5 * * * * /path/to/scripts/health-check.sh

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
FRONTEND_URL="http://localhost"
BACKEND_URL="http://localhost:5000"
EMAIL_ALERT="admin@letwash.com"  # Change this

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}LETWASH HEALTH CHECK${NC}"
echo -e "${GREEN}Date: $(date)${NC}"
echo -e "${GREEN}============================================${NC}"

# Check Docker containers
echo -e "${YELLOW}Checking Docker containers...${NC}"
CONTAINERS=("letwash-db-prod" "letwash-backend-prod" "letwash-frontend-prod")
ALL_HEALTHY=true

for CONTAINER in "${CONTAINERS[@]}"; do
    if docker ps | grep -q $CONTAINER; then
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER 2>/dev/null || echo "no health check")
        if [ "$HEALTH" = "healthy" ] || [ "$HEALTH" = "no health check" ]; then
            echo -e "${GREEN}✅ $CONTAINER: Running${NC}"
        else
            echo -e "${RED}❌ $CONTAINER: Unhealthy${NC}"
            ALL_HEALTHY=false
        fi
    else
        echo -e "${RED}❌ $CONTAINER: Not running${NC}"
        ALL_HEALTHY=false
    fi
done

# Check backend health endpoint
echo -e "${YELLOW}Checking backend health...${NC}"
if curl -f -s "$BACKEND_URL/health" > /dev/null; then
    echo -e "${GREEN}✅ Backend: Healthy${NC}"
else
    echo -e "${RED}❌ Backend: Health check failed${NC}"
    ALL_HEALTHY=false
fi

# Check frontend
echo -e "${YELLOW}Checking frontend...${NC}"
if curl -f -s "$FRONTEND_URL" > /dev/null; then
    echo -e "${GREEN}✅ Frontend: Healthy${NC}"
else
    echo -e "${RED}❌ Frontend: Health check failed${NC}"
    ALL_HEALTHY=false
fi

# Check database connection
echo -e "${YELLOW}Checking database...${NC}"
if docker exec letwash-db-prod pg_isready -U letwash > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database: Ready${NC}"
else
    echo -e "${RED}❌ Database: Not ready${NC}"
    ALL_HEALTHY=false
fi

# Check disk space
echo -e "${YELLOW}Checking disk space...${NC}"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -lt 80 ]; then
    echo -e "${GREEN}✅ Disk space: ${DISK_USAGE}% used${NC}"
elif [ $DISK_USAGE -lt 90 ]; then
    echo -e "${YELLOW}⚠️  Disk space: ${DISK_USAGE}% used (warning)${NC}"
else
    echo -e "${RED}❌ Disk space: ${DISK_USAGE}% used (critical)${NC}"
    ALL_HEALTHY=false
fi

# Check memory usage
echo -e "${YELLOW}Checking memory usage...${NC}"
MEM_USAGE=$(free | grep Mem | awk '{print int($3/$2 * 100)}')
if [ $MEM_USAGE -lt 80 ]; then
    echo -e "${GREEN}✅ Memory: ${MEM_USAGE}% used${NC}"
elif [ $MEM_USAGE -lt 90 ]; then
    echo -e "${YELLOW}⚠️  Memory: ${MEM_USAGE}% used (warning)${NC}"
else
    echo -e "${RED}❌ Memory: ${MEM_USAGE}% used (critical)${NC}"
fi

# Check CPU load
echo -e "${YELLOW}Checking CPU load...${NC}"
CPU_LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk -F, '{print $1}' | xargs)
echo -e "${GREEN}ℹ️  CPU Load: $CPU_LOAD${NC}"

echo -e "${GREEN}============================================${NC}"
if [ "$ALL_HEALTHY" = true ]; then
    echo -e "${GREEN}✅ ALL SYSTEMS OPERATIONAL${NC}"
else
    echo -e "${RED}❌ SOME SYSTEMS UNHEALTHY${NC}"
    # Send alert (uncomment if you have mail configured)
    # echo "Letwash health check failed" | mail -s "ALERT: Letwash Health Check Failed" $EMAIL_ALERT
fi
echo -e "${GREEN}============================================${NC}"
