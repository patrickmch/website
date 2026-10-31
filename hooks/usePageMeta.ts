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
export function usePageMeta(title: string, description: string, path: string, options: {
  type?: 'website' | 'article'; published?: string; schema?: object; noIndex?: boolean;
} = {}) {
  const type = options.type || 'website';
  const published = options.published;
  const schema = options.schema ? JSON.stringify(options.schema).replace(/</g, '\\u003c') : '';
  const noIndex = options.noIndex;
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
    setMeta('meta[property="og:type"]', property('og:type'), 'content', type);
    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', pageUrl);
    if (published) setMeta('meta[property="article:published_time"]', property('article:published_time'), 'content', published);
    else document.head.querySelector('meta[property="article:published_time"]')?.remove();
    if (noIndex) setMeta('meta[name="robots"]', meta('robots'), 'content', 'noindex');
    else document.head.querySelector('meta[name="robots"]')?.remove();
    let structured = document.head.querySelector<HTMLScriptElement>('#page-structured-data');
    if (schema) {
      if (!structured) {
        structured = document.createElement('script');
        structured.id = 'page-structured-data';
        structured.type = 'application/ld+json';
        document.head.appendChild(structured);
      }
      structured.textContent = schema;
    } else structured?.remove();
  }, [title, description, path, type, published, schema, noIndex]);
}
