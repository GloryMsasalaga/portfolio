// Main JavaScript functionality
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.initScrollEffects();
    }

    bindEvents() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Back to top button functionality
        this.initBackToTop();

        // Contact form handling
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Service order form handling
        const serviceOrderForm = document.getElementById('service-order-form');
        if (serviceOrderForm) {
            serviceOrderForm.addEventListener('submit', (e) => this.handleServiceOrderForm(e));
        }
    }

    initAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-card, .project-card, .service-card').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    initScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Progress bar animations
        this.animateProgressBars();
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('aria-valuenow');
                    progressBar.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }

    async handleContactForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const response = await fetch('/api/contact/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': this.getCSRFToken()
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                this.showAlert('success', data.message);
                form.reset();
            } else {
                this.showAlert('danger', 'There was an error sending your message.');
            }
        } catch (error) {
            this.showAlert('danger', 'There was an error sending your message.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleServiceOrderForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            const response = await fetch('/api/service-order/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': this.getCSRFToken()
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                this.showAlert('success', data.message);
                form.reset();
            } else {
                this.showAlert('danger', 'There was an error submitting your order.');
            }
        } catch (error) {
            this.showAlert('danger', 'There was an error submitting your order.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    getCSRFToken() {
        return document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';
    }

    showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
            
            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }
}

// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .navbar.scrolled {
        background: rgba(17, 24, 39, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .alert {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
    }
`;
document.head.appendChild(style);
