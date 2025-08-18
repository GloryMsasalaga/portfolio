// Skills Animation
class SkillsAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.animateSkillBars();
        this.createFloatingIcons();
    }

    animateSkillBars() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCard(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillCards.forEach(card => observer.observe(card));
    }

    animateCard(card) {
        const progressBar = card.querySelector('.progress-bar');
        const proficiency = progressBar.getAttribute('aria-valuenow');
        
        // Animate progress bar
        let currentWidth = 0;
        const targetWidth = parseInt(proficiency);
        const increment = targetWidth / 60; // 60 frames for smooth animation
        
        const animate = () => {
            currentWidth += increment;
            if (currentWidth >= targetWidth) {
                currentWidth = targetWidth;
                progressBar.style.width = currentWidth + '%';
                return;
            }
            
            progressBar.style.width = currentWidth + '%';
            requestAnimationFrame(animate);
        };
        
        // Start animation after a small delay
        setTimeout(animate, Math.random() * 500);
        
        // Add pulsing effect
        card.style.animation = 'skillPulse 0.6s ease-out';
    }

    createFloatingIcons() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const icons = [
            'fab fa-python',
            'fab fa-js-square',
            'fab fa-react',
            'fab fa-node-js',
            'fas fa-brain',
            'fas fa-robot',
            'fab fa-docker',
            'fab fa-aws'
        ];

        icons.forEach((icon, index) => {
            const iconElement = document.createElement('i');
            iconElement.className = icon + ' floating-icon';
            iconElement.style.cssText = `
                position: absolute;
                font-size: 2rem;
                color: var(--primary-color);
                opacity: 0.1;
                animation: float 6s ease-in-out infinite;
                animation-delay: ${index * 0.5}s;
                pointer-events: none;
                z-index: -1;
            `;
            
            // Random positioning
            iconElement.style.left = Math.random() * 80 + 10 + '%';
            iconElement.style.top = Math.random() * 80 + 10 + '%';
            
            skillsSection.style.position = 'relative';
            skillsSection.appendChild(iconElement);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SkillsAnimation();
});

// Add CSS for skill animations
const skillStyle = document.createElement('style');
skillStyle.textContent = `
    @keyframes skillPulse {
        0% {
            transform: scale(1);
            box-shadow: var(--shadow);
        }
        50% {
            transform: scale(1.05);
            box-shadow: var(--shadow-lg);
        }
        100% {
            transform: scale(1);
            box-shadow: var(--shadow);
        }
    }

    .floating-icon {
        animation: float 6s ease-in-out infinite !important;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        33% {
            transform: translateY(-20px) rotate(5deg);
        }
        66% {
            transform: translateY(10px) rotate(-3deg);
        }
    }

    .skill-card:hover {
        animation: none !important;
    }

    .progress-bar {
        position: relative;
        overflow: hidden;
    }

    .progress-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shine 2s infinite;
    }

    @keyframes shine {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`;
document.head.appendChild(skillStyle);
