document.addEventListener("DOMContentLoaded", () => {
    // Check if required libraries are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.error('Required libraries not loaded');
        return;
    }

    // Respect visitors who prefer less motion: content stays fully visible
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // 1. Register GSAP ScrollTrigger FIRST
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false
    });

    // 3. Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 4. Hero entrance: lines rise in one after another
    const hero = document.querySelector(".hero");
    if (hero) {
        gsap.from(".split-hero .split-center > *", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08
        });

        // The wordmarks drift apart as you scroll away from the split
        gsap.to(".split-hero .split-top .split-center", {
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
        });

        gsap.to(".split-hero .split-bottom .split-center", {
            y: 40,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
        });
    }

    // 5. Reveal sections as they enter the viewport
    gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true
            }
        });
    });

    // 6. Refresh ScrollTrigger after everything is set up
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});
