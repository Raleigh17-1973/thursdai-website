'use client';

import React, { useState, useEffect } from 'react';
import { Label } from '@/components/typography/Label';
import { Badge } from '@/components/ui/Badge';

const PANELS = [
  {
    role: 'Legal',
    text: 'Our standard vendor AI policy requires FRIA completion before tier-1 deployment. The proposed model selection aligns with Azure ELA terms. Recommend GPT-4o with standard contractual protections in place.',
    sources: ['Vendor AI Policy v2.1 §3', 'Azure ELA Terms §12', 'FRIA Checklist v1.4'],
  },
  {
    role: 'Finance',
    text: 'Current Azure ELA covers inference costs up to 50M tokens/month. GPT-4o pricing sits within the Q4 budget allocation. No additional PO required at current projected volume.',
    sources: ['Azure ELA Addendum FY24', 'Q4 Budget Allocation §7', 'Procurement Policy v3'],
  },
  {
    role: 'Engineering',
    text: "GPT-4o's 128K context window handles full ticket history without truncation. Latency benchmarks meet the 800ms P95 SLA. Integration with the existing Azure OpenAI endpoint is straightforward.",
    sources: ['Engineering Standards §4.2', 'SLA Benchmarks Report Q3', 'Azure OpenAI Integration Guide'],
  },
];

const MODERATOR = {
  role: 'Moderator',
  text: 'Consensus: proceed with GPT-4o for the customer-support triage flow. Legal confirms ELA compliance. Finance confirms budget coverage. Engineering confirms technical fit. Action: complete FRIA checklist before production deploy.',
};

function PanelCard({
  panel,
  onClick,
}: {
  panel: (typeof PANELS)[number];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none',
        font: 'inherit',
        color: 'inherit',
        margin: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        background: 'var(--color-surface-primary)',
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        padding: '1.25rem',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 150ms ease, background 150ms ease',
      }}
      aria-label={`View full ${panel.role} response`}
    >
      <Label>{panel.role}</Label>
      <div style={{ height: '1px', background: 'var(--color-border-default)' }} />
      <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-secondary)', margin: 0 }}>
        {panel.text}
      </p>
      <span style={{ fontSize: '14px', color: 'var(--color-accent)', marginTop: 'auto' }}>
        View full response →
      </span>
    </button>
  );
}

function OverlayPanel({
  panel,
  onClose,
}: {
  panel: (typeof PANELS)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${panel.role} full response`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(20, 18, 15, 0.45)',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'var(--paper)',
          border: '1px solid var(--ink)',
          borderRadius: '2px',
          padding: '2rem',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Label style={{ color: 'var(--color-text-primary)' }}>{panel.role}</Label>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--ink)',
              fontSize: '20px',
              lineHeight: 1,
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ height: '1px', background: 'var(--rule)' }} />
        <p style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>
          {panel.text}
        </p>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--ink-2)',
              margin: '0 0 0.5rem 0',
            }}
          >
            Sources cited
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {panel.sources.map((src) => (
              <span key={src} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--ink-2)' }}>
                · {src}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModeratorPanel() {
  const [expandedPanel, setExpandedPanel] = useState<(typeof PANELS)[number] | null>(null);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1rem',
          marginTop: '2rem',
        }}
        className="md:grid-cols-4"
      >
        {PANELS.map((panel) => (
          <PanelCard key={panel.role} panel={panel} onClick={() => setExpandedPanel(panel)} />
        ))}

        {/* Moderator: the reconciled answer, ruled in ink */}
        <div>
          <div
            style={{
              background: 'var(--color-surface-primary)',
              border: '1px solid var(--color-text-primary)',
              borderRadius: '2px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Label style={{ color: 'var(--color-text-primary)' }}>{MODERATOR.role}</Label>
              <Badge variant="teal">Reconciled</Badge>
            </div>
            <div style={{ height: '1px', background: 'var(--color-border-default)' }} />
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--color-text-primary)', margin: 0, fontWeight: 500 }}>
              {MODERATOR.text}
            </p>
            <a
              href="/product/moderator"
              style={{ fontSize: '14px', marginTop: 'auto' }}
            >
              Read full →
            </a>
          </div>
        </div>
      </div>

      {expandedPanel && (
        <OverlayPanel panel={expandedPanel} onClose={() => setExpandedPanel(null)} />
      )}
    </>
  );
}
