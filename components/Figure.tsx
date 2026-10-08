import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { useDrawOnView } from '../hooks/useDrawOnView';
import { PenCircle } from './marks/PenCircle';
import { PenTick } from './marks/PenTick';

/* ---------- Figure wrapper ---------- */

type FigureProps = {
  n: number;
  caption: string;
  /** Omit the visible caption while keeping its text as the accessible name. */
  showCaption?: boolean;
  description: string;
  className?: string;
  /** A short key under the drawing, for example what the small print and the pen circle mean. */
  legend?: string;
  children: React.ReactNode;
};

export function Figure({ n, caption, showCaption = true, description, className = '', legend, children }: FigureProps) {
  const ref = useDrawOnView<HTMLElement>();
  const id = useId();
  const captionId = `fig-caption-${id}`;
  const descId = `fig-desc-${id}`;

  return (
    <figure
      ref={ref}
      className={`figure ${className}`}
      aria-labelledby={showCaption ? captionId : undefined}
      aria-label={showCaption ? undefined : caption}
      aria-describedby={descId}
    >
      <div className="figure__body">{children}</div>
      {legend && <p className="figure__legend">{legend}</p>}
      <p id={descId} className="visually-hidden">
        {description}
      </p>
      {showCaption && (
        <figcaption id={captionId} className="figure__caption">
          <span className="figure__n">Fig. {n}</span> {caption}
        </figcaption>
      )}
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

export function Stack({ className = '', tag, children }: { className?: string; tag?: string; children: React.ReactNode }) {
  return (
    <div className={`stack ${className}`}>
      {tag && <div className="stack__tag">{tag}</div>}
      {children}
    </div>
  );
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
  /** Small print above the label saying the step runs on its own: true for "automatic", or your own words. */
  auto?: boolean | string;
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
  auto,
  className = '',
}: NodeProps) {
  return (
    <div className={`node ${marked ? 'node--marked' : ''} ${small ? 'node--small' : ''} ${className}`}>
      <div className="node__box">
        {auto && <span className="node__tag">{auto === true ? 'automatic' : auto}</span>}
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

/* ---------- Record ---------- */

export type RecordRow = {
  key: string;
  value?: string;
  /** tick: a resolved value with a check mark. flag: a pen-coloured note. plain: just the value. */
  state?: 'tick' | 'flag' | 'plain';
  /** Circle the key, as the paperwork figure does for a missing field. */
  marked?: boolean;
  /** The pen note under a circled row. */
  annotation?: string;
};

/** A record card: a titled list of key and value rows, drawn like the customer record on Working Together. */
export function Record({ title, tag, rows, className = '' }: { title: string; tag?: string; rows: RecordRow[]; className?: string }) {
  return (
    <div className={`record ${className}`}>
      <div className="record__title">
        <span>{title}</span>
        {tag && <span className="record__tag">{tag}</span>}
      </div>
      {rows.map((row) => (
        <div key={row.key} className={`record__row ${row.marked ? 'record__row--marked' : ''}`}>
          <span className="record__key">
            {row.key}
            {row.marked && <PenCircle padX={8} padY={4} />}
          </span>
          {row.value !== undefined && (
            <span className="record__val">
              {row.state === 'tick' && <PenTick />}
              {row.state === 'flag' ? <span className="record__flag">{row.value}</span> : row.value}
            </span>
          )}
          {row.marked && row.annotation && <Annotation text={row.annotation} placement="below" />}
        </div>
      ))}
    </div>
  );
}

/* ---------- Annotation ---------- */

export function Annotation({ text, placement = 'above' }: { text: string; placement?: 'above' | 'below' }) {
  return (
    <div className={`annotation annotation--${placement}`}>
      <svg className="annotation__leader" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path className="annotation__leader-d" d="M22 4 H8 V22" />
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

type FanGeometry = { ys: number[]; origin: number };

function isDiagramPart(el: Element) {
  return el.classList.contains('stack') || el.classList.contains('node') || el.classList.contains('record');
}

/**
 * A fan of connectors: one line splitting into `count` lines (direction "out")
 * or `count` lines merging into one (direction "in"). Shown at 768px and up,
 * where it measures the real centres of the nodes on either side so every
 * branch meets its box. On small screens a vertical connector takes its
 * place, with `mobileLabel` saying how the stacked boxes relate.
 */
export function Fan({
  count,
  direction = 'out',
  mobileLabel,
}: {
  count: number;
  direction?: 'out' | 'in';
  mobileLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<FanGeometry | null>(null);

  useLayoutEffect(() => {
    const fan = ref.current;
    const flow = fan?.parentElement;
    if (!fan || !flow) return;

    const update = () => {
      const rect = fan.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return; // hidden on small screens
      const siblings = Array.from(flow.children);
      const index = siblings.indexOf(fan);
      const after = siblings.slice(index + 1).find(isDiagramPart);
      const before = siblings.slice(0, index).reverse().find(isDiagramPart);
      const branches = direction === 'out' ? after : before;
      const trunk = direction === 'out' ? before : after;
      if (!branches || !trunk) return;
      const centre = (el: Element) => {
        const r = el.getBoundingClientRect();
        return ((r.top + r.height / 2 - rect.top) / rect.height) * 100;
      };
      const branchBoxes = branches.classList.contains('stack')
        ? Array.from(branches.querySelectorAll(':scope > .node > .node__box'))
        : [branches];
      if (branchBoxes.length !== count) {
        if (import.meta.env.DEV) console.warn(`Fan: expected ${count} branch nodes, found ${branchBoxes.length}`);
        return;
      }
      const trunkBox = trunk.querySelector(':scope > .node__box') || trunk;
      const next = { ys: branchBoxes.map(centre), origin: centre(trunkBox) };
      setGeometry((current) =>
        current &&
        current.origin === next.origin &&
        current.ys.length === next.ys.length &&
        current.ys.every((y, i) => y === next.ys[i])
          ? current
          : next
      );
    };

    update();
    const frame = window.requestAnimationFrame(update);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(update).catch(() => undefined);
    }
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update);
      observer.observe(flow);
    }
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [count, direction]);

  const ys = geometry?.ys ?? Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  const origin = geometry?.origin ?? 50;

  return (
    <>
      <div ref={ref} className={`fan fan--${direction}`} aria-hidden="true">
        <svg className="fan__lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
          {ys.map((y, i) =>
            direction === 'out' ? (
              <path key={i} d={`M0 ${origin} C 50 ${origin}, 50 ${y}, 100 ${y}`} vectorEffect="non-scaling-stroke" />
            ) : (
              <path key={i} d={`M0 ${y} C 50 ${y}, 50 ${origin}, 100 ${origin}`} vectorEffect="non-scaling-stroke" />
            )
          )}
        </svg>
        {direction === 'out' ? (
          ys.map((y, i) => <Arrowhead key={i} style={{ top: `${y}%` }} />)
        ) : (
          <Arrowhead style={{ top: `${origin}%` }} />
        )}
      </div>
      <div className="fan-mobile" aria-hidden="true">
        <Connector />
        {mobileLabel && <span className="fan__label">{mobileLabel}</span>}
      </div>
    </>
  );
}
