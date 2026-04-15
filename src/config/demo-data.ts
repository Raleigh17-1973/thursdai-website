// Canned replay demo data — used by the ReplayDemo component
// All data is static (no runtime fetch) to ensure fast LCP.
// See implementation plan: Week 5 Days 29–31.

export const DEMO_DECISIONS = [
  {
    id: 'model-selection',
    question: 'Should we use GPT-4o or Claude 3.5 for our customer-support triage flow?',
    date: '2024-09-15',
    roleBreakdown: { Legal: 10, Engineering: 70, Finance: 20 },
    answer: 'Based on your latency requirements and existing Azure contract, GPT-4o is recommended for the triage flow. Engineering notes that the 128K context window handles full ticket history. Finance flags that your ELA covers inference costs at current volume.',
    provenance: [
      { text: 'Based on your latency requirements and existing Azure contract,', source: 'IT Infrastructure Policy v3.2', section: '4.1 — Vendor Selection', confidence: 0.94 },
      { text: 'GPT-4o is recommended for the triage flow.', source: 'Engineering Standards: AI Model Selection', section: 'Customer-Facing Use Cases', confidence: 0.91 },
      { text: 'Finance flags that your ELA covers inference costs at current volume.', source: 'Azure Enterprise Agreement FY24', section: 'AI Services Addendum', confidence: 0.88 },
    ],
  },
  {
    id: 'conversation-logs',
    question: 'What is our policy on storing conversation logs for QA purposes?',
    date: '2024-03-10',
    roleBreakdown: { Legal: 60, Engineering: 25, Finance: 15 },
    answer: 'Conversation logs may be retained for up to 90 days for QA purposes. PII must be redacted within 24 hours of capture. Legal notes the updated GDPR enforcement guidance from March 2024 requires explicit consent for logs used in model evaluation.',
    provenance: [
      { text: 'Conversation logs may be retained for up to 90 days for QA purposes.', source: 'Data Retention Policy v2.1', section: '3 — AI System Logs', confidence: 0.97 },
      { text: 'PII must be redacted within 24 hours of capture.', source: 'Privacy Engineering Standards', section: '7.2 — Real-Time Redaction', confidence: 0.95 },
      { text: 'Legal notes the updated GDPR enforcement guidance from March 2024', source: 'Legal Bulletin: GDPR AI Enforcement Q1 2024', section: 'Key Changes', confidence: 0.92 },
    ],
  },
  {
    id: 'ai-agent-deployment',
    question: 'What due diligence steps are required before deploying an AI agent to a tier-1 client?',
    date: '2025-01-20',
    roleBreakdown: { Legal: 40, Engineering: 35, Finance: 25 },
    answer: 'Tier-1 client deployments require: (1) FRIA completed and signed by Legal, (2) pen-test of the agent endpoint, (3) client data isolation verified by Engineering, (4) pricing approval from Finance for any custom SLA. Updated after the Q4 2024 near-miss incident.',
    provenance: [
      { text: 'Tier-1 client deployments require: (1) FRIA completed and signed by Legal,', source: 'Client Deployment Runbook v1.4', section: '2 — Tier Classification', confidence: 0.96 },
      { text: '(2) pen-test of the agent endpoint,', source: 'Security Engineering Standards', section: '8.1 — Pre-Production Checklist', confidence: 0.93 },
      { text: 'Updated after the Q4 2024 near-miss incident.', source: 'Post-Incident Review: Q4 2024', section: 'Action Items', confidence: 0.89 },
    ],
  },
] as const;
