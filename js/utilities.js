/* ============================================
   UTILITIES - Login, Scheduling, and Helpers
============================================ */
const UTILITIES = {
    /**
     * Handle portal login
     */
    login: () => {
        const em = document.getElementById('l-email').value;
        const pa = document.getElementById('l-pass').value;
        const err = document.getElementById('l-err');

        const u = DATA.portalUsers.find(x => x.email === em && x.pass === pa);
        if (u) {
            // Trigger character celebrate animation before navigating
            CHARACTERS.onLoginSuccess();
            setTimeout(() => {
                STATE.user = u;
                STATE.portalView = 'cards';
                ROUTER.render('portal');
            }, 1000); // Delay so user sees the celebration
        } else {
            err.innerText = "Invalid credentials. Please try again.";
            CHARACTERS.onLoginError();
        }
    },

    /**
     * Handle portal logout
     */
    logout: () => {
        STATE.user = null;
        STATE.portalView = 'cards';
        STATE.employeeSchedule = {};
        ROUTER.render('portal');
    },

    /**
     * Initialize week start date (Monday of current week)
     */
    initWeekStart: () => {
        if (!STATE.currentWeekStart) {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Monday
            STATE.currentWeekStart = new Date(now);
            STATE.currentWeekStart.setDate(now.getDate() + diff);
            STATE.currentWeekStart.setHours(0, 0, 0, 0);
        }
    },

    /**
     * Get formatted week range string
     */
    getWeekRange: () => {
        UTILITIES.initWeekStart();
        const start = STATE.currentWeekStart;
        const end = new Date(start);
        end.setDate(start.getDate() + 4); // Friday
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
    },

    /**
     * Navigate to previous or next week
     */
    navigateWeek: (direction) => {
        UTILITIES.initWeekStart();
        const days = direction === 'next' ? 7 : -7;
        STATE.currentWeekStart.setDate(STATE.currentWeekStart.getDate() + days);
        STATE.employeeSchedule = {}; // Reset schedule for new week
        ROUTER.render('portal');
    },

    /**
     * Update a single schedule cell
     */
    updateScheduleCell: (day, time, value) => {
        const key = `${day}-${time}`;
        STATE.employeeSchedule[key] = value;
        UTILITIES.updateCapacityDisplay();
    },

    /**
     * Get schedule value for a specific day/time
     */
    getScheduleValue: (day, time) => {
        const key = `${day}-${time}`;
        return STATE.employeeSchedule[key] || 'Off';
    },

    /**
     * Get on-prem count for a specific day/time (mock data)
     */
    getOnPremCount: (day, time) => {
        const key = `${day}-${time}`;
        const baseCount = Math.floor(Math.random() * 3);
        const userOnPrem = STATE.employeeSchedule[key] === 'On-Prem' ? 1 : 0;
        return baseCount + userOnPrem;
    },

    /**
     * Update capacity indicator display
     */
    updateCapacityDisplay: () => {
        document.querySelectorAll('.capacity-indicator').forEach(el => {
            const day = el.dataset.day;
            const time = el.dataset.time;
            const count = UTILITIES.getOnPremCount(day, time);
            const total = DATA.onPremCapacity.total;
            el.textContent = `${count}/${total}`;
            el.classList.remove('capacity-ok', 'capacity-full');
            el.classList.add(count >= total ? 'capacity-full' : 'capacity-ok');
        });
    },

    /**
     * Save schedule (mock implementation)
     */
    saveSchedule: () => {
        alert('Schedule saved successfully!');
    },

    /**
     * Copy current schedule to clipboard state
     */
    copyHours: () => {
        STATE.copiedSchedule = { ...STATE.employeeSchedule };
        alert('Hours copied!');
    },

    /**
     * Paste copied schedule
     */
    pasteHours: () => {
        if (STATE.copiedSchedule) {
            STATE.employeeSchedule = { ...STATE.copiedSchedule };
            ROUTER.render('portal');
            alert('Hours pasted!');
        } else {
            alert('No hours copied yet.');
        }
    },

    /**
     * Show portal cards view
     */
    showPortalCards: () => {
        STATE.portalView = 'cards';
        ROUTER.render('portal');
    },

    /**
     * Show scheduling view
     */
    showScheduling: () => {
        STATE.portalView = 'scheduling';
        ROUTER.render('portal');
    }
};
