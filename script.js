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
    
    // Close mobile menu when clicking on a link (unchanged)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
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
    
    // Close modal when clicking outside (unchanged)
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
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
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
            
            pricingTabs.forEach(tab => tab.classList.remove('active'));
            pricingPanels.forEach(panel => panel.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`panel-${target}`).classList.add('active');
            
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Testimonial Slider (unchanged)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    setInterval(function() {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
    
    // Free Test/Free Pack Buttons - Open Modal (unchanged)
    const startTestBtns = document.querySelectorAll('.start-test-btn');
    const freePackBtns = document.querySelectorAll('.free-pack-btn');
    const freeFormModal = document.getElementById('freeFormModal');
    const closeFreeModal = document.getElementById('closeFreeModal');
    
    [startTestBtns, freePackBtns].forEach(btns => {
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                const freeForm = document.getElementById('freeForm');
                if (freeForm) {
                    freeForm.setAttribute('data-level', level || 'General');
                }
                freeFormModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    });
    
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
    
    // UPDATED: Free Form Submission - FIXED for TypeError (Use URLSearchParams + Headers)
    const freeForm = document.getElementById('freeForm');
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV7oxD1N4pwmsX2stdEizJIApNF7btFRLKSfgXqK7OTV7wlUeU1UPjD739Jcsi4kTW/exec'; // Your exact URL
    
    if (freeForm) {
        freeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const level = this.getAttribute('data-level') || 'General';
            
            // Convert to URLSearchParams for application/x-www-form-urlencoded
            const params = new URLSearchParams();
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;
            
            console.log('Sending data:', params.toString()); // Debug: Form data in console
            
            // POST with proper headers (fixes e.parameter undefined)
            fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: params // URLSearchParams as body
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('Response status:', response.status); // Debug
                return response.text();
            })
            .then(data => {
                console.log('Full Response:', data); // Debug: Should show "Success"
                
                if (data.trim() === 'Success') {
                    // Download PDF
                    const downloadLink = document.createElement('a');
                    downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ztptHMUr3KXA_vq8It1bGsDQrc8d5rNG';
                    downloadLink.download = `CA-${level}-Free-Test-Pack.pdf`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    
                    alert(`Thank you! Your ${level} details submitted successfully. PDF is downloading.`);
                    freeForm.reset();
                    freeFormModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else {
                    alert('Submission failed. Response: ' + data.trim());
                }
            })
            .catch(error => {
                console.error('Fetch Error Details:', error); // Full error in console
                alert('Error: ' + error.message + '\nCheck console (F12) for details or contact info@caexam.online');
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Buy Now Modal (unchanged)
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
    
    [closeBuyModal, closeBuyBtn].forEach(el => {
        if (el && buyNowModal) {
            el.addEventListener('click', function() {
                buyNowModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === buyNowModal) {
            buyNowModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Coupon Code Copy (unchanged)
    const copyCouponBtn = document.getElementById('horizontalCouponBtn');
    if (copyCouponBtn) {
        copyCouponBtn.addEventListener('click', function() {
            const couponCode = 'SAVE100';
            navigator.clipboard.writeText(couponCode).then(function() {
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }.bind(this));
        });
    }
    
    // Smooth scrolling (unchanged)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Other Forms (exclude freeForm) (unchanged)
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (form.id !== 'freeForm') {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('This is a demo. Form submission would be handled by backend.');
            });
        }
    });
    
    // Newsletter: Silently reset (unchanged)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.reset();
        });
    }
});

// Testimonial Slider Dots (unchanged)
function currentSlide(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[n - 1]) slides[n - 1].classList.add('active');
    if (dots[n - 1]) dots[n - 1].classList.add('active');
}
