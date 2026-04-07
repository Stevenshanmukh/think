/* ============================================
   STATE - Application State Management
============================================ */
const STATE = {
    user: null,
    route: '',
    scrollObservers: [],
    rafId: null,
    scrollHandler: null,
    // Portal scheduling state
    portalView: 'cards', // 'cards' | 'scheduling'
    currentWeekStart: null, // Will be initialized to current week
    employeeSchedule: {}, // { 'Monday-10:00 AM': 'Off', ... }
    copiedSchedule: null // For copy/paste functionality
};
