'use client';

import React, { useState } from 'react';

type CodeLanguage = 'bash' | 'typescript' | 'python' | 'yaml' | 'json' | 'text';

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  filename?: string;
  className?: string;
  /** Pre-rendered HTML from SyntaxHighlighter server component */
  highlightedHtml?: string;
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[12px] transition-colors"
      style={{
        color: copied ? 'rgb(34,197,94)' : 'rgba(255,255,255,0.5)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function CodeBlock({
  code,
  language = 'text',
  filename,
  className = '',
  highlightedHtml,
}: CodeBlockProps) {
  return (
    <div
      className={['rounded-xl overflow-hidden', className].filter(Boolean).join(' ')}
      style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span className="text-[12px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {filename ?? language}
        </span>
        <CopyButton code={code} />
      </div>

      {/* Code — use pre-rendered Shiki HTML when available, else plain pre */}
      {highlightedHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          style={{ padding: '0 1rem 1rem' }}
        />
      ) : (
        <pre
          className="overflow-x-auto p-4 text-[13px] leading-relaxed"
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            color: 'rgba(255,255,255,0.85)',
            margin: 0,
          }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
