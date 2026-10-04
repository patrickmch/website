import { useMemo, useRef } from 'react';
import { useParentSize } from '../../hooks/useParentSize';

/**
 * A pen circle: an irregular ellipse that overshoots its start by about a
 * sixth of a turn, as a pen does when circling a word. It measures its parent
 * (which must be `position: relative`) and draws at pixel size, so the stroke
 * stays uniform and the draw-on animation works.
 */
function penCirclePath(width: number, height: number): string {
  const cx = width / 2;
  const cy = height / 2;
  const rx = width / 2 - 3;
  const ry = height / 2 - 3;
  const start = -0.4 * Math.PI;
  const turns = 1.17;
  const steps = 96;
  const points: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = start + t * turns * 2 * Math.PI;
    const wobble = 1 + 0.03 * Math.sin(3 * a + 0.8) + 0.015 * Math.sin(7 * a + 2.1);
    const drift = 0.96 + 0.08 * t;
    const x = cx + rx * wobble * drift * Math.cos(a);
    const y = cy + ry * wobble * drift * Math.sin(a);
    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `M${points.join(' L')}`;
}

export function PenCircle({
  padX = 12,
  padY = 10,
  className = '',
}: {
  padX?: number;
  padY?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const parent = useParentSize(ref);
  // Below 768px the diagrams stack and the gutters are 16px, and the pen overshoots its ellipse by a
  // few pixels, so a box that spans the screen gets its circle drawn slightly inside the box, as a pen
  // circles the words. On phones every circle also keeps a smaller pad. Re-measured on resize.
  const viewport = typeof window !== 'undefined' ? window.innerWidth : Infinity;
  const spansScreen = viewport < 768 && !!parent && parent.width > viewport * 0.6;
  const narrow = viewport < 480;
  const px = spansScreen ? -8 : narrow ? Math.min(padX, 6) : padX;
  const py = narrow ? Math.min(padY, 6) : padY;
  const width = parent ? parent.width + px * 2 : 0;
  const height = parent ? parent.height + py * 2 : 0;
  const d = useMemo(() => (width && height ? penCirclePath(width, height) : ''), [width, height]);

  return (
    <svg
      ref={ref}
      className={`pen pen-circle ${className}`}
      viewBox={`0 0 ${width || 1} ${height || 1}`}
      width={width || 1}
      height={height || 1}
      style={{ top: -py, left: -px }}
      aria-hidden="true"
      focusable="false"
    >
      {d && <path d={d} pathLength={1} />}
    </svg>
  );
}
