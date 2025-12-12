# 🚗 Letwash - Enterprise Car Wash Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-blueviolet)](https://stripe.com/)

> **Production-ready SaaS platform** for multi-location car wash businesses with subscription management, SSO authentication, real-time operations, payment processing, and comprehensive analytics.

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Clone project
git clone <repo_url>
cd V37

# 2. Setup environment (ALREADY DONE! ✅)
# .env files are pre-configured with development values
# No need to copy - they're ready to use!

# 3. Start Docker
docker-compose up --build

# 4. Setup database (new terminal)
docker exec -it letwash-backend npx prisma migrate deploy
docker exec -it letwash-backend npm run seed

# 5. Open browser
# http://localhost
# Login: admin@letwash.com / Letwash123!
```

**📖 Detailed Guide:** [QUICK_START.md](QUICK_START.md)  
**🐳 Docker Setup:** [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md)  
**🔐 Environment Variables:** [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md)

**🆕 NEW:**  
**📊 System Analysis:** [SYSTEM_ANALYSIS_COMPLETE.md](SYSTEM_ANALYSIS_COMPLETE.md)  
**📝 Files Summary:** [FILES_CREATED_SUMMARY.md](FILES_CREATED_SUMMARY.md)  
**📄 Completion Report:** [ANALYSIS_COMPLETION_REPORT.md](ANALYSIS_COMPLETION_REPORT.md)

**🆕 LATEST (Dec 12, 2024):**  
**🧪 Testing Guide:** [TESTING_COMPLETE_GUIDE.md](TESTING_COMPLETE_GUIDE.md)  
**🔒 Security Guide:** [SECURITY_BEST_PRACTICES.md](SECURITY_BEST_PRACTICES.md)  
**📚 Documentation Index:** [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)  
**📁 All New Files:** [NEW_FILES_COMPLETE_SUMMARY.md](NEW_FILES_COMPLETE_SUMMARY.md)

**🔧 DOCKER FIXED:**  
**✅ Docker Issues Fixed:** [DOCKER_ISSUES_FIXED.md](DOCKER_ISSUES_FIXED.md) - **Sorunlar çözüldü!**  
**🛠️ Docker Fix Guide:** [DOCKER_FIX_GUIDE.md](DOCKER_FIX_GUIDE.md) - **Detaylı çözümler**

---

## 🌟 Key Features

### 🔐 **Authentication & Authorization**
- ✅ **Role-Based Access Control** (ROOT_OWNER, CARWASH_OWNER, MANAGER, STAFF)
- ✅ **SSO Integration** (Google, Apple, Microsoft via AWS Cognito)
- ✅ **JWT Token Authentication** with refresh token support
- ✅ **Digital Agreement Signatures** (GDPR compliant)
- ✅ **Demo Mode** - Test without SSO accounts
- ✅ **Secure Password Hashing** (bcrypt)

### 💳 **Payment & Commission System**
- ✅ **Stripe Integration** - Secure payment processing
- ✅ **Automatic Commission Calculation** (15%, 10%, 7.5% based on tier)
- ✅ **Transaction Tracking** - Complete payment history
- ✅ **Refund Management** - Easy refund processing
- ✅ **Commission Dashboard** - Real-time revenue tracking
- ✅ **Payout Batches** - Automated payout management

### 🏢 **Multi-Module Business Support**
- ✅ **In-Bay Automatic** - Automated wash stations
- ✅ **Tunnel Wash** - Conveyor belt systems
- ✅ **Self-Service** - DIY wash bays
- ✅ **Mobile Wash** - On-site services
- ✅ **Manual Detailing** - Premium hand wash
- ✅ **Mobile Detailing** - Mobile premium services
- ✅ **Pick-up & Drop-off Detailing** - Valet services

### 🚙 **Vehicle Type Filtering**
- Dynamic pricing based on vehicle type (Sedan, SUV, Truck, Electric, Luxury)
- Customizable service durations per vehicle type
- Automatic price calculation

### 💰 **Subscription Management**
- ✅ **Tiered Plans** (Starter, Professional, Enterprise)
- ✅ **Feature Gating** by subscription tier
- ✅ **Usage Limits** (branches, modules, stations)
- ✅ **Subscription Analytics**

### 📊 **Analytics & Reports**
- ✅ **Real-time Dashboard** with KPIs
- ✅ **Revenue Analytics** (daily, weekly, monthly)
- ✅ **Station Utilization** tracking
- ✅ **Customer Insights**
- ✅ **Service Performance** metrics
- ✅ **Commission Reports**

### 📅 **Advanced Booking System**
- ✅ **Real-time Availability** checking
- ✅ **Multi-station Management**
- ✅ **Queue Management** with wait time estimation
- ✅ **Booking Confirmations** with reservation codes
- ✅ **Payment Integration**

### 🔔 **Notifications**
- ✅ **Real-time Alerts** for bookings, payments, and system events
- ✅ **In-app Notifications** with badge counters
- ✅ **Notification History**

---

## 🏗️ Architecture

### **Tech Stack**

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- React Router v6
- Recharts (Analytics)
- Stripe Elements (Payments)

**Backend:**
- Node.js 18+ / Express
- PostgreSQL 15
- Prisma ORM
- JWT Authentication
- Stripe API

**DevOps:**
- Docker & Docker Compose
- Nginx (reverse proxy)
- AWS Cognito (SSO)

**Payment:**
- Stripe Payment Intents
- Webhook handling
- Automatic commission calculation

---

## 📁 Project Structure

```
V37/
├── backend/                    # Node.js Backend API
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   │   ├── stripe.controller.js      # Payment processing
│   │   │   ├── commission.controller.js  # Commission management
│   │   │   ├── transaction.controller.js # Transaction tracking
│   │   │   └── ...
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, validation, error handling
│   │   └── index.js           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.js            # Demo data
│   └── .env                   # Environment variables
├── components/                 # React Components
│   ├── auth/                  # Login, Register, Demo Mode
│   ├── payment/               # Stripe Checkout, Payment Success
│   ├── dialogs/               # Payment Dialog, Agreement Dialog
│   ├── dashboard/             # Analytics, KPIs
│   └── ...
├── docker-compose.yml          # Docker setup
├── QUICK_START.md             # 5-minute quick start
├── DOCKER_SETUP_COMPLETE.md   # Detailed Docker guide
├── DEMO_MODE_GUIDE.md         # Demo users guide
├── STRIPE_SETUP_GUIDE.md      # Payment setup
└── README.md                  # This file
```

---

## 🚀 Installation

### **Prerequisites**

- Docker Desktop (recommended) **OR**
- Node.js 18+, PostgreSQL 15+

### **Option 1: Docker (Recommended)**

**Quick Install:**
```bash
# See QUICK_START.md for 5-minute setup
```

**Detailed Install:**
```bash
# See DOCKER_SETUP_COMPLETE.md for step-by-step guide
```

### **Option 2: Local Development**

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate deploy
npm run seed
npm run dev
```

