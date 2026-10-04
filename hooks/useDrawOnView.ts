import { useEffect, useRef } from 'react';

/**
 * Adds the `is-drawn` class to the referenced element the first time it
 * scrolls into view. Pen marks inside it then draw on (see components.css).
 */
export function useDrawOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-drawn');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-drawn');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
