// Premium Carpets Co - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Premium Carpets Co - Main JavaScript Initialized');
    
    // Initialize consent tracking
    initializeConsentTracking();
    
    // Initialize UI interactions
    initializeUI();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Simple Consent Tracking
function initializeConsentTracking() {
    console.log('🔍 Initializing consent tracking...');
    
    // Wait for Cookiebot to be ready
    if (typeof Cookiebot !== 'undefined') {
        console.log('✅ Cookiebot detected');
        setupConsentListeners();
    } else {
        console.log('⏳ Waiting for Cookiebot...');
        // Check again after a short delay
        setTimeout(() => {
            if (typeof Cookiebot !== 'undefined') {
                console.log('✅ Cookiebot loaded');
                setupConsentListeners();
            } else {
                console.log('❌ Cookiebot not available');
            }
        }, 1000);
    }
}

function setupConsentListeners() {
    // Listen for consent ready event
    window.addEventListener('CookiebotOnConsentReady', function (e) {
        console.log('🎉 Consent ready:', Cookiebot.consent);
        trackConsentChange();
        updateGTMConsent();
    });
    
    // Listen for consent changes
    window.addEventListener('CookiebotOnConsentChange', function (e) {
        console.log('🔄 Consent changed:', Cookiebot.consent);
        trackConsentChange();
        updateGTMConsent();
    });
}

function trackConsentChange() {
    if (typeof gtag !== 'undefined' && typeof Cookiebot !== 'undefined') {
        const consent = Cookiebot.consent;
        
        console.log('📊 Current consent state:', {
            necessary: consent.necessary,
            preferences: consent.preferences,
            statistics: consent.statistics,
            marketing: consent.marketing
        });
        
        // Track consent event
        gtag('event', 'consent_update', {
            'event_category': 'consent',
            'event_label': JSON.stringify(consent),
            'custom_parameter_necessary': consent.necessary,
            'custom_parameter_preferences': consent.preferences,
            'custom_parameter_statistics': consent.statistics,
            'custom_parameter_marketing': consent.marketing
        });
        
        // Track with Facebook Pixel if marketing consent given
        if (consent.marketing && typeof fbq !== 'undefined') {
            fbq('track', 'Consent', {
                consent_given: true,
                consent_categories: Object.keys(consent).filter(key => consent[key])
            });
        }
    }
}

function updateGTMConsent() {
    if (typeof gtag !== 'undefined' && typeof Cookiebot !== 'undefined') {
        const consent = Cookiebot.consent;
        
        // Update analytics storage
        if (consent.statistics) {
            gtag("consent", "update", {
                analytics_storage: "granted"
            });
            console.log('✅ Analytics storage granted');
        }
        
        // Update ad storage
        if (consent.marketing) {
            gtag("consent", "update", {
                ad_storage: "granted"
            });
            console.log('✅ Ad storage granted');
        }
        
        // Update personalization storage
        if (consent.preferences) {
            gtag("consent", "update", {
                personalization_storage: "granted"
            });
            console.log('✅ Personalization storage granted');
        }
        
        // Update functionality storage
        if (consent.necessary) {
            gtag("consent", "update", {
                functionality_storage: "granted"
            });
            console.log('✅ Functionality storage granted');
        }
    }
}

// Simple consent checking function
function hasConsent(category) {
    if (typeof Cookiebot !== 'undefined') {
        return Cookiebot.consent[category] || false;
    }
    return false;
}

// UI Initialization
function initializeUI() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .nav-menu a, .footer a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Track page interactions
    trackPageInteractions();
}

function initializeSmoothScrolling() {
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .section-title, .card, .featured-product');
    animateElements.forEach(el => observer.observe(el));
}

function trackPageInteractions() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'event_category': 'engagement',
                    'event_label': this.textContent.trim(),
                    'custom_parameter_button_type': this.classList.contains('btn-primary') ? 'primary' : 'secondary'
                });
            }
        });
    });

    // Track navigation clicks
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    'event_category': 'navigation',
                    'event_label': this.textContent.trim(),
                    'custom_parameter_page': this.getAttribute('href')
                });
            }
        });
    });
}

// Export functions for debugging
window.ConsentManager = {
    hasConsent,
    trackConsentChange,
    updateGTMConsent
};

console.log('✅ Main.js loaded with simple consent tracking');
