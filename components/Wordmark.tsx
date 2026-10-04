import { Link } from 'react-router-dom';
import { PenUnderline } from './marks/PenUnderline';

type Size = 'header' | 'footer' | 'display';

const underline: Record<Size, { strokes: 1 | 2; height: number }> = {
  header: { strokes: 1, height: 8 },
  footer: { strokes: 1, height: 10 },
  display: { strokes: 2, height: 16 },
};

function WordmarkText({ size }: { size: Size }) {
  const { strokes, height } = underline[size];
  return (
    <span className={`wordmark wordmark--${size}`}>
      McHeyser
      <PenUnderline className="wordmark__stroke pen--static" strokes={strokes} height={height} />
    </span>
  );
}

/**
 * The wordmark: "McHeyser" in the serif with a hand-drawn pen underline
 * running the full width of the word. Renders as the Home link unless
 * `asText` is set.
 */
export function Wordmark({ size = 'header', asText = false }: { size?: Size; asText?: boolean }) {
  if (asText) return <WordmarkText size={size} />;
  return (
    <Link to="/" className="wordmark-link" aria-label="McHeyser, home">
      <WordmarkText size={size} />
    </Link>
  );
}
