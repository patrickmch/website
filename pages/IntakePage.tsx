import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Section, Prose } from '../components/Section';
import { Button } from '../components/Button';

const softwareOptions = [
  { id: 'squarespace', label: 'Squarespace (website)' },
  { id: 'booking', label: 'Acuity / Calendly / other booking tool', hasDetail: true },
  { id: 'email_platform', label: 'Mailchimp / ConvertKit / other email platform', hasDetail: true },
  { id: 'accounting', label: 'QuickBooks / Wave / other accounting', hasDetail: true },
  { id: 'crm', label: 'CRM (HubSpot, Salesforce, etc.)', hasDetail: true },
  { id: 'social', label: 'Social media scheduler (Later, Buffer, etc.)', hasDetail: true },
  { id: 'google_workspace', label: 'Google Workspace / Microsoft 365' },
  { id: 'messaging', label: 'Slack / other team messaging' },
  { id: 'other', label: 'Other', hasDetail: true },
];

type Question = {
  n: number;
  name: string;
  title: string;
  help?: string;
  placeholder: string;
  rows: number;
};

const questions: Question[] = [
  {
    n: 2,
    name: 'not_using',
    title: "What are you paying for that you're NOT really using?",
    help: "Anything you're subscribed to but haven't touched in a while -- no judgment, just want to know what's sitting there.",
    placeholder: "e.g., We pay for Mailchimp but haven't sent anything in months...",
    rows: 3,
  },
  {
    n: 3,
    name: 'team',
    title: 'How many people are on your team right now, and what do they handle?',
    help: "Guides, admin, marketing, contractors -- whoever's involved day-to-day.",
    placeholder: 'e.g., 2 part-time guides, 1 admin who also handles social...',
    rows: 3,
  },
  {
    n: 4,
    name: 'booking_flow',
    title: 'Walk me through what happens after someone books a session.',
    help: "Confirmation email, intake form, you prep something custom, follow-up after -- whatever the flow looks like right now, even if it's messy.",
    placeholder: 'e.g., They get an automatic confirmation, then I manually send a welcome email...',
    rows: 4,
  },
  {
    n: 5,
    name: 'mindwave',
    title: 'What about the MindWave B2B side -- how are those leads coming in and how are you tracking them?',
    placeholder: 'e.g., Mostly word of mouth, I track them in a spreadsheet...',
    rows: 3,
  },
  {
    n: 6,
    name: 'content',
    title: 'How are you handling content right now?',
    help: "Blog, social, email newsletters -- who's doing it, how much time is it taking?",
    placeholder: 'e.g., I post on Instagram a few times a week, takes about 3 hours...',
    rows: 3,
  },
  {
    n: 7,
    name: 'one_thing',
    title:
      "Of everything on your plate right now, what's the ONE thing that, if it just worked, would free up the most time or energy for you?",
    placeholder: 'The one thing that would make the biggest difference...',
    rows: 3,
  },
  {
    n: 8,
    name: 'ai_tried',
    title: "What have you already tried with AI or automation that didn't stick?",
    help: "You mentioned some stuff last year that didn't land -- anything specific you want me to know about so we don't retread?",
    placeholder: "e.g., Tried ChatGPT for content but it didn't sound like me...",
    rows: 3,
  },
  {
    n: 9,
    name: 'anything_else',
    title: 'Anything else you want me to see or know before I come in?',
    placeholder: 'Anything at all...',
    rows: 3,
  },
];

