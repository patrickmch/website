import { Link } from 'react-router-dom';
import { PenUnderline } from './marks/PenUnderline';

type Size = 'header' | 'footer' | 'display';

function WordmarkText({ size }: { size: Size }) {
  return (
    <span className={`wordmark wordmark--${size}`}>
      M
      <span className="wordmark__c">
        c
        <PenUnderline className="wordmark__stroke pen--static" scaled />
      </span>
      Heyser
    </span>
  );
}

/**
 * The wordmark: "McHeyser" with the historical raised c and a pen stroke
 * beneath it. Renders as the Home link unless `asText` is set.
 */
export function Wordmark({ size = 'header', asText = false }: { size?: Size; asText?: boolean }) {
  if (asText) return <WordmarkText size={size} />;
  return (
    <Link to="/" className="wordmark-link" aria-label="McHeyser, home">
      <WordmarkText size={size} />
    </Link>
  );
}
