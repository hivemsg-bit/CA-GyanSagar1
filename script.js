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
    
    // Login Modal
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
    
    // Tab Switching in Modal
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
    
    // Pricing Tabs
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
    
    // Testimonial Slider
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
    
    // Free Test Button Functionality
    const startTestBtns = document.querySelectorAll('.start-test-btn');
    
    startTestBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            
            // Open login modal first
            if (loginModal) {
                loginModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // After successful login (for demo, we'll just set a timeout)
                setTimeout(function() {
                    loginModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // Show download popup
                    alert(`Thank you! Your free ${level.toUpperCase()} test paper is ready to download. Practice well!`);
                    
                    // For actual implementation, this would redirect to test page
                    // window.location.href = `test.html?level=${level}&type=free`;
                    
                    // For now, we'll provide a direct download link
                    const downloadLink = document.createElement('a');
                    downloadLink.href = `https://drive.google.com/uc?export=download&id=YOUR_${level.toUpperCase()}_FREE_TEST_PDF_ID`;
                    downloadLink.download = `CA-${level}-Free-Test.pdf`;
                    downloadLink.click();
                }, 2000);
            }
        });
    });
    
    // Coupon Code Copy Functionality
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
    
    // Language Switching Functionality
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
    
    // Smooth scrolling for anchor links
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
    
    // Form Submissions
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('This is a demo. Form submission would be handled by backend in actual implementation.');
        });
    });
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Open login modal from "Sign Up for Free" buttons
    const openLoginButtons = document.querySelectorAll('.open-login');
    openLoginButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (loginModal) {
                loginModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// Global function for testimonial slider dots
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