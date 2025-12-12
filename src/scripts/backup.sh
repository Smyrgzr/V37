#!/bin/bash

# ============================================
# LETWASH - DATABASE BACKUP SCRIPT
# ============================================
# Usage: ./scripts/backup.sh
# Cron: 0 2 * * * /path/to/scripts/backup.sh

set -e

# Configuration
BACKUP_DIR="/backups/letwash"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="letwash"
DB_USER="letwash"
CONTAINER_NAME="letwash-db-prod"
RETENTION_DAYS=30

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}LETWASH DATABASE BACKUP${NC}"
echo -e "${GREEN}Date: $(date)${NC}"
echo -e "${GREEN}============================================${NC}"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
echo -e "${YELLOW}Creating database backup...${NC}"
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"
docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME | gzip > $BACKUP_FILE

# Verify backup
if [ -f "$BACKUP_FILE" ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup created: $BACKUP_FILE ($SIZE)${NC}"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi

# Backup uploads volume
echo -e "${YELLOW}Backing up uploads...${NC}"
UPLOADS_BACKUP="$BACKUP_DIR/uploads_${DATE}.tar.gz"
docker run --rm \
  -v letwash_backend_uploads:/source \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/uploads_${DATE}.tar.gz -C /source .

# Delete old backups
echo -e "${YELLOW}Cleaning old backups (>$RETENTION_DAYS days)...${NC}"
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +$RETENTION_DAYS -delete

# List recent backups
echo -e "${GREEN}Recent backups:${NC}"
ls -lh $BACKUP_DIR | tail -10

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ BACKUP COMPLETED${NC}"
echo -e "${GREEN}============================================${NC}"
