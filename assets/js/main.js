// Premium Carpets Co - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize consent mode tracking
    initializeConsentMode();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Track page views and interactions
    trackPageInteractions();
});

// Consent Mode Initialization
function initializeConsentMode() {
    // Wait for Cookiebot to be ready
    if (typeof Cookiebot !== 'undefined') {
        window.addEventListener('CookiebotOnConsentReady', function (e) {
            console.log('Consent mode updated:', Cookiebot.consent);
            
            // Track consent changes
            trackConsentChange();
            
            // Update GTM consent state
            updateGTMConsent();
        });
    }
    
    // Track initial consent state
    setTimeout(() => {
        if (typeof Cookiebot !== 'undefined') {
            trackConsentChange();
        }
    }, 1000);
}

// Track consent changes
function trackConsentChange() {
    if (typeof gtag !== 'undefined' && typeof Cookiebot !== 'undefined') {
        const consent = Cookiebot.consent;
        
        // Log consent state for debugging
        console.log('Current consent state:', {
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

// Update GTM consent state
function updateGTMConsent() {
    if (typeof gtag !== 'undefined' && typeof Cookiebot !== 'undefined') {
        const consent = Cookiebot.consent;
        
        // Update analytics storage
        if (consent.statistics) {
            gtag("consent", "update", {
                analytics_storage: "granted"
            });
            console.log('Analytics storage granted');
        }
        
        // Update ad storage
        if (consent.marketing) {
            gtag("consent", "update", {
                ad_storage: "granted"
            });
            console.log('Ad storage granted');
        }
        
        // Update personalization storage
        if (consent.preferences) {
            gtag("consent", "update", {
                personalization_storage: "granted"
            });
            console.log('Personalization storage granted');
        }
        
        // Update functionality storage
        if (consent.necessary) {
            gtag("consent", "update", {
                functionality_storage: "granted"
            });
            console.log('Functionality storage granted');
        }
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
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
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.offering-card, .location-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            trackButtonClick(this);
        });
    });
    
    // Add scroll-based animations
    initializeScrollAnimations();
}

// Track button clicks
function trackButtonClick(button) {
    const buttonText = button.textContent.trim();
    const buttonClass = button.className;
    const href = button.getAttribute('href');
    
    // Track with GTM
    if (typeof gtag !== 'undefined') {
        gtag('event', 'button_click', {
            'event_category': 'engagement',
            'event_label': buttonText,
            'custom_parameter_button_class': buttonClass,
            'custom_parameter_destination': href
        });
    }
    
    // Track with Facebook Pixel if marketing consent given
    if (typeof Cookiebot !== 'undefined' && Cookiebot.consent.marketing && typeof fbq !== 'undefined') {
        fbq('track', 'ButtonClick', {
            button_text: buttonText,
            button_class: buttonClass,
            destination: href
        });
    }
    
    console.log('Button clicked:', buttonText);
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.offering-card, .location-card, .project-content, .craftsmanship-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Track page interactions
function trackPageInteractions() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track at 25%, 50%, 75%, 100%
            if (maxScroll >= 25 && maxScroll < 50) {
                trackScrollDepth(25);
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackScrollDepth(50);
            } else if (maxScroll >= 75 && maxScroll < 100) {
                trackScrollDepth(75);
            } else if (maxScroll >= 100) {
                trackScrollDepth(100);
            }
        }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackTimeOnPage(timeOnPage);
    });
}

// Track scroll depth
function trackScrollDepth(depth) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': `${depth}%`,
            'custom_parameter_scroll_depth': depth
        });
    }
}

// Track time on page
function trackTimeOnPage(seconds) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'event_label': `${seconds}s`,
            'custom_parameter_time_seconds': seconds
        });
    }
}

// Utility function to check if consent is given for specific category
function hasConsent(category) {
    if (typeof Cookiebot !== 'undefined') {
        return Cookiebot.consent[category] || false;
    }
    return false;
}

// Utility function to log consent state for debugging
function logConsentState() {
    if (typeof Cookiebot !== 'undefined') {
        console.log('Current consent state:', Cookiebot.consent);
        console.log('Statistics consent:', hasConsent('statistics'));
        console.log('Marketing consent:', hasConsent('marketing'));
        console.log('Preferences consent:', hasConsent('preferences'));
        console.log('Necessary consent:', hasConsent('necessary'));
    } else {
        console.log('Cookiebot not loaded');
    }
}

// Export functions for debugging
window.PremiumCarpets = {
    logConsentState,
    hasConsent,
    trackConsentChange,
    updateGTMConsent
};

// Log initial state
console.log('Premium Carpets Co - JavaScript loaded');
logConsentState();
