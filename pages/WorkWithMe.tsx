
import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Send, ShieldCheck, Mail, 
  Linkedin, Users, Sparkles, Flame, CheckSquare
} from 'lucide-react';

const WorkWithMe: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    name: '',
    email: '',
    business: '',
    source: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate direct email trigger (frontend only logic)
    console.log("Application Submitted to patrick@mcheyser.com", formData);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-2xl p-16 bg-white rounded-[4rem] shadow-2xl text-center border border-stone-100">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-5xl font-black mb-6">Application Received</h1>
          <p className="text-2xl text-slate-600 mb-10 leading-relaxed">
            Thanks {formData.name}. I read every application personally. Expect a response from me within 48 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-emerald-700 font-bold text-xl hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h1 className="text-7xl font-black text-slate-900 mb-8 leading-[0.9] uppercase tracking-tighter">Work With Me</h1>
              <p className="text-2xl text-slate-600 mb-12 italic leading-relaxed">
                "I only take 3-4 clients at a time. If you're serious about building real connection, fill out the application."
              </p>

              <div className="space-y-12 mb-16">
                <div>
                  <h3 className="text-lg font-black text-emerald-700 uppercase tracking-[0.2em] mb-8 flex items-center">
                    <CheckSquare className="mr-3 text-emerald-600" size={24} /> Who Should Apply:
                  </h3>
                  <ul className="space-y-6 text-xl text-slate-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-4 text-emerald-600 shrink-0 mt-1" size={28} />
                      <span>You run a mastermind or high-touch community.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-4 text-emerald-600 shrink-0 mt-1" size={28} />
                      <span>It feels cold, transactional, or transactional.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-4 text-emerald-600 shrink-0 mt-1" size={28} />
                      <span>You care about depth, not just scale.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-4 text-emerald-600 shrink-0 mt-1" size={28} />
                      <span>You're willing to invest $2,500-$5,000/month.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-10 bg-rose-50 rounded-[3rem] border border-rose-100">
                  <h3 className="text-lg font-black text-rose-800 uppercase tracking-[0.2em] mb-6 flex items-center">
                    <XCircle className="mr-3 text-rose-600" size={24} /> Not A Fit If:
                  </h3>
                  <ul className="space-y-4 text-slate-600 italic">
                    <li>• You view community as a "content channel"</li>
                    <li>• You just want daily prompts posted</li>
                    <li>• You're not willing to change your facilitation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white p-12 sm:p-16 rounded-[4rem] shadow-2xl border border-stone-100 relative">
              <div className="absolute -top-8 -right-8 bg-emerald-600 text-white p-6 rounded-3xl shadow-xl rotate-6">
                <Flame size={32} className="animate-pulse" />
              </div>
              
              <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Apply To Work Together</h2>
              <form onSubmit={handleSubmit} className="space-y-10">
                
                <div className="space-y-3">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">1. Tell me about your community or mastermind.*</label>
                  <p className="text-xs text-slate-400">Type, member count, price, duration?</p>
                  <textarea 
                    required 
                    className="w-full p-6 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-700 outline-none h-32"
                    onChange={(e) => setFormData({...formData, q1: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">2. What's not working right now?*</label>
                  <p className="text-xs text-slate-400">Be specific about "cold" or "dead" energy.</p>
                  <textarea 
                    required 
                    className="w-full p-6 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-700 outline-none h-32"
                    onChange={(e) => setFormData({...formData, q2: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">3. What does success look like in 6 months?*</label>
                  <textarea 
                    required 
                    className="w-full p-6 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-700 outline-none h-32"
                    onChange={(e) => setFormData({...formData, q3: e.target.value})}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">4. Why do you think connection is struggling?*</label>
                  <textarea 
                    required 
                    className="w-full p-6 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-700 outline-none h-32"
                    onChange={(e) => setFormData({...formData, q4: e.target.value})}
                  />
                </div>

                <div className="space-y-6">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">5. Ready to invest $2.5k–$5k/mo?*</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Yes, budget is allocated and ready",
                      "Yes, but I'd need to see a proposal first",
                      "Maybe, depends on exact scope",
                      "No, but I might be ready in 3-6 months"
                    ].map((opt) => (
                      <label key={opt} className="flex items-center space-x-4 p-5 bg-stone-50 border border-stone-200 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-colors">
                        <input 
                          type="radio" 
                          name="budget" 
                          value={opt} 
                          required 
                          className="w-5 h-5 accent-emerald-700"
                          onChange={(e) => setFormData({...formData, q5: e.target.value})}
                        />
                        <span className="font-bold text-slate-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Your Name*</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Email*</label>
                    <input 
                      required 
                      type="email" 
                      className="w-full p-5 bg-stone-50 border border-stone-200 rounded-2xl" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-800 text-white py-8 rounded-[2rem] font-black text-2xl hover:bg-emerald-700 transition-all shadow-2xl flex items-center justify-center space-x-3 group"
                >
                  <span>Submit Application</span>
                  <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm italic">
                  <ShieldCheck className="text-emerald-600" size={18} />
                  <span>Room for 1-2 more starting February 2026.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkWithMe;
