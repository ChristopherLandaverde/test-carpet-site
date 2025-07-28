// Premium Carpets Co - Main JavaScript with Comprehensive Event Tracking
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Premium Carpets Co - Main JavaScript Initialized');
    
    // Initialize consent tracking
    initializeConsentTracking();
    
    // Initialize comprehensive event tracking
    initializeEventTracking();
    
    // Initialize custom HTML tracking tags
    initializeCustomHTMLTags();
    
    // Initialize UI interactions
    initializeUI();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll animations
    initializeScrollAnimations();
});

// Custom HTML Tags Simulation
function initializeCustomHTMLTags() {
    console.log('🏷️ Initializing custom HTML tracking tags...');
    
    // Create custom tracking functions that simulate separate GTM tags
    window.CustomTracking = {
        // Page View Tag
        trackPageView: function(pageData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Page View', pageData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_view', pageData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_page_view',
                    'custom_parameter_page_type': pageData.custom_parameter_page_type,
                    'custom_parameter_user_type': pageData.custom_parameter_user_type
                });
            }
        },
        
        // Button Click Tag
        trackButtonClick: function(buttonData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Button Click', buttonData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'button_click', buttonData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_button_click',
                    'custom_parameter_tracking': buttonData.custom_parameter_tracking,
                    'custom_parameter_action': buttonData.custom_parameter_action,
                    'custom_parameter_cta_type': buttonData.custom_parameter_cta_type
                });
            }
        },
        
        // Form Submit Tag
        trackFormSubmit: function(formData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Form Submit', formData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', formData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_form_submit',
                    'custom_parameter_form_type': formData.custom_parameter_form_type,
                    'custom_parameter_form_tracking': formData.custom_parameter_form_tracking
                });
            }
        },
        
        // Product View Tag
        trackProductView: function(productData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Product View', productData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'view_item', productData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_product_view',
                    'custom_parameter_product_category': productData.custom_parameter_product_category,
                    'custom_parameter_product': productData.custom_parameter_product,
                    'custom_parameter_price': productData.custom_parameter_price
                });
            }
        },
        
        // Add to Cart Tag
        trackAddToCart: function(cartData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Add to Cart', cartData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'add_to_cart', cartData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_add_to_cart',
                    'custom_parameter_product': cartData.custom_parameter_product,
                    'custom_parameter_price': cartData.custom_parameter_price
                });
            }
        },
        
        // Lead Generation Tag
        trackLead: function(leadData) {
            if (hasConsent('marketing')) {
                console.log('🏷️ Custom HTML Tag: Lead Generation', leadData);
                // Simulate sending to Facebook Pixel
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', leadData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_lead_generation',
                    'custom_parameter_lead_type': leadData.custom_parameter_lead_type || 'general'
                });
            }
        },
        
        // Contact Intent Tag
        trackContactIntent: function(contactData) {
            if (hasConsent('marketing')) {
                console.log('🏷️ Custom HTML Tag: Contact Intent', contactData);
                // Simulate sending to Facebook Pixel
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Contact', contactData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_contact_intent',
                    'custom_parameter_contact_type': contactData.custom_parameter_contact_type || 'general'
                });
            }
        },
        
        // Design Studio Tag
        trackDesignInteraction: function(designData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Design Interaction', designData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'design_interaction', designData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_design_interaction',
                    'custom_parameter_design_type': designData.custom_parameter_design_type || 'general',
                    'custom_parameter_action': designData.custom_parameter_action
                });
            }
        },
        
        // Navigation Tag
        trackNavigation: function(navData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Navigation', navData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation_click', navData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_navigation',
                    'custom_parameter_nav_type': navData.custom_parameter_navigation_type,
                    'custom_parameter_page': navData.custom_parameter_page
                });
            }
        },
        
        // Scroll Depth Tag
        trackScrollDepth: function(scrollData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: Scroll Depth', scrollData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_depth', scrollData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_scroll_depth',
                    'custom_parameter_scroll_threshold': scrollData.custom_parameter_scroll_depth
                });
            }
        },
        
        // User Engagement Tag
        trackUserEngagement: function(engagementData) {
            if (hasConsent('statistics')) {
                console.log('🏷️ Custom HTML Tag: User Engagement', engagementData);
                // Simulate sending to GA4
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'user_engagement', engagementData);
                }
                // Push to dataLayer for Chrome extension detection
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'custom_user_engagement',
                    'custom_parameter_engagement_type': engagementData.event_label
                });
            }
        }
    };
    
    console.log('✅ Custom HTML tracking tags initialized');
}

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
    if (typeof window.CustomTracking !== 'undefined') {
        const pageData = {
            'page_title': document.title,
            'page_location': window.location.href,
            'custom_parameter_page_type': getPageType(),
            'custom_parameter_user_type': getUserType(),
            'custom_parameter_session_id': getSessionId()
        };
        
        window.CustomTracking.trackPageView(pageData);
        
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
                    
                    if (typeof window.CustomTracking !== 'undefined') {
                        const scrollData = {
                            'event_category': 'engagement',
                            'event_label': `${threshold}%`,
                            'custom_parameter_scroll_depth': threshold,
                            'custom_parameter_page': getPageType()
                        };
                        
                        window.CustomTracking.trackScrollDepth(scrollData);
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
        
        if (typeof window.CustomTracking !== 'undefined') {
            const timeData = {
                'event_category': 'engagement',
                'event_label': `${timeOnPage}s`,
                'custom_parameter_time_seconds': timeOnPage,
                'custom_parameter_page': getPageType()
            };
            
            window.CustomTracking.trackUserEngagement(timeData);
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
            if (typeof window.CustomTracking !== 'undefined') {
                const engagementData = {
                    'event_category': 'engagement',
                    'event_label': 'mouse_movement',
                    'custom_parameter_mouse_moves': mouseMoveCount
                };
                
                window.CustomTracking.trackUserEngagement(engagementData);
            }
        }
    });
    
    // Track clicks on non-interactive elements
    document.addEventListener('click', function(e) {
        if (!e.target.closest('a, button, input, select, textarea')) {
            if (typeof window.CustomTracking !== 'undefined') {
                const engagementData = {
                    'event_category': 'engagement',
                    'event_label': 'content_click',
                    'custom_parameter_clicked_element': e.target.tagName
                };
                
                window.CustomTracking.trackUserEngagement(engagementData);
            }
        }
    });
}

