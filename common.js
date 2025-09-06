// Common JavaScript functions for all pages

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) {
            userDisplay.textContent = `${user.username} (${user.role})`;
        }
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}

// Format currency
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Get next ID for a collection
function getNextId(collectionName) {
    const collection = JSON.parse(localStorage.getItem(collectionName) || '[]');
    if (collection.length === 0) return 1;
    return Math.max(...collection.map(item => item.id)) + 1;
}

// Save to local storage with backup
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        // Create backup
        localStorage.setItem(key + '_backup', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        alert('Error saving data. Please check storage quota.');
        return false;
    }
}

// Load from local storage with fallback to backup
function loadFromStorage(key) {
    try {
        let data = localStorage.getItem(key);
        if (!data) {
            // Try to load from backup
            data = localStorage.getItem(key + '_backup');
        }
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return null;
    }
}

// Export data to JSON file
function exportData(dataName) {
    const data = localStorage.getItem(dataName);
    if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${dataName}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Import data from JSON file
function importData(file, dataName, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem(dataName, JSON.stringify(data));
            if (callback) callback();
            alert('Data imported successfully!');
        } catch (error) {
            alert('Error importing data. Please check the file format.');
        }
    };
    reader.readAsText(file);
}

// Initialize demo data if not exists
function initializeDemoData() {
    // This is already handled in index.html, but kept here for reference
    if (!localStorage.getItem('initialized')) {
        // Set initialization flag
        localStorage.setItem('initialized', 'true');
    }
}

// Clear all data (for development/testing)
function clearAllData() {
    if (confirm('This will delete all data. Are you sure?')) {
        localStorage.clear();
        alert('All data has been cleared. Please refresh the page.');
        window.location.reload();
    }
}

// Generate employee code
function generateEmployeeCode() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    const lastCode = employees.length > 0 
        ? employees[employees.length - 1].empCode 
        : 'EMP000';
    const number = parseInt(lastCode.replace('EMP', '')) + 1;
    return `EMP${number.toString().padStart(3, '0')}`;
}

// Calculate working days between two dates
function calculateWorkingDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    
    while (start <= end) {
        const dayOfWeek = start.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            count++;
        }
        start.setDate(start.getDate() + 1);
    }
    
    return count;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate PAN number (Indian format)
function validatePAN(pan) {
    const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return re.test(pan);
}

// Validate Aadhaar number (basic check for 12 digits)
function validateAadhaar(aadhaar) {
    const re = /^[0-9]{12}$/;
    return re.test(aadhaar);
}

// Show notification
function showNotification(message, type = 'info') {
    // Simple alert for now, can be enhanced with better UI
    alert(message);
}