document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar.style.background = scrollY > 100 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = scrollY > 100 ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none';

        const scrollPos = scrollY + 100;
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card, .skill-item, .stat, .contact-item').forEach(el => {
        el.style.cssText = 'opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        if (!Object.values(data).every(val => val)) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
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

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 20px; border-radius: 8px; color: white; font-weight: 500; z-index: 9999; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); background: ${type === 'success' ? '#10b981' : '#ef4444'}`;

        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    document.querySelectorAll('.skill-item, .project-card').forEach(el => {
        const transform = el.classList.contains('skill-item') ? 'translateY(-5px) scale(1.05)' : 'translateY(-10px) scale(1.02)';
        el.addEventListener('mouseenter', () => el.style.transform = transform);
        el.addEventListener('mouseleave', () => el.style.transform = 'translateY(0) scale(1)');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        });
    });

    const heroElements = {
        title: document.querySelector('.hero-title'),
        subtitle: document.querySelector('.hero-subtitle'),
        description: document.querySelector('.hero-description'),
        buttons: document.querySelector('.hero-buttons')
    };

    async function animateHero() {
        Object.values(heroElements).forEach(el => el.style.opacity = '0');
        await new Promise(resolve => setTimeout(resolve, 500));

        heroElements.title.style.opacity = '1';
        let i = 0;
        const text = "Hello, I'm Julian!";
        heroElements.title.innerHTML = '';
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroElements.title.innerHTML += text.charAt(i++);
            } else {
                clearInterval(typeInterval);
                Object.entries(heroElements).forEach(async ([key, el]) => {
                    if (key !== 'title') {
                        await new Promise(resolve => setTimeout(resolve, 300));
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                });
            }
        }, 50);
    }

    ['subtitle', 'description', 'buttons'].forEach(key => {
        heroElements[key].style.cssText = 'transform: translateY(20px); transition: all 0.6s ease';
    });

    animateHero();

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let current = 0;
                const duration = 3000;
                const startTime = performance.now();

                const animateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    current = easeOutQuart * finalValue;

                    target.textContent = Math.floor(current);

                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        target.textContent = finalValue;
                    }
                };

                requestAnimationFrame(animateCounter);
                statsObserver.unobserve(target);
            }
        });
    });

    document.querySelectorAll('.stat h3').forEach(stat => statsObserver.observe(stat));
});
