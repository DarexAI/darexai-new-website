import { Suspense, useState, type FormEvent } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, Environment, Stage } from '@react-three/drei';
import { submitContactForm } from '../../lib/submitContactForm';
import './Contact.css';

function Model() {
    const { scene } = useGLTF('/logo_model.glb');
    return <primitive object={scene} />;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedMessage) {
            setStatus('error');
            setFeedback('Please fill in your name, email, and message.');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setStatus('error');
            setFeedback('Please enter a valid email address.');
            return;
        }

        if (trimmedMessage.length < 10) {
            setStatus('error');
            setFeedback('Please add a bit more detail in your message (at least 10 characters).');
            return;
        }

        setStatus('submitting');
        setFeedback('');

        const result = await submitContactForm({
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
        });

        if (result.ok) {
            setStatus('success');
            setFeedback(result.message);
            setName('');
            setEmail('');
            setMessage('');
            return;
        }

        setStatus('error');
        setFeedback(result.message);
    };

    const isSubmitting = status === 'submitting';

    return (
        <section className="contact-magazine" id="contact">
            <div className="contact-left">
                <div className="contact-header-block">
                    <h2>Let&apos;s Build the Future Together — Contact Darex AI</h2>
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
                    <a href="https://www.linkedin.com/company/dare-xai/" target="_blank" rel="noreferrer">
                        READ ABOUT US →
                    </a>
                </div>
            </div>

            <div className="contact-right">
                <div className="contact-form-block">
                    <h2>SEND US A MESSAGE</h2>
                    <form className="magazine-form" onSubmit={handleSubmit} noValidate>
                        {/* Honeypot — hidden from users, catches bots (Web3Forms) */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            className="contact-honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />

                        <div className="input-row">
                            <label htmlFor="contact-name">FULL NAME *</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="input-row">
                            <label htmlFor="contact-email">EMAIL ADDRESS *</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                placeholder="your.email@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="input-row textarea-row">
                            <label htmlFor="contact-message">MESSAGE *</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Tell us about your project, challenges you're facing, and what you hope to achieve..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                minLength={10}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div
                            className={`form-feedback form-feedback--${status}`}
                            role="status"
                            aria-live="polite"
                        >
                            {feedback}
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'}
                        </button>
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
