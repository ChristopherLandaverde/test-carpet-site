// Custom Design Studio JavaScript - Consent-Dependent Features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Custom Design Studio Initialized');
    initializeDesignStudio();
});

// Current design state
let currentDesign = {
    width: 12,
    length: 15,
    style: 'traditional',
    color: '#8B4513',
    material: 'premium-wool',
    price: 30
};

function initializeDesignStudio() {
    initializeSizeCalculator();
    initializeStyleSelector();
    initializeColorPicker();
    initializeMaterialSelector();
    updateDesignPreview();
}

function initializeSizeCalculator() {
    const widthInput = document.getElementById('roomWidth');
    const lengthInput = document.getElementById('roomLength');
    
    function updateSize() {
        const width = parseInt(widthInput.value) || 0;
        const length = parseInt(lengthInput.value) || 0;
        const area = width * length;
        const cost = area * currentDesign.price;
        
        document.getElementById('totalArea').textContent = area;
        document.getElementById('estimatedCost').textContent = cost.toLocaleString();
        
        currentDesign.width = width;
        currentDesign.length = length;
        
        updateDesignPreview();
        updateSpecifications();
    }
    
    widthInput.addEventListener('input', updateSize);
    lengthInput.addEventListener('input', updateSize);
}

function initializeStyleSelector() {
    const styleOptions = document.querySelectorAll('input[name="style"]');
    styleOptions.forEach(option => {
        option.addEventListener('change', function() {
            currentDesign.style = this.value;
            updateDesignPreview();
            updateSpecifications();
        });
    });
}

function initializeColorPicker() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentDesign.color = this.dataset.color;
            updateDesignPreview();
            updateSpecifications();
        });
    });
    colorOptions[0].classList.add('active');
}

function initializeMaterialSelector() {
    const materialOptions = document.querySelectorAll('input[name="material"]');
    materialOptions.forEach(option => {
        option.addEventListener('change', function() {
            const material = this.value;
            const prices = {
                'premium-wool': 30,
                'pure-silk': 85,
                'silk-wool-blend': 55
            };
            
            currentDesign.material = material;
            currentDesign.price = prices[material];
            
            const area = currentDesign.width * currentDesign.length;
            const cost = area * currentDesign.price;
            document.getElementById('estimatedCost').textContent = cost.toLocaleString();
            
            updateDesignPreview();
            updateSpecifications();
        });
    });
}

function updateDesignPreview() {
    const visualization = document.getElementById('carpetVisualization');
    const area = currentDesign.width * currentDesign.length;
    
    let pattern = '';
    switch(currentDesign.style) {
        case 'traditional':
            pattern = 'repeating-linear-gradient(45deg, ' + currentDesign.color + ' 0%, ' + currentDesign.color + ' 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, ' + currentDesign.color + ' 60%, ' + currentDesign.color + ' 100%)';
            break;
        case 'modern':
            pattern = 'radial-gradient(circle at 30% 30%, ' + currentDesign.color + ' 0%, ' + currentDesign.color + ' 70%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.2) 100%)';
            break;
        case 'oriental':
            pattern = 'repeating-conic-gradient(from 0deg, ' + currentDesign.color + ' 0deg 90deg, rgba(255,255,255,0.1) 90deg 180deg)';
            break;
        case 'contemporary':
            pattern = 'linear-gradient(135deg, ' + currentDesign.color + ' 0%, ' + currentDesign.color + ' 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 100%)';
            break;
    }
    
    visualization.style.background = pattern;
    visualization.style.width = Math.min(currentDesign.width * 10, 300) + 'px';
    visualization.style.height = Math.min(currentDesign.length * 10, 200) + 'px';
}

function updateSpecifications() {
    const area = currentDesign.width * currentDesign.length;
    const cost = area * currentDesign.price;
    
    document.getElementById('specSize').textContent = currentDesign.width + "' × " + currentDesign.length + "'";
    document.getElementById('specStyle').textContent = currentDesign.style.charAt(0).toUpperCase() + currentDesign.style.slice(1);
    document.getElementById('specColor').textContent = getColorName(currentDesign.color);
    document.getElementById('specMaterial').textContent = getMaterialName(currentDesign.material);
    document.getElementById('specCost').textContent = '$' + cost.toLocaleString();
}

function getColorName(color) {
    const colorNames = {
        '#8B4513': 'Saddle Brown',
        '#D2691E': 'Chocolate',
        '#F4A460': 'Sandy Brown',
        '#DEB887': 'Burly Wood',
        '#F5DEB3': 'Wheat',
        '#8FBC8F': 'Dark Sea Green',
        '#4682B4': 'Steel Blue',
        '#9370DB': 'Medium Purple',
        '#DC143C': 'Crimson',
        '#2F4F4F': 'Dark Slate Gray',
        '#FFFFFF': 'White',
        '#000000': 'Black'
    };
    return colorNames[color] || 'Custom';
}

function getMaterialName(material) {
    const materialNames = {
        'premium-wool': 'Premium Wool',
        'pure-silk': 'Pure Silk',
        'silk-wool-blend': 'Silk & Wool Blend'
    };
    return materialNames[material] || material;
}

// Consent-Dependent Functions

function saveDesign() {
    console.log('💾 Attempting to save design...');
    
    if (!hasConsent('preferences')) {
        showConsentError('Please accept preferences cookies to save your design preferences and settings.');
        return;
    }
    
    const btn = event.target;
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    setTimeout(() => {
        const designData = {
            ...currentDesign,
            savedAt: new Date().toISOString(),
            id: 'design_' + Date.now()
        };
        
        console.log('Design saved:', designData);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'design_save', {
                'event_category': 'design_studio',
                'event_label': 'design_saved'
            });
        }
        
        showSuccess('Design saved successfully! You can access it anytime from your saved designs.');
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btn.disabled = false;
    }, 1500);
}

