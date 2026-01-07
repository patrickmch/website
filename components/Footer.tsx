
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-stone py-12 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 border-b border-white/5 pb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-sand max-w-2xl mx-auto">
            You don’t have to hold your whole community together alone.
          </h2>
          <p className="text-xl text-stone/60 mb-10 font-light">
            There’s a better way. And you can have it.
          </p>
          <Link to="/apply" className="bg-copper text-stone px-12 py-5 rounded-full text-xl font-bold hover:bg-sand hover:text-charcoal transition-all shadow-2xl">
            👉 Apply to Work With Me
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-serif mb-6 text-sand">
              mcheyser<span className="text-copper">.</span>
            </h3>
            <p className="text-stone/60 max-w-md text-lg font-light leading-relaxed">
              Fractional Community Operations & Leadership for health and wellness founders who care deeply about their people.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-copper mb-8">Navigation</h4>
            <ul className="space-y-4 text-stone/80 text-sm tracking-wide">
              <li><Link to="/#about" className="hover:text-sand transition-colors">About M. Heyser</Link></li>
              <li><Link to="/#services" className="hover:text-sand transition-colors">Services & Method</Link></li>
              <li><Link to="/#results" className="hover:text-sand transition-colors">Client Results</Link></li>
              <li><Link to="/apply" className="hover:text-sand transition-colors">Start Application</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-copper mb-8">Connection</h4>
            <ul className="space-y-4 text-stone/80 text-sm tracking-wide">
              <li><span className="block text-[10px] uppercase opacity-40 mb-1">HQ</span> Boulder, Colorado</li>
              <li><a href="mailto:hello@mcheyser.com" className="hover:text-sand transition-colors">hello@mcheyser.com</a></li>
              <li><a href="#" className="hover:text-sand transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone/30 uppercase tracking-[0.3em] gap-4 text-center">
          <p>© {new Date().getFullYear()} M. Heyser. Facilitating human connection since 2014.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
