import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudies from '../CaseStudies/CaseStudies';
import './RabbitHole.css';

gsap.registerPlugin(ScrollTrigger);

export default function RabbitHole() {
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const element = revealRef.current;
            if (!element) return;

            const heroBox = element.querySelector(".hero-reveal__header");
            const heroHeadings = element.querySelectorAll(".hero-reveal_split_item");
            const contentEl = element.querySelector(".hero-reveal__content");

            if (!heroBox || heroHeadings.length < 2) return;

            const scrollDistance = window.innerHeight;

            // Content scroll up
            gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: true
                }
            })
                .fromTo(contentEl, { y: "50%" }, { y: "0%", ease: "none" }, 0.2);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: true,
                    pin: true
                }
            });

            // Main clipPath animation - Splitting the screen in half horizontally
            tl.fromTo(
                heroBox,
                { clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%, 0 50%, 100% 50%, 100% 100%, 0 100%)" },
                { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%, 0 100%, 100% 100%, 100% 100%, 0 100%)", duration: 0.4, ease: "power4.inOut" }
            );

            // Split animations for child items (pulling text up and down)
            tl.fromTo(heroHeadings[0], { y: "0%" }, { y: "-30%", ease: "power3.inOut" }, 0);
            tl.fromTo(heroHeadings[1], { y: "0%" }, { y: "30%", ease: "power3.inOut" }, 0);

        }, revealRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-reveal" ref={revealRef} id="casestudies">
            <article>

                <header className="hero-reveal__header">
                    <div className="hero-reveal_split">
                        <div className="hero-reveal_split_item">
                            <p className="c-wide-text -split">CASE STUDIES</p>
                        </div>
                        <div className="hero-reveal_split_item" aria-hidden="true">
                            <p className="c-wide-text -split" aria-hidden="true">CASE STUDIES</p>
                        </div>
                    </div>
                </header>

                <div className="hero-reveal__content">
                    <CaseStudies />
                </div>

            </article>
        </section>
    );
}
