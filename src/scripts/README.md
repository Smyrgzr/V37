# 🛠️ Letwash Scripts

**Utility scripts for deployment, backup, and maintenance**

---

## 📁 Available Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `deploy.sh` | Production deployment | `./scripts/deploy.sh production` |
| `backup.sh` | Database backup | `./scripts/backup.sh` |
| `restore.sh` | Database restore | `./scripts/restore.sh <backup_file>` |
| `health-check.sh` | System health check | `./scripts/health-check.sh` |

---

## 🚀 Usage

### **1. Make Scripts Executable**

```bash
chmod +x scripts/*.sh
```

---

### **2. Deploy to Production**

```bash
./scripts/deploy.sh production
```

**What it does:**
- Pulls latest code from Git
- Stops existing containers
- Builds new Docker images
- Starts containers
- Runs database migrations
- Performs health checks

**Prerequisites:**
- `.env.production` file configured
- Docker and Docker Compose installed
- Git repository access

---

### **3. Backup Database**

```bash
./scripts/backup.sh
```

**What it does:**
- Creates compressed database dump
- Backs up uploads volume
- Deletes backups older than 30 days
- Logs backup completion

**Output:**
```
/backups/letwash/letwash_20241212_020000.sql.gz
/backups/letwash/uploads_20241212.tar.gz
```

**Automated backups (cron):**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/V37/scripts/backup.sh >> /var/log/letwash-backup.log 2>&1
```

---

### **4. Restore Database**

```bash
./scripts/restore.sh /backups/letwash/letwash_20241212_020000.sql.gz
```

**What it does:**
- Creates safety backup of current database
- Drops existing database
- Creates new database
- Restores from backup file
- Preserves safety backup

⚠️ **WARNING:** This overwrites the current database!

**Safety backup location:**
```
/tmp/letwash_safety_YYYYMMDD_HHMMSS.sql.gz
```

---

### **5. Health Check**

```bash
./scripts/health-check.sh
```

**What it checks:**
- Docker containers status
- Backend API health endpoint
- Frontend availability
- Database connection
- Disk space usage
- Memory usage
- CPU load

**Automated health checks (cron):**
```bash
# Every 5 minutes
*/5 * * * * /path/to/V37/scripts/health-check.sh >> /var/log/letwash-health.log 2>&1
```

---

## 📊 Script Output Examples

### **Deploy Script**

```
============================================
LETWASH DEPLOYMENT SCRIPT
Environment: production
============================================
Step 1/8: Pulling latest code...
✅ Git pull completed

Step 2/8: Stopping existing containers...
✅ Containers stopped

Step 3/8: Building Docker images...
✅ Images built successfully

Step 4/8: Starting containers...
✅ Containers started

Step 5/8: Waiting for database to be ready...
✅ Database ready

Step 6/8: Running database migrations...
✅ Migrations completed

Step 7/8: Checking container health...
✅ All containers healthy

Step 8/8: Running health checks...
✅ Backend is healthy
✅ Frontend is healthy

============================================
🎉 DEPLOYMENT SUCCESSFUL!
============================================
```

---

### **Backup Script**

```
============================================
LETWASH DATABASE BACKUP
Date: Thu Dec 12 02:00:00 UTC 2024
============================================
Creating database backup...
✅ Backup created: /backups/letwash/letwash_20241212_020000.sql.gz (15M)

Backing up uploads...
✅ Uploads backed up

Cleaning old backups (>30 days)...
✅ Deleted 3 old backups

Recent backups:
-rw-r--r-- 1 root root  15M Dec 12 02:00 letwash_20241212_020000.sql.gz
-rw-r--r-- 1 root root 120M Dec 12 02:00 uploads_20241212.tar.gz

============================================
✅ BACKUP COMPLETED
============================================
```

---

### **Health Check Script**

```
============================================
LETWASH HEALTH CHECK
Date: Thu Dec 12 10:15:00 UTC 2024
============================================
Checking Docker containers...
✅ letwash-db-prod: Running
✅ letwash-backend-prod: Running
✅ letwash-frontend-prod: Running

Checking backend health...
✅ Backend: Healthy

Checking frontend...
✅ Frontend: Healthy

Checking database...
✅ Database: Ready

Checking disk space...
✅ Disk space: 45% used

Checking memory usage...
✅ Memory: 62% used

Checking CPU load...
ℹ️  CPU Load: 0.85

============================================
✅ ALL SYSTEMS OPERATIONAL
============================================
```

---

## 🔧 Customization

### **Modify Backup Retention**

Edit `backup.sh`:
```bash
# Change retention from 30 to 60 days
RETENTION_DAYS=60
```

### **Change Backup Directory**

Edit `backup.sh`:
```bash
# Change backup location
BACKUP_DIR="/mnt/backups/letwash"
```

### **Email Alerts on Failure**

Edit `health-check.sh`:
```bash
# Uncomment email alert
if [ "$ALL_HEALTHY" != true ]; then
  echo "Health check failed" | mail -s "ALERT" admin@letwash.com
fi
```

---

## 📋 Troubleshooting

### **Permission Denied**

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Or run with bash
bash scripts/deploy.sh
```

### **Backup Directory Not Found**

```bash
# Create backup directory
sudo mkdir -p /backups/letwash
sudo chown $USER:$USER /backups/letwash
```

### **Docker Command Not Found**

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Logout and login
```

---

## ✅ Pre-Flight Checklist

Before using scripts in production:

- [ ] Scripts are executable (`chmod +x`)
- [ ] `.env.production` configured
- [ ] Backup directory exists (`/backups/letwash`)
- [ ] Docker and Docker Compose installed
- [ ] Git repository accessible
- [ ] Cron jobs configured (optional)
- [ ] Email alerts configured (optional)
- [ ] Test scripts in staging environment

---

## 📞 Support

Questions or issues with scripts?

- 📧 Email: devops@letwash.com
- 📖 Documentation: [PRODUCTION_DEPLOYMENT_GUIDE.md](../PRODUCTION_DEPLOYMENT_GUIDE.md)
- 🐙 GitHub Issues: https://github.com/yourorg/letwash/issues

---

**Happy scripting! 🚀**
