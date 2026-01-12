
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApplyPage from './pages/ApplyPage';

// Component to handle route change side effects
const RouteChangeHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Blur any focused element on route change
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // Scroll to top on route change (unless it's a hash link)
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <RouteChangeHandler>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16 lg:pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apply" element={<ApplyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </RouteChangeHandler>
    </Router>
  );
};

export default App;
