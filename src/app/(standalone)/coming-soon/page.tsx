import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thursdai: Coming Soon',
  description:
    'Thursdai is AI governance infrastructure for regulated enterprises. Decision replay, role-based moderation and policy-as-code. Launching soon.',
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <div
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: '#0a0a0e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dawn ambient glow */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%',
          width: '55%', height: '65%',
          background: 'radial-gradient(ellipse at center, rgba(62,79,184,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', top: '5%', right: '-5%',
          width: '45%', height: '55%',
          background: 'radial-gradient(ellipse at center, rgba(91,58,122,0.16) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '25%',
          width: '40%', height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(232,163,74,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '640px', width: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '2rem',
        textAlign: 'center',
      }}>

        {/* Wordmark */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          {/* Logo arc — simplified SVG of the rising T */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="dawnArc" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e2a5a" />
                <stop offset="55%" stopColor="#5b3a7a" />
                <stop offset="100%" stopColor="#e8a34a" />
              </linearGradient>
            </defs>
            {/* Horizon line */}
            <line x1="2" y1="26" x2="34" y2="26" stroke="url(#dawnArc)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Rising arc / T crossbar */}
            <path d="M8 26 Q18 6 28 26" stroke="url(#dawnArc)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* T stem */}
            <line x1="18" y1="14" x2="18" y2="26" stroke="url(#dawnArc)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span style={{
            fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em',
            color: '#e4e4e9', fontFamily: 'var(--font-sans)',
          }}>
            Thursdai
          </span>
        </div>

        {/* Overline */}
        <p style={{
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #3e4fb8, #5b3a7a, #e8a34a)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
        }}>
          AI Governance Infrastructure
        </p>

        {/* Main headline */}
        <h1 style={{
          fontFamily: 'var(--font-display, "Instrument Serif", Georgia, serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#e4e4e9',
          margin: 0,
        }}>
          Something deliberate<br />
          <span style={{
            background: 'linear-gradient(135deg, #8b9ef0 0%, #c084fc 55%, #e8a34a 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            is almost here.
          </span>
        </h1>

        {/* Body copy */}
        <p style={{
          fontSize: '17px', lineHeight: 1.7,
          color: '#a1a1b0', margin: 0,
          maxWidth: '520px',
        }}>
          Thursdai gives regulated enterprises an AI layer that can explain every
          decision, enforce policy automatically and pass any audit. We&apos;re
          putting the finishing touches on the full site.
        </p>

        {/* Teaser bullets */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          width: '100%',
          display: 'flex', flexDirection: 'column', gap: '0.875rem',
          textAlign: 'left',
        }}>
          <p style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#8b9ef0',
            margin: '0 0 0.25rem 0',
          }}>
            What&apos;s coming
          </p>
          {[
            ['Role-based moderation', 'Legal, Finance and Engineering weigh in on every AI decision, automatically.'],
            ['Decision replay', 'Rewind any AI answer to see exactly which sources, policies and roles shaped it.'],
            ['Policy-as-code', 'Enforce your company\'s AI rules in YAML. No vendor calls required.'],
            ['Published pricing', 'No "contact sales." Real numbers, online, right now.'],
            ['EU AI Act readiness', 'Built-in Annex III documentation, FRIA templates and human-override controls.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #8b9ef0, #e8a34a)',
                marginTop: '7px',
              }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#e4e4e9' }}>{title}</span>
                <span style={{ fontSize: '14px', color: '#a1a1b0' }}>: {desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <Link
            href="mailto:thursdai@getthursdai.com"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #1e2a5a 0%, #5b3a7a 55%, #e8a34a 100%)',
              color: '#ffffff', fontWeight: 600, fontSize: '15px',
              borderRadius: '10px', textDecoration: 'none',
              width: '100%', maxWidth: '320px',
              transition: 'opacity 150ms ease',
            }}
          >
            Get early access →
          </Link>
          <p style={{ fontSize: '12px', color: '#525260', margin: 0 }}>
            Or reach us at{' '}
            <a href="mailto:thursdai@getthursdai.com" style={{ color: '#8b9ef0', textDecoration: 'none' }}>
              thursdai@getthursdai.com
            </a>
          </p>
        </div>

        {/* Footer note */}
        <p style={{ fontSize: '12px', color: '#3a3a46', margin: 0 }}>
          © {new Date().getFullYear()} Thursdai. Building in public.
        </p>
      </div>
    </div>
  );
}
