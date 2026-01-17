/**
 * CINEMATIC SCROLL EXPERIENCE
 * Video Hero + Avatar Parallax + Flip Cards
 * Using GSAP ScrollTrigger
 */

// Wait for DOM and libraries to load
document.addEventListener("DOMContentLoaded", () => {
    // Check if required libraries are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP libraries not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ========== MOBILE DETECTION ========== //
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // ========== SECTION 1: HERO VIDEO SCROLL ========== //
    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.getElementById('hero-video-section');
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');

    if (heroSection && !isMobile && heroVideo) {
        // Ensure video is ready
        heroVideo.addEventListener('loadedmetadata', () => {
            const videoDuration = heroVideo.duration;
            
            // Pin the hero section
            ScrollTrigger.create({
                trigger: heroSection,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
                markers: false
            });

            // Scrub video playback with scroll
            gsap.to(heroVideo, {
                currentTime: videoDuration,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    markers: false
                }
            });

            // Zoom video slightly forward
            gsap.to(heroVideo, {
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Fade in hero text
        gsap.fromTo(heroName, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.5,
                ease: "power2.out",
                delay: 0.5
            }
        );

        gsap.fromTo(heroTagline,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.8
            }
        );

        // Fade out text on scroll
        gsap.to([heroName, heroTagline], {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: heroSection,
                start: "top top",
                end: "50% top",
                scrub: 1
            }
        });
    } else if (heroSection) {
        // Mobile: Just fade in text without video
        gsap.fromTo([heroName, heroTagline],
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.3
            }
        );
    }

    // ========== SECTION 2: AVATAR PARALLAX ========== //
    const avatarSection = document.querySelector('#avatar-section');
    const cartoonAvatar = document.querySelector('#cartoon-avatar');
    const avatarIntro = document.querySelector('#avatar-intro');

    if (avatarSection && cartoonAvatar) {
        // Scale and fade avatar on entry
        gsap.fromTo(cartoonAvatar,
            { scale: 0.9, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: avatarSection,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1
                }
            }
        );

        // Parallax depth effect
        gsap.to(cartoonAvatar, {
            y: -50,
            scrollTrigger: {
                trigger: avatarSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });

        // 3D tilt on mouse move (desktop only)
        if (!isMobile) {
            avatarSection.addEventListener('mousemove', (e) => {
                const rect = avatarSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(cartoonAvatar, {
                    rotateY: x * 15,
                    rotateX: -y * 15,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            avatarSection.addEventListener('mouseleave', () => {
                gsap.to(cartoonAvatar, {
                    rotateY: 0,
                    rotateX: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        }

        // Fade in intro text
        if (avatarIntro) {
            gsap.fromTo(avatarIntro,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: avatarSection,
                        start: "top 60%",
                        end: "top 30%",
                        scrub: 1
                    }
                }
            );
        }
    }

    // ========== FLIP CARDS SYSTEM ========== //
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach((card, index) => {
        // Initial state
        gsap.set(card, {
            opacity: 0,
            y: 100
        });

        // Fade in and move up
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 1
            }
        });

        // Flip card on scroll
        ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => card.classList.add('flipped'),
            onLeaveBack: () => card.classList.remove('flipped'),
            markers: false
        });

        // Add perspective animation
        gsap.to(card, {
            rotateY: 0,
            scrollTrigger: {
                trigger: card,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
            }
        });
    });

    // ========== PARALLAX PROJECTS ========== //
    const projectCards = document.querySelectorAll('.parallax-project-card');

    projectCards.forEach((card, index) => {
        const depth = parseInt(card.dataset.parallaxDepth) || 1;
        
        // Stagger fade in
        gsap.fromTo(card,
            { opacity: 0, y: 80, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax movement based on depth
        gsap.to(card, {
            y: -30 * depth,
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });

        // Glow on hover
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                boxShadow: "0 30px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(106, 0, 255, 0.6)",
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(106, 0, 255, 0.2)",
                duration: 0.3
            });
        });
    });

    // ========== SKILL PROGRESS BARS ========== //
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        gsap.set(bar, { width: 0 });
        
        gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // ========== SMOOTH SCROLL ENHANCEMENT ========== //
    // Smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }
        });
    });

    // ========== NAVBAR BACKGROUND ON SCROLL ========== //
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: "100 top",
            end: 99999,
            toggleClass: {
                targets: navbar,
                className: "scrolled"
            },
            onUpdate: (self) => {
                if (self.progress > 0) {
                    navbar.style.background = 'rgba(11, 11, 15, 0.95)';
                    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
                } else {
                    navbar.style.background = 'rgba(11, 11, 15, 0.7)';
                    navbar.style.boxShadow = 'none';
                }
            }
        });
    }

    // ========== PERFORMANCE OPTIMIZATION ========== //
    // Refresh ScrollTrigger on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

    // Initial refresh
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    console.log('🎬 Cinematic scroll experience initialized');
});
