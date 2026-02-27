
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Heart, Shield, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Custom hook for scroll animations
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

const ApplyPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setError(err?.text || 'Something went wrong. Please try again or email me directly at patrick@mcheyser.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6 grain">
        <div className="max-w-2xl bg-white p-12 md:p-20 rounded-[3rem] shadow-xl text-center animate-on-scroll visible">
          <div className="w-20 h-20 bg-evergreen/10 text-evergreen rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} />
          </div>
          <h2 className="text-4xl font-serif text-evergreen mb-6">Got it. I'll be in touch.</h2>
          <p className="text-xl text-charcoal/60 leading-relaxed mb-4">
            I read every one of these personally. Expect to hear from me within 48 hours.
          </p>
          <p className="text-lg text-charcoal/40 leading-relaxed mb-8">
            If it's urgent, email me directly at{' '}
            <a href="mailto:patrick@mcheyser.com" className="text-copper hover:text-evergreen transition-colors underline">patrick@mcheyser.com</a>.
          </p>
          <button
            onClick={() => window.location.href = '#/'}
            className="text-evergreen font-semibold uppercase tracking-widest text-sm link-hover"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone" ref={scrollRef}>
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-6 text-center grain relative">
        <h1 className="animate-on-scroll text-4xl md:text-6xl lg:text-7xl font-serif text-evergreen mb-6 leading-tight">Let's figure out where your operation is stuck.</h1>
        <p className="animate-on-scroll delay-1 text-xl md:text-2xl text-charcoal/50 max-w-3xl mx-auto font-light leading-relaxed">
          30 minutes. No pitch. I'll ask a few sharp questions, you'll tell me what's going on, and we'll figure out if I can help.
        </p>
      </section>

      {/* Expectation Cards */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <MessageSquare className="text-copper" size={28} />,
              title: "You tell me what's broken.",
              desc: "Where the friction is, what you've tried, what's getting in the way."
            },
            {
              icon: <Shield className="text-copper" size={28} />,
              title: "I'll be straight with you.",
              desc: "If I'm not the right person for this, I'll say so. And I'll point you toward who is."
            },
            {
              icon: <Heart className="text-copper" size={28} />,
              title: "If it's a fit, we move.",
              desc: "Clear next steps, no runaround. I work fast once I know the problem."
            }
          ].map((item, i) => (
            <div key={i} className={`animate-on-scroll delay-${i + 1} bg-white p-10 rounded-[2rem] border border-sand/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
              <div className="mb-6 w-14 h-14 rounded-2xl bg-evergreen/5 flex items-center justify-center group-hover:bg-copper/10 transition-colors">{item.icon}</div>
              <h3 className="text-xl font-serif text-evergreen mb-3 group-hover:text-copper transition-colors">{item.title}</h3>
              <p className="text-charcoal/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-32 max-w-4xl mx-auto px-6">
        <div className="animate-on-scroll bg-evergreen p-8 md:p-16 lg:p-20 rounded-[3rem] shadow-2xl text-stone relative overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />

          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-sand mb-3">Request a Strategy Call</h2>
              <p className="text-stone/50">Takes about 60 seconds.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Hidden field for form identification */}
              <input type="hidden" name="_subject" value="New Consultation Request from mcheyser.com" />

              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Your Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Company Name & Website Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Company Name</label>
                  <input
                    required
                    type="text"
                    name="company"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="Acme Corp"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Company Website <span className="normal-case tracking-normal text-stone/30">(optional)</span></label>
                  <input
                    type="text"
                    name="website"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              {/* Biggest Headache */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">What's the biggest operational headache you're dealing with right now?</label>
                <textarea
                  required
                  name="challenge"
                  rows={2}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., We're spending 20 hours a week on manual data entry that should be automated..."
                />
              </div>

              {/* What does your company do */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">What does your company do, roughly?</label>
                <input
                  required
                  type="text"
                  name="company_type"
                  className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                  placeholder="e.g., B2B SaaS, healthcare practice, e-commerce..."
                />
              </div>

              {/* How'd you hear about me */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">How'd you hear about me? <span className="normal-case tracking-normal text-stone/30">(optional)</span></label>
                <input
                  type="text"
                  name="referral"
                  className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                  placeholder="Referral, LinkedIn, Google..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-200 text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full bg-sand text-evergreen py-5 rounded-full text-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-copper hover:text-stone disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request a Call
                      <ArrowUpRight size={20} />
                    </>
                  )}
                </button>
                <p className="mt-4 text-center text-sm text-stone/40 flex items-center justify-center gap-2">
                  <Check size={14} />
                  You'll hear back within 48 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Reinforcement */}
      <section className="py-24 bg-evergreen text-stone text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-2xl mx-auto px-6 relative">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-serif text-sand mb-6">I take the businesses I work with seriously.</h2>
          <p className="animate-on-scroll delay-1 text-lg text-stone/60 mb-12 leading-relaxed">
            Your operation matters. Your customers matter. If we work together, I'm not phoning it in - I'm embedded in the work, building real solutions, and staying until they run. That's the only way I know how to do this.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
            className="animate-on-scroll delay-2 text-copper font-semibold uppercase tracking-widest text-sm link-hover inline-flex items-center gap-2"
          >
            Start Your Application
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
