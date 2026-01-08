
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Results', path: '/#results' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.includes('#')) {
      const [p, h] = path.split('#');
      return location.pathname === p && location.hash === `#${h}`;
    }
    return location.pathname === path;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-evergreen text-2xl font-serif font-bold tracking-tighter group relative z-50">
            mcheyser<span className="text-copper group-hover:text-evergreen transition-colors">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors link-hover uppercase tracking-widest ${isActive(link.path) ? 'text-copper' : 'text-charcoal/60 hover:text-evergreen'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/apply"
              className="btn-primary bg-evergreen text-stone px-6 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-1.5"
            >
              Apply
              <ArrowUpRight size={14} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3 relative z-50">
            <Link
              to="/apply"
              className={`bg-evergreen text-stone px-4 py-2 rounded-full text-sm font-semibold transition-opacity ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              Apply
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isMobileMenuOpen ? 'bg-stone text-evergreen' : 'bg-evergreen/10 text-evergreen'}`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-evergreen z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-6">
          <nav className="flex flex-col items-center space-y-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-3xl font-serif transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${isActive(link.path) ? 'text-copper' : 'text-stone hover:text-sand'}`}
                style={{ transitionDelay: `${i * 50 + 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/apply"
              className={`mt-8 bg-sand text-evergreen px-10 py-4 rounded-full text-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:bg-copper hover:text-stone ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Apply to Work With Me
              <ArrowUpRight size={18} />
            </Link>
          </nav>

          {/* Mobile Menu Footer */}
          <div
            className={`absolute bottom-12 text-center text-stone/40 text-sm transition-all duration-300 ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <p>Fractional Community Leadership</p>
            <p className="mt-1">Boulder, Colorado</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
