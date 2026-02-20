// =====================================================
// DARK MODE TOGGLE
// =====================================================

(function () {
    const mediaPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || (mediaPrefersDark.matches ? 'dark' : 'light');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('.theme-icon');
        const label = themeToggle.querySelector('.theme-label');

        if (theme === 'dark') {
            if (icon) icon.innerHTML = '&#9728;';
            if (label) label.textContent = 'Light';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            if (icon) icon.innerHTML = '&#9789;';
            if (label) label.textContent = 'Dark';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    function bindToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle || themeToggle.dataset.bound === '1') return;

        themeToggle.dataset.bound = '1';
        applyTheme(document.documentElement.getAttribute('data-theme') || initialTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            localStorage.setItem('theme', nextTheme);
        });
    }

    applyTheme(initialTheme);
    bindToggle();

    mediaPrefersDark.addEventListener('change', function (event) {
        if (localStorage.getItem('theme')) return;
        applyTheme(event.matches ? 'dark' : 'light');
    });

    document.addEventListener('layout:ready', bindToggle);
})();
