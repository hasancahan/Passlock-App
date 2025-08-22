const path = require('path');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
    try {
        console.log('HD Passlock Veritabanı Başlatılıyor...');
        
        const dbPath = path.join(os.homedir(), 'AppData', 'Local', 'HD Passlock', 'passwords.json');
        console.log('Veritabanı yolu:', dbPath);
        
        // Veritabanı dizinini oluştur
        const dbDir = path.dirname(dbPath);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
            console.log('Veritabanı dizini oluşturuluyor:', dbDir);
        }
        
        // Veri yapısını oluştur
        const data = {
            master_password: [],
            developer_master_password: [],
            passwords: [],
            categories: []
        };
        
        // Geliştirici ana şifresini ekle
        const developerPassword = 'HD_Passlock_Developer_2025';
        const hash = await bcrypt.hash(developerPassword, 12);
        
        data.developer_master_password.push({
            id: 1,
            password_hash: hash,
            created_at: new Date().toISOString()
        });
        
        console.log('✓ Geliştirici ana şifresi eklendi');
        
        // Varsayılan kategorileri ekle
        const defaultCategories = [
            { id: 1, name: 'İş', color: '#28a745', created_at: new Date().toISOString() },
            { id: 2, name: 'Sosyal Medya', color: '#6f42c1', created_at: new Date().toISOString() },
            { id: 3, name: 'Finans', color: '#dc3545', created_at: new Date().toISOString() }
        ];
        
        data.categories = defaultCategories;
        
        console.log('Varsayılan kategoriler ekleniyor...');
        for (const category of defaultCategories) {
            console.log(`✓ ${category.name} kategorisi eklendi`);
        }
        
        // Veriyi dosyaya kaydet
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('\nVeritabanı başlatma tamamlandı!');
        console.log('Şimdi HD Passlock uygulamasını çalıştırabilirsiniz.');
        
        return true;
    } catch (error) {
        console.error('Veritabanı başlatma hatası:', error);
        return false;
    }
}

// Eğer bu dosya doğrudan çalıştırılırsa
if (require.main === module) {
    console.log('Veritabanı başlatılıyor, lütfen bekleyin...');
    
    initializeDatabase().then(success => {
        if (success) {
            console.log('Veritabanı başarıyla başlatıldı!');
            process.exit(0);
        } else {
            console.error('Veritabanı başlatılamadı!');
            process.exit(1);
        }
    }).catch(error => {
        console.error('Beklenmeyen hata:', error);
        process.exit(1);
    });
}

module.exports = { initializeDatabase };
