
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Heart, Shield, ArrowUpRight, Check } from 'lucide-react';

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
  const scrollRef = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6 grain">
        <div className="max-w-2xl bg-white p-12 md:p-20 rounded-[3rem] shadow-xl text-center animate-on-scroll visible">
          <div className="w-20 h-20 bg-evergreen/10 text-evergreen rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} />
          </div>
          <h2 className="text-4xl font-serif text-evergreen mb-6">Application Received</h2>
          <p className="text-xl text-charcoal/60 leading-relaxed mb-8">
            Thank you for being so open. I personally read every application and will get back to you within 48 hours to discuss next steps.
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
        <h1 className="animate-on-scroll text-4xl md:text-6xl lg:text-7xl font-serif text-evergreen mb-6 leading-tight">Let's see if your community is ready for real support.</h1>
        <p className="animate-on-scroll delay-1 text-xl md:text-2xl text-charcoal/50 max-w-3xl mx-auto font-light leading-relaxed">
          No pressure, no hard sell. Just a good conversation to see if this is the right fit for you and your members.
        </p>
      </section>

      {/* Expectation Cards */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <MessageSquare className="text-copper" size={28} />,
              title: "You tell me about your community.",
              desc: "Where it is now, where you want it to go, what's getting in the way."
            },
            {
              icon: <Shield className="text-copper" size={28} />,
              title: "I'll give you honest feedback.",
              desc: "If I'm not the right person, I'll tell you. And I'll explain why."
            },
            {
              icon: <Heart className="text-copper" size={28} />,
              title: "If it's a match, we'll talk next steps.",
              desc: "Clear, simple, grounded. No \"closing tactics.\""
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
              <h2 className="text-3xl md:text-4xl font-serif text-sand mb-3">Start Your Application</h2>
              <p className="text-stone/50">Takes about 5 minutes</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Your Name</label>
                  <input
                    required
                    type="text"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Business Website / Instagram</label>
                <input
                  required
                  type="text"
                  className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                  placeholder="www.example.com or @yourhandle"
                />
              </div>

              {/* Community Info */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Tell me about your community</label>
                <p className="text-stone/40 text-sm mb-3">Current size, platform, type — a couple sentences is perfect.</p>
                <textarea
                  rows={3}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="e.g., 500-member Slack community for yoga teachers..."
                />
              </div>

              {/* Challenge */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">What's the biggest challenge you're facing right now?</label>
                <input
                  type="text"
                  className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                  placeholder="Engagement is dropping, members aren't connecting..."
                />
              </div>

              {/* Involvement Level */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-4">How involved do you currently feel in running your community?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: "everything", label: "I'm doing everything" },
                    { value: "most", label: "I'm doing most things" },
                    { value: "some", label: "I'm doing some things" },
                    { value: "barely", label: "I'm barely present" }
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-4 p-4 border border-stone/10 rounded-xl cursor-pointer hover:bg-stone/5 hover:border-stone/20 transition-all group">
                      <input type="radio" name="involvement" value={opt.value} className="radio-custom shrink-0" />
                      <span className="text-stone/70 group-hover:text-stone transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Goals Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Where do you want to be in 6 months?</label>
                  <input
                    type="text"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="Taking a vacation without checking Slack..."
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Why now?</label>
                  <input
                    type="text"
                    className="w-full form-input py-4 text-lg text-stone placeholder:text-stone/30 outline-none"
                    placeholder="I'm burnt out, launching a new program..."
                  />
                </div>
              </div>

              {/* Anything Else */}
              <div className="relative">
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-3">Anything else you want me to know?</label>
                <textarea
                  rows={2}
                  className="w-full form-input py-4 text-lg text-stone resize-none placeholder:text-stone/30 outline-none"
                  placeholder="Optional"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-sand/60 mb-4">Budget Comfort Level</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "1.5-2k", label: "$1.5k–2k/month" },
                    { value: "2-3k", label: "$2k–3k/month" },
                    { value: "not-sure", label: "Not sure yet" }
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 px-5 py-3 border border-stone/10 rounded-full cursor-pointer hover:bg-stone/5 hover:border-stone/20 transition-all group">
                      <input type="radio" name="budget" value={opt.value} className="radio-custom shrink-0" />
                      <span className="text-stone/70 group-hover:text-stone transition-colors text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8">
                <button type="submit" className="btn-primary w-full bg-sand text-evergreen py-5 rounded-full text-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-copper hover:text-stone">
                  Submit Application
                  <ArrowUpRight size={20} />
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
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-serif text-sand mb-6">I take care of the communities I lead.</h2>
          <p className="animate-on-scroll delay-1 text-lg text-stone/60 mb-12 leading-relaxed">
            Your members matter to you. They'll matter to me too. If we work together, I'm all in: steady leadership, real connection, and the kind of facilitation that actually moves people.
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
