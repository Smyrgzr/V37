# 🚀 GITHUB'A PUSH - 3 ADIM

## ADIM 1: GitHub'da Repository Oluştur

1. https://github.com/new 'e git
2. Repository name: **letwash** (veya istediğin isim)
3. **Public** seç
4. **ÖNEMLİ:** Hiçbir checkbox işaretleme!
5. **"Create repository"** tıkla
6. Açılan sayfayı kapat

---

## ADIM 2: Terminal Aç

- **Windows:** Başlat menüsünde "cmd" yaz, Enter
- **Mac:** Spotlight'ta (Cmd+Space) "terminal" yaz, Enter

---

## ADIM 3: Aşağıdaki Komutları Kopyala-Yapıştır

Terminal'de proje klasörüne git (örnek):
```bash
cd Desktop/letwash
```

Sonra aşağıdaki komutları **TEK TEK** kopyala yapıştır:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit: Letwash platform"
```

```bash
git branch -M main
```

**ÖNEMLİ:** Bu komutu KENDİ KULLANICI ADIN ile değiştir:
```bash
git remote add origin https://github.com/KULLANICI_ADIN/letwash.git
```

Örnek: Kullanıcı adın `ahmet123` ise:
```bash
git remote add origin https://github.com/ahmet123/letwash.git
```

Son komut:
```bash
git push -u origin main
```

GitHub kullanıcı adı ve şifre soracak, gir.

---

## ✅ BITTI!

GitHub'da repository'ne git, dosyaların orada olmalı!

---

## Hata Alırsan:

**"git: command not found"** → Git kurulu değil:
- Windows: https://git-scm.com/download/win indir, kur
- Mac: Terminal'de `xcode-select --install` yaz

**"Permission denied"** → Token lazım:
1. https://github.com/settings/tokens
2. "Generate new token (classic)"
3. `repo` işaretle
4. Token'ı kopyala
5. Push ederken password yerine token'ı yapıştır
