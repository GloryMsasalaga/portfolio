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

    const show = (next) => {
        index = (next + roles.length) % roles.length;
        word.textContent = roles[index].word;
        tag.textContent = roles[index].tag;
        // Restart the fade-in on every change
        word.classList.remove('is-swapping');
        void word.offsetWidth;
        word.classList.add('is-swapping');
    };

    hero.querySelector('.seam-prev').addEventListener('click', () => show(index - 1));
    hero.querySelector('.seam-next').addEventListener('click', () => show(index + 1));

    let startX = null;
    hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
        startX = null;
    });
});
