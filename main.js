const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const Database = require('./database/database');
const crypto = require('crypto');

let mainWindow;
let db;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Performans optimizasyonları
      enableRemoteModule: false,
      backgroundThrottling: false
    },
    icon: path.join(__dirname, 'assets/icon.ico'),
    titleBarStyle: 'default',
    show: false,
    // Performans optimizasyonları
    webSecurity: true,
    allowRunningInsecureContent: false
  });

  mainWindow.loadFile('renderer/index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    db = new Database();
    await db.initialize();
    createWindow();
  } catch (error) {
    console.error('Database initialization failed:', error);
    dialog.showErrorBox('Hata', 'Veritabanı başlatılamadı: ' + error.message);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers
ipcMain.handle('login', async (event, masterPassword) => {
  try {
    const isValid = await db.verifyMasterPassword(masterPassword);
    return { success: isValid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('developer-login', async (event, developerPassword) => {
  try {
    const isValid = await db.verifyDeveloperMasterPassword(developerPassword);
    return { success: isValid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('reset-master-password', async (event, { developerPassword, newMasterPassword }) => {
  try {
    // Önce geliştirici ana şifresini doğrula
    const isDeveloperValid = await db.verifyDeveloperMasterPassword(developerPassword);
    if (!isDeveloperValid) {
      return { success: false, error: 'Geliştirici ana şifresi hatalı!' };
    }
    
    // Ana şifreyi sıfırla
    await db.resetMasterPasswordWithDeveloper(newMasterPassword);
    return { success: true, message: 'Ana şifre başarıyla sıfırlandı!' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-passwords', async (event) => {
  try {
    const passwords = await db.getAllPasswords();
    return { success: true, data: passwords };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('add-password', async (event, passwordData) => {
  try {
    const result = await db.addPassword(passwordData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-password', async (event, passwordData) => {
  try {
    const result = await db.updatePassword(passwordData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-password', async (event, id) => {
  try {
    await db.deletePassword(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-password-by-id', async (event, id) => {
  try {
    const password = await db.getPasswordById(id);
    return { success: true, data: password };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('search-passwords', async (event, query) => {
  try {
    const passwords = await db.searchPasswords(query);
    return { success: true, data: passwords };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Kategori IPC handlers
ipcMain.handle('get-categories', async (event) => {
  try {
    const categories = await db.getCategories();
    return { success: true, data: categories };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('add-category', async (event, categoryData) => {
  try {
    const result = await db.addCategory(categoryData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-category', async (event, categoryData) => {
  try {
    const result = await db.updateCategory(categoryData);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-category', async (event, id) => {
  try {
    await db.deleteCategory(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-category-by-id', async (event, id) => {
  try {
    const category = await db.getCategoryById(id);
    return { success: true, data: category };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Veritabanı bilgi ve bakım IPC handlers
ipcMain.handle('get-database-info', async (event) => {
  try {
    const dbInfo = await db.getDatabaseInfo();
    return { success: true, data: dbInfo };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-database-stats', async (event) => {
  try {
    const stats = await db.getDatabaseStats();
    return { success: true, data: stats };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('update-database', async (event) => {
  try {
    const result = await db.updateDatabase();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('check-database', async (event) => {
  try {
    const result = await db.checkDatabase();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('optimize-database', async (event) => {
  try {
    const result = await db.optimizeDatabase();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('migrate-passwords', async (event) => {
  try {
    const result = await db.migrateExistingPasswords();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
