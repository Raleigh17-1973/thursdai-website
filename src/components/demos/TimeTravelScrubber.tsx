'use client';

import React, { useId, useState } from 'react';
import { Badge } from '@/components/ui/Badge';

// Time-Travel: a question pinned to a timeline. Move the slider (mouse, touch or the arrow,
// Home and End keys on the native range input) to see what was known, which policies were
// live and who held which role at that point. Content swaps instantly: The Record allows
// three motions site-wide and this is not one of them.

export interface ReplayStateGroup {
  /** Mono label, a noun: "Knowledge", "Policy", "Roles". */
  title: string;
  items: string[];
}

export interface ReplaySnapshot {
  /** Short tick under the slider, e.g. "Sep 16". */
  tick: string;
  /** Snapshot heading, e.g. "At decision". */
  label: string;
  /** Full date or timestamp. */
  date: string;
  /** What the record shows at this point. */
  answer: string;
  /** Optional state of knowledge, policy and roles at this point. */
  state?: ReplayStateGroup[];
  /** What changed since the previous point. */
  changes: string[];
  /** The moment the receipt was recorded. Its tick is set in ink and marked on the track. */
  marker?: boolean;
}

export interface TimeTravelScrubberProps {
  question: string;
  questionLabel?: string;
  /** Oldest first. Required: the scrubber ships no built-in history, so it can never show invented events. */
  snapshots: ReplaySnapshot[];
  /** Index shown first. Defaults to the newest snapshot. */
  initialIndex?: number;
  /** Accessible name for the slider. */
  sliderLabel?: string;
  /** Text for the "marker" tag, shown on the snapshot the receipt recorded. */
  markerText?: string;
  /** Provenance footnote, e.g. SAMPLE_LABEL_SIGNED. */
  footnote?: string;
}

const MONO_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  lineHeight: 1.4,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

export function TimeTravelScrubber({
  question,
  questionLabel = 'Question',
  snapshots,
  initialIndex,
  sliderLabel = 'Time-Travel slider',
  markerText = 'On the receipt',
  footnote,
}: TimeTravelScrubberProps) {
  const last = snapshots.length - 1;
  const [index, setIndex] = useState(initialIndex ?? last);
  const snapshot = snapshots[index];
  const listId = useId();
  const progress = last > 0 ? index / last : 1;
  const markerIndex = snapshots.findIndex((s) => s.marker);

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Question */}
      <div>
        <p style={{ ...MONO_LABEL, color: 'var(--color-text-secondary)', margin: '0 0 0.5rem' }}>{questionLabel}</p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            lineHeight: 1.35,
            color: 'var(--color-text-primary)',
            margin: 0,
            textWrap: 'pretty',
          }}
        >
          &ldquo;{question}&rdquo;
        </p>
      </div>

      <div style={{ height: '1px', background: 'var(--color-border-default)' }} />

      {/* The state at the selected point */}
      <div aria-live="polite" aria-atomic="true" style={{ minHeight: '120px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.25rem 0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ ...MONO_LABEL, color: 'var(--color-text-primary)' }}>{snapshot.label}</span>
          <span style={{ ...MONO_LABEL, textTransform: 'none', color: 'var(--color-text-tertiary)' }}>
            · {snapshot.date}
          </span>
          {snapshot.marker ? (
            <span
              style={{
                ...MONO_LABEL,
                color: 'var(--ink)',
                border: '1px solid var(--ink)',
                padding: '1px 6px',
                marginLeft: '0.25rem',
              }}
            >
              {markerText}
            </span>
          ) : null}
        </div>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
          {snapshot.answer}
        </p>

        {snapshot.state?.length ? (
          <dl
            className="grid grid-cols-1 sm:grid-cols-3 gap-[2px] m-0"
            style={{ marginTop: '1rem' }}
          >
            {snapshot.state.map((g) => (
              <div key={g.title} className="px-3 py-2.5" style={{ background: 'var(--sunk)' }}>
                <dt style={{ ...MONO_LABEL, color: 'var(--ink-3)' }}>{g.title}</dt>
                {g.items.map((item) => (
                  <dd
                    key={item}
                    className="m-0 mt-1"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.45, color: 'var(--ink)', overflowWrap: 'anywhere' }}
                  >
                    {item}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* What changed */}
      <div>
        <p style={{ ...MONO_LABEL, color: 'var(--color-text-secondary)', margin: '0 0 0.5rem 0' }}>What changed here</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {snapshot.changes.map((c) => (
            <Badge key={c} variant="muted" style={{ textTransform: 'none', letterSpacing: 0 }}>
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Slider: flat rule track, solid indigo fill to the thumb, a tick at every stop */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ position: 'relative', height: '20px' }}>
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: 0, right: 0, top: '9px', height: '2px', background: 'var(--color-border-default)' }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: '9px',
              height: '2px',
              width: `calc(8px + (100% - 16px) * ${progress})`,
              background: 'var(--color-accent)',
            }}
          />
          {snapshots.map((s, i) => (
            <span
              key={s.tick}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: `calc(8px + (100% - 16px) * ${last > 0 ? i / last : 0} - 0.5px)`,
                top: i === markerIndex ? '2px' : '5px',
                width: '1px',
                height: i === markerIndex ? '16px' : '10px',
                background: i === markerIndex ? 'var(--ink)' : 'var(--ink-3)',
              }}
            />
          ))}
          <input
            type="range"
            list={listId}
            min={0}
            max={last}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-label={sliderLabel}
            aria-valuetext={`${snapshot.label}, ${snapshot.date}`}
            className="time-travel-slider"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <datalist id={listId}>
          {snapshots.map((s, i) => (
            <option key={s.tick} value={i} />
          ))}
        </datalist>
        {/* Tick labels: click targets for pointer users; the slider is the keyboard control */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          {snapshots.map((s, i) => (
            <button
              key={s.tick}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setIndex(i)}
              style={{
                ...MONO_LABEL,
                textTransform: 'none',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: i === 0 ? 'left' : i === last ? 'right' : 'center',
                color: i === index || i === markerIndex ? 'var(--ink)' : 'var(--color-text-tertiary)',
                textDecoration: i === index ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >
              {s.tick}
            </button>
          ))}
        </div>
      </div>

      {footnote ? (
        <p className="m-0" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.4, color: 'var(--ink-3)' }}>
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
