// Premium Carpets Co - Main JavaScript with Comprehensive Event Tracking
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Premium Carpets Co - Main JavaScript Initialized');
    
    // Initialize consent tracking
    initializeConsentTracking();
    
    // Initialize comprehensive event tracking
    initializeEventTracking();
    
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

// Comprehensive Event Tracking System
function initializeEventTracking() {
    console.log('📊 Initializing comprehensive event tracking...');
    
    // Track page view
    trackPageView();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
    
    // Track user engagement
    trackUserEngagement();
    
    // Track form interactions
    trackFormInteractions();
    
    // Track navigation interactions
    trackNavigationInteractions();
    
    // Track button interactions
    trackButtonInteractions();
    
    // Track link interactions
    trackLinkInteractions();
    
    // Track search functionality
    trackSearchInteractions();
    
    // Track video interactions (if any)
    trackVideoInteractions();
    
    // Track social media interactions
    trackSocialInteractions();
    
    // Track e-commerce events
    trackEcommerceEvents();
    
    // Track custom events
    trackCustomEvents();
}

function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'custom_parameter_page_type': getPageType(),
            'custom_parameter_user_type': getUserType(),
            'custom_parameter_session_id': getSessionId()
        });
        
        // Track with Facebook Pixel
        if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
            fbq('track', 'PageView', {
                content_name: document.title,
                content_category: getPageType()
            });
        }
        
        console.log('📄 Page view tracked:', document.title);
    }
}

function trackScrollDepth() {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90];
    const trackedThresholds = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollThresholds.forEach(threshold => {
                if (maxScroll >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': `${threshold}%`,
                            'custom_parameter_scroll_depth': threshold,
                            'custom_parameter_page': getPageType()
                        });
                    }
                    
                    console.log(`📊 Scroll depth tracked: ${threshold}%`);
                }
            });
        }
    });
}

function trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                'event_category': 'engagement',
                'event_label': `${timeOnPage}s`,
                'custom_parameter_time_seconds': timeOnPage,
                'custom_parameter_page': getPageType()
            });
        }
        
        console.log(`⏱️ Time on page tracked: ${timeOnPage}s`);
    });
}

function trackUserEngagement() {
    // Track mouse movements (heatmap simulation)
    let mouseMoveCount = 0;
    const mouseMoveThreshold = 50;
    
    document.addEventListener('mousemove', function() {
        mouseMoveCount++;
        
        if (mouseMoveCount % mouseMoveThreshold === 0) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'user_engagement', {
                    'event_category': 'engagement',
                    'event_label': 'mouse_movement',
                    'custom_parameter_mouse_moves': mouseMoveCount
                });
            }
        }
    });
    
    // Track clicks on non-interactive elements
    document.addEventListener('click', function(e) {
        if (!e.target.closest('a, button, input, select, textarea')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'user_engagement', {
                    'event_category': 'engagement',
                    'event_label': 'content_click',
                    'custom_parameter_clicked_element': e.target.tagName
                });
            }
        }
    });
}

function trackFormInteractions() {
    // Track form field interactions
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input, textarea, select')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_interaction', {
                    'event_category': 'forms',
                    'event_label': 'field_focus',
                    'custom_parameter_field_name': e.target.name || e.target.id,
                    'custom_parameter_field_type': e.target.type
                });
            }
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'forms',
                'event_label': 'form_submitted',
                'custom_parameter_form_id': e.target.id,
                'custom_parameter_form_action': e.target.action
            });
        }
        
        // Track with Facebook Pixel
        if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
            fbq('track', 'Lead', {
                content_name: e.target.id || 'Form Submission',
                content_category: 'Forms'
            });
        }
    });
}

function trackNavigationInteractions() {
    // Track navigation menu clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-menu a, .navbar a')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    'event_category': 'navigation',
                    'event_label': e.target.textContent.trim(),
                    'custom_parameter_destination': e.target.href,
                    'custom_parameter_navigation_type': 'main_menu'
                });
            }
        }
    });
    
    // Track breadcrumb clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.breadcrumb a')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigation_click', {
                    'event_category': 'navigation',
                    'event_label': 'breadcrumb',
                    'custom_parameter_destination': e.target.href,
                    'custom_parameter_navigation_type': 'breadcrumb'
                });
            }
        }
    });
}

function trackButtonInteractions() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn, button')) {
            const buttonText = e.target.textContent.trim();
            const buttonClass = e.target.className;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'custom_parameter_button_type': buttonClass.includes('btn-primary') ? 'primary' : 'secondary',
                    'custom_parameter_button_class': buttonClass
                });
            }
            
            // Track specific button types
            if (buttonText.toLowerCase().includes('contact')) {
                trackContactIntent();
            } else if (buttonText.toLowerCase().includes('quote')) {
                trackQuoteRequest();
            } else if (buttonText.toLowerCase().includes('custom')) {
                trackCustomDesignIntent();
            }
        }
    });
}

function trackLinkInteractions() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="http"], a[href^="mailto:"], a[href^="tel:"]')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'link_click', {
                    'event_category': 'engagement',
                    'event_label': e.target.textContent.trim(),
                    'custom_parameter_link_url': e.target.href,
                    'custom_parameter_link_type': e.target.href.startsWith('mailto:') ? 'email' : 
                                                 e.target.href.startsWith('tel:') ? 'phone' : 'external'
                });
            }
        }
    });
}

