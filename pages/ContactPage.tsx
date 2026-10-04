import React, { useEffect, useRef, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { Button } from '../components/Button';
import { Field } from '../components/form/Field';

type Values = {
  name: string;
  email: string;
  company: string;
  website: string;
  challenge: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const order: (keyof Values)[] = ['name', 'email', 'company', 'website', 'challenge'];

const messages: Record<keyof Values, string> = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  company: 'Please enter your company name.',
  website: 'Please enter a valid website address or leave this blank.',
  challenge: "Please tell me a little about what you'd like to improve.",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const websitePattern = /^(https?:\/\/)?[^\s/$.?#]+\.[^\s]+$/i;

function validateField(key: keyof Values, value: string): string | undefined {
  const trimmed = value.trim();
  switch (key) {
    case 'name':
    case 'company':
    case 'challenge':
      return trimmed ? undefined : messages[key];
    case 'email':
      return emailPattern.test(trimmed) ? undefined : messages.email;
    case 'website':
      return !trimmed || websitePattern.test(trimmed) ? undefined : messages.website;
  }
}

function validate(values: Values): Errors {
  const errors: Errors = {};
  for (const key of order) {
    const message = validateField(key, values[key]);
    if (message) errors[key] = message;
  }
  return errors;
}

const empty: Values = { name: '', email: '', company: '', website: '', challenge: '' };

export default function ContactPage() {
  usePageMeta(
    "Let's Talk | Patrick McHeyser",
    'Tell Patrick what is getting harder to manage as your business grows. Start a conversation about the problem and whether he can help.',
    '/contact'
  );

  const successRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // The confirmation replaces the form, so move focus to it: the submit button is gone.
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
  }, [status]);

  const update = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (attempted) {
      setErrors((current) => ({ ...current, [key]: validateField(key, value) }));
    }
  };

  const blur = (key: keyof Values) => () => {
    if (attempted) {
      setErrors((current) => ({ ...current, [key]: validateField(key, values[key]) }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = order.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    // Honeypot: people never see the reference field (it is hidden and unrecognisable to autofill).
    // A filled one is a bot, which gets the confirmation and nothing is sent.
    if (reference.trim()) {
      setStatus('sent');
      return;
    }

    // Send the values that were validated, trimmed, not whatever the form holds by the time the request goes out.
    const note = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      website: values.website.trim(),
      challenge: values.challenge.trim(),
      _subject: 'New note from mcheyser.com',
    };

    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, note, {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      });
      setStatus('sent');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  const sending = status === 'sending';

  return (
    <Section first className="hero">
      <div className="hero__text">
        <h1>What is getting harder as your business grows?</h1>
        <p className="lead">
          Tell me a little about the work that's slowing you down and what you'd like to change. A few sentences is
          enough to start.
        </p>
        <p>I'll read your note and follow up about a conversation to understand the problem and see whether I can help.</p>
      </div>

      <div className="contact-form">
        {status === 'sent' ? (
          <div ref={successRef} className="form__success" role="status" tabIndex={-1}>
            <Prose>
              <p className="lead">Thanks for getting in touch. I've received your note and will follow up by email.</p>
            </Prose>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="_subject" value="New note from mcheyser.com" />
            <div className="visually-hidden" aria-hidden="true">
              <label htmlFor="contact-reference">Reference (leave this blank)</label>
              <input
                id="contact-reference"
                name="reference"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
              />
            </div>
            <Field
              id="contact-name"
              readOnly={sending}
              name="name"
              label="Name"
              autoComplete="name"
              value={values.name}
              onChange={update('name')}
              onBlur={blur('name')}
              error={errors.name}
            />
            <Field
              id="contact-email"
              readOnly={sending}
              name="email"
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={update('email')}
              onBlur={blur('email')}
              error={errors.email}
            />
            <Field
              id="contact-company"
              readOnly={sending}
              name="company"
              label="Company"
              autoComplete="organization"
              value={values.company}
              onChange={update('company')}
              onBlur={blur('company')}
              error={errors.company}
            />
            <Field
              id="contact-website"
              readOnly={sending}
              name="website"
              label="Company website"
              optional
              inputMode="url"
              autoComplete="url"
              value={values.website}
              onChange={update('website')}
              onBlur={blur('website')}
              error={errors.website}
            />
            <Field
              id="contact-challenge"
              readOnly={sending}
              name="challenge"
              label="What is getting harder to manage as the business grows?"
              as="textarea"
              rows={6}
              value={values.challenge}
              onChange={update('challenge')}
              onBlur={blur('challenge')}
              error={errors.challenge}
            />
            <div className="form__actions">
              <p className={`form__status ${sending ? 'visually-hidden' : ''}`} aria-live="polite">
                {sending && 'Sending your note...'}
              </p>
              {status === 'error' && (
                <p className="form__status form__status--error" role="alert">
                  Something went wrong while sending your note. Please try again or email{' '}
                  <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a>.
                </p>
              )}
              <Button disabled={sending}>{sending ? 'Sending your note...' : 'Send your note'}</Button>
            </div>
          </form>
        )}
        <p className="form__note">
          Prefer email? Write to <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a>.
        </p>
      </div>
    </Section>
  );
}
