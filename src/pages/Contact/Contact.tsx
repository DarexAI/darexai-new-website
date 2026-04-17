import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, Stage } from '@react-three/drei';
import './Contact.css';

function Model() {
    const { scene } = useGLTF('/logo_model.glb');
    return <primitive object={scene} />;
}

export default function Contact() {
    return (
        <section className="contact-magazine" id="contact">
            {/* LEFT EDITORIAL COLUMN */}
            <div className="contact-left">
                <div className="contact-header-block">
                    <h1>LET'S BUILD<br />THE FUTURE<br />TOGETHER</h1>
                    <p className="contact-subtitle">
                        Ready to transform your business with AI automation? Our experts are here to help you design the perfect solution for your unique needs.
                    </p>
                </div>

                <div className="contact-3d-wrapper">
                    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={null}>
                            <Environment preset="city" />
                            <Float speed={2} rotationIntensity={0} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
                                <Stage environment="city" intensity={0.5} adjustCamera={1.2}>
                                    <Model />
                                </Stage>
                            </Float>
                        </Suspense>
                    </Canvas>
                </div>

                <div className="contact-about-link">
                    <p>Want to learn more about who we are and what drives us?</p>
                    <a href="#">READ ABOUT US →</a>
                </div>
            </div>

            {/* RIGHT FORM COLUMN */}
            <div className="contact-right">
                <div className="contact-form-block">
                    <h2>SEND US A MESSAGE</h2>
                    <form className="magazine-form">
                        <div className="input-row">
                            <label>FULL NAME *</label>
                            <input type="text" placeholder="Enter your full name" />
                        </div>
                        <div className="input-row">
                            <label>EMAIL ADDRESS *</label>
                            <input type="email" placeholder="your.email@company.com" />
                        </div>
                        <div className="input-row textarea-row">
                            <label>MESSAGE *</label>
                            <textarea placeholder="Tell us about your project, challenges you're facing, and what you hope to achieve..."></textarea>
                        </div>
                        <button type="button" className="submit-btn">SEND MESSAGE</button>
                    </form>
                </div>

                <div className="contact-info-block">
                    <h2>GET IN TOUCH</h2>
                    <div className="info-grid">
                        <div className="info-cell">
                            <span className="info-label">EMAIL</span>
                            <a href="mailto:hello@darexai.com">hello@darexai.com</a>
                        </div>
                        <div className="info-cell">
                            <span className="info-label">PHONE</span>
                            <a href="tel:+919119267828">+91 9119267828</a>
                        </div>
                        <div className="info-cell">
                            <span className="info-label">OFFICE</span>
                            <span>India</span>
                        </div>
                        <div className="info-cell">
                            <span className="info-label">BUSINESS HOURS</span>
                            <span>Mon-Sat 9AM-6PM IST</span>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/company/dare-xai/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
                        <a href="https://x.com/dare_xai" target="_blank" rel="noreferrer">X (TWITTER) ↗</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

useGLTF.preload('/logo_model.glb');
