// DOM elementleri
const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const loginForm = document.getElementById('loginForm');
const masterPasswordInput = document.getElementById('masterPassword');
const addPasswordBtn = document.getElementById('addPasswordBtn');
const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const passwordsList = document.getElementById('passwordsList');
const emptyState = document.getElementById('emptyState');
const passwordCount = document.getElementById('passwordCount');
const categoryList = document.getElementById('categoryList');

// Şifre unutma butonu
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

// Modal elementleri
const passwordModal = document.getElementById('passwordModal');
const detailModal = document.getElementById('detailModal');
const categoryModal = document.getElementById('categoryModal');
const categoryFormModal = document.getElementById('categoryFormModal');
const deleteCategoryModal = document.getElementById('deleteCategoryModal');
const deletePasswordModal = document.getElementById('deletePasswordModal');
const settingsModal = document.getElementById('settingsModal');
const developerModal = document.getElementById('developerModal');
const resetPasswordModal = document.getElementById('resetPasswordModal');
const passwordForm = document.getElementById('passwordForm');
const categoryForm = document.getElementById('categoryForm');
const closeModal = document.getElementById('closeModal');
const closeDetailModal = document.getElementById('closeDetailModal');
const closeCategoryModal = document.getElementById('closeCategoryModal');
const closeCategoryFormModal = document.getElementById('closeCategoryFormModal');
const closeDeleteCategoryModal = document.getElementById('closeDeleteCategoryModal');
const closeDeletePasswordModal = document.getElementById('closeDeletePasswordModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');
const cancelBtn = document.getElementById('cancelBtn');
const cancelCategoryBtn = document.getElementById('cancelCategoryBtn');
const cancelDeleteCategoryBtn = document.getElementById('cancelDeleteCategoryBtn');
const confirmDeleteCategoryBtn = document.getElementById('confirmDeleteCategoryBtn');
const cancelDeletePasswordBtn = document.getElementById('cancelDeletePasswordBtn');
const confirmDeletePasswordBtn = document.getElementById('confirmDeletePasswordBtn');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const copyDbPathBtn = document.getElementById('copyDbPathBtn');
const updateDbBtn = document.getElementById('updateDbBtn');
const checkDbBtn = document.getElementById('checkDbBtn');
const optimizeDbBtn = document.getElementById('optimizeDbBtn');
const migratePasswordsBtn = document.getElementById('migratePasswordsBtn');

// Form elementleri
const passwordId = document.getElementById('passwordId');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const urlInput = document.getElementById('url');
const notesInput = document.getElementById('notes');
const generatePasswordBtn = document.getElementById('generatePassword');
const togglePasswordBtn = document.getElementById('togglePassword');

// Kategori form elementleri
const categoryId = document.getElementById('categoryId');
const categoryNameInput = document.getElementById('categoryName');
const categoryColorInput = document.getElementById('categoryColor');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const categoriesList = document.getElementById('categoriesList');

// Geliştirici ana şifresi form elementleri
const developerPasswordInput = document.getElementById('developerPassword');
const resetDeveloperPasswordInput = document.getElementById('resetDeveloperPassword');
const newMasterPasswordInput = document.getElementById('newMasterPassword');
const confirmNewMasterPasswordInput = document.getElementById('confirmNewMasterPassword');
// developerAccessBtn artık kullanılmıyor
const developerLoginBtn = document.getElementById('developerLoginBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

// Detay modal elementleri
const detailTitle = document.getElementById('detailTitle');
const detailTitleText = document.getElementById('detailTitleText');
const detailCategory = document.getElementById('detailCategory');
const detailUsername = document.getElementById('detailUsername');
const detailPassword = document.getElementById('detailPassword');
const detailUrl = document.getElementById('detailUrl');
const detailNotes = document.getElementById('detailNotes');
const detailCreated = document.getElementById('detailCreated');
const detailUpdated = document.getElementById('detailUpdated');
const editPasswordBtn = document.getElementById('editPasswordBtn');
const deletePasswordBtn = document.getElementById('deletePasswordBtn');

// Global değişkenler
let currentPasswords = [];
let currentCategory = 'all';
let editingPasswordId = null;
let editingCategoryId = null;
let categoryToDelete = null;
let passwordToDelete = null;

// Event listeners - Performans optimizasyonu ile
document.addEventListener('DOMContentLoaded', initializeApp, { passive: true });

// ESC tuşu ile modalları kapat
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (deleteCategoryModal.classList.contains('active')) {
            hideDeleteCategoryModal();
        } else if (deletePasswordModal.classList.contains('active')) {
            hideDeletePasswordModal();
        } else if (categoryFormModal.classList.contains('active')) {
            hideCategoryFormModal();
        } else if (passwordModal.classList.contains('active')) {
            hidePasswordModal();
        } else if (detailModal.classList.contains('active')) {
            hideDetailModal();
        } else if (categoryModal.classList.contains('active')) {
            hideCategoryModal();
        } else if (settingsModal.classList.contains('active')) {
            hideSettingsModal();
        } else if (developerModal.classList.contains('active')) {
            hideDeveloperModal();
        } else if (resetPasswordModal.classList.contains('active')) {
            hideResetPasswordModal();
        }
    }
}, { passive: true });

