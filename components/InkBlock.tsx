import React from 'react';
import { useDrawOnView } from '../hooks/useDrawOnView';

/** The one ink-on-paper inversion a page may carry. Pen marks inside draw on when it scrolls into view. */
export function InkBlock({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const ref = useDrawOnView<HTMLDivElement>();
  return (
    <div ref={ref} className={`ink-block ${className}`}>
      {children}
    </div>
  );
}
