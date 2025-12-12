# 🧪 Letwash - Comprehensive Testing Guide

**Complete testing procedures for all system features**

---

## 📋 Table of Contents

1. [Test Environment Setup](#test-environment-setup)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Payment Testing](#payment-testing)
6. [Commission System Testing](#commission-system-testing)
7. [Performance Testing](#performance-testing)
8. [Security Testing](#security-testing)
9. [Test Data](#test-data)
10. [Automated Testing](#automated-testing)

---

## 🛠️ Test Environment Setup

### **Prerequisites**

```bash
# 1. Start Docker containers
docker-compose up --build

# 2. Run migrations
docker exec -it letwash-backend npx prisma migrate deploy

# 3. Seed test data
docker exec -it letwash-backend npm run seed
```

### **Test Accounts**

```
Admin (ROOT_OWNER):
📧 admin@letwash.com
🔑 Letwash123!

Owner 1 (Professional - 10% commission):
📧 owner1@letwash.com
🔑 Letwash123!
Branch: Premium Auto Wash
Subscription: Professional ($299/month)

Owner 2 (Starter - 15% commission):
📧 owner2@letwash.com
🔑 Letwash123!
Branch: Quick Clean Center
Subscription: Starter ($99/month)
```

---

## 🧪 Manual Testing Checklist

### **1. Authentication Tests**

#### **Test 1.1: Email/Password Login**

**Steps:**
1. Navigate to http://localhost
2. Enter email: `owner1@letwash.com`
3. Enter password: `Letwash123!`
4. Click "Sign In"

**Expected:**
- ✅ Redirected to dashboard
- ✅ User name displayed in header
- ✅ JWT token stored in localStorage
- ✅ Refresh token stored

**Status:** [ ] Pass [ ] Fail

---

#### **Test 1.2: Quick Login (Demo Mode)**

**Steps:**
1. Navigate to http://localhost
2. Click "Quick Login as Admin" button

**Expected:**
- ✅ Instantly logged in
- ✅ No typing required
- ✅ Redirected to admin dashboard

**Status:** [ ] Pass [ ] Fail

---

#### **Test 1.3: SSO Login (Google)**

**Prerequisites:** Google OAuth configured

**Steps:**
1. Navigate to http://localhost
2. Click "Continue with Google"
3. Select Google account
4. Grant permissions

**Expected:**
- ✅ Logged in with Google account
- ✅ User created in database
- ✅ Profile photo imported
- ✅ googleId field populated

**Status:** [ ] Pass [ ] Fail [ ] N/A (not configured)

---

#### **Test 1.4: Logout**

**Steps:**
1. Login as any user
2. Click profile menu
3. Click "Logout"

**Expected:**
- ✅ Redirected to login page
- ✅ JWT token removed
- ✅ Cannot access protected routes
- ✅ Refresh token invalidated

**Status:** [ ] Pass [ ] Fail

---

### **2. Registration Tests**

#### **Test 2.1: Owner Registration**

**Steps:**
1. Navigate to http://localhost
2. Click "Register"
3. Fill form:
   - Full Name: "Test Owner"
   - Email: "test@example.com"
   - Password: "Test123!@#"
   - Phone: "+1234567890"
4. Select business modules (e.g., In-Bay, Tunnel)
5. Select subscription tier (e.g., Professional)
6. Sign agreement
7. Submit

**Expected:**
- ✅ Account created
- ✅ Subscription activated
- ✅ Agreement signed and stored
- ✅ Welcome email sent (if configured)
- ✅ Redirected to onboarding

**Status:** [ ] Pass [ ] Fail

---

#### **Test 2.2: Duplicate Email**

**Steps:**
1. Try to register with existing email: `owner1@letwash.com`

**Expected:**
- ✅ Error: "Email already exists"
- ✅ User not created

**Status:** [ ] Pass [ ] Fail

---

### **3. Branch Management Tests**

#### **Test 3.1: Create Branch**

**Steps:**
1. Login as `owner1@letwash.com`
2. Navigate to "Branches"
3. Click "Add Branch"
4. Fill form:
   - Name: "Test Wash Center"
   - Address: "123 Main St"
   - City: "New York"
   - Phone: "+1234567890"
   - Business Models: [IN_BAY, SELF_SERVICE]
5. Submit

**Expected:**
- ✅ Branch created
- ✅ Appears in branch list
- ✅ Owner linked correctly
- ✅ isActive = true

**Status:** [ ] Pass [ ] Fail

---

#### **Test 3.2: Edit Branch**

**Steps:**
1. Open existing branch
2. Click "Edit"
3. Change name to "Updated Wash Center"
4. Save

**Expected:**
- ✅ Branch name updated
- ✅ updatedAt timestamp changed
- ✅ Other fields unchanged

**Status:** [ ] Pass [ ] Fail

---

#### **Test 3.3: Delete Branch**

**Steps:**
1. Select branch without active bookings
2. Click "Delete"
3. Confirm deletion

**Expected:**
- ✅ Branch marked as inactive (soft delete)
- ✅ Not shown in active list
- ✅ Related data preserved

**Status:** [ ] Pass [ ] Fail

---

### **4. Service Management Tests**

#### **Test 4.1: Create Service**

**Steps:**
1. Navigate to "Services"
2. Click "Add Service"
3. Fill form:
   - Name: "Premium Wash"
   - Base Price: $50
   - Duration: 30 minutes
   - Vehicle Types: [SEDAN, SUV]
   - Pricing:
     - SEDAN: $50
     - SUV: $75
4. Submit

**Expected:**
- ✅ Service created
- ✅ Vehicle-specific pricing saved
- ✅ Available for bookings

**Status:** [ ] Pass [ ] Fail

---

### **5. Booking Tests**

#### **Test 5.1: Create Booking**

**Steps:**
1. Navigate to "Bookings"
2. Click "Add Booking"
3. Fill form:
   - Customer: Select existing or create new
   - Service: "Premium Wash"
   - Vehicle Type: SUV
   - Date: Tomorrow
   - Time: 10:00 AM
4. Submit

**Expected:**
- ✅ Booking created
- ✅ Status: PENDING
- ✅ Price: $75 (SUV pricing)
- ✅ Reservation code generated
- ✅ Notification sent

**Status:** [ ] Pass [ ] Fail

---

#### **Test 5.2: Check-in Booking**

**Steps:**
1. Select pending booking
2. Click "Check In"
3. Confirm

**Expected:**
- ✅ Status: IN_PROGRESS
- ✅ startTime recorded
- ✅ Station assigned (if applicable)

**Status:** [ ] Pass [ ] Fail

---

#### **Test 5.3: Complete Booking**

**Steps:**
1. Select in-progress booking
2. Click "Complete"
3. Confirm

**Expected:**
- ✅ Status: COMPLETED
- ✅ endTime recorded
- ✅ Duration calculated
- ✅ Payment status checked

**Status:** [ ] Pass [ ] Fail

---

### **6. Payment Tests**

#### **Test 6.1: Create Payment Intent**

**Prerequisites:** Stripe test keys configured

**Steps:**
1. Create booking (see Test 5.1)
2. Click "Pay Now"
3. Payment dialog opens

**Expected:**
- ✅ Stripe Payment Intent created
- ✅ Amount correct (based on vehicle type)
- ✅ Stripe Elements loaded
- ✅ No errors in console

**Status:** [ ] Pass [ ] Fail

---

#### **Test 6.2: Successful Payment**

**Steps:**
1. In payment dialog, enter test card:
   - Card: 4242 4242 4242 4242
   - Expiry: 12/34
   - CVC: 123
   - ZIP: 12345
2. Click "Pay $75"

**Expected:**
- ✅ Payment processing indicator
- ✅ Payment successful
- ✅ Redirected to success page
- ✅ Booking.paymentStatus = PAID
- ✅ Transaction created
- ✅ Commission calculated
- ✅ Stripe webhook received

**Status:** [ ] Pass [ ] Fail

---

#### **Test 6.3: Declined Card**

**Steps:**
1. Use declined test card: 4000 0000 0000 0002
2. Submit payment

**Expected:**
- ✅ Error message: "Card was declined"
- ✅ Payment not recorded
- ✅ Booking.paymentStatus = PENDING
- ✅ User can retry

**Status:** [ ] Pass [ ] Fail

---

#### **Test 6.4: 3D Secure Card**

**Steps:**
1. Use 3DS test card: 4000 0027 6000 3184
2. Complete 3DS challenge

**Expected:**
- ✅ 3DS modal appears
- ✅ After completion, payment succeeds
- ✅ Transaction recorded

**Status:** [ ] Pass [ ] Fail

---

### **7. Commission Tests**

#### **Test 7.1: Commission Calculation (Professional - 10%)**

**Steps:**
1. Login as `owner1@letwash.com` (Professional tier)
2. Create booking with $100 service
3. Complete payment

**Expected:**
- ✅ Transaction.amount = $100
- ✅ Commission.commissionRate = 0.10
- ✅ Commission.commissionAmount = $10
- ✅ Commission.netAmount = $90
- ✅ Commission.status = CALCULATED

**Status:** [ ] Pass [ ] Fail

**Actual Values:**
- Gross: $________
- Commission: $________
- Net: $________

---

#### **Test 7.2: Commission Calculation (Starter - 15%)**

**Steps:**
1. Login as `owner2@letwash.com` (Starter tier)
2. Create booking with $100 service
3. Complete payment

**Expected:**
- ✅ Transaction.amount = $100
- ✅ Commission.commissionRate = 0.15
- ✅ Commission.commissionAmount = $15
- ✅ Commission.netAmount = $85

**Status:** [ ] Pass [ ] Fail

---

#### **Test 7.3: Commission Dashboard (Admin)**

**Steps:**
1. Login as `admin@letwash.com`
2. Navigate to "Commission Dashboard"

**Expected:**
- ✅ Total commissions displayed
- ✅ Pending payouts shown
- ✅ Breakdown by tier
- ✅ Recent transactions listed
- ✅ Charts rendered

**Status:** [ ] Pass [ ] Fail

---

#### **Test 7.4: Owner Commission Stats**

**Steps:**
1. Login as owner
2. Navigate to "Analytics" or "Commission Stats"

**Expected:**
- ✅ Total revenue displayed
- ✅ Total commissions shown
- ✅ Net earnings calculated
- ✅ Commission rate displayed
- ✅ Monthly breakdown

**Status:** [ ] Pass [ ] Fail

---

### **8. Refund Tests**

#### **Test 8.1: Full Refund**

**Steps:**
1. Login as admin
2. Find paid transaction
3. Click "Refund"
4. Select "Full Refund"
5. Confirm

**Expected:**
- ✅ Stripe refund created
- ✅ Transaction.status = REFUNDED
- ✅ Booking.paymentStatus = REFUNDED
- ✅ Commission adjusted to $0
- ✅ Webhook received

**Status:** [ ] Pass [ ] Fail

---

#### **Test 8.2: Partial Refund**

**Steps:**
1. Refund $50 of $100 transaction
2. Confirm

**Expected:**
- ✅ $50 refunded to customer
- ✅ Transaction.status = PARTIALLY_REFUNDED
- ✅ Commission recalculated (50% of original)
- ✅ Net amount updated

**Status:** [ ] Pass [ ] Fail

---

### **9. Analytics Tests**

#### **Test 9.1: Dashboard KPIs**

**Steps:**
1. Login as owner
2. View dashboard

**Expected:**
- ✅ Total revenue displayed
- ✅ Total bookings count
- ✅ Active customers count
- ✅ Completion rate percentage
- ✅ Charts rendered

**Status:** [ ] Pass [ ] Fail

---

### **10. Notification Tests**

#### **Test 10.1: Booking Created Notification**

**Steps:**
1. Create booking
2. Check notifications bell icon

**Expected:**
- ✅ Red badge appears
- ✅ Notification: "New booking created"
- ✅ Click to view details
- ✅ Mark as read removes badge

**Status:** [ ] Pass [ ] Fail

---

## 🚀 Performance Testing

### **Load Test 1: Concurrent Bookings**

**Tool:** Apache Bench or Artillery

```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 http://localhost:5000/api/v1/bookings
```

**Expected:**
- ✅ 100 requests completed
- ✅ Response time < 500ms (p95)
- ✅ No errors
- ✅ Database handles concurrent writes

**Results:**
- Requests: ________
- Avg response time: ________ ms
- Errors: ________

---

### **Load Test 2: Payment Processing**

```bash
# Simulate 50 concurrent payments
artillery quick --count 50 --num 5 http://localhost:5000/api/v1/stripe/create-payment-intent
```

**Expected:**
- ✅ All payments processed
- ✅ No duplicate charges
- ✅ Commission calculated for all

**Status:** [ ] Pass [ ] Fail

---

## 🔒 Security Testing

### **Security Test 1: SQL Injection**

**Steps:**
1. Try SQL injection in login:
   ```
   Email: admin@letwash.com' OR '1'='1
   Password: anything
   ```

**Expected:**
- ✅ Login fails
- ✅ No database error
- ✅ Prisma prevents injection

**Status:** [ ] Pass [ ] Fail

---

### **Security Test 2: XSS Attack**

**Steps:**
1. Create booking with customer name:
   ```
   <script>alert('XSS')</script>
   ```

**Expected:**
- ✅ Script not executed
- ✅ Rendered as text
- ✅ React escapes HTML

**Status:** [ ] Pass [ ] Fail

---

### **Security Test 3: Unauthorized Access**

**Steps:**
1. Logout
2. Try to access: http://localhost:5000/api/v1/bookings
3. Try to access: http://localhost/dashboard

**Expected:**
- ✅ API returns 401 Unauthorized
- ✅ Frontend redirects to login
- ✅ No data leaked

**Status:** [ ] Pass [ ] Fail

---

### **Security Test 4: Role-Based Access**

**Steps:**
1. Login as STAFF user
2. Try to access admin commission dashboard

**Expected:**
- ✅ Access denied
- ✅ Error: "Insufficient permissions"
- ✅ No sensitive data shown

**Status:** [ ] Pass [ ] Fail

---

## 📊 Test Results Summary

### **Test Categories**

| Category | Tests | Passed | Failed | N/A |
|----------|-------|--------|--------|-----|
| Authentication | 4 | ___ | ___ | ___ |
| Registration | 2 | ___ | ___ | ___ |
| Branch Management | 3 | ___ | ___ | ___ |
| Services | 1 | ___ | ___ | ___ |
| Bookings | 3 | ___ | ___ | ___ |
| Payments | 4 | ___ | ___ | ___ |
| Commissions | 4 | ___ | ___ | ___ |
| Refunds | 2 | ___ | ___ | ___ |
| Analytics | 1 | ___ | ___ | ___ |
| Notifications | 1 | ___ | ___ | ___ |
| Performance | 2 | ___ | ___ | ___ |
| Security | 4 | ___ | ___ | ___ |

**Total:** ____ / 31 tests passed

---

## 🎯 Test Data

### **Test Stripe Cards**

| Card Number | Type | Expected Result |
|-------------|------|-----------------|
| 4242 4242 4242 4242 | Visa | Success |
| 4000 0566 5566 5556 | Visa Debit | Success |
| 5555 5555 5555 4444 | Mastercard | Success |
| 4000 0000 0000 0002 | Visa | Declined |
| 4000 0000 0000 9995 | Visa | Insufficient funds |
| 4000 0027 6000 3184 | Visa | 3D Secure required |

### **Test Amounts**

- $10.00 - Small transaction
- $50.00 - Medium transaction
- $100.00 - Standard test
- $500.00 - Large transaction
- $1,000.00 - Very large

---

## 🔧 Troubleshooting

### **Payment Test Fails**

```bash
# Check Stripe webhook listener
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook

# Check backend logs
docker logs letwash-backend -f

# Verify Stripe keys
docker exec letwash-backend env | grep STRIPE
```

### **Database Test Issues**

```bash
# Reset database
docker exec -it letwash-backend npx prisma migrate reset --force

# Re-seed
docker exec -it letwash-backend npm run seed
```

---

## ✅ Pre-Production Checklist

Before deploying to production:

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Payment flow tested with real Stripe account
- [ ] Commission calculation verified
- [ ] Refunds tested
- [ ] Load testing completed (1000+ req/sec)
- [ ] Security audit passed
- [ ] Browser compatibility tested (Chrome, Firefox, Safari)
- [ ] Mobile responsiveness tested
- [ ] SSL certificates tested
- [ ] Backup/restore tested
- [ ] Monitoring alerts tested

---

**Test Completion Date:** __________  
**Tested By:** __________  
**Approval:** __________

---

**Happy Testing! 🧪✅**
