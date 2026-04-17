/* ============================================
   DATA - Immutable Application Data Store
============================================ */
const DATA = Object.freeze({
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
            desc: 'By giving you a powerful AI platform, Aiparel transforms your ideas into tangible products that you can sell. Generate original designs and view others from a worldwide audience, while applying your own to merchandise effortlessly and launching them in over 200 countries with integrated fullfillment and payments. The ability to bring your ideas to life and grow has never been easier.',
            init: 'A',
            url: 'https://www.aiparel.io/',
            logo: 'company_logos/aiparellogo.svg'
        },
        {
            name: 'KloeAI',
            cat: 'Enterprise',
            subtitle: 'Enterprise-level conversational AI — made accessible',
            desc: 'As the culmination of all of our core values, KloeAI holds the purpose of providing Artificial intelligence tools to a wide variety of people. Whether you are a business who needs to increase workflow efficiency or an individual who wants to bring your own dreams and thoughts to life, KloeAI provides all the support you need to make your thoughts a reality.',
            init: 'K',
            url: 'https://kloe.bot/',
            logo: 'company_logos/kloebotlogo.svg'
        },
        {
            name: 'OzoneLayer',
            cat: 'Infrastructure',
            subtitle: 'Infrastructure designed for modern AI systems',
            desc: 'The OzoneLayer is our protective infrastructure stack built with the idea of scaling horizontally. It remains committed to serving you by allowing full personalized control and efficient performance for rapid development, unified API orchestration, secure deployment and object storage. The OzoneLayer is about personal privacy, and protects your data from threats in a unsecure world.',
            init: 'O',
            url: 'https://www.ozonelayer.io/',
            logo: 'company_logos/ozonelayerlogo.svg'
        }
    ],
    architecture: [
        { icon: '🫂', title: 'Human Benefit', desc: 'Technology exists to serve people. Every decision we make begins and ends with this premise.', cat: 'Principle 1' },
        { icon: '🏗️', title: 'Shared Infrastructure', desc: 'Common problems deserve common solutions. Our internal systems become the foundation that each product builds upon.', cat: 'Principle 2' },
        { icon: '🧠', title: 'Dynamic Intelligence', desc: 'We design AI that understands human context—cultural, linguistic, and situational—as a core capability, not a retrofit.', cat: 'Principle 3' },
        { icon: '📈', title: 'Systems Thinking', desc: 'We design with the whole problem in mind. We don\'t cut corners, because resources matter. Because the most efficient solution, is often the best solution (Not wasting time, energy, etc.)', cat: 'Principle 4' }
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
    schedulingOptions: ['Off', 'Remote', 'On-Prem'],
    timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    onPremCapacity: { total: 3 }
});
