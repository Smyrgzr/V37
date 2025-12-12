# 💳 Stripe Payment Entegrasyonu - Kurulum Rehberi

## ✅ Eklenen Özellikler

- ✅ Stripe Payment Intent API
- ✅ Webhook handling (payment success/failed/refunded)
- ✅ Commission calculation (otomatik)
- ✅ Frontend Stripe Elements entegrasyonu
- ✅ Payment success page
- ✅ Refund işlemleri

---

## 🔑 **ADIM 1: Stripe Hesabı Oluştur**

### **1.1 Stripe'a Kayıt Ol**

```
1. https://dashboard.stripe.com/register adresine git
2. Email, şifre ile kayıt ol
3. İş bilgilerini doldur
4. Email'ini doğrula
```

### **1.2 Test Mode'u Aktif Et**

Dashboard'da sağ üstte **"Test mode"** toggle'ının açık olduğundan emin ol.

---

## 🔐 **ADIM 2: API Anahtarlarını Al**

### **2.1 Dashboard'dan Anahtarları Kopyala**

```
1. https://dashboard.stripe.com/test/apikeys aç
2. İki anahtar göreceksin:
   - Publishable key (pk_test_...)
   - Secret key (sk_test_...)
```

### **2.2 Backend .env Dosyasını Oluştur**

```bash
cd backend
cp .env.example .env
```

`.env` dosyasını düzenle:

```env
STRIPE_SECRET_KEY=sk_test_51ABC123...
STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
```

### **2.3 Frontend .env Dosyasını Oluştur**

```bash
cd ..  # Ana dizine dön
cp .env.example .env
```

`.env` dosyasını düzenle:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
```

---

## 🔔 **ADIM 3: Webhook Kurulumu**

Webhook, Stripe'ın ödeme durumlarını backend'e bildirmesi için gerekli.

### **3.1 Local Test için Stripe CLI Kur**

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
```bash
# Scoop ile:
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Veya direkt indirin:
# https://github.com/stripe/stripe-cli/releases
```

**Linux:**
```bash
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

### **3.2 Stripe CLI ile Login**

```bash
stripe login
```

Tarayıcıda açılan sayfada "Allow access" tıkla.

### **3.3 Webhook'u Forward Et (Local Development)**

Yeni bir terminal aç:

```bash
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook
```

**Çıktıda webhook secret görünecek:**
```
> Ready! Your webhook signing secret is whsec_abc123...
```

Bu secret'ı kopyala ve backend `.env` dosyasına ekle:

```env
STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

---

## 🚀 **ADIM 4: Test Etme**

### **4.1 Servisleri Başlat**

**Terminal 1: Backend**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2: Webhook Listener**
```bash
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook
```

**Terminal 3: Frontend**
```bash
npm install
npm run dev
```

### **4.2 Test Card Numaraları**

Stripe test modunda çalışıyor. Gerçek kart kullanma!

**Başarılı Ödeme:**
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34 (herhangi bir gelecek tarih)
CVC: 123 (herhangi 3 rakam)
ZIP: 12345
```

**Başarısız Ödeme:**
```
Card Number: 4000 0000 0000 0002
```

**3D Secure Gerekli:**
```
Card Number: 4000 0027 6000 3184
```

**Daha fazla test kartı:**
https://stripe.com/docs/testing#cards

---

## 🧪 **ADIM 5: Payment Akışını Test Et**

### **Test Senaryosu 1: Booking Payment**

```bash
# 1. Yeni booking oluştur
curl -X POST http://localhost:5000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "branchId": "...",
    "serviceId": "...",
    "vehicleType": "SEDAN",
    "scheduledDate": "2025-01-15",
    "startTime": "2025-01-15T10:00:00Z",
    "customerName": "Test User",
    "customerPhone": "+905551234567"
  }'

# Response: { bookingId: "...", finalPrice: 100 }

# 2. Payment intent oluştur
curl -X POST http://localhost:5000/api/v1/stripe/create-payment-intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "bookingId": "BOOKING_ID",
    "userId": "USER_ID",
    "amount": 100
  }'

# Response: 
# {
#   "clientSecret": "pi_abc123_secret_xyz",
#   "amount": 100,
#   "commissionAmount": 10,
#   "netAmount": 90
# }

# 3. Frontend'de ödeme tamamla (Stripe Elements ile)
```

### **Test Senaryosu 2: Frontend UI ile**

```
1. http://localhost tarayıcıda aç
2. Login ol (owner1@letwash.com / Letwash123!)
3. Yeni booking oluştur
4. "Pay Now" butonuna tıkla
5. Stripe checkout formu açılır
6. Test kartı gir: 4242 4242 4242 4242
7. "Pay" tıkla
8. Başarılı → Success sayfasına yönlendirilir
9. Webhook Terminal'de log görünür:
   ✓ payment_intent.succeeded
   ✓ Transaction COMPLETED
   ✓ Commission created
```

---

## 📊 **Stripe Dashboard'da Görüntüle**

### **Payments**
```
https://dashboard.stripe.com/test/payments
→ Tüm ödemeleri görürsün
```

### **Customers**
```
https://dashboard.stripe.com/test/customers
→ Oluşturulan müşterileri görürsün
```

### **Webhooks**
```
https://dashboard.stripe.com/test/webhooks
→ Webhook event'lerini görürsün
```

---

## 🔄 **Refund İşlemi Test**

