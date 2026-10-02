'use client';

import React, { useState } from 'react';

type CodeLanguage = 'bash' | 'typescript' | 'python' | 'yaml' | 'json' | 'text';

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
  filename?: string;
  className?: string;
  /**
   * Deprecated: pre-rendered syntax HTML. The Record sets code in monochrome ink on the
   * sunk surface (comments in tertiary ink), so this is ignored and kept only so older
   * call sites still compile.
   */
  highlightedHtml?: string;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="rounded-[2px] px-2 py-1 transition-colors hover:bg-[var(--paper)]"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--ink-2)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const COMMENT_PREFIX: Record<CodeLanguage, RegExp | null> = {
  bash: /^\s*#/,
  python: /^\s*#/,
  yaml: /^\s*#/,
  typescript: /^\s*\/\//,
  json: null,
  text: null,
};

function renderLines(code: string, language: CodeLanguage) {
  const comment = COMMENT_PREFIX[language];
  return code.split('\n').map((line, i, all) => {
    const isComment = comment ? comment.test(line) : false;
    return (
      <React.Fragment key={i}>
        <span style={isComment ? { color: 'var(--ink-3)' } : undefined}>{line}</span>
        {i < all.length - 1 ? '\n' : null}
      </React.Fragment>
    );
  });
}

// Code sits on the sunk surface inside a hairline frame, set in Geist Mono ink.
export function CodeBlock({ code, language = 'text', filename, className = '' }: CodeBlockProps) {
  return (
    <div
      className={['overflow-hidden rounded-[2px]', className].filter(Boolean).join(' ')}
      style={{ background: 'var(--sunk)', border: '1px solid var(--rule)', color: 'var(--ink)' }}
    >
      <div
        className="flex items-center justify-between pl-5 pr-3 py-2"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.04em',
            color: 'var(--ink-2)',
          }}
        >
          {filename ?? language}
        </span>
        <CopyButton code={code} />
      </div>
      <pre
        className="overflow-x-auto"
        tabIndex={0}
        aria-label={filename ? `Code: ${filename}` : 'Code sample'}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13.5px',
          lineHeight: 1.7,
          color: 'var(--ink)',
          margin: 0,
          padding: '20px',
        }}
      >
        <code>{renderLines(code, language)}</code>
      </pre>
    </div>
  );
}
