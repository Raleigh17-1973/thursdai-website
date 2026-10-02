import { ImageResponse } from 'next/og';

// Share card drawn as an AI Receipt: paper, ink, mono fields, the decision
// line, and amber only on the signature rule. Field layout follows
// components/demos/AiReceiptCard.tsx without importing it (satori cannot
// render CSS variables or client components).

export const runtime = 'edge';
export const alt = 'Thursdai: a signed record for every AI decision';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#F7F5F0';
const INK = '#14120F';
const INK_SECONDARY = '#5A5650';
const RULE = 'rgba(20, 18, 15, 0.18)';
const AMBER = '#e8a34a';
const INDIGO = '#3e4fb8';

const DECISION = 'A signed record for every AI decision.';

const FIELDS: [string, string][] = [
  ['Recorded', '2026-10-02 14:32 UTC'],
  ['System', 'Screening agent'],
  ['Policies', 'll144, pii-block'],
  ['Risk tier', 'High / Annex III'],
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'GeistMono', fontSize: 18, letterSpacing: 1, color: INK_SECONDARY, textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'GeistMono', fontSize: 22, color: INK }}>{value}</span>
    </div>
  );
}

export default async function OpenGraphImage() {
  const [mono, sans] = await Promise.all([
    fetch(new URL('../assets/fonts/GeistMono-Regular.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../assets/fonts/Geist-Medium.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PAPER,
          color: INK,
          padding: '56px 72px',
          fontFamily: 'Geist',
        }}
      >
        {/* Header row: receipt title and id */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: `1px solid ${INK}`,
            paddingBottom: 18,
            fontFamily: 'GeistMono',
            fontSize: 20,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          <span>AI Receipt</span>
          <span style={{ color: INK_SECONDARY, textTransform: 'none' }}>rcpt_7f3a91c2</span>
        </div>

        {/* Decision line */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40 }}>
          <span style={{ fontFamily: 'GeistMono', fontSize: 18, letterSpacing: 1, color: INK_SECONDARY, textTransform: 'uppercase' }}>
            Decision
          </span>
          <span style={{ fontSize: 60, lineHeight: 1.08, letterSpacing: -1.5, marginTop: 10 }}>{DECISION}</span>
        </div>

        {/* Fields */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
          }}
        >
          {FIELDS.map(([label, value]) => (
            <Field key={label} label={label} value={value} />
          ))}
        </div>

        {/* Signature: amber rule above the Signed mark, wordmark right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 420 }}>
            <div style={{ display: 'flex', height: 3, background: AMBER }} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 12, fontFamily: 'GeistMono' }}>
              <span style={{ fontSize: 22, letterSpacing: 2, textTransform: 'uppercase', color: INK }}>Signed</span>
              <span style={{ fontSize: 18, color: INK_SECONDARY }}>sha256 a1b2c4…e9f0</span>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 44 }}>
            <span>thursd</span>
            {/* satori pads between text runs; pull the coloured half back flush */}
            <span style={{ color: INDIGO, marginLeft: -6 }}>ai</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'GeistMono', data: mono, style: 'normal', weight: 400 },
        { name: 'Geist', data: sans, style: 'normal', weight: 500 },
      ],
    },
  );
}
