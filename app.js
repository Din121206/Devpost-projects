// Main application JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing components...');
    
    // First, remove the loading class from body
    document.body.classList.remove('loading');
    
    // Then handle the loading overlay with a small delay
    setTimeout(() => {
        console.log('Handling loading overlay...');
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            // Start fade out
            loadingOverlay.style.opacity = '0';
            
            // Remove overlay after animation completes
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                // Make sure body is not hidden
                document.body.style.visibility = 'visible';
                document.body.style.opacity = '1';
                console.log('Loading overlay hidden');
            }, 500);
        }
    }, 300); // Slightly longer delay to ensure CSS is applied
    
    // Initialize components
    console.log('Initializing mobile menu...');
    initMobileMenu();
    
    console.log('Initializing back to top button...');
    initBackToTop();
    
    console.log('Initializing smooth scrolling...');
    initSmoothScrolling();
    
    console.log('All components initialized');
});

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) {
        console.error('Back to top button not found!');
        return;
    }

    console.log('Back to top button found:', backToTop);

    // Show/hide button based on scroll position
    function toggleVisibility() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Simple smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Back to top button clicked!');
        scrollToTop();
        return false;
    });
    
    // Initial check
    toggleVisibility();
    
    console.log('Back to top button initialized successfully');
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's a # link or a resource modal link
            if (targetId === '#' || this.classList.contains('resource-link')) {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const menuToggle = document.querySelector('.menu-toggle');
                const nav = document.querySelector('nav');
                if (menuToggle && nav && nav.classList.contains('active')) {
                    menuToggle.click();
                }
                
                // Scroll to the target
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without adding to history
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

// Handle page load with hash in URL
window.addEventListener('load', function() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});
