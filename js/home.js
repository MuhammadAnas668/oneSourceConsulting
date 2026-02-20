// =====================================================
// HOME PAGE SPECIFIC SCRIPTS
// =====================================================

(function () {
    const counters = document.querySelectorAll('.counter');

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const current = parseInt(counter.innerText, 10) || 0;
        const suffix = counter.getAttribute('data-suffix') || '';
        const increment = Math.max(1, Math.ceil(target / 45));

        if (current < target) {
            counter.innerText = Math.min(target, current + increment);
            setTimeout(function () {
                animateCounter(counter);
            }, 20);
        } else {
            counter.innerText = target + suffix;
        }
    }

    if (counters.length) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    animateCounter(counter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.45 });

        counters.forEach(function (counter) {
            const originalText = counter.textContent || '';
            const suffix = originalText.replace(/[0-9]/g, '').trim();
            if (suffix) {
                counter.setAttribute('data-suffix', suffix);
            }
            observer.observe(counter);
        });
    }

    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-kicker', { opacity: 0, y: 16, duration: 0.6 })
        .from('.hero-title', { opacity: 0, y: 28, duration: 0.7 }, '-=0.3')
        .from('.hero-text', { opacity: 0, y: 24, duration: 0.6 }, '-=0.35')
        .from('.hero-actions', { opacity: 0, y: 18, duration: 0.55 }, '-=0.35')
        .from('.hero-media', { opacity: 0, scale: 0.96, y: 18, duration: 0.75 }, '-=0.45');

    gsap.utils.toArray('.reveal-item').forEach(function (card, index) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 26,
            duration: 0.62,
            delay: index * 0.04
        });
    });
})();
