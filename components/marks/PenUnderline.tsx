import { useRef } from 'react';
import { useParentSize } from '../../hooks/useParentSize';

/**
 * A slightly wavy pen underline, drawn at pixel size across its parent's
 * width (the parent must be `position: relative`). One or two 2px strokes.
 * Used under the wordmark and under "Discovery Sprint".
 */
export function PenUnderline({
  className = '',
  strokes = 2,
  height = 12,
}: {
  className?: string;
  strokes?: 1 | 2;
  height?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const parent = useParentSize(ref);
  const w = parent ? parent.width + 4 : 0;
  const k = height / 12; // the strokes were drawn in a 12px-tall box
  const first = w
    ? `M2 ${6 * k} C ${w * 0.18} ${3 * k}, ${w * 0.36} ${9 * k}, ${w * 0.56} ${5 * k} S ${w * 0.86} ${4 * k}, ${w - 2} ${7 * k}`
    : '';
  const second = w ? `M6 ${9.5 * k} C ${w * 0.3} ${7 * k}, ${w * 0.58} ${11 * k}, ${w - 6} ${8.5 * k}` : '';

  return (
    <svg
      ref={ref}
      className={`pen pen-underline ${className}`}
      viewBox={`0 0 ${w || 1} ${height}`}
      width={w || 1}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      {w > 0 && <path d={first} pathLength={1} />}
      {w > 0 && strokes === 2 && <path d={second} pathLength={1} />}
    </svg>
  );
}
