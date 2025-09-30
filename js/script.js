// Load non-critical CSS asynchronously
function loadNonCriticalCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/styles.css';
    link.media = 'print';
    link.onload = function() {
        this.media = 'all';
        document.body.classList.add('inter-font-loaded');
    };
    document.head.appendChild(link);
}

// Defer non-critical functionality
function deferNonCritical() {
    // Load particles only on desktop and after main content
    if (window.innerWidth > 768) {
        setTimeout(createParticles, 2000);
    }
    
    // Initialize intersection observer for non-critical elements
    initIntersectionObserver();
}

// Optimize scroll events
let scrollTimeout;
function optimizedScrollHandler() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(function() {
            const navbar = document.querySelector('.navbar');
            if (navbar && window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)';
            } else if (navbar) {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)';
            }
            scrollTimeout = null;
        }, 10);
    }
}

// Initialize critical functions
function initCriticalFunctions() {
    initNavToggle();
    initTypingEffect();
    initSmoothScroll();
    
    // Defer non-critical functions
    setTimeout(deferNonCritical, 1000);
    
    // Optimize scroll listener
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Initialize navigation toggle
function initNavToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const bars = document.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });
}

// Optimize typing effect with requestAnimationFrame
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    let lastTime = 0;
    const texts = [
        'Desarrollador Backend',
        'Estudiante de Sistemas',
        'También me dicen Coffee ☕'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;
        
        if (delta > typingSpeed) {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            lastTime = timestamp;
        }
        
        requestAnimationFrame(type);
    }
    
    // Start with a delay
    setTimeout(() => requestAnimationFrame(type), 1000);
}

// Initialize smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize intersection observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('tech-item') || 
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('detail-item') ||
                    entry.target.classList.contains('contact-item')) {
                    entry.target.classList.add('animate-fade-in');
                } else if (entry.target.classList.contains('timeline-item')) {
                    if (entry.target.getAttribute('data-animated') !== 'true') {
                        entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                        entry.target.setAttribute('data-animated', 'true');
                    }
                }
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.tech-item, .project-card, .timeline-item, .detail-item, .contact-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const submitBtn = document.getElementById('submit-btn');
            const formStatus = document.getElementById('form-status');
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            formStatus.className = 'form-status loading';
            formStatus.textContent = 'Enviando tu mensaje...';
            formStatus.style.display = 'block';
            
            try {
                const formData = new FormData(this);
                formData.append('botcheck', '');
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    formStatus.className = 'form-status success';
                    formStatus.innerHTML = '¡Mensaje enviado con éxito! Te responderé a la brevedad.';
                    contactForm.reset();
                    clearErrors();
                } else {
                    throw new Error(result.message || 'Error al enviar el mensaje');
                }
                
            } catch (error) {
                console.error('Error:', error);
                formStatus.className = 'form-status error';
                formStatus.innerHTML = 'Hubo un error al enviar el mensaje. Por favor, intentá nuevamente o contactame directamente por LinkedIn.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Hablemos';
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
        
        // Form validation events
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', function() {
                clearEmailError();
            });
        }
        
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('blur', validateName);
            nameInput.addEventListener('input', function() {
                clearNameError();
            });
        }
        
        const messageInput = document.getElementById('message');
        if (messageInput) {
            messageInput.addEventListener('blur', validateMessage);
            messageInput.addEventListener('input', function() {
                clearMessageError();
            });
        }
    }
}

// Particles animation (deferred)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Check if particles already exist
    if (document.querySelector('.particles')) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.zIndex = '0';
    particlesContainer.style.pointerEvents = 'none';
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = 'rgba(14, 165, 233, 0.4)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 15 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.filter = 'blur(1px)';
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Interactive elements hover effects
function initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('.btn, .tech-item, .project-card, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

// Form validation functions
function validateForm() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    return isNameValid && isEmailValid && isMessageValid;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const email = emailInput.value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailInput, emailError, 'El email es requerido');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Por favor, ingresá un email válido');
        return false;
    }
    
    clearError(emailInput, emailError);
    return true;
}

function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    const name = nameInput.value.trim();
    
    if (!name) {
        showError(nameInput, nameError, 'El nombre es requerido');
        return false;
    }
    
    if (name.length < 2) {
        showError(nameInput, nameError, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    clearError(nameInput, nameError);
    return true;
}

function validateMessage() {
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    const message = messageInput.value.trim();
    
    if (!message) {
        showError(messageInput, messageError, 'El mensaje es requerido');
        return false;
    }
    
    if (message.length < 10) {
        showError(messageInput, messageError, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    clearError(messageInput, messageError);
    return true;
}

function showError(input, errorElement, message) {
    if (!input || !errorElement) return;
    
    input.classList.add('input-error');
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    if (!input || !errorElement) return;
    
    input.classList.remove('input-error');
    errorElement.textContent = '';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input, textarea');
    
    errorMessages.forEach(error => {
        if (error) error.textContent = '';
    });
    inputs.forEach(input => {
        if (input) input.classList.remove('input-error');
    });
}

function clearEmailError() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    if (emailInput && emailError) {
        clearError(emailInput, emailError);
    }
}

function clearNameError() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (nameInput && nameError) {
        clearError(nameInput, nameError);
    }
}

function clearMessageError() {
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (messageInput && messageError) {
        clearError(messageInput, messageError);
    }
}

// Initialize contact form after DOM is ready
function initContactFormDeferred() {
    setTimeout(initContactForm, 1000);
    setTimeout(initInteractiveElements, 1500);
}

// Main initialization with optimized loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadNonCriticalCSS();
        initCriticalFunctions();
        initContactFormDeferred();
    });
} else {
    loadNonCriticalCSS();
    initCriticalFunctions();
    initContactFormDeferred();
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(50px) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        0% {
            box-shadow: 0 0 5px rgba(14, 165, 233, 0.5);
        }
        50% {
            box-shadow: 0 0 20px rgba(14, 165, 233, 0.8);
        }
        100% {
            box-shadow: 0 0 5px rgba(14, 165, 233, 0.5);
        }
    }
    
    .glow-effect {
        animation: glow 2s ease-in-out infinite;
    }
    
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);