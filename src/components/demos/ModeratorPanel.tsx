'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
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

const panelVariants: Variants = {
  hidden: { opacity: 0.15, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' as const },
  }),
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
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '12px',
        padding: '1.25rem',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 150ms ease, background 150ms ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(45,212,191,0.4)';
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(45,212,191,0.04)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
      }}
      aria-label={`View full ${panel.role} response`}
    >
      <Label style={{ color: '#2dd4bf' }}>{panel.role}</Label>
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-secondary, #9CA3AF)', margin: 0 }}>
        {panel.text}
      </p>
      <span style={{ fontSize: '12px', color: '#2dd4bf', marginTop: 'auto' }}>
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
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
        }}
        aria-hidden="true"
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#0b0f19',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
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
          <Label style={{ color: '#2dd4bf', fontSize: '18px' }}>{panel.role}</Label>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#a1a1aa',
              fontSize: '20px',
              lineHeight: 1,
              padding: '4px',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#e4e4e7', margin: 0 }}>
          {panel.text}
        </p>
        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#a1a1aa',
              margin: '0 0 0.5rem 0',
            }}
          >
            Sources cited
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {panel.sources.map((src) => (
              <span key={src} style={{ fontSize: '13px', color: '#71717a' }}>
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();
  const [expandedPanel, setExpandedPanel] = useState<(typeof PANELS)[number] | null>(null);

  const animateState = shouldReduceMotion ? 'visible' : isInView ? 'visible' : 'hidden';

  return (
    <>
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1rem',
          marginTop: '2rem',
        }}
        className="md:grid-cols-4"
      >
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.role}
            custom={i}
            initial="hidden"
            animate={animateState}
            variants={panelVariants}
          >
            <PanelCard panel={panel} onClick={() => setExpandedPanel(panel)} />
          </motion.div>
        ))}

        {/* Moderator panel — delay index 4 → 600ms */}
        <motion.div
          custom={4}
          initial="hidden"
          animate={animateState}
          variants={panelVariants}
        >
          <div
            style={{
              background: 'rgba(45, 212, 191, 0.05)',
              border: '2px solid #2dd4bf',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Label style={{ color: '#2dd4bf' }}>{MODERATOR.role}</Label>
              <Badge variant="teal">Reconciled</Badge>
            </div>
            <div style={{ height: '1px', background: 'rgba(45,212,191,0.2)' }} />
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e4e4e7', margin: 0, fontWeight: 500 }}>
              {MODERATOR.text}
            </p>
            <a
              href="/product/moderator"
              style={{ fontSize: '12px', color: '#2dd4bf', textDecoration: 'none', marginTop: 'auto' }}
            >
              Read full →
            </a>
          </div>
        </motion.div>
      </div>

      {expandedPanel && (
        <OverlayPanel panel={expandedPanel} onClose={() => setExpandedPanel(null)} />
      )}
    </>
  );
}
