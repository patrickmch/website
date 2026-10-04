import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkingTogetherPage from './pages/WorkingTogetherPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import IntakePage from './pages/IntakePage';
import StylePage from './pages/StylePage';
import OgPage from './pages/OgPage';

/** Scrolls to the top on every route change. */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Skip link. Focuses main directly because a plain #main href would be read as a route by the hash router. */
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
    <HashRouter>
      <ScrollManager />
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/working-together" element={<WorkingTogetherPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/apply" element={<Navigate to="/contact" replace />} />
          <Route path="/intake/denver-zen-den" element={<IntakePage />} />
          {dev && <Route path="/style" element={<StylePage />} />}
          {dev && <Route path="/og" element={<OgPage />} />}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
