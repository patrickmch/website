import React, { useId } from 'react';
import { useDrawOnView } from '../hooks/useDrawOnView';
import { PenCircle } from './marks/PenCircle';
import { PenTick } from './marks/PenTick';

/* ---------- Figure wrapper ---------- */

type FigureProps = {
  n: number;
  caption: string;
  description: string;
  className?: string;
  children: React.ReactNode;
};

export function Figure({ n, caption, description, className = '', children }: FigureProps) {
  const ref = useDrawOnView<HTMLElement>();
  const id = useId();
  const captionId = `fig-caption-${id}`;
  const descId = `fig-desc-${id}`;

  return (
    <figure
      ref={ref}
      className={`figure ${className}`}
      aria-labelledby={captionId}
      aria-describedby={descId}
    >
      <div className="figure__body">{children}</div>
      <p id={descId} className="visually-hidden">
        {description}
      </p>
      <figcaption id={captionId} className="figure__caption">
        <span className="figure__n">Fig. {n}</span> {caption}
      </figcaption>
    </figure>
  );
}

/* ---------- Flow and stacks ---------- */

export function Flow({
  annotated = false,
  className = '',
  children,
}: {
  annotated?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`flow ${annotated ? 'flow--annotated' : ''} ${className}`}>{children}</div>;
}

export function Stack({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`stack ${className}`}>{children}</div>;
}

/* ---------- Node ---------- */

type NodeProps = {
  label: string;
  where?: string;
  marked?: boolean;
  annotation?: string;
  annotationPlacement?: 'above' | 'below';
  tick?: boolean;
  small?: boolean;
  className?: string;
};

export function Node({
  label,
  where,
  marked = false,
  annotation,
  annotationPlacement = 'above',
  tick = false,
  small = false,
  className = '',
}: NodeProps) {
  return (
    <div className={`node ${marked ? 'node--marked' : ''} ${small ? 'node--small' : ''} ${className}`}>
      <div className="node__box">
        <div className={`node__label ${tick ? 'node__label--tick' : ''}`}>
          {tick && <PenTick className="node__tick" />}
          <span>{label}</span>
        </div>
        {where && <div className="node__where">{where}</div>}
        {marked && <PenCircle />}
      </div>
      {marked && annotation && <Annotation text={annotation} placement={annotationPlacement} />}
    </div>
  );
}

/* ---------- Annotation ---------- */

export function Annotation({ text, placement = 'above' }: { text: string; placement?: 'above' | 'below' }) {
  return (
    <div className={`annotation annotation--${placement}`}>
      <svg className="annotation__leader" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path className="annotation__leader-d" d="M22 2 L4 22" />
        <path className="annotation__leader-m" d="M12 0 L12 20" />
      </svg>
      <span className="annotation__text">{text}</span>
    </div>
  );
}

/* ---------- Connectors ---------- */

export function Connector({ className = '' }: { className?: string }) {
  return (
    <div className={`connector ${className}`} aria-hidden="true">
      <svg className="connector__h" viewBox="0 0 32 16" focusable="false">
        <path d="M0 8 H28" />
        <path d="M22 2 L29 8 L22 14" />
      </svg>
      <svg className="connector__v" viewBox="0 0 16 32" focusable="false">
        <path d="M8 0 V28" />
        <path d="M2 22 L8 29 L14 22" />
      </svg>
    </div>
  );
}

export function Arrowhead({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`arrowhead ${className}`} viewBox="0 0 10 12" aria-hidden="true" focusable="false" style={style}>
      <path d="M2 1 L8 6 L2 11" />
    </svg>
  );
}

/**
 * A fan of connectors: one line splitting into `count` lines (direction "out")
 * or `count` lines merging into one (direction "in"). Shown at 768px and up;
 * on small screens a vertical connector takes its place.
 */
export function Fan({ count, direction = 'out' }: { count: number; direction?: 'out' | 'in' }) {
  const ys = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  return (
    <>
      <div className={`fan fan--${direction}`} aria-hidden="true">
        <svg className="fan__lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {ys.map((y) =>
            direction === 'out' ? (
              <path key={y} d={`M0 50 C 50 50, 50 ${y}, 100 ${y}`} vectorEffect="non-scaling-stroke" />
            ) : (
              <path key={y} d={`M0 ${y} C 50 ${y}, 50 50, 100 50`} vectorEffect="non-scaling-stroke" />
            )
          )}
        </svg>
        {direction === 'out' ? (
          ys.map((y) => (
            <React.Fragment key={y}>
              <Arrowhead style={{ top: `${y}%` }} />
            </React.Fragment>
          ))
        ) : (
          <Arrowhead style={{ top: '50%' }} />
        )}
      </div>
      <Connector className="connector--mobile" />
    </>
  );
}
