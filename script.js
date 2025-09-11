// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation (unchanged)
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

    // Smooth scrolling for anchor links (including #contact-footer)
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
    
    // Login Modal (unchanged)
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
    
    // Tab Switching in Modal (unchanged)
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
    
    // Pricing Tabs (unchanged)
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
    
    // Testimonial Slider (unchanged)
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

    // Free Test and Free Pack Functionality
    const startTestBtns = document.querySelectorAll('.start-test-btn');
    const freePackBtns = document.querySelectorAll('.free-pack-btn');
    const freeAccessModal = document.getElementById('freeAccessModal');
    const closeFreeModal = document.getElementById('closeFreeModal');
    const freeAccessForm = document.getElementById('freeAccessForm');

    // Open free modal for start test buttons
    startTestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Store level for potential use (though all use same PDF)
            document.getElementById('userName').dataset.level = this.getAttribute('data-level');
            if (freeAccessModal) {
                freeAccessModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Open free modal for free pack buttons
    freePackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('userName').dataset.level = this.getAttribute('data-level');
            if (freeAccessModal) {
                freeAccessModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close free modal
    if (closeFreeModal && freeAccessModal) {
        closeFreeModal.addEventListener('click', function() {
            freeAccessModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close free modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === freeAccessModal) {
            freeAccessModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Free form submission
    if (freeAccessForm) {
        freeAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const params = new URLSearchParams();
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }

            // Send to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbxV7oxD1N4pwmsX2stdEizJIApNF7btFRLKSfgXqK7OTV7wlUeU1UPjD739Jcsi4kTW/exec', {
                method: 'POST',
                mode: 'no-cors', // For simple script deployment
                body: params
            }).then(() => {
                // Close modal and reset form
                freeAccessModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.reset();

                // Trigger PDF download
                const downloadLink = document.createElement('a');
                downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ztptHMUr3KXA_vq8It1bGsDQrc8d5rNG';
                downloadLink.download = 'CA-Free-Test-Pack.pdf';
                downloadLink.click();

                alert('Thank you! Your details have been recorded. PDF is downloading.');
            }).catch(err => {
                console.error('Error:', err);
                alert('Submission successful, but download manually if needed.');
                // Still trigger download
                const downloadLink = document.createElement('a');
                downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ztptHMUr3KXA_vq8It1bGsDQrc8d5rNG';
                downloadLink.download = 'CA-Free-Test-Pack.pdf';
                downloadLink.click();
            });
        });
    }

    // Silver/Gold Buy Now Functionality
    const buyNowBtns = document.querySelectorAll('.buy-now-btn');
    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');

    buyNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Store pack/level if needed (for future)
            this.dataset.pack = this.getAttribute('data-pack');
            if (paymentModal) {
                paymentModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close payment modal
    if (closePaymentModal && paymentModal) {
        closePaymentModal.addEventListener('click', function() {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close payment modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Coupon Code Copy Functionality (unchanged)
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
    
    // Language Switching Functionality (unchanged)
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        // Load saved language preference
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            languageSelect.value = savedLanguage;
            switchLanguage(savedLanguage);
        }
        
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('preferredLanguage', selectedLanguage);
            switchLanguage(selectedLanguage);
        });
    }
    
    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-en], [data-hi]');
        
        elements.forEach(element => {
            if (lang === 'hi') {
                // Switch to Hindi
                if (element.hasAttribute('data-hi')) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = element.getAttribute('data-hi');
                    } else {
                        element.textContent = element.getAttribute('data-hi');
                    }
                }
            } else {
                // Switch to English (default)
                if (element.hasAttribute('data-en')) {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = element.getAttribute('data-en');
                    } else {
                        element.textContent = element.getAttribute('data-en');
                    }
                }
            }
        });
    }
    
    // Form Submissions (updated newsletter to do nothing)
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (!form.id || form.id !== 'freeAccessForm') { // Exclude free form (handled separately)
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('This is a demo. Form submission would be handled by backend in actual implementation.');
            });
        }
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Do nothing: just reset form
            this.reset();
        });
    }
    
    // Open login modal from "Sign Up for Free" buttons (removed since now using free modal)
    // const openLoginButtons = document.querySelectorAll('.open-login');
    // openLoginButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         if (loginModal) {
    //             loginModal.style.display = 'block';
    //             document.body.style.overflow = 'hidden';
    //         }
    //     });
    // });
});

// Global function for testimonial slider dots (unchanged)
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
