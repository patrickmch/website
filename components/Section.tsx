import React from 'react';

/**
 * A page section. Each section after the first carries a hairline rule
 * across the container. `labelledBy` should point at the section's heading.
 */
export function Section({
  first = false,
  labelledBy,
  className = '',
  children,
}: {
  first?: boolean;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`section ${className}`} aria-labelledby={labelledBy}>
      <div className={`container section__inner ${first ? 'section__inner--first' : ''}`}>{children}</div>
    </section>
  );
}

export function Prose({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`prose ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
