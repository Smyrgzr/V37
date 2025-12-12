# LETWASH PLATFORM - BUSINESS MODULE ANALİZİ & USER JOURNEY MAP
## 📋 İçindekiler Tablosu
1. [Business Modüller Genel Bakış](#1-business-modüller-genel-bakış)
2. [İşletim Modelleri: Walk-in vs Reservation](#2-i̇şletim-modelleri-walk-in-vs-reservation)
3. [Her Modül İçin Detaylı User Journey](#3-her-modül-i̇çin-detaylı-user-journey)
4. [Capacity Management: Modül Bazlı Analiz](#4-capacity-management-modül-bazlı-analiz)
5. [Takvim & Rezervasyon Sistemi Kurgusu](#5-takvim--rezervasyon-sistemi-kurgusu)
6. [Öneriler & Sonuç](#6-öneriler--sonuç)

---

## 1. BUSINESS MODÜLLER GENEL BAKIŞ

### 1.1 Platform'da Desteklenen 5 Business Module

| Modül | Operasyon Modeli | İkon | Ana Özellik | Kapasite Birimi |
|-------|-----------------|------|-------------|-----------------|
| **In-Bay Automatic** | Walk-in | 🚗 Car | Otomatik yıkama sistemi, müşteri beklemeden direkt hizmet | Bay (Kabin) |
| **Tunnel Wash** | Walk-in | ⚡ Zap | Konveyör bantlı yüksek hacimli sistem | Tunnel Line |
| **Self-Service** | Walk-in | 🔧 Wrench | Müşteri kendisi yıkar, dakika bazlı ödeme | Self-Service Bay |
| **Manual Detailing** | Reservation | 👥 Users | El ile detaylı yıkama/iç temizlik, rezervasyon gerekli | Detail Station |
| **Mobile Detailing** | Reservation | 🚚 Truck | Müşterinin lokasyonuna gidilerek yapılan hizmet | Mobile Unit |

---

## 2. İŞLETİM MODELLERİ: WALK-IN VS RESERVATION

### 2.1 Walk-in Modeller (In-Bay, Tunnel, Self-Service)

**Temel Özellikler:**
- ❌ **Rezervasyon gerektirmez**
- ✅ **First-come, first-served (ilk gelen alır)**
- ✅ **Real-time kapasite yönetimi**
- ✅ **Hızlı işlem süresi** (15-30 dakika)
- ✅ **Transaction-based** (işlem bazlı)

**Workflow:**
```
Müşteri Gelir → Sıra Varsa Bekler → Bay/Tunnel Boşalır → Hizmet Başlar → Ödeme → Ayrılır
```

**Capacity Management:**
- Eş zamanlı kaç bay/tunnel aktif olabilir?
- Her birim ortalama kaç dakikada bir servis verebilir?
- Saat başına maksimum kapasite nedir?

**Walk-in için Calendar Görünümü:**
- Timeline view: Hangi bay şu anda kullanımda?
- Gerçek zamanlı doluluk oranı (utilization rate)
- Bekleme süresi tahmini
- Transaction history (gün içinde kaç servis yapıldı)

---

### 2.2 Reservation-based Modeller (Manual Detailing, Mobile Detailing)

**Temel Özellikler:**
- ✅ **Rezervasyon zorunlu**
- ✅ **Approval workflow** (talep → onay → servis)
- ✅ **Zamanlanmış hizmet** (scheduled service)
- ✅ **Uzun hizmet süresi** (45-180 dakika)
- ✅ **4-hour confirmation rule** (4 saat öncesi onay)

**Workflow:**
```
Rezervasyon Talebi → Carwash Onayı/Red/Alternatif → Müşteri Onayı → 
4h Öncesi Confirmation → Check-in (QR/OCR) → Hizmet Başlar → 
Hizmet Tamamlanır → Müşteri Aracını Teslim Alır → Ödeme
```

**Capacity Management:**
- Kaç detailer/mobile unit mevcut?
- Her birinin günlük maksimum kaç hizmeti var?
- Rezervasyon slotları nasıl dağıtılıyor?
- Overlapping rezervasyonlar nasıl önleniyor?

**Reservation için Calendar Görünümü:**
- Timeline view: Slotlar ve rezervasyonlar
- Approval dashboard: Bekleyen talepler
- Check-in interface: QR/OCR ile araç eşleştirme
- Progress tracker: Servis ilerlemesi

---

## 3. HER MODÜL İÇİN DETAYLI USER JOURNEY

### 3.1 IN-BAY AUTOMATIC - Walk-in Journey

#### 🎯 Müşteri Perspektifi
```
1. Arrival (Varış)
   - Müşteri carwash'e gelir
   - Bay'lerin durumunu kontrol eder (Available/In-service/Waiting)
   
2. Queue/Wait (Sıra/Bekleme)
   - Eğer bay doluysa sırada bekler
   - Bekleme süresi: ~5-15 dakika
   
3. Service Selection (Hizmet Seçimi)
   - Kiosk'tan veya app'ten paket seçer:
     * Basic Wash ($25, 15 dk)
     * Premium Wash ($45, 20 dk)
     * Deluxe Wash ($65, 25 dk)
   
4. Payment (Ödeme)
   - Coin/Token/Card/App ile ödeme yapar
   
5. Service (Hizmet)
   - Bay'e girer
   - Soft-touch veya Touchless otomatik sistem çalışır
   - 15-25 dakika sürer
   
6. Exit (Çıkış)
   - Temiz araç ile ayrılır
   - İsteğe bağlı: Review/feedback
```

#### 🏢 Carwash Admin Perspektifi
```
1. Real-time Monitoring
   - Dashboard'da bay status görünür:
     * Bay 1: In-service (John Smith, Basic Wash, %75 tamamlandı, 5 dk kaldı)
     * Bay 2: Available (Boş, hazır)
     * Bay 3: Maintenance (Bakımda)
   
2. Capacity Planning
   - Saat başına kapasite hesaplama:
     * 4 bay x (60 dk / 20 dk ortalama) = Saat başına 12 servis
   - Utilization rate: %89 (yüksek)
   
3. Transaction Logging
   - Her servis otomatik log edilir:
     * Transaction ID: TXN-2024-001234
     * Bay: Bay 1
     * Service: Basic Wash
     * Duration: 18 dk (gerçek)
     * Payment: Card
     * Revenue: $25
   
4. Analytics
   - Günlük/haftalık/aylık raporlar
   - En çok tercih edilen saatler
   - Peak hours: 9-11 AM, 5-7 PM
```

#### 📊 Capacity Formülü (In-Bay)
```
Saat Başına Kapasite = Bay Sayısı × (60 / Ortalama Servis Süresi)

Örnek:
- 4 bay var
- Ortalama servis: 20 dakika
- Kapasite = 4 × (60/20) = 4 × 3 = 12 servis/saat

Günlük Kapasite (10 saat açık):
= 12 servis/saat × 10 saat = 120 servis/gün
```

---

### 3.2 TUNNEL WASH - Walk-in Journey

#### 🎯 Müşteri Perspektifi
```
1. Arrival
   - Carwash'e gelir
   - Tunnel line'ı kontrol eder
   
2. Queue
   - Konveyör önünde sıra oluşur
   - Bekleme: ~2-5 dakika (çok hızlı throughput)
   
3. Service Selection
   - Paket seçimi:
     * Express ($20, 5 dk)
     * Standard ($30, 7 dk)
     * Ultimate ($50, 10 dk)
   
4. Payment
   - Ödeme yapar
   
5. Service
   - Konveyör bant aracı çeker
   - Tunnel içinde otomatik yıkama (fırçalar, köpük, yıkama, kurutma)
   - 5-10 dakika
   
6. Exit
   - Konveyör sonunda ayrılır
```

#### 🏢 Carwash Admin Perspektifi
```
1. Real-time Tunnel Monitoring
   - Tunnel Line A: 3 araç şu anda içerde
   - Konveyör hızı: 2.5 metre/dakika
   - Tunnel uzunluğu: 25 metre
   - Throughput: Her 2.5 dakikada bir araç
   
2. Capacity Planning
   - Tunnel: Yüksek hacim, düşük süre
   - Saat başına: 60/2.5 = 24 araç
   - 2 tunnel line: 48 araç/saat
   
3. Transaction Logging
   - Yüksek hacim veri:
     * Günlük 300-500 transaction
   
4. Maintenance Tracking
   - Konveyör bakım zamanı
   - Fırça değişim takibi
```

#### 📊 Capacity Formülü (Tunnel)
```
Saat Başına Kapasite = Tunnel Sayısı × (60 / Araç Başına Süre)

Örnek:
- 2 tunnel line
- Araç başına süre: 2.5 dakika
- Kapasite = 2 × (60/2.5) = 2 × 24 = 48 araç/saat

Günlük Kapasite (10 saat):
= 48 × 10 = 480 araç/gün
```

---

### 3.3 SELF-SERVICE - Walk-in Journey

#### 🎯 Müşteri Perspektifi
```
1. Arrival
   - Self-service bay'e gelir
   - Bay durumu kontrol eder
   
2. Payment
   - Pay-per-minute veya flat-rate
   - Kart/token/coin ile başlatır
   
3. Service (DIY)
   - Müşteri kendi yıkar:
     * Basınçlı su tabancası
     * Köpük aplikatörü
     * Vakum
   - Süre: 20-30 dakika (müşteriye bağlı)
   
4. Exit
   - Süre dolunca sistem kapanır
   - Ek süre almak isterse tekrar ödeme yapar
```

#### 🏢 Carwash Admin Perspektifi
```
1. Real-time Bay Status
   - Self-Service Bay 1: Kullanımda (15 dk geçti, $7.50 ödendi)
   - Self-Service Bay 2: Available
   
2. Pricing Model
   - Pay-per-minute: $0.50/dakika
   - Flat-rate: $15 (30 dakika)
   
3. Revenue Tracking
   - Dakika bazlı tracking
   - Peak usage hours
   
4. Capacity Planning
   - Self-service: Müşteri kontrolünde
   - Ortalama süre: 25 dakika
   - 4 bay × (60/25) = 9.6 ≈ 10 servis/saat
```

#### 📊 Capacity Formülü (Self-Service)
```
Müşteri Kontrollü = Değişken Süre

Ortalama Hesaplama:
- 4 self-service bay
- Ortalama süre: 25 dakika
- Kapasite = 4 × (60/25) ≈ 10 servis/saat

Not: Müşteri isterse 1 saat de kalabilir, bu kapasite düşürür
```

---

### 3.4 MANUAL DETAILING - Reservation Journey

#### 🎯 Müşteri Perspektifi (13 Adımlı Lifecycle)

```
STEP 1: Reservation Request (Rezervasyon Talebi)
├─ Müşteri app/web'den talep oluşturur
├─ Hizmet seçer:
│  * Interior Detailing (90 dk, $120)
│  * Full Detail (180 dk, $250)
│  * Paint Correction (240 dk, $400)
├─ Tarih ve saat seçer
├─ Araç bilgileri girer (plaka, marka, model, renk)
├─ Özel istekler yazar (pet hair removal, etc.)
└─ Submit → Status: "requested"

STEP 2: Carwash Review (İşletme İncelemesi)
├─ Admin bildirimi alır
├─ Kapasite kontrol eder:
│  * Detail Station Alpha: 9AM-12PM boş
│  * Detail Station Beta: Rezerve
├─ Detailer availability kontrol eder
└─ Karar verir: Approve / Reject / Suggest Alternative

STEP 3A: Approved (Onaylandı)
├─ Carwash onaylar
├─ Sistem notification gönderir
├─ Status: "reserved"
└─ Confirmation deadline set edilir (4h before)

STEP 3B: Alternative Offered (Alternatif Önerildi)
├─ Carwash farklı zaman önerir:
│  "Requested: Saturday 2PM → Suggested: Saturday 4PM"
├─ İsteğe bağlı: %10 discount campaign ekler
├─ Status: "alternative-offered"
└─ Müşteri 24 saat içinde accept/reject yapmalı

STEP 4: 4-Hour Confirmation Request (4 Saat Öncesi Onay)
├─ Sistem otomatik: 4 saat öncesi notification
├─ "Please confirm your reservation or it will be auto-cancelled"
├─ Müşteri Confirm butonu tıklar
├─ Status: "reserved" → "confirmed"
└─ Artık iptal etmek penalty getirir

STEP 5: Arrival & Check-in (Varış ve Check-in)
├─ Müşteri carwash'e gelir
├─ QR Code gösterir veya plaka OCR ile taranır
├─ Sistem eşleşme yapar:
│  * QR Code: LW2024001234 ✓
│  * Plaka: 34 ABC 123 ✓
├─ Vehicle handover: Müşteri anahtarları teslim eder
└─ Status: "checked-in"

STEP 6: Service Starts (Hizmet Başlar)
├─ Detailer servisi başlatır
├─ Müşteri notification alır: "Your service has started"
├─ Progress tracking başlar:
│  * Step 1/5: Pre-wash inspection ✓
│  * Step 2/5: Exterior wash (in progress)
│  * Step 3/5: Interior vacuuming
│  * Step 4/5: Polish & wax
│  * Step 5/5: Final inspection
└─ Status: "in-progress"

STEP 7: Real-time Updates (Canlı Güncellemeler)
├─ Müşteri app'ten takip eder:
│  * 25% complete (Exterior wash done)
│  * 50% complete (Interior started)
│  * 75% complete (Polishing)
├─ Photo updates (before/after)
└─ Estimated completion time güncellenir

STEP 8: Service Completed (Hizmet Tamamlandı)
├─ Detailer "Complete" butonu tıklar
├─ Final inspection photos yüklenir
├─ Sistem müşteriye notification gönderir:
│  "Your vehicle is ready for pickup!"
└─ Status: "completed"

STEP 9: Customer Pickup (Müşteri Aracını Alır)
├─ Müşteri geri gelir
├─ Vehicle inspection (müşteri kontrol eder)
├─ Memnuniyetsizlik varsa → complaint log
├─ Memnunsa → teslim alır
└─ Status: "picked-up"

STEP 10: Payment Processing (Ödeme İşlemi)
├─ Eğer ön ödemesiz ise:
│  * Kart ile ödeme yapar
│  * Final price: $250
├─ Ön ödemeli ise: Zaten kesilmiş
└─ Receipt email/SMS gönderilir

STEP 11: Review & Feedback (Değerlendirme)
├─ Müşteri 24 saat içinde review yazabilir:
│  * 5-star rating
│  * "Amazing job, car looks brand new!"
├─ Photo share (optional)
└─ Sistem detailer'a rating ekler

STEP 12 (Optional): Cancellation Flow
├─ BEFORE 4h deadline (NO PENALTY):
│  * Müşteri "Cancel Reservation" tıklar
│  * Sistem onaylar: "Free cancellation"
│  * Status: "cancelled"
│  * Refund (eğer ön ödeme yapıldıysa)
│
└─ AFTER 4h deadline (WITH PENALTY):
   * Müşteri cancel isterse
   * Sistem uyarı: "Cancellation fee: $50 (20% of $250)"
   * Müşteri onaylarsa: Status: "cancelled-penalty"
   * Penalty carwash'e kalır

STEP 13 (Optional): No-Show Flow
├─ Müşteri scheduled time'da gelmezse
├─ Carwash 15 dakika bekler
├─ "Mark as No-Show" butonu tıklar
├─ Status: "no-show"
├─ Eğer ön ödeme varsa: Commission carwash'e kalır
└─ Müşteri blacklist risk (çok no-show varsa)
```

#### 🏢 Carwash Admin Perspektifi

```
ADMIN DASHBOARD VIEWS:

1. APPROVAL QUEUE
   ├─ Pending Reservations (3)
   │  * Sarah Johnson - Full Detail - Sat 2PM
   │  * Mike Wilson - Interior - Sun 10AM
   │  * Jane Doe - Paint Correction - Mon 9AM
   │
   ├─ Actions:
   │  [Approve] [Reject] [Suggest Alternative]
   │
   └─ Decision Helpers:
      * Current capacity: 2/3 stations available
      * Detailer skills: Expert needed for paint correction

2. CALENDAR VIEW
   ├─ Timeline (by station):
   │  Detail Station Alpha:
   │    9-12 AM: John Smith (confirmed)
   │    2-5 PM: Available
   │  Detail Station Beta:
   │    10-1 PM: Sarah Lee (in-progress)
   │    3-6 PM: Mike Brown (confirmed)
   │
   └─ Utilization: 75%

3. CHECK-IN INTERFACE
   ├─ Awaiting Check-in (2):
   │  * John Smith - 9:00 AM (on-time)
   │  * Sarah Lee - 10:00 AM (5 min late)
   │
   └─ QR/OCR Scanner:
      [Scan QR Code] [Scan License Plate]

4. IN-PROGRESS TRACKER
   ├─ Sarah Lee - Full Detail:
   │  ├─ Started: 10:05 AM
   │  ├─ Progress: 60% (Step 3/5)
   │  ├─ Estimated end: 1:05 PM
   │  └─ Detailer: Alex Rodriguez
   │
   └─ [Send Update] [Mark Complete]

5. REVENUE & ANALYTICS
   ├─ Today's Manual Detailing:
   │  * Completed: 4 services
   │  * Revenue: $780
   │  * Avg duration: 105 minutes
   │  * Utilization: 82%
   │
   └─ Top detailer: Alex Rodriguez (4.9★, 12 services)
```

#### 📊 Capacity Formülü (Manual Detailing)
```
Capacity = Detail Stations × Shifts × (Shift Hours / Avg Service Time)

Örnek:
- 3 detail stations
- 1 shift (10 saat: 8AM-6PM)
- Ortalama servis: 90 dakika = 1.5 saat

Kapasite = 3 × 1 × (10 / 1.5) = 3 × 6.67 ≈ 20 rezervasyon/gün

Not: Overlapping önleme gerekir
- 9-10:30 AM rezerve ise → 9-11 AM'e yeni rezervasyon alınmaz
- Buffer time: +15 dakika (temizlik, araç transfer)
```

---

### 3.5 MOBILE DETAILING - Reservation Journey (+ GPS Tracking)

#### 🎯 Müşteri Perspektifi

```
STEP 1: Reservation Request (Rezervasyon + Lokasyon)
├─ Müşteri app/web'den talep oluşturur
├─ Service seçer:
│  * Mobile Basic Wash (60 dk, $80)
│  * Mobile Full Detail (120 dk, $180)
│  * Mobile Premium (180 dk, $300)
├─ Lokasyon girer:
│  * Address: "Atatürk Bulvarı 123, Kadıköy, Istanbul"
│  * GPS coordinates: (40.9903, 29.0254)
│  * Special directions: "3rd floor, parking spot B12"
├─ Tarih/saat seçer
├─ Sistem travel fee hesaplar:
│  * Distance from base: 8.5 km
│  * Travel fee: $15
│  * Travel time: 25 minutes
│  * Total: $80 + $15 = $95
└─ Submit → Status: "requested"

STEP 2: Carwash Review
├─ Admin kontrol eder:
│  * Mobile Unit 1: Available
│  * Mobile Unit 2: Booked
│  * Service area check: ✓ (8.5km < 15km max radius)
│  * Travel time feasible: ✓
└─ Approve/Reject

STEP 3: Approved + Worker Assignment
├─ Carwash onaylar
├─ Mobile worker atanır:
│  * Driver: Alex Martinez
│  * Vehicle: Mobile Unit 1 (Ford Transit)
│  * Rating: 4.8★
├─ Status: "reserved"
└─ Müşteri notification: "Assigned to Alex Martinez"

STEP 4: 4-Hour Confirmation
├─ Sistem 4h öncesi reminder
├─ Müşteri confirm eder
└─ Status: "confirmed"

STEP 5: Worker Departure (İşçi Yola Çıkıyor)
├─ Mobile worker carwash base'den ayrılır
├─ Sistem GPS tracking başlatır
├─ Müşteri real-time map görür:
│  * Alex is on the way!
│  * ETA: 25 minutes
│  * Current location: [Live GPS pin]
└─ Worker status: "en-route"

STEP 6: Navigation & Direction
├─ Mobile worker Direction Navigator kullanır:
│  * Google Maps entegrasyonu
│  * Turn-by-turn directions
│  * Real-time traffic updates
├─ Müşteri app'te görür:
│  * "Alex is 5 minutes away"
│  * Live location updates every 30 seconds
└─ Worker status: "en-route"

STEP 7: Arrival & Check-in
├─ Worker lokasyona ulaşır
├─ "Arrived at Location" butonu tıklar
├─ QR code veya plaka ile vehicle match:
│  * Customer shows QR code
│  * Or worker scans plate: 34 ABC 123
├─ Müşteri notification: "Alex has arrived!"
└─ Status: "checked-in" + Worker status: "on-site"

STEP 8: Service Starts (Mobil Hizmet Başlıyor)
├─ Worker servisi başlatır
├─ Progress tracking:
│  * Step 1/4: Setup & inspection ✓
│  * Step 2/4: Exterior wash (in progress)
│  * Step 3/4: Interior cleaning
│  * Step 4/4: Final touches
├─ Müşteri real-time updates alır
└─ Status: "in-progress" + Worker status: "on-site"

STEP 9: Service Completed
├─ Worker "Complete" tıklar
├─ Before/after photos yükler
├─ Müşteri notification: "Service completed!"
└─ Status: "completed"

STEP 10: Customer Inspection & Payment
├─ Müşteri aracı kontrol eder
├─ Memnunsa onaylar
├─ Payment:
│  * Total: $95 ($80 service + $15 travel)
│  * Tip (optional): $10
│  * Final: $105
└─ Status: "picked-up"

STEP 11: Worker Return
├─ Worker base'e dönüş yapar
├─ GPS tracking devam eder
├─ "Returning to base" status
└─ Worker status: "returning"

STEP 12: Review & Feedback
├─ Müşteri review yazar:
│  * "Alex was professional and on-time! Car looks amazing."
│  * 5-star rating
├─ Worker rating güncellenir
└─ System: Tip + review bonusu hesaplanır
```

#### 🏢 Carwash Admin Perspektifi

```
ADMIN MOBILE DASHBOARD:

1. LIVE TRACKING MAP
   ├─ Mobile Unit 1 (Alex Martinez):
   │  ├─ Status: en-route
   │  ├─ Current location: [GPS pin - live]
   │  ├─ Destination: Atatürk Bulvarı 123, Kadıköy
   │  ├─ ETA: 15 minutes
   │  └─ Next: Sarah Lee at 2PM
   │
   ├─ Mobile Unit 2 (Maria Lopez):
   │  ├─ Status: on-site
   │  ├─ Location: Bağdat Caddesi 456
   │  ├─ Progress: 60% (Interior cleaning)
   │  └─ Next: Free after 1PM
   │
   └─ Mobile Unit 3:
      └─ Status: idle (available for booking)

2. TODAY'S MOBILE SCHEDULE
   ├─ Alex Martinez - Mobile Unit 1:
   │  ├─ 9-10 AM: John Smith (Kadıköy) - completed ✓
   │  ├─ 11 AM-1 PM: Sarah Lee (Beşiktaş) - in-progress
   │  ├─ 2-4 PM: Mike Brown (Şişli) - confirmed
   │  └─ 5-6:30 PM: Available
   │
   └─ Maria Lopez - Mobile Unit 2:
      ├─ 10-11:30 AM: Jane Doe (Üsküdar) - completed ✓
      └─ 1-3 PM: Available

3. TRAVEL ANALYTICS
   ├─ Total travel today: 45 km
   ├─ Avg travel fee collected: $12/booking
   ├─ Fuel cost estimate: $8/booking
   ├─ Net travel profit: $4/booking
   └─ Service area utilization map

4. CAPACITY PLANNING (MOBILE)
   ├─ Available mobile units: 3
   ├─ Max service radius: 15 km
   ├─ Avg service time: 90 min
   ├─ Avg travel time (round-trip): 40 min
   ├─ Effective time per booking: 130 min
   │
   └─ Daily capacity calculation:
      * Working hours: 10h (8AM-6PM)
      * Per unit: 10h / 2.17h ≈ 4 bookings/day
      * Total: 3 units × 4 = 12 mobile bookings/day
```

#### 📊 Capacity Formülü (Mobile Detailing)
```
Mobile Capacity = (Units × Working Hours) / (Service Time + Travel Time)

Örnek:
- 3 mobile units
- Working hours: 10 hours/day
- Avg service time: 90 minutes
- Avg round-trip travel: 40 minutes (20 min each way)
- Effective time: 90 + 40 = 130 min = 2.17 hours

Per Unit Capacity:
= 10 hours / 2.17 hours ≈ 4.6 ≈ 4 bookings/day

Total Daily Capacity:
= 3 units × 4 = 12 mobile bookings/day

Özel Constraint:
- Service area radius: 15 km
- Eğer customer 15km+ uzaksa → reject/suggest alternative
- Travel fee: Distance-based pricing (e.g., $1.50/km)
```

#### 🗺️ Mobile-Specific Features

**GPS Tracking System:**
```javascript
// Real-time worker location update
const workerLocation = {
  workerId: "alex-martinez",
  unitId: "mobile-unit-1",
  currentLocation: {
    lat: 40.9903,
    lng: 29.0254,
    accuracy: 10, // meters
    timestamp: "2024-12-11T10:35:22Z"
  },
  status: "en-route",
  destination: {
    address: "Atatürk Bulvarı 123, Kadıköy",
    lat: 40.9995,
    lng: 29.0351
  },
  eta: 15, // minutes
  distanceRemaining: 3.2 // km
};
```

**Service Area Validation:**
```javascript
// Check if customer location is within service radius
function validateServiceArea(baseLocation, customerLocation, maxRadius = 15) {
  const distance = calculateDistance(baseLocation, customerLocation);
  
  if (distance > maxRadius) {
    return {
      valid: false,
      reason: `Location is ${distance}km away, exceeds max radius of ${maxRadius}km`,
      suggestAlternative: "Consider Manual Detailing at our center"
    };
  }
  
  return {
    valid: true,
    distance: distance,
    travelFee: calculateTravelFee(distance),
    estimatedTravelTime: distance * 3 // 3 min per km avg
  };
}
```

---

### 3.6 YENİ MODÜL: PICK-UP & DROP-OFF DETAILING

**Konsept:**
- Müşteriden araç alınır (pickup location)
- Carwash center'da detailing yapılır
- Müşterinin istediği lokasyona teslim edilir (drop-off location)
- Hem reservation-based hem de logistics içerir

#### 🎯 User Journey (Pick-up & Drop-off)

```
STEP 1: Reservation Request (Dual Location)
├─ Müşteri app'ten talep oluşturur
├─ Service seçer: "Pick-up & Drop-off Full Detailing"
├─ İki lokasyon girer:
│  * Pickup: "Office - Levent Plaza, 9 AM"
│  * Drop-off: "Home - Kadıköy Apt 34, 6 PM"
├─ Tarih/saat seçer
├─ Sistem logistics hesaplar:
│  * Pickup distance: 5 km
│  * Drop-off distance: 12 km
│  * Total travel: 17 km
│  * Travel fee: $25
│  * Service: $180
│  * Total: $205
└─ Submit → Status: "requested"

STEP 2: Carwash Approval
├─ Admin kontrol eder:
│  * Detail station available: ✓
│  * Driver available for pickup: ✓
│  * Driver available for drop-off: ✓
│  * Timing feasible: ✓
└─ Approve

STEP 3: Driver Dispatched (Pickup)
├─ Driver 1 assigned: "Will pick up your car at 9 AM"
├─ GPS tracking başlar
├─ Driver müşteri lokasyonuna gider
├─ Status: "pickup-en-route"

STEP 4: Vehicle Pickup
├─ Driver arrives at pickup location
├─ QR/plate verification
├─ Müşteri anahtarları teslim eder
├─ Vehicle inspection (damage photo)
├─ Status: "vehicle-picked-up"

STEP 5: Vehicle Transport to Center
├─ Driver aracı carwash center'a getirir
├─ GPS tracking: "Vehicle on the way to center"
├─ ETA: 20 minutes
├─ Status: "in-transit-to-center"

STEP 6: Arrival at Center + Service Starts
├─ Araç carwash'e ulaşır
├─ Detail station'a alınır
├─ Detailing başlar (180 dk)
├─ Progress tracking:
│  * Exterior wash
│  * Interior deep clean
│  * Polish & wax
├─ Status: "in-progress"

STEP 7: Service Completed
├─ Detailing tamamlanır
├─ Before/after photos
├─ Status: "completed"
├─ Driver 2 dispatched for drop-off

STEP 8: Driver Dispatched (Drop-off)
├─ Driver 2 assigned: "Delivering your car to Kadıköy"
├─ GPS tracking başlar
├─ ETA: 6:00 PM
├─ Status: "dropoff-en-route"

STEP 9: Vehicle Drop-off
├─ Driver müşterinin drop-off location'ına varır
├─ Müşteri aracı kontrol eder
├─ Anahtarlar teslim edilir
├─ Final inspection photos shared
├─ Status: "delivered"

STEP 10: Payment & Review
├─ Payment: $205 ($180 + $25 travel)
├─ Review: "Amazing service, picked up from office, delivered to home!"
└─ Status: "picked-up" (completed)
```

#### 📊 Capacity Impact (Pick-up & Drop-off)
```
Logistics Challenge:
- Detail station capacity etkilenmez (normal manual detailing gibi)
- Ama driver availability kritik:
  * 2 driver needed per booking (pickup + dropoff)
  * Veya 1 driver iki sefer yapar (ama süre uzar)

Timing Formula:
Total Duration = Pickup Travel + Service Time + Dropoff Travel

Örnek:
- Pickup travel: 20 min
- Service time: 180 min
- Dropoff travel: 30 min
- Total: 230 min (3 saat 50 dk)

Driver Capacity:
- 10 saat working day
- 230 min per booking = 3.83 hours
- Max 2-3 pickup/dropoff bookings per driver/day
```

---

## 4. CAPACITY MANAGEMENT: MODÜL BAZLI ANALİZ

### 4.1 Capacity Planning Dashboard (Tüm Modüller)

#### Real-time Capacity Overview
```
┌─────────────────────────────────────────────────────────┐
│  BRANCH: AutoWash Pro - Istanbul Kadıköy                │
│  Today: December 11, 2024 | 10:35 AM                    │
└─────────────────────────────────────────────────────────┘

MODULE UTILIZATION (Real-time)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚗 IN-BAY AUTOMATIC
   └─ Capacity: 4 bays
      ├─ In-service: 2 (Bay 1, Bay 2)
      ├─ Available: 1 (Bay 3)
      ├─ Maintenance: 1 (Bay 4)
      └─ Utilization: 75% (3/4 operational)
   
   Current:
   • Bay 1: John Smith | Basic Wash | 75% done | 5 min left
   • Bay 2: Sarah Lee | Premium | 45% done | 15 min left
   • Bay 3: Available (ready for next customer)
   • Bay 4: Maintenance (back online 2 PM)
   
   Today's Stats:
   • Services completed: 28
   • Avg utilization: 82%
   • Revenue: $840

⚡ TUNNEL WASH
   └─ Capacity: 2 tunnel lines
      ├─ Line A: Active (3 cars inside)
      ├─ Line B: Active (2 cars inside)
      └─ Utilization: 100%
   
   Current:
   • Line A: Throughput 24 cars/hour | 3 cars in process
   • Line B: Throughput 20 cars/hour | 2 cars in process
   
   Today's Stats:
   • Services completed: 142
   • Avg utilization: 95%
   • Revenue: $4,260

🔧 SELF-SERVICE
   └─ Capacity: 4 bays
      ├─ In-use: 2 (Bay 1, Bay 3)
      ├─ Available: 2 (Bay 2, Bay 4)
      └─ Utilization: 50%
   
   Current:
   • Bay 1: 18 min elapsed | $9.00 earned
   • Bay 3: 12 min elapsed | $6.00 earned
   
   Today's Stats:
   • Services: 34
   • Avg duration: 23 min
   • Revenue: $612

👥 MANUAL DETAILING
   └─ Capacity: 3 detail stations
      ├─ In-service: 2 (Alpha, Beta)
      ├─ Available: 1 (Gamma)
      └─ Utilization: 67%
   
   Current:
   • Alpha: Mike Wilson | Full Detail | 60% | 48 min left
   • Beta: Jane Doe | Interior | 30% | 63 min left
   • Gamma: Available (next: 2 PM - Sarah Brown)
   
   Today's Reservations: 8
   • Completed: 3
   • In-progress: 2
   • Scheduled: 3
   • Revenue: $780

🚚 MOBILE DETAILING
   └─ Capacity: 3 mobile units
      ├─ En-route: 1 (Unit 1)
      ├─ On-site: 1 (Unit 2)
      ├─ Available: 1 (Unit 3)
      └─ Utilization: 67%
   
   Current:
   • Unit 1 (Alex): En-route to Beşiktaş | ETA 12 min
   • Unit 2 (Maria): On-site Üsküdar | 45% done
   • Unit 3: Available (next: 2 PM booking)
   
   Today's Bookings: 9
   • Completed: 4
   • In-progress: 1
   • En-route: 1
   • Scheduled: 3
   • Revenue: $1,080
```

---

### 4.2 Hourly Capacity Planning (Per Module)

#### Sample: 10:00 AM - 11:00 AM Slot Analysis
```
TIME SLOT: 10:00 - 11:00 AM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Walk-in Modules (No pre-booking, real-time flow):

IN-BAY (4 bays, 15 min avg)
  ├─ Max capacity this hour: 4 × (60/15) = 16 services
  ├─ Current bookings: 0 (walk-in only)
  ├─ Expected walk-ins: ~12 (based on historical)
  └─ Available capacity: 4 services
  
TUNNEL (2 lines, 2.5 min avg)
  ├─ Max capacity: 2 × (60/2.5) = 48 services
  ├─ Expected walk-ins: ~42
  └─ Available capacity: 6 services

SELF-SERVICE (4 bays, 25 min avg)
  ├─ Max capacity: 4 × (60/25) ≈ 10 services
  ├─ Expected usage: ~7
  └─ Available capacity: 3 services

Reservation Modules (Pre-booked slots):

MANUAL DETAILING (3 stations)
  └─ 10:00-11:00 AM:
      ├─ Station Alpha: BOOKED (Mike Wilson, started 9:00 AM, ends 12:00 PM)
      ├─ Station Beta: BOOKED (Jane Doe, 10:00-11:30 AM)
      └─ Station Gamma: AVAILABLE (can accept 60+ min service)
  
  Available slots this hour:
  ├─ Gamma: 10:00-11:00 (1 hour service max)
  └─ No overlapping with existing bookings

MOBILE DETAILING (3 units)
  └─ 10:00-11:00 AM:
      ├─ Unit 1: BOOKED (Sarah Lee, Beşiktaş, 10:30-12:00)
      ├─ Unit 2: BOOKED (John Doe, Kadıköy, 10:00-11:30)
      └─ Unit 3: AVAILABLE
  
  Available slots:
  └─ Unit 3: Can accept booking if:
      * Pickup location within 15km
      * Service + travel time fits in available window
```

---

### 4.3 Weekly Capacity Heatmap

```
CAPACITY UTILIZATION - WEEK VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

            MON    TUE    WED    THU    FRI    SAT    SUN
IN-BAY      78%    82%    75%    88%    92%    95%    65%
TUNNEL      85%    90%    88%    93%    98%    99%    72%
SELF-SVC    65%    68%    62%    70%    75%    80%    55%
MANUAL      72%    75%    78%    82%    85%    90%    60%
MOBILE      80%    85%    82%    88%    92%    95%    70%

Peak Hours (9-11 AM, 5-7 PM):
├─ In-Bay: 95-100% (near full capacity)
├─ Tunnel: 98-100% (maxed out)
├─ Manual Detailing: 90-95% (high demand)
└─ Mobile: 85-90% (logistics bottleneck)

Low Hours (2-4 PM):
├─ In-Bay: 45-55%
├─ Tunnel: 60-70%
├─ Manual: 50-60%
└─ Mobile: 55-65%

Recommendation:
→ Offer discount campaigns for 2-4 PM slots
→ Consider dynamic pricing (peak vs off-peak)
```

---

### 4.4 Capacity Constraint Handling

#### Scenario 1: Walk-in Module Overflow
```
PROBLEM: All In-Bay bays are full, customer arrives

SOLUTION OPTIONS:
1. Queue Management
   ├─ Show wait time: "~15 minutes"
   ├─ Offer queue number
   └─ Send SMS when bay available

2. Alternative Module Suggestion
   ├─ "In-Bay is full. Try Tunnel Wash?"
   ├─ Show comparison:
   │  * In-Bay: Wait 15 min + 20 min service = 35 min total
   │  * Tunnel: Available now + 7 min service = 7 min total
   └─ Incentive: "Switch to Tunnel, get $5 off!"

3. Reservation Upsell
   └─ "Book Manual Detailing for tomorrow, 20% off!"
```

#### Scenario 2: Reservation Module Double-booking Prevention
```
PROBLEM: Two customers request same time slot

SOLUTION: Slot Locking System
├─ Customer A requests: Saturday 2-4 PM, Manual Detail
├─ System checks: Station Alpha available? YES
├─ System creates "pending" reservation (locks slot for 10 min)
├─ Customer A confirms → Slot permanently booked
│
├─ Customer B requests same slot (while A is pending)
├─ System shows: "2-4 PM not available"
├─ Suggests alternatives:
│  * 4-6 PM (same day)
│  * 2-4 PM Sunday
└─ Or different module: Mobile Detailing
```

#### Scenario 3: Mobile Detailing Service Area Limit
```
PROBLEM: Customer location 25km away (exceeds 15km radius)

SOLUTION:
├─ System rejects: "Location exceeds service area"
├─ Alternatives offered:
│  1. Pick-up & Drop-off Detailing
│     "We can pick up your car, detail at center, deliver back"
│     Cost: $180 service + $35 logistics = $215
│
│  2. Nearby branch suggestion
│     "Our Üsküdar branch is 3km from you"
│     [View Üsküdar availability]
│
│  3. Manual Detailing at center
└─     "Visit our center for $150 (vs $180 mobile)"
```

---

## 5. TAKVIM & REZERVASYON SISTEMI KURGUSU

### 5.1 Calendar Requirements (Business Module'lere Göre)

#### Unified Calendar: İki Ayrı Görünüm Modeli

```
┌─────────────────────────────────────────────────────────┐
│  UNIFIED CALENDAR & BOOKINGS                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                           │
│  [Timeline View] [List View] [Module View]              │
│                                                           │
│  Filters:                                                │
│  Module: [All ▾] Status: [All ▾] Date: [Dec 11, 2024 ▾] │
└─────────────────────────────────────────────────────────┘
```

---

#### VIEW MODE 1: TIMELINE VIEW (Time-slot based)

**Use Case:** Görsel olarak time slot'ları ve reservations'ı görmek

```
TIMELINE VIEW - December 11, 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8:00 AM  ┌────────────────────────────────────────┐
         │ 🚚 Alex Martinez - Mobile Detail        │
         │ ├─ Beşiktaş location                    │
         │ ├─ Status: Completed ✓                  │
         │ └─ Revenue: $120                        │
         └────────────────────────────────────────┘

8:30 AM  (No reservations)

9:00 AM  ┌────────────────────────────────────────┐
         │ 👥 Mike Wilson - Manual Detailing       │
         │ ├─ Detail Station Alpha                 │
         │ ├─ Status: In Progress (60%)            │
         │ ├─ Estimated end: 12:00 PM              │
         │ └─ Detailer: John Smith                 │
         └────────────────────────────────────────┘

9:30 AM  (No reservations)

10:00 AM ┌────────────────────────────────────────┐
         │ 👥 Jane Doe - Interior Detailing        │
         │ ├─ Detail Station Beta                  │
         │ ├─ Status: Checked-in                   │
         │ └─ Start in 5 minutes                   │
         ├────────────────────────────────────────┤
         │ 🚚 Sarah Lee - Mobile Full Detail       │
         │ ├─ Kadıköy location                     │
         │ ├─ Status: En-route (ETA 12 min)        │
         │ └─ Worker: Maria Lopez                  │
         └────────────────────────────────────────┘

...and so on

```

**Key Features:**
- 30-minute time slots (8:00 AM - 8:00 PM)
- Color-coded by business module
- Status indicators (Completed, In-progress, Checked-in, En-route, Pending)
- Click to see details
- Empty slots clearly visible

---

#### VIEW MODE 2: LIST VIEW (Status-grouped)

**Use Case:** Workflow-based görünüm, action'a göre gruplandırma

```
LIST VIEW - December 11, 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────┐
│ 🔔 AWAITING APPROVAL (3)                                │
├─────────────────────────────────────────────────────────┤
│ ┌─ Sarah Johnson - Manual Full Detail                   │
│ │  ├─ Requested: Sat Dec 14, 2 PM                       │
│ │  ├─ Station: Detail Alpha                             │
│ │  ├─ Price: $250                                       │
│ │  └─ [Approve] [Reject] [Suggest Alternative]          │
│ │                                                        │
│ ├─ Mike Brown - Mobile Detailing                        │
│ │  ├─ Requested: Sun Dec 15, 10 AM                      │
│ │  ├─ Location: Şişli (7 km away)                       │
│ │  ├─ Price: $180 + $15 travel = $195                   │
│ │  └─ [Approve] [Reject]                                │
│ │                                                        │
│ └─ Jane Smith - Pick-up & Drop-off                      │
│    ├─ Pickup: Mon 9 AM (Office)                         │
│    ├─ Dropoff: Mon 6 PM (Home)                          │
│    └─ [Approve] [Reject]                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⏰ AWAITING CHECK-IN (2)                                │
├─────────────────────────────────────────────────────────┤
│ ┌─ John Smith - Manual Detailing                        │
│ │  ├─ Scheduled: Today 11:00 AM                         │
│ │  ├─ Status: Confirmed                                 │
│ │  └─ [Check-in with QR] [Check-in with Plate]          │
│ │                                                        │
│ └─ Lisa Brown - Mobile Detailing                        │
│    ├─ Scheduled: Today 2:00 PM                          │
│    ├─ Worker: Alex Martinez                             │
│    └─ [Start Navigation]                                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⚙️ IN PROGRESS (3)                                      │
├─────────────────────────────────────────────────────────┤
│ ┌─ Mike Wilson - Manual Full Detail                     │
│ │  ├─ Station: Alpha                                    │
│ │  ├─ Started: 9:00 AM                                  │
│ │  ├─ Progress: ▓▓▓▓▓▓▓▓▓░░░░░░░ 60%                    │
│ │  ├─ Estimated completion: 12:00 PM                    │
│ │  └─ [View Progress] [Send Update] [Mark Complete]     │
│ │                                                        │
│ ├─ Sarah Lee - Mobile Detailing                         │
│ │  ├─ Location: Kadıköy                                 │
│ │  ├─ Worker: Maria Lopez (On-site)                     │
│ │  ├─ Progress: ▓▓▓▓▓▓░░░░░░░░░░ 45%                    │
│ │  └─ [View Live Location] [Mark Complete]              │
│ │                                                        │
│ └─ Jane Doe - Manual Interior                           │
│    ├─ Station: Beta                                     │
│    ├─ Progress: ▓▓▓░░░░░░░░░░░░░ 30%                    │
│    └─ [View Progress]                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ✅ COMPLETED TODAY (12)                                 │
├─────────────────────────────────────────────────────────┤
│ ┌─ Alex Martinez - Mobile Basic (8:00 AM)               │
│ │  └─ Revenue: $120 | Rating: 5★                        │
│ │                                                        │
│ ├─ Tom Wilson - Manual Detail (7:30 AM)                 │
│ │  └─ Revenue: $180 | Rating: 4.5★                      │
│ │                                                        │
│ └─ ... (10 more)                                        │
└─────────────────────────────────────────────────────────┘
```

**Key Features:**
- Grouping by status (Awaiting Approval, Check-in, In-progress, Completed)
- Action buttons relevant to each status
- Progress bars for in-progress services
- Revenue and rating summary
- Click for detailed view

---

#### VIEW MODE 3: MODULE VIEW (Business Module Grouping)

**Use Case:** Modül bazlı performans ve reservations

```
MODULE VIEW - December 11, 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────────────────┐
│ 🚗 IN-BAY AUTOMATIC                                     │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ Walk-in only | No reservations to display              │
│                                                          │
│ Today's Activity:                                       │
│ ├─ Services: 28                                         │
│ ├─ Utilization: 82%                                     │
│ └─ Revenue: $840                                        │
│                                                          │
│ [View Real-time Bay Status]                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⚡ TUNNEL WASH                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ Walk-in only | No reservations to display              │
│                                                          │
│ Today's Activity:                                       │
│ ├─ Services: 142                                        │
│ ├─ Utilization: 95%                                     │
│ └─ Revenue: $4,260                                      │
│                                                          │
│ [View Real-time Tunnel Status]                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🔧 SELF-SERVICE                                         │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ Walk-in only | No reservations to display              │
│                                                          │
│ Today's Activity:                                       │
│ ├─ Services: 34                                         │
│ ├─ Utilization: 72%                                     │
│ └─ Revenue: $612                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 👥 MANUAL DETAILING (Reservation-based)                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ Today: 8 reservations | 3 Completed | 2 In-progress    │
│                                                          │
│ Stations:                                               │
│ ├─ Alpha: Mike Wilson (In-progress, 60%)               │
│ ├─ Beta: Jane Doe (Checked-in)                         │
│ └─ Gamma: Available (Next: 2 PM)                       │
│                                                          │
│ Upcoming:                                               │
│ ├─ 2:00 PM - Sarah Brown - Full Detail                 │
│ ├─ 4:00 PM - Tom Lee - Interior                        │
│ └─ 5:30 PM - Lisa White - Paint Correction             │
│                                                          │
│ Revenue: $780 | Utilization: 85%                        │
│ [View All Reservations]                                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🚚 MOBILE DETAILING (Reservation-based)                 │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ Today: 9 bookings | 4 Completed | 1 In-progress        │
│                                                          │
│ Mobile Units:                                           │
│ ├─ Unit 1 (Alex): Beşiktaş, En-route, ETA 12 min       │
│ ├─ Unit 2 (Maria): Kadıköy, On-site, 45% done          │
│ └─ Unit 3: Available (Next: 2 PM)                      │
│                                                          │
│ Upcoming:                                               │
│ ├─ 2:00 PM - Mike Brown - Şişli location               │
│ ├─ 4:00 PM - Sarah Johnson - Üsküdar                   │
│ └─ 6:00 PM - John Doe - Beşiktaş                       │
│                                                          │
│ Revenue: $1,080 | Avg travel: 6.5 km                    │
│ [View Live Map] [View All Bookings]                     │
└─────────────────────────────────────────────────────────┘
```

**Key Features:**
- Walk-in modules: Summary stats only (no reservation list)
- Reservation modules: Full booking list + status
- Module-specific KPIs
- Quick actions per module
- Visual separation

---

### 5.2 Calendar Component Structure (Technical)

#### Component Hierarchy
```
<UnifiedCalendarBookings>
│
├─ <CalendarHeader>
│  ├─ Date picker
│  ├─ View mode toggle (Timeline/List/Module)
│  └─ Filters (Module, Status, Search)
│
├─ <StatsOverview>
│  ├─ Total reservations today
│  ├─ Pending approval
│  ├─ In-progress
│  ├─ Completed
│  └─ Today's revenue
│
├─ {viewMode === "timeline" && (
│   <TimelineView>
│     ├─ <TimeSlotGrid>
│     │  ├─ Time slot rows (8:00-20:00, 30min intervals)
│     │  └─ For each slot:
│     │     ├─ <ReservationCard> (if booking exists)
│     │     └─ Empty slot indicator
│     │
│     └─ Features:
│        ├─ Color-coded by module
│        ├─ Status badges
│        ├─ Click for details
│        └─ Drag-to-reschedule (future enhancement)
│   </TimelineView>
│  )}
│
├─ {viewMode === "list" && (
│   <ListView>
│     ├─ <StatusGroup status="pending-approval">
│     │  ├─ <ApprovalDashboard>
│     │  │  └─ Pending reservations with [Approve][Reject] buttons
│     │  └─ </ApprovalDashboard>
│     │
│     ├─ <StatusGroup status="awaiting-checkin">
│     │  ├─ <CheckInInterface>
│     │  │  ├─ QR scanner
│     │  │  └─ Plate OCR
│     │  └─ </CheckInInterface>
│     │
│     ├─ <StatusGroup status="in-progress">
│     │  ├─ <ServiceProgressTracker>
│     │  │  ├─ Progress bars
│     │  │  └─ Live updates
│     │  └─ </ServiceProgressTracker>
│     │
│     └─ <StatusGroup status="completed">
│        └─ Completed reservations list
│   </ListView>
│  )}
│
└─ {viewMode === "module" && (
    <ModuleView>
      ├─ <ModuleCard module="in_bay">
      │  └─ Walk-in stats only
      │
      ├─ <ModuleCard module="tunnel">
      │  └─ Walk-in stats only
      │
      ├─ <ModuleCard module="self_service">
      │  └─ Walk-in stats only
      │
      ├─ <ModuleCard module="manual_detailing">
      │  ├─ Reservation list
      │  ├─ Station status
      │  └─ Upcoming bookings
      │
      └─ <ModuleCard module="mobile">
         ├─ Reservation list
         ├─ Live map with GPS pins
         └─ Upcoming bookings
    </ModuleView>
   )}

```

---

### 5.3 Walk-in vs Reservation Calendar Integration

#### Problem: İki Farklı Operasyon Modeli, Bir Calendar

**Challenge:**
- Walk-in modules (In-Bay, Tunnel, Self-Service) → Real-time transactions, no pre-booking
- Reservation modules (Manual, Mobile) → Pre-booked slots, approval workflow

**Solution: Hybrid Calendar Approach**

```javascript
// Unified data structure
interface CalendarEntry {
  type: "reservation" | "walk-in-transaction";
  
  // Common fields
  id: string;
  businessModule: BusinessModule;
  scheduledDate: string;
  scheduledStartTime: string;
  status: string;
  
  // Reservation-specific (only if type === "reservation")
  reservation?: Reservation;
  
  // Walk-in specific (only if type === "walk-in-transaction")
  transaction?: WalkInTransaction;
}
```

**Timeline View Rendering:**
```typescript
// Timeline View: Show both reservations and active walk-ins

function renderTimeSlot(slot: string, entries: CalendarEntry[]) {
  // Filter entries for this time slot
  const slotEntries = entries.filter(entry => {
    if (entry.type === "reservation") {
      return entry.scheduledStartTime === slot;
    } else {
      // Walk-in: Show if currently active at this time
      return isActiveAtTime(entry.transaction, slot);
    }
  });
  
  return (
    <TimeSlot time={slot}>
      {slotEntries.map(entry => (
        <EntryCard 
          key={entry.id}
          type={entry.type}
          data={entry.type === "reservation" ? entry.reservation : entry.transaction}
        />
      ))}
    </TimeSlot>
  );
}
```

**Module View Rendering:**
```typescript
// Module View: Separate walk-in stats from reservations

function renderModuleCard(module: BusinessModule) {
  const config = getModuleConfig(module);
  
  if (config.operationModel === "walk-in") {
    return (
      <WalkInModuleCard module={module}>
        <TransactionStats />
        <RealTimeBayStatus />
        {/* No reservation list */}
      </WalkInModuleCard>
    );
  } else {
    return (
      <ReservationModuleCard module={module}>
        <ReservationList />
        <StationStatus />
        <UpcomingBookings />
      </ReservationModuleCard>
    );
  }
}
```

---

## 6. ÖNERILER & SONUÇ

### 6.1 Calendar Kurgusu Önerileri

#### ✅ Önerilen Yaklaşım: HYBRID UNIFIED CALENDAR

**Mantık:**
1. **Single entry point:** Tek bir calendar sayfası tüm modülleri gösterir
2. **Akıllı filtreleme:** Walk-in/Reservation toggle ile görünüm ayrıştırılır
3. **Context-aware UI:** Her modülün operasyon modeline göre uygun UI gösterilir

**UI Flow:**
```
┌─────────────────────────────────────────────────────────┐
│  CALENDAR & BOOKINGS                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                          │
│  Operation Mode: [All ▾] [Walk-in] [Reservation]        │
│  Business Module: [All ▾] [In-Bay] [Tunnel] ...         │
│                                                          │
│  [Timeline] [List] [Module]                             │
└─────────────────────────────────────────────────────────┘

If "Walk-in" selected:
  → Show In-Bay, Tunnel, Self-Service
  → Timeline: Real-time bay status + transaction history
  → No approval dashboard (not applicable)

If "Reservation" selected:
  → Show Manual Detailing, Mobile Detailing
  → Timeline: Time slots with reservation cards
  → Show approval dashboard, check-in interface, progress tracker

If "All" selected:
  → Show everything
  → Walk-in modules: Transaction summary cards
  → Reservation modules: Full reservation workflow
```

---

### 6.2 Capacity Management Dashboard Önerileri

#### Real-time Capacity Overview (Ana Sayfa Widget)
```
┌─────────────────────────────────────────────────────────┐
│  CAPACITY SNAPSHOT - AutoWash Pro Kadıköy              │
│  As of: 10:35 AM, Dec 11, 2024                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🚗 In-Bay: ████████░░ 75% (3/4 bays)                   │
│  ⚡ Tunnel: ██████████ 100% (2/2 lines)                 │
│  🔧 Self-Service: █████░░░░░ 50% (2/4 bays)             │
│  👥 Manual: ███████░░░ 67% (2/3 stations)               │
│  🚚 Mobile: ███████░░░ 67% (2/3 units)                  │
│                                                          │
│  Overall Utilization: 72%                               │
│  [View Detailed Capacity Planning →]                    │
└─────────────────────────────────────────────────────────┘
```

#### Hourly Capacity Planning Tool
```
Purpose: Carwash owner'ın gelecek slot'ları planlayabilmesi

Features:
├─ Hour-by-hour capacity chart
├─ Color-coded utilization (green: <60%, yellow: 60-80%, red: >80%)
├─ Predictive analytics: "Based on historical data, 5-7 PM will be 95% full"
├─ Recommendation engine: "Consider adding 1 more bay for Friday evenings"
└─ Dynamic pricing suggestion: "Offer 20% discount for 2-4 PM slots to balance load"
```

---

### 6.3 Implementation Checklist (Faz Bazlı)

#### 🎯 FAZ 1: TEMEL CALENDAR (COMPLETED ✓)
- [x] UnifiedCalendarBookings component
- [x] Timeline, List, Module views
- [x] ApprovalDashboard
- [x] CheckInInterface
- [x] ServiceProgressTracker
- [x] Reservation status flow
- [x] Business module types definition

#### 🎯 FAZ 2: WALK-IN ENTEGRASYONu (ŞİMDİKİ GÖREV)
- [ ] Walk-in transaction type definition
- [ ] Real-time bay/tunnel/self-service status tracking
- [ ] Walk-in transaction logging
- [ ] Hybrid calendar rendering (walk-in + reservation)
- [ ] Transaction history view
- [ ] Walk-in revenue tracking

#### 🎯 FAZ 3: CAPACITY MANAGEMENT (SONRAKİ ADIM)
- [ ] Capacity formulas implementation per module
- [ ] Real-time utilization calculator
- [ ] Hourly capacity planning tool
- [ ] Weekly capacity heatmap
- [ ] Constraint handling (overflow, double-booking prevention)
- [ ] Alternative module suggestion engine
- [ ] Dynamic pricing recommendation

#### 🎯 FAZ 4: MOBILE DETAILING GPS (GELİŞMİŞ)
- [ ] GPS tracking integration
- [ ] Live map view with worker pins
- [ ] Direction Navigator component
- [ ] Service area validation
- [ ] Travel fee calculator
- [ ] ETA estimation
- [ ] Real-time location updates

#### 🎯 FAZ 5: PICK-UP & DROP-OFF (YENİ MODÜL)
- [ ] Dual-location pickup/dropoff flow
- [ ] Driver assignment system
- [ ] Vehicle handover/return tracking
- [ ] In-transit-to-center status
- [ ] Logistics cost calculator
- [ ] Two-driver coordination

#### 🎯 FAZ 6: ANALYTİCS & REPORTING
- [ ] Module performance dashboard
- [ ] Revenue breakdown by module
- [ ] Utilization trends
- [ ] Peak hours analysis
- [ ] Customer satisfaction metrics
- [ ] Predictive capacity forecasting

---

### 6.4 Sonuç: Takvim Kurgusunda Netleşenler

**✅ Anlaşılan Konular:**

1. **Walk-in modüller rezervasyon gerektirmez**
   - In-Bay, Tunnel, Self-Service → Transaction-based
   - Calendar'da sadece real-time status ve history gösterilmeli
   - Approval workflow yok

2. **Reservation modüller approval workflow gerektirir**
   - Manual Detailing, Mobile Detailing → Reservation-based
   - 13 adımlı lifecycle (request → approval → check-in → service → pickup)
   - Calendar'da slot-based booking gösterilmeli

3. **Capacity management modüle göre farklı**
   - In-Bay: Bay sayısı × (60 / avg service time)
   - Tunnel: Yüksek throughput, düşük süre
   - Manual: Station capacity + overlapping prevention
   - Mobile: Unit capacity + travel time + service area radius

4. **Calendar'ın 3 view mode'u farklı amaçlara hizmet eder**
   - Timeline: Time-based görünüm, slot planning
   - List: Status-based görünüm, workflow management
   - Module: Business module performance tracking

**❓ Netleştirilmesi Gereken Sorular:**

1. **Walk-in modules'lar calendar'da nasıl görünecek?**
   - Sadece transaction history mi?
   - Real-time bay status cards mı?
   - Ayrı bir "Real-time Operations" sayfasına mı alınmalı?

2. **Timeline view'da walk-in + reservation nasıl birleşecek?**
   - Aynı slot'ta her ikisi de gösterilecek mi?
   - Farklı renk/style ile mi ayrılacak?

3. **Capacity planning hangi sayfada duracak?**
   - Calendar içinde bir tab olarak mı?
   - Ayrı bir "Capacity Management" sayfası mı?
   - Dashboard'da widget olarak mı?

4. **Modern UX Demo'da ne gösterilecek?**
   - Tüm modüller mi (walk-in + reservation)?
   - Sadece reservation-based modüller mi?
   - Mock data ile full demo mu?

---

**Sıradaki Adım:** Kullanıcıdan bu net konulara göre karar almak ve calendar'ı buna göre kurmak.

