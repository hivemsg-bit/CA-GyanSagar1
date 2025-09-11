document.addEventListener('DOMContentLoaded', function() {
    
    // !!! महत्वपूर्ण: अपनी गूगल ऐप्स स्क्रिप्ट का URL यहां पेस्ट करें !!!
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV7oxD1N4pwmsX2stdEizJIApNF7btFRLKSfgXqK7OTV7wlUeU1UPjD739Jcsi4kTW/exec';

    // Modals
    const leadModal = document.getElementById('leadModal');
    const paymentModal = document.getElementById('paymentModal');
    const closeLeadModal = document.getElementById('closeLeadModal');
    const closePaymentModal = document.getElementById('closePaymentModal');

    // Lead Generation Modal (Free Tests)
    const openLeadModalButtons = document.querySelectorAll('.open-lead-modal');
    const leadForm = document.getElementById('leadForm');
    let currentPdfLink = '';

    openLeadModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentPdfLink = this.getAttribute('data-pdf-link');
            leadModal.style.display = 'block';
        });
    });

    closeLeadModal.addEventListener('click', () => {
        leadModal.style.display = 'none';
    });

    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('leadName').value;
        const email = document.getElementById('leadEmail').value;
        const mobile = document.getElementById('leadMobile').value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Submitting...';

        // Google Sheet में डेटा भेजें
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);

        fetch(GOOGLE_SCRIPT_URL + `?name=${name}&email=${email}&mobile=${mobile}`, {
            method: 'GET',
            mode: 'no-cors' // Use 'no-cors' for simple GET requests to Apps Script
        }).then(() => {
            // PDF डाउनलोड करें
            alert('Thank you! Your download will start now.');
            const a = document.createElement('a');
            a.href = currentPdfLink;
            a.download = 'CAExam_Free_Test.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Modal बंद करें और फॉर्म रीसेट करें
            leadModal.style.display = 'none';
            leadForm.reset();
        }).catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }).finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
    });

    // Payment Info Modal (Paid Packs)
    const openPaymentModalButtons = document.querySelectorAll('.open-payment-modal');

    openPaymentModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentModal.style.display = 'block';
        });
    });

    closePaymentModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // किसी भी Modal के बाहर क्लिक करने पर उसे बंद करें
    window.addEventListener('click', function(event) {
        if (event.target == leadModal) {
            leadModal.style.display = 'none';
        }
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Newsletter Form (Disabled)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // कुछ न करें
            alert('Thank you for your interest!');
            this.reset();
        });
    }

    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Pricing Tabs
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingPanels = document.querySelectorAll('.pricing-panel');
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingPanels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`panel-${target}`).classList.add('active');
        });
    });

    // Language Switching
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-en], [data-hi]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
