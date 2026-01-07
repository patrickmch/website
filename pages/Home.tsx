
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Users, Flame, Zap, ShieldCheck, 
  Map, Compass, MessageSquare, CheckCircle2, Quote,
  Wind, Ghost, RefreshCw, Star, Heart
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-50 py-24 sm:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-amber-200">
                <Flame size={16} className="text-amber-600 animate-pulse" />
                <span>Working with 3 masterminds and communities right now.</span>
              </div>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.95]">
                Your community <span className="text-amber-600">is cold.</span><br />
                I warm it up.
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
                I facilitate genuine connections in communities and masterminds. Not just 'post more content.' Actual human-to-human relationships that make people want to show up.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                <Link
                  to="/work-with-me"
                  className="bg-emerald-900 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-emerald-800 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center group"
                >
                  Apply To Work Together
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/how-i-work"
                  className="bg-white text-slate-900 border-2 border-slate-200 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-stone-50 transition-all flex items-center justify-center"
                >
                  The Process
                </Link>
              </div>
            </div>

            {/* Right Column: Patrick's Portrait */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-amber-200 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative overflow-hidden rounded-[3rem] border-8 border-white shadow-2xl w-[320px] h-[400px] sm:w-[400px] sm:h-[500px]">
                  <img 
                    src="patrick-headshot.jpg" 
                    alt="Patrick McHeyser" 
                    className="w-full h-full object-cover grayscale-0 hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Trust Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-stone-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        FACILITATION SPECIALIST<br/>
                        <span className="text-slate-400 font-medium">BOULDER, CO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path fill="#064e3b" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 uppercase tracking-tighter">You Built It. It's Empty.</h2>
            <div className="w-20 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Ghost className="text-slate-400" size={32} />,
                title: "The Ghost Town",
                desc: "You have 200 members. Five people actually engage. Everyone else just lurks. Or worse, they forgot they joined."
              },
              {
                icon: <Users className="text-slate-400" size={32} />,
                title: "No Real Connections",
                desc: "Members interact with YOU, not each other. You're the hub, but you wanted a network. You're exhausted."
              },
              {
                icon: <Wind className="text-slate-400" size={32} />,
                title: "Dead Mastermind Energy",
                desc: "People show up to calls, barely participate, and leave immediately. No real relationships forming between sessions."
              },
              {
                icon: <RefreshCw className="text-slate-400" size={32} />,
                title: "Copy-Paste Community",
                desc: "You followed all the 'community playbooks.' Welcome sequences. Weekly prompts. It all feels... flat. Transactional."
              }
            ].map((p, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-stone-50 border border-stone-100 hover:border-amber-200 transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center max-w-3xl mx-auto">
            <p className="text-2xl font-bold text-slate-800 leading-relaxed italic">
              "This isn't a content problem. It's not a platform problem. It's a facilitation problem. And most community managers don't know how to facilitate breakthrough connections."
            </p>
          </div>
        </div>
      </section>

      {/* The Difference Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-6xl font-black mb-6">Why Wilderness Leadership Changes Everything</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">I spent 7 years leading 300+ people through multi-week wilderness expeditions. Trust isn't optional out there.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="relative p-8 bg-slate-800/50 rounded-3xl border border-slate-700">
                <h3 className="text-2xl font-bold mb-6 text-emerald-400">Most Community Managers:</h3>
                <p className="text-slate-400 mb-6">Great at posting prompts and managing platforms, but they've never:</p>
                <ul className="space-y-4">
                  {['Facilitated a group of strangers into a team', 'Created safety in high-stakes environments', 'Read group energy and shifted it in real-time'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm italic">
                      <XCircleIcon className="text-rose-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-8 bg-emerald-900/30 rounded-3xl border border-emerald-800/50">
                <h3 className="text-2xl font-bold mb-6 text-emerald-400">I Do It Differently:</h3>
                <p className="text-slate-300 mb-6">Fortune 500 executives, military special forces, and midshipmen taught me that connection is built in the "shift" from surface to real.</p>
                <ul className="space-y-4">
                  {['Accelerating trust through structured vulnerability', 'Identifying informal leaders to anchor the culture', 'Creating self-sustaining connection rituals'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm font-semibold">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-amber-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 p-12 rounded-[3rem] border border-slate-800 shadow-2xl">
                <h3 className="text-3xl font-black mb-10 text-emerald-500">The Result:</h3>
                <div className="space-y-10">
                  <div className="flex space-x-6">
                    <div className="p-4 bg-emerald-800 rounded-2xl h-fit text-white"><Flame size={28} /></div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Cold to Warm</h4>
                      <p className="text-slate-400">Communities become warm and vibrant in 4-6 weeks.</p>
                    </div>
                  </div>
                  <div className="flex space-x-6">
                    <div className="p-4 bg-emerald-800 rounded-2xl h-fit text-white"><Users size={28} /></div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Relationship-Led</h4>
                      <p className="text-slate-400">Members text daily and facilitate for each other without you.</p>
                    </div>
                  </div>
                  <div className="flex space-x-6">
                    <div className="p-4 bg-emerald-800 rounded-2xl h-fit text-white"><Zap size={28} /></div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-white">Actual Friendships</h4>
                      <p className="text-slate-400">Higher retention because people stay for the people.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What Happens When People Actually Connect</h2>
            <p className="text-slate-600 text-lg italic">These aren't engagement metrics. They're relationship metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Health Coaching Mastermind",
                stats: ["100% Renewal Rate", "Texting Daily", "Business Partnerships"],
                quote: "I thought I needed better curriculum. Patrick showed me I needed better facilitation."
              },
              {
                title: "Wellness Community",
                stats: ["3% → 22% Engagement", "Retention up 40%", "10h/wk Saved"],
                quote: "Now I barely have to show up and it's thriving."
              },
              {
                title: "Professional Network",
                stats: ["92% Renewal Rate", "Deep Trust Established", "Referral Waiting List"],
                quote: "This is the first one where I made actual friends."
              }
            ].map((study, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-emerald-600 font-black mb-4 uppercase tracking-[0.2em] text-xs">Result #{i+1}</div>
                  <h3 className="text-2xl font-bold mb-8">{study.title}</h3>
                  <ul className="space-y-4 mb-12">
                    {study.stats.map((s, si) => (
                      <li key={si} className="flex items-center text-slate-600 font-medium">
                        <CheckCircle2 size={16} className="text-emerald-500 mr-2" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8 border-t border-stone-50 italic text-slate-400 text-sm">
                  "{study.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-emerald-950 text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-tight">Let's Build A Community People Actually Care About</h2>
          <p className="text-xl text-emerald-100/70 mb-12">
            I only work with 3-4 clients at a time. If you're serious about building real connection, fill out the application.
          </p>
          <div className="flex flex-col items-center">
            <Link
              to="/work-with-me"
              className="bg-emerald-600 text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-emerald-500 transition-all shadow-2xl hover:scale-105"
            >
              Apply To Work Together
            </Link>
            <p className="mt-8 text-emerald-200/50 flex items-center font-medium">
              <ShieldCheck className="mr-2" size={20} />
              Room for 1-2 more starting February 2026.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

export default Home;
