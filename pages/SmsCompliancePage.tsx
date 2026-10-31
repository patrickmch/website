import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { Button } from '../components/Button';

/**
 * Lazy-loaded SMS opt-in and privacy/messaging-terms pages for carrier (A2P 10DLC)
 * verification under Odyssey Business Strategy LLC (DBA McHeyser).
 */
export function SmsOptInPage() {
  usePageMeta(
    'Scheduling & Text Updates | Patrick McHeyser (Odyssey Business Strategy LLC)',
    'Opt in to receive scheduling and consultation text updates from McHeyser (Odyssey Business Strategy LLC).',
    '/sms-opt-in'
  );

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email address.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || '(not provided)',
          website: '',
          challenge: [
            `SMS Scheduling Opt-In Submission`,
            `Phone: ${phone.trim() || '(not provided)'}`,
            `SMS Opt-In Checked: ${smsConsent ? 'Yes (explicitly consented)' : 'No'}`,
            `Notes: ${notes.trim() || '(none)'}`,
          ].join('\n'),
          _subject: 'Scheduling & SMS Opt-In from mcheyser.com',
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError('Something went wrong. Please try again or email patrick@mcheyser.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section first className="hero">
      <div className="hero__text">
        <p className="eyebrow">McHeyser · Odyssey Business Strategy LLC</p>
        <h1>Scheduling &amp; text message updates</h1>
        <p className="lead">
          Coordinate a consultation or request text reminders for upcoming calls and project milestones with Patrick
          McHeyser (Odyssey Business Strategy LLC).
        </p>
        <p className="small muted">
          Providing your mobile number and opting into text updates is optional and is never required to work together.
        </p>
      </div>

      <div className="contact-form">
        {submitted ? (
          <div className="form__success" role="status">
            <Prose>
              <p className="lead">
                Thanks for confirming your preferences. If you opted into text updates, you can reply STOP at any time
                to unsubscribe or HELP for assistance.
              </p>
            </Prose>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="sms-name">
                Full name
              </label>
              <input
                id="sms-name"
                name="name"
                type="text"
                autoComplete="name"
                className="field__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="sms-company">
                Company <span className="field__optional">(optional)</span>
              </label>
              <input
                id="sms-company"
                name="company"
                type="text"
                autoComplete="organization"
                className="field__input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="sms-email">
                Email address
              </label>
              <input
                id="sms-email"
                name="email"
                type="email"
                autoComplete="email"
                className="field__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="sms-phone">
                Mobile phone number <span className="field__optional">(optional)</span>
              </label>
              <input
                id="sms-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(303) 555-0100"
                className="field__input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="sms-notes">
                Scheduling notes or topic <span className="field__optional">(optional)</span>
              </label>
              <textarea
                id="sms-notes"
                name="notes"
                rows={3}
                className="field__input"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="checkbox" htmlFor="sms-consent">
                <input
                  id="sms-consent"
                  name="sms_consent"
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                />
                <span>
                  By checking this box, I consent to receive conversational and appointment-related text messages
                  (including scheduling confirmations, call reminders, and project updates) from{' '}
                  <strong>McHeyser (Odyssey Business Strategy LLC)</strong> at the mobile number provided. Message
                  frequency varies. Message and data rates may apply. Reply <strong>HELP</strong> for help or{' '}
                  <strong>STOP</strong> to opt out at any time. Consent is not a condition of any purchase or service.
                  Review our <Link to="/privacy">Privacy Policy</Link> and{' '}
                  <Link to="/privacy#terms">SMS Messaging Terms</Link>.
                </span>
              </label>
            </div>

            <div className="form__actions">
              {error && (
                <p className="form__status form__status--error" role="alert">
                  {error}
                </p>
              )}
              <Button disabled={submitting}>{submitting ? 'Saving...' : 'Submit preferences'}</Button>
            </div>
          </form>
        )}
        <p className="form__note">
          Questions? Email <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a> ·{' '}
          <Link to="/privacy">Privacy Policy &amp; Terms</Link>
        </p>
      </div>
    </Section>
  );
}

export function PrivacyPage() {
  usePageMeta(
    'Privacy Policy & Messaging Terms | Patrick McHeyser (Odyssey Business Strategy LLC)',
    'Privacy Policy and SMS Messaging Terms for Odyssey Business Strategy LLC (DBA McHeyser).',
    '/privacy'
  );

  return (
    <Section first>
      <Prose>
        <p className="eyebrow">Odyssey Business Strategy LLC · DBA McHeyser</p>
        <h1>Privacy Policy &amp; SMS Messaging Terms</h1>
        <p className="small muted">Effective Date: October 31, 2026</p>

        <h2>1. Overview &amp; Legal Entity</h2>
        <p>
          This Privacy Policy and Messaging Terms document applies to <strong>Odyssey Business Strategy LLC</strong>, a
          Colorado limited liability company operating under the trade name <strong>McHeyser</strong> (&ldquo;McHeyser,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) at <code>https://mcheyser.com</code>.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          When you submit an inquiry, schedule a consultation, or opt in to receive communications on our website
          (including via <Link to="/contact">/contact</Link> or <Link to="/sms-opt-in">/sms-opt-in</Link>), we collect
          the contact details you choose to provide, such as your name, company name, email address, phone number, and
          notes regarding your business operations.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information you provide strictly to respond to your inquiries, schedule and confirm meetings,
          deliver consulting and software services you request, and communicate project updates.
        </p>

        <h2>4. Mobile &amp; SMS Data Privacy (No Third-Party Sharing)</h2>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
          </strong>{' '}
          Information sharing to subcontractors in support services, such as customer service or technical delivery, is
          permitted solely to provide the service. All other use case categories exclude text messaging originator
          opt-in data and consent; this information will not be shared with any third parties.
        </p>

        <h2 id="terms">5. SMS Messaging Terms &amp; Conditions</h2>
        <ul>
          <li>
            <strong>Program Description:</strong> By opting in at <Link to="/sms-opt-in">mcheyser.com/sms-opt-in</Link>{' '}
            or requesting text follow-up from Patrick McHeyser (Odyssey Business Strategy LLC), you agree to receive
            one-to-one conversational, scheduling, and project-related text messages.
          </li>
          <li>
            <strong>Message Frequency:</strong> Message frequency varies based on your active scheduling requests and
            conversations (typically 1 to 4 messages per interaction).
          </li>
          <li>
            <strong>Opt-Out Instructions:</strong> You may opt out of receiving text messages at any time by replying{' '}
            <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, or{' '}
            <strong>QUIT</strong> to any message. You will receive one final confirmation text acknowledging your
            opt-out, and no further messages will be sent unless you explicitly opt back in by replying{' '}
            <strong>START</strong>.
          </li>
          <li>
            <strong>Help &amp; Support:</strong> For support or information, reply <strong>HELP</strong> or{' '}
            <strong>INFO</strong> to any text message, or contact us directly at{' '}
            <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a> or (303) 621-4250.
          </li>
          <li>
            <strong>Message &amp; Data Rates:</strong> Standard message and data rates may apply depending on your
            mobile carrier plan.
          </li>
          <li>
            <strong>Carrier Liability:</strong> Mobile carriers are not liable for delayed or undelivered messages.
          </li>
        </ul>

        <h2>6. Contact Information</h2>
        <p>
          <strong>Odyssey Business Strategy LLC (DBA McHeyser)</strong>
          <br />
          Attn: Patrick McHeyser
          <br />
          Boulder, Colorado
          <br />
          Email: <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a>
          <br />
          Phone: (303) 621-4250
        </p>
      </Prose>
    </Section>
  );
}
