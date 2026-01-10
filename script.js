// =====================================================
// KAUCHES DRIVE - EXTERNAL JAVASCRIPT FILE
// =====================================================

// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ===== SCROLL HEADER EFFECT =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== ACTIVE NAVIGATION LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== BOOKING FORM HANDLING =====
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const dropoffDate = document.getElementById('dropoffDate').value;
    
    // Validate dates
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (pickup < today) {
        alert('Pick-up date cannot be in the past');
        return;
    }
    
    if (dropoff <= pickup) {
        alert('Drop-off date must be after pick-up date');
        return;
    }
    
    // Calculate rental duration
    const duration = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    
    // Store booking data
    const bookingData = {
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
        duration,
        timestamp: new Date().toISOString()
    };
    
    console.log('Booking submitted:', bookingData);
    
    // Show success message
    alert(`Searching for available vehicles...\n\n` +
          `Booking Details:\n` +
          `Pick-up: ${pickupLocation} on ${pickupDate}\n` +
          `Drop-off: ${dropoffLocation} on ${dropoffDate}\n` +
          `Duration: ${duration} day(s)\n\n` +
          `We'll show you our available fleet shortly!`);
    
    // Scroll to fleet section
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
        setTimeout(() => {
            fleetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    }
});

// ===== SET MINIMUM DATE FOR DATE INPUTS =====
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    const pickupInput = document.getElementById('pickupDate');
    const dropoffInput = document.getElementById('dropoffDate');
    
    if (pickupInput) pickupInput.setAttribute('min', today);
    if (dropoffInput) dropoffInput.setAttribute('min', today);
});

// ===== UPDATE DROPOFF MINIMUM DATE BASED ON PICKUP DATE =====
const pickupDateInput = document.getElementById('pickupDate');
if (pickupDateInput) {
    pickupDateInput.addEventListener('change', (e) => {
        const pickupDate = e.target.value;
        const dropoffInput = document.getElementById('dropoffDate');
        
        if (pickupDate && dropoffInput) {
            const nextDay = new Date(pickupDate);
            nextDay.setDate(nextDay.getDate() + 1);
            const minDropoff = nextDay.toISOString().split('T')[0];
            dropoffInput.setAttribute('min', minDropoff);
            
            // Clear dropoff if it's now invalid
            if (dropoffInput.value && dropoffInput.value <= pickupDate) {
                dropoffInput.value = '';
            }
        }
    });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Store contact data
        const contactData = {
            name,
            email,
            phone,
            message,
            timestamp: new Date().toISOString()
        };
        
        console.log('Contact form submitted:', contactData);
        
        // Show success message
        alert(`Thank you, ${name}!\n\nYour message has been received. We'll get back to you at ${email} shortly.`);
        
        // Reset form
        contactForm.reset();
    });
}

// ===== NEWSLETTER FORM HANDLING =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        console.log('Newsletter subscription:', email);
        
        alert(`Thank you for subscribing!\n\nYou'll receive updates at ${email}`);
        
        newsletterForm.reset();
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== CAR BOOKING BUTTONS =====
const carBookButtons = document.querySelectorAll('.car-card .btn-primary');

carBookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const carCard = e.target.closest('.car-card');
        const carName = carCard.querySelector('.car-name').textContent;
        const carPrice = carCard.querySelector('.price-amount').textContent;
        
        alert(`You've selected: ${carName}\n${carPrice}\n\nPlease fill out the booking form to proceed.`);
        
        // Scroll to booking form
        const bookingCard = document.getElementById('booking');
        if (bookingCard) {
            bookingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation to grid items
            const gridItems = entry.target.querySelectorAll('.car-card, .service-card, .feature-card, .testimonial-card');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initial setup for grid items
document.querySelectorAll('.car-card, .service-card, .feature-card, .testimonial-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
});

// ===== FORM VALIDATION ENHANCEMENTS =====
// Phone number validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Format phone number (optional)
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        e.target.value = value;
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .booking-card');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);
});

// ===== PERFORMANCE: LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c Welcome to Kauches Drive! ', 'background: #1a2645; color: #fff; font-size: 20px; padding: 10px;');
console.log('%c Premium Car Rentals in Ghana ', 'background: #4a90e2; color: #fff; font-size: 14px; padding: 5px;');
console.log('For inquiries, contact: info@kauchesdrive.com');

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ===== PREVENT FORM RESUBMISSION ON PAGE REFRESH =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}