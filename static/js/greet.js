// "Hello" cycles through greetings in other languages
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('greet');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const greetings = [
        { text: 'Hello', lang: 'en' },
        { text: 'Habari', lang: 'sw' },
        { text: 'Nǐ hǎo', lang: 'zh-Latn' },
        { text: 'Bonjour', lang: 'fr' },
        { text: 'Hola', lang: 'es' },
        { text: 'Ciao', lang: 'it' },
        { text: 'Hallo', lang: 'de' },
        { text: 'Olá', lang: 'pt' },
        { text: 'Konnichiwa', lang: 'ja-Latn' },
        { text: 'Marhaba', lang: 'ar-Latn' }
    ];
    const INTERVAL = 2200;
    let index = 0;
    let timer = null;

    const next = () => {
        index = (index + 1) % greetings.length;
        el.textContent = greetings[index].text;
        el.lang = greetings[index].lang;
        // Restart the fade-in on every change
        el.classList.remove('is-swapping');
        void el.offsetWidth;
        el.classList.add('is-swapping');
    };

    // Only cycle while the heading is on screen and the tab is visible
    let visible = false;
    const sync = () => {
        const run = visible && !document.hidden;
        if (run && !timer) timer = setInterval(next, INTERVAL);
        if (!run && timer) { clearInterval(timer); timer = null; }
    };

    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
    }).observe(el);
    document.addEventListener('visibilitychange', sync);
});
