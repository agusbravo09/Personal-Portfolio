// Navegación responsive
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animación del ícono hamburguesa
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
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Restaurar ícono hamburguesa
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Cambiar estilo de la barra de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)';
        }
    });
    
    // Efecto de máquina de escribir para el subtítulo
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        const texts = [
            'Desarrollador Backend Jr.',
            'Estudiante de Sistemas',
            'También me dicen Coffee ☕'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseTime = 2000;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Eliminar caracteres
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = deletingSpeed;
            } else {
                // Escribir caracteres
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Cambiar entre escribir y eliminar
            if (!isDeleting && charIndex === currentText.length) {
                // Pausa al completar la palabra
                isDeleting = true;
                typingSpeed = pauseTime;
            } else if (isDeleting && charIndex === 0) {
                // Cambiar a la siguiente palabra
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pausa antes de empezar a escribir
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(type, 1000);
    }
    
    // Inicializar el efecto de tipeo
    initTypingEffect();
    
    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase de animación basada en la posición
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
    
    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.tech-item, .project-card, .timeline-item, .detail-item, .contact-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Observar secciones para efectos parallax
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías el formulario a un servidor
            // Por ahora, solo mostraremos una alerta
            alert('¡Gracias por tu mensaje! Te responderé a la brevedad.');
            contactForm.reset();
        });
    }
    
    // Efecto de escritura para el código
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        // La animación ya está definida en CSS
        // Aquí podríamos agregar funcionalidad adicional si es necesario
    });
    
    // Smooth scroll para enlaces internos
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
    
    // Efecto de partículas para el fondo del hero
    function createParticles() {
        const hero = document.querySelector('.hero');
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
    
    // Crear partículas si el usuario no está en un dispositivo móvil
    if (window.innerWidth > 768) {
        createParticles();
    }
    
    // Efecto de brillo en elementos interactivos
    const interactiveElements = document.querySelectorAll('.btn, .tech-item, .project-card, .social-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
});

// Añadir estilos para las partículas y animaciones adicionales
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
`;
document.head.appendChild(style);