# 🔐 Letwash SSO (Single Sign-On) Setup Guide

Bu rehber, **AWS Cognito**, **Google**, **Apple** ve **Microsoft** OAuth entegrasyonunu adım adım anlatır.

---

## 📋 SSO Seçenekleri

Letwash backend şu SSO yöntemlerini destekler:

1. ✅ **AWS Cognito** - AWS native, user pool yönetimi
2. ✅ **Google OAuth** - En popüler SSO
3. ✅ **Apple Sign In** - iOS/macOS kullanıcıları için zorunlu
4. ✅ **Microsoft OAuth** - Enterprise kullanıcılar için

---

## 🌩️ 1. AWS Cognito Kurulumu (Önerilen)

### 1.1 Cognito User Pool Oluşturma

```bash
# AWS Console > Amazon Cognito > User Pools > Create user pool
```

**Step 1: Configure sign-in experience**
```
- Sign-in options: Email, Phone number (optional)
- User name requirements: Email address
```

**Step 2: Configure security requirements**
```
- Password policy: Cognito defaults (8 chars min)
- MFA: Optional (önerilir production için)
- User account recovery: Email only
```

**Step 3: Configure sign-up experience**
```
- Self-registration: Enable
- Required attributes:
  ✅ email
  ✅ name (Full name)
  ☐ phone_number (optional)
- Custom attributes: 
  - custom:role (String, mutable)
```

**Step 4: Configure message delivery**
```
- Email provider: 
  - Send email with Cognito (development)
  - Send email with Amazon SES (production)
- FROM email address: noreply@letwash.com
```

**Step 5: Integrate your app**
```
- User pool name: letwash-users
- App type: Public client
- App client name: letwash-web
- Authentication flows:
  ✅ ALLOW_USER_PASSWORD_AUTH
  ✅ ALLOW_REFRESH_TOKEN_AUTH
  ✅ ALLOW_USER_SRP_AUTH
```

**Step 6: Review and create**

### 1.2 Environment Variables Ekleyin

`.env` dosyasına:
```env
AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
AWS_COGNITO_REGION=us-east-1
```

### 1.3 Test Edin

```bash
# Sign up
curl -X POST http://localhost:5000/api/v1/sso/cognito/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!",
    "fullName": "Test User"
  }'

# Confirm email (check your inbox)
curl -X POST http://localhost:5000/api/v1/sso/cognito/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "code": "123456"
  }'

# Sign in
curl -X POST http://localhost:5000/api/v1/sso/cognito/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234!"
  }'
```

---

## 🔴 2. Google OAuth Kurulumu

### 2.1 Google Cloud Console Setup

