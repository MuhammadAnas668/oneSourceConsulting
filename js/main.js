// =====================================================
// GLOBAL SCRIPT - Runs on all pages
// =====================================================

(function () {
    function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('hidden');
    }

    function closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
    }

    document.addEventListener('click', function (event) {
        const menuButton = event.target.closest('.mobile-menu-btn');
        if (menuButton) {
            toggleMobileMenu();
            return;
        }

        const mobileMenuLink = event.target.closest('.mobile-menu a');
        if (mobileMenuLink) {
            closeMobileMenu();
        }

        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href) return;
        if (href === '#') {
            event.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    document.addEventListener('submit', function (event) {
        const footerForm = event.target.closest('.footer-news-form');
        if (!footerForm) return;

        event.preventDefault();
        const button = footerForm.querySelector('button');
        if (button) {
            button.textContent = 'Subscribed';
            button.disabled = true;
        }
    });

    document.addEventListener('layout:ready', closeMobileMenu);
})();
