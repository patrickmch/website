import { useEffect } from 'react';

const SITE = 'https://mcheyser.com';

function setMeta(selector: string, create: () => HTMLElement, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

/**
 * Sets the document title, the description, the canonical URL and the Open
 * Graph title, description and URL for the current page. `path` is the
 * route, for example "/about".
 */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    const pageUrl = `${SITE}${path}`;
    const meta = (name: string) => () => Object.assign(document.createElement('meta'), { name });
    const property = (prop: string) => () => {
      const element = document.createElement('meta');
      element.setAttribute('property', prop);
      return element;
    };
    setMeta('meta[name="description"]', meta('description'), 'content', description);
    setMeta('meta[property="og:title"]', property('og:title'), 'content', title);
    setMeta('meta[property="og:description"]', property('og:description'), 'content', description);
    setMeta('meta[property="og:url"]', property('og:url'), 'content', pageUrl);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', pageUrl);
  }, [title, description, path]);
}
