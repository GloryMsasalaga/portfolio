// Two-tone hero: the seam arrows (and swipes) cycle through roles
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.split-hero');
    const word = document.getElementById('hero-role');
    const tag = document.getElementById('hero-role-tag');
    if (!hero || !word || !tag) return;

    const roles = [
        { word: 'Systems Integrator', tag: 'AT : INVENTIONS TECHNOLOGIES' },
        { word: 'AI Engineer', tag: 'FOCUS : MACHINE LEARNING' },
        { word: 'Full Stack', tag: 'STACK : DJANGO + REACT' },
        { word: 'Researcher', tag: 'FIELD : APPLIED AI' },
        { word: 'Tanzania', tag: 'BASED IN : DAR ES SALAAM' }
    ];
    let index = 0;

    const INTERVAL = 3200;
    let timer = null;
    let hovering = false;
    let focused = false;
    let visible = true;

    const show = (next, { auto = false } = {}) => {
        index = (next + roles.length) % roles.length;
        // Announce changes the visitor asked for, not every automatic tick
        word.setAttribute('aria-live', auto ? 'off' : 'polite');
        word.textContent = roles[index].word;
        tag.textContent = roles[index].tag;
        // Restart the fade-in on every change
        word.classList.remove('is-swapping');
        void word.offsetWidth;
        word.classList.add('is-swapping');
    };

    // Autoplay: runs only while the hero is on screen and not being interacted with
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const stop = () => {
        clearInterval(timer);
        timer = null;
    };

    const sync = () => {
        const shouldRun = !reducedMotion && visible && !hovering && !focused && !document.hidden;
        if (shouldRun && !timer) {
            timer = setInterval(() => show(index + 1, { auto: true }), INTERVAL);
        } else if (!shouldRun && timer) {
            stop();
        }
    };

    // A manual change restarts the countdown so the next word doesn't arrive too soon
    const manual = (next) => {
        show(next);
        stop();
        sync();
    };

    hero.querySelector('.seam-prev').addEventListener('click', () => manual(index - 1));
    hero.querySelector('.seam-next').addEventListener('click', () => manual(index + 1));

    let startX = null;
    hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) manual(index + (dx < 0 ? 1 : -1));
        startX = null;
    });

    // The hero fills the screen, so only pause while hovering the role itself or the arrows
    [word.parentElement, ...hero.querySelectorAll('.seam-btn')].forEach((el) => {
        el.addEventListener('mouseenter', () => { hovering = true; sync(); });
        el.addEventListener('mouseleave', () => { hovering = false; sync(); });
    });
    // Pause for keyboard users; a mouse click on an arrow shouldn't freeze the rotation
    hero.addEventListener('focusin', (e) => {
        if (e.target.matches(':focus-visible')) { focused = true; sync(); }
    });
    hero.addEventListener('focusout', (e) => {
        if (!hero.contains(e.relatedTarget)) { focused = false; sync(); }
    });
    document.addEventListener('visibilitychange', sync);

    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
    }, { threshold: 0.3 }).observe(hero);

    sync();
});
