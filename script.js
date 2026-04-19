document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        document.querySelectorAll('section[id]').forEach(section => {
            const id = section.getAttribute('id');
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
        });
    });

    // Role text rotator
    const roles = ['web applications', 'cool things', 'community platforms', 'interactive games', 'real-time systems'];
    let roleIndex = 0;
    const roleEl = document.getElementById('role-text');

    function rotateRole() {
        roleEl.style.opacity = '0';
        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleEl.textContent = roles[roleIndex];
            roleEl.style.opacity = '1';
        }, 300);
    }

    setInterval(rotateRole, 3000);

    // Terminal animation
    const termBody = document.getElementById('terminal-body');

    const termScript = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'julian_juarez' },
        { type: 'gap' },
        { type: 'cmd', text: 'cat bio.txt' },
        { type: 'kv', key: 'school:', val: 'SFSU — Computer Science' },
        { type: 'kv', key: 'role:', val: 'Full-Stack Developer' },
        { type: 'kv', key: 'vibe:', val: 'I like making things' },
        { type: 'gap' },
        { type: 'cmd', text: 'ls projects/' },
        { type: 'out', text: 'maze-game/    chatbot/    gesture-ctrl/' },
        { type: 'gap' },
        { type: 'cmd', text: '', blink: true },
    ];

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function typeTerminal() {
        for (const line of termScript) {
            if (line.type === 'gap') {
                termBody.appendChild(document.createElement('br'));
                await sleep(80);
                continue;
            }

            const el = document.createElement('div');
            el.className = 'terminal-line';

            if (line.type === 'cmd') {
                const promptSpan = document.createElement('span');
                promptSpan.className = 't-prompt';
                promptSpan.textContent = '❯';
                const cmdSpan = document.createElement('span');
                cmdSpan.className = 't-cmd';
                cmdSpan.textContent = ' ';
                el.appendChild(promptSpan);
                el.appendChild(cmdSpan);
                termBody.appendChild(el);

                if (line.blink) {
                    cmdSpan.innerHTML = ' <span class="cursor">█</span>';
                } else {
                    for (const char of line.text) {
                        cmdSpan.textContent += char;
                        await sleep(55);
                    }
                }
                await sleep(180);
            } else if (line.type === 'out') {
                el.innerHTML = `<span class="t-out">${line.text}</span>`;
                termBody.appendChild(el);
                await sleep(130);
            } else if (line.type === 'kv') {
                el.innerHTML = `<span class="t-out">&nbsp;&nbsp;<span class="t-key">${line.key}</span> <span class="t-val">${line.val}</span></span>`;
                termBody.appendChild(el);
                await sleep(110);
            }
        }
    }

    setTimeout(typeTerminal, 500);

    // Fade-in on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.project-card, .skill-category, .stat, .contact-item, .floating-badge').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
        observer.observe(el);
    });

    // Stat counter + confetti
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const h3 = entry.target;
            const raw = h3.textContent.trim();
            const finalVal = parseInt(raw);
            const hasSuffix = raw.includes('+');
            let current = 0;
            h3.textContent = '0';

            const timer = setInterval(() => {
                current++;
                h3.textContent = current + (hasSuffix ? '+' : '');
                if (current >= finalVal) {
                    clearInterval(timer);
                    if (hasSuffix) h3.textContent = finalVal + '+';
                    triggerConfetti(h3.closest('.stat'));
                }
            }, 650);

            statsObserver.unobserve(h3);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat h3').forEach(el => statsObserver.observe(el));

    function triggerConfetti(statEl) {
        const container = statEl.querySelector('.confetti-container');
        if (!container) return;
        for (let i = 0; i < 14; i++) {
            const dot = document.createElement('div');
            dot.className = 'confetti';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.animationDelay = (Math.random() * 0.6) + 's';
            container.appendChild(dot);
        }
        setTimeout(() => { container.innerHTML = ''; }, 4500);
    }

    // Contact form
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim()
        };

        if (!Object.values(data).every(v => v)) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = orig;
            btn.disabled = false;
            form.reset();
            showNotification("Message sent! I'll get back to you soon.", 'success');
        }, 2000);
    });

    function showNotification(msg, type) {
        const n = document.createElement('div');
        const bg = type === 'success'
            ? 'rgba(16, 185, 129, 0.92)'
            : 'rgba(239, 68, 68, 0.92)';
        n.style.cssText = `
            position: fixed;
            top: 88px;
            right: 24px;
            padding: 14px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            font-family: 'Space Grotesk', sans-serif;
            z-index: 9999;
            transform: translateX(440px);
            transition: transform 0.35s ease;
            max-width: 320px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.12);
            background: ${bg};
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        `;
        n.textContent = msg;
        document.body.appendChild(n);
        setTimeout(() => (n.style.transform = 'translateX(0)'), 50);
        setTimeout(() => {
            n.style.transform = 'translateX(440px)';
            setTimeout(() => n.remove(), 350);
        }, 4200);
    }
});
