/* ============================================
   CHARACTERS - Animated Thought-Cloud Character
   ============================================ */

const CHARACTER_CONFIG = {
    LOOK_MAX_DIST: 8,          // Maximum pixels eyes can move
    SMILE_TRANSITION_MS: 300,
    REACTION_MSG_MS: 2000      // How long to stay in success/error state
};

const CHARACTERS = {
    state: {
        mouseX: 0,
        mouseY: 0,
        mouseMoveHandler: null,
        initialized: false,
        reactionTimer: null,
        // Optional: keep track of whether we are in a reaction
        isReacting: false
    },

    /**
     * Returns HTML string for the character stage
     */
    render: () => `
        <div class="cloud-stage" id="character-stage">
            <div class="cloud-particles">
                <div class="cloud-sparkle s-1"></div>
                <div class="cloud-sparkle s-2"></div>
                <div class="cloud-sparkle s-3"></div>
                <div class="cloud-sparkle s-4"></div>
                <div class="cloud-sparkle s-5"></div>
            </div>
            
            <div class="cloud-wrapper">
                <div class="main-cloud" id="main-cloud">
                    <!-- Base structural bubbles -->
                    <div class="bubble b-main"></div>
                    <div class="bubble b-left"></div>
                    <div class="bubble b-right"></div>
                    <div class="bubble b-top"></div>
                    <div class="bubble b-top-right"></div>
                    <div class="bubble b-bottom-left"></div>
                    <div class="bubble b-bottom-right"></div>
                    
                    <!-- Decorative pastel layers -->
                    <div class="bubble-highlight h-1"></div>
                    <div class="bubble-highlight h-2"></div>

                    <!-- Character Face -->
                    <div class="cloud-face" id="cloud-face">
                        <div class="cloud-eyes">
                            <div class="cloud-eye"><div class="cloud-pupil"></div></div>
                            <div class="cloud-eye"><div class="cloud-pupil"></div></div>
                        </div>
                        <div class="cloud-cheeks">
                            <div class="cloud-cheek left"></div>
                            <div class="cloud-cheek right"></div>
                        </div>
                        <div class="cloud-smile" id="cloud-smile"></div>
                    </div>
                </div>
                
                <!-- Trailing smaller bubbles -->
                <div class="tail-bubbles">
                    <div class="tail-bubble t-1"></div>
                    <div class="tail-bubble t-2"></div>
                    <div class="tail-bubble t-3"></div>
                </div>
            </div>
        </div>
    `,

    /**
     * Initialize all character behaviors
     */
    init: () => {
        if (CHARACTERS.state.initialized) return;
        CHARACTERS.state.initialized = true;

        // Mouse tracking setup
        CHARACTERS.state.mouseMoveHandler = (e) => {
            // Only track if not currently in a locked reaction state
            if (!CHARACTERS.state.isReacting) {
                CHARACTERS.state.mouseX = e.clientX;
                CHARACTERS.state.mouseY = e.clientY;
                requestAnimationFrame(() => CHARACTERS._updateEyes());
            }
        };
        
        window.addEventListener('mousemove', CHARACTERS.state.mouseMoveHandler);

        // Center initially
        CHARACTERS._centerEyes();
    },

    /**
     * Cleanup all listeners and timers
     */
    cleanup: () => {
        if (!CHARACTERS.state.initialized) return;

        if (CHARACTERS.state.mouseMoveHandler) {
            window.removeEventListener('mousemove', CHARACTERS.state.mouseMoveHandler);
            CHARACTERS.state.mouseMoveHandler = null;
        }

        if (CHARACTERS.state.reactionTimer) {
            clearTimeout(CHARACTERS.state.reactionTimer);
            CHARACTERS.state.reactionTimer = null;
        }

        CHARACTERS.state.initialized = false;
    },

    /**
     * Celebrate animation on login success
     */
    onLoginSuccess: () => {
        const stage = document.getElementById('character-stage');
        if (!stage) return;
        
        CHARACTERS._setReaction(stage, 'is-success');
        
        // Bounce the eyes up slightly during success
        CHARACTERS._setPupils(0, -3); 
    },

    /**
     * Flinch animation on login failure
     */
    onLoginError: () => {
        const stage = document.getElementById('character-stage');
        if (!stage) return;
        
        CHARACTERS._setReaction(stage, 'is-error');
        
        // Look down slightly during error
        CHARACTERS._setPupils(0, 3);
    },

    /* ---- Private methods ---- */
    
    _setReaction: (stage, className) => {
        CHARACTERS.state.isReacting = true;
        
        // Clear any previous state
        stage.classList.remove('is-success', 'is-error');
        stage.classList.add(className);
        
        if (CHARACTERS.state.reactionTimer) {
            clearTimeout(CHARACTERS.state.reactionTimer);
        }
        
        CHARACTERS.state.reactionTimer = setTimeout(() => {
            stage.classList.remove(className);
            CHARACTERS.state.isReacting = false;
            // Eyes naturally return to mouse or center after reaction
            CHARACTERS._updateEyes();
        }, CHARACTER_CONFIG.REACTION_MSG_MS);
    },

    _centerEyes: () => {
        CHARACTERS._setPupils(0, 0);
    },

    _setPupils: (x, y) => {
        const stage = document.getElementById('character-stage');
        if (!stage) return;
        const pupils = stage.querySelectorAll('.cloud-pupil');
        pupils.forEach(p => {
            p.style.transform = `translate(${x}px, ${y}px)`;
        });
    },

    _updateEyes: () => {
        const face = document.getElementById('cloud-face');
        if (!face) return;

        const rect = face.getBoundingClientRect();
        
        // Center of the face element
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        
        const dx = CHARACTERS.state.mouseX - cx;
        const dy = CHARACTERS.state.mouseY - cy;
        
        // Damped tracking logic limits toLOOK_MAX_DIST radius
        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 300); // normalize dist
        const maxDist = CHARACTER_CONFIG.LOOK_MAX_DIST;
        
        // Non-linear dampening for smoother edge-stopping
        const strength = distance / 300; 
        const angle = Math.atan2(dy, dx);
        
        const px = Math.cos(angle) * (strength * maxDist);
        const py = Math.sin(angle) * (strength * maxDist);

        CHARACTERS._setPupils(px, py);
    }
};
