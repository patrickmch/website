
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, MessageSquare, ShieldCheck, HeartPulse, Compass, Users, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const location = useLocation();

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
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-stone pt-12 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sand/30 rounded-full text-evergreen text-xs font-bold uppercase tracking-widest mb-6 border border-sand/50">
               <Sparkles size={14} className="text-copper" />
               Fractional Community Leadership
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-evergreen leading-[1.1] mb-8">
              Your community should thrive <span className="italic">without you.</span> <br />
              <span className="text-copper">And it can.</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/80 font-light leading-relaxed mb-10">
              I help health & wellness educators build communities that stay engaged, connected, and converting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link to="/apply" className="w-full sm:w-auto bg-evergreen text-stone px-10 py-5 rounded-full text-lg font-semibold hover:bg-evergreen/90 transition-all shadow-xl hover:translate-y-[-2px] text-center">
                👉 Apply to Work With Me
              </Link>
              <Link to="/#services" className="w-full sm:w-auto border-2 border-evergreen/20 text-evergreen px-10 py-5 rounded-full text-lg font-semibold hover:border-evergreen transition-all text-center">
                👉 See If We’re a Fit
              </Link>
            </div>
            <p className="mt-6 text-sm text-charcoal/50 font-medium ml-2 italic">
              "No pressure. Just a conversation."
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000" 
                alt="Confident community leader" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sand rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-copper/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
          </div>
        </div>
      </section>

      {/* 2. THE TRAP */}
      <section className="bg-evergreen py-24 md:py-32 text-stone relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center p-8">
                  <MessageSquare size={48} className="text-sand/40" />
               </div>
               <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center p-8 translate-y-8">
                  <ShieldCheck size={48} className="text-sand/40" />
               </div>
               <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center p-8">
                  <HeartPulse size={48} className="text-sand/40" />
               </div>
               <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center p-8 translate-y-8">
                  <Compass size={48} className="text-sand/40" />
               </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-sand leading-tight">
              Look, you didn’t build a community so you could spend your days babysitting engagement.
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-stone/80 font-light">
              <p>But here you are. Leading every call. Answering every question. Trying to keep the Facebook group alive. Watching energy fade unless you personally inject it.</p>
              <p className="font-normal text-stone">And let's be honest: it’s draining.</p>
              <p>You built this because you wanted freedom. Instead, you feel guilty taking a day off. Your members want connection. Your community wants leadership. And you’re stuck being the only one who can give both.</p>
            </div>
            <Link to="/apply" className="inline-flex items-center gap-2 mt-12 text-copper font-bold text-xl hover:text-sand transition-colors group">
              👉 Get Support That Doesn’t Rely on You <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU ACTUALLY DO (THE VALUE) */}
      <section id="services" className="py-24 md:py-32 bg-stone">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-evergreen mb-8">You need someone who can actually lead your community.</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto mb-16 leading-relaxed">
            You don’t need a VA. You don’t need another workflow. You don’t need more content prompts or automation.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif mb-4 text-evergreen">Grounded</h3>
              <p className="text-charcoal/70 leading-relaxed">I learn your methodology deeply—the nuance and the “why” underneath it.</p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif mb-4 text-evergreen">Responsive</h3>
              <p className="text-charcoal/70 leading-relaxed">I facilitate your calls, guide members, and keep momentum steady without forcing it.</p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif mb-4 text-evergreen">Supportive</h3>
              <p className="text-charcoal/70 leading-relaxed">I spot who’s quiet, who’s stuck, and who’s ready for the next step.</p>
            </div>
             <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-sand/20 text-left hover:shadow-xl transition-all">
              <h3 className="text-2xl font-serif mb-4 text-evergreen">Alive</h3>
              <p className="text-charcoal/70 leading-relaxed">I run your community the way it should be run. You finally get back to creating.</p>
            </div>
          </div>
          
          <Link to="/apply" className="bg-evergreen text-stone px-12 py-5 rounded-full text-xl font-semibold hover:bg-evergreen/90 transition-all shadow-lg inline-block">
            👉 Apply to Work With Me
          </Link>
        </div>
      </section>

      {/* 4. THE TRANSFORMATION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-evergreen/5 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <h2 className="text-4xl md:text-5xl font-serif text-evergreen mb-16 text-center">The Transformation</h2>
            
            <div className="grid md:grid-cols-2 gap-px bg-sand/30">
              <div className="bg-white/40 backdrop-blur-sm p-12">
                <h3 className="text-2xl font-bold text-charcoal uppercase tracking-widest text-sm mb-10 opacity-40">Before</h3>
                <ul className="space-y-6">
                  {[
                    "Calls fall flat unless you’re running them",
                    "Engagement spikes only when you post",
                    "New members feel lost",
                    "You’re glued to your group chat",
                    "You feel guilty stepping away",
                    "Growth plateaus because everything depends on you"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-charcoal/70 text-lg">
                      <XCircle className="text-red-400 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-evergreen text-stone p-12">
                <h3 className="text-2xl font-bold text-sand uppercase tracking-widest text-sm mb-10 opacity-60">After</h3>
                <ul className="space-y-6">
                  {[
                    "Calls run well (even the ones you’re not on)",
                    "Members talk to each other, not just you",
                    "New members feel held from day one",
                    "Engagement feels natural",
                    "You take a week off and nothing breaks",
                    "You finally have time to create again"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 text-stone text-lg">
                      <CheckCircle2 className="text-copper shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-16 text-center">
                <p className="text-2xl font-serif italic text-evergreen mb-8 italic">"It's not magic. It's facilitation, presence, culture-building, and leadership."</p>
                <Link to="/apply" className="bg-copper text-stone px-12 py-5 rounded-full text-xl font-semibold hover:bg-copper/90 transition-all shadow-lg inline-block">
                    👉 Let’s Build Your Thriving Community
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METHOD */}
      <section className="py-24 md:py-32 bg-stone relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-evergreen mb-6">Community-First Facilitation™</h2>
            <p className="text-xl text-charcoal/60">Content doesn't create connection. <span className="font-bold text-evergreen">People do.</span></p>
          </div>
          
          <div className="space-y-16 relative">
             <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-sand/50 -translate-x-px"></div>
             {[
               { title: "Learn your methodology deeply", desc: "The nuance. The philosophy. The “why” underneath it." },
               { title: "Facilitate instead of manage", desc: "I hold space, guide discussions, and lead calls with intention and clarity." },
               { title: "Build genuine connection", desc: "Members start supporting each other. That’s when retention skyrockets." },
               { title: "Nurture conversations that convert", desc: "People buy when they feel seen. I help them feel seen. No pressure tactics." },
               { title: "Create a community that can sustain itself", desc: "You become the teacher. I protect the culture." }
             ].map((item, i) => (
               <div key={i} className={`flex flex-col md:flex-row gap-8 items-start relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="absolute left-[-5px] md:left-1/2 w-3 h-3 bg-copper rounded-full md:-translate-x-[6.5px] z-10"></div>
                 <div className="md:w-1/2 flex flex-col items-start md:items-end md:text-right">
                   <span className="text-6xl font-serif text-evergreen/10 mb-2">{i + 1}</span>
                   <h3 className="text-2xl font-serif text-evergreen mb-3">{item.title}</h3>
                   <p className="text-charcoal/70 leading-relaxed text-lg">{item.desc}</p>
                 </div>
                 <div className="md:w-1/2"></div>
               </div>
             ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link to="/apply" className="bg-evergreen text-stone px-12 py-5 rounded-full text-xl font-semibold hover:bg-evergreen/90 transition-all shadow-lg inline-block">
                👉 See If Your Community’s Ready
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHO YOU'RE PERFECT FOR */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-16">
             <div className="bg-evergreen/5 p-12 rounded-[2rem]">
               <h3 className="text-2xl font-bold uppercase tracking-widest text-evergreen mb-8 flex items-center gap-3">
                 <CheckCircle2 className="text-green-600" /> You're a Great Fit If:
               </h3>
               <ul className="space-y-6">
                 {[
                   "You’ve got 10k–200k followers",
                   "You’re making $100k–500k/year",
                   "You’ve got a clear, teachable methodology",
                   "Community support feels heavy",
                   "You want deeper relationships, not just more posts",
                   "You want to step back without things collapsing",
                   "You have systems handled (or VAs who can)"
                 ].map((item, i) => (
                   <li key={i} className="text-lg text-charcoal/80 flex items-start gap-3">
                     <span className="w-1.5 h-1.5 bg-copper rounded-full shrink-0 mt-3"></span>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
             
             <div className="bg-stone p-12 rounded-[2rem] border border-sand/20">
               <h3 className="text-2xl font-bold uppercase tracking-widest text-charcoal/40 mb-8 flex items-center gap-3">
                 <XCircle className="text-charcoal/20" /> Not a Good Fit If:
               </h3>
               <ul className="space-y-6">
                 {[
                   "You don’t have an audience yet",
                   "You want someone to “do everything”",
                   "You expect instant results",
                   "You don’t want someone else leading calls",
                   "You care more about vanity metrics than people"
                 ].map((item, i) => (
                   <li key={i} className="text-lg text-charcoal/50 flex items-start gap-3 italic">
                     <span className="w-1.5 h-1.5 bg-charcoal/20 rounded-full shrink-0 mt-3"></span>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
           </div>
        </div>
      </section>

      {/* 7. ABOUT ME (Bio Integrated) */}
      <section id="about" className="py-24 md:py-32 bg-stone border-t border-sand/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-serif text-evergreen leading-tight">
                The community work I do today started <span className="italic">long before</span> online business.
              </h2>
              <div className="space-y-6 text-lg text-charcoal/80 font-light leading-relaxed">
                <p className="text-2xl font-serif text-evergreen italic">The Short Story</p>
                <p>I’ve spent the last 10 years building communities in places where connection wasn’t optional. I started as a wilderness guide. Not the campfire version. The high-stakes version.</p>
                <p>I spent years facilitating leadership programs for <span className="font-semibold text-evergreen">Fortune 500 executive teams, military special operations groups, and MBA programs.</span></p>
                <p>Real teams. Real pressure. Real people who needed to trust each other fast. That’s where I learned how to read group dynamics, build psychological safety, and turn strangers into teams by the end of the day. Skills most “community managers” never develop.</p>
                <p className="text-2xl font-serif text-evergreen italic">The Transition</p>
                <p>Later, I moved into tech and spent time as a software engineer. Which means I understand the systems side too. But the facilitation? That was the thing I couldn’t ignore. So I took everything I learned out in the field: group dynamics, human behavior, leadership, emotional intelligence, and brought it into online communities.</p>
                <p>And everything clicked.</p>
                <p className="text-2xl font-serif text-evergreen italic">Where I Am Now</p>
                <p>Today I actively manage and facilitate online communities for wellness educators, coaches, and founders who care deeply about their work. I’m based in Boulder, Colorado. If I’m not in a Zoom room, I’m probably skiing, climbing, or running a ridgeline somewhere. Helping you build a community that matters and doesn’t depend on you to hold it together.</p>
              </div>
              <Link to="/apply" className="inline-block bg-evergreen text-stone px-10 py-4 rounded-full font-bold hover:bg-copper transition-all shadow-xl">
                👉 Apply to Work With Me
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
                  alt="Boulder, Colorado wilderness" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-12 -left-8 w-72 aspect-square rounded-2xl overflow-hidden border-8 border-white shadow-2xl rotate-[-3deg]">
                 <img 
                   src="https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=600" 
                   alt="M. Heyser in natural setting" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section id="results" className="py-24 md:py-32 bg-evergreen text-stone scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-20 text-sand">Real Communities. Real Results.</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                name: "Sarah J.",
                text: "Our community finally feels alive. Members show up on their own, calls run beautifully, and for the first time, I don’t feel glued to my screen."
              },
              {
                name: "Michael R.",
                text: "I took a full week off. Nothing fell apart. In fact… things got better. I didn’t know that was possible."
              },
              {
                name: "Elena K.",
                text: "Retention jumped from the 60s to the high 80s. Members rave about the community. This was the support I didn’t realize I needed."
              }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-12 rounded-[2rem] text-left border border-white/10 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
                <div>
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-8 border-2 border-sand/50">
                    <img src={`https://i.pravatar.cc/150?u=${t.name}`} alt={t.name} />
                  </div>
                  <p className="text-xl font-serif text-sand leading-relaxed italic mb-8">“{t.text}”</p>
                </div>
                <p className="font-bold text-copper uppercase tracking-widest text-xs">— {t.name}</p>
              </div>
            ))}
          </div>
          <Link to="/#services" className="text-sand border-b border-sand/30 pb-2 hover:text-copper hover:border-copper transition-all text-lg uppercase tracking-[0.2em] font-bold">
            👉 See If We’re a Fit
          </Link>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-24 md:py-40 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-serif text-evergreen mb-8">
            You don’t have to hold your whole community together alone.
          </h2>
          <p className="text-2xl text-charcoal/60 mb-12 font-light">
            There’s a better way. And you can have it.
          </p>
          <Link to="/apply" className="bg-evergreen text-stone px-16 py-6 rounded-full text-2xl font-bold hover:bg-copper transition-all shadow-2xl hover:translate-y-[-4px]">
            👉 Apply to Work With Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
