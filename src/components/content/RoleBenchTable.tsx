'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const DOMAINS = [
  'Legal',
  'Finance',
  'Engineering',
  'HR',
  'Compliance',
  'Healthcare',
  'Contract review',
  'Regulatory filing',
] as const;

type Column = 'domain' | 'thursdai' | 'gpt4o' | 'claude35' | 'gemini25';

export function RoleBenchTable() {
  const [sortCol, setSortCol] = useState<Column>('domain');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  function handleSort(col: Column) {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }

  const rows = [...DOMAINS].sort((a, b) => {
    if (sortCol === 'domain') {
      return sortDir === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    }
    return 0; // all scores are "—" so no numeric sort needed
  });

  function SortIcon({ col }: { col: Column }) {
    if (sortCol !== col) return <span style={{ opacity: 0.3, marginLeft: '4px' }}>↕</span>;
    return <span style={{ marginLeft: '4px' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  const thStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    userSelect: 'none',
    background: 'var(--color-accent)',
    color: '#fff',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleSort('domain')}>
              Role / Domain <SortIcon col="domain" />
            </th>
            <th style={thStyle} onClick={() => handleSort('thursdai')}>
              Thursdai Moderator <SortIcon col="thursdai" />
            </th>
            <th style={thStyle} onClick={() => handleSort('gpt4o')}>
              GPT-4o <SortIcon col="gpt4o" />
            </th>
            <th style={thStyle} onClick={() => handleSort('claude35')}>
              Claude 3.5 <SortIcon col="claude35" />
            </th>
            <th style={thStyle} onClick={() => handleSort('gemini25')}>
              Gemini 2.5 Pro <SortIcon col="gemini25" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((domain, i) => (
            <tr
              key={domain}
              style={{
                background:
                  i % 2 === 0
                    ? 'var(--color-surface-primary)'
                    : 'var(--color-surface-secondary)',
              }}
            >
              <td
                style={{
                  padding: '0.75rem 1rem',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  position: 'sticky',
                  left: 0,
                  background:
                    i % 2 === 0
                      ? 'var(--color-surface-primary)'
                      : 'var(--color-surface-secondary)',
                }}
              >
                {domain}
              </td>
              {(['thursdai', 'gpt4o', 'claude35', 'gemini25'] as const).map((col) => (
                <td key={col} style={{ padding: '0.75rem 1rem', color: 'var(--color-text-tertiary)' }}>
                  <Badge variant="muted">Coming Q3 2026</Badge>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RoleBenchSubmitForm() {
  const [fields, setFields] = useState({ roleName: '', yaml: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function update(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'role-bench-submission', ...fields }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '15px' }}>
        Received. We&apos;ll be in touch if your role is selected for the v1 benchmark.
      </p>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--color-surface-primary)',
    border: '1px solid var(--color-border-default)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {status === 'error' && (
        <p style={{ color: 'rgb(239,68,68)', fontSize: '14px' }}>Something went wrong. Please try again.</p>
      )}
      <input
        type="text"
        required
        placeholder="Role name (e.g. Healthcare Compliance)"
        aria-label="Role name"
        value={fields.roleName}
        onChange={(e) => update('roleName', e.target.value)}
        style={inputStyle}
      />
      <textarea
        required
        placeholder="Role configuration YAML"
        aria-label="Role configuration YAML"
        rows={6}
        value={fields.yaml}
        onChange={(e) => update('yaml', e.target.value)}
        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-mono, monospace)', fontSize: '13px' }}
      />
      <input
        type="email"
        required
        placeholder="Contact email"
        aria-label="Contact email"
        value={fields.email}
        onChange={(e) => update('email', e.target.value)}
        style={inputStyle}
      />
      <Button type="submit" variant="secondary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting…' : 'Submit role for evaluation'}
      </Button>
    </form>
  );
}

export function RoleBenchNotifyForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'role-bench-notify', email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '15px' }}>
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {status === 'error' && (
        <p style={{ width: '100%', color: 'rgb(239,68,68)', fontSize: '14px', textAlign: 'center' }}>
          Something went wrong. Please try again.
        </p>
      )}
      <input
        type="email"
        required
        placeholder="you@company.com"
        aria-label="Email address for Role Bench notifications"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: '1 1 220px',
          padding: '10px 14px',
          background: 'var(--color-surface-primary)',
          border: '1px solid var(--color-border-default)',
          borderRadius: '8px',
          color: 'var(--color-text-primary)',
          fontSize: '15px',
          outline: 'none',
        }}
      />
      <Button type="submit" variant="primary" size="md" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Subscribing…' : 'Notify me when results are live'}
      </Button>
    </form>
  );
}
