// AI Tutor India - Vanilla JavaScript
// Features: Mobile nav, FAQ accordion, Form validation, Smooth scroll, Animations

(function() {
    'use strict';

    // ========================================
    // DOM Ready
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initMobileNav();
        initFAQAccordion();
        initFormValidation();
        initSmoothScroll();
        initScrollAnimations();
        initPricingToggle();
        initPhoneMockup();
        initCurrentYear();
    });

    // ========================================
    // Mobile Navigation
    // ========================================
    function initMobileNav() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (!menuBtn || !mobileMenu) return;

        menuBtn.addEventListener('click', function() {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.hidden = isExpanded;
            
            // Prevent body scroll when menu open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.hidden = true;
                document.body.style.overflow = '';
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.hidden) {
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.hidden = true;
                document.body.style.overflow = '';
                menuBtn.focus();
            }
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.hidden && 
                !mobileMenu.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.hidden = true;
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (!question) return;
            
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all other items
                faqItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove('open');
                    }
                });
                
                // Toggle current
                item.classList.toggle('open');
            });
            
            // Keyboard support
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    // ========================================
    // Form Validation
    // ========================================
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!validateForm(form)) {
                    e.preventDefault();
                    return false;
                }
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"], .btn[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('loading');
                    submitBtn.disabled = true;
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(input);
                });
                
                input.addEventListener('input', function() {
                    if (input.classList.contains('error')) {
                        validateField(input);
                    }
                });
            });
        });
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    function validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        removeFieldError(input);
        
        // Required check
        if (input.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (isValid && type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation (Indian numbers)
        if (isValid && type === 'tel' && value) {
            const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
            if (!phoneRegex.test(value.replace(/[\s\-]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid Indian mobile number';
            }
        }
        
        // Min length
        if (isValid && input.hasAttribute('minlength') && value.length < parseInt(input.getAttribute('minlength'))) {
            isValid = false;
            errorMessage = `Must be at least ${input.getAttribute('minlength')} characters`;
        }
        
        // Pattern validation
        if (isValid && input.hasAttribute('pattern') && value) {
            const pattern = new RegExp(input.getAttribute('pattern'));
            if (!pattern.test(value)) {
                isValid = false;
                errorMessage = input.getAttribute('title') || 'Invalid format';
            }
        }
        
        if (!isValid) {
            showFieldError(input, errorMessage);
        } else {
            input.classList.remove('error');
            input.classList.add('valid');
        }
        
        return isValid;
    }

    function showFieldError(input, message) {
        input.classList.add('error');
        input.classList.remove('valid');
        input.setAttribute('aria-invalid', 'true');
        
        // Create or update error message
        let errorEl = input.parentNode.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.setAttribute('role', 'alert');
            input.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function removeFieldError(input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        const errorEl = input.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    // ========================================
    // Smooth Scroll
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scroll
                    history.pushState(null, null, targetId);
                    
                    // Focus for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const animatedElements = document.querySelectorAll(
            '.feature-card, .board-card, .testimonial-card, .pricing-card, .step, .faq-item, .float-card'
        );
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.transitionDelay = `${Math.min(index * 50, 300)}ms`;
            observer.observe(el);
        });
    }

    // ========================================
    // Pricing Toggle (Monthly/Yearly)
    // ========================================
    function initPricingToggle() {
        const toggleCheckbox = document.getElementById('billing-toggle');
        const monthlyRadio = document.getElementById('monthly');
        const yearlyRadio = document.getElementById('yearly');
        const amounts = document.querySelectorAll('.amount');
        
        function updatePrices(isYearly) {
            amounts.forEach(amount => {
                const monthlyPrice = amount.dataset.monthly;
                const yearlyPrice = amount.dataset.yearly;
                if (!monthlyPrice || !yearlyPrice) return;
                
                const price = isYearly ? parseInt(yearlyPrice) : parseInt(monthlyPrice);
                amount.textContent = '₹' + price.toLocaleString('en-IN');
            });
        }

        if (toggleCheckbox) {
            toggleCheckbox.addEventListener('change', function() {
                updatePrices(this.checked);
            });
        }
        
        if (monthlyRadio && yearlyRadio) {
            monthlyRadio.addEventListener('change', () => updatePrices(false));
            yearlyRadio.addEventListener('change', () => updatePrices(true));
        }
    }

    // ========================================
    // Phone Mockup Interaction
    // ========================================
    function initPhoneMockup() {
        const quickReplies = document.querySelectorAll('.quick-reply');
        const chatMessages = document.querySelector('.chat-messages');
        const inputField = document.getElementById('demo-chat-input');
        const sendBtn = document.getElementById('demo-chat-send');
        
        quickReplies.forEach(btn => {
            btn.addEventListener('click', function() {
                const text = this.textContent;
                
                // Add user message
                addMessage(chatMessages, text, 'user');
                
                // Simulate AI response
                setTimeout(() => {
                    const responses = [
                        "Great! Let's walk through it step by step...",
                        "यहाँ सरल भाषा में समझें: Ohm's Law states V = I × R. तो V = 0.2 × 50 = 10 Volts!",
                        "Perfect choice! Here's how to solve it step-by-step for board exams...",
                        "Good thinking! Let's break down this concept..."
                    ];
                    const response = responses[Math.floor(Math.random() * responses.length)];
                    addMessage(chatMessages, response, 'ai');
                }, 800);
                
                // Disable clicked button
                this.disabled = true;
                this.style.opacity = '0.5';
            });
        });

        function handleSend() {
            if (!inputField) return;
            const userText = inputField.value.trim();
            if (!userText) return;

            addMessage(chatMessages, userText, 'user');
            inputField.value = '';

            setTimeout(() => {
                const customResponses = [
                    `Great question on "${userText}"! Here is the step-by-step solution matching your NCERT syllabus: <br>1. Identify given values<br>2. Apply the fundamental formula<br>3. Simplify for final answer ✨`,
                    `Awesome doubt! According to CBSE marking schemes, for "${userText}", always state the definition first, draw the diagram, and then show calculations.`,
                    `Instant Solution for "${userText}": <br><strong>Step 1:</strong> Concept clarity.<br><strong>Step 2:</strong> Stepwise derivation.<br>💡 Tip: Super common in Board Exam PYQs!`
                ];
                const res = customResponses[Math.floor(Math.random() * customResponses.length)];
                addMessage(chatMessages, res, 'ai');
            }, 700);
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', handleSend);
        }

        if (inputField) {
            inputField.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                }
            });
        }
        
        function addMessage(container, text, type) {
            if (!container) return;
            
            const message = document.createElement('div');
            message.className = `message ${type}`;
            message.innerHTML = `<div class="msg-bubble">${text}</div>`;
            
            container.appendChild(message);
            container.scrollTop = container.scrollHeight;
        }
    }

    // ========================================
    // Current Year for Footer
    // ========================================
    function initCurrentYear() {
        const yearElements = document.querySelectorAll('[data-current-year]');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // ========================================
    // Utility Functions
    // ========================================
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
    
    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ========================================
    // Performance: Lazy Load Images
    // ========================================
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback for browsers without native lazy loading
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Initialize lazy loading
    initLazyLoading();

    // ========================================
    // Error Handling
    // ========================================
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Could send to error tracking service here
    });

    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled Promise Rejection:', e.reason);
        // Could send to error tracking service here
    });

    // ========================================
    // Expose utilities globally (optional)
    // ========================================
    window.AITutorUtils = {
        debounce,
        throttle,
        isInViewport,
        validateField,
        showFieldError,
        removeFieldError
    };

})();