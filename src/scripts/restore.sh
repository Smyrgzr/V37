#!/bin/bash

# ============================================
# LETWASH - DATABASE RESTORE SCRIPT
# ============================================
# Usage: ./scripts/restore.sh <backup_file>
# Example: ./scripts/restore.sh /backups/letwash/letwash_20241212_020000.sql.gz

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
DB_NAME="letwash"
DB_USER="letwash"
CONTAINER_NAME="letwash-db-prod"

# Check arguments
if [ -z "$1" ]; then
    echo -e "${RED}Error: No backup file specified${NC}"
    echo -e "${YELLOW}Usage: ./scripts/restore.sh <backup_file>${NC}"
    echo -e "${YELLOW}Example: ./scripts/restore.sh /backups/letwash/letwash_20241212_020000.sql.gz${NC}"
    exit 1
fi

BACKUP_FILE=$1

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}LETWASH DATABASE RESTORE${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "${YELLOW}Backup file: $BACKUP_FILE${NC}"
echo -e "${RED}WARNING: This will overwrite the current database!${NC}"
echo -e "${NC}"
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Restore cancelled${NC}"
    exit 0
fi

echo -e "${YELLOW}Creating safety backup of current database...${NC}"
SAFETY_BACKUP="/tmp/letwash_safety_$(date +%Y%m%d_%H%M%S).sql.gz"
docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME | gzip > $SAFETY_BACKUP
echo -e "${GREEN}Safety backup created: $SAFETY_BACKUP${NC}"

echo -e "${YELLOW}Dropping existing database...${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

echo -e "${YELLOW}Creating new database...${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"

echo -e "${YELLOW}Restoring from backup...${NC}"
gunzip < $BACKUP_FILE | docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME

echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}✅ RESTORE COMPLETED${NC}"
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}Database restored from: $BACKUP_FILE${NC}"
echo -e "${GREEN}Safety backup saved at: $SAFETY_BACKUP${NC}"
echo -e "${GREEN}============================================${NC}"
