// =====================================================
// BLOG PAGE SCRIPTS
// =====================================================

(function () {
    const buttons = Array.from(document.querySelectorAll('.category-btn'));
    const cards = Array.from(document.querySelectorAll('.blog-card'));

    if (!buttons.length || !cards.length) return;

    function normalize(value) {
        return value.trim().toLowerCase();
    }

    buttons.forEach((button) => {
        button.addEventListener('click', function () {
            buttons.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');

            const selected = normalize(this.textContent);
            cards.forEach((card) => {
                const categoryEl = card.querySelector('.post-category');
                const category = categoryEl ? normalize(categoryEl.textContent) : '';
                const shouldShow = selected === 'all' || category === selected;
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    });
})();
