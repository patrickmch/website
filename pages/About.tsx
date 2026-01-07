
import React from 'react';
import { 
  Users, Layers, Zap, Map, Terminal, 
  Mountain, Star, Anchor, BookOpen, Heart,
  Search, ShieldAlert, Flame, CheckCircle2, Quote
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Intro */}
      <section className="py-24 bg-stone-50 border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl sm:text-7xl font-black text-slate-900 mb-8 leading-[0.9]">
                I didn't start in community.<br />
                <span className="text-emerald-700 italic">I started in the wilderness.</span>
              </h1>
              <p className="text-2xl text-slate-600 leading-relaxed mb-8">
                I bring wilderness facilitation skills to online communities and masterminds. Because when you're 40 miles from a road, trust isn't optional.
              </p>
            </div>
            <div className="relative group">
              <img 
                src="patrick-headshot.jpg" 
                alt="Patrick McHeyser" 
                className="rounded-[4rem] shadow-2xl border-4 border-white transition-all duration-1000"
              />
              <div className="absolute -bottom-10 -left-10 bg-slate-900 text-white p-12 rounded-3xl shadow-2xl max-w-sm border border-slate-700">
                <p className="font-bold text-xl leading-snug italic">"You can't fake connection in the backcountry. You either build trust, or the team falls apart."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {/* Wilderness Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="col-span-1">
                <div className="p-5 bg-emerald-50 rounded-2xl inline-block mb-6">
                  <Mountain className="text-emerald-700" size={40} />
                </div>
                <h2 className="text-4xl font-black mb-4">7 Years Leading Expeditions</h2>
                <div className="text-emerald-700 font-black uppercase tracking-widest text-sm">2016 – 2023</div>
                
                {/* Climbing Action Image */}
                <div className="mt-8 relative group overflow-hidden rounded-3xl">
                   <img 
                    src="patrick-climbing.jpg" 
                    alt="Patrick Climbing" 
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                </div>
              </div>
              <div className="col-span-2 text-xl text-slate-600 space-y-6 leading-relaxed">
                <p>
                  I led 300+ people through multi-week wilderness expeditions for NOLS. Fortune 500 executives. Military special forces. Midshipmen.
                </p>
                <p>
                  Expeditions are a pressure cooker for group dynamics. I learned to read people before they spoke. How to create psychological safety when the stakes were literally life or death. How to facilitate breakthroughs, not just "discussions."
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-900 pt-6 uppercase tracking-widest">
                  <div className="flex items-center"><Star size={18} className="mr-3 text-amber-500" /> Reading Energy</div>
                  <div className="flex items-center"><Star size={18} className="mr-3 text-amber-500" /> Group Breakthroughs</div>
                  <div className="flex items-center"><Star size={18} className="mr-3 text-amber-500" /> Psychological Safety</div>
                  <div className="flex items-center"><Star size={18} className="mr-3 text-amber-500" /> Accelerating Trust</div>
                </div>
              </div>
            </div>

            {/* Software Engineering Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="col-span-1">
                <div className="p-5 bg-slate-100 rounded-2xl inline-block mb-6 text-slate-700">
                  <Terminal size={40} />
                </div>
                <h2 className="text-4xl font-black mb-4">5 Years Building Systems</h2>
                <div className="text-slate-500 font-black uppercase tracking-widest text-sm">2015 – 2020</div>
              </div>
              <div className="col-span-2 text-xl text-slate-600 leading-relaxed">
                <p>
                  I taught myself to code and built CRMs, dashboards, and automation. I understand how platforms work and what drives metrics. 
                </p>
                <p className="mt-6">
                  But I learned that the technical side is often used as a distraction from the human side. Brilliant engineers build perfect platforms that nobody connects on. I focus on the overlap.
                </p>
              </div>
            </div>

            {/* Now Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="col-span-1">
                <div className="p-5 bg-amber-50 rounded-2xl inline-block mb-6 text-amber-600">
                  <Flame size={40} />
                </div>
                <h2 className="text-4xl font-black mb-4">Fractional Facilitation</h2>
                <div className="text-amber-600 font-black uppercase tracking-widest text-sm">Now</div>
              </div>
              <div className="col-span-2 text-xl text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900 mb-6 text-2xl">
                  Most community managers have never facilitated a breakthrough. They've moderated discussions. I've built trust in high-stakes environments.
                </p>
                <p>
                  I bring those wilderness skills to online groups. I facilitate real human connection—the kind that creates retention because people actually care about each other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-5xl sm:text-7xl font-black mb-8 leading-tight">Community Isn't Content.<br /><span className="text-emerald-500">It's Connection.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Content Doesn't Create Community",
                desc: "Engagement is about creating conditions where people feel safe enough to be real. You can post prompts daily, but if people don't feel safe, it's just noise."
              },
              {
                title: "Vulnerability Is A Skill",
                desc: "Depth comes from vulnerability. It doesn't happen by accident; it's facilitated through modeling, consistent containers, and deep listening."
              },
              {
                title: "Empower Informal Leaders",
                desc: "If you're the hub, you're the bottleneck. I train your members to facilitate for each other, making the community self-sustaining."
              },
              {
                title: "I Work Myself Out Of A Job",
                desc: "I build the culture and transfer the skills. You need me intensely for 3-6 months, then only strategically as your community evolves."
              }
            ].map((phi, i) => (
              <div key={i} className="bg-slate-800 p-12 rounded-[3rem] border border-slate-700 hover:border-emerald-500 transition-all duration-500">
                <div className="text-emerald-500 font-black mb-4">0{i+1}</div>
                <h3 className="text-2xl font-bold mb-6">{phi.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{phi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Mountains Are Non-Negotiable</h2>
              <p className="text-xl text-slate-600 mb-6">Based in Boulder, Colorado. When I'm not facilitating breakthroughs, I'm backcountry skiing, rock climbing, or trail running.</p>
              <p className="text-xl text-slate-600 mb-12">Building a life with my partner Megan focused on adventure and intentional living. Also: occasionally terrible karaoke.</p>
              
              <div className="bg-emerald-800 text-white p-10 rounded-[2.5rem] shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Why I Do This</h3>
                <p className="text-emerald-100 leading-relaxed text-lg italic">
                  "I believe community is where transformation happens. But most online communities are shallow—optimizing for metrics, not meaning. I want to help you build something that actually matters to people."
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img src="patrick-mountain.jpg" className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform w-full h-auto object-cover" />
              <img src="https://picsum.photos/seed/boulder-mountains/400/600" className="rounded-3xl shadow-2xl -rotate-2 mt-12 hover:rotate-0 transition-transform w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
