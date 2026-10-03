'use client';

import React from 'react';
import { Tabs } from '@/components/ui/Tabs';
import { CodeBlock } from '@/components/ui/CodeBlock';

// Three example rules in the shape the policy engine evaluates: an expression tree built from
// all, any, not, eq, neq, gt, lt and in over a context (user, org, resource, action, tier),
// with an effect of allow, deny, require-approval or redact. Each is shown against two
// contexts, one that matches and one that does not. The results are what the engine returns
// for that rule and context. Nothing here claims what an effect then does to a response.

interface Case {
  context: string;
  result: string;
}

interface Preset {
  id: string;
  label: string;
  rule: string;
  cases: [Case, Case];
}

const NO_MATCH = 'No effect. The rule does not match.';

const PRESETS: Preset[] = [
  {
    id: 'approval-limit',
    label: 'Approval above a limit',
    rule: `{
  "ruleId": "contract-approval-limit",
  "domain": "approval",
  "version": "v1",
  "effect": "require-approval",
  "ast": { "op": "gt", "path": "resource.contract_value", "value": 500000 }
}`,
    cases: [
      { context: '{ "action": "sign_contract", "resource": { "contract_value": 750000 } }', result: 'require-approval' },
      { context: '{ "action": "sign_contract", "resource": { "contract_value": 40000 } }', result: NO_MATCH },
    ],
  },
  {
    id: 'who-may-act',
    label: 'Who may act',
    rule: `{
  "ruleId": "recruiter-advance",
  "domain": "rbac",
  "version": "v1",
  "effect": "allow",
  "ast": {
    "op": "all",
    "of": [
      { "op": "eq", "path": "user.role", "value": "recruiter" },
      { "op": "in", "path": "action", "value": ["advance", "reject"] }
    ]
  }
}`,
    cases: [
      { context: '{ "user": { "role": "recruiter" }, "action": "advance" }', result: 'allow' },
      { context: '{ "user": { "role": "contractor" }, "action": "advance" }', result: NO_MATCH },
    ],
  },
  {
    id: 'redact-export',
    label: 'Redact an export',
    rule: `{
  "ruleId": "export-redaction",
  "domain": "pii",
  "version": "v1",
  "effect": "redact",
  "ast": {
    "op": "all",
    "of": [
      { "op": "eq", "path": "action", "value": "export" },
      { "op": "not", "of": { "op": "eq", "path": "resource.classification", "value": "public" } }
    ]
  }
}`,
    cases: [
      { context: '{ "action": "export", "resource": { "classification": "internal" } }', result: 'redact' },
      { context: '{ "action": "export", "resource": { "classification": "public" } }', result: NO_MATCH },
    ],
  },
];

const PANE_LABEL: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
  margin: '0 0 0.5rem 0',
};

const MONO_VALUE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'var(--color-text-primary)',
  margin: 0,
  overflowWrap: 'anywhere',
};

function CaseView({ context, result }: Case) {
  return (
    <div style={{ padding: '1rem', background: 'var(--color-surface-secondary)', borderRadius: '2px' }}>
      <p style={PANE_LABEL}>Context</p>
      <p style={MONO_VALUE}>{context}</p>
      <p style={{ ...PANE_LABEL, marginTop: '0.875rem' }}>Engine result</p>
      <p style={{ ...MONO_VALUE, fontWeight: 500 }}>{result}</p>
    </div>
  );
}

function CasesView({ preset }: { preset: Preset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CaseView {...preset.cases[0]} />
      <CaseView {...preset.cases[1]} />
    </div>
  );
}

export function PolicyEditor() {
  const tabs = PRESETS.map((preset) => ({
    id: preset.id,
    label: preset.label,
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="md:grid-cols-2">
        <CodeBlock code={preset.rule} language="json" filename="rule.json" />
        <CasesView preset={preset} />
      </div>
    ),
  }));

  return (
    <div
      style={{
        border: '1px solid var(--color-border-default)',
        borderRadius: '2px',
        background: 'var(--color-surface-primary)',
        padding: '1.5rem',
        overflow: 'hidden',
      }}
    >
      <Tabs tabs={tabs} />
      <p style={{ ...PANE_LABEL, textTransform: 'none', margin: '1.25rem 0 0' }}>
        Example rules in the policy engine&apos;s format. They are not a customer&apos;s policies.
      </p>
    </div>
  );
}
