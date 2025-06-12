// Define all services from services.html
const services = [
    {
        icon: 'fas fa-tooth',
        title: 'General Dentistry',
        description: 'Complete oral health care for patients of all ages, including check-ups, cleanings, and fillings.',
        image: 'https://images.unsplash.com/photo-1549743770-5be8687c034f?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-smile',
        title: 'Cosmetic Dentistry',
        description: 'Enhance your smile with our cosmetic treatments including veneers, whitening, and bonding.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-teeth',
        title: 'Orthodontics',
        description: 'Straighten your teeth with our orthodontic solutions.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-toothbrush',
        title: 'Teeth Cleaning',
        description: 'Professional cleaning for a healthier smile.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-procedures',
        title: 'Dental Implants',
        description: 'The most modern and durable solution for replacing missing teeth with natural-looking results.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-crown',
        title: 'Dental Crowns',
        description: 'Quality and aesthetic repairs for your teeth and implants with custom-fitted crowns.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-braces',
        title: 'Invisalign',
        description: 'Discreet and comfortable clear aligners for effective teeth straightening without metal braces.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-heartbeat',
        title: 'Emergency Dentistry',
        description: '24/7 emergency dental care for unexpected oral health issues.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-tooth',
        title: 'Root Canal',
        description: 'Pain-free root canal treatments to save your natural teeth.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    },
    {
        icon: 'fas fa-flask',
        title: 'Teeth Whitening',
        description: 'Professional teeth whitening for a brighter, more confident smile.',
        image: 'https://images.unsplash.com/photo-1562889247-7b11523b1664?auto=format&fit=crop&w=600&q=80'
    }
];

// Function to get random services
function getRandomServices(count) {
    // Create a copy of the services array
    let servicesCopy = [...services];
    
    // Shuffle the array
    for (let i = servicesCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [servicesCopy[i], servicesCopy[j]] = [servicesCopy[j], servicesCopy[i]];
    }
    
    // Return the first 'count' services
    return servicesCopy.slice(0, count);
}

// Function to update the main services section
function updateMainServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    // Get 3 random services
    const randomServices = getRandomServices(3);

    // Clear existing services
    servicesGrid.innerHTML = '';

    // Add new services
    randomServices.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-image">
                <img src="${service.image}" alt="${service.title}" class="service-img">
            </div>
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="#" class="btn btn-outline">Learn More</a>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeServices);
} else {
    initializeServices();
}

function initializeServices() {
    console.log('Services script loaded');
    updateMainServices();
}
