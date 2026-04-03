/* ============================================
   DATA - Immutable Application Data Store
============================================ */
const DATA = Object.freeze({
    products: [
        { name: 'Aiparel', desc: 'Merchandise creation tools, from concept to production.', init: 'A' },
        { name: 'KloeBot', desc: 'Conversational AI for multilingual markets.', init: 'K' },
        { name: 'OzoneLayer', desc: 'Shared compute, orchestration, and interfaces.', init: 'O' }
    ],
    projects: [
        {
            name: 'ThinkBubble',
            cat: 'Research',
            subtitle: 'The infrastructure behind everything we build',
            desc: 'ThinkBubble is the underlying engine powering our ecosystem of intelligent products. It provides the architecture, systems, and deployment frameworks required to run modern AI at scale — from Retrieval-Augmented Generation (RAG) pipelines to high-performance data processing environments.<br><br>Built for reliability and flexibility, ThinkBubble handles the technical heavy lifting so innovation can move faster.',
            init: 'TB',
            url: 'https://www.thinkbubble.io/',
            logo: 'company_logos/thinkbubblelogo.svg'
        },
        {
            name: 'Aiparel',
            cat: 'Consumer',
            subtitle: 'Create. Customize. Launch. Sell — globally with AI',
            desc: 'Aiparel is an AI-powered platform that transforms ideas into sellable products in minutes. Generate original designs with AI, apply them to merchandise instantly, and launch to a worldwide audience through integrated fulfillment and payments across 200+ countries.<br><br>No inventory. No complexity. Just creation at scale.',
            init: 'A',
            url: 'https://www.aiparel.io/',
            logo: 'company_logos/aiparellogo.svg'
        },
        {
            name: 'KloeAI',
            cat: 'Enterprise',
            subtitle: 'Enterprise-level conversational AI — made accessible',
            desc: 'KloeAI helps businesses deploy intelligent, multilingual customer support without technical overhead. From answering questions to guiding customers through workflows, it brings powerful conversational automation to teams of any size.<br><br>Smart support shouldn\'t require a large engineering team — and with KloeAI, it doesn\'t.',
            init: 'K',
            url: 'https://kloe.bot/',
            logo: 'company_logos/kloebotlogo.svg'
        },
        {
            name: 'OzoneLayer',
            cat: 'Infrastructure',
            subtitle: 'Infrastructure designed for modern AI systems',
            desc: 'OzoneLayer is our O³ infrastructure stack built for performance, scalability, and control. It includes OxiFrame for rapid development, Omnexus for unified API orchestration, and Orbnet for secure self-hosted deployment and large-scale object storage.<br><br>Purpose-built for LLM applications, fast iteration cycles, and production-grade AI environments.',
            init: 'O',
            url: 'https://www.ozonelayer.io/',
            logo: 'company_logos/ozonelayerlogo.svg'
        }
    ],
    architecture: [
        { icon: '🧠', title: 'Context-Aware Systems', desc: 'We design AI that understands human context—cultural, linguistic, and situational—as a core capability, not a retrofit.', cat: 'Principle 1' },
        { icon: '🏗️', title: 'Shared Infrastructure', desc: 'Common problems deserve common solutions. Our internal systems become the foundation that each product builds upon.', cat: 'Principle 2' },
        { icon: '📈', title: 'Measured Deployment', desc: 'We ship incrementally, observe carefully, and refine continuously. Speed follows from understanding, not haste.', cat: 'Principle 3' },
        { icon: '🫂', title: 'Human Benefit', desc: 'Technology exists to serve people. Every decision we make begins and ends with this premise.', cat: 'Principle 4' }
    ],
    philosophy: [
        { icon: '🧑‍🤝‍🧑', title: 'Humanity First', desc: 'With the continual advancement of AI, we prioritize human rights, safety, and dignity ensuring that technology serves people.', cat: 'Philosophy 1' },
        { icon: '🤝', title: 'Unifying Systems', desc: 'Solid and Secure infrastructure that connects people creates a peaceful and just community for everyone.', cat: 'Philosophy 2' },
        { icon: '🗣️', title: 'Diversity of Thought', desc: 'Full transparency, as a cornerstone, creates a system that allows many voices from all walks of life to speak and grow ideas.', cat: 'Philosophy 3' },
        { icon: '🌱', title: 'Sustainability', desc: 'By using what we need, we remain committed to respecting the environment that sustains us while remaining efficient and innovative.', cat: 'Philosophy 4' }
    ],
    portalUsers: [
        { email: 'demo@thinkbubble.ai', pass: 'demo', name: 'Demo User', role: 'Engineer' }
    ],
    schedule: [
        { day: 'Mon', time: '9:00 AM', title: 'Sprint Planning', type: 'meeting' },
        { day: 'Tue', time: '10:00 AM', title: 'OzoneLayer Standup', type: 'standup' },
        { day: 'Wed', time: '2:00 PM', title: 'Architecture Review', type: 'review' }
    ],
    schedulingOptions: ['Off', 'Remote', 'On-Prem'],
    timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    onPremCapacity: { total: 3 }
});
