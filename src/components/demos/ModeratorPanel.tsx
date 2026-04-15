// Server component — static hardcoded data, no interactivity.
import React from 'react';
import { Label } from '@/components/typography/Label';
import { Badge } from '@/components/ui/Badge';

const PANELS = [
  {
    role: 'Legal',
    text: 'Our standard vendor AI policy requires FRIA completion before tier-1 deployment. The proposed model selection aligns with Azure ELA terms. Recommend GPT-4o with standard contractual protections in place.',
  },
  {
    role: 'Finance',
    text: 'Current Azure ELA covers inference costs up to 50M tokens/month. GPT-4o pricing sits within the Q4 budget allocation. No additional PO required at current projected volume.',
  },
  {
    role: 'Engineering',
    text: "GPT-4o's 128K context window handles full ticket history without truncation. Latency benchmarks meet the 800ms P95 SLA. Integration with the existing Azure OpenAI endpoint is straightforward.",
  },
];

const MODERATOR = {
  role: 'Moderator',
  text: 'Consensus: proceed with GPT-4o for the customer-support triage flow. Legal confirms ELA compliance. Finance confirms budget coverage. Engineering confirms technical fit. Action: complete FRIA checklist before production deploy.',
};

export function ModeratorPanel() {
  return (
    <div
      data-animate="moderator"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '1rem',
        marginTop: '2rem',
      }}
      className="md:grid-cols-4"
    >
      {PANELS.map((panel) => (
        <div
          key={panel.role}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <Label style={{ color: '#2dd4bf' }}>{panel.role}</Label>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
            }}
          />
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#a1a1aa', margin: 0 }}>
            {panel.text}
          </p>
          <a
            href="/product/moderator"
            style={{ fontSize: '12px', color: '#2dd4bf', textDecoration: 'none', marginTop: 'auto' }}
          >
            Read full →
          </a>
        </div>
      ))}

      {/* Moderator panel — prominent */}
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
        <div
          style={{
            height: '1px',
            background: 'rgba(45,212,191,0.2)',
          }}
        />
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
    </div>
  );
}
