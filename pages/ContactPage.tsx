import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
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

  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
    setAttempted(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = order.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    if (!formRef.current) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
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
          <div className="form__success" role="status">
            <Prose>
              <p className="lead">Thanks for getting in touch. I've received your note and will follow up by email.</p>
            </Prose>
          </div>
        ) : (
          <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="_subject" value="New note from mcheyser.com" />
            <Field
              id="contact-name"
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
              <p className={`form__status ${status === 'error' ? 'form__status--error' : ''}`} aria-live="polite">
                {sending && 'Sending your note...'}
                {status === 'error' &&
                  'Something went wrong while sending your note. Please try again or email patrick@mcheyser.com.'}
              </p>
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
