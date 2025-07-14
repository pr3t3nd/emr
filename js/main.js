/**
 * EMAR Dental Clinic - Main JavaScript
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.style.overflow = 'hidden';
            mobileMenuOverlay.classList.add('active');
        });
    }

    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', function() {
            document.body.style.overflow = '';
            mobileMenuOverlay.classList.remove('active');
        });
    }

    // Close mobile menu when clicking on a menu item
    const mobileMenuItems = document.querySelectorAll('.mobileMenu .menu-item a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            document.body.style.overflow = '';
            mobileMenuOverlay.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside the menu content
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            document.body.style.overflow = '';
            mobileMenuOverlay.classList.remove('active');
        }
    });

    // Initialize AOS
    initAOS();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Navigation on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // Initialize Google Maps
    function initMap() {
        const location = { lat: 40.751784, lng: -73.938911 };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: location,
            styles: [
                {"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},
                {"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},
                {"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},
                {"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},
                {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},
                {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},
                {"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},
                {"featureType":"poi","stylers":[{"visibility":"off"}]},
                {"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},
                {"featureType":"poi.park","stylers":[{"visibility":"on"}]},
                {"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},
                {"featureType":"poi.medical","stylers":[{"visibility":"on"}]},
                {"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}
            ]
        });
        
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'EMAR Dental Clinic',
            icon: {
                url: 'images/marker.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>EMAR Dental Clinic</h3>
                    <p>123 Dental Street, City, Country</p>
                    <p><i class="fas fa-phone"></i> +1 (234) 567-890</p>
                    <a href="#appointment" class="btn btn-primary" style="padding: 5px 10px; font-size: 12px; margin-top: 5px; display: inline-block;">Book Appointment</a>
                </div>
            `
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }
    
    // Load Google Maps API
    function loadGoogleMaps() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    
    // Only load Google Maps if on a page with a map
    if (document.getElementById('map')) {
        loadGoogleMaps();
    }
    
    // Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your appointment request! We will contact you shortly to confirm your booking.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Testimonials Slider
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        if (testimonials.length > 1) {
            // Hide all testimonials except the first one
            for (let i = 1; i < testimonials.length; i++) {
                testimonials[i].style.display = 'none';
            }
            
            // Auto-rotate testimonials every 5 seconds
            setInterval(() => {
                testimonials[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].style.display = 'block';
            }, 5000);
        }
    }
    
    // Initialize testimonial slider if there are testimonials
    if (document.querySelector('.testimonial')) {
        initTestimonialSlider();
    }
    
    // Animation on Scroll Initialization
    function initAOS() {
        const elements = document.querySelectorAll('.animate');
        
        function checkIfInView() {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
                
                if (isVisible) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Check on load
        window.addEventListener('load', checkIfInView);
    }
    
    // Initialize AOS
    initAOS();
    
    // Initialize scroll handler
    function handleScroll() {
        console.log('handleScroll called');
        
        // Header scroll effect - only apply transparency on homepage
        const header = document.getElementById('header');
        const mobileHeader = document.querySelector('.mobile-header');
        const isHomepage = document.body.classList.contains('homepage');
        
        // Get scroll position
        const scrollPosition = window.scrollY;
        const scrolled = scrollPosition > 50;
        
        console.log('Scroll position:', scrollPosition, 'Scrolled:', scrolled, 'Is homepage:', isHomepage);
        
        // Handle desktop header
        if (header) {
            console.log('Desktop header found');
            
            if (isHomepage) {
                // On homepage, toggle scrolled class based on scroll position
                if (scrolled) {
                    console.log('Adding scrolled class to desktop header');
                    header.classList.add('scrolled');
                } else {
                    console.log('Removing scrolled class from desktop header');
                    header.classList.remove('scrolled');
                }
            } else {
                // On other pages, always show solid header
                console.log('Non-homepage - forcing solid header');
                header.classList.add('scrolled');
            }
        } else {
            console.error('Desktop header element not found!');
        }
        
        // Handle mobile header
        if (mobileHeader) {
            console.log('Mobile header found');
            
            if (isHomepage) {
                // On homepage, toggle scrolled class based on scroll position
                if (scrolled) {
                    console.log('Adding scrolled class to mobile header');
                    mobileHeader.classList.add('scrolled');
                } else {
                    console.log('Removing scrolled class from mobile header');
                    mobileHeader.classList.remove('scrolled');
                }
            } else {
                // On other pages, always show solid header
                console.log('Non-homepage - forcing solid mobile header');
                mobileHeader.classList.add('scrolled');
            }
        } else {
            console.log('Mobile header element not found (this is normal on desktop)');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize header state on page load
    handleScroll();

    // Active Navigation on Scroll
    function highlightNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    // Add scroll event listener for navigation highlighting
    window.addEventListener('scroll', highlightNavigation);

    // Animation on Scroll
    function checkIfInView() {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
            
            if (isVisible) {
                element.classList.add('animated');
            }
        });
    }

    // Add scroll event listener for animations
    window.addEventListener('scroll', checkIfInView);

    // Check animations on load
    window.addEventListener('load', checkIfInView);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
});
