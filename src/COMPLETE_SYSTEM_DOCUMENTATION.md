# 📚 Letwash - Eksiksiz Sistem Dokümantasyonu

**Kapsamlı teknik ve kullanıcı dokümantasyonu**

---

## 📑 İçindekiler

1. [Sistem Mimarisi](#sistem-mimarisi)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Authentication & Authorization](#authentication--authorization)
6. [Payment System](#payment-system)
7. [Commission System](#commission-system)
8. [Business Modules](#business-modules)
9. [Deployment](#deployment)
10. [Environment Variables](#environment-variables)

---

## 🏗️ Sistem Mimarisi

### **Genel Mimari**

```
┌─────────────────────────────────────────────────────────────┐
│                     LETWASH PLATFORM                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────┐
            │      Frontend (React + Vite)     │
            │  - React 18 + TypeScript         │
            │  - Tailwind CSS v4               │
            │  - Shadcn/ui Components          │
            │  - Stripe Elements               │
            └─────────────────────────────────┘
                              │
                              ▼ HTTP/REST API
            ┌─────────────────────────────────┐
            │    Backend (Node.js + Express)   │
            │  - RESTful API                   │
            │  - JWT Authentication            │
            │  - Stripe Integration            │
            │  - AWS Cognito (SSO)             │
            └─────────────────────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────┐
            │    Database (PostgreSQL 15)      │
            │  - Prisma ORM                    │
            │  - Relational Schema             │
            │  - ACID Compliance               │
            └─────────────────────────────────┘
                              │
                              ▼
            ┌─────────────────────────────────┐
            │      External Services           │
            │  - Stripe (Payments)             │
            │  - AWS Cognito (SSO)             │
            │  - Google OAuth                  │
            │  - Apple Sign In                 │
            └─────────────────────────────────┘
```

---

## 🛠️ Teknoloji Stack

### **Frontend**

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.2.2 | Type Safety |
| Vite | 5.0.8 | Build Tool |
| Tailwind CSS | 4.0.0 | Styling |
| Shadcn/ui | Latest | Component Library |
| React Router | 6.20.1 | Routing |
| Axios | 1.6.2 | HTTP Client |
| Recharts | 2.10.3 | Charts & Analytics |
| React Hook Form | 7.49.2 | Form Management |
| Zod | 3.22.4 | Validation |
| Stripe JS | 2.4.0 | Payment UI |
| Lucide React | 0.294.0 | Icons |
| Sonner | 1.2.3 | Notifications |
| Date-fns | 2.30.0 | Date Utilities |

### **Backend**

| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| Node.js | >= 18.0.0 | Runtime |
| Express | 4.18.2 | Web Framework |
| Prisma | 5.7.0 | ORM |
| PostgreSQL | 15 | Database |
| JWT | 9.0.2 | Authentication |
| Bcrypt | 2.4.3 | Password Hashing |
| Stripe | 14.9.0 | Payment Gateway |
| Passport | 0.7.0 | Authentication Middleware |
| AWS SDK | 2.1498.0 | AWS Services |
| Express Validator | 7.0.1 | Input Validation |
| Helmet | 7.1.0 | Security Headers |
| CORS | 2.8.5 | Cross-Origin Requests |
| Morgan | 1.10.0 | Logging |
| Compression | 1.7.4 | Response Compression |
| Express Rate Limit | 7.1.5 | Rate Limiting |

### **DevOps**

| Teknoloji | Kullanım |
|-----------|----------|
| Docker | Containerization |
| Docker Compose | Multi-Container Orchestration |
| Nginx | Reverse Proxy & Static Files |
| Git | Version Control |
| GitHub Actions | CI/CD |

---

## 🗄️ Database Schema

### **Core Models**

#### **User Model**
```prisma
model User {
  id              String    @id @default(uuid())
  email           String    @unique
  password        String
  fullName        String
  phone           String?
  role            UserRole  @default(CARWASH_OWNER)
  isActive        Boolean   @default(true)
  
  // SSO Fields
  googleId        String?   @unique
  appleId         String?   @unique
  microsoftId     String?   @unique
  cognitoSub      String?   @unique
  profilePhoto    String?
  
  // Relations
  ownedBranches   Branch[]
  refreshTokens   RefreshToken[]
  subscriptions   Subscription[]
  transactions    Transaction[]
  commissions     Commission[]
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}
```

#### **Branch Model**
```prisma
model Branch {
  id              String          @id @default(uuid())
  ownerId         String
  name            String
  address         String
  city            String
  country         String          @default("Turkey")
  phone           String
  businessModels  BusinessModel[]  // Array of modules
  operatingHours  Json?
  isActive        Boolean         @default(true)
  
  // Relations
  owner           User            @relation(...)
  stations        Station[]
  services        Service[]
  bookings        Booking[]
  
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}
```

#### **Service Model**
```prisma
model Service {
  id              String       @id @default(uuid())
  branchId        String
  name            String
  description     String?
  basePrice       Float
  duration        Int          // minutes
  isActive        Boolean      @default(true)
  vehicleTypes    VehicleType[] // Sedan, SUV, Truck, etc.
  businessModels  BusinessModel[]
  
  // Pricing by vehicle type
  pricingByVehicle Json?       // {SEDAN: 50, SUV: 75, ...}
  
  // Relations
  branch          Branch       @relation(...)
  bookings        Booking[]
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}
```

#### **Booking Model**
```prisma
model Booking {
  id              String        @id @default(uuid())
  branchId        String
  serviceId       String
  stationId       String?
  customerId      String
  vehicleType     VehicleType
  status          BookingStatus @default(PENDING)
  
  scheduledDate   DateTime
  startTime       DateTime?
  endTime         DateTime?
  
  // Payment
  totalAmount     Float
  paidAmount      Float?
  paymentStatus   PaymentStatus @default(PENDING)
  stripePaymentId String?
  
  // Relations
  branch          Branch        @relation(...)
  service         Service       @relation(...)
  station         Station?      @relation(...)
  customer        Customer      @relation(...)
  transaction     Transaction?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}
```

#### **Transaction Model**
```prisma
model Transaction {
  id              String            @id @default(uuid())
  bookingId       String            @unique
  ownerId         String
  
  amount          Float
  currency        String            @default("USD")
  status          TransactionStatus @default(PENDING)
  
  // Stripe
  stripePaymentId       String?       @unique
  stripePaymentIntentId String?
  stripeCustomerId      String?
  
  // Commission
  commissionRate       Float          // 0.15, 0.10, 0.075
  commissionAmount     Float
  netAmount            Float
  
  // Relations
  booking         Booking           @relation(...)
  owner           User              @relation(...)
  commission      Commission?
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}
```

#### **Commission Model**
```prisma
model Commission {
  id              String            @id @default(uuid())
  transactionId   String            @unique
  ownerId         String
  
  grossAmount     Float             // Original transaction amount
  commissionRate  Float             // 0.15, 0.10, 0.075
  commissionAmount Float            // Amount taken by Letwash
  netAmount       Float             // Amount for owner
  
  status          CommissionStatus  @default(PENDING)
  payoutBatchId   String?
  
  // Relations
  transaction     Transaction       @relation(...)
  owner           User              @relation(...)
  payoutBatch     PayoutBatch?      @relation(...)
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}
```

#### **Subscription Model**
```prisma
model Subscription {
  id              String            @id @default(uuid())
  userId          String
  tier            SubscriptionTier  // STARTER, PROFESSIONAL, ENTERPRISE
  
  status          SubscriptionStatus @default(ACTIVE)
  startDate       DateTime
  endDate         DateTime?
  
  // Pricing
  monthlyFee      Float
  commissionRate  Float             // 0.15, 0.10, 0.075
  
  // Limits
  maxBranches     Int?
  maxModules      Int?
  maxStations     Int?
  
  // Relations
  user            User              @relation(...)
  
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}
```

### **Enums**

```prisma
enum UserRole {
  ROOT_OWNER          // Letwash admin
  CARWASH_OWNER       // Business owner
  MANAGER             // Branch manager
  STAFF               // Staff member
}

enum BusinessModel {
  IN_BAY                      // In-Bay Automatic
  TUNNEL                      // Tunnel Wash
  SELF_SERVICE                // Self-Service
  MOBILE                      // Mobile Wash
  MANUAL_DETAILING            // Manual Detailing
  MOBILE_DETAILING            // Mobile Detailing
  PICKUP_DROPOFF_DETAILING    // Pick-up & Drop-off
}

enum VehicleType {
  SEDAN
  SUV
  TRUCK
  ELECTRIC
  LUXURY
}

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
  CANCELLED
}

enum CommissionStatus {
  PENDING
  CALCULATED
  PAID_OUT
  CANCELLED
}

enum SubscriptionTier {
  STARTER           // $99/month, 15% commission
  PROFESSIONAL      // $299/month, 10% commission
  ENTERPRISE        // $699/month, 7.5% commission
}

enum SubscriptionStatus {
  ACTIVE
  EXPIRED
  CANCELLED
  SUSPENDED
}
```

---

## 🔌 API Endpoints

### **Authentication**

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
```

### **SSO Authentication**

```
GET    /api/v1/auth/google
GET    /api/v1/auth/google/callback
GET    /api/v1/auth/apple
POST   /api/v1/auth/apple/callback
GET    /api/v1/auth/microsoft
GET    /api/v1/auth/microsoft/callback
POST   /api/v1/auth/cognito/login
POST   /api/v1/auth/cognito/callback
```

### **Branches**

```
GET    /api/v1/branches
GET    /api/v1/branches/:id
POST   /api/v1/branches
PUT    /api/v1/branches/:id
DELETE /api/v1/branches/:id
GET    /api/v1/branches/:id/stations
GET    /api/v1/branches/:id/services
GET    /api/v1/branches/:id/analytics
```

### **Services**

```
GET    /api/v1/services
GET    /api/v1/services/:id
POST   /api/v1/services
PUT    /api/v1/services/:id
DELETE /api/v1/services/:id
GET    /api/v1/services/by-branch/:branchId
GET    /api/v1/services/by-vehicle-type/:vehicleType
```

### **Bookings**

```
GET    /api/v1/bookings
GET    /api/v1/bookings/:id
POST   /api/v1/bookings
PUT    /api/v1/bookings/:id
DELETE /api/v1/bookings/:id
PATCH  /api/v1/bookings/:id/status
GET    /api/v1/bookings/by-branch/:branchId
GET    /api/v1/bookings/by-customer/:customerId
POST   /api/v1/bookings/:id/check-in
POST   /api/v1/bookings/:id/complete
```

### **Stripe Payment**

```
POST   /api/v1/stripe/create-payment-intent
POST   /api/v1/stripe/webhook
POST   /api/v1/stripe/create-customer
GET    /api/v1/stripe/customer/:customerId
POST   /api/v1/stripe/refund
GET    /api/v1/stripe/payment/:paymentId
GET    /api/v1/stripe/balance
```

### **Commissions**

```
GET    /api/v1/commissions
GET    /api/v1/commissions/:id
GET    /api/v1/commissions/by-owner/:ownerId
GET    /api/v1/commissions/stats/:ownerId
GET    /api/v1/commissions/dashboard/letwash
POST   /api/v1/commissions/payout-batch
GET    /api/v1/commissions/payout-batch/:id
```

### **Transactions**

```
GET    /api/v1/transactions
GET    /api/v1/transactions/:id
GET    /api/v1/transactions/by-owner/:ownerId
GET    /api/v1/transactions/by-booking/:bookingId
GET    /api/v1/transactions/stats
```

### **Subscriptions**

```
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
POST   /api/v1/subscriptions
PUT    /api/v1/subscriptions/:id
DELETE /api/v1/subscriptions/:id
GET    /api/v1/subscriptions/tiers
POST   /api/v1/subscriptions/upgrade
POST   /api/v1/subscriptions/downgrade
```

### **Analytics**

```
GET    /api/v1/analytics/dashboard
GET    /api/v1/analytics/revenue
GET    /api/v1/analytics/bookings
GET    /api/v1/analytics/customers
GET    /api/v1/analytics/services
GET    /api/v1/analytics/stations
GET    /api/v1/analytics/by-branch/:branchId
GET    /api/v1/analytics/by-date-range
```

### **Notifications**

```
GET    /api/v1/notifications
GET    /api/v1/notifications/:id
PATCH  /api/v1/notifications/:id/read
PATCH  /api/v1/notifications/mark-all-read
DELETE /api/v1/notifications/:id
```

---

## 🔐 Authentication & Authorization

### **JWT Token Structure**

```javascript
{
  "userId": "uuid",
  "email": "user@example.com",
  "role": "CARWASH_OWNER",
  "iat": 1234567890,
  "exp": 1234654290
}
```

### **Role-Based Permissions**

| Role | Permissions |
|------|-------------|
| **ROOT_OWNER** | Full platform access, manage all owners, view all commissions |
| **CARWASH_OWNER** | Manage own branches, view own analytics, manage subscriptions |
| **MANAGER** | Manage assigned branch, view branch analytics |
| **STAFF** | Check-in customers, update booking status |

### **Protected Routes**

```javascript
// Backend middleware
const { authenticate, authorize } = require('./middleware/auth');

// Require authentication
router.get('/branches', authenticate, getBranches);

// Require specific role
router.get('/admin/commissions', 
  authenticate, 
  authorize(['ROOT_OWNER']), 
  getCommissions
);

// Require ownership
router.put('/branches/:id', 
  authenticate, 
  checkBranchOwnership, 
  updateBranch
);
```

---

## 💳 Payment System

### **Stripe Integration Flow**

```
1. Customer initiates booking
   ↓
2. Frontend: Create Stripe Payment Intent
   POST /api/v1/stripe/create-payment-intent
   ↓
3. Backend: Calculate amount + commission
   - Fetch service price
   - Apply vehicle type multiplier
   - Calculate commission based on subscription tier
   ↓
4. Backend: Create Payment Intent with Stripe
   Stripe.paymentIntents.create({
     amount: totalAmount,
     currency: "usd",
     metadata: { bookingId, ownerId, ... }
   })
   ↓
5. Frontend: Display Stripe Elements
   <CardElement />
   ↓
6. Customer: Enter card details and pay
   ↓
7. Stripe: Process payment
   ↓
8. Stripe: Send webhook to backend
   POST /api/v1/stripe/webhook
   ↓
9. Backend: Verify webhook signature
   ↓
10. Backend: Update booking status
    - Create/update transaction
    - Calculate and create commission
    - Update booking.paymentStatus = PAID
   ↓
11. Backend: Send confirmation email/notification
   ↓
12. Frontend: Redirect to success page
```

### **Commission Calculation**

```javascript
// Example calculation
const grossAmount = 100.00;  // Service price
const tier = "PROFESSIONAL";  // Owner's subscription tier

const commissionRates = {
  STARTER: 0.15,        // 15%
  PROFESSIONAL: 0.10,   // 10%
  ENTERPRISE: 0.075     // 7.5%
};

const commissionRate = commissionRates[tier];
const commissionAmount = grossAmount * commissionRate;
const netAmount = grossAmount - commissionAmount;

// Result for PROFESSIONAL tier:
// Gross: $100.00
// Commission (10%): $10.00
// Net to Owner: $90.00
```

### **Refund Handling**

```javascript
// Full refund
POST /api/v1/stripe/refund
{
  "paymentId": "pi_xxx",
  "amount": 10000,  // $100.00 in cents
  "reason": "requested_by_customer"
}

// Partial refund
POST /api/v1/stripe/refund
{
  "paymentId": "pi_xxx",
  "amount": 5000,  // $50.00 in cents (partial)
  "reason": "service_incomplete"
}

// Commission adjustment on refund
// - Original: $100 gross, $10 commission, $90 net
// - After $50 refund: $50 gross, $5 commission, $45 net
```

---

## 📊 Commission System

### **Subscription Tiers & Rates**

| Tier | Monthly Fee | Commission | Max Branches | Max Modules |
|------|-------------|-----------|--------------|-------------|
| **Starter** | $99 | 15% | 1 | 2 |
| **Professional** | $299 | 10% | 5 | 4 |
| **Enterprise** | $699 | 7.5% | Unlimited | 7 |

### **Commission Workflow**

```
1. Transaction completed (payment successful)
   ↓
2. Create Commission record
   - Calculate commission amount
   - Link to transaction
   - Link to owner
   - Status: PENDING
   ↓
3. Owner dashboard shows pending commissions
   ↓
4. Letwash admin reviews commissions
   ↓
5. Create Payout Batch
   - Group commissions by owner
   - Mark commissions as CALCULATED
   ↓
6. Process payouts (external system)
   ↓
7. Update commissions status to PAID_OUT
```

### **Commission Dashboard (Letwash Admin)**

```javascript
GET /api/v1/commissions/dashboard/letwash

Response:
{
  totalCommissions: 15000.00,
  pendingPayouts: 5000.00,
  paidOut: 10000.00,
  byTier: {
    STARTER: { count: 50, amount: 7500 },
    PROFESSIONAL: { count: 30, amount: 4500 },
    ENTERPRISE: { count: 20, amount: 3000 }
  },
  recentTransactions: [...]
}
```

### **Owner Commission Stats**

```javascript
GET /api/v1/commissions/stats/:ownerId

Response:
{
  totalRevenue: 10000.00,
  totalCommissions: 1000.00,
  netEarnings: 9000.00,
  commissionRate: 0.10,
  byMonth: [
    { month: "2024-01", revenue: 2000, commission: 200 },
    { month: "2024-02", revenue: 3000, commission: 300 }
  ]
}
```

---

## 🏢 Business Modules

### **Module Types**

| Module | Description | Typical Setup |
|--------|-------------|---------------|
| **IN_BAY** | Automated wash bay | 2-4 bays, drive-in |
| **TUNNEL** | Conveyor system | Single line, high volume |
| **SELF_SERVICE** | DIY wash bays | 4-8 bays, coin/card operated |
| **MOBILE** | On-site wash service | Service area radius |
| **MANUAL_DETAILING** | Hand wash/detail | Indoor bays, appointments |
| **MOBILE_DETAILING** | Mobile detail service | Service vehicles |
| **PICKUP_DROPOFF** | Valet wash service | Customer drop-off |

### **Module-Specific Features**

```javascript
// IN_BAY / TUNNEL
{
  stations: [
    { id: 1, name: "Bay 1", status: "AVAILABLE" },
    { id: 2, name: "Bay 2", status: "IN_USE" }
  ],
  queueManagement: true,
  estimatedWaitTime: 15  // minutes
}

// SELF_SERVICE
{
  stations: [
    { id: 1, type: "WASH_BAY", price: 10 },
    { id: 2, type: "VACUUM", price: 2 }
  ],
  paymentMethods: ["COIN", "CARD", "APP"]
}

// MOBILE / MOBILE_DETAILING
{
  serviceArea: {
    radius: 25,  // miles
    centerLat: 40.7128,
    centerLng: -74.0060
  },
  travelFee: 15  // base fee
}

// MANUAL_DETAILING / PICKUP_DROPOFF
{
  appointmentRequired: true,
  services: [
    { name: "Basic Detail", duration: 120, price: 150 },
    { name: "Premium Detail", duration: 240, price: 300 }
  ]
}
```

---

## 🚀 Deployment

### **Docker Deployment**

```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build -d

# Check containers
docker ps

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### **Environment Setup**

```bash
# Production .env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db:5432/letwash
JWT_SECRET=<64-character-random-string>
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

### **Database Migration**

```bash
# Run migrations
docker exec -it letwash-backend npx prisma migrate deploy

# Seed production data (optional)
docker exec -it letwash-backend npm run seed:prod
```

### **Health Checks**

```bash
# Backend health
curl http://localhost:5000/health

# Frontend health
curl http://localhost/

# Database health
docker exec -it letwash-db pg_isready -U letwash
```

---

## 🔐 Environment Variables

### **Backend (.env)**

**Required:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing key (min 32 chars)
- `SESSION_SECRET` - Session signing key
- `CORS_ORIGIN` - Allowed frontend URLs

**Payment (Stripe):**
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret

**SSO (Optional):**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `APPLE_CLIENT_ID` - Apple Sign In client ID
- `MICROSOFT_CLIENT_ID` - Microsoft OAuth client ID
- `AWS_COGNITO_USER_POOL_ID` - Cognito user pool

### **Frontend (.env)**

**Required:**
- `VITE_API_BASE_URL` - Backend API URL

**Payment:**
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

**Features:**
- `VITE_ENABLE_DEMO_MODE` - Enable demo credentials
- `VITE_ENABLE_STRIPE_PAYMENTS` - Enable payment features
- `VITE_ENABLE_SSO` - Enable social login

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file

---

## 📞 Support

- 📧 Email: support@letwash.com
- 📖 Documentation: https://docs.letwash.com
- 🐙 GitHub: https://github.com/letwash/platform

---

**Last Updated:** December 12, 2024
**Version:** 1.0.0
