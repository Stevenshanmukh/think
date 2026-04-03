/* ============================================
   SECTIONS - Page Section Templates
============================================ */
const SECTIONS = {
    Hero: () => `
        <section class="hero" id="hero">
            <div class="hero-video-wrapper">
                <video class="hero-video" loop autoplay muted playsinline poster="ThinkbubbleLogo.png">
                    <source src="hero_boomerang.mp4" type="video/mp4">
                </video>
            </div>
            <div class="hero-overlay"></div>
            <div class="hero-content container">
                <div class="hero-headline-wrap">
                    <h1 class="text-hero reveal" id="hero-headline">Infrastructure for<br>Human-Centric AI.</h1>
                </div>
                <p class="text-lead hero-sub reveal reveal-delay-2">
                    ThinkBubble is an independent AI research lab building foundational infrastructure where human context is treated as a core capability, not an afterthought.
                </p>
                <div class="hero-actions reveal reveal-delay-3">
                    ${UI.HeroCTA('Contact Us', '#contact')}
                </div>
            </div>
        </section>
    `,

    Narrative: () => `
        <section class="section narrative" id="narrative">
            <div class="container container-narrow text-center">
                <p class="narrative-text reveal">
                    ThinkBubble is the <span class="highlight">engine behind practical AI</span> - designing and scaling the infrastructure, systems, and architectures that power real-world innovation. We build advanced capabilities accessible to <span class="highlight">creators, individuals, and small businesses</span>, guided by our Four Core Values and a commitment to advancing AI in ways that benefit everyone. Each system strengthens the next, forming a growing global foundation for what comes next. <span class="highlight">The future is brighter when we think together</span>.
                </p>
            </div>
        </section>
    `,

    HowWeBuild: () => `
        <div class="hwb-scroll-container" id="how-we-build-section">
            <div class="hwb-sticky-content">
                <div class="container">
                    <!-- Mobile-only combined heading -->
                    <h2 class="text-h2 reveal hwb-mobile-title">Principles & Philosophy</h2>

                    <!-- Desktop crossfade titles -->
                    <div class="section-title-wrap reveal hwb-desktop-titles" id="hwb-title-wrap">
                        <h2 class="text-h2 section-title-outgoing" id="hwb-title-out">How We Build</h2>
                        <h2 class="text-h2 section-title-incoming" id="hwb-title-in">Our Philosophy</h2>
                    </div>
                    <div class="section-subtitle-wrap hwb-desktop-titles">
                        <p class="text-lead reveal reveal-delay-1 subtitle-outgoing">The principles that guide our work.</p>
                        <p class="text-lead subtitle-incoming">The values at the heart of everything we create.</p>
                    </div>

                    <!-- Mobile-only subtitle -->
                    <p class="text-lead reveal reveal-delay-1 hwb-mobile-subtitle">Scroll to reveal the values behind each principle.</p>

                    <div class="grid-4">
                        ${DATA.architecture.map((item, i) => UI.FlippableCard(item, DATA.philosophy[i], i)).join('')}
                    </div>
                </div>
            </div>
            <!-- Invisible trigger element at 60% scroll progress -->
            <div class="hwb-flip-trigger" id="hwb-flip-trigger" aria-hidden="true"></div>
        </div>
    `,

    WhatWeBuild: () => `
        <section class="section narrative" style="padding-top: 0;">
            <div class="container container-narrow text-center">
                <h2 class="text-h2 reveal">What We're Building</h2>
                <p class="narrative-text reveal reveal-delay-1" style="font-size: clamp(1.2rem, 2vw, 1.5rem); margin-bottom: 3rem;">
                    On top of our infrastructure foundation sit the products themselves. Aiparel focuses on creator-driven commerce and expression. KloeAI helps small and medium-sized businesses deploy intelligent, multilingual chatbots without needing a development team. In parallel, we're developing a broader suite of AI-driven tools built on the same underlying infrastructure, aimed at putting capable, practical AI in the hands of individuals and small organizations. Each project operates independently but shares the same technical foundation.
                </p>
                <div class="reveal reveal-delay-2">
                    <a href="#projects" class="btn btn-primary" data-link>Explore Our Projects</a>
                </div>
            </div>
        </section>
    `,

    Projects: () => `
        <section class="section" style="background: var(--bg-surface)" id="projects">
            <div class="container">
                <h2 class="text-h2 reveal text-center">Our Projects</h2>
                <div class="showcase-list mt-4">
                    ${DATA.projects.map((c, i) => UI.ProjectShowcase(c, i)).join('')}

                    <div class="reveal mt-8 mb-4" style="display: flex; justify-content: center; width: 100%;">
                        <div class="in-development-badge">
                            <span class="badge-dot"></span>
                            <span class="badge-text">More ventures in development...</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
};

/* ============================================
   COMPONENTS - Full Page Templates
============================================ */
const COMPONENTS = {
    LandingScreen: () => `
        ${SECTIONS.Hero()}
        ${SECTIONS.Narrative()}
        ${SECTIONS.HowWeBuild()}
        ${SECTIONS.WhatWeBuild()}
    `,

    PortalScreen: () => {
        if (!STATE.user) {
            return `
                <div class="portal-layout-full">
                    <div class="portal-page-title reveal">Employees Log In</div>
                    <div class="portal-split-card reveal" id="portal-container">
                        <div class="portal-form-side" id="portal-left-section">
                            <div class="portal-orb" id="portal-orb"></div>
                            <div class="portal-form-container">
                                <form class="portal-form" onsubmit="event.preventDefault(); UTILITIES.login();" aria-label="Employee login form">
                                    <div class="portal-form-header">
                                        <h1 class="portal-form-title">Sign in</h1>
                                    </div>
                                    <div class="portal-form-fields">
                                        <div class="portal-app-input">
                                            <label for="l-email" class="sr-only">Employee Email</label>
                                            <div class="portal-input-wrapper">
                                                <input
                                                    type="email"
                                                    id="l-email"
                                                    name="email"
                                                    required
                                                    placeholder="Employee Email"
                                                    class="portal-input"
                                                    value="demo@thinkbubble.ai"
                                                    autocomplete="email"
                                                    aria-describedby="l-err"
                                                />
                                                <div class="portal-gradient-line portal-gradient-top"></div>
                                                <div class="portal-gradient-line portal-gradient-bottom"></div>
                                            </div>
                                        </div>
                                        <div class="portal-app-input">
                                            <label for="l-pass" class="sr-only">Password</label>
                                            <div class="portal-input-wrapper">
                                                <input
                                                    type="password"
                                                    id="l-pass"
                                                    name="password"
                                                    required
                                                    placeholder="Password"
                                                    class="portal-input"
                                                    value="demo"
                                                    autocomplete="current-password"
                                                    aria-describedby="l-err"
                                                />
                                                <button type="button" class="portal-pass-toggle" aria-label="Toggle password visibility">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                                </button>
                                                <div class="portal-gradient-line portal-gradient-top"></div>
                                                <div class="portal-gradient-line portal-gradient-bottom"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p id="l-err" class="portal-error" role="alert" aria-live="polite"></p>
                                    <a href="#" class="portal-help-link">Need access?</a>
                                    <div class="portal-actions">
                                        <button type="submit" class="portal-submit-btn">
                                            <span>Sign In</span>
                                            <div class="btn-shine">
                                                <div class="btn-shine-inner"></div>
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="portal-hero-side">
                            <div class="portal-hero-overlay"></div>

                            <!-- Animated Characters -->
                            ${CHARACTERS.render()}
                        </div>
                    </div>
                </div>
            `;
        }

        // Logged in - show cards or scheduling view
        if (STATE.portalView === 'scheduling') {
            return `
                <div class="container" style="padding-top: 12vh; min-height: 100vh; padding-bottom: 4rem;">
                    <div class="reveal">
                        <div class="dashboard-header">
                            <div>
                                <span class="back-link" onclick="UTILITIES.showPortalCards()">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                                    Back to Dashboard
                                </span>
                                <h2 class="text-h2" style="font-size: 2rem; margin-bottom: 0;">Employee Portal</h2>
                                <p class="text-secondary">${STATE.user.name} - ${STATE.user.role}</p>
                            </div>
                            <button class="btn btn-secondary" onclick="UTILITIES.logout()">Logout</button>
                        </div>
                        ${UI.SchedulingGrid(STATE.user.name)}
                    </div>
                </div>
            `;
        }

        // Cards view (default)
        return `
            <div class="container" style="padding-top: 15vh; min-height: 100vh;">
                <div class="reveal">
                    <div class="dashboard-header">
                        <div>
                            <h2 class="text-h2" style="font-size: 2.5rem; margin-bottom: 0;">Welcome, ${STATE.user.name}</h2>
                            <p class="text-secondary">${STATE.user.role}</p>
                        </div>
                        <button class="btn btn-secondary" onclick="UTILITIES.logout()">Logout</button>
                    </div>

                    <div style="text-align: center; margin-bottom: 3rem;">
                        <h3 class="text-h3" style="margin-bottom: 0.5rem;">What would you like to do?</h3>
                        <p class="text-secondary">Select an option below to get started</p>
                    </div>

                    <div class="portal-cards-grid">
                        <div class="portal-option-card" onclick="UTILITIES.showScheduling()">
                            <div class="card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="1.5">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
                                </svg>
                            </div>
                            <h3>Scheduling</h3>
                            <p>Set your weekly hours and availability</p>
                        </div>

                        <div class="portal-option-card" style="opacity: 0.6; cursor: not-allowed;">
                            <div class="card-icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <h3>Teammates</h3>
                            <p>View team members and contact info</p>
                            <span class="coming-soon">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    ContactScreen: () => `
        <div class="contact-layout">
            <div class="container container-narrow reveal">
                <h1 class="text-hero" style="font-size: clamp(2.5rem, 5vw, 4rem);">Work With Us</h1>
                <p class="text-lead" style="margin-bottom: 4rem;">For partnership inquiries, research collaboration, or enterprise licensing.</p>

                <form onsubmit="event.preventDefault(); this.innerHTML='<h3 class=\\'text-h3\\'>Message received. We will be in touch.</h3>';">
                    <div class="floating-group">
                        <input type="text" id="c-name" class="floating-input" placeholder="Name" required>
                        <label for="c-name" class="floating-label">Name</label>
                    </div>
                    <div class="floating-group">
                        <input type="email" id="c-email" class="floating-input" placeholder="Email" required>
                        <label for="c-email" class="floating-label">Email Address</label>
                    </div>
                    <div class="floating-group" style="margin-top: 3rem;">
                        <textarea id="c-msg" class="floating-input" style="height: 100px; resize: none;" placeholder="Message" required></textarea>
                        <label for="c-msg" class="floating-label">Tell us about your project</label>
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: 2rem;">Send Message</button>
                </form>
            </div>
        </div>
    `,

    ProjectsScreen: () => `
        <div style="min-height: 85vh;">
            ${SECTIONS.Projects()}
        </div>
    `
};

