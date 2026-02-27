
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
              Operational Strategy + Technical Execution
            </div>
            <h1 className="animate-on-scroll delay-1 text-5xl md:text-7xl lg:text-8xl font-serif text-evergreen leading-[1.05] mb-8">
              Your operation has friction. <br />
              <span className="text-copper italic">I find it and fix it.</span>
            </h1>
            <p className="animate-on-scroll delay-2 text-xl md:text-2xl text-charcoal/70 font-light leading-relaxed mb-10">
              I help growing companies untangle messy operations, build the right technology, and get closer to their customers — so the business actually scales.
            </p>
            <div className="animate-on-scroll delay-3 flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/apply" className="btn-primary w-full sm:w-auto bg-evergreen text-stone px-10 py-5 rounded-full text-lg font-semibold text-center inline-flex items-center justify-center gap-2">
                Apply for a Consultation
                <ArrowUpRight size={20} />
              </Link>
              <Link to="/#services" className="w-full sm:w-auto border-2 border-evergreen/20 text-evergreen px-10 py-5 rounded-full text-lg font-semibold hover:border-evergreen hover:bg-evergreen/5 transition-all text-center">
                See How I Work
              </Link>
            </div>
            <p className="animate-on-scroll delay-4 mt-6 text-sm text-charcoal/40 font-medium ml-2">
              No pitch. Just a real conversation about what's slowing you down.
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

      {/* 2. THE PROBLEM */}
      <section className="bg-evergreen py-24 md:py-32 text-stone relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
          <div className="relative order-2 lg:order-1 animate-on-scroll">
            <div className="aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden relative">
              <img
                src="/overwhelmed.png"
                alt="Overwhelmed founder fighting their own systems"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-evergreen/60 via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-serif mb-8 text-sand leading-tight">
              You didn't start this company to spend your days fighting your own systems.
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-stone/70 font-light">
              <p className="animate-on-scroll delay-1">But here you are. Processes that made sense at five people are breaking at thirty. Your team is spending hours on work that should take minutes. You know AI and automation could help, but every solution you've looked at feels either too generic or too expensive to figure out.</p>
              <p className="animate-on-scroll delay-2 font-medium text-stone">And the growth side isn't any easier.</p>
              <p className="animate-on-scroll delay-3">You're so busy keeping the engine running that you don't have time to actually talk to your customers, build the partnerships that would open new doors, or think strategically about where the business goes next.</p>
            </div>
            <Link to="/apply" className="animate-on-scroll delay-4 inline-flex items-center gap-3 mt-12 text-copper font-semibold text-xl hover:text-sand transition-colors group">
              You need someone who can do both
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHAT I ACTUALLY DO */}
      <section id="services" className="py-24 md:py-32 bg-stone relative grain">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif text-evergreen mb-8">You don't need another consultant with a slide deck. You need someone who ships.</h2>
          <p className="animate-on-scroll delay-1 text-xl text-charcoal/60 max-w-3xl mx-auto mb-16 leading-relaxed">
            I work inside your operation — not above it. Here's what that looks like.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { title: "Diagnose", desc: "I get inside your workflows, talk to your team, and figure out where time and money are actually being lost. Not where you think they're being lost — where they really are." },
              { title: "Build", desc: "I design and implement the fix. Sometimes that's an AI system. Sometimes it's a custom tool. Sometimes it's restructuring a process that nobody questioned because \"that's how we've always done it.\"" },
              { title: "Connect", desc: "I talk to your customers and partners the way a founder would — with curiosity, not a script. I find out what they actually need and bring that intelligence back so you can act on it." },
              { title: "Operationalize", desc: "I don't hand you a plan and walk away. I stay until the system runs without me. That's the whole point." }
            ].map((item, i) => (
              <div key={i} className={`animate-on-scroll delay-${i + 1} bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                <h3 className="text-2xl font-serif mb-4 text-evergreen group-hover:text-copper transition-colors">{item.title}</h3>
                <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <Link to="/apply" className="animate-on-scroll btn-primary bg-evergreen text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2">
            Apply for a Consultation
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* 4. THE TRANSFORMATION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sand via-copper to-evergreen"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-evergreen/5 to-sand/10 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
            <h2 className="animate-on-scroll text-4xl md:text-5xl font-serif text-evergreen mb-16 text-center">What Changes</h2>

            <div className="grid md:grid-cols-2 gap-1 rounded-2xl overflow-hidden shadow-xl">
              <div className="animate-on-scroll bg-white p-8 md:p-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal/30 mb-10 flex items-center gap-2">
                  <span className="w-8 h-px bg-charcoal/20"></span>
                  Before
                </h3>
                <ul className="space-y-5">
                  {[
                    "Your team wastes hours on repetitive work nobody's automated",
                    "You're guessing what your customers actually want",
                    "New tools get bought but never fully adopted",
                    "Growth depends on you personally doing everything",
                    "Partnerships stall because nobody has time to nurture them",
                    "You know you should be using AI but don't know where to start"
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
                    "Systems handle the repetitive work and your team focuses on what matters",
                    "You have real insight into what customers need — and you're acting on it",
                    "Technology actually fits your operation instead of fighting it",
                    "Growth comes from systems and relationships, not just your hustle",
                    "Partnerships are active, warm, and generating real opportunities",
                    "AI is working for you in the places where it makes the biggest difference"
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
              <p className="text-2xl font-serif italic text-evergreen/80 mb-8">"It's not magic. It's showing up, doing the work, and building things that last."</p>
              <Link to="/apply" className="btn-primary bg-copper text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2">
                Let's Talk About Your Operation
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE METHOD */}
      <section className="py-24 md:py-32 bg-stone relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-sand/20 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif text-evergreen mb-6">How I Work</h2>
            <p className="animate-on-scroll delay-1 text-xl text-charcoal/50">Most consultants audit from the outside and hand you a report. <span className="font-semibold text-evergreen">I work from the inside out.</span></p>
          </div>

          <div className="space-y-0">
            {[
              { title: "Embed", desc: "I learn your business the way a new operator would. I talk to your team. I sit in your workflows. I understand the problem before I touch anything." },
              { title: "Diagnose", desc: "I map where the real friction lives — the bottlenecks, the manual work, the missed connections between your team and your customers. Usually it's not where people think it is." },
              { title: "Build", desc: "I design and implement solutions. AI agents, custom software, workflow tools, partnership frameworks — whatever the diagnosis calls for. I write code. I build systems. I get it into production." },
              { title: "Operationalize", desc: "I make sure it works without me. I train your team, document everything, and stay hands-on until the system is running clean. Then I step back." }
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
              See If This Is Right For You
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHO THIS IS FOR */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-on-scroll bg-gradient-to-br from-evergreen/5 to-evergreen/10 p-10 md:p-12 rounded-[2rem]">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-evergreen mb-10 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" size={20} />
                This Works Well If...
              </h3>
              <ul className="space-y-5">
                {[
                  "You're running a growing company (roughly 10–100 people) and things are getting messy",
                  "You know technology could help but you're not sure where to start",
                  "You want someone who can talk to your engineers AND your customers",
                  "You've got real operational pain — not just a vague feeling that you should \"do AI\"",
                  "You value people who get things done over people who talk about getting things done",
                  "You want a partner who embeds in your business, not one who emails you a PDF"
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
                Probably Not the Right Fit If...
              </h3>
              <ul className="space-y-5">
                {[
                  "You're looking for a traditional management consulting engagement with big deliverable decks",
                  "You need someone to own a full-time role permanently",
                  "You want a pure technical contractor who just writes code to spec",
                  "You're not ready to actually change how things work",
                  "You're looking for the cheapest option"
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
                I learned to lead in the <span className="italic">backcountry.</span> Then I learned to build in code. Now I do both.
              </h2>
              <div className="space-y-6 text-lg text-charcoal/70 font-light leading-relaxed">
                <p className="animate-on-scroll delay-1">For seven years, I ran leadership programs for <span className="font-medium text-evergreen">Fortune 500 executives and military special operations teams</span> at NOLS — the National Outdoor Leadership School. Not team-building retreats. Real expeditions where groups had to function under pressure, make decisions with incomplete information, and trust each other when it mattered.</p>
                <p className="animate-on-scroll delay-2">That's where I learned how people actually work — not the org chart version, but the real version. How to read a room. How to get a stuck group moving. How to build trust fast.</p>
                <p className="animate-on-scroll delay-3">Then I spent years as a software engineer, building CRM systems, workflow tools, and the kind of internal software that either makes a company run smoothly or drives everyone crazy.</p>
                <p className="animate-on-scroll delay-4">Now I put both together. I walk into companies where the operation is tangled, the technology isn't working the way it should, and the people are frustrated. I figure out what's actually broken, build the fix, and make sure it sticks.</p>
                <p className="animate-on-scroll delay-5">I've done <span className="font-medium text-evergreen">AI systems audits for healthcare practices, built custom automation for startups, run go-to-market strategy for early-stage companies,</span> and managed customer relationships for firms that needed someone who could actually listen.</p>
                <p className="animate-on-scroll text-charcoal/50">Based in Colorado. When I'm not working: climbing, skiing, running in the mountains.</p>
                <p className="animate-on-scroll text-xl font-medium text-evergreen">I work with leaders who want things to actually work — not just look good on a slide.</p>
              </div>
              <Link to="/apply" className="animate-on-scroll btn-primary inline-flex items-center gap-2 bg-evergreen text-stone px-10 py-4 rounded-full font-semibold">
                Apply for a Consultation
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
          <h2 className="animate-on-scroll text-4xl md:text-6xl font-serif mb-6 text-sand">What People Say</h2>
          <p className="animate-on-scroll delay-1 text-lg text-stone/50 mb-16">From leaders who brought me in.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              {
                name: "Name TBD",
                text: "Patrick came in, figured out what was actually broken in about a week, and then built the solution himself. Most consultants would've taken a month just to write the report."
              },
              {
                name: "Name TBD",
                text: "He's the rare person who can sit in a technical architecture meeting and then have a warm, human conversation with a frustrated customer — and be great at both."
              },
              {
                name: "Name TBD",
                text: "We were drowning in manual processes. Patrick automated the painful stuff and trained our team to maintain it. Six months later, it still runs clean."
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
            See How I Work
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 md:py-40 bg-white text-center relative overflow-hidden grain">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-sand/20 to-transparent rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 relative">
          <h2 className="animate-on-scroll text-4xl md:text-6xl lg:text-7xl font-serif text-evergreen mb-8 leading-tight">
            You've got a great business with a messy operation. Let's fix that.
          </h2>
          <p className="animate-on-scroll delay-1 text-xl md:text-2xl text-charcoal/50 mb-12 font-light">
            One conversation. No pitch. Just an honest look at what's not working and what we could do about it.
          </p>
          <Link to="/apply" className="animate-on-scroll delay-2 btn-primary bg-evergreen text-stone px-12 md:px-16 py-5 md:py-6 rounded-full text-xl md:text-2xl font-semibold inline-flex items-center gap-3">
            Apply for a Consultation
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
