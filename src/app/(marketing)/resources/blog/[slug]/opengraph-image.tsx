import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/velite';
import { ogPostDate, ogSection, ogSource, ogTitleSize } from '@/lib/blog-og';
import { SITE_URL } from '@/config/site';

// Blog share card, drawn in the receipt frame of src/app/opengraph-image.tsx: paper, ink, a
// mono header, the post title where a receipt puts its decision, the post date as the
// timestamp. It deliberately carries no signature, seal or hash: a post is not a signed
// record, so the card borrows the frame and stops short of the claim. Amber stays on the
// one rule above the wordmark, as on the site card.
//
// Edge, like the root card, with fonts vendored in src/assets/fonts. Posts are read from the
// Velite output at request time; an unknown or draft slug returns 404 rather than a card.

export const runtime = 'edge';
export const alt = 'Thursdai journal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#F7F5F0';
const INK = '#14120F';
const INK_SECONDARY = '#4E4A44';
const RULE = 'rgba(20, 18, 15, 0.18)';
const AMBER = '#e8a34a';
const INDIGO = '#3e4fb8';

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

export default async function BlogOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return new Response('Not found', { status: 404 });

  const [mono, sans] = await Promise.all([
    fetch(new URL('../../../../../assets/fonts/GeistMono-Regular.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
    fetch(new URL('../../../../../assets/fonts/Geist-Medium.ttf', import.meta.url)).then((r) => r.arrayBuffer()),
  ]);

  const fields: [string, string][] = [
    ['Published', ogPostDate(post.date)],
    ['Section', ogSection(post.category)],
    ['Source', ogSource(SITE_URL)],
  ];

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
        {/* Header row: section term and the post's slug, as a receipt shows term and id */}
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
          <span>Journal</span>
          <span style={{ color: INK_SECONDARY, textTransform: 'none' }}>{slug}</span>
        </div>

        {/* The decision line: the post title */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 36 }}>
          <span style={{ fontSize: ogTitleSize(post.title), lineHeight: 1.08, letterSpacing: -1.5 }}>{post.title}</span>
        </div>

        {/* Fields, with the date as the timestamp */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
          }}
        >
          {fields.map(([label, value]) => (
            <Field key={label} label={label} value={value} />
          ))}
        </div>

        {/* Amber rule and wordmark */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 32 }}>
          <div style={{ display: 'flex', width: 420, height: 3, background: AMBER }} />
          <div style={{ display: 'flex', fontSize: 44 }}>
            <span>thursd</span>
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
