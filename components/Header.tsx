
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Results', path: '/#results' },
  ];

  // Helper to determine if a link is active based on path and hash
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.includes('#')) {
      const [p, h] = path.split('#');
      return location.pathname === p && location.hash === `#${h}`;
    }
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-stone/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-evergreen text-2xl font-serif font-bold tracking-tighter group">
          mcheyser<span className="text-copper">.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-copper uppercase tracking-widest ${isActive(link.path) ? 'text-copper' : 'text-charcoal/60'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-end">
            <Link
              to="/apply"
              className="bg-evergreen text-stone px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-copper transition-all shadow-md active:scale-95"
            >
              Apply
            </Link>
          </div>
        </nav>

        {/* Mobile Menu - Minimal */}
        <div className="md:hidden flex items-center gap-4">
            <Link
              to="/apply"
              className="bg-evergreen text-stone px-4 py-2 rounded-full text-sm font-semibold shadow-md"
            >
              Apply
            </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