```bash
# API ile refund
curl -X POST http://localhost:5000/api/v1/stripe/refund \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "transactionId": "TRANSACTION_ID",
    "amount": 50,
    "reason": "Customer requested refund"
  }'

# Response:
# {
#   "success": true,
#   "refundId": "re_abc123",
#   "amount": 50
# }

# Webhook terminal'de göreceksin:
# ✓ charge.refunded
```

---

## 🌐 **Production Setup**

### **1. Live Mode Anahtarları Al**

```
1. Stripe Dashboard > Developers > API keys
2. "Test mode" toggle'ını kapat
3. Live keys'leri kopyala (sk_live_... ve pk_live_...)
```

### **2. Production Webhook Oluştur**

```
1. Dashboard > Developers > Webhooks > Add endpoint
2. Endpoint URL: https://api.letwash.com/api/v1/stripe/webhook
3. Events to send:
   ✓ payment_intent.succeeded
   ✓ payment_intent.payment_failed
   ✓ charge.refunded
4. Add endpoint
5. Webhook signing secret'ı kopyala
```

### **3. Environment Variables (Production)**

**Backend:**
```env
NODE_ENV=production
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...
```

**Frontend:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 🔒 **Güvenlik Notları**

### ✅ **YAPILMASI GEREKENLER**

1. **Secret key'i backend'de tut** (frontend'e asla ekleme!)
2. **Webhook signature'ı doğrula** (stripe.webhooks.constructEvent)
3. **Amount'u backend'de hesapla** (frontend'den gelen değere güvenme)
4. **HTTPS kullan** (production'da zorunlu)
5. **Rate limiting** aktif tut
6. **Logs tut** (tüm payment işlemlerini kaydet)

### ❌ **YAPILMAMASI GEREKENLER**

1. Secret key'i commit etme (git'e ekleme)
2. Live keys'i test modunda kullanma
3. Test keys'i production'da kullanma
4. Webhook signature doğrulamasını atlama

---

## 🐛 **Sorun Giderme**

### **Problem: "No such payment_intent"**

**Çözüm:**
```bash
# Backend .env kontrol et
echo $STRIPE_SECRET_KEY  # sk_test_ ile başlamalı

# Doğru test mode'da mısın?
# Dashboard'da "Test mode" açık olmalı
```

### **Problem: Webhook çalışmıyor**

**Çözüm:**
```bash
# Webhook secret doğru mu?
echo $STRIPE_WEBHOOK_SECRET  # whsec_ ile başlamalı

# Stripe CLI çalışıyor mu?
stripe listen --forward-to localhost:5000/api/v1/stripe/webhook

# Backend webhook endpoint'i doğru mu?
curl http://localhost:5000/api/v1/stripe/webhook
```

### **Problem: Payment başarılı ama commission oluşmadı**

**Çözüm:**
```bash
# Webhook event'i geldi mi? Terminal'de:
✓ payment_intent.succeeded

# Database'de transaction var mı?
docker exec -it letwash-db psql -U letwash -d letwash
SELECT * FROM transactions WHERE gateway_transaction_id = 'pi_abc123';

# Commission oluşmuş mu?
SELECT * FROM commissions WHERE transaction_id = 'TRANSACTION_ID';
```

---

## 📈 **İstatistikler ve Raporlama**

### **Stripe Dashboard Metrikleri**

```
1. Dashboard > Home
   - Total payments
   - Successful charges
   - Failed charges
   - Refunds

2. Dashboard > Analytics
   - Revenue over time
   - Customer insights
   - Payment methods breakdown
```

### **Letwash Backend API**

```bash
# Transaction istatistikleri
GET /api/v1/transactions/stats/:userId

# Komisyon istatistikleri
GET /api/v1/commissions/stats/:ownerId

# Letwash genel rapor (Admin)
GET /api/v1/commissions/dashboard/letwash
```

---

## 💰 **Komisyon Oranları**

```
Starter Plan:       15% komisyon
Professional Plan:  10% komisyon
Enterprise Plan:    7.5% komisyon
```

**Örnek Hesaplama:**
```
Müşteri ödemesi: ₺100
Subscription: Professional (10%)
─────────────────────────────
Gross Amount:     ₺100
Commission:       ₺10  (10%)
Net Amount:       ₺90  (Owner'a gider)
```

---

## 🎯 **Sonraki Adımlar**

1. **Apple Pay / Google Pay** ekle
2. **Recurring payments** (subscription billing)
3. **Split payments** (multiple recipients)
4. **Invoice generation** (PDF fatura)
5. **Email notifications** (payment confirmation)

---

## 📞 **Destek**

**Stripe Dokümantasyon:**
- https://stripe.com/docs
- https://stripe.com/docs/payments/payment-intents
- https://stripe.com/docs/webhooks

**Letwash Support:**
- Email: support@letwash.com
- GitHub Issues: https://github.com/Smyrgzr/V37/issues

---

## ✅ **Kurulum Tamamlandı!**

Stripe payment sistemi şimdi hazır! Müşteriler artık güvenli bir şekilde ödeme yapabilir ve her transaction'dan otomatik komisyon kesilir.

**Test Checklist:**
- [ ] Stripe test mode aktif
- [ ] API keys `.env` dosyasında
- [ ] Webhook listener çalışıyor
- [ ] Test payment başarılı
- [ ] Commission oluştu
- [ ] Transaction COMPLETED
- [ ] Booking CONFIRMED

**Başarılar! 🎉💳🚀**