function trackFormInteractions() {
    // Track form field interactions
    document.addEventListener('focusin', function(e) {
        if (e.target.matches('input, textarea, select')) {
            const tracking = e.target.dataset.tracking;
            const field = e.target.dataset.field;
            const fieldType = e.target.dataset.fieldType;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const formData = {
                    'event_category': 'forms',
                    'event_label': 'field_focus',
                    'custom_parameter_field_name': e.target.name || e.target.id,
                    'custom_parameter_field_type': e.target.type,
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_field': field,
                    'custom_parameter_field_type_detail': fieldType
                };
                
                window.CustomTracking.trackUserEngagement(formData);
            }
        }
    });
    
    // Track form submissions
    document.addEventListener('submit', function(e) {
        const formTracking = e.target.dataset.tracking;
        const formType = e.target.dataset.formType;
        
        if (typeof window.CustomTracking !== 'undefined') {
            const formData = {
                'event_category': 'forms',
                'event_label': 'form_submitted',
                'custom_parameter_form_id': e.target.id,
                'custom_parameter_form_action': e.target.action,
                'custom_parameter_form_tracking': formTracking,
                'custom_parameter_form_type': formType
            };
            
            window.CustomTracking.trackFormSubmit(formData);
        }
        
        // Track with Facebook Pixel
        if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
            fbq('track', 'Lead', {
                content_name: e.target.id || 'Form Submission',
                content_category: 'Forms',
                content_type: formType
            });
        }
    });
    
    // Track form option selections
    document.addEventListener('change', function(e) {
        if (e.target.matches('select, input[type="radio"], input[type="checkbox"]')) {
            const tracking = e.target.dataset.tracking;
            const field = e.target.dataset.field;
            const fieldType = e.target.dataset.fieldType;
            const option = e.target.dataset.option;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const formData = {
                    'event_category': 'forms',
                    'event_label': 'option_selected',
                    'custom_parameter_field_name': e.target.name || e.target.id,
                    'custom_parameter_field_type': e.target.type,
                    'custom_parameter_selected_value': e.target.value,
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_field': field,
                    'custom_parameter_field_type_detail': fieldType,
                    'custom_parameter_option': option
                };
                
                window.CustomTracking.trackUserEngagement(formData);
            }
        }
    });
}