// Modal dışına tıklayarak kapatma
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        if (deleteCategoryModal.classList.contains('active')) {
            hideDeleteCategoryModal();
        } else if (deletePasswordModal.classList.contains('active')) {
            hideDeletePasswordModal();
        } else if (categoryFormModal.classList.contains('active')) {
            hideCategoryFormModal();
        } else if (passwordModal.classList.contains('active')) {
            hidePasswordModal();
        } else if (detailModal.classList.contains('active')) {
            hideDetailModal();
        } else if (categoryModal.classList.contains('active')) {
            hideCategoryModal();
        } else if (settingsModal.classList.contains('active')) {
            hideSettingsModal();
        } else if (developerModal.classList.contains('active')) {
            hideDeveloperModal();
        } else if (resetPasswordModal.classList.contains('active')) {
            hideResetPasswordModal();
        }
    }
}, { passive: true });
loginForm.addEventListener('submit', handleLogin, { passive: false });
addPasswordBtn.addEventListener('click', showAddPasswordModal, { passive: true });
manageCategoriesBtn.addEventListener('click', showCategoryModal, { passive: true });
settingsBtn.addEventListener('click', showSettingsModal, { passive: true });
logoutBtn.addEventListener('click', handleLogout, { passive: true });
searchInput.addEventListener('input', handleSearch, { passive: true });
closeModal.addEventListener('click', hidePasswordModal, { passive: true });
closeDetailModal.addEventListener('click', hideDetailModal, { passive: true });
closeCategoryModal.addEventListener('click', hideCategoryModal, { passive: true });
closeCategoryFormModal.addEventListener('click', hideCategoryFormModal, { passive: true });
closeDeleteCategoryModal.addEventListener('click', hideDeleteCategoryModal, { passive: true });
closeDeletePasswordModal.addEventListener('click', hideDeletePasswordModal, { passive: true });
closeDeveloperModal.addEventListener('click', hideDeveloperModal, { passive: true });
closeResetPasswordModal.addEventListener('click', hideResetPasswordModal, { passive: true });
cancelBtn.addEventListener('click', hidePasswordModal, { passive: true });
cancelCategoryBtn.addEventListener('click', hideCategoryFormModal, { passive: true });
cancelDeleteCategoryBtn.addEventListener('click', hideDeleteCategoryModal, { passive: true });
cancelDeletePasswordBtn.addEventListener('click', hideDeletePasswordModal, { passive: true });
confirmDeleteCategoryBtn.addEventListener('click', confirmDeleteCategory, { passive: true });
confirmDeletePasswordBtn.addEventListener('click', confirmDeletePassword, { passive: true });
closeSettingsModal.addEventListener('click', hideSettingsModal, { passive: true });
closeSettingsBtn.addEventListener('click', hideSettingsModal, { passive: true });
closeDeveloperBtn.addEventListener('click', hideDeveloperModal, { passive: true });
cancelResetBtn.addEventListener('click', hideResetPasswordModal, { passive: true });
copyDbPathBtn.addEventListener('click', copyDbPath, { passive: true });
updateDbBtn.addEventListener('click', updateDatabase, { passive: true });
checkDbBtn.addEventListener('click', checkDatabase, { passive: true });
optimizeDbBtn.addEventListener('click', optimizeDatabase, { passive: true });
migratePasswordsBtn.addEventListener('click', migratePasswords, { passive: true });
passwordForm.addEventListener('submit', handlePasswordSubmit, { passive: false });
categoryForm.addEventListener('submit', handleCategorySubmit, { passive: false });
generatePasswordBtn.addEventListener('click', generatePassword, { passive: true });
togglePasswordBtn.addEventListener('click', togglePasswordVisibility, { passive: true });
addCategoryBtn.addEventListener('click', showAddCategoryModal, { passive: true });

// Geliştirici ana şifresi event listener'ları
// developerAccessBtn event listener'ı kaldırıldı (artık kullanılmıyor)
// developerLoginBtn ve resetPasswordBtn event listener'ları initializeApp içinde ekleniyor



// Kategori adı değişikliklerini dinle
categoryNameInput.addEventListener('input', checkCategoryNameAvailability, { passive: true });

// Uygulama başlatma
function initializeApp() {
    // Kategorileri yükle
    loadCategories();
    
    // Sayfa durumunu kontrol et
    checkAuthState();
    
    // QR kod oluştur
    generateContactQR();
    
    // Event listener'ları ekle
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', showDeveloperModal, { passive: true });
    }
    
    // Geliştirici login butonu event listener'ı
    if (developerLoginBtn) {
        developerLoginBtn.addEventListener('click', handleDeveloperLogin, { passive: true });
    }
    
    // Reset password butonu event listener'ı
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', handleResetPassword, { passive: true });
    }
}

// Kimlik doğrulama durumunu kontrol et
function checkAuthState() {
    // Bu fonksiyon gerçek bir uygulamada session/token kontrolü yapar
    // Şimdilik login sayfasını göster
    showLoginPage();
}

// Login sayfasını göster
function showLoginPage() {
    loginPage.classList.add('active');
    mainPage.classList.remove('active');
    masterPasswordInput.focus();
}

// Ana sayfayı göster
function showMainPage() {
    loginPage.classList.remove('active');
    mainPage.classList.add('active');
    loadPasswords();
}

