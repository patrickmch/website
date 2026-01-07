
import React, { useState } from 'react';
import { MessageSquare, Heart, Shield } from 'lucide-react';

const ApplyPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center px-6">
        <div className="max-w-2xl bg-white p-12 md:p-20 rounded-[3rem] shadow-xl text-center">
          <div className="w-20 h-20 bg-evergreen/10 text-evergreen rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart size={40} />
          </div>
          <h2 className="text-4xl font-serif text-evergreen mb-6">Application Received</h2>
          <p className="text-xl text-charcoal/70 leading-relaxed mb-8">
            Thank you for being so open. I personally read every application and will get back to you within 48 hours to discuss next steps.
          </p>
          <button 
            onClick={() => window.location.href = '#/'}
            className="text-evergreen font-bold uppercase tracking-widest border-b-2 border-evergreen/20 hover:border-evergreen transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone">
      {/* Hero */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-evergreen mb-6">Let’s see if your community is ready for real support.</h1>
        <p className="text-xl md:text-2xl text-charcoal/60 max-w-3xl mx-auto font-light leading-relaxed">
          No pressure, no hard sell. Just a good conversation to see if this is the right fit for you and your members.
        </p>
      </section>

      {/* Expectation Cards */}
      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageSquare className="text-copper" size={32} />,
              title: "You tell me about your community.",
              desc: "Where it is now, where you want it to go, what’s getting in the way."
            },
            {
              icon: <Shield className="text-copper" size={32} />,
              title: "I’ll give you honest feedback.",
              desc: "If I’m not the right person, I’ll tell you. And I’ll explain why."
            },
            {
              icon: <Heart className="text-copper" size={32} />,
              title: "If it’s a match, we’ll talk next steps.",
              desc: "Clear, simple, grounded. No “closing tactics.”"
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-sand/20 shadow-sm">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-serif text-evergreen mb-4">{item.title}</h3>
              <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section - Updated to bg-evergreen for a dark themed high-intent form */}
      <section className="pb-32 max-w-4xl mx-auto px-6">
        <div className="bg-evergreen p-10 md:p-20 rounded-[3rem] shadow-2xl text-stone">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Your Name</label>
                <input required type="text" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone placeholder:text-stone/30" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Email Address</label>
                <input required type="email" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone placeholder:text-stone/30" placeholder="jane@example.com" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Business Website / Instagram</label>
              <input required type="text" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone placeholder:text-stone/30" placeholder="www.example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Tell me about your community. (Current size, platform, type)</label>
              <textarea rows={3} className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone resize-none placeholder:text-stone/30" placeholder="Keep it simple. A couple sentences is perfect." />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">What’s the biggest challenge you’re facing right now?</label>
              <input type="text" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone placeholder:text-stone/30" placeholder="Engagement is dropping..." />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">How involved do you currently feel in running your community?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["“I’m doing everything”", "“I’m doing most things”", "“I’m doing some things”", "“I’m barely present”"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-4 border border-stone/10 rounded-xl cursor-pointer hover:bg-stone/5 transition-all">
                    <input type="radio" name="involvement" value={opt} className="accent-copper w-4 h-4" />
                    <span className="text-stone/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Where do you want to be in 6 months?</label>
                <input type="text" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Why now?</label>
                <input type="text" className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Anything else you want me to know?</label>
              <textarea rows={2} className="bg-transparent border-b-2 border-stone/20 py-3 outline-none focus:border-copper transition-all text-lg text-stone resize-none" />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm font-bold uppercase tracking-widest text-sand/60">Budget Comfort Level</label>
              <div className="flex flex-wrap gap-4">
                {["$1.5k–2k/month", "$2k–3k/month", "Not sure yet. Want to talk first"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 p-4 border border-stone/10 rounded-xl cursor-pointer hover:bg-stone/5 transition-all">
                    <input type="radio" name="budget" value={opt} className="accent-copper w-4 h-4" />
                    <span className="text-stone/80">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-8 text-center">
              <button type="submit" className="w-full bg-sand text-evergreen py-6 rounded-full text-xl font-bold hover:bg-copper hover:text-stone transition-all shadow-xl">
                Submit Application
              </button>
              <p className="mt-4 text-sm text-stone/40 font-medium">
                You’ll hear back within 48 hours.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Trust Reinforcement */}
      <section className="py-24 bg-evergreen text-stone text-center border-t border-white/5">
         <div className="max-w-2xl mx-auto px-6">
           <h2 className="text-4xl font-serif text-sand mb-6">I take care of the communities I lead.</h2>
           <p className="text-lg text-stone/70 mb-12 leading-relaxed">
             Your members matter to you. They’ll matter to me too. If we work together, I’m all in: steady leadership, real connection, and the kind of facilitation that actually moves people.
           </p>
           <button 
             onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
             className="text-copper font-bold uppercase tracking-widest border-b-2 border-copper/20 hover:border-copper transition-all"
           >
             Start Your Application
           </button>
         </div>
      </section>
    </div>
  );
};

export default ApplyPage;
