/* ============================================
   MAIN - Application Entry Point
============================================ */

/**
 * Initialize mobile menu functionality
 * Handles: open/close, Escape key, click-outside,
 * focus trapping, ARIA states, resize cleanup
 */
function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');
    const navClose = document.getElementById('nav-close');

    if (!hamburger || !navLinks) return;

    // Focusable elements inside the menu for focus trapping
    const getFocusableElements = () =>
        navLinks.querySelectorAll('a.nav-link, button.nav-close');

    /**
     * Open mobile menu
     */
    function openMenu() {
        navLinks.classList.add('is-open');
        hamburger.classList.add('is-hidden');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Focus the close button after opening
        setTimeout(() => {
            if (navClose) navClose.focus();
        }, 100);

        // Attach close-on-outside-click and keyboard listeners
        document.addEventListener('keydown', handleMenuKeydown);
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-hidden');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Return focus to hamburger
        hamburger.focus();

        document.removeEventListener('keydown', handleMenuKeydown);
    }

    /**
     * Handle keyboard events when menu is open
     */
    function handleMenuKeydown(e) {
        // Escape to close
        if (e.key === 'Escape') {
            e.preventDefault();
            closeMenu();
            return;
        }

        // Tab trapping — keep focus inside the menu
        if (e.key === 'Tab') {
            const focusable = getFocusableElements();
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                // Shift+Tab: wrap from first to last
                if (document.activeElement === first || document.activeElement === navClose) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                // Tab: wrap from last to first
                if (document.activeElement === last) {
                    e.preventDefault();
                    (navClose || first).focus();
                }
            }
        }
    }

    // Open on hamburger click
    hamburger.addEventListener('click', openMenu);

    // Close on close button click
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close when clicking a nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close when clicking the overlay backdrop (outside links area)
    navLinks.addEventListener('click', (e) => {
        // Only close if clicking the backdrop itself, not a child element
        if (e.target === navLinks) {
            closeMenu();
        }
    });

    // Handle resize: close menu if switching from mobile to desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navLinks.classList.contains('is-open')) {
                closeMenu();
            }
        }, 150);
    });

    // Set initial ARIA state
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-links');
    navLinks.setAttribute('role', 'dialog');
    navLinks.setAttribute('aria-label', 'Navigation menu');
}

/**
 * Bootstrap the application
 */
document.addEventListener('DOMContentLoaded', () => {
    ROUTER.init();
    initMobileMenu();
});
