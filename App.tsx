
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import HowIWork from './pages/HowIWork';
import WorkWithMe from './pages/WorkWithMe';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-i-work" element={<HowIWork />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
