// Hanging ID badge: flips on click, tilts toward the cursor
document.addEventListener('DOMContentLoaded', () => {
    const lanyard = document.getElementById('lanyard');
    const badge = document.getElementById('badge');
    const hero = document.querySelector('.split-hero--badge');
    if (!lanyard || !badge || !hero) return;

    const front = badge.querySelector('.badge-front');
    const back = badge.querySelector('.badge-back');

    const setFlipped = (flipped) => {
        lanyard.classList.toggle('is-flipped', flipped);
        // Only the visible face can be tabbed into or read out
        front.inert = flipped;
        back.inert = !flipped;
        (flipped ? back : front).querySelector('.badge-flip').focus({ preventScroll: true });
    };

    badge.addEventListener('click', (e) => {
        // Links on the back keep working; anywhere else on the card flips it
        if (e.target.closest('a')) return;
        setFlipped(!lanyard.classList.contains('is-flipped'));
    });

    // The strap swings from the top of the hero, so pivot there
    const setPivot = () => {
        // offsetTop ignores transforms, so the drop-in animation can't skew this
        const offset = lanyard.parentElement.offsetTop + lanyard.offsetTop;
        lanyard.style.setProperty('--pivot', `${offset}px`);
    };
    setPivot();
    window.addEventListener('resize', setPivot);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    badge.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = badge.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        badge.style.setProperty('--ry', `${x * 14}deg`);
        badge.style.setProperty('--rx', `${y * -14}deg`);
    });

    badge.addEventListener('pointerleave', () => {
        badge.style.setProperty('--ry', '0deg');
        badge.style.setProperty('--rx', '0deg');
    });
});
