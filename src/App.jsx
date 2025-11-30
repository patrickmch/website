import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Brain, Users, Code, Terminal, ChevronDown, Mail, Linkedin, ExternalLink } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-slate-900 w-full overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight text-slate-900 cursor-pointer" onClick={() => scrollToSection('hero')}>
            McHeyser
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection('philosophy')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Philosophy</button>
            <button onClick={() => scrollToSection('work')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Work</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">About</button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-6 flex flex-col space-y-4">
            <button onClick={() => scrollToSection('philosophy')} className="text-left py-2 text-slate-600 font-medium">Philosophy</button>
            <button onClick={() => scrollToSection('work')} className="text-left py-2 text-slate-600 font-medium">Work</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 text-slate-600 font-medium">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-blue-600 font-bold">Let's Talk</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-800 text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span>Accepting New Clients</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
              Intelligent Automation. <br />
              <span className="text-slate-400">Human Adoption.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-lg leading-relaxed">
              I architect operational systems and custom integrations for businesses—and ensure your team actually uses them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('work')}
                className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200/50 flex items-center justify-center space-x-2"
              >
                <span>View Systems</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('philosophy')}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                How I Work
              </button>
            </div>
          </div>
          <div className="relative lg:ml-12">
            {/* Decreased rotation and scale to keep it contained */}
            <div className="absolute inset-0 bg-blue-100 rounded-[2rem] transform rotate-2 scale-95 opacity-50 -z-10"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="IMG_3933.jpeg"
                alt="Patrick McHeyser"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block z-10">
              <p className="text-slate-500 text-sm font-medium mb-1">Recent Result</p>
              <p className="text-slate-900 font-bold text-lg">52% revenue growth</p>
              <p className="text-slate-500 text-sm">for healthcare client via custom sales workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem / Philosophy */}
      <section id="philosophy" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">The Differentiator</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Technology without strategy is just overhead. I don't just write code—I engineer business outcomes.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <Brain size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Business First</h4>
              <p className="text-slate-600 leading-relaxed">
                I bring a "Personal MBA" mindset to every project. I've founded companies and mentored at CrowdSolve. I don't touch the code until the business case is bulletproof.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <Code size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Custom Build</h4>
              <p className="text-slate-600 leading-relaxed">
                Whether it's AI agents, API integrations, or CRM workflows, I build systems tailored to your reality, not a generic consultant's playbook.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Radical Adoption</h4>
              <p className="text-slate-600 leading-relaxed">
                The best software is the one your team uses. I handle the change management, training, and accountability to ensure 90%+ adoption rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Work / POCs */}
      <section id="work" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Selected Projects</h2>
              <h3 className="text-3xl md:text-4xl font-bold">Building in public.</h3>
              <p className="mt-4 text-slate-400 text-lg">
                I believe in proving competence through building. Here are live systems I'm developing right now to solve real operational problems.
              </p>
            </div>
            <a href="https://www.linkedin.com/in/patrick-mcheyser-a8758bb1/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              <span>Follow the build on LinkedIn</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <Terminal className="text-blue-400" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-semibold rounded-full uppercase tracking-wider">Live System</span>
                </div>
                <h4 className="text-2xl font-bold mb-3">LLM Router Ecosystem</h4>
                <p className="text-slate-400 mb-6 flex-grow">
                  A centralized, stateless intelligence layer built on Railway. It allows multiple "worker apps" to access AI processing without maintaining their own state—dramatically reducing development overhead for new internal tools.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">OAuth</span>
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">Railway</span>
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">Stateless API</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <Code className="text-purple-400" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">Active Build</span>
                </div>
                <h4 className="text-2xl font-bold mb-3">Midway Automation</h4>
                <p className="text-slate-400 mb-6 flex-grow">
                  Automated lead response system for Mid-Term Rental operators. Scrapes proprietary platforms, processes inquiries via the Router, and handles tenant intake with human-in-the-loop Telegram integration.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">Playwright</span>
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">Twilio</span>
                  <span className="px-3 py-1 bg-slate-900 rounded text-xs text-slate-300">Telegram Bot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                   <img
                    src="IMG_3758.jpeg"
                    alt="Patrick McHeyser"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Who I Am</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Wilderness & The Code.</h3>
                <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                  <p>
                    My background is defined by two distinct worlds. As a wilderness leadership instructor, I worked with Fortune 500 executives and Navy SEALs to build resilience in high-consequence environments.
                  </p>
                  <p>
                    But my technical roots run deep. I have over a decade of engineering experience—5 years professionally and 5 years as a dedicated builder. I didn't just pick up coding recently; I've been architecting systems for years.
                  </p>
                  <p>
                     I combined this technical rigor with a "Personal MBA" approach—founding companies, mentoring at CrowdSolve.eco, and obsessively studying business models.
                  </p>
                  <p>
                    Now, I operate at the intersection. I help companies implement solutions that stick because I understand the business case, the human behavior, and the engineering required to make it work.
                  </p>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <p className="font-serif italic text-slate-500 text-lg">
                    "Slow is smooth, smooth is efficient, efficient is fast."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Ready to clear the friction?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            I'm currently accepting new consulting projects for businesses ($500k-$3M) looking to fix broken processes, integrate disparate tools, or implement intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:patrick@mcheyser.com"
              className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all flex items-center space-x-2"
            >
              <Mail size={18} />
              <span>Email Me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/patrick-mcheyser-a8758bb1/"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-blue-50 text-blue-700 border border-blue-100 font-semibold rounded-lg hover:bg-blue-100 transition-all flex items-center space-x-2"
            >
              <Linkedin size={18} />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

          <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Odyssey Business Strategy LLC. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900 transition-colors">Boulder, CO</a>
              <span className="text-slate-300">•</span>
              <span className="hover:text-slate-900 cursor-default transition-colors">McHeyser Systems</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
