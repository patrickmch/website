// Shared by the React site, generated blog pages, and standalone outreach pages.
(() => {
  const websiteId = document.currentScript?.dataset.websiteId;
  const domains = ['mcheyser.com', 'www.mcheyser.com'];
  const excluded = (url) => url.pathname.startsWith('/intake/')
    || url.pathname.startsWith('/stoppromptingstartshipping')
    || url.searchParams.get('review') === '1';
  if (!websiteId || !domains.includes(location.hostname) || excluded(new URL(location.href))) return;

  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const cleanUrl = (value, campaigns) => {
    const url = new URL(value, location.origin);
    const query = new URLSearchParams();
    if (campaigns) {
      for (const key of campaignKeys) {
        const value = url.searchParams.get(key);
        if (value) query.set(key, value.slice(0, 100));
      }
    }
    url.search = query.toString();
    url.hash = '';
    return url.href;
  };
  // Do not send arbitrary query strings, fragments, client intake pages, or review visits.
  // This also runs on client-side navigation after the tracker has loaded.
  window.mcheyserBeforeAnalytics = (type, payload) => {
    if (type !== 'event' || !payload?.url) return false;
    try {
      if (excluded(new URL(location.href)) || excluded(new URL(payload.url, location.origin))) return false;
      const next = { ...payload, url: cleanUrl(payload.url, true) };
      if (payload.referrer) {
        const referrer = new URL(payload.referrer, location.origin);
        next.referrer = excluded(referrer) ? referrer.origin : cleanUrl(payload.referrer, false);
      }
      return next;
    } catch {
      return false;
    }
  };
  const script = document.createElement('script');
  script.src = 'https://cloud.umami.is/script.js';
  script.defer = true;
  script.dataset.websiteId = websiteId;
  script.dataset.domains = domains.join(',');
  script.dataset.doNotTrack = 'true';
  script.dataset.excludeHash = 'true';
  script.dataset.beforeSend = 'mcheyserBeforeAnalytics';
  document.head.appendChild(script);
})();
