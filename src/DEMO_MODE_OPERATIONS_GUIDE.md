# Real-Time Operations Center - Demo Mode Guide

## 🎮 Demo Mode Nedir?

Real-Time Operations Center Demo Mode, Letwash platformunun canlı operasyon yönetim yeteneklerini gerçek zamanlı simülasyonlarla sergileyen interaktif bir gösterim modudur.

## ✨ Özellikler

### 1. **Auto-Play Simulation**
- Otomatik müşteri akışı simülasyonu
- Gerçek zamanlı durum güncellemeleri
- Dinamik kuyruk yönetimi
- Servis başlangıç ve tamamlanma bildirimleri

### 2. **AI Campaign Suggestions**
- Gerçek zamanlı AI destekli kampanya önerileri
- Impact (Etki) seviyelerine göre kategorize edilmiş öneriler (High/Medium/Low)
- Tahmini gelir artışı göstergeleri
- Hızlı uygulama süre tahminleri
- Business module bazlı hedefleme

### 3. **Multi-Module Tracking**
Demo mode 5 farklı iş modülünü destekler:
- 🚗 **In-Bay Automatic** - Otomatik kapalı alan yıkama
- ⚡ **Tunnel Wash** - Tünel tipi yıkama sistemleri
- 👥 **Manual Detailing** - Manuel detaylı temizlik
- 🚚 **Mobile Detailing** - Mobil servis hizmetleri
- 🔧 **Self-Service** - Self-servis istasyonları

### 4. **Calendar Integration**
- Takvim bazlı randevu görüntüleme
- Tarih seçimi ve günlük program görünümü
- Module bazlı filtreleme

### 5. **Real-Time Analytics**
- Günlük gelir takibi
- Kapasite kullanım oranları
- Müşteri memnuniyet skorları
- Trend göstergeleri

## 🚀 Nasıl Kullanılır?

### Demo Mode'u Aktifleştirme

1. **Login** olun (Carwash Owner rolü ile)
2. Sol menüden **Operations → Live Operations** sayfasına gidin
3. Sidebar'ın alt kısmında **"Enable Demo Mode"** butonuna tıklayın
4. Demo mode aktif olduğunda buton **"Exit Demo Mode"** olarak değişir

### Demo Settings Yapılandırması

Demo Mode aktifken sağ üstteki **Settings (⚙️)** butonuna tıklayarak:

- **Auto-play simulation**: Otomatik simülasyonu aç/kapat
- **Show AI insights**: AI kampanya önerilerini göster/gizle
- **Enable notifications**: Durum değişikliği bildirimlerini aç/kapat
- **Update interval**: Simülasyon hızını ayarla (3-15 saniye arası)

### Demo Kontrolleri

- **⏸️ Pause Demo**: Demo simülasyonunu duraklat
- **▶️ Resume Demo**: Duraklatılan demoyu devam ettir
- **🔄 Refresh**: Demo verisini yeniden oluştur

## 📊 Dashboard Bileşenleri

### AI Campaign Suggestions Kartları

Her öneri kartı şunları içerir:
- **Başlık**: Kampanya adı
- **Açıklama**: Detaylı kampanya stratejisi
- **Impact Badge**: Etki seviyesi (High/Medium/Low)
- **Estimated Revenue**: Tahmini aylık gelir artışı
- **Implementation Time**: Uygulama süresi
- **Target Module**: Hedef iş modülü

### Module Overview Cards

Her modül için:
- **Active**: Şu anda serviste olan müşteri sayısı
- **Queue**: Bekleyen müşteri sayısı
- **Avg Wait**: Ortalama bekleme süresi (dakika)

Kartlara tıklayarak o modüle özel filtreleme yapabilirsiniz.

### Live Queue Views

#### 🟢 Active Services (In-Service)
- Şu anda serviste olan müşteriler
- Real-time servis ilerleme çubuğu
- Geçen süre / Tahmini süre göstergesi
- Atanan bay/station bilgisi

#### 🟠 Waiting Queue
- Sıradaki müşteriler (pozisyon bazlı)
- Bekleme süreleri
- Müşteri bilgileri (araç, plaka, telefon)
- Seçilen servis ve tahmini süre

### Calendar View

- Tarih seçici (Calendar picker)
- Seçilen gün için randevu listesi
- Saat bazlı görünüm
- Module filtresi

### Analytics Tab

3 temel metrik kartı:
1. **Today's Revenue**: Günlük gelir ve önceki güne göre artış
2. **Capacity Utilization**: Kapasite kullanım oranı ve görsel gösterge
3. **Customer Satisfaction**: Müşteri memnuniyeti skoru ve yorum sayısı

## 🎨 Responsive Tasarım

### Desktop (lg+)
- Tam genişlik dashboard
- 5 sütunlu modül kartları
- 2 sütunlu AI kampanya kartları
- Detaylı müşteri bilgi satırları

### Tablet (md)
- 3 sütunlu modül kartları
- 2 sütunlu AI kampanya kartları
- Responsive tablo görünümleri

### Mobile
- Tek sütun layout
- Dikey kartlar
- Touch-friendly butonlar
- Kompakt bilgi gösterimi
- 3 tab'lı ana navigasyon

