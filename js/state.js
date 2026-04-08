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
    copiedSchedule: null,
    _vT: [],
    _vK: [66, 117, 105, 108, 116, 32, 98, 121, 32, 83, 116, 101, 118, 101, 110, 32, 108, 97, 103, 97, 100, 97, 112, 97, 116, 105, 32, 8212, 32, 50, 48, 50, 54]
};
