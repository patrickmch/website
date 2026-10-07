import { useEffect, useState } from 'react';

/** The width from which a story figure shows its full drawing. Below it, the figure shows a simple three-step version. */
export const WIDE_FIGURE_QUERY = '(min-width: 1024px)';

/** True when the viewport is wide enough for a full story figure. Follows window resizes. */
export function useWideFigure() {
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(WIDE_FIGURE_QUERY).matches);
  useEffect(() => {
    const query = window.matchMedia(WIDE_FIGURE_QUERY);
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return wide;
}
