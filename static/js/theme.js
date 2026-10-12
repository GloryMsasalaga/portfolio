// Light / dark theme toggle (follows the OS setting until the visitor picks one)
class ThemeManager {
    constructor() {
        this.media = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggle = document.getElementById('theme-toggle');
        this.updateIcon();
        this.bindEvents();
    }

    getSavedTheme() {
        try {
            const saved = localStorage.getItem('theme');
            return saved === 'light' || saved === 'dark' ? saved : null;
        } catch (e) {
            return null;
        }
    }

    getCurrentTheme() {
        return this.getSavedTheme() || (this.media.matches ? 'dark' : 'light');
    }

    updateIcon() {
        if (!this.toggle) return;
        const isDark = this.getCurrentTheme() === 'dark';
        const icon = this.toggle.querySelector('i');
        if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        this.toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    toggleTheme() {
        const newTheme = this.getCurrentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {}
        this.updateIcon();

        window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
    }

    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
        this.media.addEventListener('change', () => this.updateIcon());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
