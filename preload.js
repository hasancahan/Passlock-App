const { contextBridge, ipcRenderer } = require('electron');

// API fonksiyonlarını önceden tanımla
const api = {
  login: (masterPassword) => ipcRenderer.invoke('login', masterPassword),
  developerLogin: (developerPassword) => ipcRenderer.invoke('developer-login', developerPassword),
  resetMasterPassword: (developerPassword, newMasterPassword) => ipcRenderer.invoke('reset-master-password', { developerPassword, newMasterPassword }),
  getPasswords: () => ipcRenderer.invoke('get-passwords'),
  getPasswordById: (id) => ipcRenderer.invoke('get-password-by-id', id),
  addPassword: (passwordData) => ipcRenderer.invoke('add-password', passwordData),
  updatePassword: (passwordData) => ipcRenderer.invoke('update-password', passwordData),
  deletePassword: (id) => ipcRenderer.invoke('delete-password', id),
  searchPasswords: (query) => ipcRenderer.invoke('search-passwords', query),
  // Kategori API'ları
  getCategories: () => ipcRenderer.invoke('get-categories'),
  addCategory: (categoryData) => ipcRenderer.invoke('add-category', categoryData),
  updateCategory: (categoryData) => ipcRenderer.invoke('update-category', categoryData),
  deleteCategory: (id) => ipcRenderer.invoke('delete-category', id),
  getCategoryById: (id) => ipcRenderer.invoke('get-category-by-id', id),
  // Veritabanı bilgi ve bakım API'ları
  getDatabaseInfo: () => ipcRenderer.invoke('get-database-info'),
  getDatabaseStats: () => ipcRenderer.invoke('get-database-stats'),
  updateDatabase: () => ipcRenderer.invoke('update-database'),
  checkDatabase: () => ipcRenderer.invoke('check-database'),
  optimizeDatabase: () => ipcRenderer.invoke('optimize-database'),
  migratePasswords: () => ipcRenderer.invoke('migrate-passwords')
};

// Context bridge'e tek seferde expose et
contextBridge.exposeInMainWorld('electronAPI', api);