function trackNavigationInteractions() {
    // Track navigation menu clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-menu a, .navbar a')) {
            const tracking = e.target.dataset.tracking;
            const page = e.target.dataset.page;
            const category = e.target.dataset.category;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const navData = {
                    'event_category': 'navigation',
                    'event_label': e.target.textContent.trim(),
                    'custom_parameter_destination': e.target.href,
                    'custom_parameter_navigation_type': 'main_menu',
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_page': page,
                    'custom_parameter_category': category
                };
                
                window.CustomTracking.trackNavigation(navData);
            }
        }
    });
    
    // Track breadcrumb clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.breadcrumb a')) {
            if (typeof window.CustomTracking !== 'undefined') {
                const navData = {
                    'event_category': 'navigation',
                    'event_label': 'breadcrumb',
                    'custom_parameter_destination': e.target.href,
                    'custom_parameter_navigation_type': 'breadcrumb'
                };
                
                window.CustomTracking.trackNavigation(navData);
            }
        }
    });
    
    // Track brand logo clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="nav_brand"]')) {
            const page = e.target.dataset.page;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const navData = {
                    'event_category': 'navigation',
                    'event_label': 'brand_logo',
                    'custom_parameter_destination': e.target.href,
                    'custom_parameter_navigation_type': 'brand',
                    'custom_parameter_page': page
                };
                
                window.CustomTracking.trackNavigation(navData);
            }
        }
    });
    
    // Track contact phone clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="nav_contact"]')) {
            const contactType = e.target.dataset.contactType;
            const phone = e.target.dataset.phone;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const contactData = {
                    'event_category': 'contact',
                    'event_label': 'phone_contact',
                    'custom_parameter_contact_type': contactType,
                    'custom_parameter_phone': phone,
                    'custom_parameter_location': 'navigation'
                };
                
                window.CustomTracking.trackContactIntent(contactData);
            }
        }
    });
}

function trackButtonInteractions() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn, button')) {
            const buttonText = e.target.textContent.trim();
            const buttonClass = e.target.className;
            const tracking = e.target.dataset.tracking;
            const action = e.target.dataset.action;
            const destination = e.target.dataset.destination;
            const ctaType = e.target.dataset.ctaType;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const buttonData = {
                    'event_category': 'engagement',
                    'event_label': buttonText,
                    'custom_parameter_button_type': buttonClass.includes('btn-primary') ? 'primary' : 'secondary',
                    'custom_parameter_button_class': buttonClass,
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_action': action,
                    'custom_parameter_destination': destination,
                    'custom_parameter_cta_type': ctaType
                };
                
                window.CustomTracking.trackButtonClick(buttonData);
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
            const tracking = e.target.dataset.tracking;
            const contactType = e.target.dataset.contactType;
            const phone = e.target.dataset.phone;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const linkData = {
                    'event_category': 'engagement',
                    'event_label': e.target.textContent.trim(),
                    'custom_parameter_link_url': e.target.href,
                    'custom_parameter_link_type': e.target.href.startsWith('mailto:') ? 'email' : 
                                                 e.target.href.startsWith('tel:') ? 'phone' : 'external',
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_contact_type': contactType,
                    'custom_parameter_phone': phone
                };
                
                window.CustomTracking.trackUserEngagement(linkData);
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
                if (typeof window.CustomTracking !== 'undefined') {
                    const searchData = {
                        'event_category': 'engagement',
                        'event_label': 'search_submitted',
                        'search_term': searchInput.value
                    };
                    
                    window.CustomTracking.trackUserEngagement(searchData);
                }
            }
        }
    });
}

function trackVideoInteractions() {
    // Track video interactions (for future video content)
    document.addEventListener('click', function(e) {
        if (e.target.matches('video, .video-player, .play-button')) {
            if (typeof window.CustomTracking !== 'undefined') {
                const videoData = {
                    'event_category': 'engagement',
                    'event_label': 'video_play',
                    'custom_parameter_video_title': e.target.title || 'Unknown Video'
                };
                
                window.CustomTracking.trackUserEngagement(videoData);
            }
        }
    });
}

