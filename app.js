// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const faqQuestions = document.querySelectorAll('.faq-question');
const lessonForm = document.getElementById('lesson-form');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stat numbers
statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// FAQ Accordion Functionality
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form Submission Handling
lessonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(lessonForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.studentName || !data.email || !data.instrument || !data.level || !data.preferredTime) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Booking request submitted successfully! We\'ll contact you within 24 hours.', 'success');
    
    // Reset form
    lessonForm.reset();
    
    // Log form data (in real app, this would be sent to server)
    console.log('Lesson booking data:', data);
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Service Card Hover Effects
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Portfolio Item Click Handler
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        showNotification(`Learn more about ${title} - Contact us for details!`, 'info');
    });
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply reveal animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(section);
});

// Hero section should be visible immediately
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Dynamic pricing update based on instrument selection
const instrumentSelect = document.getElementById('instrument');
if (instrumentSelect) {
    instrumentSelect.addEventListener('change', (e) => {
        const priceInfo = {
            'piano': '$45/hour',
            'guitar': '$40/hour',
            'voice': '$50/hour',
            'theory': '$35/hour'
        };
        
        const selectedInstrument = e.target.value;
        if (selectedInstrument && priceInfo[selectedInstrument]) {
            const message = `Selected: ${selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} lessons - ${priceInfo[selectedInstrument]}`;
            console.log(message);
        }
    });
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy operations
const debouncedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Harmonic Learning Studio website loaded successfully!');
    
    // Set focus to first interactive element for accessibility
    const firstInput = document.querySelector('input, button, select, textarea, a');
    if (firstInput && window.location.hash) {
        // Don't steal focus if user is navigating to a specific section
        return;
    }
});

// Track user engagement (for analytics in real app)
let timeSpent = 0;
setInterval(() => {
    timeSpent += 1;
}, 1000);

// Service inquiry tracking
const serviceCards2 = document.querySelectorAll('.service-card');
serviceCards2.forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        console.log(`User showed interest in: ${serviceName}`);
        showNotification(`Interested in ${serviceName}? Scroll down to book your free trial lesson!`, 'info');
    });
});

// Contact form enhancement
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    const emailLink = item.querySelector('p');
    if (emailLink && emailLink.textContent.includes('@')) {
        emailLink.style.cursor = 'pointer';
        emailLink.addEventListener('click', () => {
            navigator.clipboard.writeText(emailLink.textContent).then(() => {
                showNotification('Email address copied to clipboard!', 'success');
            });
        });
    }
});

// Add loading state to form submission
function setFormLoading(isLoading) {
    const submitButton = lessonForm.querySelector('button[type="submit"]');
    if (isLoading) {
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    } else {
        submitButton.textContent = 'Book Free Trial Lesson';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

// Enhanced form submission with loading state
lessonForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    setFormLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const formData = new FormData(lessonForm);
    const data = Object.fromEntries(formData);
    
    // Validation
    if (!data.studentName || !data.email || !data.instrument || !data.level || !data.preferredTime) {
        showNotification('Please fill in all required fields.', 'error');
        setFormLoading(false);
        return;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        setFormLoading(false);
        return;
    }
    
    // Success
    showNotification('Booking request submitted successfully! We\'ll contact you within 24 hours to schedule your free trial lesson.', 'success');
    lessonForm.reset();
    setFormLoading(false);
    
    console.log('Lesson booking submitted:', data);
});