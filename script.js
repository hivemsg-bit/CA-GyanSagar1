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
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Login Modal (original, for other uses)
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Tab Switching in Modal (original)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            this.classList.add('active');
            document.getElementById(tab).classList.add('active');
        });
    });
    
    // Pricing Tabs (original)
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingPanels = document.querySelectorAll('.pricing-panel');
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Remove active class from all tabs and panels
            pricingTabs.forEach(tab => tab.classList.remove('active'));
            pricingPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to current tab and panel
            this.classList.add('active');
            document.getElementById(`panel-${target}`).classList.add('active');
            
            // Smooth scroll to pricing section
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Testimonial Slider (original)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adjust currentSlide index if out of bounds
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Manual slide control with dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide change every 5 seconds
    setInterval(function() {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    // NEW: Free Test Buttons - Open Free Form Modal
    const startTestBtns = document.querySelectorAll('.start-test-btn');
    const freeFormModal = document.getElementById('freeFormModal');
    const closeFreeModal = document.getElementById('closeFreeModal');
    
    startTestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            if (freeForm) {
                freeForm.setAttribute('data-level', level); // Store level for PDF
            }
            freeFormModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // NEW: Free Pack Buttons - Open Free Form Modal (same logic)
    const freePackBtns = document.querySelectorAll('.free-pack-btn');
    freePackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            if (freeForm) {
                freeForm.setAttribute('data-level', level);
            }
            freeFormModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close Free Form Modal
    if (closeFreeModal && freeFormModal) {
        closeFreeModal.addEventListener('click', function() {
            freeFormModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === freeFormModal) {
            freeFormModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // UPDATED: Free Form Submission - POST to Google Sheet & Download PDF (Fixed for CORS)
    const freeForm = document.getElementById('freeForm');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV7oxD1N4pwmsX2stdEizJIApNF7btFRLKSfgXqK7OTV7wlUeU1UPjD739Jcsi4kTW/exec'; // Your URL
    
    if (freeForm) {
        freeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const level = this.getAttribute('data-level') || 'General';
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;
            
            console.log('Sending data:', Object.fromEntries(formData)); // Debug: Check form data in console
            
            // POST request to Apps Script
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData, // FormData auto-sets Content-Type: multipart/form-data
                mode: 'no-cors' // Important for CORS bypass if needed (but may hide errors)
            })
            .then(response => {
                // For no-cors, response is opaque; we can't read .text() reliably
                // But if script returns "Success", we assume it worked (since manual test confirms)
                console.log('Response received (status:', response.status, ')'); // Debug
                
                // Proceed to download (assume success if no network error)
                downloadPDF(level);
                handleSuccess(submitBtn, originalText);
            })
            .catch(error => {
                console.error('Fetch Error:', error); // Debug: Full error in console
                alert('Submission error: ' + error.message + '\nPlease check console (F12) or contact info@caexam.online');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Helper: Download PDF
    function downloadPDF(level) {
        const downloadLink = document.createElement('a');
        downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ztptHMUr3KXA_vq8It1bGsDQrc8d5rNG';
        downloadLink.download = `CA-${level}-Free-Test-Pack.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    
    // Helper: Handle success
    function handleSuccess(submitBtn, originalText) {
        const level = freeForm.getAttribute('data-level') || 'free test';
        alert(`Thank you! Your ${level} details submitted successfully. PDF is downloading.`);
        freeForm.reset();
        freeFormModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
    
    // NEW: Buy Now Buttons - Open Payment Modal (unchanged)
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    const buyNowModal = document.getElementById('buyNowModal');
    const closeBuyModal = document.getElementById('closeBuyModal');
    const closeBuyBtn = document.getElementById('closeBuyBtn');
    
    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            buyNowModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeBuyModal && buyNowModal) {
        closeBuyModal.addEventListener('click', function() {
            buyNowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (closeBuyBtn && buyNowModal) {
        closeBuyBtn.addEventListener('click', function() {
            buyNowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === buyNowModal) {
            buyNowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Coupon Code Copy Functionality (original)
    const copyCouponBtn = document.getElementById('horizontalCouponBtn');
    
    if (copyCouponBtn) {
        copyCouponBtn.addEventListener('click', function() {
            const couponCode = 'SAVE100';
            
            // Copy to clipboard
            navigator.clipboard.writeText(couponCode).then(function() {
                // Change button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }.bind(this));
        });
    }
    
    // Smooth scrolling for anchor links (original)
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
    
    // Form Submissions (original, but exclude freeForm)
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (form.id !== 'freeForm') {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('This is a demo. Form submission would be handled by backend in actual implementation.');
            });
        }
    });
    
    // Newsletter: Silently reset, do nothing (as requested)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.reset(); // Just reset, no alert or submission
        });
    }
});

// Global function for testimonial slider dots (original)
function currentSlide(n) {
    // Adjust for zero-based index
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all slides and remove active class from dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected slide and set active dot
    if (slides[n - 1]) slides[n - 1].classList.add('active');
    if (dots[n - 1]) dots[n - 1].classList.add('active');
}
