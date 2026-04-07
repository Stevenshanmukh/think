/* ============================================
   ANIMATIONS - Scroll, Parallax, and Card Effects
============================================ */

// Configuration constants
const ANIMATION_CONFIG = {
    REVEAL_THRESHOLD: 0.1,
    CARD_TILT_DEGREES: 10,
    COUNTER_DURATION_MS: 2000,
    HERO_PARALLAX_SCALE: 0.0005,
    HERO_CONTENT_PARALLAX: 0.3,
    PHILOSOPHY_ANIM_OUT_MS: 300,
    PHILOSOPHY_ANIM_IN_MS: 500,
    NAVBAR_SCROLL_THRESHOLD: 50
};

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
        }, { threshold: ANIMATION_CONFIG.REVEAL_THRESHOLD, rootMargin: '0px 0px -50px 0px' });

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

        // Initialize animated characters
        CHARACTERS.init();
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

                const rotateX = -(y / rect.height) * ANIMATION_CONFIG.CARD_TILT_DEGREES;
                const rotateY = (x / rect.width) * ANIMATION_CONFIG.CARD_TILT_DEGREES;

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
        const duration = ANIMATION_CONFIG.COUNTER_DURATION_MS;
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
                if (y > ANIMATION_CONFIG.NAVBAR_SCROLL_THRESHOLD) navbar.classList.add('is-scrolled');
                else navbar.classList.remove('is-scrolled');

                // Hero Parallax - only update if hero is visible
                if (heroVid && y < window.innerHeight) {
                    const scale = 1 + (y * ANIMATION_CONFIG.HERO_PARALLAX_SCALE);
                    heroVid.style.transform = `translate(-50%, -50%) scale(${scale})`;
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${y * ANIMATION_CONFIG.HERO_CONTENT_PARALLAX}px)`;
                        heroContent.style.opacity = 1 - (y / (window.innerHeight * 0.7));
                    }
                }
            } else {
                navbar.classList.add('is-scrolled'); // Always solid on inner pages
            }

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
     * Initialize philosophy section with toggle and navigation
     */
    initPhilosophySection: () => {
        const wrapper = document.getElementById('how-we-build-section');
        if (!wrapper) return;

        const videoFixed = wrapper.querySelector('.philosophy-video-fixed');
        const section = wrapper.querySelector('.philosophy-section');

        // Initialize state
        STATE.philosophySection = {
            activeMode: 'principles',  // 'principles' | 'philosophy'
            activeIndex: 0,            // 0-3
            isAnimating: false
        };

        // Cache DOM elements
        const toggle = wrapper.querySelector('.philosophy-toggle');
        const toggleBtns = wrapper.querySelectorAll('.philosophy-toggle-btn');
        const videoPrinciples = document.getElementById('video-principles');
        const videoPhilosophy = document.getElementById('video-philosophy');
        const display = wrapper.querySelector('.philosophy-display');
        const labelEl = wrapper.querySelector('.philosophy-label');
        const titleEl = wrapper.querySelector('.philosophy-title');
        const descEl = wrapper.querySelector('.philosophy-description');
        const pagination = wrapper.querySelector('.philosophy-pagination');
        const navPrev = wrapper.querySelector('.philosophy-nav-prev');
        const navNext = wrapper.querySelector('.philosophy-nav-next');
        const navMobilePrev = wrapper.querySelector('.philosophy-nav-btn-prev');
        const navMobileNext = wrapper.querySelector('.philosophy-nav-btn-next');

        // === Section visibility observer ===
        if (videoFixed) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        wrapper.classList.add('is-in-view');
                    } else {
                        wrapper.classList.remove('is-in-view');
                    }
                });
            }, {
                threshold: [0, 0.1, 0.5, 0.9, 1],
                rootMargin: '-10% 0px -10% 0px'
            });

            observer.observe(wrapper);
            STATE.philosophySectionObserver = observer;

            // === Smooth scroll-based opacity ===
            const updateVideoOpacity = () => {
                const rect = wrapper.getBoundingClientRect();
                const viewHeight = window.innerHeight;

                // Calculate opacity based on section position
                let opacity = 1;
                if (rect.top > 0) {
                    // Entering from bottom - fade in
                    opacity = Math.min(1, (viewHeight - rect.top) / (viewHeight * 0.3));
                } else if (rect.bottom < viewHeight) {
                    // Exiting to top - fade out
                    opacity = Math.min(1, rect.bottom / (viewHeight * 0.3));
                }

                videoFixed.style.opacity = Math.max(0, Math.min(1, opacity));
            };

            // Throttled scroll handler
            let ticking = false;
            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateVideoOpacity();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });
            STATE.philosophyScrollHandler = onScroll;

            // Initial call
            updateVideoOpacity();
        }

        // Get data based on current mode
        const getData = () => {
            return STATE.philosophySection.activeMode === 'principles'
                ? DATA.architecture
                : DATA.philosophy;
        };

        // Update content display
        const updateContent = (animate = false) => {
            const data = getData();
            const item = data[STATE.philosophySection.activeIndex];

            if (animate && !STATE.philosophySection.isAnimating) {
                STATE.philosophySection.isAnimating = true;
                display.classList.add('is-animating-out');

                setTimeout(() => {
                    labelEl.textContent = item.cat;
                    titleEl.textContent = item.title;
                    descEl.textContent = item.desc;
                    if (pagination) {
                        pagination.textContent = `${STATE.philosophySection.activeIndex + 1} / ${data.length}`;
                    }

                    display.classList.remove('is-animating-out');
                    display.classList.add('is-animating-in');

                    setTimeout(() => {
                        display.classList.remove('is-animating-in');
                        STATE.philosophySection.isAnimating = false;
                    }, ANIMATION_CONFIG.PHILOSOPHY_ANIM_IN_MS);
                }, ANIMATION_CONFIG.PHILOSOPHY_ANIM_OUT_MS);
            } else {
                labelEl.textContent = item.cat;
                titleEl.textContent = item.title;
                descEl.textContent = item.desc;
                if (pagination) {
                    pagination.textContent = `${STATE.philosophySection.activeIndex + 1} / ${data.length}`;
                }
            }
        };

        // Set mode (principles/philosophy)
        const setMode = (mode) => {
            if (mode === STATE.philosophySection.activeMode) return;

            STATE.philosophySection.activeMode = mode;
            STATE.philosophySection.activeIndex = 0;

            // Update toggle button states
            toggleBtns.forEach(btn => {
                btn.classList.toggle('is-active', btn.dataset.mode === mode);
            });

            // Update toggle data attribute for slider position
            toggle.dataset.mode = mode;

            // Swap video backgrounds
            if (mode === 'principles') {
                videoPrinciples.classList.add('is-active');
                videoPhilosophy.classList.remove('is-active');
            } else {
                videoPrinciples.classList.remove('is-active');
                videoPhilosophy.classList.add('is-active');
            }

            // Update content with animation
            updateContent(true);
        };

        // Navigate between items
        const navigate = (direction) => {
            if (STATE.philosophySection.isAnimating) return;

            const data = getData();
            let newIndex = STATE.philosophySection.activeIndex + direction;

            // Wrap around
            if (newIndex < 0) newIndex = data.length - 1;
            if (newIndex >= data.length) newIndex = 0;

            STATE.philosophySection.activeIndex = newIndex;
            updateContent(true);
        };

        // Attach toggle click handlers
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setMode(btn.dataset.mode);
            });
        });

        // Attach navigation handlers (desktop)
        if (navPrev) navPrev.addEventListener('click', () => navigate(-1));
        if (navNext) navNext.addEventListener('click', () => navigate(1));

        // Attach navigation handlers (mobile)
        if (navMobilePrev) navMobilePrev.addEventListener('click', () => navigate(-1));
        if (navMobileNext) navMobileNext.addEventListener('click', () => navigate(1));

        // Keyboard navigation
        const handleKeydown = (e) => {
            const rect = wrapper.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!isVisible) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigate(1);
            }
        };

        document.addEventListener('keydown', handleKeydown);
        STATE.philosophyKeyHandler = handleKeydown;

        // Initial content render
        updateContent(false);

        // Explicitly play videos (fallback for browsers that block autoplay)
        const playVideos = () => {
            if (videoPrinciples) {
                videoPrinciples.play().catch(() => {});
            }
            if (videoPhilosophy) {
                videoPhilosophy.play().catch(() => {});
            }
        };

        // Try to play immediately and also on user interaction
        playVideos();
        document.addEventListener('click', playVideos, { once: true });
        document.addEventListener('scroll', playVideos, { once: true });
    },

    /**
     * Cleanup all scroll observers and event handlers
     */
    cleanup: () => {
        STATE.scrollObservers.forEach(obs => obs.disconnect());
        STATE.scrollObservers = [];

        // Clean up animated characters
        CHARACTERS.cleanup();

        // Clean up philosophy section keyboard handler
        if (STATE.philosophyKeyHandler) {
            document.removeEventListener('keydown', STATE.philosophyKeyHandler);
            STATE.philosophyKeyHandler = null;
        }

        // Clean up philosophy section observer
        if (STATE.philosophySectionObserver) {
            STATE.philosophySectionObserver.disconnect();
            STATE.philosophySectionObserver = null;
        }

        // Clean up philosophy scroll handler
        if (STATE.philosophyScrollHandler) {
            window.removeEventListener('scroll', STATE.philosophyScrollHandler);
            STATE.philosophyScrollHandler = null;
        }

        // Reset philosophy section state
        STATE.philosophySection = null;
    }
};
