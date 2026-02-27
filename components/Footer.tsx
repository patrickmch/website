
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-stone py-12 md:py-24 border-t border-white/10 relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* CTA Section */}
        <div className="text-center mb-20 border-b border-white/5 pb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 text-sand max-w-2xl mx-auto leading-tight">
            You've got a great business with a messy operation. Let's fix that.
          </h2>
          <p className="text-xl text-stone/50 mb-10 font-light">
            One conversation. No pitch. Just an honest look at what's not working.
          </p>
          <Link to="/apply" className="btn-primary bg-copper text-stone px-12 py-5 rounded-full text-xl font-semibold inline-flex items-center gap-2 hover:bg-sand hover:text-charcoal">
            Apply for a Consultation
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-serif mb-6 text-sand">
              mcheyser<span className="text-copper">.</span>
            </h3>
            <p className="text-stone/50 max-w-md text-lg font-light leading-relaxed">
              Operational strategy and technical execution for growing companies that need someone who ships - not someone who slides.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-copper mb-8">Navigation</h4>
            <ul className="space-y-4 text-stone/60 text-sm tracking-wide">
              <li><Link to="/#about" className="hover:text-sand transition-colors link-hover">About Patrick</Link></li>
              <li><Link to="/#services" className="hover:text-sand transition-colors link-hover">How I Work</Link></li>
              <li><Link to="/apply" className="hover:text-sand transition-colors link-hover">Apply for a Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-copper mb-8">Connection</h4>
            <ul className="space-y-4 text-stone/60 text-sm tracking-wide">
              <li>
                <span className="block text-[10px] uppercase opacity-40 mb-1 tracking-widest">Location</span>
                Boulder, Colorado
              </li>
              <li>
                <span className="block text-[10px] uppercase opacity-40 mb-1 tracking-widest">Email</span>
                <a href="mailto:patrick@mcheyser.com" className="hover:text-sand transition-colors link-hover">patrick@mcheyser.com</a>
              </li>
              <li>
                <span className="block text-[10px] uppercase opacity-40 mb-1 tracking-widest">Social</span>
                <a href="#" className="hover:text-sand transition-colors link-hover">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone/30 uppercase tracking-[0.3em] gap-4 text-center">
          <p>&copy; {new Date().getFullYear()} Patrick McHeyser. Building things that work since 2014.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone transition-colors link-hover">Privacy</a>
            <a href="#" className="hover:text-stone transition-colors link-hover">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