function showRecommendations() {
    console.log('🎯 Attempting to show recommendations...');
    
    if (!hasConsent('statistics')) {
        showConsentError('Enable analytics cookies for personalized recommendations based on your preferences and popular trends.');
        return;
    }
    
    const btn = event.target;
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    setTimeout(() => {
        const recommendations = generateRecommendations();
        showRecommendationsPanel(recommendations);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'recommendations_request', {
                'event_category': 'design_studio',
                'event_label': 'recommendations_shown'
            });
        }
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btn.disabled = false;
    }, 2000);
}

function shareDesign() {
    console.log('📤 Attempting to share design...');
    
    if (!hasConsent('marketing')) {
        showConsentError('Accept marketing cookies to share your design on social media and connect with our community.');
        return;
    }
    
    const btn = event.target;
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    setTimeout(() => {
        const shareData = {
            title: 'My Custom Carpet Design - Premium Carpets Co',
            text: `Check out my custom ${currentDesign.style} carpet design!`,
            url: window.location.href
        };
        
        console.log('Sharing design:', shareData);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_share', {
                'event_category': 'design_studio',
                'event_label': 'design_shared'
            });
        }
        
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Share', {
                content_name: 'Custom Carpet Design',
                content_category: 'Design Studio'
            });
        }
        
        showSuccess('Design shared successfully! Your friends can now see your amazing carpet design.');
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btn.disabled = false;
    }, 1500);
}

function show3DVisualization() {
    console.log('🎮 Attempting to show 3D visualization...');
    
    if (!hasConsent('statistics') || !hasConsent('preferences')) {
        showConsentError('Enable both analytics and preferences cookies for advanced 3D room visualization and personalized room modeling.');
        return;
    }
    
    const btn = event.target;
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    setTimeout(() => {
        show3DVisualizationPanel();
        
        if (typeof gtag !== 'undefined') {
            gtag('event', '3d_visualization', {
                'event_category': 'design_studio',
                'event_label': '3d_preview_shown'
            });
        }
        
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        btn.disabled = false;
    }, 2500);
}

// Helper Functions

function showConsentError(message) {
    console.log('❌ Consent error:', message);
    document.getElementById('consentErrorMessage').textContent = message;
    document.getElementById('consentErrorPanel').style.display = 'flex';
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'consent_error', {
            'event_category': 'design_studio',
            'event_label': 'consent_required'
        });
    }
}

function closeConsentError() {
    document.getElementById('consentErrorPanel').style.display = 'none';
}

function generateRecommendations() {
    return [
        {
            title: 'Popular in Your Area',
            description: 'Based on recent orders in your region, customers love the ' + currentDesign.style + ' style with complementary colors.',
            type: 'trending'
        },
        {
            title: 'Perfect for Your Room Size',
            description: 'For a ' + currentDesign.width + '×' + currentDesign.length + ' room, we recommend considering a border design to enhance the space.',
            type: 'size-based'
        }
    ];
}

function showRecommendationsPanel(recommendations) {
    const content = document.getElementById('recommendationsContent');
    content.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-item';
        recDiv.innerHTML = `
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
            <span class="rec-type">${rec.type}</span>
        `;
        content.appendChild(recDiv);
    });
    
    document.getElementById('recommendationsPanel').style.display = 'flex';
}

function closeRecommendations() {
    document.getElementById('recommendationsPanel').style.display = 'none';
}

function show3DVisualizationPanel() {
    const room3D = document.getElementById('3dRoom');
    room3D.innerHTML = `
        <div class="3d-room-container" style="
            width: 100%;
            height: 300px;
            background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                        linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                        linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            position: relative;
            transform: perspective(1000px) rotateY(15deg) rotateX(10deg);
            transition: transform 0.3s ease;
        ">
            <div class="3d-carpet" style="
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: ${Math.min(currentDesign.width * 15, 200)}px;
                height: ${Math.min(currentDesign.length * 15, 150)}px;
                background: ${currentDesign.color};
                border: 2px solid #333;
            "></div>
        </div>
    `;
    
    document.getElementById('visualizationPanel').style.display = 'flex';
}

function closeVisualization() {
    document.getElementById('visualizationPanel').style.display = 'none';
}

function showSuccess(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successPanel').style.display = 'flex';
    
    setTimeout(() => {
        closeSuccess();
    }, 3000);
}

function closeSuccess() {
    document.getElementById('successPanel').style.display = 'none';
}

// 3D Controls
function rotateView(direction) {
    const room = document.querySelector('.3d-room-container');
    if (room) {
        const currentTransform = room.style.transform;
        const currentRotation = currentTransform.match(/rotateY\(([^)]+)\)/);
        const currentAngle = currentRotation ? parseInt(currentRotation[1]) : 15;
        
        const newAngle = direction === 'left' ? currentAngle - 15 : currentAngle + 15;
        room.style.transform = `perspective(1000px) rotateY(${newAngle}deg) rotateX(10deg)`;
    }
}

function zoomView(direction) {
    const room = document.querySelector('.3d-room-container');
    if (room) {
        const currentTransform = room.style.transform;
        const currentScale = currentTransform.match(/scale\(([^)]+)\)/);
        const currentZoom = currentScale ? parseFloat(currentScale[1]) : 1;
        
        const newZoom = direction === 'in' ? currentZoom * 1.2 : currentZoom / 1.2;
        room.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${newZoom})`);
    }
}

// Export functions for debugging
window.CustomDesignStudio = {
    currentDesign,
    saveDesign,
    showRecommendations,
    shareDesign,
    show3DVisualization,
    hasConsent
};

console.log('✅ Custom design studio JavaScript loaded with consent-dependent features'); 