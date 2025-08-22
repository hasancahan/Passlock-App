const path = require('path');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const os = require('os');

class Database {
  constructor() {
    this.dbPath = path.join(os.homedir(), 'AppData', 'Local', 'HD Passlock', 'passwords.json');
    this.data = {
      master_password: [],
      developer_master_password: [],
      passwords: [],
      categories: []
    };
    this.masterKey = null;
  }

  async initialize() {
    try {
      // Veritabanı dizinini oluştur
      const dbDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Mevcut veriyi yükle veya yeni oluştur
      if (fs.existsSync(this.dbPath)) {
        const fileContent = fs.readFileSync(this.dbPath, 'utf8');
        this.data = JSON.parse(fileContent);
      }

      // Geliştirici ana şifresini ekle
      await this.insertDeveloperMasterPassword();
      
      // Varsayılan kategorileri ekle
      await this.insertDefaultCategories();
      
      // Veriyi kaydet
      this.saveData();
      
      return true;
    } catch (error) {
      throw new Error('Veritabanı başlatılamadı: ' + error.message);
    }
  }

  // Veriyi dosyaya kaydet
  saveData() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (error) {
      throw new Error('Veri kaydedilemedi: ' + error.message);
    }
  }

  // Geliştirici ana şifresini ekle
  async insertDeveloperMasterPassword() {
    if (this.data.developer_master_password.length === 0) {
      const hash = await bcrypt.hash('HD_Passlock_Developer_2025', 12);
      this.data.developer_master_password.push({
        id: 1,
        password_hash: hash,
        created_at: new Date().toISOString()
      });
    }
  }

  // Varsayılan kategorileri ekle
  async insertDefaultCategories() {
    if (this.data.categories.length === 0) {
      const defaultCategories = [
        { id: 1, name: 'İş', color: '#28a745', created_at: new Date().toISOString() },
        { id: 2, name: 'Sosyal Medya', color: '#6f42c1', created_at: new Date().toISOString() },
        { id: 3, name: 'Finans', color: '#dc3545', created_at: new Date().toISOString() }
      ];
      
      this.data.categories = defaultCategories;
    }
  }

  // Ana şifre doğrula
  async verifyMasterPassword(password) {
    if (this.data.master_password.length === 0) {
      // İlk kez kullanılıyorsa, ana şifreyi ayarla
      await this.setMasterPassword(password);
      this.masterKey = password;
      return true;
    }

    const lastPassword = this.data.master_password[this.data.master_password.length - 1];
    const isValid = await bcrypt.compare(password, lastPassword.password_hash);
    
    if (isValid) {
      this.masterKey = password;
    }
    
    return isValid;
  }

  // Ana şifre ayarla
  async setMasterPassword(password) {
    const hash = await bcrypt.hash(password, 12);
    const newId = this.data.master_password.length + 1;
    
    this.data.master_password.push({
      id: newId,
      password_hash: hash,
      created_at: new Date().toISOString()
    });
    
    this.saveData();
  }

  // Geliştirici ana şifresini doğrula
  async verifyDeveloperMasterPassword(password) {
    if (this.data.developer_master_password.length === 0) {
      return false;
    }

    const developerPassword = this.data.developer_master_password[0];
    const isValid = await bcrypt.compare(password, developerPassword.password_hash);
    
    if (isValid) {
      this.masterKey = 'developer_verified';
    }
    
    return isValid;
  }

  // Ana şifreyi geliştirici ile sıfırla
  async resetMasterPasswordWithDeveloper(newPassword) {
    const hash = await bcrypt.hash(newPassword, 12);
    
    // Mevcut ana şifreleri temizle
    this.data.master_password = [];
    
    // Yeni ana şifreyi ekle
    this.data.master_password.push({
      id: 1,
      password_hash: hash,
      created_at: new Date().toISOString()
    });
    
    this.masterKey = newPassword;
    this.saveData();
  }

  // Şifre ekle
  async addPassword(passwordData) {
    const newId = this.data.passwords.length + 1;
    const now = new Date().toISOString();
    
    const newPassword = {
      id: newId,
      title: passwordData.title,
      username: passwordData.username || '',
      password: this.encryptText(passwordData.password),
      url: passwordData.url || '',
      notes: passwordData.notes || '',
      category: passwordData.category || 'İş',
      created_at: now,
      updated_at: now
    };
    
    this.data.passwords.push(newPassword);
    this.saveData();
    
    return { ...newPassword, password: passwordData.password }; // Şifrelenmemiş hali döndür
  }

  // Şifre güncelle
  async updatePassword(passwordData) {
    const passwordIndex = this.data.passwords.findIndex(p => p.id === passwordData.id);
    
    if (passwordIndex === -1) {
      throw new Error('Şifre bulunamadı');
    }
    
    this.data.passwords[passwordIndex] = {
      ...this.data.passwords[passwordIndex],
      title: passwordData.title,
      username: passwordData.username || '',
      password: this.encryptText(passwordData.password),
      url: passwordData.url || '',
      notes: passwordData.notes || '',
      category: passwordData.category || 'İş',
      updated_at: new Date().toISOString()
    };
    
    this.saveData();
    
    return { ...this.data.passwords[passwordIndex], password: passwordData.password };
  }

  // Şifre sil
  async deletePassword(id) {
    const passwordIndex = this.data.passwords.findIndex(p => p.id === id);
    
    if (passwordIndex === -1) {
      throw new Error('Şifre bulunamadı');
    }
    
    this.data.passwords.splice(passwordIndex, 1);
    this.saveData();
  }

  // Şifre getir
  async getPasswordById(id) {
    const password = this.data.passwords.find(p => p.id === id);
    
    if (!password) {
      return null;
    }
    
    return {
      ...password,
      password: this.decryptText(password.password)
    };
  }

  // Tüm şifreleri getir
  async getAllPasswords() {
    return this.data.passwords.map(password => ({
      ...password,
      password: this.decryptText(password.password)
    }));
  }

  // Şifre ara
  async searchPasswords(query) {
    const searchTerm = query.toLowerCase();
    
    return this.data.passwords
      .filter(password => 
        password.title.toLowerCase().includes(searchTerm) ||
        (password.username && password.username.toLowerCase().includes(searchTerm)) ||
        (password.url && password.url.toLowerCase().includes(searchTerm)) ||
        (password.notes && password.notes.toLowerCase().includes(searchTerm))
      )
      .map(password => ({
        ...password,
        password: this.decryptText(password.password)
      }));
  }

  // Kategori ekle
  async addCategory(categoryData) {
    const newId = this.data.categories.length + 1;
    const now = new Date().toISOString();
    
    const newCategory = {
      id: newId,
      name: categoryData.name,
      color: categoryData.color || '#007bff',
      created_at: now
    };
    
    this.data.categories.push(newCategory);
    this.saveData();
    
    return newCategory;
  }

  // Kategori güncelle
  async updateCategory(categoryData) {
    const categoryIndex = this.data.categories.findIndex(c => c.id === categoryData.id);
    
    if (categoryIndex === -1) {
      throw new Error('Kategori bulunamadı');
    }
    
    this.data.categories[categoryIndex] = {
      ...this.data.categories[categoryIndex],
      name: categoryData.name,
      color: categoryData.color || '#007bff'
    };
    
    this.saveData();
    
    return this.data.categories[categoryIndex];
  }

  // Kategori sil
  async deleteCategory(id) {
    const categoryIndex = this.data.categories.findIndex(c => c.id === id);
    
    if (categoryIndex === -1) {
      throw new Error('Kategori bulunamadı');
    }
    
    const categoryName = this.data.categories[categoryIndex].name;
    
    // Bu kategoriye ait şifre var mı kontrol et
    const hasPasswords = this.data.passwords.some(password => password.category === categoryName);
    
    if (hasPasswords) {
      throw new Error(`Bu kategoriye ait şifreler bulunmaktadır. Önce şifreleri silin veya başka kategoriye taşıyın.`);
    }
    
    // Kategoriyi sil
    this.data.categories.splice(categoryIndex, 1);
    this.saveData();
  }

  // Kategori getir
  async getCategoryById(id) {
    return this.data.categories.find(c => c.id === id) || null;
  }

  // Tüm kategorileri getir
  async getCategories() {
    return this.data.categories;
  }

  // Şifreleme
  encryptText(text) {
    const ENCRYPTION_KEY = "HD_Passlock_Secret_Key_2024!";
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
  }

  // Şifre çözme
  decryptText(encryptedText) {
    const ENCRYPTION_KEY = "HD_Passlock_Secret_Key_2024!";
    const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Veritabanı bilgileri
  async getDatabaseInfo() {
    try {
      const stats = fs.statSync(this.dbPath);
      return {
        path: this.dbPath,
        size: this.formatBytes(stats.size),
        lastUpdate: new Date(stats.mtime).toLocaleString('tr-TR')
      };
    } catch (error) {
      return {
        path: this.dbPath,
        size: '0 B',
        lastUpdate: 'Bilinmiyor'
      };
    }
  }

  // Veritabanı istatistikleri
  async getDatabaseStats() {
    return {
      totalPasswords: this.data.passwords.length,
      totalCategories: this.data.categories.length,
      version: '1.1'
    };
  }

  // Veritabanı güncelle
  async updateDatabase() {
    // JSON dosya sistemi için güncelleme gerekmez
    return { message: 'Veritabanı güncel' };
  }

  // Veritabanı kontrolü
  async checkDatabase() {
    try {
      const fileContent = fs.readFileSync(this.dbPath, 'utf8');
      JSON.parse(fileContent); // JSON formatını kontrol et
      return { message: 'Veritabanı sağlıklı' };
    } catch (error) {
      return { message: 'Veritabanı hatası: ' + error.message };
    }
  }

  // Veritabanı optimize et
  async optimizeDatabase() {
    // JSON dosya sistemi için optimizasyon gerekmez
    return { message: 'Veritabanı optimize edildi' };
  }

  // Şifreleri migre et
  async migrateExistingPasswords() {
    // JSON dosya sistemi için migrasyon gerekmez
    return { message: 'Migrasyona gerek yok' };
  }

  // Yardımcı fonksiyonlar
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Veritabanını kapat
  close() {
    // JSON dosya sistemi için kapatma gerekmez
  }
}

module.exports = Database;
