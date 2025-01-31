// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    // Show button when page is scrolled down 300px
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Feature cards animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Handle "Watch Demo" button click
document.querySelector('a[href="#demo"]').addEventListener('click', (e) => {
    e.preventDefault();
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
});

// How It Works Section Interactions
const stepsSection = document.querySelector('.how-it-works');
const steps = document.querySelectorAll('.step');
const progressLine = document.querySelector('.progress-line');

// Initialize the first step as active
if (steps.length > 0) {
    steps[0].classList.add('active');
}

// Function to handle step animations
function animateSteps() {
    const sectionTop = stepsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
                // Update progress line
                const progress = ((index + 1) / steps.length) * 100;
                progressLine.style.height = `${progress}%`;
            }, index * 500); // Stagger the animations
        });
        
        // Remove scroll listener once animated
        window.removeEventListener('scroll', animateSteps);
    }
}

// Add click interaction to steps
steps.forEach(step => {
    step.addEventListener('click', () => {
        const preview = step.querySelector('.step-preview');
        const isExpanded = preview.style.maxHeight !== '0px';
        
        // Reset all other previews
        steps.forEach(s => {
            const p = s.querySelector('.step-preview');
            if (s !== step) {
                p.style.maxHeight = '0px';
            }
        });
        
        // Toggle clicked preview
        preview.style.maxHeight = isExpanded ? '0px' : '300px';
        
        // Add animation classes for verification items if it's the verification step
        if (step.dataset.step === '2' && !isExpanded) {
            const items = step.querySelectorAll('.v-item');
            items.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.2}s`;
            });
        }
    });
});

// Add scroll listener for step animations
window.addEventListener('scroll', animateSteps);

// Initial check in case section is already in view
animateSteps();

// Hero Section Parallax Effect
const hero = document.querySelector('.hero');
const floatingElements = document.querySelectorAll('.float-element');
const dashboardPreview = document.querySelector('.dashboard-preview');

function handleParallax(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    floatingElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const x = mouseX * 50 * speed;
        const y = mouseY * 50 * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });

    if (dashboardPreview) {
        dashboardPreview.style.transform = `perspective(1000px) 
            rotateY(${-mouseX * 10}deg) 
            rotateX(${mouseY * 10}deg)`;
    }
}

if (hero) {
    hero.addEventListener('mousemove', handleParallax);
}

// Animate dashboard stats on load
function animateDashboardStats() {
    const statBars = document.querySelectorAll('.dashboard-card .stat-bar div');
    statBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.parentElement.style.width || '85%';
            bar.style.width = width;
        }, index * 200);
    });
}

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    animateDashboardStats();
});

// Smooth scroll for the scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = hero.nextElementSibling;
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Features Section Animations
const featureCards = document.querySelectorAll('.feature-card[data-aos]');
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate stats when card becomes visible
            const stats = entry.target.querySelectorAll('.mini-stat .stat-number');
            stats.forEach(stat => {
                const value = stat.textContent;
                let start = 0;
                const end = parseInt(value) || 0;
                const duration = 2000;
                const increment = end / (duration / 16);
                
                const updateCounter = () => {
                    start += increment;
                    if (start < end) {
                        stat.textContent = Math.round(start) + (value.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = value;
                    }
                };
                
                updateCounter();
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

featureCards.forEach(card => {
    featureObserver.observe(card);
});

// Add hover effect for feature cards
const featureIconWrappers = document.querySelectorAll('.feature-icon-wrapper');
featureIconWrappers.forEach(wrapper => {
    const card = wrapper.closest('.feature-card');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        wrapper.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}); 