/** Retained client intake page (hidden, noindex). Content and behavior unchanged; restyled. */
export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkedSoftware, setCheckedSoftware] = useState<Record<string, boolean>>({});
  const [softwareDetails, setSoftwareDetails] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = 'Pre-Meeting Intake | Denver Zen Den';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const handleCheckbox = (id: string) => {
    setCheckedSoftware((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const softwareList = softwareOptions
      .filter((opt) => checkedSoftware[opt.id])
      .map((opt) => {
        const detail = softwareDetails[opt.id];
        return detail ? `${opt.label} -- ${detail}` : opt.label;
      })
      .join('\n  ');

    const message = [
      `PRE-MEETING INTAKE -- Denver Zen Den`,
      ``,
      `1. SOFTWARE CURRENTLY USING:`,
      softwareList ? `  ${softwareList}` : '  (none selected)',
      ``,
      `2. PAYING FOR BUT NOT USING:`,
      `  ${formData.get('not_using') || '(no answer)'}`,
      ``,
      `3. TEAM SIZE & ROLES:`,
      `  ${formData.get('team') || '(no answer)'}`,
      ``,
      `4. POST-BOOKING FLOW:`,
      `  ${formData.get('booking_flow') || '(no answer)'}`,
      ``,
      `5. MINDWAVE B2B LEADS:`,
      `  ${formData.get('mindwave') || '(no answer)'}`,
      ``,
      `6. CONTENT SITUATION:`,
      `  ${formData.get('content') || '(no answer)'}`,
      ``,
      `7. ONE THING THAT WOULD FREE UP THE MOST TIME:`,
      `  ${formData.get('one_thing') || '(no answer)'}`,
      ``,
      `8. AI/AUTOMATION ALREADY TRIED:`,
      `  ${formData.get('ai_tried') || '(no answer)'}`,
      ``,
      `9. ANYTHING ELSE:`,
      `  ${formData.get('anything_else') || '(no answer)'}`,
    ].join('\n');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: 'Michael (Denver Zen Den)',
          email: '',
          company: 'Denver Zen Den',
          company_type: 'Meditation / Wellness Studio',
          challenge: message,
          referral: 'Pre-meeting intake form',
          _subject: 'Pre-Meeting Intake -- Denver Zen Den',
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      const text = typeof err === 'object' && err && 'text' in err ? String((err as { text?: string }).text) : '';
      setError(text || 'Something went wrong. Please try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Section first className="hero">
        <div className="hero__text" role="status">
          <h1>Got it. Thanks, Michael.</h1>
          <p className="lead">This is exactly what I need to make Thursday count. See you then.</p>
          <p className="muted">-- Patrick</p>
        </div>
      </Section>
    );
  }

  return (
    <Section first className="hero">
      <div className="intake">
        <div className="hero__text">
          <p className="eyebrow">Pre-Meeting Intake</p>
          <h1>Denver Zen Den</h1>
          <p className="lead">
            Hey Michael -- looking forward to Thursday. To make the most of our time together, it'd help to know
            where things stand before I walk in. This should take about 5 minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form contact-form">
          <div className="intake__q">
            <p className="intake__n">1.</p>
            <h2>What software are you currently using to run the business?</h2>
            <p className="intake__help">Check all that apply</p>
            <ul className="checkbox-list">
              {softwareOptions.map((opt) => (
                <li key={opt.id}>
                  <label className="checkbox">
                    <input type="checkbox" checked={!!checkedSoftware[opt.id]} onChange={() => handleCheckbox(opt.id)} />
                    <span>{opt.label}</span>
                  </label>
                  {opt.hasDetail && checkedSoftware[opt.id] && (
                    <input
                      type="text"
                      className="field__input checkbox-detail"
                      placeholder="Which one?"
                      aria-label={`${opt.label}: which one?`}
                      value={softwareDetails[opt.id] || ''}
                      onChange={(event) => setSoftwareDetails((prev) => ({ ...prev, [opt.id]: event.target.value }))}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {questions.map((question) => (
            <div key={question.name} className="intake__q">
              <p className="intake__n">{question.n}.</p>
              <h2>
                <label htmlFor={`intake-${question.name}`}>{question.title}</label>
              </h2>
              {question.help && <p className="intake__help">{question.help}</p>}
              <textarea
                id={`intake-${question.name}`}
                name={question.name}
                rows={question.rows}
                className="field__input"
                placeholder={question.placeholder}
              />
            </div>
          ))}

          <div className="form__actions">
            {error && (
              <p className="form__status form__status--error" role="alert">
                {error}
              </p>
            )}
            <Button disabled={submitting}>{submitting ? 'Sending...' : 'Send It Over'}</Button>
            <p className="small muted">Goes straight to Patrick</p>
          </div>
        </form>
        <Prose className="form__note">
          <p className="small muted">Questions? Email patrick@mcheyser.com.</p>
        </Prose>
      </div>
    </Section>
  );
}
