// Skills Animation
class SkillsAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.createFloatingIcons();
        this.animateCardsEntry();
    }

    animateCardsEntry() {
        const skillCards = document.querySelectorAll('.skill-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered fade in
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        skillCards.forEach(card => {
            // Set initial state for animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease-out';
            observer.observe(card);
        });
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
                z-index: 0;
            `;

            // Random positioning
            iconElement.style.left = Math.random() * 80 + 10 + '%';
            iconElement.style.top = Math.random() * 80 + 10 + '%';

            if (skillsSection.style.position !== 'relative') {
                skillsSection.style.position = 'relative';
            }
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
`;
document.head.appendChild(skillStyle);
