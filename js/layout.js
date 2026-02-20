// =====================================================
// SHARED LAYOUT LOADER
// =====================================================

(function () {
    const headerFallback = `
<header class="site-header">
    <nav class="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo" aria-label="Onesource home">
                <img src="assets/images/onesource-logo.svg" alt="Onesource logo" class="logo-mark">
                <span class="logo-lockup">
                    <span class="logo-text">OneSource</span>
                    <span class="logo-sub">Digital Consulting</span>
                </span>
            </a>
            <div class="nav-menu">
                <a href="index.html" class="nav-link" data-page="home">Home</a>
                <a href="book-online.html" class="nav-link" data-page="book-online">Book Online</a>
                <a href="blog.html" class="nav-link" data-page="blog">Blog</a>
                <a href="notifications.html" class="nav-link" data-page="notifications">Notifications</a>
                <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
            </div>
            <div class="nav-right">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
                    <span class="theme-icon" aria-hidden="true">&#9789;</span>
                    <span class="theme-label">Dark</span>
                </button>
                <a class="nav-cta" href="book-online.html">Book Session</a>
                <button class="mobile-menu-btn" aria-label="Open menu"><i class="fas fa-bars"></i></button>
            </div>
        </div>
    </nav>
    <div class="mobile-menu hidden">
        <a href="index.html" data-page="home">Home</a>
        <a href="book-online.html" data-page="book-online">Book Online</a>
        <a href="blog.html" data-page="blog">Blog</a>
        <a href="notifications.html" data-page="notifications">Notifications</a>
        <a href="contact.html" data-page="contact">Contact</a>
        <a href="book-online.html" class="mobile-cta">Book Session</a>
    </div>
</header>`;

    const footerFallback = `
<footer class="site-footer">
    <div class="footer-wrapper">
        <div class="footer-brand">
            <a href="index.html" class="footer-brand-link">
                <img src="assets/images/onesource-logo.svg" alt="Onesource logo" class="footer-logo">
                <div>
                    <span class="footer-brand-title">OneSource Consulting</span>
                    <span class="footer-brand-sub">AI, Cloud and Healthcare Transformation</span>
                </div>
            </a>
            <p class="footer-description">We help enterprises modernize operations through AI adoption, resilient cloud platforms, cybersecurity strategy, and revenue cycle optimization.</p>
            <div class="footer-social">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="X"><i class="fab fa-x-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="footer-links-col">
            <h4>Company</h4>
            <a href="index.html">Home</a>
            <a href="book-online.html">Book Online</a>
            <a href="blog.html">Blog</a>
            <a href="notifications.html">Notifications</a>
            <a href="contact.html">Contact</a>
        </div>
        <div class="footer-links-col">
            <h4>Services</h4>
            <a href="book-online.html">AI Integration Workshop</a>
            <a href="book-online.html">Cybersecurity Audit</a>
            <a href="book-online.html">RCM Consultation</a>
            <a href="book-online.html">Cloud Roadmap Planning</a>
        </div>
        <div class="footer-contact">
            <h4>Contact</h4>
            <p>Business District, Karachi</p>
            <p>+92 21 1234 5678</p>
            <p>info@onesource.pk</p>
            <p>Mon-Fri, 9:00 AM - 6:00 PM</p>
        </div>
        <div class="footer-newsletter">
            <h4>Strategy Brief</h4>
            <p>Get practical transformation insights and implementation checklists every week.</p>
            <form class="footer-news-form">
                <input type="email" placeholder="Your work email" aria-label="Work email">
                <button type="submit">Join</button>
            </form>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <span id="footer-year"></span> Onesource Consulting. All rights reserved.</p>
    </div>
</footer>`;

    async function insertPartial(containerId, filePath, fallbackMarkup) {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const response = await fetch(filePath, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Fetch failed');
            }
            container.innerHTML = await response.text();
        } catch (error) {
            container.innerHTML = fallbackMarkup;
        }
    }

    function activateCurrentPage() {
        const page = document.body.getAttribute('data-page') || '';
        if (!page) return;

        document.querySelectorAll('.nav-link[data-page], .mobile-menu a[data-page]').forEach((link) => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    function setFooterYear() {
        const year = document.getElementById('footer-year');
        if (year) {
            year.textContent = String(new Date().getFullYear());
        }
    }

    Promise.all([
        insertPartial('site-header', 'components/header.html', headerFallback),
        insertPartial('site-footer', 'components/footer.html', footerFallback)
    ]).then(() => {
        activateCurrentPage();
        setFooterYear();
        document.dispatchEvent(new CustomEvent('layout:ready'));
    });
})();
