import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { ButtonLink } from './Button';

const links = [
  { to: '/working-together', label: 'Working Together' },
  { to: '/about', label: 'About' },
];

function navClass(base: string) {
  return ({ isActive }: { isActive: boolean }) => `${base} ${isActive ? 'is-active' : ''}`;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <Wordmark />
        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navClass('site-nav__link')}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header__actions">
          <ButtonLink to="/contact" small>
            Let's talk
          </ButtonLink>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <nav id="site-menu" className="site-menu" aria-label="Primary, small screens" hidden={!open}>
        <ul className="container site-menu__list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={navClass('site-menu__link')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
