/* ============================================
   EVENTSPHERE LANDING — landing.js
============================================ */

/* ---- Starfield Canvas ---- */
(function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    const STAR_COUNT = 180;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStar() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.2,
            alpha: Math.random() * 0.6 + 0.1,
            speed: Math.random() * 0.003 + 0.001,
            phase: Math.random() * Math.PI * 2,
        };
    }

    function initStars() {
        stars = Array.from({ length: STAR_COUNT }, createStar);
    }

    function drawStars(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            const alpha = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 190, 255, ${alpha})`;
            ctx.fill();
        });
    }

    let raf;
    function animate(t) {
        drawStars(t);
        raf = requestAnimationFrame(animate);
    }

    resize();
    initStars();
    requestAnimationFrame(animate);
    window.addEventListener('resize', () => { resize(); initStars(); });
})();


/* ---- Navbar scroll effect ---- */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();


/* ---- Hamburger / Mobile Menu ---- */
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        // Animate spans
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => {
                s.style.transform = '';
                s.style.opacity = '';
            });
        });
    });
})();


/* ---- Scroll Reveal (IntersectionObserver) ---- */
(function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger siblings in same parent
                const siblings = entry.target.parentElement.querySelectorAll('.scroll-reveal');
                let delay = 0;
                siblings.forEach((el, idx) => {
                    if (el === entry.target) delay = idx * 80;
                });
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();


/* ---- Smooth scroll for anchor links ---- */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();


/* ---- Mockup card hover interaction ---- */
(function initMockupInteraction() {
    const events = document.querySelectorAll('.mockup-event');
    if (!events.length) return;

    events.forEach(evt => {
        evt.addEventListener('mouseenter', () => {
            events.forEach(e => e.classList.remove('active'));
            evt.classList.add('active');
        });
    });
})();


/* ---- Stats counter animation ---- */
(function initCounters() {
    const stats = document.querySelectorAll('.stat-num');
    if (!stats.length) return;

    const targets = {
        '10k+': 10000,
        '50k+': 50000,
        '98%': 98,
    };

    function animateCounter(el, end, suffix, duration = 1800) {
        let start = 0;
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * end);

            if (end >= 1000) {
                el.textContent = (current / 1000).toFixed(current < 1000 ? 0 : 0) + 'k' + suffix;
            } else {
                el.textContent = current + suffix;
            }

            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                if (text === '10k+') animateCounter(el, 10000, '+');
                else if (text === '50k+') animateCounter(el, 50000, '+');
                else if (text === '98%') animateCounter(el, 98, '%');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
})();


/* ---- Parallax glow on mouse move ---- */
(function initParallax() {
    const glow = document.querySelector('.hero-glow');
    const glow2 = document.querySelector('.hero-glow--2');
    if (!glow) return;

    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 30;
        my = (e.clientY / window.innerHeight - 0.5) * 30;
    });

    function tick() {
        cx += (mx - cx) * 0.05;
        cy += (my - cy) * 0.05;
        glow.style.transform = `translate(calc(-30% + ${cx}px), calc(-50% + ${cy}px))`;
        if (glow2) glow2.style.transform = `translate(calc(20% + ${cx * 0.6}px), calc(-30% + ${cy * 0.6}px))`;
        requestAnimationFrame(tick);
    }
    tick();
})();