import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Measures the parent element of the referenced element. Updates on resize,
 * after the next frame, and once web fonts have loaded.
 */
export function useParentSize(ref: RefObject<Element | null>) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useLayoutEffect(() => {
    const parent = ref.current?.parentNode;
    if (!(parent instanceof Element)) return;

    let frame = 0;
    const update = () => {
      // Layout size, not screen size, so a pen mark inside a transformed ancestor is not scaled twice.
      const rect = parent instanceof HTMLElement
        ? { width: parent.offsetWidth, height: parent.offsetHeight }
        : parent.getBoundingClientRect();
      const next = { width: Math.round(rect.width), height: Math.round(rect.height) };
      setSize((current) =>
        current && current.width === next.width && current.height === next.height ? current : next
      );
    };

    update();
    frame = window.requestAnimationFrame(update);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(update).catch(() => undefined);
    }

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update);
      observer.observe(parent);
    }
    window.addEventListener('resize', update);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return size;
}
