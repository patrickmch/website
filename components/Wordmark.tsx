import { Link } from 'react-router-dom';
import { PenUnderline } from './marks/PenUnderline';

type Size = 'header' | 'footer' | 'display';

/* The stroke scales with the type (a fine pen under big type, finer still under small), and the band is 0.2em tall. */
const underline: Record<Size, { strokes: 1 | 2; height: number; strokeWidth: number }> = {
  header: { strokes: 1, height: 4, strokeWidth: 1.25 }, // 22px type
  footer: { strokes: 1, height: 6, strokeWidth: 1.5 }, // 28px type
  display: { strokes: 2, height: 18, strokeWidth: 2 }, // 96px type
};

function WordmarkText({ size }: { size: Size }) {
  const { strokes, height, strokeWidth } = underline[size];
  return (
    <span className={`wordmark wordmark--${size}`}>
      McHeyser
      <PenUnderline className="wordmark__stroke pen--static" strokes={strokes} height={height} strokeWidth={strokeWidth} />
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
