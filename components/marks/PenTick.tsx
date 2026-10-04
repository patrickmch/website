/** A short pen check mark. Green inside figures (the resolved state). */
export function PenTick({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pen pen-tick ${className}`}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 11 L8 16 L17 4" pathLength={1} />
    </svg>
  );
}
