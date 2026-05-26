import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Signal.css';

gsap.registerPlugin(ScrollTrigger);

export default function Signal() {
    const sectionRef = useRef<HTMLElement>(null);
    const showcaseWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
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

            /* ── ACT TWO: SHOWCASE PINNED SCROLL (desktop only) ────────────── */
            ScrollTrigger.matchMedia({
                '(min-width: 768px)': () => {
                    const panels = gsap.utils.toArray('.showcase-panel') as HTMLElement[];

                    const pinTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.showcase-pin-wrap',
                            start: 'top top',
                            end: '+=600%',
                            pin: true,
                            scrub: 1,
                            onLeave: () => {
                                const grain = document.querySelector('.hero-section .grain');
                                if (grain) {
                                    gsap.fromTo(grain, { opacity: 0.12 }, { opacity: 0.045, duration: 0.4 });
                                }
                            },
                        },
                    });

                    panels.forEach((panel, i) => {
                        const title = panel.querySelector('.service-title-container');
                        const highlight = panel.querySelector('.service-title-highlight');
                        const subtitle = panel.querySelectorAll('.service-subtitle, .why-matters-block, .closing-statement, .case-studies-cta');

                        let yOffset = 60;
                        let xOffset = 0;
                        if (i === 1 || i === 3 || i === 5) {
                            yOffset = 80;
                            xOffset = i === 1 ? -20 : 20;
                        }

                        pinTl.set(panel, { opacity: 1 }, `panel${i}`)
                            .fromTo(title, { y: yOffset, x: xOffset, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, `panel${i}`)
                            .to(highlight, { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'none' }, `panel${i}+=0.2`);

                        if (subtitle.length) {
                            pinTl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, `panel${i}+=0.3`);
                        }

                        if (i !== panels.length - 1) {
                            pinTl.to([title, subtitle], { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' }, `panel${i}+=2.5`);
                            pinTl.set(panel, { opacity: 0 });
                        } else {
                            pinTl.to({}, { duration: 1 });
                        }
                    });
                },
                '(max-width: 767px)': () => {
                    gsap.set('.showcase-panel', { opacity: 1, position: 'relative', minHeight: 'auto' });
                    gsap.utils.toArray('.showcase-panel').forEach((panel) => {
                        gsap.from(panel as Element, {
                            opacity: 0,
                            y: 24,
                            scrollTrigger: {
                                trigger: panel as Element,
                                start: 'top 90%',
                                toggleActions: 'play none none reverse',
                            },
                        });
                    });
                },
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
        <section className="signal-section" ref={sectionRef} id="signal" aria-label="AI automation services">
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
  <h2 className="service-title">AI Automation Systems</h2>
  <h2 className="service-title-highlight" aria-hidden="true">AI Automation Systems</h2>
                        </div>
                        <div className="service-subtitle">End-to-end workflows that operate without you.</div>
                    </div>

                    {/* PANEL 2 */}
                    <div className="showcase-panel showcase-panel-2">
                        <div className="service-title-container">
                            <h2 className="service-title">AI Voice &amp; Calling Agents</h2>
                            <h2 className="service-title-highlight" aria-hidden="true">AI Voice &amp; Calling Agents</h2>
                        </div>
                        <div className="service-subtitle">Every call answered. Every lead qualified. Always.</div>
                    </div>

                    {/* PANEL 3 */}
                    <div className="showcase-panel showcase-panel-3">
                        <div className="service-title-container">
                            <h2 className="service-title">Conversational AI</h2>
                            <h2 className="service-title-highlight" aria-hidden="true">Conversational AI</h2>
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
                            <h2 className="service-title">Sales &amp; Marketing Automation</h2>
                            <h2 className="service-title-highlight" aria-hidden="true">Sales &amp; Marketing Automation</h2>
                        </div>
                        <div className="service-subtitle">From cold outreach to closed deal. Automated.</div>
                    </div>

                    {/* PANEL 5 */}
                    <div className="showcase-panel showcase-panel-5">
                        <div className="service-title-container">
                            <h2 className="service-title">SaaS &amp; App Development</h2>
                            <h2 className="service-title-highlight" aria-hidden="true">SaaS &amp; App Development</h2>
                        </div>
                        <div className="service-subtitle">Products that ship. Platforms that scale.</div>
                    </div>

                    {/* PANEL 6 */}
                    <div className="showcase-panel showcase-panel-6">
                        <div className="service-title-container">
                            <h2 className="service-title">Custom LLM Infrastructure</h2>
                            <h2 className="service-title-highlight" aria-hidden="true">Custom LLM Infrastructure</h2>
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
