import { useLocation } from 'react-router-dom';

const KEY = 'mcheyser-review';

function remember(value: '1' | null) {
  try {
    if (value) window.sessionStorage.setItem(KEY, value);
    else window.sessionStorage.removeItem(KEY);
  } catch {
    // storage unavailable: the flag then applies to this URL only
  }
}

function remembered(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Review mode shows proof-slot placeholders so their placement can be judged.
 * On in development. Off in production unless the URL carries `?review=1`,
 * which then stays on for the rest of the browser session (so following a
 * link does not silently switch it off). `?review=0` switches it off again.
 */
export function useReviewMode(): boolean {
  const { search } = useLocation();
  const flag = new URLSearchParams(search).get('review');
  if (flag === '0') {
    remember(null);
    return false;
  }
  if (flag === '1') {
    remember('1');
    return true;
  }
  return import.meta.env.DEV || remembered();
}
