import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Wordmark size="footer" />
          <p className="site-footer__name">Patrick McHeyser</p>
          <p className="site-footer__tag">Operations and technology for growing businesses.</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            <li>
              <Link to="/working-together">Working Together</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Let's talk</Link>
            </li>
          </ul>
        </nav>
        <div className="site-footer__contact">
          <p>Boulder, Colorado</p>
          <p>
            <a href="mailto:patrick@mcheyser.com">patrick@mcheyser.com</a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/patrickmcheyser/" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p className="small muted">© {year} Patrick McHeyser</p>
      </div>
    </footer>
  );
}
