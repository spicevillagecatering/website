// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all scroll-anim elements
document.querySelectorAll('.scroll-anim').forEach(el => {
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('shadow-lg');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('shadow-lg');
    } else {
        // Scrolling up
        navbar.classList.add('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! I'm ${name}.\n\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/353858189052?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        alert('Thank you for your enquiry! We\'ve opened WhatsApp for you to send your message. If WhatsApp doesn\'t open, please contact us directly at 085 818 9052.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add animation delay classes
document.addEventListener('DOMContentLoaded', () => {
    const delayElements = document.querySelectorAll('.delay-100, .delay-200, .delay-300');
    delayElements.forEach((el, index) => {
        const delay = (index + 1) * 0.1;
        el.style.transitionDelay = `${delay}s`;
    });
    
    // Initialize QR Code
    initializeQRCode();
    
    // Initialize Chatbot
    initializeChatbot();
    
    // Menu item click handlers
    initializeMenuItems();
    
    // Enhance hero slider
    enhanceHeroSlider();
});

// QR Code Generation (Using API for reliability)
function initializeQRCode() {
    const qrContainer = document.getElementById('qr-code');
    if (qrContainer) {
        const websiteUrl = window.location.href;
        // Using QR Server API for reliable QR code generation
        const qrImage = document.createElement('img');
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(websiteUrl)}&color=1C1C1C&bgcolor=FFFFFF`;
        qrImage.alt = 'QR Code - Spice Village Catering';
        qrImage.className = 'mx-auto';
        qrContainer.appendChild(qrImage);
    }
}

// Chatbot Toggle
function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    
    if (chatbotToggle && chatbotWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });
    }
    
    if (chatbotClose && chatbotWindow) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }
}

// Menu Item Click Handlers
function initializeMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemName = item.querySelector('h4').textContent;
            const description = item.querySelector('.menu-item-tooltip')?.textContent || 'Delicious and authentic preparation';
            
            // Show description in an alert or modal (you can enhance this later)
            // For now, we'll use the hover tooltip which is already working
        });
    });
}

// Hero Section Image Slider Enhancement
function enhanceHeroSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        // Pause on hover
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                sliderContainer.style.animationPlayState = 'paused';
            });
            heroSection.addEventListener('mouseleave', () => {
                sliderContainer.style.animationPlayState = 'running';
            });
        }
    }
}

// Initialize hero slider enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceHeroSlider();
    initializeMenuTabs();
});

// Menu Tabs Functionality
function initializeMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contents = document.querySelectorAll('.menu-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Re-trigger animations for new content
                const cards = targetContent.querySelectorAll('.menu-item-card');
                cards.forEach((card, index) => {
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = `slideIn 0.4s ease-out ${index * 0.1}s backwards`;
                    }, 10);
                });
            }
        });
    });
}

