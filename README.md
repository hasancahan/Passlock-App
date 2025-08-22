# HD Passlock - Güvenli Şifre Yöneticisi

HD Passlock, Windows masaüstünde çalışan güvenli ve kullanıcı dostu bir şifre yöneticisi uygulamasıdır. Electron.js ve SQLite kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Güvenli Kimlik Doğrulama**: Ana şifre ile giriş sistemi
- **Şifre Şifreleme**: AES-256 şifreleme ile güvenli veri saklama
- **Kategori Sistemi**: Şifreleri kategorilere göre organize etme
- **Arama Fonksiyonu**: Hızlı şifre arama
- **Şifre Oluşturucu**: Güçlü rastgele şifre oluşturma
- **Panoya Kopyalama**: Kullanıcı adı ve şifreleri kolayca kopyalama
- **Responsive Tasarım**: Modern ve kullanıcı dostu arayüz
- **Veritabanı**: SQLite ile yerel veri saklama

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Windows 10/11

## 🛠️ Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd HD Passlock
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Çalıştırın
```bash
npm start
```

### 4. Geliştirme Modunda Çalıştırın
```bash
npm run dev
```

## 🏗️ Proje Yapısı

```
HD Passlock/
├── main.js                 # Ana Electron süreci
├── preload.js             # Preload script
├── package.json           # Proje bağımlılıkları
├── database/
│   └── database.js        # Veritabanı işlemleri
├── renderer/
│   ├── index.html         # Ana HTML dosyası
│   ├── styles.css         # CSS stilleri
│   └── script.js          # Frontend JavaScript
└── README.md              # Bu dosya
```

## 🔐 Güvenlik Özellikleri

- **Ana Şifre**: bcrypt ile hash'lenen güçlü ana şifre
- **Şifreleme**: AES-256 şifreleme algoritması
- **Yerel Saklama**: Veriler sadece yerel bilgisayarda saklanır
- **Otomatik Kilitleme**: Uygulama kapatıldığında otomatik güvenlik
- **Geliştirici Ana Şifresi**: Ana şifre unutulduğunda kurtarma sistemi

## 💡 Kullanım

### İlk Kullanım
1. Uygulamayı ilk kez açtığınızda ana şifrenizi belirleyin
2. Bu şifre tüm verilerinizi koruyacak ana anahtardır
3. Ana şifrenizi güvenli bir yerde saklayın

### Ana Şifre Unutulduğunda
1. Login sayfasında "Geliştirici Erişimi" butonuna tıklayın
2. Geliştirici ana şifresini girin: `HD_Passlock_Developer_2025`
3. "Ana Şifre Sıfırlama" ekranında yeni ana şifrenizi belirleyin
4. Yeni ana şifrenizi güvenli bir yerde saklayın

**⚠️ Önemli**: Geliştirici ana şifresi sadece acil durumlar için kullanılmalıdır. Normal kullanımda ana şifrenizi kullanın.

### Şifre Ekleme
1. "Yeni Şifre" butonuna tıklayın
2. Gerekli bilgileri doldurun (başlık ve şifre zorunlu)
3. İsteğe bağlı olarak kategori, URL ve notlar ekleyin
4. "Kaydet" butonuna tıklayın

### Şifre Yönetimi
- **Görüntüleme**: Göz ikonuna tıklayarak şifre detaylarını görün
- **Düzenleme**: Kalem ikonuna tıklayarak şifreyi düzenleyin
- **Silme**: Detay görünümünde "Sil" butonunu kullanın
- **Kopyalama**: Kopyala ikonuna tıklayarak bilgileri panoya kopyalayın

### Kategoriler
- Şifreleri kategorilere göre filtreleyin
- Sol menüden kategori seçin
- "Tümü" seçeneği ile tüm şifreleri görün

### Arama
- Üst menüdeki arama kutusunu kullanın
- Başlık, kullanıcı adı, notlar veya kategoriye göre arama yapın

## 🚀 Build ve Dağıtım

### Windows Executable Oluşturma
```bash
npm run build
```

### Paket Oluşturma
```bash
npm run pack
```

### Dağıtım Paketi Oluşturma
```bash
npm run dist
```

## 🔧 Geliştirme

### Kod Yapısı
- **main.js**: Electron ana süreci ve IPC handlers
- **database.js**: SQLite veritabanı işlemleri ve şifreleme
- **script.js**: Frontend mantığı ve UI etkileşimleri
- **styles.css**: Responsive CSS tasarımı

### Veritabanı Şeması
- `master_password`: Ana şifre hash'i
- `passwords`: Şifre verileri (şifrelenmiş)
- `categories`: Kategori bilgileri

### Güvenlik Notları
- Tüm şifreler AES-256 ile şifrelenir
- Ana şifre bcrypt ile hash'lenir
- Veriler sadece yerel olarak saklanır
- Şifreler asla düz metin olarak kaydedilmez

## 🐛 Sorun Giderme

### Yaygın Sorunlar

**Uygulama açılmıyor:**
- Node.js sürümünü kontrol edin (v16+)
- `npm install` komutunu tekrar çalıştırın
- Hata mesajlarını kontrol edin

**Veritabanı hatası:**
- Uygulama verilerini silin ve yeniden başlatın
- Ana şifrenizi tekrar girin

**Performans sorunları:**
- Çok fazla şifre varsa arama yaparken yavaşlayabilir
- Kategorilere göre filtreleme kullanın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız:
- GitHub Issues bölümünde sorun bildirin
- Detaylı hata mesajları ekleyin
- Sistem bilgilerinizi paylaşın

## 🔮 Gelecek Özellikler

- [ ] Otomatik yedekleme
- [ ] Bulut senkronizasyonu
- [ ] İki faktörlü kimlik doğrulama
- [ ] Şifre gücü analizi
- [ ] Otomatik form doldurma
- [ ] Browser extension
- [ ] Mobil uygulama

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir. Kritik veriler için ek güvenlik önlemleri alınması önerilir.
