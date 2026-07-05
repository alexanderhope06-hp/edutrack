// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
const savedTheme = localStorage.getItem('edutrack-theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        updateThemeIcon(isDark);
        localStorage.setItem('edutrack-theme', isDark ? 'dark' : 'light');
    });
}

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark';
    }
}

// ===== SYSTEM PREFERENCE DETECTION =====
if (!localStorage.getItem('edutrack-theme')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
        localStorage.setItem('edutrack-theme', 'dark');
    }
}

console.log('🌓 Theme switcher ready!');