// =====================================================
// NOTIFICATIONS PAGE SCRIPTS
// =====================================================

(function () {
    const filters = Array.from(document.querySelectorAll('.filter-btn'));
    const notifications = Array.from(document.querySelectorAll('.notification-item'));
    const markAllButton = document.querySelector('.mark-all-read .btn-secondary');

    function categoryForText(text) {
        const value = text.toLowerCase();
        if (value.includes('announcement')) return 'announcements';
        if (value.includes('job')) return 'new jobs';
        if (value.includes('event')) return 'events';
        if (value.includes('blog')) return 'blog updates';
        if (value.includes('for you')) return 'for you';
        return 'all';
    }

    function tagForItem(item) {
        const title = (item.querySelector('h3')?.textContent || '').toLowerCase();
        if (title.includes('job')) return 'new jobs';
        if (title.includes('webinar') || title.includes('event')) return 'events';
        if (title.includes('blog')) return 'blog updates';
        if (title.includes('profile')) return 'for you';
        if (title.includes('notice') || title.includes('closure')) return 'announcements';
        return 'all';
    }

    if (filters.length && notifications.length) {
        filters.forEach((filter) => {
            filter.addEventListener('click', function () {
                filters.forEach((btn) => btn.classList.remove('active'));
                this.classList.add('active');

                const selected = categoryForText(this.textContent);
                notifications.forEach((item) => {
                    const tag = tagForItem(item);
                    const show = selected === 'all' || selected === tag;
                    item.style.display = show ? '' : 'none';
                });
            });
        });
    }

    if (markAllButton) {
        markAllButton.addEventListener('click', function () {
            notifications.forEach((item) => {
                item.classList.remove('unread');
                const badge = item.querySelector('.unread-badge');
                if (badge) badge.remove();
            });
        });
    }
})();
