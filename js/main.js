document.addEventListener('DOMContentLoaded', () => {
    addFloatingBlobs();
    initScrollReveal();
    initNavHighlight();
    initMobileNav();
    initHomeSnowballEasterEgg();
    initThemeToggle();
});

function initThemeToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    const storedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;

    applyTheme(shouldUseDark);

    toggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        applyTheme(!isDark);
    });

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀️' : '🌙';
        toggle.querySelector('.theme-toggle-label').textContent = isDark ? 'Light' : 'Dark';
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    }
}

function initHomeSnowballEasterEgg() {
    const photo = document.getElementById('heroPhoto');
    if (!photo) return;

    photo.addEventListener('click', () => {
        const snowball = document.createElement('img');
        snowball.src = './img/captain-snowball.webp';
        snowball.alt = 'Snowball flying by';
        snowball.className = 'snowball-flyby';
        snowball.style.left = '0px';
        snowball.style.top = `${Math.random() * 60 + 20}%`;
        document.body.appendChild(snowball);

        setTimeout(() => snowball.remove(), 3000);
    });
}

function addFloatingBlobs() {
    if (document.querySelector('.floating-blob')) return;

    const blobs = [
        { class: 'blob-1' },
        { class: 'blob-2' },
        { class: 'blob-3' }
    ];

    blobs.forEach(({ class: cls }) => {
        const blob = document.createElement('div');
        blob.className = `floating-blob ${cls}`;
        document.body.appendChild(blob);
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.hero, .skills-category-card, .featured-card, .project-card, ' +
        '.intro-profile, .timeline-item, .interest-card, .stat-card, .contact-form'
    );

    elements.forEach((el, i) => {
        el.classList.add('reveal');
        el.dataset.revealIndex = String(i % 6);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initNavHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `./${currentPage}` || href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-links');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
