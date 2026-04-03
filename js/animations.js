/* ============================================
   ANIMATIONS - Scroll, Parallax, and Card Effects
============================================ */
const ANIMATIONS = {
    /**
     * Check if we're on mobile (single column card layout)
     */
    isMobile: () => window.innerWidth < 768,
    /**
     * Initialize reveal animations for elements with .reveal class
     */
    initReveal: () => {
        const elements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Check for counters inside
                    const counter = entry.target.querySelector('[data-count]');
                    if (counter && !counter.dataset.counted) {
                        ANIMATIONS.runCounter(counter);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => observer.observe(el));
        STATE.scrollObservers.push(observer);
    },

    /**
     * Initialize portal login page effects (orb tracking, input borders)
     */
    initPortalLogin: () => {
        // Background Orb Tracking
        const section = document.getElementById('portal-left-section');
        const orb = document.getElementById('portal-orb');
        if (section && orb) {
            const handleMouseMove = (e) => {
                const rect = section.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                orb.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
            };
            section.addEventListener('mousemove', handleMouseMove);
            section.addEventListener('mouseenter', () => orb.classList.replace('opacity-0', 'opacity-100'));
            section.addEventListener('mouseleave', () => orb.classList.replace('opacity-100', 'opacity-0'));
        }

        // Input Border Tracking
        const inputs = document.querySelectorAll('.portal-app-input');
        inputs.forEach(inputContainer => {
            const topGrad = inputContainer.querySelector('.portal-gradient-top');
            const botGrad = inputContainer.querySelector('.portal-gradient-bottom');

            inputContainer.addEventListener('mousemove', (e) => {
                const rect = inputContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if (topGrad) topGrad.style.background = `radial-gradient(30px circle at ${x}px 0px, var(--accent-cyan) 0%, transparent 80%)`;
                if (botGrad) botGrad.style.background = `radial-gradient(30px circle at ${x}px 2px, var(--accent-cyan) 0%, transparent 80%)`;
            });
        });
    },

    /**
     * Initialize 3D tilt effect on glossy cards
     */
    initGlossyCards: () => {
        const wraps = document.querySelectorAll('.glossy-wrap');
        wraps.forEach(wrap => {
            const card = wrap.querySelector('.glossy-card');
            if (!card) return;

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const rotateX = -(y / rect.height) * 10;
                const rotateY = (x / rect.width) * 10;

                card.style.setProperty('--rot-x', `${rotateX}deg`);
                card.style.setProperty('--rot-y', `${rotateY}deg`);
            });

            wrap.addEventListener('mouseenter', () => {
                card.style.setProperty('--hover-intensity', '1');
            });

            wrap.addEventListener('mouseleave', () => {
                card.style.setProperty('--hover-intensity', '0');
                card.style.setProperty('--rot-x', '0deg');
                card.style.setProperty('--rot-y', '0deg');
            });
        });
    },

    /**
     * Animate counter from 0 to target value
     */
    runCounter: (el) => {
        el.dataset.counted = 'true';
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // easeOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);
            el.innerText = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.innerText = target;
        };
        requestAnimationFrame(step);
    },

    /**
     * Initialize parallax scrolling effects
     */
    initParallax: () => {
        // Clean up previous listener if any
        if (STATE.scrollHandler) {
            window.removeEventListener('scroll', STATE.scrollHandler);
        }
        if (STATE.rafId) {
            cancelAnimationFrame(STATE.rafId);
            STATE.rafId = null;
        }

        const heroVid = document.querySelector('.hero-video');
        const heroContent = document.querySelector('.hero-content');
        const navbar = document.getElementById('navbar');
        let ticking = false;

        const updateScroll = () => {
            if (STATE.route === 'home') {
                const y = window.scrollY;
                // Navbar Glass Effect
                if (y > 50) navbar.classList.add('is-scrolled');
                else navbar.classList.remove('is-scrolled');

                // Hero Parallax - only update if hero is visible
                if (heroVid && y < window.innerHeight) {
                    const scale = 1 + (y * 0.0005);
                    heroVid.style.transform = `translate(-50%, -50%) scale(${scale})`;
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${y * 0.3}px)`;
                        heroContent.style.opacity = 1 - (y / (window.innerHeight * 0.7));
                    }
                }
            } else {
                navbar.classList.add('is-scrolled'); // Always solid on inner pages
            }

            // Scroll-driven philosophy card flip
            ANIMATIONS.updatePhilosophyScroll();
            ticking = false;
        };

        STATE.scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        // Use passive scroll listener for better performance
        window.addEventListener('scroll', STATE.scrollHandler, { passive: true });

        // Initial call
        updateScroll();
    },

    /**
     * Initialize philosophy scroll section (cache DOM references)
     */
    initPhilosophyScroll: () => {
        const container = document.getElementById('how-we-build-section');
        if (!container) return;

        // Cache DOM references for rAF performance
        STATE.hwb = {
            container,
            titleOut: document.getElementById('hwb-title-out'),
            titleIn: document.getElementById('hwb-title-in'),
            subtitleOut: container.querySelector('.subtitle-outgoing'),
            subtitleIn: container.querySelector('.subtitle-incoming'),
            cardInners: Array.from(container.querySelectorAll('[data-flip-card] .philosophy-card-inner')),
            cards: Array.from(container.querySelectorAll('[data-flip-card]')),
            isMobileMode: ANIMATIONS.isMobile()
        };

        // On mobile, use per-card scroll observers
        if (STATE.hwb.isMobileMode) {
            ANIMATIONS.initMobileCardFlip();
        }
    },

    /**
     * Initialize mobile-specific per-card scroll flip
     * Each card flips individually as it scrolls into view
     */
    initMobileCardFlip: () => {
        if (!STATE.hwb || !STATE.hwb.cards) return;

        // Clean up existing mobile observers
        if (STATE.mobileCardObservers) {
            STATE.mobileCardObservers.forEach(obs => obs.disconnect());
        }
        STATE.mobileCardObservers = [];

        STATE.hwb.cards.forEach((card, index) => {
            const inner = card.querySelector('.philosophy-card-inner');
            if (!inner) return;

            // Track flip state for this card
            let isFlipped = false;
            let flipProgress = 0;

            // Create scroll handler for this specific card
            const updateCardFlip = () => {
                const rect = card.getBoundingClientRect();
                const viewH = window.innerHeight;
                const cardCenter = rect.top + rect.height / 2;

                // Calculate progress: 0 when card center is at bottom of viewport,
                // 1 when card center is at top of viewport
                // Flip happens when card is in the middle third of the viewport
                const startFlip = viewH * 0.7;  // Start flip when card center is at 70% from top
                const endFlip = viewH * 0.3;    // End flip when card center is at 30% from top

                if (cardCenter <= startFlip && cardCenter >= endFlip) {
                    // Card is in flip zone
                    flipProgress = (startFlip - cardCenter) / (startFlip - endFlip);
                    flipProgress = Math.max(0, Math.min(1, flipProgress));
                } else if (cardCenter < endFlip) {
                    // Card has passed flip zone - stay flipped
                    flipProgress = 1;
                } else {
                    // Card hasn't reached flip zone yet
                    flipProgress = 0;
                }

                const rotation = flipProgress * 180;
                inner.style.transform = `rotateY(${rotation}deg)`;
            };

            // Use IntersectionObserver to only track when card is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Card is visible, add scroll listener
                        window.addEventListener('scroll', updateCardFlip, { passive: true });
                        updateCardFlip(); // Initial update
                    } else {
                        // Card not visible, remove scroll listener
                        window.removeEventListener('scroll', updateCardFlip);
                    }
                });
            }, { threshold: 0, rootMargin: '50px 0px' });

            observer.observe(card);
            STATE.mobileCardObservers.push(observer);
            STATE.scrollObservers.push(observer);
        });
    },

    /**
     * Update philosophy section based on scroll position
     * Handles title crossfade and card flip animations
     * On mobile, card flips are handled by initMobileCardFlip instead
     */
    updatePhilosophyScroll: () => {
        const hwb = STATE.hwb;
        if (!hwb || !hwb.container) return;

        // On mobile, skip desktop scroll behavior (per-card flip handles it)
        if (hwb.isMobileMode) return;

        const rect = hwb.container.getBoundingClientRect();
        const containerH = hwb.container.offsetHeight;
        const viewH = window.innerHeight;
        // scrollProgress: 0 = container top at viewport top, 1 = container bottom at viewport bottom
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (containerH - viewH)));

        // --- Title crossfade: 25% → 55% ---
        const titleP = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.30));
        if (hwb.titleOut) {
            hwb.titleOut.style.opacity = 1 - titleP;
            hwb.titleOut.style.transform = `translateY(${-titleP * 15}px)`;
        }
        if (hwb.titleIn) {
            hwb.titleIn.style.opacity = titleP;
            hwb.titleIn.style.transform = `translateY(${(1 - titleP) * 12}px)`;
        }

        // --- Subtitle crossfade: 28% → 58% ---
        const subP = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.30));
        if (hwb.subtitleOut) {
            hwb.subtitleOut.style.opacity = 1 - subP;
            hwb.subtitleOut.style.transform = `translateY(${-subP * 10}px)`;
        }
        if (hwb.subtitleIn) {
            hwb.subtitleIn.style.opacity = subP;
            hwb.subtitleIn.style.transform = `translateY(${(1 - subP) * 10}px)`;
        }

        // --- Card flips with stagger: 30% → 65%, each card offset by 4% ---
        hwb.cardInners.forEach((inner, i) => {
            const cardStart = 0.30 + (i * 0.04);
            const cardEnd = cardStart + 0.28;
            const cardP = Math.max(0, Math.min(1, (scrollProgress - cardStart) / (cardEnd - cardStart)));
            const rotation = cardP * 180;
            inner.style.transform = `rotateY(${rotation}deg)`;
        });
    },

    /**
     * Cleanup all scroll observers
     */
    cleanup: () => {
        STATE.scrollObservers.forEach(obs => obs.disconnect());
        STATE.scrollObservers = [];

        // Clean up mobile-specific observers
        if (STATE.mobileCardObservers) {
            STATE.mobileCardObservers.forEach(obs => obs.disconnect());
            STATE.mobileCardObservers = [];
        }
    }
};
