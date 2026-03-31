
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Loader2, ClipboardCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';

const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = ref.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
};

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

const IntakePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useScrollAnimation();

  const [checkedSoftware, setCheckedSoftware] = useState<Record<string, boolean>>({});
  const [softwareDetails, setSoftwareDetails] = useState<Record<string, string>>({});

  // noindex for this hidden page
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const handleCheckbox = (id: string) => {
    setCheckedSoftware(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Build software list
    const softwareList = softwareOptions
      .filter(opt => checkedSoftware[opt.id])
      .map(opt => {
        const detail = softwareDetails[opt.id];
        return detail ? `${opt.label} -- ${detail}` : opt.label;
      })
      .join('\n  ');

    // Build the full message
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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setError(err?.text || 'Something went wrong. Please try again or reach out directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6 grain">
        <div className="max-w-2xl bg-white p-12 md:p-20 rounded-[3rem] shadow-xl text-center animate-on-scroll visible">
          <div className="w-20 h-20 bg-evergreen/10 text-evergreen rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} />
          </div>
          <h2 className="text-4xl font-serif text-evergreen mb-6">Got it. Thanks, Michael.</h2>
          <p className="text-xl text-charcoal/60 leading-relaxed mb-4">
            This is exactly what I need to make Thursday count. See you then.
          </p>
          <p className="text-lg text-charcoal/40 leading-relaxed">
            -- Patrick
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone" ref={scrollRef}>
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 max-w-7xl mx-auto px-6 text-center grain relative">
        <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-1.5 bg-evergreen/5 rounded-full text-evergreen text-xs font-semibold uppercase tracking-widest mb-6 border border-evergreen/10">
          <ClipboardCheck size={14} className="text-copper" />
          Pre-Meeting Intake
        </div>
        <h1 className="animate-on-scroll delay-1 text-4xl md:text-6xl lg:text-7xl font-serif text-evergreen mb-6 leading-tight">
          Denver Zen Den
        </h1>
        <p className="animate-on-scroll delay-2 text-xl md:text-2xl text-charcoal/50 max-w-3xl mx-auto font-light leading-relaxed">
          Hey Michael -- looking forward to Thursday. To make the most of our time together, it'd help to know where things stand before I walk in. This should take about 5 minutes.
        </p>
      </section>

      {/* Form */}
      <section className="pb-32 max-w-4xl mx-auto px-6">
        <div className="animate-on-scroll bg-evergreen p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-2xl text-stone relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />

          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-14">

              {/* Q1: Software */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">1.</label>
                <p className="text-xl font-serif text-sand mb-6">What software are you currently using to run the business?</p>
                <p className="text-sm text-stone/40 mb-6">Check all that apply</p>
                <div className="space-y-4">
                  {softwareOptions.map((opt) => (
                    <div key={opt.id} className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={!!checkedSoftware[opt.id]}
                          onChange={() => handleCheckbox(opt.id)}
                          className="w-5 h-5 rounded border-2 border-stone/20 bg-transparent checked:bg-copper checked:border-copper accent-copper cursor-pointer"
                        />
                        <span className="text-stone/80 group-hover:text-stone transition-colors">{opt.label}</span>
                      </label>
                      {opt.hasDetail && checkedSoftware[opt.id] && (
                        <input
                          type="text"
                          placeholder="Which one?"
                          value={softwareDetails[opt.id] || ''}
                          onChange={(e) => setSoftwareDetails(prev => ({ ...prev, [opt.id]: e.target.value }))}
                          className="ml-8 form-input py-2 text-sm text-stone placeholder:text-stone/30 outline-none max-w-xs"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Q2: Not using */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">2.</label>
                <p className="text-xl font-serif text-sand mb-3">What are you paying for that you're NOT really using?</p>
                <p className="text-sm text-stone/40 mb-4">Anything you're subscribed to but haven't touched in a while -- no judgment, just want to know what's sitting there.</p>
                <textarea
                  name="not_using"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., We pay for Mailchimp but haven't sent anything in months..."
                />
              </div>

              {/* Q3: Team */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">3.</label>
                <p className="text-xl font-serif text-sand mb-3">How many people are on your team right now, and what do they handle?</p>
                <p className="text-sm text-stone/40 mb-4">Guides, admin, marketing, contractors -- whoever's involved day-to-day.</p>
                <textarea
                  name="team"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., 2 part-time guides, 1 admin who also handles social..."
                />
              </div>

              {/* Q4: Booking flow */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">4.</label>
                <p className="text-xl font-serif text-sand mb-3">Walk me through what happens after someone books a session.</p>
                <p className="text-sm text-stone/40 mb-4">Confirmation email, intake form, you prep something custom, follow-up after -- whatever the flow looks like right now, even if it's messy.</p>
                <textarea
                  name="booking_flow"
                  rows={4}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., They get an automatic confirmation, then I manually send a welcome email..."
                />
              </div>

              {/* Q5: MindWave B2B */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">5.</label>
                <p className="text-xl font-serif text-sand mb-3">What about the MindWave B2B side -- how are those leads coming in and how are you tracking them?</p>
                <textarea
                  name="mindwave"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., Mostly word of mouth, I track them in a spreadsheet..."
                />
              </div>

              {/* Q6: Content */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">6.</label>
                <p className="text-xl font-serif text-sand mb-3">How are you handling content right now?</p>
                <p className="text-sm text-stone/40 mb-4">Blog, social, email newsletters -- who's doing it, how much time is it taking?</p>
                <textarea
                  name="content"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., I post on Instagram a few times a week, takes about 3 hours..."
                />
              </div>

              {/* Q7: One thing */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">7.</label>
                <p className="text-xl font-serif text-sand mb-3">Of everything on your plate right now, what's the ONE thing that, if it just worked, would free up the most time or energy for you?</p>
                <textarea
                  name="one_thing"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="The one thing that would make the biggest difference..."
                />
              </div>

              {/* Q8: AI/Automation tried */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">8.</label>
                <p className="text-xl font-serif text-sand mb-3">What have you already tried with AI or automation that didn't stick?</p>
                <p className="text-sm text-stone/40 mb-4">You mentioned some stuff last year that didn't land -- anything specific you want me to know about so we don't retread?</p>
                <textarea
                  name="ai_tried"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., Tried ChatGPT for content but it didn't sound like me..."
                />
              </div>

              {/* Q9: Anything else */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-2">9.</label>
                <p className="text-xl font-serif text-sand mb-3">Anything else you want me to see or know before I come in?</p>
                <textarea
                  name="anything_else"
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="Anything at all..."
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200 text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full bg-sand text-evergreen py-5 rounded-full text-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-copper hover:text-stone disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send It Over
                      <ArrowUpRight size={20} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-sm text-stone/40 flex items-center justify-center gap-2">
                  <Check size={14} />
                  Goes straight to Patrick
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntakePage;
