import { useState, type FormEvent } from 'react';
import { submitWaitlistForm } from '../../lib/submitWaitlistForm';
import './RealEstateWaitlist.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
    // Basic phone validation (allowing digits, +, -, spaces, parenthesis, at least 8 chars)
    const cleaned = phone.replace(/[\s()+-]/g, '');
    return cleaned.length >= 8 && /^\d+$/.test(cleaned);
}

export default function RealEstateWaitlist() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName || !trimmedEmail || !trimmedPhone) {
            setStatus('error');
            setFeedback('Please fill in your name, email, and phone number.');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setStatus('error');
            setFeedback('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(trimmedPhone)) {
            setStatus('error');
            setFeedback('Please enter a valid phone number (at least 8 digits).');
            return;
        }

        setStatus('submitting');
        setFeedback('');

        const result = await submitWaitlistForm({
            name: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
        });

        if (result.ok) {
            setStatus('success');
            setFeedback(result.message);
            setName('');
            setEmail('');
            setPhone('');
            return;
        }

        setStatus('error');
        setFeedback(result.message);
    };

    const isSubmitting = status === 'submitting';

    return (
        <section className="waitlist-section" id="waitlist">
            <div className="waitlist-left">
                <div className="waitlist-header-block">
                    <span className="exclusive-badge">Early Access</span>
                    <h2>
                        Autonomous <span>AI Employee</span> For Real Estate
                    </h2>
                    <p className="waitlist-subtitle">
                        Stop losing commission to delayed replies. Secure early access to our autonomous Real Estate agent that captures, qualifies, and books viewings 24/7.
                    </p>
                </div>

                <div className="waitlist-features-block">
                    <h3>SYSTEM SPECIFICATIONS</h3>
                    <ul className="features-list">
                        <li>
                            <span className="feature-icon">◆</span>
                            <div className="feature-text-group">
                                <span className="feature-title">24/7 Lead Response &amp; Nurturing</span>
                                <span className="feature-desc">Instantly engages leads from ads, property portals, and social channels via WhatsApp and Voice.</span>
                            </div>
                        </li>
                        <li>
                            <span className="feature-icon">◆</span>
                            <div className="feature-text-group">
                                <span className="feature-title">Intelligent Listing Qualification</span>
                                <span className="feature-desc">Qualifies buyers on budget, location preferences, and purchase timeline before passing to agents.</span>
                            </div>
                        </li>
                        <li>
                            <span className="feature-icon">◆</span>
                            <div className="feature-text-group">
                                <span className="feature-title">Direct Calendar Bookings</span>
                                <span className="feature-desc">Automatically schedules viewings and property visits directly inside your agents' Google/Outlook calendars.</span>
                            </div>
                        </li>
                        <li>
                            <span className="feature-icon">◆</span>
                            <div className="feature-text-group">
                                <span className="feature-title">Multilingual Fluency</span>
                                <span className="feature-desc">Converses seamlessly in English, Hindi, and regional languages to match local prospect requirements.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="waitlist-right">
                <div className="waitlist-form-block">
                    <h2>JOIN THE EXCLUSIVE WAITLIST</h2>
                    <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
                        {/* Honeypot for bot protection */}
                        <input
                            type="checkbox"
                            name="botcheck"
                            className="waitlist-honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />

                        <div className="waitlist-input-row">
                            <label htmlFor="waitlist-name">FULL NAME *</label>
                            <input
                                id="waitlist-name"
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

                        <div className="waitlist-input-row">
                            <label htmlFor="waitlist-email">EMAIL ADDRESS *</label>
                            <input
                                id="waitlist-email"
                                name="email"
                                type="email"
                                placeholder="your.email@agency.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="waitlist-input-row">
                            <label htmlFor="waitlist-phone">PHONE NUMBER *</label>
                            <input
                                id="waitlist-phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number (e.g., +91 98765 43210)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                autoComplete="tel"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div
                            className={`waitlist-feedback waitlist-feedback--${status}`}
                            role="status"
                            aria-live="polite"
                        >
                            {feedback}
                        </div>

                        <button
                            type="submit"
                            className="waitlist-submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'SECURING SPOT…' : 'JOIN THE WAITLIST'}
                        </button>
                    </form>
                </div>

                <div className="waitlist-about-link">
                    <p>Have specific requirements or seeking a custom enterprise solution?</p>
                    <a href="#contact" className="arrow-link">
                        TALK TO US &rarr;
                    </a>
                </div>
            </div>
        </section>
    );
}
