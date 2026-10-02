import React from 'react';

// Linework kit (docs/design/the-record.md, "Linework"; decision D9).
// One colour: currentColor (ink) with every stroke at 60%, 1.25px, non-scaling so the
// weight holds at any size. Drawn on a 4px dot grid (dots at 12% ink); every coordinate in
// the diagrams is a multiple of 4. Labels are Geist Mono 12px. No people, no icons in circles.
// Arrowheads are drawn as paths, not markers, so every head is identical and no ids leak.

export const STROKE = 1.25;
const LINE_OPACITY = 0.6;
const TITLE_OPACITY = 0.88;
const BODY_OPACITY = 0.72;
/** Advance of one Geist Mono glyph at 12px, plus 0.04em tracking on uppercase labels. */
export const CHAR = 7.2;
export const CHAR_UPPER = 7.68;

const LINE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeOpacity: LINE_OPACITY,
  strokeWidth: STROKE,
  vectorEffect: 'non-scaling-stroke',
  strokeLinejoin: 'miter',
} as const;

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono), ui-monospace, monospace',
  fontSize: 12,
};

type Pt = readonly [number, number];

interface SheetProps {
  /** Accessible name; the same words appear in the page as the figure's legend. */
  title: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

/**
 * The drawing, at 1:1 so 12px labels stay 12px. It sits centred on the figure's dot-grid
 * plate (DiagramFigure), which is aligned so the plate's dots land on the drawing's 4px grid.
 */
export function Sheet({ title, width, height, children }: SheetProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={title}
      style={{ display: 'block', width: '100%', maxWidth: width, height: 'auto', margin: '0 auto', color: 'var(--ink)' }}
    >
      <title>{title}</title>
      {children}
    </svg>
  );
}

/** Width of every wide drawing and every narrow drawing, so the plate can align its grid. */
export const WIDE_W = 960;
export const NARROW_W = 340;
interface TextProps {
  x: number;
  y: number;
  children: string;
  anchor?: 'start' | 'middle' | 'end';
  /** label: uppercase mono title. body: sentence-case mono detail. */
  tone?: 'label' | 'body';
  /** Paint a paper knockout behind the text so it can sit on a rule. */
  knockout?: boolean;
}

export function Text({ x, y, children, anchor = 'start', tone = 'body', knockout = false }: TextProps) {
  const upper = tone === 'label';
  const content = upper ? children.toUpperCase() : children;
  const w = content.length * (upper ? CHAR_UPPER : CHAR);
  const left = anchor === 'start' ? x : anchor === 'middle' ? x - w / 2 : x - w;
  return (
    <>
      {knockout ? <rect x={left - 6} y={y - 12} width={w + 12} height={16} style={{ fill: 'var(--paper)' }} /> : null}
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill="currentColor"
        fillOpacity={upper ? TITLE_OPACITY : BODY_OPACITY}
        style={{ ...MONO, letterSpacing: upper ? '0.04em' : 0 }}
      >
        {content}
      </text>
    </>
  );
}

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  /**
   * plain: a Thursdai step. external: dashed, a system Thursdai does not run.
   * record: a signed record, drawn with the receipt's 4px offset rule.
   */
  kind?: 'plain' | 'external' | 'record';
  align?: 'start' | 'middle';
}

/** A titled box: label at +24, detail lines every 16px from +44. */
export function Box({ x, y, w, h, title, lines = [], kind = 'plain', align = 'start' }: BoxProps) {
  const tx = align === 'middle' ? x + w / 2 : x + 12;
  return (
    <g>
      {kind === 'record' ? (
        <path d={`M${x + 4} ${y + h} V${y + h + 4} H${x + w + 4} V${y + 4} H${x + w}`} {...LINE_PROPS} />
      ) : null}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        {...LINE_PROPS}
        style={{ fill: 'var(--paper)' }}
        strokeDasharray={kind === 'external' ? '4 4' : undefined}
      />
      <Text x={tx} y={y + 24} tone="label" anchor={align}>
        {title}
      </Text>
      {lines.map((l, i) => (
        <Text key={l} x={tx} y={y + 44 + i * 16} anchor={align}>
          {l}
        </Text>
      ))}
    </g>
  );
}

/** A plain rule (no head), for tracks, buses and brackets. */
export function Line({ points, dashed = false }: { points: readonly Pt[]; dashed?: boolean }) {
  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  return <path d={d} {...LINE_PROPS} strokeDasharray={dashed ? '4 4' : undefined} />;
}

interface ArrowProps {
  /** Orthogonal polyline; the head sits on the last point, facing the last segment. */
  points: readonly Pt[];
  /** arrow: open chevron. bar: a stop, for a path that is refused. */
  end?: 'arrow' | 'bar';
}

export function Arrow({ points, end = 'arrow' }: ArrowProps) {
  const [x, y] = points[points.length - 1];
  const [px, py] = points[points.length - 2];
  const dx = Math.sign(x - px);
  const dy = Math.sign(y - py);
  // Head: 6 long, 4 either side. Perpendicular axis is (-dy, dx).
  const head =
    end === 'arrow'
      ? `M${x - dx * 6 - dy * 4} ${y - dy * 6 + dx * 4} L${x} ${y} L${x - dx * 6 + dy * 4} ${y - dy * 6 - dx * 4}`
      : `M${x - dy * 8} ${y + dx * 8} L${x + dy * 8} ${y - dx * 8}`;
  return (
    <g>
      <Line points={points} />
      <path d={head} {...LINE_PROPS} />
    </g>
  );
}

/** A junction where lines merge, or a marked point on a track. */
export function Node({ x, y, shape = 'dot' }: { x: number; y: number; shape?: 'dot' | 'square' }) {
  return shape === 'dot' ? (
    <circle cx={x} cy={y} r={2.5} fill="currentColor" fillOpacity={LINE_OPACITY} />
  ) : (
    <rect x={x - 3} y={y - 3} width={6} height={6} fill="currentColor" fillOpacity={LINE_OPACITY} />
  );
}

/** A dashed boundary with its label knocked out of the top edge. */
export function Bracket({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} {...LINE_PROPS} strokeDasharray="2 4" />
      <Text x={x + 16} y={y + 4} tone="label" knockout>
        {label}
      </Text>
    </g>
  );
}
