
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MessageSquare, Mountain } from 'lucide-react';
import { NAV_ITEMS, CLIENT_TRUST_SIGNAL } from '../constants';
import Chatbot from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-emerald-700 rounded-lg text-white group-hover:bg-emerald-600 transition-colors">
              <Mountain size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">MCHEYSER</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-700 ${
                  location.pathname === item.href ? 'text-emerald-700' : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/work-with-me"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all flex items-center group"
            >
              Start Conversation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-xl p-6 border-t animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-lg font-medium text-slate-600 hover:text-emerald-700"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/work-with-me"
                className="bg-emerald-700 text-white px-6 py-3 rounded-xl text-center font-bold hover:bg-emerald-600 transition-colors"
              >
                Start Conversation
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <Mountain className="text-emerald-500" size={32} />
                <span className="text-2xl font-bold text-white tracking-tight">MCHEYSER</span>
              </Link>
              <p className="max-w-md text-lg leading-relaxed mb-6">
                Fractional Community Operations for businesses that value both technical precision and human connection.
              </p>
              <div className="flex items-center space-x-2 text-emerald-500 font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>{CLIENT_TRUST_SIGNAL}</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="hover:text-emerald-500 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li><a href="mailto:patrick@mcheyser.com" className="hover:text-emerald-500 transition-colors">patrick@mcheyser.com</a></li>
                <li>Boulder, Colorado</li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} McHeyser. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Layout;