1. [Google Cloud Console](https://console.cloud.google.com/) açın
2. Yeni proje oluşturun: **Letwash**

### 2.2 OAuth Consent Screen

```
Navigation > APIs & Services > OAuth consent screen

1. User Type: External
2. App information:
   - App name: Letwash
   - User support email: support@letwash.com
   - Developer contact: dev@letwash.com
3. Scopes:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
4. Test users: Ekleyin (development için)
5. Save and Continue
```

### 2.3 Create OAuth 2.0 Credentials

```
APIs & Services > Credentials > Create Credentials > OAuth client ID

1. Application type: Web application
2. Name: Letwash Web Client
3. Authorized JavaScript origins:
   - http://localhost:5173 (development)
   - https://app.letwash.com (production)
4. Authorized redirect URIs:
   - http://localhost:5000/api/v1/sso/google/callback
   - https://api.letwash.com/api/v1/sso/google/callback
5. Create
```

### 2.4 Environment Variables

```env
GOOGLE_CLIENT_ID=xxxxx-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/sso/google/callback
```

### 2.5 Frontend Entegrasyon

```tsx
<button onClick={() => window.location.href = 'http://localhost:5000/api/v1/sso/google'}>
  Sign in with Google
</button>
```

---

## 🍎 3. Apple Sign In Kurulumu

### 3.1 Apple Developer Account

1. [Apple Developer](https://developer.apple.com/) hesabınızla giriş yapın
2. Certificates, Identifiers & Profiles > Identifiers

### 3.2 Services ID Oluşturma

```
1. Register a new identifier
2. Select: Services IDs
3. Description: Letwash Sign In
4. Identifier: com.letwash.signin
5. Continue > Register
```

### 3.3 Configure Services ID

```
1. Services ID'yi seçin
2. "Sign In with Apple" checkbox'ı işaretleyin
3. Configure:
   - Primary App ID: (mevcut app ID'niz)
   - Domains and Subdomains:
     - letwash.com
     - api.letwash.com
   - Return URLs:
     - https://api.letwash.com/api/v1/sso/apple/callback
4. Save
```

### 3.4 Private Key Oluşturma

```
1. Certificates, IDs & Profiles > Keys
2. Create a key (+)
3. Key Name: Letwash Apple Sign In Key
4. Enable: Sign in with Apple
5. Configure > Select your Services ID
6. Continue > Register
7. Download key (.p8 file) - SADECE BİR KEZ İNDİRİLEBİLİR!
8. Key ID'yi kaydedin (örn: ABC123XYZ)
```

### 3.5 Backend Setup

```bash
# Private key'i backend'e kopyalayın
mkdir -p backend/certs
cp AuthKey_ABC123XYZ.p8 backend/certs/apple-private-key.p8
```

### 3.6 Environment Variables

```env
APPLE_CLIENT_ID=com.letwash.signin
APPLE_TEAM_ID=XXXXXXXXXX (Apple Developer Team ID)
APPLE_KEY_ID=ABC123XYZ
APPLE_PRIVATE_KEY_PATH=./certs/apple-private-key.p8
APPLE_CALLBACK_URL=https://api.letwash.com/api/v1/sso/apple/callback
```

**Not:** Apple Sign In sadece HTTPS ile çalışır (local development hariç).

---

## 🟦 4. Microsoft OAuth Kurulumu

### 4.1 Azure Portal Setup

1. [Azure Portal](https://portal.azure.com/) açın
2. Azure Active Directory > App registrations > New registration

### 4.2 Register Application

```
1. Name: Letwash
2. Supported account types:
   - Accounts in any organizational directory (Any Azure AD - Multitenant)
   - Personal Microsoft accounts
3. Redirect URI:
   - Platform: Web
   - URL: http://localhost:5000/api/v1/sso/microsoft/callback
4. Register
```

### 4.3 Configure App

```
1. Overview > Application (client) ID kaydedin
2. Certificates & secrets > New client secret:
   - Description: Letwash Backend
   - Expires: 24 months
   - Add > Value'yu kaydedin (sadece bir kez gösterilir!)
3. Authentication > Add redirect URI (production):
   - https://api.letwash.com/api/v1/sso/microsoft/callback
4. API permissions > Add a permission:
   - Microsoft Graph > Delegated permissions
   - User.Read
   - Add permissions
```

### 4.4 Environment Variables

```env
MICROSOFT_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MICROSOFT_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
MICROSOFT_CALLBACK_URL=http://localhost:5000/api/v1/sso/microsoft/callback
MICROSOFT_TENANT=common
```

---

## 🔧 5. Frontend Entegrasyonu

### 5.1 SSO Login Page

```tsx
import { SSOLoginButtons } from '@/components/auth/SSOLoginButtons';
import { CognitoAuth } from '@/components/auth/CognitoAuth';

export function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      
      {/* AWS Cognito */}
      <CognitoAuth
        apiUrl="http://localhost:5000/api/v1"
        onSuccess={(data) => {
          console.log('Login success:', data);
          // Navigate to dashboard
        }}
      />

      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300" />
        <span className="px-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* Social SSO */}
      <SSOLoginButtons apiUrl="http://localhost:5000/api/v1" />
    </div>
  );
}
```

### 5.2 Callback Handler Route

```tsx
// App.tsx or Router
import { SSOCallbackHandler } from '@/components/auth/SSOCallbackHandler';

<Route 
  path="/auth/callback" 
  element={
    <SSOCallbackHandler
      onSuccess={(token, refresh) => {
        console.log('SSO Success:', { token, refresh });
      }}
      redirectTo="/dashboard"
    />
  } 
/>
```

### 5.3 Environment Variables (Frontend)

```env
# .env.local
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🧪 6. Test SSO Flow

### Google OAuth Test

```bash
# 1. Frontend'den Google button'una tıklayın
# 2. Google login sayfası açılır
# 3. Email/password girin
# 4. İzinleri onaylayın
# 5. http://localhost:5173/auth/callback?token=xxx&refresh=yyy
# 6. Dashboard'a yönlendirilir
```

### Apple Sign In Test

**Not:** Apple test etmek için HTTPS gerekir. Ngrok kullanabilirsiniz:

```bash
# Backend'i ngrok ile expose edin
ngrok http 5000

# Callback URL'i güncelleyin
https://xxxxx.ngrok.io/api/v1/sso/apple/callback
```

### Microsoft OAuth Test

```bash
# Frontend'den Microsoft button'una tıklayın
# Microsoft login sayfası açılır
# Callback'e yönlendirilir
```

---

## 🔒 7. Güvenlik Best Practices

### 7.1 Secrets Management

**Production'da ASLA .env dosyasını commit etmeyin!**

AWS Secrets Manager kullanın:

```bash
# Create secret
aws secretsmanager create-secret \
  --name letwash/sso-credentials \
  --secret-string '{
    "GOOGLE_CLIENT_SECRET":"xxx",
    "APPLE_KEY_ID":"yyy",
    "MICROSOFT_CLIENT_SECRET":"zzz"
  }'

# Backend'de kullanım
const secrets = JSON.parse(
  await secretsmanager.getSecretValue({
    SecretId: 'letwash/sso-credentials'
  }).SecretString
);
```

### 7.2 HTTPS Zorunluluğu

Production'da tüm SSO endpoint'leri HTTPS olmalı:

```javascript
// middleware
if (process.env.NODE_ENV === 'production' && !req.secure) {
  return res.redirect('https://' + req.get('host') + req.url);
}
```

### 7.3 CORS Configuration

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://app.letwash.com'
    : 'http://localhost:5173',
  credentials: true,
};
```

### 7.4 Rate Limiting

SSO endpoint'lerini rate limit ile koruyun:

```javascript
const ssoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 15 dakikada max 5 login denemesi
  message: 'Too many login attempts'
});

app.use('/api/v1/sso', ssoLimiter);
```

---

## 📊 8. Monitoring & Analytics

### 8.1 CloudWatch Logs

```javascript
// Log SSO events
await prisma.activityLog.create({
  data: {
    userId: user.id,
    activityType: 'USER_LOGIN',
    description: `User logged in via ${provider}`,
    metadata: {
      provider,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    }
  }
});
```

### 8.2 Success Rate Tracking

```sql
-- SSO başarı oranı
SELECT 
  JSON_EXTRACT(metadata, '$.provider') as provider,
  COUNT(*) as total_logins,
  DATE(created_at) as date
FROM activity_logs
WHERE activity_type = 'USER_LOGIN'
GROUP BY provider, date
ORDER BY date DESC;
```

---

## 🐛 9. Troubleshooting

### Google OAuth Error: redirect_uri_mismatch

```
Çözüm: 
1. Google Console > Credentials > OAuth client
2. Authorized redirect URIs'ı kontrol edin
3. Tam URL'yi ekleyin: http://localhost:5000/api/v1/sso/google/callback
4. Save
```

### Apple Sign In Error: invalid_client

```
Çözüm:
1. Apple private key (.p8) doğru yolda mı?
2. APPLE_KEY_ID, APPLE_TEAM_ID doğru mu?
3. Services ID callback URL HTTPS mi?
```

### Cognito Error: User is not confirmed

```
Çözüm:
1. Kullanıcı emailini confirm etmemiş
2. /cognito/confirm endpoint'ini kullan
3. Ya da AWS Console'dan manual confirm et
```

### Microsoft Error: AADSTS50011 (redirect URI mismatch)

```
Çözüm:
1. Azure Portal > App registrations > Authentication
2. Redirect URI'yi ekleyin/güncelleyin
3. Save
```

---

## 📈 10. Production Checklist

- [ ] Tüm secrets AWS Secrets Manager'da
- [ ] HTTPS zorunlu (Apple için kesinlikle)
- [ ] CORS sadece production domain
- [ ] Rate limiting aktif
- [ ] Error logging (Sentry/CloudWatch)
- [ ] Email provider (SES) production mode
- [ ] OAuth callbacks production URL'leri
- [ ] Session secret güçlü ve benzersiz
- [ ] Database backup stratejisi
- [ ] SSO provider dashboards'da monitoring aktif

---

## 🎉 Tamamlandı!

SSO artık hazır! Kullanıcılar şu yöntemlerle giriş yapabilir:

1. ✅ Email/Password (AWS Cognito)
2. ✅ Google Account
3. ✅ Apple ID
4. ✅ Microsoft Account

**İyi geliştirmeler! 🚀**
