
import React, { useState } from 'react';
// Fixed: Imported missing Link component
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, XCircle, Info, ChevronDown, ChevronUp, 
  Search, Zap, Flame, Users, Heart, Sparkles, ArrowRight,
  Target, Rocket, RefreshCw
} from 'lucide-react';
import { getConnectionInsights } from '../services/geminiService';

const HowIWork: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [insightTopic, setInsightTopic] = useState('Executive Masterminds');
  const [insightData, setInsightData] = useState<{ text: string, sources: string[] } | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  const handleFetchInsights = async () => {
    setIsInsightLoading(true);
    const data = await getConnectionInsights(insightTopic);
    setInsightData(data);
    setIsInsightLoading(false);
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 mb-8 uppercase tracking-tighter">How We Work Together</h1>
          <p className="text-2xl text-slate-600 max-w-2xl mx-auto italic leading-relaxed">
            I don't just "manage" your community. I facilitate real human connection. The kind that makes people care.
          </p>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-12 bg-rose-50 rounded-[3rem] border border-rose-100">
              <h3 className="text-2xl font-bold mb-8 text-rose-800 flex items-center italic">
                <XCircle className="mr-3" size={24} /> What I'm NOT
              </h3>
              <ul className="space-y-6 text-xl text-slate-700">
                <li>• A VA who posts daily prompts</li>
                <li>• A "manager" who just moderates</li>
                <li>• A consultant with a generic strategy doc</li>
                <li>• Someone working with 10+ clients at once</li>
              </ul>
            </div>
            <div className="p-12 bg-emerald-50 rounded-[3rem] border border-emerald-100">
              <h3 className="text-2xl font-bold mb-8 text-emerald-800 flex items-center italic">
                <CheckCircle2 className="mr-3" size={24} /> What I AM
              </h3>
              <ul className="space-y-6 text-xl text-slate-700">
                <li>• A facilitator who builds real connection</li>
                <li>• Someone who shifts call energy in real-time</li>
                <li>• A trainer who transfers skills to your team</li>
                <li>• Selective (3-4 clients max, that's it)</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center p-12 bg-slate-900 rounded-[3rem] text-white">
            <p className="text-2xl font-bold">"Real culture change doesn't happen in 30 days. It happens over 3-6 months of consistent, modeled facilitation."</p>
          </div>
        </div>
      </section>

      {/* The 3-Phase Approach */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-20 text-center uppercase tracking-tighter">How I Warm Up A Cold Community</h2>
          
          <div className="space-y-32">
            {/* Phase 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-amber-600 font-black mb-4 uppercase tracking-[0.2em]">Weeks 1-2</div>
                <h3 className="text-4xl font-bold mb-8">Phase 1: Assessment & Quick Wins</h3>
                <div className="space-y-8 text-lg text-slate-600">
                  <p>I join your calls and observe the energy. I have 1:1 conversations with your 5-10 most engaged members to find out what they <em>actually</em> want.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Identifying informal leaders</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Assessment of what's actually wrong</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> First "Energy Shift" implementation</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] border border-stone-200 shadow-xl flex justify-center">
                <Target size={120} className="text-amber-500 opacity-20" />
              </div>
            </div>

            {/* Phase 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2">
                <div className="text-emerald-600 font-black mb-4 uppercase tracking-[0.2em]">Months 1-3</div>
                <h3 className="text-4xl font-bold mb-8">Phase 2: Facilitation & Connection-Building</h3>
                <div className="space-y-8 text-lg text-slate-600">
                  <p>I show up to facilitate breakout experiences where people actually talk. I model the energy you want and introduce members who should know each other.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> High-touch personalized welcomes</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Structured connection rituals</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Recruiting and training informal leaders</li>
                  </ul>
                </div>
              </div>
              <div className="lg:order-1 bg-slate-900 p-12 rounded-[3rem] text-white shadow-xl flex flex-col items-center">
                <Users size={80} className="text-emerald-500 mb-8" />
                <p className="text-center italic">"Members actually talking to each other. Energy that feels alive, not forced."</p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-emerald-800 font-black mb-4 uppercase tracking-[0.2em]">Months 4-6</div>
                <h3 className="text-4xl font-bold mb-8">Phase 3: Sustainability</h3>
                <div className="space-y-8 text-lg text-slate-600">
                  <p>I step back strategically. I train your team to facilitate and empower your informal leaders to lead rituals. I work myself out of a job.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Culture that perpetuates without you</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Repeatable frameworks and rituals</li>
                    <li className="flex items-center"><CheckCircle2 className="text-emerald-600 mr-2" size={20} /> Higher retention through relationships</li>
                  </ul>
                </div>
              </div>
              <div className="bg-emerald-800 p-12 rounded-[3rem] text-white shadow-xl flex justify-center">
                <RefreshCw size={120} className="text-emerald-300 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-black mb-16 text-center uppercase tracking-tighter">Investment & Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Mastermind Facilitation",
                price: "$3,000 – $5,000/mo",
                target: "6–20 person masterminds",
                desc: "Weekly call facilitation, deep member connections, and retreat support."
              },
              {
                title: "Community Transformation",
                price: "$2,500 – $4,000/mo",
                target: "50–500 member communities",
                desc: "High-touch engagement, leader training, and ritual implementation."
              },
              {
                title: "Launch Support",
                price: "$2,500 – $3,500/mo",
                target: "New communities (first 6mo)",
                desc: "Building the culture right from day 1. Ritual creation and team coaching."
              }
            ].map((tier, i) => (
              <div key={i} className="p-12 bg-stone-50 rounded-[3rem] border border-stone-200 hover:border-emerald-500 hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-black mb-2">{tier.title}</h3>
                <div className="text-emerald-700 font-black text-xl mb-4">{tier.price}</div>
                <div className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-8">{tier.target}</div>
                <p className="text-slate-600 leading-relaxed mb-8">{tier.desc}</p>
                {/* Fixed: Link component is now correctly defined via import */}
                <Link to="/work-with-me" className="text-emerald-700 font-bold flex items-center hover:translate-x-2 transition-transform">
                  Apply for this tier <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tool (Facilitation Ritual Generator) */}
      <section className="py-24 bg-emerald-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block p-4 bg-emerald-800 rounded-3xl mb-8">
            <Sparkles className="text-emerald-400" size={40} />
          </div>
          <h2 className="text-4xl font-bold mb-6">Connection Ritual Generator</h2>
          <p className="text-emerald-100/70 mb-12 text-lg">Tell me what kind of group you run, and my AI twin will suggest 3 unique facilitation rituals to build trust fast.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <input 
              type="text" 
              className="flex-grow p-6 bg-emerald-900 border border-emerald-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Health Mastermind, CEO Network, Free Support Group"
              value={insightTopic}
              onChange={(e) => setInsightTopic(e.target.value)}
            />
            <button 
              onClick={handleFetchInsights}
              disabled={isInsightLoading}
              className="bg-emerald-600 px-10 py-6 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isInsightLoading ? <Zap className="animate-spin" /> : <Search />}
              <span>Generate Rituals</span>
            </button>
          </div>

          {insightData && (
            <div className="p-10 bg-emerald-900/50 rounded-[3rem] border border-emerald-800 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-emerald-50 leading-relaxed whitespace-pre-wrap">{insightData.text}</div>
              {/* Fixed: Mandatory extraction and display of URLs when Google Search is used */}
              {insightData.sources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-emerald-800">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">Sources:</p>
                  <ul className="space-y-2">
                    {insightData.sources.map((url, idx) => (
                      <li key={idx}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-300 hover:underline break-all">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-16 text-center uppercase tracking-tighter">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What platforms do you work with?", a: "All of them. Circle, Facebook, Slack, Discord. Platform doesn't matter; facilitation does. I focus on the human interaction layer." },
              { q: "Will you run our calls forever?", a: "No. My goal is sustainability. I'll facilitate initially, train you and your team, then step back so you can maintain the culture without me." },
              { q: "What if our community is really dead?", a: "I've resurrected dead communities before. It usually takes 4-8 weeks to shift the energy, but you must be willing to change your approach." },
              { q: "How do you measure success?", a: "Not by shallow engagement metrics. We look at relationship metrics: member facilitation frequency, referral rates, renewal rates, and off-platform connection." }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-stone-200">
                <button 
                  className="w-full p-8 text-left flex justify-between items-center font-bold text-xl hover:bg-stone-50 transition-colors"
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                >
                  {faq.q}
                  {activeFAQ === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {activeFAQ === i && (
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed text-lg animate-in slide-in-from-top-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowIWork;
