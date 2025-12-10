// Three-Theme Management System
class ThemeManager {
    constructor() {
        this.themes = ['default', 'dark', 'light'];
        this.currentThemeIndex = 0;
        
        // Load saved theme or default
        const savedTheme = localStorage.getItem('theme') || 'default';
        this.currentThemeIndex = this.themes.indexOf(savedTheme);
        if (this.currentThemeIndex === -1) this.currentThemeIndex = 0;
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    getCurrentTheme() {
        return this.themes[this.currentThemeIndex];
    }

    applyTheme() {
        const theme = this.getCurrentTheme();
        
        // Apply theme attribute (default doesn't need attribute)
        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        // Update toggle button icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                // Cycle through icons for the three themes
                switch (theme) {
                    case 'default':
                        icon.className = 'fas fa-adjust';
                        break;
                    case 'dark':
                        icon.className = 'fas fa-sun';
                        break;
                    case 'light':
                        icon.className = 'fas fa-moon';
                        break;
                }
            }
        }
    }

    toggleTheme() {
        // Cycle through all three themes
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        const newTheme = this.getCurrentTheme();
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
        this.applyTheme();
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme: newTheme, themes: this.themes, index: this.currentThemeIndex } 
        }));
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