// Login işlemi
async function handleLogin(e) {
    e.preventDefault();
    
    const masterPassword = masterPasswordInput.value.trim();
    
    if (!masterPassword) {
        showNotification('Ana şifre gerekli!', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.login(masterPassword);
        
        if (result.success) {
            showMainPage();
            masterPasswordInput.value = '';
            showNotification('Başarıyla giriş yapıldı!', 'success');
        } else {
            if (result.error) {
                showNotification('Giriş hatası: ' + result.error, 'error');
            } else {
                showNotification('Ana şifre hatalı!', 'error');
            }
        }
    } catch (error) {
        showNotification('İşlem sırasında hata oluştu: ' + error.message, 'error');
    }
}

// Çıkış işlemi
function handleLogout() {
    showLoginPage();
    currentPasswords = [];
    currentCategory = 'all';
    editingPasswordId = null;
    showNotification('Çıkış yapıldı', 'info');
}

// Şifreleri yükle
async function loadPasswords() {
    try {
        const result = await window.electronAPI.getPasswords();
        
        if (result.success) {
            currentPasswords = result.data;
            updatePasswordCount();
            renderPasswords();
            updateEmptyState();
        } else {
            showNotification('Şifreler yüklenirken hata oluştu: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Şifreler yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

// Şifre sayısını güncelle
function updatePasswordCount() {
    const count = currentPasswords.length;
    passwordCount.textContent = `${count} şifre`;
}

// Şifreleri render et - Gelişmiş performans optimizasyonu ile
function renderPasswords() {
    const filteredPasswords = filterPasswordsByCategory(currentPasswords, currentCategory);
    
    if (filteredPasswords.length === 0) {
        passwordsList.innerHTML = '';
        return;
    }
    
    // Template string yerine string concatenation kullanarak performansı artır
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < filteredPasswords.length; i++) {
        const password = filteredPasswords[i];
        const card = document.createElement('div');
        card.className = 'password-card';
        card.dataset.id = password.id;
        
        // String concatenation ile HTML oluştur
        let html = '<div class="password-card-header"><div>';
        html += '<div class="password-title">' + escapeHtml(password.title) + '</div>';
        html += '<div class="password-category">' + escapeHtml(password.category) + '</div>';
        html += '</div><div class="password-actions">';
        html += '<button class="action-btn" onclick="viewPassword(' + password.id + ')" title="Görüntüle">';
        html += '<i class="fas fa-eye"></i></button>';
        html += '<button class="action-btn" onclick="editPassword(' + password.id + ')" title="Düzenle">';
        html += '<i class="fas fa-edit"></i></button></div></div>';
        html += '<div class="password-info">';
        
        if (password.username) {
            html += '<span><i class="fas fa-user"></i>' + escapeHtml(password.username) + '</span>';
        }
        if (password.url) {
            html += '<span><i class="fas fa-link"></i>' + escapeHtml(password.url) + '</span>';
        }
        if (password.notes) {
            const notesText = password.notes.length > 50 ? 
                password.notes.substring(0, 50) + '...' : password.notes;
            html += '<span><i class="fas fa-sticky-note"></i>' + escapeHtml(notesText) + '</span>';
        }
        
        html += '</div>';
        card.innerHTML = html;
        fragment.appendChild(card);
    }
    
    // Tek seferde DOM'u güncelle
    passwordsList.innerHTML = '';
    passwordsList.appendChild(fragment);
}

// Kategoriye göre şifreleri filtrele
function filterPasswordsByCategory(passwords, category) {
    if (category === 'all') {
        return passwords;
    }
    return passwords.filter(password => password.category === category);
}

// Boş durumu güncelle
function updateEmptyState() {
    if (currentPasswords.length === 0) {
        emptyState.style.display = 'block';
        passwordsList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        passwordsList.style.display = 'grid';
    }
}

// Kategorileri yükle - Veritabanından dinamik olarak
async function loadCategories() {
    try {
        // Önce "Tümü" kategorisini ekle
        const fragment = document.createDocumentFragment();
        
        const allCategoryLi = document.createElement('li');
        allCategoryLi.className = 'category-item active';
        allCategoryLi.dataset.category = 'all';
        allCategoryLi.onclick = () => filterByCategory('all');
        allCategoryLi.innerHTML = '<i class="fas fa-list"></i>Tümü';
        fragment.appendChild(allCategoryLi);
        
        // Veritabanından kategorileri çek
        const result = await window.electronAPI.getCategories();
        if (result.success && result.data) {
            for (const category of result.data) {
                const li = document.createElement('li');
                li.className = 'category-item';
                li.dataset.category = category.name;
                li.onclick = () => filterByCategory(category.name);
                
                // Kategori rengini kullan
                const iconColor = category.color || '#007bff';
                li.innerHTML = `<i class="fas fa-folder" style="color: ${iconColor}"></i>${escapeHtml(category.name)}`;
                
                fragment.appendChild(li);
            }
        }
        
        // DOM'u güncelle
        categoryList.innerHTML = '';
        categoryList.appendChild(fragment);
        
    } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        // Hata durumunda varsayılan kategorileri göster
        loadDefaultCategories();
    }
}

// HTML escape fonksiyonu
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Varsayılan kategorileri yükle (hata durumunda)
function loadDefaultCategories() {
    const categories = [
        { name: 'Tümü', icon: 'fas fa-list' },
        { name: 'İş', icon: 'fas fa-briefcase' },
        { name: 'Sosyal Medya', icon: 'fas fa-share-alt' },
        { name: 'Finans', icon: 'fas fa-credit-card' }
    ];
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const li = document.createElement('li');
        li.className = `category-item ${category.name === 'Tümü' ? 'active' : ''}`;
        li.dataset.category = category.name === 'Tümü' ? 'all' : category.name;
        li.onclick = () => filterByCategory(category.name === 'Tümü' ? 'all' : category.name);
        
        li.innerHTML = '<i class="' + category.icon + '"></i>' + category.name;
        fragment.appendChild(li);
    }
    
    categoryList.innerHTML = '';
    categoryList.appendChild(fragment);
}

// Kategoriye göre filtrele - Performans optimizasyonu ile
function filterByCategory(category) {
    currentCategory = category;
    
    // Aktif kategoriyi güncelle - querySelectorAll yerine daha hızlı yöntem
    const categoryItems = categoryList.querySelectorAll('.category-item');
    for (let i = 0; i < categoryItems.length; i++) {
        categoryItems[i].classList.remove('active');
    }
    
    const activeItem = categoryList.querySelector(`[data-category="${category}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Şifreleri yeniden render et
    renderPasswords();
}

// Arama işlemi - Gelişmiş debounce ile performans iyileştirmesi
let searchTimeout;
let lastQuery = '';
async function handleSearch(e) {
    const query = e.target.value.trim();
    
    // Aynı sorgu tekrar ediliyorsa işlem yapma
    if (query === lastQuery) return;
    lastQuery = query;
    
    // Önceki timeout'u temizle
    clearTimeout(searchTimeout);
    
    if (query.length === 0) {
        loadPasswords();
        return;
    }
    
    // 300ms bekle, sonra arama yap
    searchTimeout = setTimeout(async () => {
        try {
            const result = await window.electronAPI.searchPasswords(query);
            
            if (result.success) {
                currentPasswords = result.data;
                updatePasswordCount();
                renderPasswords();
                updateEmptyState();
            } else {
                showNotification('Arama yapılırken hata oluştu: ' + result.error, 'error');
            }
        } catch (error) {
            showNotification('Arama yapılırken hata oluştu: ' + error.message, 'error');
        }
    }, 300);
}

// Şifre ekleme modalını göster
async function showAddPasswordModal() {
    editingPasswordId = null;
    passwordForm.reset();
    passwordId.value = '';
    document.getElementById('modalTitle').textContent = 'Yeni Şifre Ekle';
    
    // Kategorileri yükle
    await loadCategoriesForPasswordModal();
    
    passwordModal.classList.add('active');
    titleInput.focus();
}

// Şifre modalı için kategorileri yükle
async function loadCategoriesForPasswordModal() {
    try {
        const result = await window.electronAPI.getCategories();
        if (result.success && result.data) {
            // Mevcut seçili kategoriyi sakla
            const currentValue = categorySelect.value;
            
            // Select'i temizle
            categorySelect.innerHTML = '';
            
            // Veritabanından gelen kategorileri ekle
            for (const category of result.data) {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            }
            
            // Önceki değeri geri yükle (eğer hala mevcut ise)
            if (currentValue && Array.from(categorySelect.options).some(opt => opt.value === currentValue)) {
                categorySelect.value = currentValue;
            }
        }
    } catch (error) {
        console.error('Şifre modalı için kategoriler yüklenirken hata:', error);
        // Hata durumunda varsayılan kategorileri göster
        loadDefaultCategoriesForPasswordModal();
    }
}

// Varsayılan kategorileri yükle (hata durumunda)
function loadDefaultCategoriesForPasswordModal() {
    const defaultCategories = ['İş', 'Sosyal Medya', 'Finans'];
    
    // Select'i temizle
    categorySelect.innerHTML = '';
    
    // Varsayılan kategorileri ekle
    defaultCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Şifre düzenleme modalını göster
async function editPassword(id) {
    try {
        const result = await window.electronAPI.getPasswordById(id);
        
        if (result.success && result.data) {
            const password = result.data;
            editingPasswordId = password.id;
            
            // Kategorileri yükle
            await loadCategoriesForPasswordModal();
            
            passwordId.value = password.id;
            titleInput.value = password.title;
            categorySelect.value = password.category;
            usernameInput.value = password.username || '';
            passwordInput.value = password.password;
            urlInput.value = password.url || '';
            notesInput.value = password.notes || '';
            
            document.getElementById('modalTitle').textContent = 'Şifre Düzenle';
            passwordModal.classList.add('active');
            titleInput.focus();
        } else {
            showNotification('Şifre bulunamadı!', 'error');
        }
    } catch (error) {
        showNotification('Şifre yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

// Şifre görüntüleme modalını göster
async function viewPassword(id) {
    try {
        const result = await window.electronAPI.getPasswordById(id);
        
        if (result.success && result.data) {
            const password = result.data;
            
            detailTitleText.textContent = password.title;
            detailCategory.textContent = password.category;
            detailUsername.textContent = password.username || '-';
            detailPassword.textContent = password.password;
            detailUrl.textContent = password.url || '-';
            detailNotes.textContent = password.notes || '-';
            detailCreated.textContent = formatDate(password.created_at);
            detailUpdated.textContent = formatDate(password.updated_at);
            
            // Copy butonlarına event listener ekle
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.onclick = function() {
                    const field = this.getAttribute('data-field');
                    const text = field === 'username' ? password.username : password.password;
                    copyToClipboard(text);
                };
            });
            
            // Edit ve Delete butonlarına event listener ekle
            editPasswordBtn.onclick = () => {
                hideDetailModal();
                editPassword(password.id);
            };
            
            deletePasswordBtn.onclick = () => {
                passwordToDelete = password;
                
                // Modal'ı hazırla ve göster
                document.getElementById('deletePasswordTitle').textContent = password.title;
                document.getElementById('deletePasswordCategory').textContent = password.category;
                
                deletePasswordModal.classList.add('active');
                hideDetailModal();
            };
            
            detailModal.classList.add('active');
        } else {
            showNotification('Şifre bulunamadı!', 'error');
        }
    } catch (error) {
        showNotification('Şifre yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

// Şifre ekleme/düzenleme işlemi
async function handlePasswordSubmit(e) {
    e.preventDefault();
    
    const passwordData = {
        title: titleInput.value.trim(),
        category: categorySelect.value,
        username: usernameInput.value.trim(),
        password: passwordInput.value,
        url: urlInput.value.trim(),
        notes: notesInput.value.trim()
    };
    
    if (!passwordData.title || !passwordData.password) {
        showNotification('Başlık ve şifre alanları zorunludur!', 'error');
        return;
    }
    
    try {
        let result;
        
        if (editingPasswordId) {
            passwordData.id = editingPasswordId;
            result = await window.electronAPI.updatePassword(passwordData);
        } else {
            result = await window.electronAPI.addPassword(passwordData);
        }
        
        if (result.success) {
            hidePasswordModal();
            loadPasswords();
            showNotification(
                editingPasswordId ? 'Şifre güncellendi!' : 'Şifre eklendi!', 
                'success'
            );
        } else {
            showNotification('İşlem başarısız: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('İşlem sırasında hata oluştu: ' + error.message, 'error');
    }
}

// Şifre silme işlemi
async function deletePassword(id) {
    try {
        const result = await window.electronAPI.deletePassword(id);
        
        if (result.success) {
            loadPasswords();
            showNotification('Şifre silindi!', 'success');
        } else {
            showNotification('Şifre silinirken hata oluştu: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Şifre silinirken hata oluştu: ' + error.message, 'error');
    }
}

// Modal gizleme
function hidePasswordModal() {
    passwordModal.classList.remove('active');
    passwordForm.reset();
    editingPasswordId = null;
}

function hideDetailModal() {
    detailModal.classList.remove('active');
}

// Şifre oluşturma - Performans optimizasyonu ile
function generatePassword() {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const charsetLength = charset.length;
    let password = '';
    
    // Math.random yerine daha hızlı yöntem
    for (let i = 0; i < length; i++) {
        password += charset[Math.floor(Math.random() * charsetLength)];
    }
    
    passwordInput.value = password;
    showNotification('Güçlü şifre oluşturuldu!', 'success');
}

// Şifre görünürlüğünü değiştir
function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
}

// Panoya kopyalama
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Panoya kopyalandı!', 'success');
    } catch (error) {
        showNotification('Kopyalama başarısız!', 'error');
    }
}

// Tarih formatla
function formatDate(dateString) {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// HTML escape - Performans optimizasyonu ile
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    
    // DOM oluşturmak yerine string replace kullan
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Bildirim gösterme - Performans optimizasyonu ile
function showNotification(message, type = 'info') {
    // Basit bir bildirim sistemi
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    // Stil ekle - cssText yerine tek tek set et
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    notification.style.maxWidth = '300px';
    notification.style.wordWrap = 'break-word';
    
    // Tip bazlı renk
    switch (type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Kategori yönetimi fonksiyonları
function showCategoryModal() {
    categoryModal.classList.add('active');
    loadCategoriesForManagement();
}

function hideCategoryModal() {
    categoryModal.classList.remove('active');
}

function showAddCategoryModal() {
    editingCategoryId = null;
    categoryForm.reset();
    categoryId.value = '';
    categoryNameInput.value = '';
    categoryColorInput.value = '#007bff';
    
    // Debug: Form temizlendi
    console.log('Yeni kategori modalı açıldı, form temizlendi');
    
    document.getElementById('categoryFormTitle').textContent = 'Yeni Kategori';
    categoryFormModal.classList.add('active');
    clearCategoryNameWarning(); // Uyarıları temizle
    categoryNameInput.focus();
}

function hideCategoryFormModal() {
    categoryFormModal.classList.remove('active');
    editingCategoryId = null;
    clearCategoryNameWarning(); // Uyarıları temizle
    
    // Debug: Modal kapatıldı
    console.log('Kategori modalı kapatıldı, editingCategoryId sıfırlandı');
}

function hideDeleteCategoryModal() {
    deleteCategoryModal.classList.remove('active');
    categoryToDelete = null;
}

async function confirmDeleteCategory() {
    if (!categoryToDelete) {
        showNotification('Silinecek kategori bulunamadı!', 'error');
        return;
    }
    
            // "İş" kategorisi silinemez (varsayılan kategori)
        if (categoryToDelete.name === 'İş') {
            showNotification('Varsayılan kategori silinemez!', 'error');
            return;
        }
    
    try {
        const result = await window.electronAPI.deleteCategory(categoryToDelete.id);
        
        if (result.success) {
            hideDeleteCategoryModal();
            loadCategoriesForManagement();
            loadCategories(); // Sidebar kategorilerini güncelle
            
            // Eğer şifre modalı açıksa, kategorileri güncelle
            if (passwordModal.classList.contains('active')) {
                await loadCategoriesForPasswordModal();
            }
            
            showNotification('Kategori silindi!', 'success');
        } else {
            showNotification('Kategori silinirken hata oluştu: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Kategori silinirken hata oluştu: ' + error.message, 'error');
    }
}

function hideDeletePasswordModal() {
    deletePasswordModal.classList.remove('active');
    passwordToDelete = null;
}

async function confirmDeletePassword() {
    if (!passwordToDelete) {
        showNotification('Silinecek şifre bulunamadı!', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.deletePassword(passwordToDelete.id);
        
        if (result.success) {
            hideDeletePasswordModal();
            loadPasswords();
            showNotification('Şifre silindi!', 'success');
        } else {
            showNotification('Şifre silinirken hata oluştu: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Şifre silinirken hata oluştu: ' + error.message, 'error');
    }
}

async function loadCategoriesForManagement() {
    try {
        const result = await window.electronAPI.getCategories();
        
        if (result.success) {
            renderCategoriesForManagement(result.data);
        } else {
            showNotification('Kategoriler yüklenirken hata oluştu: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Kategoriler yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

function renderCategoriesForManagement(categories) {
    categoriesList.innerHTML = categories.map(category => `
        <div class="category-item-manage">
            <div class="category-info">
                <div class="category-color-preview" style="background-color: ${category.color}"></div>
                <div class="category-name-manage">${escapeHtml(category.name)}</div>
            </div>
            <div class="category-actions-manage">
                <button class="btn btn-primary btn-sm" onclick="editCategory(${category.id})" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${category.id})" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

async function editCategory(id) {
    try {
        const result = await window.electronAPI.getCategoryById(id);
        
        if (result.success && result.data) {
            const category = result.data;
            editingCategoryId = category.id;
            
            // Debug: Kategori bilgilerini logla
            console.log('Düzenlenecek kategori:', category);
            
            // Form'u temizle ve yeni değerleri set et
            categoryForm.reset();
            categoryId.value = category.id;
            categoryNameInput.value = category.name;
            categoryColorInput.value = category.color || '#007bff';
            
            // Debug: Input değerlerini kontrol et
            console.log('Form değerleri set edildi:', {
                id: categoryId.value,
                name: categoryNameInput.value,
                color: categoryColorInput.value
            });
            
            document.getElementById('categoryFormTitle').textContent = 'Kategori Düzenle';
            categoryFormModal.classList.add('active');
            clearCategoryNameWarning(); // Uyarıları temizle
            categoryNameInput.focus();
        } else {
            showNotification('Kategori bulunamadı!', 'error');
        }
    } catch (error) {
        showNotification('Kategori yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

async function deleteCategory(id) {
    try {
        // Kategori bilgilerini al
        const result = await window.electronAPI.getCategoryById(id);
        
        if (result.success && result.data) {
            const category = result.data;
            categoryToDelete = category;
            
            // Modal'ı hazırla ve göster
            document.getElementById('deleteCategoryName').textContent = category.name;
            document.getElementById('deleteCategoryColor').style.backgroundColor = category.color || '#007bff';
            
            // Eğer kategori "İş" ise özel mesaj göster
            if (category.name === 'İş') {
                document.getElementById('deleteCategoryMessage').textContent = 'Bu kategori varsayılan kategoridir ve silinemez.';
                document.getElementById('confirmDeleteCategoryBtn').disabled = true;
                document.getElementById('confirmDeleteCategoryBtn').style.opacity = '0.5';
            } else {
                // Kategoriye ait şifre var mı kontrol et
                const hasPasswords = await checkCategoryHasPasswords(category.name);
                if (hasPasswords) {
                    document.getElementById('deleteCategoryMessage').textContent = 'Bu kategoriye ait şifreler bulunmaktadır. Önce şifreleri silin veya başka kategoriye taşıyın.';
                    document.getElementById('confirmDeleteCategoryBtn').disabled = true;
                    document.getElementById('confirmDeleteCategoryBtn').style.opacity = '0.5';
                } else {
                    document.getElementById('deleteCategoryMessage').textContent = 'Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.';
                    document.getElementById('confirmDeleteCategoryBtn').disabled = false;
                    document.getElementById('confirmDeleteCategoryBtn').style.opacity = '1';
                }
            }
            
            deleteCategoryModal.classList.add('active');
        } else {
            showNotification('Kategori bulunamadı!', 'error');
        }
    } catch (error) {
        showNotification('Kategori yüklenirken hata oluştu: ' + error.message, 'error');
    }
}

async function handleCategorySubmit(e) {
    e.preventDefault();
    
    const categoryData = {
        name: categoryNameInput.value.trim(),
        color: categoryColorInput.value
    };
    
    if (!categoryData.name) {
        showNotification('Kategori adı gerekli!', 'error');
        return;
    }
    
    // Form submit öncesi son kontrol
    if (document.querySelector('.category-name-warning')) {
        showNotification('Lütfen kategori adı uyarısını düzeltin!', 'error');
        return;
    }
    
    try {
        let result;
        
        if (editingCategoryId) {
            // Düzenleme sırasında aynı isimde başka kategori var mı kontrol et
            const existingCategories = await window.electronAPI.getCategories();
            if (existingCategories.success) {
                const duplicateCategory = existingCategories.data.find(
                    cat => cat.name.toLowerCase() === categoryData.name.toLowerCase() && cat.id !== editingCategoryId
                );
                if (duplicateCategory) {
                    showNotification('Bu isimde başka bir kategori zaten mevcut!', 'error');
                    return;
                }
            }
            
            categoryData.id = editingCategoryId;
            result = await window.electronAPI.updateCategory(categoryData);
        } else {
            // Yeni kategori eklerken aynı isimde kategori var mı kontrol et
            const existingCategories = await window.electronAPI.getCategories();
            if (existingCategories.success) {
                const duplicateCategory = existingCategories.data.find(
                    cat => cat.name.toLowerCase() === categoryData.name.toLowerCase()
                );
                if (duplicateCategory) {
                    showNotification('Bu isimde bir kategori zaten mevcut!', 'error');
                    return;
                }
            }
            
            result = await window.electronAPI.addCategory(categoryData);
        }
        
        if (result.success) {
            hideCategoryFormModal();
            loadCategoriesForManagement();
            loadCategories(); // Sidebar kategorilerini güncelle
            
            // Eğer şifre modalı açıksa, kategorileri güncelle
            if (passwordModal.classList.contains('active')) {
                await loadCategoriesForPasswordModal();
            }
            
            showNotification(
                editingCategoryId ? 'Kategori güncellendi!' : 'Kategori eklendi!', 
                'success'
            );
            
            // Düzenleme modunu sıfırla
            editingCategoryId = null;
        } else {
            // Hata mesajını daha kullanıcı dostu hale getir
            let errorMessage = 'İşlem başarısız';
            if (result.error && result.error.includes('UNIQUE constraint failed')) {
                errorMessage = 'Bu isimde bir kategori zaten mevcut!';
            } else if (result.error) {
                errorMessage += ': ' + result.error;
            }
            showNotification(errorMessage, 'error');
        }
    } catch (error) {
        let errorMessage = 'İşlem sırasında hata oluştu';
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            errorMessage = 'Bu isimde bir kategori zaten mevcut!';
        } else if (error.message) {
            errorMessage += ': ' + error.message;
        }
        showNotification(errorMessage, 'error');
    }
}

// Global değişkenler

// Kategoriye ait şifre var mı kontrol et
async function checkCategoryHasPasswords(categoryName) {
    try {
        const result = await window.electronAPI.getAllPasswords();
        if (result.success) {
            return result.data.some(password => password.category === categoryName);
        }
        return false;
    } catch (error) {
        console.error('Şifre kontrolü sırasında hata:', error);
        return false;
    }
}

// Şifre kategorisini değiştir
async function changePasswordCategory(passwordId, newCategory) {
    try {
        const result = await window.electronAPI.getPasswordById(passwordId);
        if (result.success && result.data) {
            const password = result.data;
            password.category = newCategory;
            
            const updateResult = await window.electronAPI.updatePassword(password);
            if (updateResult.success) {
                showNotification('Şifre kategorisi güncellendi!', 'success');
                return true;
            } else {
                showNotification('Kategori güncellenirken hata oluştu: ' + updateResult.error, 'error');
                return false;
            }
        }
        return false;
    } catch (error) {
        showNotification('Kategori güncellenirken hata oluştu: ' + error.message, 'error');
        return false;
    }
}

// Kategori adı kontrolü
async function checkCategoryNameAvailability() {
    const categoryName = categoryNameInput.value.trim();
    
    if (categoryName.length === 0) {
        // Input boşsa uyarıyı temizle
        clearCategoryNameWarning();
        return;
    }
    
    try {
        const result = await window.electronAPI.getCategories();
        if (result.success) {
            const duplicateCategory = result.data.find(
                cat => cat.name.toLowerCase() === categoryName.toLowerCase() && cat.id !== editingCategoryId
            );
            
            if (duplicateCategory) {
                showCategoryNameWarning('Bu isimde bir kategori zaten mevcut!');
            } else {
                clearCategoryNameWarning();
            }
        }
    } catch (error) {
        // Hata durumunda sessizce devam et
    }
}

function showCategoryNameWarning(message) {
    // Mevcut uyarıyı temizle
    clearCategoryNameWarning();
    
    // Uyarı elementi oluştur
    const warning = document.createElement('div');
    warning.className = 'category-name-warning';
    warning.textContent = message;
    warning.style.color = '#dc3545';
    warning.style.fontSize = '0.8rem';
    warning.style.marginTop = '5px';
    warning.style.fontWeight = '500';
    
    // Uyarıyı kategori adı input'unun altına ekle
    const categoryNameGroup = categoryNameInput.parentElement;
    categoryNameGroup.appendChild(warning);
    
    // Input border'ını kırmızı yap
    categoryNameInput.style.borderColor = '#dc3545';
}

function clearCategoryNameWarning() {
    // Mevcut uyarıyı temizle
    const existingWarning = document.querySelector('.category-name-warning');
    if (existingWarning) {
        existingWarning.remove();
    }
    
    // Input border'ını normale döndür
    categoryNameInput.style.borderColor = '#e1e5e9';
}

// Ayarlar Modal Fonksiyonları
function showSettingsModal() {
    settingsModal.classList.add('active');
    loadSettingsData();
}

function hideSettingsModal() {
    settingsModal.classList.remove('active');
}

async function loadSettingsData() {
    try {
        // Veritabanı bilgilerini yükle
        const dbInfo = await window.electronAPI.getDatabaseInfo();
        if (dbInfo.success) {
            document.getElementById('dbPath').textContent = dbInfo.data.path;
            document.getElementById('dbSize').textContent = dbInfo.data.size;
            document.getElementById('lastUpdate').textContent = dbInfo.data.lastUpdate;
        }
        
        // İstatistikleri yükle
        const stats = await window.electronAPI.getDatabaseStats();
        if (stats.success) {
            document.getElementById('totalPasswords').textContent = stats.data.totalPasswords;
            document.getElementById('totalCategories').textContent = stats.data.totalCategories;
            document.getElementById('dbVersion').textContent = stats.data.version;
        }
        
    } catch (error) {
        console.error('Ayarlar yüklenirken hata:', error);
        showNotification('Ayarlar yüklenirken hata oluştu!', 'error');
    }
}

async function copyDbPath() {
    const dbPath = document.getElementById('dbPath').textContent;
    try {
        await navigator.clipboard.writeText(dbPath);
        showNotification('Veritabanı yolu panoya kopyalandı!', 'success');
    } catch (error) {
        showNotification('Kopyalama başarısız!', 'error');
    }
}

async function updateDatabase() {
    try {
        updateDbBtn.disabled = true;
        updateDbBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Güncelleniyor...';
        
        const result = await window.electronAPI.updateDatabase();
        if (result.success) {
            showNotification('Veritabanı başarıyla güncellendi!', 'success');
            // Kategorileri yeniden yükle
            await loadCategories();
            // Ayarlar verilerini yenile
            await loadSettingsData();
        } else {
            showNotification('Veritabanı güncellenirken hata: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Veritabanı güncellenirken hata: ' + error.message, 'error');
    } finally {
        updateDbBtn.disabled = false;
        updateDbBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Veritabanını Güncelle';
    }
}

async function checkDatabase() {
    try {
        checkDbBtn.disabled = true;
        checkDbBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Kontrol Ediliyor...';
        
        const result = await window.electronAPI.checkDatabase();
        if (result.success) {
            showNotification('Veritabanı kontrolü tamamlandı: ' + result.data.message, 'success');
        } else {
            showNotification('Veritabanı kontrolünde hata: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Veritabanı kontrolünde hata: ' + error.message, 'error');
    } finally {
        checkDbBtn.disabled = false;
        checkDbBtn.innerHTML = '<i class="fas fa-check-circle"></i> Veritabanı Kontrolü';
    }
}

async function optimizeDatabase() {
    try {
        optimizeDbBtn.disabled = true;
        optimizeDbBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimize Ediliyor...';
        
        const result = await window.electronAPI.optimizeDatabase();
        if (result.success) {
            showNotification('Veritabanı başarıyla optimize edildi!', 'success');
            // Ayarlar verilerini yenile
            await loadSettingsData();
        } else {
            showNotification('Veritabanı optimize edilirken hata: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Veritabanı optimize edilirken hata: ' + error.message, 'error');
    } finally {
        optimizeDbBtn.disabled = false;
        optimizeDbBtn.innerHTML = '<i class="fas fa-rocket"></i> Veritabanını Optimize Et';
    }
}

async function migratePasswords() {
    try {
        migratePasswordsBtn.disabled = true;
        migratePasswordsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Migre Ediliyor...';
        
        const result = await window.electronAPI.migratePasswords();
        if (result.success) {
            showNotification('Şifreler başarıyla migre edildi: ' + result.data.message, 'success');
            // Şifreleri yeniden yükle
            await loadPasswords();
            // Ayarlar verilerini yenile
            await loadSettingsData();
        } else {
            showNotification('Şifreler migre edilirken hata: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('Şifreler migre edilirken hata: ' + error.message, 'error');
    } finally {
        migratePasswordsBtn.disabled = false;
        migratePasswordsBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Şifreleri Migre Et';
    }
}

// CSS animasyonları ekle - Performans optimizasyonu ile
const style = document.createElement('style');
style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes slideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}';
document.head.appendChild(style);



// QR kod oluştur
function generateContactQR() {
    const qrContainer = document.getElementById('contactQR');
    if (qrContainer) {
        try {
            const contactUrl = 'https://hdynamicx.com/#contact';
            
            // QR kod kütüphanesi ile gerçek QR kod oluştur
            const QRCode = window.QRCode;
            if (QRCode) {
                // Mevcut içeriği temizle
                qrContainer.innerHTML = '';
                
                // QR kod oluştur
                new QRCode(qrContainer, {
                    text: contactUrl,
                    width: 150,
                    height: 150,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                // QR koda tıklanabilir özellik ekle
                qrContainer.style.cursor = 'pointer';
                qrContainer.onclick = () => {
                    window.open(contactUrl, '_blank');
                };
                
                // Hover efekti ekle
                qrContainer.style.transition = 'transform 0.3s ease';
                qrContainer.onmouseenter = () => {
                    qrContainer.style.transform = 'scale(1.05)';
                };
                qrContainer.onmouseleave = () => {
                    qrContainer.style.transform = 'scale(1)';
                };
            } else {
                // QR kod kütüphanesi yüklenmemişse basit bir görsel göster
                qrContainer.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <i class="fas fa-qrcode" style="font-size: 4rem; color: #667eea; margin-bottom: 10px;"></i>
                        <div style="font-size: 0.8rem; color: #666;">
                            <div>HDynamicX</div>
                            <div>Contact Page</div>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            // Hata durumunda basit görsel göster
            qrContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffc107; margin-bottom: 10px;"></i>
                    <div style="font-size: 0.8rem; color: #666;">
                        <div>QR Kod Yüklenemedi</div>
                        <div>Linke tıklayın</div>
                    </div>
                </div>
            `;
        }
    }
}

// Geliştirici Ana Şifresi Fonksiyonları
function showDeveloperModal() {
    const developerModal = document.getElementById('developerModal');
    const developerPasswordInput = document.getElementById('developerPassword');
    
    if (!developerModal || !developerPasswordInput) {
        return;
    }
    
    developerModal.classList.add('active');
    developerPasswordInput.value = '';
    developerPasswordInput.focus();
    
    // QR kod oluştur
    setTimeout(() => {
        generateContactQR();
    }, 100);
}

function hideDeveloperModal() {
    developerModal.classList.remove('active');
    developerPasswordInput.value = '';
}

function showResetPasswordModal() {
    resetPasswordModal.classList.add('active');
    resetDeveloperPasswordInput.value = '';
    newMasterPasswordInput.value = '';
    confirmNewMasterPasswordInput.value = '';
    resetDeveloperPasswordInput.focus();
}

function hideResetPasswordModal() {
    resetPasswordModal.classList.remove('active');
    resetDeveloperPasswordInput.value = '';
    newMasterPasswordInput.value = '';
    confirmNewMasterPasswordInput.value = '';
}

async function handleDeveloperLogin() {
    const developerPassword = developerPasswordInput.value.trim();
    
    if (!developerPassword) {
        showNotification('Geliştirici ana şifresi gerekli!', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.developerLogin(developerPassword);
        
        if (result.success) {
            hideDeveloperModal();
            showResetPasswordModal();
            showNotification('Geliştirici doğrulaması başarılı!', 'success');
        } else {
            showNotification('Geliştirici ana şifresi hatalı!', 'error');
        }
    } catch (error) {
        showNotification('İşlem sırasında hata oluştu: ' + error.message, 'error');
    }
}

async function handleResetPassword() {
    const developerPassword = resetDeveloperPasswordInput.value.trim();
    const newMasterPassword = newMasterPasswordInput.value.trim();
    const confirmNewMasterPassword = confirmNewMasterPasswordInput.value.trim();
    
    if (!developerPassword || !newMasterPassword || !confirmNewMasterPassword) {
        showNotification('Tüm alanları doldurun!', 'error');
        return;
    }
    
    if (newMasterPassword !== confirmNewMasterPassword) {
        showNotification('Yeni ana şifreler eşleşmiyor!', 'error');
        return;
    }
    
    if (newMasterPassword.length < 6) {
        showNotification('Yeni ana şifre en az 6 karakter olmalıdır!', 'error');
        return;
    }
    
    try {
        const result = await window.electronAPI.resetMasterPassword(developerPassword, newMasterPassword);
        
        if (result.success) {
            hideResetPasswordModal();
            showNotification('Ana şifre başarıyla sıfırlandı!', 'success');
            showNotification('Yeni ana şifrenizle giriş yapabilirsiniz.', 'info');
        } else {
            showNotification('Ana şifre sıfırlanırken hata: ' + result.error, 'error');
        }
    } catch (error) {
        showNotification('İşlem sırasında hata oluştu: ' + error.message, 'error');
    }
}