**Frontend:**
```bash
npm install
cp .env.example .env
npm run dev
```

---

## 👥 Demo Users

**No SSO Required! Use Demo Mode:**

```
Admin (ROOT_OWNER):
📧 admin@letwash.com
🔑 Letwash123!

Owner 1 (Professional Tier - 10% commission):
📧 owner1@letwash.com
🔑 Letwash123!

Owner 2 (Starter Tier - 15% commission):
📧 owner2@letwash.com
🔑 Letwash123!
```

**Quick Login:** Click "Quick Login" button on login page!

**📖 Demo Mode Guide:** [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md)

---

## 💳 Stripe Payment Setup

**Test Mode (Quick Setup):**

1. Create Stripe account: https://dashboard.stripe.com/register
2. Get test API keys: https://dashboard.stripe.com/test/apikeys
3. Add to `.env` files:

**Backend (.env):**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Frontend (.env):**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. Start Stripe webhook listener:
```bash
stripe login
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook
```

**Test Cards:**
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

**📖 Detailed Guide:** [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)

---

## 🔐 SSO Setup (Optional)

**Google OAuth:**
```bash
# See SSO_SETUP_GUIDE.md for detailed instructions
```

**Apple Sign In:**
```bash
# See SSO_SETUP_GUIDE.md for detailed instructions
```

