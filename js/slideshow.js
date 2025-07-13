document.addEventListener('DOMContentLoaded', function() {
    // Get all slides and dots
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds between slides
    let slideTimer;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides and remove active class from dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide and update dot
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Function to go to the next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Start the slideshow
    function startSlideshow() {
        slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Pause the slideshow when hovering over it
    const slideshow = document.querySelector('.hero-slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });

        slideshow.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Reset the timer when manually changing slides
            clearInterval(slideTimer);
            startSlideshow();
        });
    });

    // Start the slideshow
    startSlideshow();
});
