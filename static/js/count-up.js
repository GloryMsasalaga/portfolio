// Numbers count up from zero the first time they scroll into view
document.addEventListener('DOMContentLoaded', () => {
    const els = document.querySelectorAll('[data-count-up]');
    if (!els.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) return;

    const DURATION = 1800;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const run = (el, target, prefix, suffix) => {
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min((now - start) / DURATION, 1);
            el.textContent = prefix + Math.round(target * easeOut(t)) + suffix;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            const { target, prefix, suffix } = entry.target._count;
            run(entry.target, target, prefix, suffix);
        });
    }, { threshold: 0.5 });

    els.forEach((el) => {
        // Split "30+" / "100%" into the number and whatever surrounds it
        const match = el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/);
        if (!match) return;
        const [, prefix, digits, suffix] = match;

        // Screen readers get the final value once, not every frame
        const label = document.createElement('span');
        label.className = 'visually-hidden';
        label.textContent = el.textContent.trim();
        el.after(label);
        el.setAttribute('aria-hidden', 'true');

        el._count = { target: Number(digits), prefix, suffix };
        el.textContent = prefix + '0' + suffix;
        observer.observe(el);
    });
});
