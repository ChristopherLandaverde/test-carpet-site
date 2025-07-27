// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        initializeContactForm();
    }
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = form.querySelector('#email');
        if (emailField && emailField.value) {
            if (!isValidEmail(emailField.value)) {
                showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
    }
    
    function clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function handleFormSubmission() {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Track form submission
        trackFormSubmission(formObject);
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showSuccessMessage();
            resetForm();
            
            // Hide loading state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function trackFormSubmission(formData) {
        // Track with GTM
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'contact',
                'event_label': 'contact_form',
                'custom_parameter_project_type': formData.projectType,
                'custom_parameter_budget': formData.budget,
                'custom_parameter_timeline': formData.timeline
            });
        }
        
        // Track with Facebook Pixel if marketing consent given
        if (typeof Cookiebot !== 'undefined' && Cookiebot.consent.marketing && typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Contact Form',
                content_category: 'Contact',
                value: getBudgetValue(formData.budget)
            });
        }
        
        console.log('Form submitted:', formData);
    }
    
    function getBudgetValue(budget) {
        const budgetValues = {
            'under-5k': 2500,
            '5k-15k': 10000,
            '15k-50k': 32500,
            '50k-plus': 75000,
            'discuss': 0
        };
        return budgetValues[budget] || 0;
    }
    
    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; margin-top: 1rem; border: 1px solid #c3e6cb;">
                <h4 style="margin: 0 0 0.5rem 0; color: #155724;">Thank you for your message!</h4>
                <p style="margin: 0; color: #155724;">We've received your consultation request and will contact you within 24 hours to schedule your appointment with our family.</p>
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function resetForm() {
        form.reset();
        
        // Clear any remaining error states
        const errorDivs = form.querySelectorAll('.field-error');
        errorDivs.forEach(div => div.remove());
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
}

// Track form interactions
function trackFormInteraction(action, fieldName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_interaction', {
            'event_category': 'contact',
            'event_label': action,
            'custom_parameter_field': fieldName
        });
    }
}

// Track showroom visit interest
function trackShowroomInterest() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'showroom_interest', {
            'event_category': 'contact',
            'event_label': 'showroom_visit'
        });
    }
}

// Track phone call clicks
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'contact',
                    'event_label': 'phone_click'
                });
            }
        });
    });
    
    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    'event_category': 'contact',
                    'event_label': 'email_click'
                });
            }
        });
    });
});

// Export functions for debugging
window.ContactForm = {
    trackFormInteraction,
    trackShowroomInterest
};

console.log('Contact form JavaScript loaded'); 