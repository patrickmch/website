
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';

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

const HomePage: React.FC = () => {
  const location = useLocation();
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="overflow-hidden" ref={scrollRef}>
      {/* 1. HERO SECTION */}
      <section className="relative bg-stone pt-12 pb-24 md:pt-24 md:pb-32 grain">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="animate-on-scroll inline-flex items-center gap-2 px-4 py-1.5 bg-evergreen/5 rounded-full text-evergreen text-xs font-semibold uppercase tracking-widest mb-6 border border-evergreen/10">
              <Sparkles size={14} className="text-copper" />
              Fractional Community Leadership
            </div>
            <h1 className="animate-on-scroll delay-1 text-5xl md:text-7xl lg:text-8xl font-serif text-evergreen leading-[1.05] mb-8">
              Stop managing your community. <br />
              <span className="text-copper italic">Start leading it.</span>
            </h1>
            <p className="animate-on-scroll delay-2 text-xl md:text-2xl text-charcoal/70 font-light leading-relaxed mb-10">
              I help health & wellness educators build communities that stay engaged, connected, and converting.
            </p>
            <div className="animate-on-scroll delay-3 flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/apply" className="btn-primary w-full sm:w-auto bg-evergreen text-stone px-10 py-5 rounded-full text-lg font-semibold text-center inline-flex items-center justify-center gap-2">
                Apply to Work With Me
                <ArrowUpRight size={20} />
              </Link>
              <Link to="/#services" className="w-full sm:w-auto border-2 border-evergreen/20 text-evergreen px-10 py-5 rounded-full text-lg font-semibold hover:border-evergreen hover:bg-evergreen/5 transition-all text-center">
                See If We're a Fit
              </Link>
            </div>
            <p className="animate-on-scroll delay-4 mt-6 text-sm text-charcoal/40 font-medium ml-2">
              No pressure. Just a conversation.
            </p>
          </div>
          <div className="relative animate-on-scroll delay-2">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white">
              <img
                src="/hero-photo.jpeg"
                alt="Patrick McHeyser"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sand rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-copper/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/* 2. THE TRAP */}
      <section className="bg-evergreen py-24 md:py-32 text-stone relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
          <div className="relative order-2 lg:order-1 animate-on-scroll">
            <div className="aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden relative">
              <img
                src="/overwhelmed.png"
                alt="Overwhelmed community founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-evergreen/60 via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-serif mb-8 text-sand leading-tight">
              Look, you didn't build a community so you could spend your days babysitting engagement.
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-stone/70 font-light">
              <p className="animate-on-scroll delay-1">But here you are. Leading every call. Answering every question. Trying to keep the Facebook group alive. Watching energy fade unless you personally inject it.</p>
              <p className="animate-on-scroll delay-2 font-medium text-stone">And let's be honest: it's draining.</p>
              <p className="animate-on-scroll delay-3">You built this because you wanted freedom. Instead, you feel guilty taking a day off. Your members want connection. Your community wants leadership. And you're stuck being the only one who can give both.</p>
            </div>
            <Link to="/apply" className="animate-on-scroll delay-4 inline-flex items-center gap-3 mt-12 text-copper font-semibold text-xl hover:text-sand transition-colors group">
              Get Support That Doesn't Rely on You
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU ACTUALLY DO (THE VALUE) */}
      <section id="services" className="py-24 md:py-32 bg-stone relative grain">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif text-evergreen mb-8">You need someone who can actually lead your community.</h2>
          <p className="animate-on-scroll delay-1 text-xl text-charcoal/60 max-w-3xl mx-auto mb-16 leading-relaxed">
            You don't need a VA. You don't need another workflow. You don't need more content prompts or automation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { title: "Grounded", desc: "I learn your methodology deeply—the nuance and the \"why\" underneath it." },
              { title: "Responsive", desc: "I facilitate your calls, guide members, and keep momentum steady without forcing it." },
              { title: "Supportive", desc: "I spot who's quiet, who's stuck, and who's ready for the next step." },
              { title: "Alive", desc: "I run your community the way it should be run. You finally get back to creating." }
            ].map((item, i) => (
              <div key={i} className={`animate-on-scroll delay-${i + 1} bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                <h3 className="text-2xl font-serif mb-4 text-evergreen group-hover:text-copper transition-colors">{item.title}</h3>
                <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/apply" className="animate-on-scroll btn-primary bg-evergreen text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2">
            Apply to Work With Me
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* 4. THE TRANSFORMATION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sand via-copper to-evergreen"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-evergreen/5 to-sand/10 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-serif text-evergreen mb-16 text-center">The Transformation</h2>

            <div className="grid md:grid-cols-2 gap-1 rounded-2xl overflow-hidden shadow-xl">
              <div className="animate-on-scroll bg-white p-8 md:p-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/30 mb-10 flex items-center gap-2">
                  <span className="w-8 h-px bg-charcoal/20"></span>
                  Before
                </h3>
                <ul className="space-y-5">
                  {[
                    "Calls fall flat unless you're running them",
                    "Engagement spikes only when you post",
                    "New members feel lost",
                    "You're glued to your group chat",
                    "You feel guilty stepping away",
                    "Growth plateaus because everything depends on you"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-charcoal/60 text-lg group">
                      <XCircle className="text-red-400/70 shrink-0 mt-1 group-hover:text-red-500 transition-colors" size={20} />
                      <span className="group-hover:text-charcoal transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-on-scroll delay-2 bg-evergreen text-stone p-8 md:p-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-copper mb-10 flex items-center gap-2">
                  <span className="w-8 h-px bg-copper"></span>
                  After
                </h3>
                <ul className="space-y-5">
                  {[
                    "Calls run well (even the ones you're not on)",
                    "Members talk to each other, not just you",
                    "New members feel held from day one",
                    "Engagement feels natural",
                    "You take a week off and nothing breaks",
                    "You finally have time to create again"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-stone/90 text-lg group">
                      <CheckCircle2 className="text-copper shrink-0 mt-1 group-hover:text-sand transition-colors" size={20} />
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="animate-on-scroll mt-16 text-center">
              <p className="text-2xl font-serif italic text-evergreen/80 mb-8">"It's not magic. It's facilitation, presence, culture-building, and leadership."</p>
              <Link to="/apply" className="btn-primary bg-copper text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2">
                Let's Build Your Thriving Community
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METHOD - Redesigned */}
      <section className="py-24 md:py-32 bg-stone relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-sand/20 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif text-evergreen mb-6">Community-First Facilitation</h2>
            <p className="animate-on-scroll delay-1 text-xl text-charcoal/50">Content doesn't create connection. <span className="font-semibold text-evergreen">People do.</span></p>
          </div>

          <div className="space-y-0">
            {[
              { title: "Learn your methodology deeply", desc: "The nuance. The philosophy. The \"why\" underneath it." },
              { title: "Facilitate instead of manage", desc: "I hold space, guide discussions, and lead calls with intention and clarity." },
              { title: "Build genuine connection", desc: "Members start supporting each other. That's when retention skyrockets." },
              { title: "Nurture conversations that convert", desc: "People buy when they feel seen. I help them feel seen. No pressure tactics." },
              { title: "Create a community that can sustain itself", desc: "You become the teacher. I protect the culture." }
            ].map((item, i) => (
              <div key={i} className={`animate-on-scroll delay-${i + 1} group`}>
                <div className="flex items-start gap-6 md:gap-10 py-10 border-b border-sand/30 hover:border-copper/50 transition-colors">
                  <span className="text-7xl md:text-8xl font-serif text-evergreen/10 leading-none group-hover:text-copper/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-2xl md:text-3xl font-serif text-evergreen mb-3 group-hover:text-copper transition-colors">{item.title}</h3>
                    <p className="text-charcoal/60 text-lg leading-relaxed max-w-xl">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-on-scroll mt-16 text-center">
            <Link to="/apply" className="btn-primary bg-evergreen text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2">
              See If Your Community's Ready
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHO YOU'RE PERFECT FOR */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-on-scroll bg-gradient-to-br from-evergreen/5 to-evergreen/10 p-10 md:p-12 rounded-[2rem]">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-evergreen mb-10 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={20} />
                You're a Great Fit If
              </h3>
              <ul className="space-y-5">
                {[
                  "You've got 10k–200k followers",
                  "You're making $100k–500k/year",
                  "You've got a clear, teachable methodology",
                  "Community support feels heavy",
                  "You want deeper relationships, not just more posts",
                  "You want to step back without things collapsing",
                  "You have systems handled (or VAs who can)"
                ].map((item, i) => (
                  <li key={i} className="text-lg text-charcoal/70 flex items-start gap-4 group">
                    <span className="w-2 h-2 bg-copper rounded-full shrink-0 mt-2.5 group-hover:scale-150 transition-transform"></span>
                    <span className="group-hover:text-charcoal transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-on-scroll delay-2 bg-stone p-10 md:p-12 rounded-[2rem] border border-sand/30">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-charcoal/30 mb-10 flex items-center gap-3">
                <XCircle className="text-charcoal/20" size={20} />
                Not a Good Fit If
              </h3>
              <ul className="space-y-5">
                {[
                  "You don't have an audience yet",
                  "You want someone to \"do everything\"",
                  "You expect instant results",
                  "You don't want someone else leading calls",
                  "You care more about vanity metrics than people"
                ].map((item, i) => (
                  <li key={i} className="text-lg text-charcoal/40 flex items-start gap-4 italic">
                    <span className="w-2 h-2 bg-charcoal/20 rounded-full shrink-0 mt-2.5"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ME */}
      <section id="about" className="py-24 md:py-32 bg-stone border-t border-sand/30 scroll-mt-24 relative grain">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="space-y-8">
              <h2 className="animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-serif text-evergreen leading-tight">
                The facilitation skills I use today weren't learned in <span className="italic">conference rooms.</span>
              </h2>
              <div className="space-y-6 text-lg text-charcoal/70 font-light leading-relaxed">
                <p className="animate-on-scroll delay-1">For a decade, I facilitated leadership development programs in the wilderness—leading <span className="font-medium text-evergreen">Fortune 500 executive teams, military special operations units, and MBA cohorts</span> through high-stakes environments where trust wasn't optional and you couldn't fake connection.</p>
                <p className="animate-on-scroll delay-2">That's where I learned to read group dynamics, create psychological safety, and turn strangers into functioning teams. Real facilitation skills that most community managers have never developed.</p>
                <p className="animate-on-scroll delay-3">The last three years, I've focused on entrepreneurship—specifically helping wellness entrepreneurs build communities that actually work. I manage communities and masterminds where the results speak for themselves: <span className="font-medium text-evergreen">80-90% retention rates, organic referrals, members who genuinely connect.</span></p>
                <p className="animate-on-scroll delay-4">I also built software systems for years as an engineer, so the technical side doesn't intimidate me. But tech isn't what transforms a cold community into a warm one. <span className="italic">Facilitation is.</span></p>
                <p className="animate-on-scroll delay-5 text-charcoal/50">Based in Boulder, Colorado. When I'm not working: backcountry skiing, rock climbing, trail running.</p>
                <p className="animate-on-scroll text-xl font-medium text-evergreen">I work with founders and coaches who genuinely care about their members and want to build communities that create real transformation.</p>
              </div>
              <Link to="/apply" className="animate-on-scroll btn-primary inline-flex items-center gap-2 bg-evergreen text-stone px-10 py-4 rounded-full font-semibold">
                Apply to Work With Me
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="relative animate-on-scroll lg:translate-x-8">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-white">
                <img
                  src="/about-hero.png"
                  alt="Wilderness leadership"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-56 md:w-72 aspect-square rounded-2xl overflow-hidden border-8 border-white shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <img
                  src="/about-small.jpeg"
                  alt="Patrick McHeyser"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section id="results" className="py-24 md:py-32 bg-evergreen text-stone scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif mb-6 text-sand">Real Communities. Real Results.</h2>
          <p className="animate-on-scroll delay-1 text-lg text-stone/50 mb-16">From founders who took the leap.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                name: "Sarah J.",
                text: "Our community finally feels alive. Members show up on their own, calls run beautifully, and for the first time, I don't feel glued to my screen."
              },
              {
                name: "Michael R.",
                text: "I took a full week off. Nothing fell apart. In fact... things got better. I didn't know that was possible."
              },
              {
                name: "Elena K.",
                text: "Retention jumped from the 60s to the high 80s. Members rave about the community. This was the support I didn't realize I needed."
              }
            ].map((t, i) => (
              <div key={i} className={`animate-on-scroll delay-${i + 1} bg-white/[0.03] backdrop-blur-sm p-10 md:p-12 rounded-[2rem] text-left border border-white/5 flex flex-col justify-between hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group`}>
                <div>
                  <div className="w-14 h-14 rounded-full bg-sand/20 flex items-center justify-center mb-8 text-sand font-serif text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <p className="text-xl font-serif text-stone/90 leading-relaxed mb-8">"{t.text}"</p>
                </div>
                <p className="font-semibold text-copper uppercase tracking-widest text-xs">— {t.name}</p>
              </div>
            ))}
          </div>
          <Link to="/#services" className="link-hover text-sand text-lg uppercase tracking-[0.15em] font-semibold inline-flex items-center gap-2 hover:text-copper transition-colors">
            See If We're a Fit
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 md:py-40 bg-white text-center relative overflow-hidden grain">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-sand/20 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="animate-on-scroll text-4xl md:text-6xl lg:text-7xl font-serif text-evergreen mb-8 leading-tight">
            You don't have to hold your whole community together alone.
          </h2>
          <p className="animate-on-scroll delay-1 text-xl md:text-2xl text-charcoal/50 mb-12 font-light">
            There's a better way. And you can have it.
          </p>
          <Link to="/apply" className="animate-on-scroll delay-2 btn-primary bg-evergreen text-stone px-12 md:px-16 py-5 md:py-6 rounded-full text-xl md:text-2xl font-semibold inline-flex items-center gap-3">
            Apply to Work With Me
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
