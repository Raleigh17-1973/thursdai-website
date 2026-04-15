'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRICING } from '@/config/pricing';

const fmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const tokensToQueries = (tokens: number) => `~${(tokens * 1000).toLocaleString()} queries/mo`;

interface DealState {
  seats: number;
  monthlyTokensM: number;
  monthlyOutcomeCases: number;
  includeOutcome: boolean;
}

interface PricingResult {
  platform: number;
  credits: number;
  outcome: number;
  total: number;
  tier: string;
}

function calculatePricing(state: DealState): PricingResult {
  const { seatThresholds, platform, creditsPerThousandTokens, perClosedCase } = PRICING;

  let platformFee: number;
  if (state.seats < seatThresholds.smb) platformFee = platform.smb;
  else if (state.seats < seatThresholds.midmarket) platformFee = platform.midmarket;
  else if (state.seats < seatThresholds.enterprise) platformFee = platform.enterprise;
  else platformFee = platform.fortune100;

  const annualTokens = state.monthlyTokensM * 1_000_000;
  const creditsCost = (annualTokens / 1000) * creditsPerThousandTokens * 12;

  const outcomeCost = state.includeOutcome
    ? state.monthlyOutcomeCases * perClosedCase * 12
    : 0;

  const tier =
    state.seats < seatThresholds.smb
      ? 'SMB'
      : state.seats < seatThresholds.midmarket
        ? 'Mid-market'
        : state.seats < seatThresholds.enterprise
          ? 'Enterprise'
          : 'Fortune 100';

  return {
    platform: platformFee,
    credits: Math.round(creditsCost),
    outcome: Math.round(outcomeCost),
    total: Math.round(platformFee + creditsCost + outcomeCost),
    tier,
  };
}

