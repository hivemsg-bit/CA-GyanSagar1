// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // --- NEW: Free Test & Free Pack Modal Functionality ---
    const freeTestModal = document.getElementById('freeTestModal');
    const closeFreeTestModal = document.getElementById('closeFreeTestModal');
    const freeTestForm = document.getElementById('freeTestForm');
    const formTestLevelInput = document.getElementById('formTestLevel');
    const formPdfLinkInput = document.getElementById('formPdfLink');
    const freeTestTriggerButtons = document.querySelectorAll('.start-test-btn, .open-login');

    freeTestTriggerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            const pdfLink = this.getAttribute('data-pdf-link');
            
            formTestLevelInput.value = level;
            formPdfLinkInput.value = pdfLink;
            
            freeTestModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeFreeTestModal.addEventListener('click', function() {
        freeTestModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    freeTestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submitFreeTest');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
        const googleSheetScriptURL = 'https://script.google.com/macros/s/AKfycbw.../exec'; // REPLACE THIS

        const formData = new FormData(freeTestForm);

        fetch(googleSheetScriptURL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if(data.result === 'success') {
                    alert('Success! Your download will start now.');
                    
                    // Trigger PDF download
                    const pdfUrl = formPdfLinkInput.value;
                    const anchor = document.createElement('a');
                    anchor.href = pdfUrl;
                    anchor.download = `CAExam-${formTestLevelInput.value}-Test.pdf`;
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);

                    // Close modal and reset form
                    freeTestModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    freeTestForm.reset();
                } else {
                    throw new Error(data.error || 'Unknown error occurred');
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Download Now';
            });
    });

    // --- NEW: Payment Modal Functionality ---
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent navigation if it's a link
            paymentModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closePaymentModal.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === freeTestModal) {
            freeTestModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Pricing Tabs (Existing functionality)
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
    
    // Smooth scrolling for anchor links (Existing functionality)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Other existing functionalities like Testimonial Slider, Language Switching, etc.
    // ... (Keep the rest of your original JS for these features) ...
});
