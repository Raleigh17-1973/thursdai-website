import React from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import type { Capture } from './captures';

// A real product capture in The Record's frame (docs/design/the-record.md): 1px ink rule,
// 2px radius, paper margin, a neutral mono title bar and a mono caption. No shadow: the offset
// rule belongs to the receipt alone. Captures always sit below the fold, so the image is lazy
// and never the LCP element; width and height are explicit, so nothing shifts.

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.5,
};

// Rendered image widths inside the 1200px Container (1120px inner, 12 columns, 32px gaps),
// less the frame's paper margin. Below 768px the gutters are 24px.
export const CAPTURE_SIZES = {
  /** Six of twelve columns from lg up. */
  half: '(min-width: 1200px) 512px, (min-width: 1024px) calc(50vw - 86px), (min-width: 768px) calc(100vw - 112px), calc(100vw - 66px)',
  /** Eight of twelve columns from lg up. */
  eight: '(min-width: 1200px) 702px, (min-width: 1024px) calc(66vw - 98px), (min-width: 768px) calc(100vw - 112px), calc(100vw - 66px)',
  /** The full container. */
  full: '(min-width: 1200px) 1088px, (min-width: 768px) calc(100vw - 112px), calc(100vw - 66px)',
} as const;

interface ProductCaptureProps {
  capture: Capture;
  /** The `sizes` attribute for the rendered width of the image at each breakpoint. */
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductCapture({ capture, sizes, className, style }: ProductCaptureProps) {
  return (
    <Reveal className={className} style={style}>
      <figure className="m-0">
        <div style={{ border: '1px solid var(--ink)', borderRadius: '2px', background: 'var(--paper)', overflow: 'hidden' }}>
          <div
            style={{
              ...MONO,
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.5rem 0.875rem',
              borderBottom: '1px solid var(--rule)',
              fontSize: '11px',
              color: 'var(--ink-3)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{capture.label}</span>
            <span aria-hidden="true">Staging</span>
          </div>
          <div style={{ padding: 'clamp(8px, 1.4vw, 16px)' }}>
            <Image
              src={capture.src}
              width={capture.width}
              height={capture.height}
              alt={capture.alt}
              sizes={sizes}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', outline: '1px solid var(--rule)' }}
            />
          </div>
        </div>
        <figcaption style={{ ...MONO, marginTop: '0.875rem', color: 'var(--ink-3)', textWrap: 'pretty' }}>
          {capture.caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
