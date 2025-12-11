// ===================================
// Diggai Website - Interactive Features
// ===================================

'use strict';

// ===================================
// Mobile Navigation
// ===================================

const initMobileNavigation = () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
};

// ===================================
// Sticky Navigation
// ===================================

const initStickyNavigation = () => {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
};

// ===================================
// Smooth Scrolling
// ===================================

const initSmoothScrolling = () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignore empty hash
            if (href === '#' || href === '#!') {
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });
};

// ===================================
// Back to Top Button
// ===================================

const initBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

// ===================================
// Contact Form Handling
// ===================================

const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }

            // Privacy checkbox validation
            if (!data.privacy) {
                showNotification('Bitte stimmen Sie der Datenschutzerklärung zu.', 'error');
                return;
            }

            // Simulate form submission
            // In a real application, this would send data to a server
            simulateFormSubmission(data)
                .then(() => {
                    showNotification('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.', 'success');
                    contactForm.reset();
                })
                .catch(() => {
                    showNotification('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
                });
        });
    }
};

// Simulate form submission (replace with actual API call)
const simulateFormSubmission = (data) => {
    return new Promise((resolve, reject) => {
        console.log('Form data to be submitted:', data);
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate successful submission
            resolve({ success: true });
            
            // Uncomment to simulate error
            // reject({ success: false });
        }, 1500);
    });
};

// Show notification to user
const showNotification = (message, type = 'info') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#0066CC',
        color: '#FFFFFF',
        fontWeight: '500',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease',
        fontSize: '0.95rem'
    });

    // Add animation keyframes if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
};

// ===================================
// Scroll Animations
// ===================================

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.service-card, .solution-item, .benefit-card, .stat-item'
    );

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
};

// ===================================
// Active Navigation Link
// ===================================

const initActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
};

// ===================================
// Form Input Enhancements
// ===================================

const initFormEnhancements = () => {
    const formInputs = document.querySelectorAll('input, textarea, select');

    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
};

// ===================================
// Performance: Lazy Loading
// ===================================

const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
};

// ===================================
// Statistics Counter Animation
// ===================================

const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Check if it's a number
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateCounter(target, 0, numericValue, 2000, finalValue);
                    observer.unobserve(target);
                }
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
};

const animateCounter = (element, start, end, duration, originalText) => {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            const displayValue = Math.floor(current);
            element.textContent = originalText.replace(/\d+/, displayValue);
        }
    }, 16);
};

// ===================================
// Keyboard Navigation Enhancement
// ===================================

const initKeyboardNavigation = () => {
    // ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
};

// ===================================
// Page Load Performance
// ===================================

const initPageLoadOptimizations = () => {
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Preload critical resources
    const criticalLinks = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
    ];

    criticalLinks.forEach(link => {
        const linkElement = document.createElement('link');
        Object.assign(linkElement, link);
        document.head.appendChild(linkElement);
    });
};

// ===================================
// Accessibility Enhancements
// ===================================

const initAccessibilityEnhancements = () => {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-to-content sr-only';
    skipLink.textContent = 'Zum Hauptinhalt springen';
    skipLink.addEventListener('focus', () => {
        skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
        skipLink.classList.add('sr-only');
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
};

// ===================================
// Error Handling
// ===================================

const initErrorHandling = () => {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // In production, you might want to send this to an error tracking service
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        // In production, you might want to send this to an error tracking service
    });
};

// ===================================
// Initialization
// ===================================

const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
};

const initializeApp = () => {
    console.log('🚀 Diggai Website Initialized');

    try {
        // Core functionality
        initMobileNavigation();
        initStickyNavigation();
        initSmoothScrolling();
        initBackToTop();
        initContactForm();

        // Enhanced features
        initActiveNavigation();
        initScrollAnimations();
        initStatsCounter();
        initFormEnhancements();
        initLazyLoading();
        
        // Accessibility & Performance
        initKeyboardNavigation();
        initAccessibilityEnhancements();
        initPageLoadOptimizations();
        initErrorHandling();

        console.log('✅ All features initialized successfully');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
};

// Start the application
init();