const EXAMPLE_DEALS: Array<{
  label: string;
  acv: string;
  seats: number;
  monthlyTokensM: number;
  monthlyOutcomeCases: number;
  includeOutcome: boolean;
}> = [
  {
    label: 'SMB',
    acv: '$72K',
    seats: 400,
    monthlyTokensM: 5,
    monthlyOutcomeCases: 500,
    includeOutcome: true,
  },
  {
    label: 'Enterprise',
    acv: '$385K',
    seats: 5000,
    monthlyTokensM: 50,
    monthlyOutcomeCases: 3000,
    includeOutcome: true,
  },
  {
    label: 'Fortune 100',
    acv: '$1.2M',
    seats: 15000,
    monthlyTokensM: 250,
    monthlyOutcomeCases: 15000,
    includeOutcome: true,
  },
];

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const progress = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <label
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: disabled
              ? 'var(--color-text-tertiary)'
              : 'var(--color-text-secondary)',
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: disabled ? 'var(--color-text-tertiary)' : 'var(--color-accent)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="time-travel-slider"
        style={
          {
            '--slider-progress': `${progress}%`,
            opacity: disabled ? 0.4 : 1,
          } as React.CSSProperties
        }
        aria-label={label}
        aria-valuetext={displayValue}
      />
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: highlight ? '0.5rem 0' : '0.25rem 0',
        borderTop: highlight ? '1px solid var(--color-border-default)' : 'none',
      }}
    >
      <span
        style={{
          fontSize: highlight ? '15px' : '14px',
          fontWeight: highlight ? 700 : 400,
          color: highlight ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: highlight ? '15px' : '14px',
          fontWeight: highlight ? 700 : 400,
          color: highlight ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function DealDesigner() {
  const searchParams = useSearchParams();
  const [deal, setDeal] = useState<DealState>({
    seats: 500,
    monthlyTokensM: 10,
    monthlyOutcomeCases: 0,
    includeOutcome: false,
  });
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Pre-populate from ?example=smb|enterprise|fortune100
  useEffect(() => {
    const example = searchParams?.get('example');
    if (!example) return;
    const match = EXAMPLE_DEALS.find((e) => e.label.toLowerCase().replace(' ', '') === example.toLowerCase().replace(' ', '').replace('-', ''));
    if (match) {
      setDeal({
        seats: match.seats,
        monthlyTokensM: match.monthlyTokensM,
        monthlyOutcomeCases: match.monthlyOutcomeCases,
        includeOutcome: match.includeOutcome,
      });
      setShowBreakdown(true);
    }
  }, []); // intentionally run once on mount to read URL params

  const pricing = calculatePricing(deal);

  function loadExample(ex: (typeof EXAMPLE_DEALS)[number]) {
    setDeal({
      seats: ex.seats,
      monthlyTokensM: ex.monthlyTokensM,
      monthlyOutcomeCases: ex.monthlyOutcomeCases,
      includeOutcome: ex.includeOutcome,
    });
    setShowBreakdown(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-accent)',
          }}
        >
          Design your deal
        </span>
      </div>

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <SliderRow
          label="Seats"
          value={deal.seats}
          min={50}
          max={20000}
          step={50}
          displayValue={`${deal.seats.toLocaleString()} seats (${pricing.tier})`}
          onChange={(v) => setDeal((d) => ({ ...d, seats: v }))}
        />

        <SliderRow
          label="Monthly AI queries (approx.)"
          value={deal.monthlyTokensM}
          min={1}
          max={500}
          step={1}
          displayValue={tokensToQueries(deal.monthlyTokensM)}
          onChange={(v) => setDeal((d) => ({ ...d, monthlyTokensM: v }))}
        />

        {/* Outcome toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Outcome pricing
          </span>
          <button
            role="switch"
            aria-checked={deal.includeOutcome}
            onClick={() =>
              setDeal((d) => ({ ...d, includeOutcome: !d.includeOutcome }))
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              background: deal.includeOutcome
                ? 'var(--color-accent)'
                : 'var(--color-border-default)',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              transition: 'background 200ms ease',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                transform: deal.includeOutcome ? 'translateX(20px)' : 'translateX(0)',
                transition: 'transform 200ms ease',
              }}
            />
          </button>
        </div>

        <SliderRow
          label="Cases resolved by AI per month"
          value={deal.monthlyOutcomeCases}
          min={0}
          max={50000}
          step={100}
          displayValue={
            deal.includeOutcome
              ? `${deal.monthlyOutcomeCases.toLocaleString()} cases/mo`
              : 'Pay only when AI resolves a case (optional)'
          }
          onChange={(v) => setDeal((d) => ({ ...d, monthlyOutcomeCases: v }))}
          disabled={!deal.includeOutcome}
        />
      </div>

      {/* Summary */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-default)',
          paddingTop: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        <BreakdownRow label="Platform fee" value={`${fmt.format(pricing.platform)}/yr`} />
        <BreakdownRow label="Credits" value={`${fmt.format(pricing.credits)}/yr`} />
        <BreakdownRow
          label="Outcome"
          value={deal.includeOutcome ? `${fmt.format(pricing.outcome)}/yr` : 'Not included'}
        />
        <BreakdownRow
          label="Total ACV"
          value={`${fmt.format(pricing.total)}/yr (~${fmt.format(Math.round(pricing.total / 12))}/mo)`}
          highlight
        />
      </div>

      {/* See the breakdown toggle */}
      <div>
        <button
          onClick={() => setShowBreakdown((v) => !v)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-accent)',
            fontSize: '13px',
            fontWeight: 600,
            padding: 0,
          }}
          aria-expanded={showBreakdown}
        >
          {showBreakdown ? 'Hide breakdown ▲' : 'See the breakdown ▼'}
        </button>

        {showBreakdown && (
          <div
            style={{
              marginTop: '0.875rem',
              background: 'var(--color-surface-secondary)',
              borderRadius: '10px',
              padding: '1rem',
              fontSize: '13px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <div>
              Platform fee: {deal.seats.toLocaleString()} seats → {pricing.tier} tier ={' '}
              {fmt.format(pricing.platform)}
            </div>
            <div>
              Credits: {deal.monthlyTokensM}M tokens/mo × 12 mo × ($
              {PRICING.creditsPerThousandTokens}/1K tokens) = {fmt.format(pricing.credits)}
            </div>
            <div>
              Outcome:{' '}
              {deal.includeOutcome
                ? `${deal.monthlyOutcomeCases.toLocaleString()} cases/mo × $${PRICING.perClosedCase}/case × 12 = ${fmt.format(pricing.outcome)}`
                : 'Not included'}
            </div>
            <div
              style={{
                borderTop: '1px solid var(--color-border-default)',
                marginTop: '0.5rem',
                paddingTop: '0.5rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
              Total ACV: {fmt.format(pricing.total)}
            </div>
            <div>Monthly: {fmt.format(Math.round(pricing.total / 12))}</div>
          </div>
        )}
      </div>

      {/* Example deal cards */}
      <div>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--color-text-tertiary)',
            margin: '0 0 0.625rem 0',
          }}
        >
          Load example
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {EXAMPLE_DEALS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => loadExample(ex)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border-default)',
                background: 'var(--color-surface-secondary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  'var(--color-border-default)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
              }}
            >
              {ex.label} {ex.acv}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      {/* Illustrative pricing — confirm constants in src/config/pricing.ts before launch */}
    </div>
  );
}
