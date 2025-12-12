# 🔒 Letwash - Security Best Practices

**Comprehensive security guidelines for production deployment**

---

## 📋 Table of Contents

1. [Environment Variables](#environment-variables)
2. [Authentication & Authorization](#authentication--authorization)
3. [Database Security](#database-security)
4. [API Security](#api-security)
5. [Payment Security](#payment-security)
6. [SSL/TLS Configuration](#ssltls-configuration)
7. [Docker Security](#docker-security)
8. [Monitoring & Logging](#monitoring--logging)
9. [Incident Response](#incident-response)
10. [Security Checklist](#security-checklist)

---

## 🔐 Environment Variables

### **Critical Rules**

✅ **DO:**
- Store secrets in `.env` files
- Use strong, unique secrets (64+ characters)
- Rotate secrets regularly (every 90 days)
- Use environment-specific `.env` files
- Keep `.env` files in `.gitignore`

❌ **DON'T:**
- Commit `.env` files to Git
- Share secrets via email/Slack
- Use default/example secrets in production
- Hardcode secrets in code
- Reuse secrets across environments

### **Generating Strong Secrets**

```bash
# JWT Secret (64 chars)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Database Password (32 chars)
openssl rand -base64 32

# Session Secret (64 chars)
openssl rand -hex 64
```

### **Required Production Secrets**

```env
# CRITICAL - MUST CHANGE IN PRODUCTION
JWT_SECRET=<64-char-random-hex>
REFRESH_TOKEN_SECRET=<64-char-random-hex>
SESSION_SECRET=<64-char-random-hex>
POSTGRES_PASSWORD=<32-char-strong-password>

# REQUIRED
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## 🔑 Authentication & Authorization

### **Password Security**

✅ **Implemented:**
- Bcrypt hashing (10 rounds)
- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number, 1 special char
- Password history (prevent reuse)

```javascript
// backend/src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const BCRYPT_ROUNDS = 10;

const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
```

### **JWT Token Security**

✅ **Configuration:**
```javascript
// Short-lived access tokens
JWT_EXPIRES_IN=7d

// Long-lived refresh tokens
REFRESH_TOKEN_EXPIRES_IN=30d

// Token rotation on refresh
// Invalidate old refresh tokens
```

⚠️ **Best Practices:**
- Never store JWT in localStorage (XSS risk)
- Use httpOnly cookies for tokens
- Implement token blacklist for logout
- Validate token signature on every request
- Include user role in token payload

### **Session Security**

```javascript
// Express session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,      // HTTPS only
    httpOnly: true,    // No JS access
    maxAge: 24*60*60*1000,  // 24 hours
    sameSite: 'strict' // CSRF protection
  }
}));
```

### **Role-Based Access Control**

✅ **Implemented Roles:**
- `ROOT_OWNER` - Platform admin (full access)
- `CARWASH_OWNER` - Business owner (own branches)
- `MANAGER` - Branch manager (assigned branch)
- `STAFF` - Staff member (check-in, updates)

```javascript
// Middleware example
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage
router.get('/admin/commissions', 
  authenticate, 
  authorize(['ROOT_OWNER']), 
  getCommissions
);
```

---

## 🗄️ Database Security

### **Connection Security**

✅ **Configuration:**
```env
# Use SSL/TLS connection
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# Connection pooling limits
?connection_limit=10&pool_timeout=20
```

### **SQL Injection Prevention**

✅ **Using Prisma ORM:**
```javascript
// ✅ SAFE - Prisma parameterizes queries
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// ❌ UNSAFE - Raw SQL (avoid!)
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = '${userInput}'
`;
```

### **Database Backups**

✅ **Automated Backups:**
```bash
# Daily backups at 2 AM
0 2 * * * /path/to/scripts/backup.sh

# Retention: 30 days
# Encryption: GPG
# Storage: S3 or external backup service
```

### **Database Access Control**

```sql
-- Create read-only user for analytics
CREATE USER analytics WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE letwash TO analytics;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics;

-- Revoke unnecessary privileges
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```

---

## 🌐 API Security

### **Rate Limiting**

✅ **Implemented:**
```javascript
const rateLimit = require('express-rate-limit');

// Global rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});

// Login rate limit (stricter)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true
});

app.use('/api/', limiter);
app.use('/api/v1/auth/login', loginLimiter);
```

### **CORS Configuration**

✅ **Production:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

⚠️ **Never use `origin: '*'` in production!**

### **Helmet Security Headers**

✅ **Implemented:**
```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### **Input Validation**

✅ **Using express-validator:**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/bookings',
  [
    body('email').isEmail().normalizeEmail(),
    body('phone').isMobilePhone(),
    body('amount').isFloat({ min: 0 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

### **XSS Prevention**

✅ **React automatically escapes:**
```jsx
// ✅ SAFE - React escapes HTML
<div>{userInput}</div>

// ❌ UNSAFE - Don't use dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

✅ **Sanitize user input:**
```javascript
const sanitizeHtml = require('sanitize-html');

const clean = sanitizeHtml(userInput, {
  allowedTags: [],
  allowedAttributes: {}
});
```

---

## 💳 Payment Security

### **Stripe Security**

✅ **PCI Compliance:**
- Use Stripe Elements (no card data on server)
- Never store card numbers
- Use HTTPS only
- Verify webhook signatures

```javascript
// ✅ Verify webhook signature
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/stripe/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Process event
    
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  res.json({received: true});
});
```

### **Payment Amount Validation**

✅ **Server-side validation:**
```javascript
// ❌ NEVER trust client-side amounts
// ✅ ALWAYS calculate on server

const booking = await prisma.booking.findUnique({
  where: { id: bookingId },
  include: { service: true }
});

// Calculate amount based on service and vehicle type
const amount = calculateAmount(booking.service, booking.vehicleType);

// Create payment intent with calculated amount
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100), // cents
  currency: 'usd',
  metadata: { bookingId }
});
```

### **Idempotency**

✅ **Prevent duplicate charges:**
```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000,
  currency: 'usd',
}, {
  idempotencyKey: `booking-${bookingId}`
});
```

---

## 🔒 SSL/TLS Configuration

### **Certificate Setup**

✅ **Let's Encrypt (Free):**
```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renewal
sudo crontab -e
0 0,12 * * * certbot renew --quiet
```

### **Nginx SSL Configuration**

```nginx
# Strong SSL configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
ssl_prefer_server_ciphers off;

# HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
```

### **Test SSL Configuration**

```bash
# SSL Labs test
https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com

# OpenSSL test
openssl s_client -connect yourdomain.com:443
```

---

## 🐳 Docker Security

### **Non-Root User**

✅ **All containers run as non-root:**
```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Switch to non-root
USER nodejs
```

### **Image Security**

✅ **Best practices:**
```dockerfile
# Use official base images
FROM node:18-alpine

# Use specific versions (not :latest)
FROM postgres:15-alpine

# Multi-stage builds (smaller images)
FROM node:18-alpine AS builder
# ... build steps
FROM node:18-alpine
COPY --from=builder /app/dist ./dist
```

### **Container Isolation**

✅ **Docker Compose:**
```yaml
# Network isolation
networks:
  letwash-network:
    driver: bridge

# Resource limits
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 2G
```

### **Secret Management**

```yaml
# ❌ DON'T hardcode secrets
environment:
  JWT_SECRET: hardcoded-secret  # WRONG!

# ✅ DO use environment variables
environment:
  JWT_SECRET: ${JWT_SECRET}

# ✅ OR use Docker secrets
secrets:
  - jwt_secret
```

---

## 📊 Monitoring & Logging

### **Logging Best Practices**

✅ **What to log:**
- Authentication attempts (success/failure)
- API requests (method, path, status)
- Payment transactions
- Errors and exceptions
- Security events (suspicious activity)

❌ **Never log:**
- Passwords
- API keys/secrets
- Credit card numbers
- Social security numbers
- JWT tokens

```javascript
// ✅ GOOD
logger.info('User login attempt', { email: user.email, ip: req.ip });

// ❌ BAD
logger.info('User login', { password: user.password }); // NEVER!
```

### **Error Handling**

✅ **Production error responses:**
```javascript
// ❌ Development (exposes stack trace)
res.status(500).json({ error: err.stack });

// ✅ Production (generic message)
if (process.env.NODE_ENV === 'production') {
  res.status(500).json({ error: 'Internal server error' });
} else {
  res.status(500).json({ error: err.message, stack: err.stack });
}
```

### **Security Monitoring**

✅ **Monitor for:**
- Failed login attempts (> 5 per minute)
- API rate limit hits
- Database connection failures
- Unusual payment activity
- SSL certificate expiration

**Tools:**
- Sentry (error tracking)
- DataDog (metrics)
- ELK Stack (log aggregation)
- UptimeRobot (uptime monitoring)

---

## 🚨 Incident Response

### **Security Incident Checklist**

**1. Detection:**
- [ ] Identify the incident
- [ ] Assess severity
- [ ] Document initial findings

**2. Containment:**
- [ ] Isolate affected systems
- [ ] Revoke compromised credentials
- [ ] Block malicious IPs
- [ ] Disable affected features

**3. Eradication:**
- [ ] Remove malware/backdoors
- [ ] Patch vulnerabilities
- [ ] Update security measures

**4. Recovery:**
- [ ] Restore from backups (if needed)
- [ ] Verify system integrity
- [ ] Monitor for recurrence

**5. Post-Incident:**
- [ ] Document lessons learned
- [ ] Update security procedures
- [ ] Train team on prevention

### **Emergency Contacts**

```
Security Lead: security@letwash.com
DevOps Team: devops@letwash.com
On-Call: +1-XXX-XXX-XXXX
```

---

## ✅ Security Checklist

### **Pre-Production**

- [ ] All environment secrets are strong and unique
- [ ] `.env` files are in `.gitignore`
- [ ] SSL/TLS certificates configured
- [ ] HTTPS enforced (HTTP redirects)
- [ ] HSTS header enabled
- [ ] CORS restricted to production domains
- [ ] Rate limiting configured
- [ ] Helmet security headers enabled
- [ ] Database using SSL connection
- [ ] Database backups automated
- [ ] Docker containers run as non-root
- [ ] Stripe webhook signature verification
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection (React escaping)
- [ ] CSRF protection enabled
- [ ] Password complexity requirements
- [ ] JWT token expiration configured
- [ ] Error messages don't leak sensitive info
- [ ] Logging excludes sensitive data
- [ ] Security monitoring configured
- [ ] Incident response plan documented

### **Post-Deployment**

- [ ] SSL certificate auto-renewal working
- [ ] Monitoring alerts configured
- [ ] Logs being aggregated
- [ ] Backups running successfully
- [ ] Health checks passing
- [ ] Error tracking (Sentry) receiving events
- [ ] Rate limits tested
- [ ] Security scan completed (OWASP)
- [ ] Penetration testing scheduled

---

## 📚 Resources

**Security Standards:**
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- PCI DSS: https://www.pcisecuritystandards.org/
- GDPR: https://gdpr.eu/

**Tools:**
- Snyk (vulnerability scanning): https://snyk.io/
- OWASP ZAP (penetration testing): https://www.zaproxy.org/
- SSL Labs (SSL testing): https://www.ssllabs.com/

**Training:**
- OWASP WebGoat: https://owasp.org/www-project-webgoat/
- Security Training: https://www.hacksplaining.com/

---

## 📞 Reporting Security Issues

**If you discover a security vulnerability:**

1. **DO NOT** open a public GitHub issue
2. Email: security@letwash.com
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

**Response Time:**
- Acknowledgment: Within 24 hours
- Initial assessment: Within 48 hours
- Fix deployment: Based on severity (critical: 24h, high: 72h)

---

**Security is everyone's responsibility. Stay vigilant! 🔒**

**Last Updated:** December 12, 2024  
**Version:** 1.0.0
