import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TransitionSpacer.css';

gsap.registerPlugin(ScrollTrigger);

interface TransitionSpacerProps {
    text?: string;
    variant?: 'default' | 'belt' | 'punchline';
}

export default function TransitionSpacer({ text = "MAPPING GLOBAL SCALE", variant = 'default' }: TransitionSpacerProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (variant !== 'default') return;
        if (!sectionRef.current || !textRef.current || !lineRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1
                }
            });

            tl.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, ease: "power2.inOut", duration: 1 }
            )
                .fromTo(textRef.current,
                    { opacity: 0, y: 30, letterSpacing: "0.5em" },
                    { opacity: 1, y: 0, letterSpacing: "0.2em", ease: "power3.out", duration: 1 },
                    "-=0.5"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, [variant]);

    if (variant === 'belt') {
        const beltText = Array(12).fill(text).join(" ✛ ");
        return (
            <section className="transition-spacer-section variant-belt">
                <div className="belt-track">
                    <h3 className="belt-text">{beltText}</h3>
                    <h3 className="belt-text">{beltText}</h3>
                </div>
            </section>
        );
    }

    if (variant === 'punchline') {
        return (
            <section className="transition-spacer-section variant-punchline" ref={sectionRef}>
                <div className="punchline-container">
                    <h2 className="punchline-text">
                        THE ONLY WAY TO PREDICT <br />
                        <span className="punchline-highlight">THE FUTURE</span> IS TO <span className="punchline-highlight">BUILD IT.</span>
                    </h2>
                </div>
            </section>
        );
    }

    return (
        <section className="transition-spacer-section" ref={sectionRef}>
            <div className="ts-container">
                <div className="ts-line" ref={lineRef}></div>
                <h3 className="ts-text" ref={textRef}>{text}</h3>
            </div>
        </section>
    );
}
