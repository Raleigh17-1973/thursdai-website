'use client';

import React, { useRef, useState } from 'react';
import { Badge } from '@/components/ui/Badge';

const SNAPSHOTS = [
  {
    label: 'Today',
    date: 'April 2026',
    answer:
      "For customer-facing use cases, evaluate GPT-4o, Claude 3.5 and Gemini 2.0 Flash against your latency SLA (target P95 < 800ms) and your EU AI Act Annex III obligations. Prefer models with published system cards and audit trails. Thursdai's Role Bench v1 scores are available in /resources/role-bench.",
    changes: [
      'EU AI Act Annex III binding (Aug 2026)',
      'Role Bench v1 published',
      'Gemini 2.0 Flash added to approved list',
    ],
  },
  {
    label: '6 months ago',
    date: 'October 2025',
    answer:
      'Evaluate GPT-4o and Claude 3.5 Sonnet as primary options. Key criteria: context window (128K minimum for full ticket history), latency and vendor contractual commitments on data handling. EU AI Act compliance documentation is advisory at this stage.',
    changes: [
      'Claude 3.5 Sonnet added to approved list',
      'EU AI Act compliance moved to advisory',
    ],
  },
  {
    label: '1 year ago',
    date: 'April 2025',
    answer:
      'GPT-4 Turbo is the recommended baseline for customer-facing deployments given its production stability and vendor support. Claude 2.1 is approved for internal use only pending contract review. No Gemini models approved for production.',
    changes: [
      'GPT-4o replaced GPT-4 Turbo as primary',
      'Internal-only restriction on Claude lifted',
    ],
  },
  {
    label: '18 months ago',
    date: 'October 2024',
    answer:
      'GPT-4 Turbo only. All other models require Security review and Legal sign-off before production use. Model selection must be documented in the project FRIA. Vendor AI Act compliance documentation not yet required.',
    changes: ['Claude 2.1 added to approved list', 'FRIA requirement formalised'],
  },
  {
    label: '2 years ago',
    date: 'April 2024',
    answer:
      'GPT-4 is the only approved model for production customer-facing use. All other OpenAI and third-party models are in review. Deployments require VP Engineering sign-off. No formal AI governance framework in place.',
    changes: ['AI governance framework adopted', 'GPT-4 Turbo replaced GPT-4'],
  },
];

const QUESTION =
  'What is our recommended approach to AI model selection for customer-facing use cases?';

export function TimeTravelScrubber() {
  // index 0 = Today (newest), index 4 = oldest
  // Slider max=4: slider value 0 → SNAPSHOTS[4] (oldest), slider value 4 → SNAPSHOTS[0] (today)
  // We display newest-to-oldest left-to-right on the slider, so invert index
  const [sliderVal, setSliderVal] = useState(4); // starts at "Today"
  const [fading, setFading] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const snapshotIndex = 4 - sliderVal; // 0 = today when sliderVal=4
  const snapshot = SNAPSHOTS[snapshotIndex];

  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVal = Number(e.target.value);
    if (newVal === sliderVal) return;
    setFading(true);
    setTimeout(() => {
      setSliderVal(newVal);
      setFading(false);
    }, 200);
  }

  const progress = sliderVal / 4;
  const mono: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

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
        <p style={{ ...mono, color: 'var(--color-text-secondary)', margin: '0 0 0.5rem' }}>Question</p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            lineHeight: 1.35,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          &ldquo;{QUESTION}&rdquo;
        </p>
      </div>

      <div style={{ height: '1px', background: 'var(--color-border-default)' }} />

      {/* Answer: crossfades on change */}
      <div
        ref={answerRef}
        aria-live="polite"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 200ms ease', minHeight: '120px' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{ ...mono, color: 'var(--color-text-primary)' }}>{snapshot.label}</span>
          <span style={{ ...mono, textTransform: 'none', color: 'var(--color-text-tertiary)' }}>
            · {snapshot.date}
          </span>
        </div>
        <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--color-text-primary)', margin: 0 }}>
          {snapshot.answer}
        </p>
      </div>

      {/* What changed */}
      <div>
        <p style={{ ...mono, color: 'var(--color-text-secondary)', margin: '0 0 0.5rem 0' }}>What changed here</p>
        <div
          style={{
            opacity: fading ? 0 : 1,
            transition: 'opacity 200ms ease',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
          }}
        >
          {snapshot.changes.map((c) => (
            <Badge key={c} variant="muted" style={{ textTransform: 'none', letterSpacing: 0 }}>
              {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Slider: flat rule track with a solid indigo fill to the thumb */}
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
          <input
            type="range"
            list="time-travel-ticks"
            min={0}
            max={4}
            step={1}
            value={sliderVal}
            onChange={handleSliderChange}
            aria-label="Time-Travel slider"
            aria-valuetext={snapshot.label}
            className="time-travel-slider"
            style={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <datalist id="time-travel-ticks">
          <option value="0" />
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
        </datalist>
        <div
          style={{
            ...mono,
            textTransform: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <span>Apr 2024</span>
          <span>Oct 2024</span>
          <span>Apr 2025</span>
          <span>Oct 2025</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}