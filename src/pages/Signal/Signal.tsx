import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Signal.css';

gsap.registerPlugin(ScrollTrigger);

export default function Signal() {
    const sectionRef = useRef<HTMLElement>(null);
    const showcaseWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            /* ── CLOUD DESCENT TRANSITION (Moves UP and OUT) ───────────────── */
            const cloudContainer = document.querySelector('.hero-section .container');
            if (cloudContainer) {
                gsap.set(cloudContainer, { transition: 'none' });

                gsap.to(cloudContainer, {
                    y: -560,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'top 20%',
                        scrub: 1
                    }
                });
            }

            /* ── PIXEL FIELD BACKGROUND PARALLAX (Moves DOWN) ──────────────── */
            const backgroundElements = [
                document.querySelector('.hero-section .stars-canvas'),
                document.querySelector('.hero-section .grain'),
                document.querySelector('.hero-section .scanlines')
            ].filter(Boolean);

            if (backgroundElements.length > 0) {
                gsap.to(backgroundElements, {
                    y: 120,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 1
                    }
                });
            }

            /* ── SCAN LINE SWEEP ENTRY ─────────────────────────────────────── */
            // Sweeps from top to bottom once the cloud fully breaks
            gsap.to('.signal-scan-line', {
                y: window.innerHeight,
                opacity: 0.3,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 20%', // Right as clouds exit
                    end: 'top -20%',
                    scrub: false, // It happens once in 600ms, not scrubbed
                    toggleActions: 'play none none none',
                    onEnter: () => {
                        gsap.fromTo('.signal-scan-line',
                            { opacity: 0.3, y: -10 },
                            { opacity: 0, y: window.innerHeight, duration: 0.6, ease: 'power2.out' }
                        );
                    }
                }
            });

            // Reveal Index Label
            gsap.to('.signal-index', {
                opacity: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 40%',
                    toggleActions: 'play none none none'
                }
            });

            /* ── ACT ONE: WHO WE ARE ───────────────────────────────────────── */
            // Context Label
            const tlContext = gsap.timeline({
                scrollTrigger: {
                    trigger: '.who-we-are-label',
                    start: 'top 85%',
                    end: '+=100',
                    scrub: 1.2
                }
            });
            tlContext.to('.who-we-are-label', { opacity: 1, duration: 0.1 })
                .to('.wwa-line', { scaleX: 1, duration: 0.9, ease: 'power2.out' }, 0);

            // Word-by-Word Scrub
            const words = gsap.utils.toArray('.statement-word');
            gsap.to(words, {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.identity-statement',
                    start: 'top 85%',
                    end: 'bottom 40%',
                    scrub: 1,
                    onUpdate: (self) => {
                        // Flash effect trigger at the end of scrub roughly
                        if (self.progress > 0.95 && !self.direction) {
                            // forward flash
                        }
                    },
                    onLeave: () => {
                        // Fire flash cell
                        gsap.fromTo('.pixel-flash',
                            { opacity: 1 },
                            { opacity: 0, duration: 0.3, ease: 'power4.out' }
                        );
                    }
                }
            });

            // Punch Line Fade
            gsap.to('.punch-line', {
                opacity: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.punch-line-container',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Divider Dots
            gsap.to('.divider-dot', {
                opacity: 1,
                stagger: 0.06,
                scrollTrigger: {
                    trigger: '.divider-dots',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            /* ── ACT TWO: SHOWCASE PINNED SCROLL ───────────────────────────── */
            const panels = gsap.utils.toArray('.showcase-panel') as HTMLElement[];

            // We pin the wrapper for 600% viewport height
            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.showcase-pin-wrap',
                    start: 'top top',
                    end: '+=600%', // 6 panels
                    pin: true,
                    scrub: 1,
                    onLeave: () => {
                        // Exit pulse on background pixel grid natively
                        const grain = document.querySelector('.hero-section .grain');
                        if (grain) {
                            gsap.fromTo(grain,
                                { opacity: 0.12 },
                                { opacity: 0.045, duration: 0.4 }
                            );
                        }
                    }
                }
            });

            // Build the sequence through the panels
            panels.forEach((panel, i) => {
                const title = panel.querySelector('.service-title-container');
                const highlight = panel.querySelector('.service-title-highlight');
                const subtitle = panel.querySelectorAll('.service-subtitle, .why-matters-block, .closing-statement, .case-studies-cta');

                // Determine entry directions
                let yOffset = 60;
                let xOffset = 0;

                if (i === 1 || i === 3 || i === 5) {
                    yOffset = 80;
                    xOffset = i === 1 ? -20 : 20; // right/left slight offset
                }

                // Add this panel's sequence to the pin timeline
                // ENTRANCE
                pinTl.set(panel, { opacity: 1 }, `panel${i}`)
                    .fromTo(title, { y: yOffset, x: xOffset, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, `panel${i}`)

                // Highlight scanner mask over the text
                pinTl.to(highlight, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'none' }, `panel${i}+=0.2`);

                // Subtitles lag
                if (subtitle.length) {
                    pinTl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, `panel${i}+=0.3`);
                }

                // EXIT (Hold for a bit, then fade out, except for the last panel which stays)
                if (i !== panels.length - 1) {
                    pinTl.to([title, subtitle], { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' }, `panel${i}+=2.5`);
                    pinTl.set(panel, { opacity: 0 }); // hide container
                } else {
                    // Last panel just holds space at the end
                    pinTl.to({}, { duration: 1 });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper to format words for scrub
    const scrubWord = (word: string, index: number) => (
        <React.Fragment key={index}>
            <div className={`statement-word ${word === 'systems' || word === 'problem.' ? 'systems-problem' : ''}`}>
                {word}
                {word === 'problem.' && <div className="pixel-flash" />}
            </div>
        </React.Fragment>
    );

    return (
        <section className="signal-section" ref={sectionRef}>
            <div className="signal-scan-line" />

            {/* Dotted Vertical Thread across entire component */}
            <div className="left-dotted-thread">
                {Array.from({ length: Math.floor(600) }).map((_, i) => (
                    <div key={i} className="left-thread-dot" />
                ))}
            </div>

            {/* Top Index */}
            <div className="signal-index">
                <div className="signal-index-text">002</div>
                <div className="signal-index-line" />
            </div>

            {/* ── ACT ONE ──────────────────────────────────────── */}
            <div className="act-one">
                <div className="who-we-are-label">
                    <div className="wwa-line" />
                    <div className="wwa-text">WHO WE ARE</div>
                    <div className="wwa-line" />
                </div>

                <div className="identity-statement">
                    <div className="statement-line">
                        {"Most businesses don't have a technology problem.".split(' ').map(scrubWord)}
                    </div>
                    <div className="statement-line">
                        {"They have a systems problem.".split(' ').map(scrubWord)}
                    </div>
                    <div className="statement-line">
                        {"We build the infrastructure that closes the gap.".split(' ').map(scrubWord)}
                    </div>
                </div>

                <div className="punch-line-container">
                    <div className="punch-line">Every day.</div>
                    <div className="punch-line">Without fail.</div>
                    <div className="punch-line">At scale.</div>
                </div>

                <div className="divider-dots">
                    {[1, 2, 3, 4, 5].map(dot => (
                        <div key={dot} className="divider-dot" />
                    ))}
                </div>
            </div>

            {/* ── ACT TWO ──────────────────────────────────────── */}
            <div className="act-two">
                <div className="showcase-pin-wrap" ref={showcaseWrapRef}>

                    {/* PANEL 1 */}
                    <div className="showcase-panel showcase-panel-1">
<div className="service-title-container">
  <h2 className="service-title" data-seo-keywords="AI automation systems, autonomous workflows, business automation">AI Automation Systems</h2>
  <h2 className="service-title-highlight">AI Automation Systems</h2>
  <div style={{display: 'none'}}>Keywords: AI automation systems, end-to-end AI workflows, autonomous business operations</div>
                        </div>
                        <div className="service-subtitle">End-to-end workflows that operate without you.</div>
                    </div>

                    {/* PANEL 2 */}
                    <div className="showcase-panel showcase-panel-2">
                        <div className="service-title-container">
                            <h2 className="service-title" data-seo-keywords="AI voice agents, calling agents, voice AI, lead qualification, phone automation">AI Voice &<br />Calling Agents</h2>
  <div style={{display:'none'}}>AI voice calling agents, automated phone systems, lead qualification AI, 24/7 call answering</div>
                            <h2 className="service-title-highlight">AI Voice &<br />Calling Agents</h2>
                        </div>
                        <div className="service-subtitle">Every call answered. Every lead qualified. Always.</div>
                    </div>

                    {/* PANEL 3 */}
                    <div className="showcase-panel showcase-panel-3">
                        <div className="service-title-container">
                            <h2 className="service-title" data-seo-keywords="conversational AI, chatbots, intelligent conversations, AI chat">Conversational AI</h2>
  <div style={{display:'none'}}>Conversational AI systems, natural language processing, intelligent chat agents</div>
                            <h2 className="service-title-highlight">Conversational AI</h2>
                        </div>
                        <div className="why-matters-block">
                            <p>DareX AI was built for one reason. Most businesses don't have a technology problem. They have a systems problem.</p>
                            <div className="stacked-lines">
                                Every day.<br />
                                Without fail.<br />
                                At scale.
                            </div>
                        </div>
                    </div>

                    {/* PANEL 4 */}
                    <div className="showcase-panel showcase-panel-4">
                        <div className="service-title-container">
                            <h2 className="service-title" data-seo-keywords="sales automation, marketing automation, cold outreach, lead generation AI">Sales & Marketing<br />Automation</h2>
  <div style={{display:'none'}}>Sales marketing automation, cold email outreach, automated lead nurturing</div>
                            <h2 className="service-title-highlight">Sales & Marketing<br />Automation</h2>
                        </div>
                        <div className="service-subtitle">From cold outreach to closed deal. Automated.</div>
                    </div>

                    {/* PANEL 5 */}
                    <div className="showcase-panel showcase-panel-5">
                        <div className="service-title-container">
                            <h2 className="service-title" data-seo-keywords="SaaS development, app development, scalable platforms, AI apps">SaaS & App Development</h2>
  <div style={{display:'none'}}>SaaS application development, custom software, scalable AI platforms</div>
                            <h2 className="service-title-highlight">SaaS & App Development</h2>
                        </div>
                        <div className="service-subtitle">Products that ship. Platforms that scale.</div>
                    </div>

                    {/* PANEL 6 */}
                    <div className="showcase-panel showcase-panel-6">
                        <div className="service-title-container">
                            <h2 className="service-title" data-seo-keywords="custom LLM, LLM infrastructure, large language models, AI models">Custom LLM<br />Infrastructure</h2>
  <div style={{display:'none'}}>Custom large language model infrastructure, fine-tuned LLMs, enterprise AI models</div>
                            <h2 className="service-title-highlight">Custom LLM<br />Infrastructure</h2>
                        </div>
                        <div className="closing-statement">
                            Every system above has been deployed for real businesses. Yours could be next.
                        </div>
                        <a href="#case-studies" className="case-studies-cta">
                            <span className="cta-line" />
                            <span className="cta-text">CASE STUDIES &darr;</span>
                            <span className="cta-line" />
                        </a>
                    </div>

                </div>
            </div>

        </section>
    );
}