**Microsoft OAuth:**
```bash
# See SSO_SETUP_GUIDE.md for detailed instructions
```

---

## 🎯 API Endpoints

### **Authentication**
```
POST   /api/v1/auth/register          # Register new owner
POST   /api/v1/auth/login             # Login
POST   /api/v1/auth/refresh           # Refresh token
GET    /api/v1/auth/me                # Get current user
```

### **Stripe Payment**
```
POST   /api/v1/stripe/create-payment-intent    # Create payment
POST   /api/v1/stripe/webhook                  # Stripe webhook
POST   /api/v1/stripe/refund                   # Process refund
POST   /api/v1/stripe/create-customer          # Create customer
GET    /api/v1/stripe/balance                  # Get balance (admin)
```

### **Commissions**
```
GET    /api/v1/commissions/stats/:ownerId      # Owner commission stats
GET    /api/v1/commissions/dashboard/letwash   # Platform commission (admin)
POST   /api/v1/commissions/payout-batch        # Create payout batch
```

### **Bookings**
```
POST   /api/v1/bookings               # Create booking
GET    /api/v1/bookings               # List bookings
GET    /api/v1/bookings/:id           # Get booking
PATCH  /api/v1/bookings/:id           # Update booking
```

**📖 Full API Docs:** See Postman collection or Swagger UI

---

## 🧪 Testing

### **Test Payment Flow**

```bash
# 1. Login as owner
# 2. Create booking
# 3. Click "Pay Now"
# 4. Enter test card: 4242 4242 4242 4242
# 5. Complete payment
# 6. ✅ Commission automatically created
```

### **Test Commission Dashboard**

```bash
# 1. Login as admin (admin@letwash.com)
# 2. Navigate to Commission Dashboard
# 3. ✅ See all transactions and commissions
```

### **Test Demo Mode**

```bash
# 1. Open http://localhost
# 2. See "Demo Credentials" on right side
# 3. Click "Quick Login as Admin"
# 4. ✅ Logged in without typing!
```

---

## 🐛 Troubleshooting

### **Port Already in Use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### **Database Connection Failed**
```bash
docker-compose logs backend
docker-compose restart postgres
```

### **Payment Failed**
```bash
# Check webhook listener
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook

# Check backend logs
docker-compose logs backend

# Check Stripe dashboard
https://dashboard.stripe.com/test/logs
```

### **Login Not Working**
```bash
# Check if seed ran
docker exec -it letwash-db psql -U letwash -d letwash
SELECT email, role FROM users;

# Re-run seed
docker exec -it letwash-backend npm run seed
```

**📖 Full Troubleshooting:** [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md#troubleshooting)

---

## 🔧 Docker Commands

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Access backend shell
docker exec -it letwash-backend bash

# Access database
docker exec -it letwash-db psql -U letwash -d letwash

# Restart containers
docker-compose restart
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICK_START.md](QUICK_START.md) | 5-minute quick start guide |
| [DOCKER_SETUP_COMPLETE.md](DOCKER_SETUP_COMPLETE.md) | Docker installation (Windows/Mac/Linux) |
| [DEMO_MODE_GUIDE.md](DEMO_MODE_GUIDE.md) | Demo users and quick login |
| [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md) | Payment integration setup |
| [STRIPE_INTEGRATION_COMPLETE.md](STRIPE_INTEGRATION_COMPLETE.md) | Stripe features overview |
| [SSO_DEMO_COMPLETE.md](SSO_DEMO_COMPLETE.md) | SSO + Demo mode features |
| [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) | Environment variables guide |
| [ENV_FILES_CREATED.md](ENV_FILES_CREATED.md) | .env files reference |
| [INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md) | Step-by-step checklist |
| [DOKUMANTASYON_OZET.md](DOKUMANTASYON_OZET.md) | Documentation overview (TR) |
| [START_HERE.md](START_HERE.md) | New user quick guide |
| [COMPLETE_SYSTEM_DOCUMENTATION.md](COMPLETE_SYSTEM_DOCUMENTATION.md) | **Complete technical docs** |
| [PRODUCTION_DEPLOYMENT_GUIDE.md](PRODUCTION_DEPLOYMENT_GUIDE.md) | **Production deployment** |

