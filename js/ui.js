/* ============================================
   UI - Template Components

   Uses a DRY approach for glossy card layers.
   The GlossyCardLayers() function generates the 7
   decorative layers used by all card variants.
============================================ */

/**
 * Generates the 7 decorative layer divs for glossy cards.
 * This DRY approach eliminates the duplicate markup that
 * was previously repeated in 3 different template functions.
 */
function GlossyCardLayers() {
    return `
        <div class="glossy-layer glossy-glass"></div>
        <div class="glossy-layer glossy-bg"></div>
        <div class="glossy-layer glossy-noise"></div>
        <div class="glossy-layer glossy-smudge"></div>
        <div class="glossy-layer glossy-glow-1"></div>
        <div class="glossy-layer glossy-glow-2"></div>
        <div class="glossy-layer glossy-border"></div>
    `;
}

/**
 * Generates the content portion of a glossy card
 */
function GlossyCardContent(item) {
    return `
        <div class="glossy-content">
            <div class="glossy-icon-wrap">${item.icon || item.init}</div>
            <div class="glossy-text-wrap">
                <div class="glossy-cat">${item.cat}</div>
                <h3 class="glossy-title">${item.title || item.name}</h3>
                <p class="glossy-desc">${item.desc}</p>
            </div>
        </div>
    `;
}

const UI = {
    /**
     * Standard glossy card (used in How We Build section)
     */
    GlossyCard: (item, index) => `
        <div class="glossy-wrap reveal reveal-delay-${index % 3 + 1}">
            <div class="glossy-card">
                ${GlossyCardLayers()}
                ${GlossyCardContent(item)}
            </div>
        </div>
    `,

    /**
     * Project showcase card
     */
    ProjectShowcase: (item, index) => `
        <div class="company-showcase reveal reveal-delay-${index % 3 + 1}">
            <div class="showcase-content">
                <div class="showcase-cat">${item.cat}</div>
                <div class="showcase-header ${item.subtitle ? '' : 'showcase-header-no-subtitle'}">
                    <h3 class="showcase-title showcase-title-inline">${item.name}</h3>
                    ${item.url ? `
                        <a href="${item.url}" target="_blank" class="showcase-btn showcase-btn-compact">
                            Visit Website <span class="showcase-btn-arrow">&#x2197;</span>
                        </a>
                    ` : ''}
                </div>
                ${item.subtitle ? `<h4 class="showcase-subtitle">${item.subtitle}</h4>` : ''}
                <p class="showcase-desc showcase-desc-inline">${item.desc}</p>
            </div>
            <div class="showcase-visual">
                ${item.logo
                    ? `<img src="${item.logo}" alt="${item.name} Logo" class="showcase-logo" loading="lazy">`
                    : `<div class="showcase-icon">${item.icon || item.init}</div>`
                }
            </div>
        </div>
    `,

    /**
     * Scheduling grid for employee portal
     */
    SchedulingGrid: (userName) => {
        UTILITIES.initWeekStart();
        const weekRange = UTILITIES.getWeekRange();

        const getStatusClass = (value) => {
            if (value === 'Remote') return 'status-remote';
            if (value === 'On-Prem') return 'status-onprem';
            return 'status-off';
        };

        return `
            <div class="scheduling-container">
                <div class="scheduling-header">
                    <div class="scheduling-title">
                        <h2>Employee Scheduling</h2>
                        <p>Set your weekly hours, ${userName}</p>
                    </div>
                    <div class="week-navigation">
                        <button class="week-nav-btn" onclick="UTILITIES.navigateWeek('prev')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="week-range">${weekRange}</span>
                        <button class="week-nav-btn" onclick="UTILITIES.navigateWeek('next')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                </div>

                <div class="scheduling-table-wrap">
                    <table class="scheduling-grid">
                        <thead>
                            <tr>
                                <th>Time</th>
                                ${DATA.weekdays.map(day => `<th>${day}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${DATA.timeSlots.map(time => `
                                <tr>
                                    <td class="time-cell">${time}</td>
                                    ${DATA.weekdays.map(day => {
                                        const value = UTILITIES.getScheduleValue(day, time);
                                        const count = Math.floor(Math.random() * 3);
                                        const total = DATA.onPremCapacity.total;
                                        const capacityClass = count >= total ? 'capacity-full' : 'capacity-ok';
                                        return `
                                            <td>
                                                <div class="schedule-cell">
                                                    <select
                                                        class="schedule-select ${getStatusClass(value)}"
                                                        onchange="UTILITIES.updateScheduleCell('${day}', '${time}', this.value); this.className = 'schedule-select ' + (this.value === 'Remote' ? 'status-remote' : this.value === 'On-Prem' ? 'status-onprem' : 'status-off');"
                                                    >
                                                        ${DATA.schedulingOptions.map(opt => `
                                                            <option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>
                                                        `).join('')}
                                                    </select>
                                                    <span class="capacity-indicator ${capacityClass}" data-day="${day}" data-time="${time}">${count}/${total}</span>
                                                </div>
                                            </td>
                                        `;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="scheduling-actions">
                    <button class="btn-save" onclick="UTILITIES.saveSchedule()">Save My Schedule</button>
                    <button class="btn-copy" onclick="UTILITIES.copyHours()">Copy Hours</button>
                    <button class="btn-paste" onclick="UTILITIES.pasteHours()">Paste Hours</button>
                </div>
            </div>
        `;
    },

    /**
     * Hero CTA button
     */
    HeroCTA: (text, href) => `
        <a href="${href}" class="hero-cta" data-link>
            <span>${text}</span>
            <span class="cta-arrow">&rarr;</span>
        </a>
    `
};