function trackSearchInteractions() {
    // Track search form submissions
    document.addEventListener('submit', function(e) {
        if (e.target.matches('form[action*="search"], .search-form')) {
            const searchInput = e.target.querySelector('input[type="search"], input[name*="search"], input[name*="q"]');
            if (searchInput) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'search', {
                        'event_category': 'engagement',
                        'event_label': 'search_submitted',
                        'search_term': searchInput.value
                    });
                }
            }
        }
    });
}

function trackVideoInteractions() {
    // Track video interactions (for future video content)
    document.addEventListener('click', function(e) {
        if (e.target.matches('video, .video-player, .play-button')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'video_interaction', {
                    'event_category': 'engagement',
                    'event_label': 'video_play',
                    'custom_parameter_video_title': e.target.title || 'Unknown Video'
                });
            }
        }
    });
}

function trackSocialInteractions() {
    // Track social media sharing
    document.addEventListener('click', function(e) {
        if (e.target.matches('.social-share, .share-button, [data-share]')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_share', {
                    'event_category': 'social',
                    'event_label': 'content_shared',
                    'custom_parameter_share_platform': e.target.dataset.platform || 'unknown'
                });
            }
            
            // Track with Facebook Pixel
            if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
                fbq('track', 'Share', {
                    content_name: document.title,
                    content_category: 'Social Share'
                });
            }
        }
    });
}

function trackEcommerceEvents() {
    // Track product views
    document.addEventListener('click', function(e) {
        if (e.target.closest('.product-card, .product-item')) {
            const productCard = e.target.closest('.product-card, .product-item');
            const productName = productCard.querySelector('h3, .product-name')?.textContent || 'Unknown Product';
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_item', {
                    'event_category': 'ecommerce',
                    'event_label': 'product_viewed',
                    'custom_parameter_product_name': productName,
                    'custom_parameter_product_category': 'carpets'
                });
            }
        }
    });
    
    // Track add to cart (simulated)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-to-cart, .cart-button')) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'add_to_cart', {
                    'event_category': 'ecommerce',
                    'event_label': 'item_added_to_cart',
                    'custom_parameter_product_name': e.target.dataset.product || 'Unknown Product'
                });
            }
            
            // Track with Facebook Pixel
            if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
                fbq('track', 'AddToCart', {
                    content_name: e.target.dataset.product || 'Unknown Product',
                    content_category: 'Carpets'
                });
            }
        }
    });
}

function trackCustomEvents() {
    // Track custom design studio events
    document.addEventListener('click', function(e) {
        if (e.target.closest('.design-controls')) {
            if (e.target.matches('.color-option')) {
                trackDesignEvent('color_selected', e.target.dataset.color);
            } else if (e.target.matches('input[name="style"]')) {
                trackDesignEvent('style_selected', e.target.value);
            } else if (e.target.matches('input[name="material"]')) {
                trackDesignEvent('material_selected', e.target.value);
            }
        }
    });
    
    // Track consultation requests
    document.addEventListener('click', function(e) {
        if (e.target.matches('.consultation-btn, .book-consultation')) {
            trackConsultationRequest();
        }
    });
}

// Helper Functions
function trackDesignEvent(eventType, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'design_interaction', {
            'event_category': 'custom_design',
            'event_label': eventType,
            'custom_parameter_design_value': value,
            'custom_parameter_page': 'design_studio'
        });
    }
}

function trackContactIntent() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_intent', {
            'event_category': 'conversion',
            'event_label': 'contact_requested'
        });
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Contact', {
            content_name: 'Contact Request',
            content_category: 'Conversion'
        });
    }
}

function trackQuoteRequest() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quote_request', {
            'event_category': 'conversion',
            'event_label': 'quote_requested'
        });
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Lead', {
            content_name: 'Quote Request',
            content_category: 'Conversion'
        });
    }
}

function trackCustomDesignIntent() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'custom_design_intent', {
            'event_category': 'conversion',
            'event_label': 'custom_design_requested'
        });
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Lead', {
            content_name: 'Custom Design Request',
            content_category: 'Conversion'
        });
    }
}

function trackConsultationRequest() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'consultation_request', {
            'event_category': 'conversion',
            'event_label': 'consultation_requested'
        });
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Lead', {
            content_name: 'Consultation Request',
            content_category: 'Conversion'
        });
    }
}

function getPageType() {
    const path = window.location.pathname;
    if (path.includes('custom')) return 'design_studio';
    if (path.includes('products')) return 'products';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    return 'home';
}

function getUserType() {
    // Simulate different user types
    const userTypes = ['new_visitor', 'returning_visitor', 'prospect', 'customer'];
    return userTypes[Math.floor(Math.random() * userTypes.length)];
}

function getSessionId() {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
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

// Export functions for debugging
window.ConsentManager = {
    hasConsent,
    trackConsentChange,
    updateGTMConsent
};

window.EventTracker = {
    trackPageView,
    trackDesignEvent,
    trackContactIntent,
    trackQuoteRequest,
    trackCustomDesignIntent,
    trackConsultationRequest
};

console.log('✅ Enhanced main.js loaded with comprehensive event tracking');
