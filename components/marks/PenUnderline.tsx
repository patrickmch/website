import { useRef } from 'react';
import { useParentSize } from '../../hooks/useParentSize';

/**
 * A slightly wavy two-stroke pen underline.
 * `scaled`: a fixed-proportion version that stretches with its container while
 * the stroke stays 2 CSS pixels (used under the raised c of the wordmark).
 * Otherwise it measures its parent's width and draws at pixel size with a 2px stroke.
 */
export function PenUnderline({ className = '', scaled = false }: { className?: string; scaled?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const parent = useParentSize(ref);

  if (scaled) {
    return (
      <svg
        className={`pen pen-underline pen-underline--scaled ${className}`}
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2 6 C 18 3, 36 9, 56 5 S 86 4, 98 7" pathLength={1} vectorEffect="non-scaling-stroke" />
        <path d="M6 9.5 C 30 7, 58 11, 94 8.5" pathLength={1} vectorEffect="non-scaling-stroke" />
      </svg>
    );
  }

  const w = parent ? parent.width + 4 : 0;
  const first = w ? `M2 6 C ${w * 0.18} 3, ${w * 0.36} 9, ${w * 0.56} 5 S ${w * 0.86} 4, ${w - 2} 7` : '';
  const second = w ? `M6 9.5 C ${w * 0.3} 7, ${w * 0.58} 11, ${w - 6} 8.5` : '';

  return (
    <svg
      ref={ref}
      className={`pen pen-underline ${className}`}
      viewBox={`0 0 ${w || 1} 12`}
      width={w || 1}
      height={12}
      aria-hidden="true"
      focusable="false"
    >
      {w > 0 && <path d={first} pathLength={1} />}
      {w > 0 && <path d={second} pathLength={1} />}
    </svg>
  );
}
