import React from 'react';
import { Link } from 'react-router-dom';

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M3 8 H13" />
      <path d="M9 4 L13 8 L9 12" />
    </svg>
  );
}

export function ButtonLink({
  to,
  small = false,
  className = '',
  children,
}: {
  to: string;
  small?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className={`btn ${small ? 'btn--small' : ''} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  type = 'submit',
  disabled = false,
  className = '',
  children,
}: {
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type={type} disabled={disabled} className={`btn ${className}`}>
      {children}
    </button>
  );
}

export function SecondaryLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="link-secondary">
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}
