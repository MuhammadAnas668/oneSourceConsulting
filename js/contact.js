// =====================================================
// CONTACT PAGE SCRIPTS
// =====================================================

(function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let success = form.querySelector('.contact-success');
        if (!success) {
            success = document.createElement('p');
            success.className = 'contact-success';
            form.appendChild(success);
        }

        success.textContent = 'Your message has been sent. Our team will respond shortly.';
        form.reset();
    });
})();