function trackSocialInteractions() {
    // Track social media sharing
    document.addEventListener('click', function(e) {
        if (e.target.matches('.social-share, .share-button, [data-share]')) {
            if (typeof window.CustomTracking !== 'undefined') {
                const socialData = {
                    'event_category': 'social',
                    'event_label': 'content_shared',
                    'custom_parameter_share_platform': e.target.dataset.platform || 'unknown'
                };
                
                window.CustomTracking.trackUserEngagement(socialData);
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
        if (e.target.closest('.product-card, .product-item, .featured-product')) {
            const productCard = e.target.closest('.product-card, .product-item, .featured-product');
            const productName = productCard.querySelector('h3, .product-name')?.textContent || 'Unknown Product';
            const tracking = productCard.dataset.tracking;
            const product = productCard.dataset.product;
            const category = productCard.dataset.category;
            const collection = productCard.dataset.collection;
            const price = productCard.dataset.price;
            const material = productCard.dataset.material;
            const origin = productCard.dataset.origin;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const productData = {
                    'event_category': 'ecommerce',
                    'event_label': 'product_viewed',
                    'custom_parameter_product_name': productName,
                    'custom_parameter_product_category': 'carpets',
                    'custom_parameter_tracking': tracking,
                    'custom_parameter_product': product,
                    'custom_parameter_category': category,
                    'custom_parameter_collection': collection,
                    'custom_parameter_price': price,
                    'custom_parameter_material': material,
                    'custom_parameter_origin': origin
                };
                
                window.CustomTracking.trackProductView(productData);
            }
        }
    });
    
    // Track add to cart (simulated)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-to-cart, .cart-button')) {
            const product = e.target.dataset.product;
            const price = e.target.dataset.price;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const cartData = {
                    'event_category': 'ecommerce',
                    'event_label': 'item_added_to_cart',
                    'custom_parameter_product_name': e.target.dataset.product || 'Unknown Product',
                    'custom_parameter_product': product,
                    'custom_parameter_price': price
                };
                
                window.CustomTracking.trackAddToCart(cartData);
            }
            
            // Track with Facebook Pixel
            if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
                fbq('track', 'AddToCart', {
                    content_name: e.target.dataset.product || 'Unknown Product',
                    content_category: 'Carpets',
                    value: price
                });
            }
        }
    });
    
    // Track product actions (quote request, customize)
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="product_action"]')) {
            const action = e.target.dataset.action;
            const product = e.target.dataset.product;
            const price = e.target.dataset.price;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const buttonData = {
                    'event_category': 'ecommerce',
                    'event_label': action,
                    'custom_parameter_action': action,
                    'custom_parameter_product': product,
                    'custom_parameter_price': price
                };
                
                window.CustomTracking.trackButtonClick(buttonData);
            }
        }
    });
    
    // Track product badges
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="product_badge"]')) {
            const badgeType = e.target.dataset.badgeType;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const buttonData = {
                    'event_category': 'ecommerce',
                    'event_label': 'badge_clicked',
                    'custom_parameter_badge_type': badgeType
                };
                
                window.CustomTracking.trackButtonClick(buttonData);
            }
        }
    });
}

