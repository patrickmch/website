import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkingTogetherPage from './pages/WorkingTogetherPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import StylePage from './pages/StylePage';
import OgPage from './pages/OgPage';

// The retained client page loads in its own chunk, so its text is not part of the marketing bundle.
const IntakePage = lazy(() => import('./pages/IntakePage'));

// The client stories load in their own chunks too, so Home carries only the featured MTRO PRO card, not every story's text and figures.
const ClientWorkPage = lazy(() => import('./pages/ClientWorkPage'));
const MtroWorkPage = lazy(() => import('./pages/MtroWorkPage'));
const ClientStoryRoute = lazy(() => import('./pages/ClientStoryPage').then((m) => ({ default: m.ClientStoryRoute })));

/**
 * On a new page (a link click), scrolls to the top and moves focus to the
 * page's heading (visible focus ring for keyboard users; main as a fallback)
 * so keyboard and screen-reader users start at the new content. On back and
 * forward (POP) the browser restores the reading position itself.
 */
function NavigationManager() {
  const { pathname, key } = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const previousKey = useRef<string | null>(null);

  // Old-style links (#/path) that arrive as an in-page hash change, for example
  // from a bookmarklet or a stale link on the same document, are rewritten too.
  // Fresh loads are handled in index.tsx before the router starts.
  useEffect(() => {
    const onHashChange = () => {
      const legacy = window.location.hash.match(/^#\/(.*)$/);
      if (legacy) navigate(`/${legacy[1]}`, { replace: true });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [navigate]);

  useEffect(() => {
    const previous = previousKey.current;
    previousKey.current = key;
    if (previous === null) return; // first load
    if (navigationType === 'POP') return;
    // A redirect (<Navigate replace>) straight off the first load, for example /apply, is still the first load.
    if (navigationType === 'REPLACE' && previous === 'default') return;
    window.scrollTo(0, 0);
    const heading = document.querySelector<HTMLElement>('main h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    } else {
      document.getElementById('main')?.focus({ preventScroll: true });
    }
  }, [pathname, key, navigationType]);
  return null;
}

/** Skip link. Focuses main explicitly so the jump works the same way with every router and browser. */
function SkipLink() {
  const skip = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById('main');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };
  return (
    <a href="#main" className="skip-link" onClick={skip}>
      Skip to content
    </a>
  );
}

export default function App() {
  const dev = import.meta.env.DEV;
  return (
    <BrowserRouter>
      <NavigationManager />
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/working-together" element={<WorkingTogetherPage />} />
            <Route path="/work" element={<ClientWorkPage />} />
            <Route path="/work/mtro-pro" element={<MtroWorkPage />} />
            <Route path="/work/:slug" element={<ClientStoryRoute />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply" element={<Navigate to="/contact" replace />} />
            <Route path="/intake/denver-zen-den" element={<IntakePage />} />
            {dev && <Route path="/style" element={<StylePage />} />}
            {dev && <Route path="/og" element={<OgPage />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