## 🔔 Bildirim Sistemi

Demo mode aktifken şu bildirimleri alırsınız:
- ✅ Müşteri servise başladı
- ✅ Servis tamamlandı
- ✅ Yeni müşteri kuyruğa eklendi
- ⚠️ Demo data yenilendi

## 💡 Demo Mode Best Practices

1. **İlk Kullanım**: Demo'yu 5 saniye interval ile başlatın
2. **Hızlı Test**: 3 saniye interval ile hızlı değişiklikleri gözlemleyin
3. **Yavaş İnceleme**: 15 saniye interval ile detaylı analiz yapın
4. **AI Öneriler**: Kampanya kartlarının impact seviyelerine odaklanın
5. **Modül Karşılaştırma**: Her modülü teker teker filtrele ve performansları karşılaştır

## 🎯 Demo Scenarios

### Senaryo 1: Peak Hour Management
- Auto-play açık, 5 saniye interval
- Tüm modülleri izle (All Modules)
- Waiting queue vs Active services dengesini gözlemle
- AI kampanya önerilerinden "Rush Hour" stratejilerini incele

### Senaryo 2: Single Module Deep Dive
- Bir modül seç (örn: In-Bay)
- O modülün metriklerini yakından takip et
- Module-specific AI önerilerini değerlendir
- Calendar view ile günlük planlama yap

### Senaryo 3: AI Strategy Planning
- AI Insights'ı aktif tut
- Tüm kampanya önerilerini incele
- High Impact önerileri önceliklendir
- Implementation time ve estimated revenue'yu karşılaştır

## 🔧 Teknik Detaylar

### Simülasyon Mekanizması
- Her interval'de random müşteri durum güncellemesi
- %30 ihtimalle "waiting" → "in-service"
- %20 ihtimalle "in-service" → "completed"
- %40 ihtimalle yeni müşteri ekleme (completed sonrası)

### Veri Yapısı
```typescript
interface Customer {
  id: string;
  name: string;
  phone: string;
  carModel: string;
  licensePlate: string;
  service: string;
  status: "waiting" | "checked-in" | "in-service" | "completed";
  checkInTime: Date;
  estimatedDuration: number;
  startTime?: Date;
  position: number | null;
  customerType: "walk-in" | "appointment";
  bay: string | null;
  businessModule: BusinessModule;
}
```

### AI Campaign Yapısı
```typescript
interface AICampaignSuggestion {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  targetModule: BusinessModule | "all";
  estimatedRevenue: string;
  implementationTime: string;
  icon: any;
  color: string;
}
```

## 📈 Metrikler ve KPI'lar

Demo mode şu metrikleri izler:
- **Total Active Sessions**: Toplam aktif müşteri sayısı
- **In Service**: Serviste olan müşteriler
- **Waiting**: Bekleyen müşteriler
- **Average Wait Time**: Ortalama bekleme süresi
- **Module-Specific Metrics**: Her modül için özel metrikler
- **Last Update Time**: Son güncelleme zamanı

## 🎪 Demo Mode vs Production

| Özellik | Demo Mode | Production |
|---------|-----------|------------|
| Veri Kaynağı | Simülasyon | Gerçek DB |
| Güncelleme | Interval bazlı | WebSocket |
| Bildirimler | Toast mesajları | Multi-channel |
| Müşteri Ekleme | Otomatik | Manuel + API |
| Analytics | Mock data | Real-time DB queries |
| AI Suggestions | Static öneriler | Dynamic ML modeli |

## 🚨 Troubleshooting

### Demo Çalışmıyor
- Auto-play aktif mi kontrol edin
- Sayfayı yenileyin (F5)
- Demo Mode'u kapat/aç yapın

### Bildirimler Gelmiyor
- Settings'ten "Enable notifications" aktif mi?
- Browser bildirimleri engellenmiş olabilir

### Yavaş Performans
- Update interval'i artırın (10-15 saniye)
- Tarayıcı konsolunu kontrol edin
- Gereksiz browser tab'lerini kapatın

## 📚 İlgili Dökümanlar

- [AI Integration Strategy](./docs/AI_INTEGRATION_STRATEGY.md)
- [Business Modules Analysis](./docs/BUSINESS_MODULES_ANALYSIS.md)
- [Capacity Management Design](./docs/CAPACITY_MANAGEMENT_DESIGN.md)
- [Modern UX Architecture](./MODERN_UX_ARCHITECTURE.md)

## 🎓 Learning Path

1. **Başlangıç**: Demo Mode'u aktifleştir ve auto-play ile izle
2. **Keşif**: Her tab'ı (Live/Calendar/Analytics) incele
3. **Modül Analizi**: Her iş modülünü ayrı ayrı filtrele
4. **AI Stratejileri**: Kampanya önerilerini detaylı oku
5. **Settings**: Farklı interval ve ayarları dene
6. **Production Karşılaştırma**: Demo ile gerçek sistem arasındaki farkları anla

---

**Not**: Demo Mode sadece gösterim amaçlıdır. Gerçek production ortamında WebSocket ve database entegrasyonları kullanılmalıdır.
