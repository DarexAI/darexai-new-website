import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { caseStudies, type CaseStudyData } from './caseData';
import './CaseStudies.css';

const sampleImages = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", // CASE 01 — Restaurant: fine-dining warm table setting
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", // CASE 02 — Franchise: modern multi-desk open office
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80", // CASE 03 — Government: formal building with pillars
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", // CASE 04 — Real Estate: bright modern house exterior
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", // CASE 05 — Coach: 1-on-1 coaching session
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", // CASE 06 — HVAC: technician on rooftop with AC unit
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"  // CASE 07 — E-commerce: person at laptop with credit card
];

function generateSphereItems() {
    const items = [];
    let imgIdx = 0;
    // Follow the staggering provided in prompt: steps of 2
    for (let x = -37; x <= 35; x += 2) {
        // Alternating Y columns
        const ys = (Math.abs(x) % 4 === 1) ? [-4, -2, 0, 2, 4] : [-3, -1, 1, 3, 5];
        for (const y of ys) {
            items.push({
                x, y,
                src: sampleImages[imgIdx % sampleImages.length],
                caseIndex: imgIdx % caseStudies.length
            });
            imgIdx++;
        }
    }
    return items;
}

export default function CaseStudies() {
    const sphereRef = useRef<HTMLDivElement>(null);
    const [activeCase, setActiveCase] = useState<CaseStudyData | null>(null);

    const items = useMemo(() => generateSphereItems(), []);

    // Rotation state
    const rotRef = useRef({ x: 0, y: 0 });
    const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0 });

    useEffect(() => {
        const driftSpeed = 0.6;

        const updateTransform = () => {
            if (sphereRef.current) {
                sphereRef.current.style.setProperty('--sphere-rotation-y', `${rotRef.current.y}`);
                sphereRef.current.style.setProperty('--sphere-rotation-x', `${rotRef.current.x}`);
            }
        };

        const onTick = () => {
            if (!dragRef.current.isDragging && !activeCase) {
                rotRef.current.y -= driftSpeed * 0.1; // slow continuous drift
                updateTransform();
            }
        };

        gsap.ticker.add(onTick);
        return () => gsap.ticker.remove(onTick);
    }, [activeCase]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (activeCase) return;
        dragRef.current.isDragging = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.lastX = rotRef.current.x;
        dragRef.current.lastY = rotRef.current.y;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current.isDragging || activeCase) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;

        rotRef.current.y = dragRef.current.lastY + (dx * 0.15);
        rotRef.current.x = Math.max(-15, Math.min(15, dragRef.current.lastX - (dy * 0.15))); // clamp X tilt

        if (sphereRef.current) {
            sphereRef.current.style.setProperty('--sphere-rotation-y', `${rotRef.current.y}`);
            sphereRef.current.style.setProperty('--sphere-rotation-x', `${rotRef.current.x}`);
        }
    };

    const handlePointerUp = () => {
        dragRef.current.isDragging = false;
    };

    const openCard = (caseData: CaseStudyData) => {
        setActiveCase(caseData);
        // Stats count-up animation
        setTimeout(() => {
            const statNumbers = document.querySelectorAll('.ec-stat-num');
            statNumbers.forEach((el, index) => {
                const targetText = el.getAttribute('data-value') || '';
                const numMatch = targetText.match(/[\d.]+/);
                if (numMatch) {
                    const finalNum = parseFloat(numMatch[0]);
                    const prefix = targetText.substring(0, numMatch.index);
                    const suffix = targetText.substring(numMatch.index! + numMatch[0].length);

                    gsap.fromTo(el,
                        { innerHTML: `0` },
                        {
                            innerHTML: finalNum,
                            duration: 1.2,
                            delay: index * 0.15,
                            ease: 'power3.out',
                            snap: { innerHTML: 1 }, // standard integer snap, can adapt if needed
                            onUpdate: function () {
                                // Add back prefix/suffix during animation
                                el.innerHTML = `${prefix}${Math.floor(Number(this.targets()[0].innerHTML))}${suffix}`;
                            }
                        }
                    );
                }
            });
        }, 100);
    };

    const closeCard = () => {
        setActiveCase(null);
    };

    return (
        <section
            id="case-studies"
            className="case-studies-section"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div className={`cs-stage ${activeCase ? 'is-paused' : ''}`}>
                <div className="cs-sphere" ref={sphereRef}>
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="cs-item"
                            style={{ '--offset-x': item.x, '--offset-y': item.y } as React.CSSProperties}
                            onClick={() => openCard(caseStudies[item.caseIndex])}
                        >
                            <div className="cs-item__image">
                                <img
                                    src={item.src}
                                    alt={`${caseStudies[item.caseIndex].industry} AI automation case study — ${caseStudies[item.caseIndex].headline}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cs-overlay"></div>

            {/* Editorial Card Overlay */}
            <div className={`editorial-viewer ${activeCase ? 'is-open' : ''}`}>
                <div className="editorial-scrim" onClick={closeCard}></div>

                {activeCase && (
                    <div className="editorial-card">
                        <header className="ec-header">
                            <div className="ec-tag">{activeCase.index}</div>
                            <div className="ec-tag">{activeCase.industry}</div>
                            <div className="ec-close" onClick={closeCard}>&times;</div>
                        </header>

                        <div className="ec-body">
                            {/* Left Column Story */}
                            <div className="ec-left">
                                <h2 className="ec-headline">{activeCase.headline}</h2>
                                <div className="ec-divider"></div>

                                <div className="ec-section-title">THE PROBLEM</div>
                                <div className="ec-problem">{activeCase.problem}</div>

                                <div className="ec-section-title">WHAT WE BUILT</div>
                                <div className="ec-built-list">
                                    {activeCase.built.map((b, idx) => (
                                        <div key={idx} className="ec-built-item">
                                            <div className="ec-pixel"></div>
                                            <div className="ec-built-name">{b.name} <span className="ec-built-desc">— {b.desc}</span></div>
                                        </div>
                                    ))}
                                </div>

                                {(activeCase.quote || activeCase.verdict) && (
                                    <>
                                        <div className="ec-section-title" style={{ marginTop: '32px' }}>
                                            {activeCase.quote ? 'IN THEIR WORDS' : 'THE VERDICT'}
                                        </div>
                                        <div className="ec-quote-wrap">
                                            <div className="ec-quote-bar"></div>
                                            <div className="ec-quote">"{activeCase.quote || activeCase.verdict}"</div>
                                            {activeCase.author && <div className="ec-author">— {activeCase.author}</div>}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Column Stats */}
                            <div className="ec-right">
                                <div className="ec-section-title">RESULTS</div>
                                <div className="ec-divider" style={{ marginTop: '8px', marginBottom: '24px' }}></div>

                                <div className="ec-results-wrap">
                                    {activeCase.stats.map((st, idx) => (
                                        <div key={idx} className="ec-stat-block">
                                            <div className="ec-stat-num" data-value={st.num}>{st.num}</div>
                                            <div className="ec-stat-desc">{st.text}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="ec-timeline">
                                    <div className="ec-section-title">TIMELINE:</div>
                                    <div className="ec-timeline-val">{activeCase.timeline}</div>
                                    <div className="ec-tag">{activeCase.industry}</div>
                                </div>

                                <button className="ec-action-btn">
                                    Book A Strategy Call &rarr;
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
