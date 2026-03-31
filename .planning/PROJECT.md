# ThinkBubble Landing Page

## What This Is

A single-page application website for ThinkBubble, a parent R&D company for multiple AI startups. The site serves as a professional SaaS landing page that conveys ethical, secure, empowering, and forward-looking AI while showcasing the company's portfolio and vision.

## Core Value

Visitors immediately understand ThinkBubble builds human-centric AI infrastructure that empowers creators and small businesses — and can explore the companies built on that foundation.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with video background, logo, tagline "Beyond Infinity", and CTA buttons
- [ ] "Our Purpose" section explaining ThinkBubble as AI infrastructure provider
- [ ] "How We Build" section with 4 principle cards (Context, Infrastructure, Iteration, Users)
- [ ] "What We're Building" section with product cards (Aiparel, KloeBot, OzoneLayer)
- [ ] Dynamic counters showing "3 Companies Built" and "More Upcoming"
- [ ] "Our Companies" section with dynamically rendered company cards
- [ ] Employee Portal mockup with login form and realistic weekly schedule dashboard
- [ ] Contact section with form (Name, Email, Company, Inquiry) and simulated submission
- [ ] Footer with company info, social links (LinkedIn, GitHub), copyright
- [ ] Smooth SPA navigation via vanilla JS (no page reloads)
- [ ] Responsive design for mobile and desktop
- [ ] Color palette derived from hero video (Pearlescent Tech theme)
- [ ] All content dynamically generated via JavaScript
- [ ] Code comments for maintainability

### Out of Scope

- Backend integration — employee portal is mockup only
- Real authentication — login is simulated
- Database — all data is hardcoded in JS
- Frameworks (React, Angular, Vue) — vanilla JS only
- Multiple HTML files — single index.html constraint
- Real form submission — contact form simulates success

## Context

**Brand Identity:**
ThinkBubble positions itself as infrastructure for ethical, accessible AI. The messaging emphasizes:
- Democratizing AI for creators, individuals, small businesses
- Human-focused innovation (technology serves people, not replaces them)
- Reusable, scalable systems over hype
- Forward-looking but grounded approach

**Visual Direction — "Pearlescent Tech":**
Light, airy aesthetic (not dark mode cyber). Inspired by hero video featuring:
- Neural network "bubbles" with pulsing nodes
- Organic data pathways (fiber optic meets vine)
- Clean white platforms and walkways
- Human silhouettes walking paths (crucial — tech serves humans)

**Color Palette (from video):**
| Element | Description | Hex |
|---------|-------------|-----|
| Primary Base | Soft Sky/Lavender | #E6E6FA, #D1D9FF |
| Glow/Energy | Electric Cyan/Teal | #00F2FF, #70FFE9 |
| Accents | Warm Gold/Champagne | #FFD700, #FFF4BC |
| Depth/Text | Deep Indigo | #1A1B4B, #2E3192 |
| Logo Blue | ThinkBubble brand | ~#4A90D9 |

**Typography Direction:**
- Deep Indigo or Dark Teal for primary text (high readability on light backgrounds)
- Electric Cyan for CTA buttons (pop against soft hero)

**Assets Available:**
- Logo: ThinkbubbleLogo.png (brain-cloud fusion in blue)
- Hero video: hero section video background.mp4

**Companies to Feature:**
1. **Aiparel** — AI-powered merchandise platform
2. **KloeBot** — Multilingual chatbot for SMEs
3. **OzoneLayer** — Infrastructure stack (OxiFrame, Omnexus, Orbnet)

**Employee Portal Mockup:**
- Realistic style with named employees
- Project-specific entries (Aiparel standup, KloeBot sprint review, etc.)
- Week-by-week schedule navigation
- No actual authentication

## Constraints

- **Single File**: Entire site in one index.html — HTML, CSS, and JS combined
- **Vanilla JS Only**: No frameworks, libraries, or build tools
- **No Backend**: All interactions are client-side simulations
- **Assets**: Logo and video provided; other images can be placeholders
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single index.html | User requirement for simplicity and portability | — Pending |
| Vanilla JS over frameworks | User requirement; keeps it dependency-free | — Pending |
| Pearlescent Tech palette | Derived from hero video; distinctive vs typical dark SaaS | — Pending |
| Light theme (not dark mode) | Matches video aesthetic; feels "welcoming" per user | — Pending |
| Realistic portal mockup | User preference over minimal placeholder | — Pending |

---
*Last updated: 2026-03-30 after initialization*
