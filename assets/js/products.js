// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
});

function initializeProductPage() {
    // Initialize category filtering
    initializeCategoryFilter();
    
    // Initialize product interactions
    initializeProductInteractions();
    
    // Track page view
    trackProductPageView();
}

function initializeCategoryFilter() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(selectedCategory);
            
            // Track category selection
            trackCategorySelection(selectedCategory);
        });
    });
    
    function filterProducts(category) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function initializeProductInteractions() {
    // Track product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on a button
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const productName = this.querySelector('h3').textContent;
            const productPrice = this.querySelector('.price')?.textContent || 'Custom Quote';
            const productCategory = this.getAttribute('data-category');
            
            trackProductView(productName, productPrice, productCategory);
        });
    });
    
    // Track button clicks
    const productButtons = document.querySelectorAll('.product-card .btn');
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const action = this.textContent.trim();
            
            trackProductAction(productName, action);
        });
    });
    
    // Track featured product interactions
    const featuredProducts = document.querySelectorAll('.featured-product');
    featuredProducts.forEach(product => {
        const buttons = product.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const productName = product.querySelector('h3').textContent;
                const action = this.textContent.trim();
                
                trackFeaturedProductAction(productName, action);
            });
        });
    });
}

function trackProductPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'event_category': 'products',
            'event_label': 'products_page',
            'custom_parameter_page_type': 'product_catalog'
        });
    }
    
    // Track with Facebook Pixel if marketing consent given
    if (typeof Cookiebot !== 'undefined' && Cookiebot.consent.marketing && typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'Product Catalog',
            content_category: 'Products',
            content_type: 'product_group'
        });
    }
}

function trackCategorySelection(category) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'category_filter', {
            'event_category': 'products',
            'event_label': category,
            'custom_parameter_category': category
        });
    }
    
    console.log('Category selected:', category);
}

function trackProductView(productName, productPrice, productCategory) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'product_view', {
            'event_category': 'products',
            'event_label': productName,
            'custom_parameter_product_name': productName,
            'custom_parameter_product_price': productPrice,
            'custom_parameter_product_category': productCategory
        });
    }
    
    // Track with Facebook Pixel if marketing consent given
    if (typeof Cookiebot !== 'undefined' && Cookiebot.consent.marketing && typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: productName,
            content_category: 'Products',
            content_type: 'product',
            value: extractPriceValue(productPrice)
        });
    }
    
    console.log('Product viewed:', productName, productPrice, productCategory);
}

function trackProductAction(productName, action) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'product_action', {
            'event_category': 'products',
            'event_label': action,
            'custom_parameter_product_name': productName,
            'custom_parameter_action': action
        });
    }
    
    // Track with Facebook Pixel if marketing consent given
    if (typeof Cookiebot !== 'undefined' && Cookiebot.consent.marketing && typeof fbq !== 'undefined') {
        if (action.toLowerCase().includes('quote') || action.toLowerCase().includes('inquire')) {
            fbq('track', 'Lead', {
                content_name: productName,
                content_category: 'Products',
                content_type: 'product'
            });
        }
    }
    
    console.log('Product action:', productName, action);
}

function trackFeaturedProductAction(productName, action) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'featured_product_action', {
            'event_category': 'products',
            'event_label': action,
            'custom_parameter_product_name': productName,
            'custom_parameter_action': action,
            'custom_parameter_featured': true
        });
    }
    
    console.log('Featured product action:', productName, action);
}

function extractPriceValue(priceString) {
    if (!priceString || priceString === 'Custom Quote') {
        return 0;
    }
    
    // Extract numeric value from price string
    const match = priceString.match(/[\d,]+/);
    if (match) {
        return parseInt(match[0].replace(/,/g, ''));
    }
    
    return 0;
}

// Track scroll depth on products page
function trackProductsScrollDepth() {
    let maxScroll = 0;
    const productGrid = document.getElementById('productGrid');
    
    if (productGrid) {
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
    }
}

function trackScrollDepth(depth) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', {
            'event_category': 'products',
            'event_label': `${depth}%`,
            'custom_parameter_scroll_depth': depth,
            'custom_parameter_page': 'products'
        });
    }
}

// Initialize scroll tracking
trackProductsScrollDepth();

// Export functions for debugging
window.ProductsPage = {
    trackProductView,
    trackProductAction,
    trackCategorySelection,
    trackFeaturedProductAction
};

console.log('Products page JavaScript loaded'); 