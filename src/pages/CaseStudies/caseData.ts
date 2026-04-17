export interface CaseStudyData {
    index: string;
    industry: string;
    headline: string;
    problem: string;
    built: Array<{ name: string; desc: string }>;
    quote?: string;
    verdict?: string;
    author?: string;
    stats: Array<{ num: string; text: string }>;
    timeline: string;
    image: string;
}

export const caseStudies: CaseStudyData[] = [
    {
        index: "CASE 01",
        industry: "Restaurant",
        headline: "Restaurant",
        problem: "Friday evenings. 12 calls in. 8 unanswered. Eight tables gone to competitors — permanently. Multiplied across 52 Fridays. The owner didn't even know it was happening.",
        built: [
            { name: "AI Voice Agent", desc: "24/7 reservations" },
            { name: "Multi-Channel Messaging System", desc: "Unified inbox" },
            { name: "High-Value Booking Pipeline", desc: "VIP routing" },
            { name: "Customer Retention Engine", desc: "Automated follow-ups" },
            { name: "Live Operations Dashboard", desc: "Real-time metrics" }
        ],
        quote: "The system paid for itself in the first month. By month three, we were up 30%. I haven't missed a single call since the day we went live. I wish I'd done this two years ago.",
        author: "Owner, Identity withheld by mutual agreement.",
        stats: [
            { num: "30%", text: "revenue increase" },
            { num: "0", text: "missed calls" },
            { num: "97%", text: "faster response" },
            { num: "18", text: "hrs reclaimed per week" },
            { num: "2×", text: "high-value booking conversion" }
        ],
        timeline: "90 Days",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1185&fit=crop&q=80"
        // Elegant fine-dining table setting with warm lighting — premium restaurant feel
    },
    {
        index: "CASE 02",
        industry: "Franchise",
        headline: "Franchise",
        problem: "Four locations. Same brand. Completely different customer experiences. Some thriving. Others bleeding. No central visibility. Growth was creating chaos — not scale.",
        built: [
            { name: "Central AI Response System", desc: "Unified communications" },
            { name: "Outlet-Level Automation", desc: "Local routing" },
            { name: "High-Value Request Prioritisation", desc: "Smart filtering" },
            { name: "Central Dashboard", desc: "Global oversight" }
        ],
        verdict: "Scaling without systems is not growth. It is controlled chaos. And sooner or later, it breaks.",
        stats: [
            { num: "4", text: "outlets standardised" },
            { num: "0", text: "new hires needed" },
            { num: "100%", text: "consistent experience across all locations" },
            { num: "1", text: "dashboard for full owner visibility" }
        ],
        timeline: "60–90 Days",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1185&fit=crop&q=80"
        // Modern open-plan office with multiple workstations — multi-location operations feel
    },
    {
        index: "CASE 03",
        industry: "Government",
        headline: "Government",
        problem: "Morning surges. Afternoon overwhelm. Evening backlogs. Hundreds of citizen queries missed daily — with no way to even see what was being dropped.",
        built: [
            { name: "AI Voice Response System", desc: "First-line defense" },
            { name: "Multi-Channel AI Layer", desc: "Omni-channel routing" },
            { name: "Intelligent Query Prioritisation", desc: "Urgency tagging" },
            { name: "Central Command Dashboard", desc: "Department analytics" }
        ],
        stats: [
            { num: "1000s", text: "of queries handled daily" },
            { num: "0", text: "missed interactions" },
            { num: "Instant", text: "response across all channels" },
            { num: "100%", text: "staff freed for complex cases only" }
        ],
        timeline: "90 Days",
        image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=1185&fit=crop&q=80"
        // Formal government building corridor with pillars — institutional authority
    },
    {
        index: "CASE 04",
        industry: "Real Estate",
        headline: "Real Estate",
        problem: "Average response time: 2–6 hours. In real estate, that is a death sentence. Hot leads going cold. Buyers calling the next agent. A high-intent buyer gone in 3 hours because no one responded.",
        built: [
            { name: "Instant AI Lead Response System", desc: "Zero-wait replies" },
            { name: "AI Follow-Up Engine", desc: "Automated nurturing" },
            { name: "Lead Qualification System", desc: "Intent scoring" },
            { name: "Central Lead Dashboard", desc: "Pipeline visibility" }
        ],
        quote: "We're not losing leads. We're losing speed.",
        author: "Principal Agent, Identity withheld by mutual agreement.",
        stats: [
            { num: "$10K+", text: "per month recovered" },
            { num: "3×", text: "faster lead response" },
            { num: "90%+", text: "lead follow-up rate" },
            { num: "High", text: "conversion from existing traffic" }
        ],
        timeline: "60–90 Days",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=1185&fit=crop&q=80"
        // Bright modern house exterior with clear sky — aspirational real estate
    },
    {
        index: "CASE 05",
        industry: "Coach",
        headline: "Coach",
        problem: "Leads filled the form. Interest was there. But follow-ups were forgotten. DMs went cold. The calendar stayed half empty despite good ads and a strong offer.",
        built: [
            { name: "Instant Lead Engagement System", desc: "Immediate contact" },
            { name: "AI Follow-Up Sequences", desc: "Multi-touch persistence" },
            { name: "Conversion-Focused Booking Flow", desc: "Frictionless scheduling" },
            { name: "Lead Tracking", desc: "Analytics" }
        ],
        stats: [
            { num: "2.5×", text: "booked calls" },
            { num: "Flat", text: "ad spend" },
            { num: "Instant", text: "engagement on every inquiry" },
            { num: "100%", text: "consistent daily calls in calendar" }
        ],
        timeline: "60 Days",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=1185&fit=crop&q=80"
        // Coach/mentor in a 1-on-1 session — confident, personal brand energy
    },
    {
        index: "CASE 06",
        industry: "HVAC",
        headline: "HVAC",
        problem: "Peak summer. AC units failing. Phones ringing nonstop. Every missed call was a job going to a competitor. A three-year loyal customer lost because of one unanswered ring.",
        built: [
            { name: "24/7 AI Voice Agent", desc: "Uninterrupted dispatch" },
            { name: "Smart Booking System", desc: "Calendar integration" },
            { name: "Urgency Detection & Prioritisation", desc: "Emergency routing" },
            { name: "Missed Call Recovery", desc: "Text-back automation" }
        ],
        stats: [
            { num: "+40%", text: "monthly bookings" },
            { num: "0", text: "missed calls" },
            { num: "Instant", text: "emergency job flagging" },
            { num: "100%", text: "after-hours fully covered" }
        ],
        timeline: "90 Days",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=1185&fit=crop&q=80"
        // Technician working on HVAC/AC unit on rooftop — authentic field-service scene
    },
    {
        index: "CASE 07",
        industry: "E-commerce",
        headline: "E-commerce",
        problem: "Traffic was increasing. Revenue wasn't. Customers reaching checkout, adding to cart, then vanishing. No notification. No follow-up. No second chance. Revenue walking out the door silently every single day.",
        built: [
            { name: "AI Abandoned Cart Recovery", desc: "Dynamic SMS" },
            { name: "Multi-Channel Follow-Up Engine", desc: "Email + WhatsApp" },
            { name: "Personalised Engagement System", desc: "Behavioral triggers" },
            { name: "Retention & Re-Engagement Engine", desc: "LTV maximization" }
        ],
        stats: [
            { num: "25%", text: "abandoned customers recovered" },
            { num: "Up", text: "revenue without more ad spend" },
            { num: "24/7", text: "automated recovery running" }
        ],
        timeline: "60–90 Days",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1185&fit=crop&q=80"
        // Person at laptop with credit card — online checkout/shopping moment
    }
];