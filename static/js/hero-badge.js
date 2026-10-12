// Hanging ID badge: a small spring simulation so it can be dragged, flung and bounce back.
// Click (without dragging) flips it; the mouse tilts it slightly.
document.addEventListener('DOMContentLoaded', () => {
    const lanyard = document.getElementById('lanyard');
    const card = document.getElementById('lanyard-card');
    const strap = document.getElementById('lanyard-strap');
    const hook = document.getElementById('lanyard-hook');
    const badge = document.getElementById('badge');
    if (!lanyard || !card || !strap || !hook || !badge) return;

    const front = badge.querySelector('.badge-front');
    const back = badge.querySelector('.badge-back');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Flip ----------
    const setFlipped = (flipped) => {
        lanyard.classList.toggle('is-flipped', flipped);
        // Only the visible face can be tabbed into or read out
        front.inert = flipped;
        back.inert = !flipped;
        (flipped ? back : front).querySelector('.badge-flip').focus({ preventScroll: true });
    };

    let suppressClick = false;
    badge.addEventListener('click', (e) => {
        // A drag that ends on the card is not a click
        if (suppressClick) {
            suppressClick = false;
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        // Links on the back keep working; anywhere else on the card flips it
        if (e.target.closest('a')) return;
        setFlipped(!lanyard.classList.contains('is-flipped'));
    }, true);

    // ---------- Geometry ----------
    // pivot: distance from the card's top up to the top of the hero, where the strap hangs from.
    // hookTop: where the strap meets the hardware, relative to the card's top (negative = above).
    let pivot = 0;
    let hookTop = 0;
    const measure = () => {
        // offsetTop ignores transforms, so the current swing can't skew this
        pivot = lanyard.parentElement.offsetTop + lanyard.offsetTop;
        hookTop = hook.offsetTop;
        card.style.transformOrigin = `50% ${hookTop}px`;
        strap.style.top = `${-pivot}px`;
    };

    // ---------- State ----------
    // x, y: card offset from its resting place (px). angle: card rotation (deg).
    const s = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, va: 0 };

    const render = () => {
        // Strap: from the anchor (0, -pivot) to the hook (x, y + hookTop)
        const dx = s.x;
        const dy = s.y + hookTop + pivot;
        const length = Math.max(0, Math.hypot(dx, dy));
        const strapAngle = -Math.atan2(dx, dy) * (180 / Math.PI);
        strap.style.height = `${length}px`;
        strap.style.transform = `rotate(${strapAngle}deg)`;
        card.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.angle}deg)`;
        return strapAngle;
    };

    measure();
    render();
    window.addEventListener('resize', () => { measure(); render(); });

    // Reduced motion: it hangs still, still flips, no dragging or swinging
    if (reducedMotion) return;

    // ---------- Physics ----------
    const SPRING = 95;        // pull back to rest (higher = snappier)
    const DAMPING = 6.5;      // lower = more bounce
    const SWING_SPRING = 70;  // card turning to follow the strap
    const SWING_DAMPING = 5.5;

    let dragging = false;
    let running = false;
    let last = 0;
    let time = 0;

    const step = (now) => {
        if (!running) return;
        const dt = Math.min((now - last) / 1000, 1 / 30);
        last = now;
        time += dt;

        if (!dragging) {
            // Gentle idle sway around the resting point
            const tx = Math.sin(time * 0.9) * 5;
            s.vx += (-SPRING * (s.x - tx) - DAMPING * s.vx) * dt;
            s.vy += (-SPRING * s.y - DAMPING * s.vy) * dt;
            s.x += s.vx * dt;
            s.y += s.vy * dt;
        }

        // The card hangs in line with the strap, lagging a little behind sideways motion
        const strapAngle = -Math.atan2(s.x, s.y + hookTop + pivot) * (180 / Math.PI);
        const target = strapAngle + Math.max(-25, Math.min(25, s.vx * 0.02));
        s.va += (-SWING_SPRING * (s.angle - target) - SWING_DAMPING * s.va) * dt;
        s.angle += s.va * dt;

        render();
        requestAnimationFrame(step);
    };

    const start = () => {
        if (running) return;
        running = true;
        last = performance.now();
        requestAnimationFrame(step);
    };
    const stop = () => { running = false; };

    // Only animate while the hero is on screen and the tab is visible
    let visible = true;
    const sync = () => (visible && !document.hidden ? start() : stop());
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(lanyard);
    document.addEventListener('visibilitychange', sync);

    // Drop in from above on load and bounce into place
    s.y = -Math.min(pivot * 0.8, 320);
    s.vy = 0;
    sync();

    // ---------- Drag ----------
    let grab = null;
    badge.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 || e.target.closest('a, button')) return;
        grab = {
            id: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            offX: e.clientX - s.x,
            offY: e.clientY - s.y,
            moved: false,
            lastX: e.clientX,
            lastY: e.clientY,
            lastT: performance.now()
        };
        badge.setPointerCapture(e.pointerId);
    });

    badge.addEventListener('pointermove', (e) => {
        if (!grab || e.pointerId !== grab.id) return;
        if (!grab.moved && Math.hypot(e.clientX - grab.startX, e.clientY - grab.startY) < 6) return;
        if (!grab.moved) {
            grab.moved = true;
            dragging = true;
            lanyard.classList.add('is-dragging');
            badge.style.setProperty('--rx', '0deg');
            badge.style.setProperty('--ry', '0deg');
        }

        let x = e.clientX - grab.offX;
        let y = Math.max(e.clientY - grab.offY, -pivot * 0.55);

        // The strap stretches a little, then resists
        const rest = pivot + hookTop;
        const ax = x;
        const ay = y + rest;
        const len = Math.hypot(ax, ay);
        const max = rest * 1.15;
        if (len > max) {
            const k = (max + (len - max) * 0.25) / len;
            x = ax * k;
            y = ay * k - rest;
        }

        // Track velocity so letting go mid-move flings the card
        const now = performance.now();
        const dt = Math.max((now - grab.lastT) / 1000, 1 / 240);
        s.vx = 0.8 * s.vx + 0.2 * ((x - s.x) / dt);
        s.vy = 0.8 * s.vy + 0.2 * ((y - s.y) / dt);
        grab.lastT = now;
        s.x = x;
        s.y = y;
    });

    const release = (e) => {
        if (!grab || e.pointerId !== grab.id) return;
        if (grab.moved) {
            suppressClick = true;
            // Held still before letting go: just drop, don't fling
            if (performance.now() - grab.lastT > 80) {
                s.vx = 0;
                s.vy = 0;
            }
            // A fling shouldn't launch it into orbit
            const cap = 2600;
            s.vx = Math.max(-cap, Math.min(cap, s.vx));
            s.vy = Math.max(-cap, Math.min(cap, s.vy));
        }
        dragging = false;
        lanyard.classList.remove('is-dragging');
        grab = null;
        // If the click never comes (released off the card), don't swallow the next one
        setTimeout(() => { suppressClick = false; }, 0);
    };
    badge.addEventListener('pointerup', release);
    badge.addEventListener('pointercancel', release);

    // ---------- Tilt toward the mouse ----------
    badge.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || dragging) return;
        const r = badge.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        badge.style.setProperty('--ry', `${x * 14}deg`);
        badge.style.setProperty('--rx', `${y * -14}deg`);
    });

    badge.addEventListener('pointerleave', () => {
        if (dragging) return;
        badge.style.setProperty('--ry', '0deg');
        badge.style.setProperty('--rx', '0deg');
    });
});
