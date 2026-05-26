import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const progressCounterRef = useRef<HTMLHeadingElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const scroller = scrollerRef.current;
        const progressBar = progressBarRef.current;
        if (!container || !scroller || !progressBar) return;

        const ctx = gsap.context(() => {
            gsap.to(scroller, {
                x: () => -(scroller.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + (scroller.scrollWidth - window.innerWidth)
                }
            });

            gsap.fromTo(progressBar,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: () => "+=" + (scroller.scrollWidth - window.innerWidth),
                        scrub: 1,
                        onUpdate: (self) => {
                            if (progressCounterRef.current) {
                                progressCounterRef.current.textContent = String(Math.round(self.progress * 100));
                            }
                        }
                    }
                }
            );

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div className="hiw-container" ref={containerRef} id="howitworks">
            <div className="hiw-progress-bar" ref={progressBarRef}></div>

            <div className="hiw-progress-counter">
                <h1 ref={progressCounterRef}>0</h1>
            </div>

            <div className="hiw-scroller" ref={scrollerRef}>

                {/* 1 */}
                <section className="hiw-intro">
                    <h1 data-seo-keywords="lead to sale automation, AI lead conversion">From Lead to Sale</h1>
                    <h2>
                        How Dare XAI Works: A simple 3-step process that turns your
                        missed calls and delayed responses into automated, intelligent
                        conversations that convert leads 24/7.
                    </h2>
                </section>

                {/* 2 */}
                <section className="hiw-about">
                    <div className="row">
                        <div className="copy">
                            <span className="step-num">Step 1</span>
                            <h2>Lead Enters</h2>
                            <p>From ad, form, or missed call.</p>
                            <p className="subtitle">
                                We map your current lead flow and identify bottlenecks.
                            </p>
                            <ul className="hiw-bullets">
                                <li>Facebook / Google Ads</li>
                                <li>Website Contact Forms</li>
                                <li>Missed Phone Calls</li>
                                <li>WhatsApp Inquiries</li>
                                <li>Walk-in Registrations</li>
                            </ul>
                        </div>
                        <div className="img">
                            <img
                                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1600&q=80"
                                alt="Customer submitting lead form on website"
                            />
                        </div>
                    </div>
                </section>

                {/* 3 */}
                <section className="hiw-about dark-alt">
                    <div className="row">
                        <div className="img">
                            <img
                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80"
                                alt="AI assistant technology interface"
                            />
                        </div>
                        <div className="copy">
                            <span className="step-num highlight">Step 2</span>
                            <h2>AI Agent Responds Instantly</h2>
                            <p>Voice or WhatsApp replies with smart conversation.</p>
                            <p className="subtitle">
                                Custom AI trained on your business language and processes.
                            </p>
                            <ul className="hiw-bullets">
                                <li>Responds in 2-3 seconds</li>
                                <li>Speaks Hindi, Tamil, Marathi</li>
                                <li>Understands context and intent</li>
                                <li>Asks qualifying questions</li>
                                <li>Handles objections naturally</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 4 */}
                <section className="hiw-about">
                    <div className="row">
                        <div className="copy">
                            <span className="step-num">Step 3</span>
                            <h2>Follow-up, Bookings, or Info Sent</h2>
                            <p>Based on logic or intent.</p>
                            <p className="subtitle">
                                Live agents start converting leads into bookings immediately.
                            </p>
                            <ul className="hiw-bullets">
                                <li>Books appointments automatically</li>
                                <li>Sends product catalogs</li>
                                <li>Schedules demo calls</li>
                                <li>Collects requirements</li>
                                <li>Handles price negotiations</li>
                            </ul>
                        </div>
                        <div className="img">
                            <img
                                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1600&q=80"
                                alt="Successful customer booking or conversion"
                            />
                        </div>
                    </div>
                </section>

                {/* 5 */}
                <section className="hiw-outro">
                    <h1>Why Businesses Choose Dare XAI</h1>
                    <div className="footer-bullets">
                        <span className="badge">Works with Google Sheets</span>
                        <span className="badge">Speaks Regional Languages</span>
                        <span className="badge">No tech skills needed</span>
                    </div>
                </section>

            </div>
        </div>
    );
}