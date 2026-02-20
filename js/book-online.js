// =====================================================
// BOOK ONLINE PAGE - SERVICE SELECTION & FORM
// =====================================================

(function () {
    let selectedService = null;

    function selectService(service) {
        selectedService = service;

        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = service;
        }

        document.querySelectorAll('.service-option').forEach((option) => {
            const isActive = option.dataset.service === service;
            option.classList.toggle('active', isActive);

            const button = option.querySelector('.btn-select');
            if (button) {
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            }
        });
    }

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                company: formData.get('company'),
                service: formData.get('service'),
                date: formData.get('date'),
                time: formData.get('time'),
                participants: formData.get('participants'),
                message: formData.get('message'),
            };

            if (!data.name || !data.email || !data.company || !data.service || !data.date || !data.time || !data.participants) {
                alert('Please fill in all required fields');
                return;
            }

            console.log('Booking submitted:', data);

            alert(`Thank you ${data.name}!\n\nYour booking request has been received.\nWe will confirm within 2 hours at ${data.email}.`);

            this.reset();
            selectedService = null;

            document.querySelectorAll('.service-option').forEach((option) => {
                option.classList.remove('active');
                const button = option.querySelector('.btn-select');
                if (button) {
                    button.classList.remove('active');
                    button.setAttribute('aria-pressed', 'false');
                }
            });
        });
    }

    window.selectService = selectService;

    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        if (service) {
            selectService(service);
        }
    });
})();