---

## 📁 Project Structure

```
V37/
├── backend/                    # Node.js Backend API
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   │   ├── stripe.controller.js      # Payment processing
│   │   │   ├── commission.controller.js  # Commission management
│   │   │   ├── transaction.controller.js # Transaction tracking
│   │   │   └── ...
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, validation, error handling
│   │   └── index.js           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.js            # Demo data
│   └── .env                   # Environment variables
├── components/                 # React Components
│   ├── auth/                  # Login, Register, Demo Mode
│   ├── payment/               # Stripe Checkout, Payment Success
│   ├── dialogs/               # Payment Dialog, Agreement Dialog
│   ├── dashboard/             # Analytics, KPIs
│   └── ...
├── docker-compose.yml          # Docker setup
├── QUICK_START.md             # 5-minute quick start
├── DOCKER_SETUP_COMPLETE.md   # Detailed Docker guide
├── DEMO_MODE_GUIDE.md         # Demo users guide
├── STRIPE_SETUP_GUIDE.md      # Payment setup
└── README.md                  # This file
```

---

## 🚀 Deployment

### **Docker Production**
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build

# Use environment variables for secrets
# Never commit .env files!
```

### **AWS Deployment**
```bash
# See deployment guide (coming soon)
```

---

## 💰 Commission Rates

| Tier | Monthly Fee | Commission | Branches | Modules |
|------|-------------|-----------|----------|---------|
| **Starter** | $99/month | 15% | 1 | 2 |
| **Professional** | $299/month | 10% | 5 | 4 |
| **Enterprise** | $699/month | 7.5% | Unlimited | 7 |

**Example:**
```
Customer pays: $100
Professional tier: 10% commission
─────────────────────
Gross Amount:    $100
Commission:      $10 (to Letwash)
Net to Owner:    $90
```

---

## 🤝 Contributing

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m 'Add amazing feature'

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 📞 Support

- 📧 Email: support@letwash.com
- 🐙 GitHub Issues: [Create Issue](https://github.com/Smyrgzr/V37/issues)
- 📖 Documentation: See `/docs` folder

---

## 🎉 Credits

Built with ❤️ by the Letwash Team

**Technologies:**
- React + TypeScript
- Node.js + Express
- PostgreSQL + Prisma
- Docker
- Stripe
- Tailwind CSS
- Shadcn/ui

---

## ✅ Project Status

- [x] Multi-branch management
- [x] 7 business modules
- [x] Vehicle type filtering
- [x] Dynamic pricing
- [x] Booking system
- [x] Real-time queue management
- [x] Analytics dashboard
- [x] Subscription management
- [x] SSO integration
- [x] Agreement signatures
- [x] **Stripe payment integration**
- [x] **Commission system**
- [x] **Transaction tracking**
- [x] **Demo mode (no SSO required)**
- [ ] Mobile app (coming soon)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Customer loyalty program

---

## 🎯 Next Steps

1. ⚡ **Quick Start:** Follow [QUICK_START.md](QUICK_START.md)
2. 🎭 **Test Demo Mode:** Login with quick login
3. 💳 **Setup Stripe:** Follow [STRIPE_SETUP_GUIDE.md](STRIPE_SETUP_GUIDE.md)
4. 🔐 **Configure SSO:** (Optional) Setup Google/Apple login
5. 🚀 **Deploy:** Go to production!

---

**Start now:** `docker-compose up --build` 🚀

**Happy washing! 🚗💦✨**