function trackCustomEvents() {
    // Track custom design studio events
    document.addEventListener('click', function(e) {
        if (e.target.closest('.design-controls')) {
            if (e.target.matches('.color-option')) {
                const colorHex = e.target.dataset.colorHex;
                const colorName = e.target.dataset.colorName;
                trackDesignEvent('color_selected', e.target.dataset.color, {
                    color_hex: colorHex,
                    color_name: colorName
                });
            } else if (e.target.matches('input[name="style"]')) {
                const style = e.target.dataset.style;
                trackDesignEvent('style_selected', e.target.value, {
                    style: style
                });
            } else if (e.target.matches('input[name="material"]')) {
                const material = e.target.dataset.material;
                trackDesignEvent('material_selected', e.target.value, {
                    material: material
                });
            }
        }
    });
    
    // Track room dimension changes
    document.addEventListener('input', function(e) {
        if (e.target.matches('[data-tracking="room_dimension"]')) {
            const dimension = e.target.dataset.dimension;
            const unit = e.target.dataset.unit;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const designData = {
                    'event_category': 'custom_design',
                    'event_label': 'room_dimension_changed',
                    'custom_parameter_dimension': dimension,
                    'custom_parameter_unit': unit,
                    'custom_parameter_value': e.target.value
                };
                
                window.CustomTracking.trackDesignInteraction(designData);
            }
        }
    });
    
    // Track action buttons in design studio
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="action_button"]')) {
            const action = e.target.dataset.action;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const designData = {
                    'event_category': 'custom_design',
                    'event_label': action,
                    'custom_parameter_action': action
                };
                
                window.CustomTracking.trackDesignInteraction(designData);
            }
        }
    });
    
    // Track consultation requests
    document.addEventListener('click', function(e) {
        if (e.target.matches('.consultation-btn, .book-consultation')) {
            trackConsultationRequest();
        }
    });
    
    // Track category filters
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="category_filter"]')) {
            const filter = e.target.dataset.filter;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const navData = {
                    'event_category': 'navigation',
                    'event_label': 'filter_applied',
                    'custom_parameter_filter': filter
                };
                
                window.CustomTracking.trackNavigation(navData);
            }
        }
    });
    
    // Track offering cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('[data-tracking="offering_card"]')) {
            const offeringCard = e.target.closest('[data-tracking="offering_card"]');
            const offeringType = offeringCard.dataset.offeringType;
            const category = offeringCard.dataset.category;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const buttonData = {
                    'event_category': 'engagement',
                    'event_label': 'offering_viewed',
                    'custom_parameter_offering_type': offeringType,
                    'custom_parameter_category': category
                };
                
                window.CustomTracking.trackButtonClick(buttonData);
            }
        }
    });
    
    // Track featured project clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-tracking="featured_project"]')) {
            const project = e.target.dataset.project;
            const destination = e.target.dataset.destination;
            const ctaType = e.target.dataset.ctaType;
            
            if (typeof window.CustomTracking !== 'undefined') {
                const buttonData = {
                    'event_category': 'engagement',
                    'event_label': 'project_viewed',
                    'custom_parameter_project': project,
                    'custom_parameter_destination': destination,
                    'custom_parameter_cta_type': ctaType
                };
                
                window.CustomTracking.trackButtonClick(buttonData);
            }
        }
    });
}

// Helper Functions
function trackDesignEvent(eventType, value, additionalParams = {}) {
    if (typeof window.CustomTracking !== 'undefined') {
        const designData = {
            'event_category': 'custom_design',
            'event_label': eventType,
            'custom_parameter_design_value': value,
            'custom_parameter_page': 'design_studio'
        };
        
        // Add additional parameters
        Object.keys(additionalParams).forEach(key => {
            designData[`custom_parameter_${key}`] = additionalParams[key];
        });
        
        window.CustomTracking.trackDesignInteraction(designData);
    }
}

function trackContactIntent() {
    if (typeof window.CustomTracking !== 'undefined') {
        const contactData = {
            'event_category': 'conversion',
            'event_label': 'contact_requested'
        };
        
        window.CustomTracking.trackContactIntent(contactData);
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Contact', {
            content_name: 'Contact Request',
            content_category: 'Conversion'
        });
    }
}

function trackQuoteRequest() {
    if (typeof window.CustomTracking !== 'undefined') {
        const leadData = {
            'event_category': 'conversion',
            'event_label': 'quote_requested'
        };
        
        window.CustomTracking.trackLead(leadData);
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Lead', {
            content_name: 'Quote Request',
            content_category: 'Conversion'
        });
    }
}

function trackCustomDesignIntent() {
    if (typeof window.CustomTracking !== 'undefined') {
        const leadData = {
            'event_category': 'conversion',
            'event_label': 'custom_design_requested'
        };
        
        window.CustomTracking.trackLead(leadData);
    }
    
    if (typeof fbq !== 'undefined' && hasConsent('marketing')) {
        fbq('track', 'Lead', {
            content_name: 'Custom Design Request',
            content_category: 'Conversion'
        });
    }
}

function trackConsultationRequest() {
    if (typeof window.CustomTracking !== 'undefined') {
        const leadData = {
            'event_category': 'conversion',
            'event_label': 'consultation_requested'
        };
        
        window.CustomTracking.trackLead(leadData);
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
