document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    const observer = new IntersectionObserver((entries) => {
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

    const animateElements = document.querySelectorAll('.project-card, .skill-item, .stat, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 2000);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else {
            notification.style.background = '#ef4444';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');

    function typeWriter(element, text, speed = 50) {
        return new Promise(resolve => {
            element.innerHTML = '';
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    async function animateHero() {
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        heroDescription.style.opacity = '0';
        heroButtons.style.opacity = '0';

        await new Promise(resolve => setTimeout(resolve, 500));

        heroTitle.style.opacity = '1';
        await typeWriter(heroTitle, "Hello, I'm Julian!");
        
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        heroDescription.style.opacity = '1';
        heroDescription.style.transform = 'translateY(0)';
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }

    heroSubtitle.style.transform = 'translateY(20px)';
    heroDescription.style.transform = 'translateY(20px)';
    heroButtons.style.transform = 'translateY(20px)';
    heroSubtitle.style.transition = 'all 0.6s ease';
    heroDescription.style.transition = 'all 0.6s ease';
    heroButtons.style.transition = 'all 0.6s ease';

    animateHero();

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });

    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    });

    stats.forEach(stat => statsObserver.observe(stat));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                
                // Trigger confetti for projects completed when it reaches 4
                if (target === 4 && element.closest('#projects-stat')) {
                    triggerConfetti(element.closest('.stat'));
                }
                // Trigger confetti for years experience when it reaches 2
                if (target === 2 && element.closest('#experience-stat')) {
                    triggerConfetti(element.closest('.stat'));
                }
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }

    function triggerConfetti(statBox) {
        const confettiContainer = statBox.querySelector('.confetti-container');
        confettiContainer.innerHTML = '';
        
        // Create 15 confetti pieces
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 1 + 's';
            confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
            confettiContainer.appendChild(confetti);
        }
        
        // Start fading out confetti after 4 seconds
        setTimeout(() => {
            confettiContainer.style.opacity = '0';
        }, 4000);
        
        // Clean up confetti after fade completes
        setTimeout(() => {
            confettiContainer.innerHTML = '';
            confettiContainer.style.opacity = '1'; // Reset for next time
        }, 5000);
    }

});