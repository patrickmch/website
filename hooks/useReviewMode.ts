import { useLocation } from 'react-router-dom';

/**
 * Review mode shows proof-slot placeholders so their placement can be judged.
 * On in development. Off in production unless the hash route carries `?review=1`.
 * `?review=0` forces it off anywhere.
 */
export function useReviewMode(): boolean {
  const { search } = useLocation();
  const flag = new URLSearchParams(search).get('review');
  if (flag === '0') return false;
  if (flag === '1') return true;
  return import.meta.env.DEV;
}
