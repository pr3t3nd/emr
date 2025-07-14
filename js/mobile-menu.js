/**
 * Mobile Menu Functionality
 * Handles the mobile menu toggle and related interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script loaded');
    
    // Mobile menu elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const mobileHeader = document.querySelector('.mobile-header');
    let isMenuOpen = false;

    // Debug: Log element status
    console.log('Menu elements:', {
        toggle: mobileMenuToggle,
        closeButton: mobileMenuClose,
        overlay: mobileMenuOverlay,
        links: mobileMenuLinks,
        header: mobileHeader
    });

    // Open mobile menu
    function openMobileMenu() {
        if (isMenuOpen) return;
        
        console.log('Opening mobile menu');
        isMenuOpen = true;
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
        
        // Show overlay and ensure it's visible
        mobileMenuOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Force reflow/repaint
        void mobileMenuOverlay.offsetHeight;
        
        // Start the open animation
        requestAnimationFrame(() => {
            mobileMenuOverlay.classList.add('active');
            console.log('Menu opened');
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (!isMenuOpen) return;
        
        console.log('Closing mobile menu');
        isMenuOpen = false;
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        
        // Start the close animation
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Wait for transition to complete before hiding completely
        setTimeout(() => {
            if (!isMenuOpen) { // Only hide if still closed
                mobileMenuOverlay.style.display = 'none';
            }
            console.log('Menu closed');
        }, 300);
    }
    
    // Toggle mobile menu
    function toggleMobileMenu(event) {
        console.log('Toggle menu clicked');
        event.preventDefault();
        event.stopPropagation();
        
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Close mobile menu when clicking outside
    function handleOverlayClick(event) {
        if (event.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    }

    // Close menu when clicking on a link
    function handleLinkClick() {
        closeMobileMenu();
    }

    // Close menu when pressing Escape key
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    }

    // Event Listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', handleOverlayClick);
    }

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });

    // Add keyboard event listener
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});
