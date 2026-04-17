export interface IndustryData {
    name: string;
    problem: string;
    solution: string;
    results: string[];
    image: string;
}

export const industryData: IndustryData[] = [
    {
        name: "Real Estate",
        problem: "Most leads go cold before you can call back.",
        solution: "Voice + WhatsApp agent replies instantly, 24x7, in regional language.",
        results: [
            "+210% qualified leads",
            "-50% missed calls",
            "3x more site visits"
        ],
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=1185&fit=crop&q=80"
        // Bright modern house exterior with clear sky — strong real estate visual
    },
    {
        name: "Healthcare",
        problem: "Patients call after hours and book elsewhere.",
        solution: "AI handles appointment booking, reminders, and basic queries 24/7.",
        results: [
            "+85% appointment bookings",
            "-60% no-shows",
            "100% after-hours coverage"
        ],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=1185&fit=crop&q=80"
        // Doctor in white coat with stethoscope — clean, professional healthcare
    },
    {
        name: "EdTech / Coaching",
        problem: "Students inquire but don't show up for demos.",
        solution: "Instant follow-up with course details and demo scheduling in their language.",
        results: [
            "+70% demo signups",
            "+45% course enrollments",
            "24/7 student support"
        ],
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1185&fit=crop&q=80"
        // Students collaborating at a laptop — energetic EdTech feel
    },
    {
        name: "D2C Brands",
        problem: "WhatsApp queries pile up, customers wait hours for responses.",
        solution: "AI handles order tracking, product queries, and support in multiple languages.",
        results: [
            "-90% response time",
            "+150% customer satisfaction",
            "80% queries automated"
        ],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1185&fit=crop&q=80"
        // Person shopping online with card — perfect D2C e-commerce imagery
    },
    {
        name: "Local Services",
        problem: "Customers call when you're busy with clients.",
        solution: "AI books appointments, sends reminders, and handles rescheduling.",
        results: [
            "+120% bookings",
            "-40% cancellations",
            "100% availability"
        ],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=1185&fit=crop&q=80"
        // Professional handshake/service interaction — local business feel
    },
    {
        name: "Logistics / Delivery",
        problem: "Customers constantly call asking \"Where's my order?\".",
        solution: "Automated delivery updates via WhatsApp and voice calls.",
        results: [
            "-70% support calls",
            "+95% delivery satisfaction",
            "Real-time tracking"
        ],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=1185&fit=crop&q=80"
        // Delivery worker scanning packages in warehouse — authentic logistics
    },
    {
        name: "Financial Services",
        problem: "Loan and insurance leads need immediate attention.",
        solution: "AI qualifies leads, collects documents, and schedules meetings.",
        results: [
            "+180% lead qualification",
            "+65% conversion rate",
            "24/7 lead capture"
        ],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=1185&fit=crop&q=80"
        // Financial analyst with charts/graphs — sharp fintech visual
    }
];