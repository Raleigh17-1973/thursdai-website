import React from 'react';

type SectionVariant = 'default' | 'compact' | 'flush';
type SectionTone = 'paper' | 'ink';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  /**
   * paper: the one base surface (default). ink: the one contrast surface, reserved for the
   * closing CTA band, at most once per page. Sections paint nothing else.
   */
  tone?: SectionTone;
  className?: string;
  as?: React.ElementType;
  id?: string;
  /** Layout styles only. Any background in here is ignored: sections sit on paper or ink. */
  style?: React.CSSProperties;
}

// Padding: default 128px desktop / 80px mobile; compact 80 / 56.
const paddingMap: Record<SectionVariant, React.CSSProperties> = {
  default: { paddingTop: 'var(--section-pad)', paddingBottom: 'var(--section-pad)' },
  compact: { paddingTop: 'var(--section-pad-compact)', paddingBottom: 'var(--section-pad-compact)' },
  flush: {},
};

export function Section({
  children,
  variant = 'default',
  tone = 'paper',
  className = '',
  as: Tag = 'section',
  id,
  style,
}: SectionProps) {
  // Strip any surface paint a caller passes; The Record allows paper or ink only.
  const {
    background: _background,
    backgroundColor: _backgroundColor,
    backgroundImage: _backgroundImage,
    ...layoutStyle
  } = style ?? {};
  const classes = ['rec-section', tone === 'ink' ? 'surface-ink' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag id={id} className={classes} style={{ ...paddingMap[variant], ...layoutStyle }}>
      {children}
    </Tag>
  );
}
