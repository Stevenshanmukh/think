/* ============================================
   CHARACTERS - Animated Eye-Tracking Characters
   
   Ported from React component to vanilla JS.
   Features: eye tracking, blinking, body lean,
   password peek, typing awareness, login reactions.
============================================ */
const CHARACTERS = {
    state: {
        mouseX: 0,
        mouseY: 0,
        blinkTimers: [],
        mouseMoveHandler: null,
        inputFocusHandlers: [],
        inputChangeHandlers: [],
        passwordToggleHandler: null,
        isTyping: false,
        lookTimer: null,
        isLookingAtEachOther: false,
        passwordVisible: false,
        passwordHasContent: false,
        purplePeeking: false,
        peekTimer: null,
        animFrameId: null,
        initialized: false,
        celebrateTimer: null,
        flinchTimer: null
    },

    /**
     * Returns HTML string for the character stage
     */
    render: () => `
        <div class="character-stage" id="character-stage">
            <!-- Purple tall character (back layer) -->
            <div class="char-body char-purple" id="char-purple">
                <div class="char-eyes" id="eyes-purple">
                    <div class="char-eye"><div class="char-pupil"></div></div>
                    <div class="char-eye"><div class="char-pupil"></div></div>
                </div>
            </div>

            <!-- Black tall character (middle layer) -->
            <div class="char-body char-black" id="char-black">
                <div class="char-eyes" id="eyes-black">
                    <div class="char-eye"><div class="char-pupil"></div></div>
                    <div class="char-eye"><div class="char-pupil"></div></div>
                </div>
            </div>

            <!-- Orange dome character (front left) -->
            <div class="char-body char-orange" id="char-orange">
                <div class="char-eyes" id="eyes-orange">
                    <div class="char-pupil-only"></div>
                    <div class="char-pupil-only"></div>
                </div>
            </div>

            <!-- Yellow dome character (front right) -->
            <div class="char-body char-yellow" id="char-yellow">
                <div class="char-eyes" id="eyes-yellow">
                    <div class="char-pupil-only"></div>
                    <div class="char-pupil-only"></div>
                </div>
                <div class="char-mouth" id="mouth-yellow"></div>
            </div>
        </div>
    `,

    /**
     * Initialize all character behaviors
     */
    init: () => {
        if (CHARACTERS.state.initialized) return;
        CHARACTERS.state.initialized = true;

        // Mouse tracking
        CHARACTERS.state.mouseMoveHandler = (e) => {
            CHARACTERS.state.mouseX = e.clientX;
            CHARACTERS.state.mouseY = e.clientY;
            CHARACTERS._updateAll();
        };
        window.addEventListener('mousemove', CHARACTERS.state.mouseMoveHandler);

        // Start blinking for purple and black characters
        CHARACTERS._startBlinking('char-purple', 'eyes-purple', 0);
        CHARACTERS._startBlinking('char-black', 'eyes-black', 1);

        // Listen to form inputs for typing awareness
        CHARACTERS._attachInputListeners();

        // Initial position update
        CHARACTERS._updateAll();
    },

    /**
     * Cleanup all listeners and timers
     */
    cleanup: () => {
        if (!CHARACTERS.state.initialized) return;

        // Remove mouse listener
        if (CHARACTERS.state.mouseMoveHandler) {
            window.removeEventListener('mousemove', CHARACTERS.state.mouseMoveHandler);
            CHARACTERS.state.mouseMoveHandler = null;
        }

        // Clear blink timers
        CHARACTERS.state.blinkTimers.forEach(t => clearTimeout(t));
        CHARACTERS.state.blinkTimers = [];

        // Clear look timer
        if (CHARACTERS.state.lookTimer) {
            clearTimeout(CHARACTERS.state.lookTimer);
            CHARACTERS.state.lookTimer = null;
        }

        // Clear peek timer
        if (CHARACTERS.state.peekTimer) {
            clearTimeout(CHARACTERS.state.peekTimer);
            CHARACTERS.state.peekTimer = null;
        }

        // Clear celebrate/flinch timers
        if (CHARACTERS.state.celebrateTimer) {
            clearTimeout(CHARACTERS.state.celebrateTimer);
            CHARACTERS.state.celebrateTimer = null;
        }
        if (CHARACTERS.state.flinchTimer) {
            clearTimeout(CHARACTERS.state.flinchTimer);
            CHARACTERS.state.flinchTimer = null;
        }

        // Cancel animation frame
        if (CHARACTERS.state.animFrameId) {
            cancelAnimationFrame(CHARACTERS.state.animFrameId);
            CHARACTERS.state.animFrameId = null;
        }

        // Detach input listeners
        CHARACTERS._detachInputListeners();

        CHARACTERS.state.initialized = false;
    },

    /**
     * Celebrate animation on login success
     */
    onLoginSuccess: () => {
        const stage = document.getElementById('character-stage');
        if (!stage) return;
        stage.classList.add('char-celebrate');
        CHARACTERS.state.celebrateTimer = setTimeout(() => {
            stage.classList.remove('char-celebrate');
        }, 1200);
    },

    /**
     * Flinch animation on login failure
     */
    onLoginError: () => {
        const stage = document.getElementById('character-stage');
        if (!stage) return;
        stage.classList.add('char-flinch');
        CHARACTERS.state.flinchTimer = setTimeout(() => {
            stage.classList.remove('char-flinch');
        }, 600);
    },

    /* ---- Private methods ---- */

    /**
     * Attach listeners to the login form inputs
     */
    _attachInputListeners: () => {
        const emailInput = document.getElementById('l-email');
        const passInput = document.getElementById('l-pass');
        const formSide = document.getElementById('portal-left-section');

        if (emailInput) {
            const focusHandler = () => {
                CHARACTERS.state.isTyping = true;
                CHARACTERS._triggerLookAtEachOther();
            };
            const blurHandler = () => {
                CHARACTERS.state.isTyping = false;
            };
            emailInput.addEventListener('focus', focusHandler);
            emailInput.addEventListener('blur', blurHandler);
            CHARACTERS.state.inputFocusHandlers.push(
                { el: emailInput, focus: focusHandler, blur: blurHandler }
            );
        }

        if (passInput) {
            const inputHandler = () => {
                CHARACTERS.state.passwordHasContent = passInput.value.length > 0;
                CHARACTERS._updateAll();
                CHARACTERS._schedulePeek();
            };
            const focusHandler = () => {
                CHARACTERS.state.isTyping = true;
                CHARACTERS._triggerLookAtEachOther();
            };
            const blurHandler = () => {
                CHARACTERS.state.isTyping = false;
            };
            passInput.addEventListener('input', inputHandler);
            passInput.addEventListener('focus', focusHandler);
            passInput.addEventListener('blur', blurHandler);
            CHARACTERS.state.inputChangeHandlers.push(
                { el: passInput, handler: inputHandler }
            );
            CHARACTERS.state.inputFocusHandlers.push(
                { el: passInput, focus: focusHandler, blur: blurHandler }
            );

            // Check if password is already a visible text field
            CHARACTERS.state.passwordVisible = passInput.type === 'text';
            CHARACTERS.state.passwordHasContent = passInput.value.length > 0;

            // Watch for password visibility toggle via MutationObserver on type attr
            const observer = new MutationObserver(() => {
                CHARACTERS.state.passwordVisible = passInput.type === 'text';
                CHARACTERS._updateAll();
                CHARACTERS._schedulePeek();
            });
            observer.observe(passInput, { attributes: true, attributeFilter: ['type'] });
            CHARACTERS.state._passObserver = observer;
        }

        // Password toggle button - also listen for click to detect toggle
        if (formSide) {
            const toggleHandler = (e) => {
                const btn = e.target.closest('.portal-pass-toggle');
                if (btn && passInput) {
                    passInput.type = passInput.type === 'password' ? 'text' : 'password';
                    // Update icon
                    btn.innerHTML = passInput.type === 'password'
                        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
                        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
                }
            };
            formSide.addEventListener('click', toggleHandler);
            CHARACTERS.state.passwordToggleHandler = { el: formSide, handler: toggleHandler };
        }
    },

    /**
     * Detach all input listeners
     */
    _detachInputListeners: () => {
        CHARACTERS.state.inputFocusHandlers.forEach(({ el, focus, blur }) => {
            el.removeEventListener('focus', focus);
            el.removeEventListener('blur', blur);
        });
        CHARACTERS.state.inputFocusHandlers = [];

        CHARACTERS.state.inputChangeHandlers.forEach(({ el, handler }) => {
            el.removeEventListener('input', handler);
        });
        CHARACTERS.state.inputChangeHandlers = [];

        if (CHARACTERS.state.passwordToggleHandler) {
            const { el, handler } = CHARACTERS.state.passwordToggleHandler;
            el.removeEventListener('click', handler);
            CHARACTERS.state.passwordToggleHandler = null;
        }

        if (CHARACTERS.state._passObserver) {
            CHARACTERS.state._passObserver.disconnect();
            CHARACTERS.state._passObserver = null;
        }
    },

    /**
     * Start random blinking for a character
     */
    _startBlinking: (charId, eyesId, timerIndex) => {
        const getInterval = () => Math.random() * 4000 + 3000; // 3-7 seconds

        const scheduleBlink = () => {
            const timer = setTimeout(() => {
                const eyes = document.getElementById(eyesId);
                if (!eyes) return;

                // Blink: collapse eye height
                const eyeEls = eyes.querySelectorAll('.char-eye');
                eyeEls.forEach(eye => eye.classList.add('is-blinking'));

                setTimeout(() => {
                    eyeEls.forEach(eye => eye.classList.remove('is-blinking'));
                    scheduleBlink();
                }, 150);
            }, getInterval());

            CHARACTERS.state.blinkTimers[timerIndex] = timer;
        };

        scheduleBlink();
    },

    /**
     * Trigger "look at each other" for a short duration
     */
    _triggerLookAtEachOther: () => {
        if (CHARACTERS.state.lookTimer) clearTimeout(CHARACTERS.state.lookTimer);
        CHARACTERS.state.isLookingAtEachOther = true;
        CHARACTERS._updateAll();

        CHARACTERS.state.lookTimer = setTimeout(() => {
            CHARACTERS.state.isLookingAtEachOther = false;
            CHARACTERS._updateAll();
        }, 800);
    },

    /**
     * Schedule purple character peeking at password
     */
    _schedulePeek: () => {
        if (CHARACTERS.state.peekTimer) {
            clearTimeout(CHARACTERS.state.peekTimer);
            CHARACTERS.state.peekTimer = null;
        }

        if (CHARACTERS.state.passwordHasContent && CHARACTERS.state.passwordVisible) {
            CHARACTERS.state.peekTimer = setTimeout(() => {
                CHARACTERS.state.purplePeeking = true;
                CHARACTERS._updateAll();

                setTimeout(() => {
                    CHARACTERS.state.purplePeeking = false;
                    CHARACTERS._updateAll();
                    // Schedule another peek
                    CHARACTERS._schedulePeek();
                }, 800);
            }, Math.random() * 3000 + 2000);
        } else {
            CHARACTERS.state.purplePeeking = false;
        }
    },

    /**
     * Calculate eye pupil offset for a given element
     */
    _calcPupilOffset: (el, maxDist) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = CHARACTERS.state.mouseX - cx;
        const dy = CHARACTERS.state.mouseY - cy;
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
        const angle = Math.atan2(dy, dx);
        return {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist
        };
    },

    /**
     * Calculate body skew for a given element
     */
    _calcBodySkew: (el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const dx = CHARACTERS.state.mouseX - cx;
        return Math.max(-6, Math.min(6, -dx / 120));
    },

    /**
     * Update all character positions and states
     */
    _updateAll: () => {
        const st = CHARACTERS.state;
        const hidePassword = st.passwordHasContent && !st.passwordVisible;
        const showPassword = st.passwordHasContent && st.passwordVisible;
        const isTypingOrHiding = st.isTyping || hidePassword;

        // --- Purple character ---
        const purple = document.getElementById('char-purple');
        const purpleEyes = document.getElementById('eyes-purple');
        if (purple && purpleEyes) {
            const skew = CHARACTERS._calcBodySkew(purple);

            if (showPassword) {
                // Looking away (privacy mode)
                purple.style.transform = 'skewX(0deg)';
                purple.classList.remove('char-stretched');
                purple.classList.remove('char-lean-left');
            } else if (isTypingOrHiding) {
                // Stretched up and leaning away
                purple.style.transform = `skewX(${(skew - 12)}deg) translateX(30px)`;
                purple.classList.add('char-stretched');
                purple.classList.add('char-lean-left');
            } else {
                purple.style.transform = `skewX(${skew}deg)`;
                purple.classList.remove('char-stretched');
                purple.classList.remove('char-lean-left');
            }

            // Purple eyes
            const purplePupils = purpleEyes.querySelectorAll('.char-pupil');
            if (showPassword) {
                // Look away or peek
                const lookX = st.purplePeeking ? 4 : -4;
                const lookY = st.purplePeeking ? 5 : -4;
                purplePupils.forEach(p => {
                    p.style.transform = `translate(${lookX}px, ${lookY}px)`;
                });
                purpleEyes.style.left = '15%';
                purpleEyes.style.top = '10%';
            } else if (st.isLookingAtEachOther) {
                purplePupils.forEach(p => {
                    p.style.transform = `translate(3px, 4px)`;
                });
                purpleEyes.style.left = '35%';
                purpleEyes.style.top = '20%';
            } else {
                const offset = CHARACTERS._calcPupilOffset(purpleEyes, 5);
                purplePupils.forEach(p => {
                    p.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
                });
                const faceX = CHARACTERS._calcFaceOffset(purple, 15, 20);
                purpleEyes.style.left = `${28 + faceX.x}%`;
                purpleEyes.style.top = `${12 + faceX.y}%`;
            }
        }

        // --- Black character ---
        const black = document.getElementById('char-black');
        const blackEyes = document.getElementById('eyes-black');
        if (black && blackEyes) {
            const skew = CHARACTERS._calcBodySkew(black);

            if (showPassword) {
                black.style.transform = 'skewX(0deg)';
            } else if (st.isLookingAtEachOther) {
                black.style.transform = `skewX(${(skew * 1.5 + 10)}deg) translateX(15px)`;
            } else if (isTypingOrHiding) {
                black.style.transform = `skewX(${skew * 1.5}deg)`;
            } else {
                black.style.transform = `skewX(${skew}deg)`;
            }

            const blackPupils = blackEyes.querySelectorAll('.char-pupil');
            if (showPassword) {
                blackPupils.forEach(p => {
                    p.style.transform = `translate(-4px, -4px)`;
                });
                blackEyes.style.left = '12%';
                blackEyes.style.top = '10%';
            } else if (st.isLookingAtEachOther) {
                blackPupils.forEach(p => {
                    p.style.transform = `translate(0px, -4px)`;
                });
                blackEyes.style.left = '30%';
                blackEyes.style.top = '5%';
            } else {
                const offset = CHARACTERS._calcPupilOffset(blackEyes, 4);
                blackPupils.forEach(p => {
                    p.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
                });
                const faceX = CHARACTERS._calcFaceOffset(black, 15, 30);
                blackEyes.style.left = `${22 + faceX.x}%`;
                blackEyes.style.top = `${12 + faceX.y}%`;
            }
        }

        // --- Orange character ---
        const orange = document.getElementById('char-orange');
        const orangeEyes = document.getElementById('eyes-orange');
        if (orange && orangeEyes) {
            const skew = CHARACTERS._calcBodySkew(orange);
            orange.style.transform = showPassword ? 'skewX(0deg)' : `skewX(${skew}deg)`;

            const orangePupils = orangeEyes.querySelectorAll('.char-pupil-only');
            if (showPassword) {
                orangePupils.forEach(p => {
                    p.style.transform = `translate(-5px, -4px)`;
                });
                orangeEyes.style.left = '25%';
                orangeEyes.style.top = '45%';
            } else {
                const offset = CHARACTERS._calcPupilOffset(orangeEyes, 5);
                orangePupils.forEach(p => {
                    p.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
                });
                const faceX = CHARACTERS._calcFaceOffset(orange, 15, 20);
                orangeEyes.style.left = `${35 + faceX.x}%`;
                orangeEyes.style.top = `${48 + faceX.y}%`;
            }
        }

        // --- Yellow character ---
        const yellow = document.getElementById('char-yellow');
        const yellowEyes = document.getElementById('eyes-yellow');
        const yellowMouth = document.getElementById('mouth-yellow');
        if (yellow && yellowEyes) {
            const skew = CHARACTERS._calcBodySkew(yellow);
            yellow.style.transform = showPassword ? 'skewX(0deg)' : `skewX(${skew}deg)`;

            const yellowPupils = yellowEyes.querySelectorAll('.char-pupil-only');
            if (showPassword) {
                yellowPupils.forEach(p => {
                    p.style.transform = `translate(-5px, -4px)`;
                });
                yellowEyes.style.left = '18%';
                yellowEyes.style.top = '18%';
                if (yellowMouth) {
                    yellowMouth.style.left = '10%';
                    yellowMouth.style.top = '42%';
                }
            } else {
                const offset = CHARACTERS._calcPupilOffset(yellowEyes, 5);
                yellowPupils.forEach(p => {
                    p.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
                });
                const faceX = CHARACTERS._calcFaceOffset(yellow, 15, 20);
                yellowEyes.style.left = `${38 + faceX.x}%`;
                yellowEyes.style.top = `${18 + faceX.y}%`;
                if (yellowMouth) {
                    yellowMouth.style.left = `${28 + faceX.x}%`;
                    yellowMouth.style.top = `${42 + faceX.y}%`;
                }
            }
        }
    },

    /**
     * Calculate face offset (limited movement range for face features)
     */
    _calcFaceOffset: (el, maxX, divider) => {
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 3;
        const dx = CHARACTERS.state.mouseX - cx;
        const dy = CHARACTERS.state.mouseY - cy;
        return {
            x: Math.max(-maxX, Math.min(maxX, dx / divider)),
            y: Math.max(-10, Math.min(10, dy / 30))
        };
    }
};
