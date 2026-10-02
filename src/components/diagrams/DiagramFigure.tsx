import React from 'react';
import { LABEL_STYLE } from '@/components/typography/scale';
import { Reveal } from '@/components/motion/Reveal';
import { NARROW_W, WIDE_W } from './kit';

export interface LegendItem {
  term: string;
  detail: string;
}

interface DiagramFigureProps {
  /** Title block, top left, in mono. */
  title: string;
  /** Horizontal drawing, shown from 1024px. */
  wide: React.ReactNode;
  /** Vertical drawing for phones and tablets, drawn at 340 wide so 12px labels stay 12px. */
  narrow: React.ReactNode;
  /** The drawing in words. Always on the page, so nothing lives only inside the SVG. */
  legend: LegendItem[];
}

/**
 * The dot-grid plate: 12% ink dots every 4px across the full column. The tile is offset so a
 * dot sits exactly on the centred drawing's origin, which puts every grid coordinate in the
 * drawing on a dot.
 */
function plate(drawingWidth: number, padY: number): React.CSSProperties {
  return {
    padding: `${padY}px 0`,
    backgroundImage: 'radial-gradient(circle, rgba(20, 18, 15, 0.12) 0.7px, transparent 0.9px)',
    backgroundSize: '4px 4px',
    backgroundPosition: `calc(50% - ${drawingWidth / 2}px) ${padY - 2}px`,
  };
}

// A drawing set like a plate in a technical document: a title block on an ink rule, the
// drawing, then its legend under a hairline. One drawing is rendered at a time (the other is
// display:none), so assistive tech meets one image plus the legend text.
export function DiagramFigure({ title, wide, narrow, legend }: DiagramFigureProps) {
  const cols =
    legend.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : legend.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <Reveal>
      <figure className="m-0" style={{ borderTop: '1px solid var(--ink)' }}>
        <div style={{ padding: '0.75rem 0' }}>
          <span style={{ ...LABEL_STYLE, color: 'var(--ink)' }}>{title}</span>
        </div>
        <div className="hidden lg:block" style={plate(WIDE_W, 40)}>
          {wide}
        </div>
        <div className="lg:hidden" style={plate(NARROW_W, 32)}>
          {narrow}
        </div>
        <figcaption style={{ borderTop: '1px solid var(--rule)' }}>
          <dl className={`m-0 grid grid-cols-1 ${cols} gap-x-8 gap-y-6`} style={{ paddingTop: '1.5rem' }}>
            {legend.map((l) => (
              <div key={l.term}>
                <dt style={{ ...LABEL_STYLE, color: 'var(--ink)' }}>{l.term}</dt>
                <dd className="m-0" style={{ marginTop: '0.5rem', fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-secondary)' }}>
                  {l.detail}
                </dd>
              </div>
            ))}
          </dl>
        </figcaption>
      </figure>
    </Reveal>
  );
}
