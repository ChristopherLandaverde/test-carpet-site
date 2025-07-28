// Contact Form JavaScript - Enhanced AJAX Simulation
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
            simulateAjaxSubmission();
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
    
    function simulateAjaxSubmission() {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);
        
        // Show loading state
        showLoadingState();
        
        // Track form submission
        trackFormSubmission(formObject);
        
        // Simulate AJAX request with realistic timing and states
        simulateAjaxRequest(formObject);
    }
    
    function showLoadingState() {
        // Disable form
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => input.disabled = true);
        
        // Update submit button
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.style.background = '#6c757d';
        submitBtn.style.cursor = 'not-allowed';
        
        // Add loading overlay
        addLoadingOverlay();
    }
    
    function addLoadingOverlay() {
        const form = document.getElementById('contactForm');
        
        // Remove existing overlay
        const existingOverlay = document.getElementById('formLoadingOverlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Create loading overlay
        const overlay = document.createElement('div');
        overlay.id = 'formLoadingOverlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 8px;
        `;
        
        overlay.innerHTML = `
            <div class="spinner" style="
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            "></div>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Sending your message...</p>
        `;
        
        // Add spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        form.style.position = 'relative';
        form.appendChild(overlay);
    }
    
    function simulateAjaxRequest(formData) {
        // Simulate network delay and processing
        const processingSteps = [
            { delay: 800, message: 'Validating form data...' },
            { delay: 1200, message: 'Connecting to server...' },
            { delay: 1500, message: 'Sending message...' },
            { delay: 1000, message: 'Processing response...' }
        ];
        
        let currentStep = 0;
        
        function updateLoadingMessage() {
            const overlay = document.getElementById('formLoadingOverlay');
            if (overlay && processingSteps[currentStep]) {
                const messageEl = overlay.querySelector('p');
                messageEl.textContent = processingSteps[currentStep].message;
            }
        }
        
        function processNextStep() {
            if (currentStep < processingSteps.length) {
                updateLoadingMessage();
                currentStep++;
                setTimeout(processNextStep, processingSteps[currentStep - 1].delay);
            } else {
                // Simulate success (90% chance) or error (10% chance)
                const isSuccess = Math.random() > 0.1;
                
                if (isSuccess) {
                    handleSuccess();
                } else {
                    handleError();
                }
            }
        }
        
        // Start processing
        setTimeout(processNextStep, 500);
    }
    
    function handleSuccess() {
        // Remove loading overlay
        const overlay = document.getElementById('formLoadingOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        resetForm();
        
        // Re-enable form
        enableForm();
    }
    
    function handleError() {
        // Remove loading overlay
        const overlay = document.getElementById('formLoadingOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Show error message
        showErrorMessage();
        
        // Re-enable form
        enableForm();
    }
    
    function enableForm() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, select, textarea, button');
        inputs.forEach(input => input.disabled = false);
        
        // Reset submit button
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.style.background = '';
        submitBtn.style.cursor = '';
    }
    
    function showSuccessMessage() {
        // Remove existing messages
        removeExistingMessages();
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
                color: #155724;
                padding: 1.5rem;
                border-radius: 12px;
                margin-top: 1.5rem;
                border: 2px solid #c3e6cb;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.5s ease-out;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <div style="
                        width: 24px;
                        height: 24px;
                        background: #28a745;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 0.75rem;
                    ">
                        <span style="color: white; font-size: 14px;">✓</span>
                    </div>
                    <h4 style="margin: 0; color: #155724; font-size: 1.1rem;">Message Sent Successfully!</h4>
                </div>
                <p style="margin: 0; color: #155724; line-height: 1.5;">
                    Thank you for contacting Premium Carpets Co! We've received your consultation request and will contact you within 24 hours to schedule your appointment with our family.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #c3e6cb;">
                    <small style="color: #155724; opacity: 0.8;">
                        📧 You'll receive a confirmation email shortly<br>
                        📞 Our team will call you within 24 hours<br>
                        🏠 We're excited to help with your carpet project!
                    </small>
                </div>
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove success message after 8 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.style.animation = 'slideOut 0.5s ease-in';
                setTimeout(() => successDiv.remove(), 500);
            }
        }, 8000);
    }
    
    function showErrorMessage() {
        // Remove existing messages
        removeExistingMessages();
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
                color: #721c24;
                padding: 1.5rem;
                border-radius: 12px;
                margin-top: 1.5rem;
                border: 2px solid #f5c6cb;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                animation: slideIn 0.5s ease-out;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <div style="
                        width: 24px;
                        height: 24px;
                        background: #dc3545;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-right: 0.75rem;
                    ">
                        <span style="color: white; font-size: 14px;">!</span>
                    </div>
                    <h4 style="margin: 0; color: #721c24; font-size: 1.1rem;">Message Could Not Be Sent</h4>
                </div>
                <p style="margin: 0; color: #721c24; line-height: 1.5;">
                    We're experiencing technical difficulties. Please try again in a few moments, or contact us directly at <strong>555-0123</strong>.
                </p>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f5c6cb;">
                    <button onclick="retrySubmission()" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">Try Again</button>
                </div>
            </div>
        `;
        
        form.parentNode.insertBefore(errorDiv, form.nextSibling);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.animation = 'slideOut 0.5s ease-in';
                setTimeout(() => errorDiv.remove(), 500);
            }
        }, 10000);
    }
    
    function removeExistingMessages() {
        const existingMessages = document.querySelectorAll('.form-success, .form-error');
        existingMessages.forEach(msg => msg.remove());
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
}

// Retry submission function (global for error message button)
function retrySubmission() {
    const form = document.getElementById('contactForm');
    if (form && validateForm()) {
        simulateAjaxSubmission();
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
    trackShowroomInterest,
    retrySubmission
};

console.log('Enhanced contact form JavaScript loaded with AJAX simulation'); 