/* ============================================
   ROUTER - Hash-based SPA Navigation
============================================ */
const ROUTER = {
    routes: {
        'home': COMPONENTS.LandingScreen,
        'portal': COMPONENTS.PortalScreen,
        'contact': COMPONENTS.ContactScreen,
        'projects': COMPONENTS.ProjectsScreen
    },

    init: () => {
        // Intercept clicks to prevent default jump if we handle it
        document.addEventListener('click', e => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href').replace('#', '');
                ROUTER.navigate(href || 'home');
            }
        });

        window.addEventListener('hashchange', () => {
            ROUTER.render(window.location.hash.replace('#', '') || 'home');
        });

        ROUTER.render(window.location.hash.replace('#', '') || 'home');
        ANIMATIONS.initParallax();
    },

    navigate: (path) => {
        window.location.hash = path;
    },

    render: (route) => {
        const originalRoute = route;
        // Map old sub-page routes to 'home' to maintain backward compatibility
        if (['purpose', 'how-we-build', 'products'].includes(route)) {
            route = 'home';
        }
        if (route === 'hero' || !route) route = 'home';

        const contentEl = document.getElementById('page-content');
        const loadingEl = document.getElementById('page-loading');

        // Helper to update active nav with ARIA
        const updateActiveNav = (targetRoute) => {
            document.querySelectorAll('.nav-link').forEach(n => {
                n.classList.remove('active');
                n.removeAttribute('aria-current');
                if (n.getAttribute('href') === '#' + targetRoute) {
                    n.classList.add('active');
                    n.setAttribute('aria-current', 'page');
                }
            });
        };

        // Only render if needed or if portal state changed
        if (STATE.route !== route || route === 'portal') {
            ANIMATIONS.cleanup();

            window.scrollTo(0, 0);
            const html = (ROUTER.routes[route] || ROUTER.routes['home'])();
            contentEl.innerHTML = html;
            STATE.route = route;

            setTimeout(() => {
                ANIMATIONS.initReveal();
                ANIMATIONS.initGlossyCards();
                if (route === 'home') ANIMATIONS.initPhilosophyScroll();
                if (route === 'portal') ANIMATIONS.initPortalLogin();

                if (originalRoute !== route && document.getElementById(originalRoute)) {
                    document.getElementById(originalRoute).scrollIntoView();
                }
            }, 50);

            // Update active nav state with ARIA
            updateActiveNav(originalRoute);
        } else {
            // It's a deep link within home
            const targetSection = document.getElementById(originalRoute) || document.getElementById('hero');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            updateActiveNav(originalRoute);
        }
    }
};
