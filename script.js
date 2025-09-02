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

    // Pixel Character Canvas Drawing
    function drawPixelCharacter() {
        const canvas = document.getElementById('pixelCharacter');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const pixelSize = 8; // Each pixel will be 8x8 pixels
        
        // Colors matching your pixel art
        const colors = {
            hair: '#2d2d2d',
            skin: '#e8a882',
            glasses: '#1f1f1f',
            eyeWhite: '#ffffff',
            eyeBlack: '#000000',
            mouth: '#8b4513',
            hoodie: '#2d2d2d',
            jeans: '#4682b4'
        };
        
        let isSmiling = false;
        
        function drawPixel(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * pixelSize + 50, y * pixelSize + 20, pixelSize, pixelSize);
        }
        
        function drawCharacter() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Hair (curly pattern)
            const hairPixels = [
                [4,2], [5,2], [6,2], [7,2], [8,2], [9,2], [10,2],
                [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [9,3], [10,3], [11,3],
                [3,4], [4,4], [5,4], [6,4], [7,4], [8,4], [9,4], [10,4], [11,4]
            ];
            hairPixels.forEach(([x, y]) => drawPixel(x, y, colors.hair));
            
            // Head/face
            const facePixels = [
                [4,5], [5,5], [6,5], [7,5], [8,5], [9,5], [10,5],
                [4,6], [5,6], [6,6], [7,6], [8,6], [9,6], [10,6],
                [4,7], [5,7], [6,7], [7,7], [8,7], [9,7], [10,7],
                [5,8], [6,8], [7,8], [8,8], [9,8],
                [5,9], [6,9], [7,9], [8,9], [9,9]
            ];
            facePixels.forEach(([x, y]) => drawPixel(x, y, colors.skin));
            
            // Glasses frame
            const glassesPixels = [
                [4,6], [5,6], [6,6], [8,6], [9,6], [10,6], // top frame
                [4,7], [6,7], [7,7], [8,7], [10,7], // sides and bridge
                [4,8], [5,8], [6,8], [8,8], [9,8], [10,8] // bottom frame
            ];
            glassesPixels.forEach(([x, y]) => drawPixel(x, y, colors.glasses));
            
            // Eyes
            drawPixel(5, 7, colors.eyeBlack);
            drawPixel(9, 7, colors.eyeBlack);
            
            // Eye highlights
            ctx.fillStyle = colors.eyeWhite;
            ctx.fillRect(5 * pixelSize + 52, 7 * pixelSize + 22, 2, 2);
            ctx.fillRect(9 * pixelSize + 52, 7 * pixelSize + 22, 2, 2);
            
            // Nose
            drawPixel(7, 9, '#d49574');
            
            // Mouth (changes based on isSmiling)
            if (isSmiling) {
                // Smiling mouth
                drawPixel(6, 11, colors.mouth);
                drawPixel(7, 10, colors.mouth);
                drawPixel(8, 10, colors.mouth);
                drawPixel(9, 11, colors.mouth);
            } else {
                // Neutral mouth
                drawPixel(6, 11, colors.mouth);
                drawPixel(7, 11, colors.mouth);
                drawPixel(8, 11, colors.mouth);
            }
            
            // Neck
            drawPixel(6, 12, colors.skin);
            drawPixel(7, 12, colors.skin);
            drawPixel(8, 12, colors.skin);
            
            // Hoodie body
            const hoodiePixels = [
                [3,13], [4,13], [5,13], [6,13], [7,13], [8,13], [9,13], [10,13], [11,13],
                [3,14], [4,14], [5,14], [6,14], [7,14], [8,14], [9,14], [10,14], [11,14],
                [3,15], [4,15], [5,15], [6,15], [7,15], [8,15], [9,15], [10,15], [11,15],
                [3,16], [4,16], [5,16], [6,16], [7,16], [8,16], [9,16], [10,16], [11,16]
            ];
            hoodiePixels.forEach(([x, y]) => drawPixel(x, y, colors.hoodie));
            
            // Arms (static waving pose)
            // Left arm
            drawPixel(2, 14, colors.hoodie);
            drawPixel(1, 15, colors.hoodie);
            drawPixel(0, 16, colors.skin); // hand
            
            // Right arm (waving)
            drawPixel(12, 14, colors.hoodie);
            drawPixel(13, 15, colors.hoodie);
            drawPixel(14, 16, colors.skin); // hand
            
            // Jeans
            const jeansPixels = [
                [4,17], [5,17], [6,17], [7,17], [8,17], [9,17], [10,17],
                [4,18], [5,18], [6,18], [7,18], [8,18], [9,18], [10,18],
                [4,19], [5,19], [6,19], [7,19], [8,19], [9,19], [10,19]
            ];
            jeansPixels.forEach(([x, y]) => drawPixel(x, y, colors.jeans));
            
            // Legs
            drawPixel(5, 20, colors.skin);
            drawPixel(9, 20, colors.skin);
        }
        
        // Initial draw
        drawCharacter();
        
        // Animate smile every 2 seconds
        setInterval(() => {
            isSmiling = !isSmiling;
            drawCharacter();
        }, 2000);
    }
    
    // Initialize pixel character when DOM loads
    drawPixelCharacter();
});