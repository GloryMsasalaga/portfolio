document.addEventListener("DOMContentLoaded", () => {
    // Check if required libraries are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.error('Required libraries not loaded');
        return;
    }

    // 1. Register GSAP ScrollTrigger FIRST
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false
    });

    // 3. Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 4. Hero Animations (Parallax Zoom) - Only if hero-wrapper exists
    const heroWrapper = document.querySelector(".hero-wrapper");
    if (heroWrapper) {
        const tlHero = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-wrapper",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true
            }
        });

        // Zoom out the entire hero wrapper
        tlHero.to(".hero-wrapper", {
            scale: 0.8,
            opacity: 0.3,
            ease: "power1.inOut"
        }, 0);

        // Move hero text up and fade
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            tlHero.to(".hero-title", {
                y: -150,
                opacity: 0,
                scale: 0.85,
                ease: "power1.inOut"
            }, 0);
        }

        const heroSubtitle = document.querySelector(".hero-subtitle");
        if (heroSubtitle) {
            tlHero.to(".hero-subtitle", {
                y: -100,
                opacity: 0,
                ease: "power1.inOut"
            }, 0);
        }

        const heroBtn = document.getElementById("hero-btn");
        if (heroBtn) {
            tlHero.to("#hero-btn", {
                y: -80,
                opacity: 0,
                ease: "power1.inOut"
            }, 0);
        }
    }

    // 5. Glass Cards "Stacking/Flip" Effect
    const cards = gsap.utils.toArray(".glass-card");

    if (cards.length > 0) {
        cards.forEach((card, i) => {
            // Initial state for cards
            gsap.set(card, {
                y: 100,
                opacity: 0,
                rotationX: -5
            });

            gsap.to(card, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "top 60%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true
                }
            });
        });
    }

    // 6. Parallax for Background Glows (Micro interaction)
    const heroGlow = document.querySelector(".hero-bg-glow");
    if (heroGlow) {
        window.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            gsap.to(".hero-bg-glow", {
                x: x,
                y: y,
                duration: 2,
                ease: "power2.out"
            });
        });
    }

    // 7. Navbar Blur on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(11, 11, 15, 0.9)';
                navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(11, 11, 15, 0.7)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // 8. Refresh ScrollTrigger after everything is set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});
