// DOM Ready - Ensures everything loads first
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded - Script starting'); // Debug: Confirm JS runs
    
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
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
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
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
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingPanels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`panel-${target}`).classList.add('active');
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Testimonial Slider
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
    
    // Free Test/Free Pack Buttons - Open Modal (With Debug)
    const startTestBtns = document.querySelectorAll('.start-test-btn');
    const freePackBtns = document.querySelectorAll('.free-pack-btn');
    const freeFormModal = document.getElementById('freeFormModal');
    const closeFreeModal = document.getElementById('closeFreeModal');
    const freeForm = document.getElementById('freeForm');
    
    console.log('Debug - Start Test Buttons found:', startTestBtns.length); // Should be 3
    console.log('Debug - Free Pack Buttons found:', freePackBtns.length); // Should be 3
    console.log('Debug - Free Modal found:', !!freeFormModal); // true
    console.log('Debug - Free Form found:', !!freeForm); // true
    
    if (!freeFormModal) {
        console.error('ERROR: freeFormModal not found in HTML!');
        return;
    }
    
    // Start Test Buttons
    startTestBtns.forEach((btn, index) => {
        console.log('Debug - Attaching to Start Test Btn', index + 1);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const level = this.getAttribute('data-level');
            console.log('Debug - Start Test clicked for:', level);
            
            freeForm.setAttribute('data-level', level || 'General');
            freeFormModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Debug - Modal opened for Start Test');
        });
    });
    
    // Free Pack Buttons
    freePackBtns.forEach((btn, index) => {
        console.log('Debug - Attaching to Free Pack Btn', index + 1);
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const level = this.getAttribute('data-level');
            console.log('Debug - Free Pack clicked for:', level);
            
            freeForm.setAttribute('data-level', level || 'General');
            freeFormModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            console.log('Debug - Modal opened for Free Pack');
        });
    });
    
    // Close Free Modal
    if (closeFreeModal) {
        closeFreeModal.addEventListener('click', function() {
            console.log('Debug - Close Free Modal clicked');
            freeFormModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === freeFormModal) {
            console.log('Debug - Outside click closing Free Modal');
            freeFormModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Free Form Submission
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV7oxD1N4pwmsX2stdEizJIApNF7btFRLKSfgXqK7OTV7wlUeU1UPjD739Jcsi4kTW/exec';
    
    if (freeForm) {
        freeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const level = this.getAttribute('data-level') || 'General';
            
            const params = new URLSearchParams();
            for (let [key, value] of formData.entries()) {
                params.append(key, value);
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.disabled = true;
            
            console.log('Debug - Form data:', params.toString());
            
            fetch(SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: params
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                console.log('Debug - Response status:', response.status);
                return response.text();
            })
            .then(data => {
                console.log('Debug - Response data:', data);
                
                if (data.trim() === 'Success') {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ztptHMUr3KXA_vq8It1bGsDQrc8d5rNG';
                    downloadLink.download = `CA-${level}-Free-Test-Pack.pdf`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    
                    alert(`Thank you! ${level} details submitted. PDF downloading.`);
                    freeForm.reset();
                    freeFormModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else {
                    alert('Failed: ' + data.trim());
                }
            })
            .catch(error => {
                console.error('Debug - Error:', error);
                alert('Error: ' + error.message);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Buy Now Modal
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
    
    // Coupon Copy
    const copyCouponBtn = document.getElementById('horizontalCouponBtn');
    if (copyCouponBtn) {
        copyCouponBtn.addEventListener('click', function() {
            const couponCode = 'SAVE100';
            navigator.clipboard.writeText(couponCode).then(function() {
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied!';
                setTimeout(() => this.innerHTML = originalText, 2000);
            }.bind(this));
        });
    }
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Other Forms
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (form.id !== 'freeForm') {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Demo form');
            });
        }
    });
    
    // Newsletter Silent Reset
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.reset();
        });
    }
    
    console.log('Debug - All scripts loaded'); // End
});

// Testimonial Dots
function currentSlide(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    if (slides[n - 1]) slides[n - 1].classList.add('active');
    if (dots[n - 1]) dots[n - 1].classList.add('active');
}
