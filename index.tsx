import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

// The site used a hash router until October 2026, so links like /#/apply and
// /#/intake/denver-zen-den exist in the wild. Rewrite them to real paths once,
// before the router reads the URL. A plain fragment such as #main is left alone.
const legacy = window.location.hash.match(/^#\/(.*)$/);
if (legacy) {
  const target = legacy[1];
  // A query that sat before the hash (/?x=1#/about) is kept when the hash path has none of its own.
  const search = target.includes('?') ? '' : window.location.search;
  window.history.replaceState(null, '', `/${target}${search}`);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
