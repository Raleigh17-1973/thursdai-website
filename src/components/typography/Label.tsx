import React from 'react';
import { LABEL_STYLE } from './scale';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: 'span' | 'p' | 'div';
}

// Geist Mono 12px uppercase, 0.04em, secondary ink. Labels are nouns, not slogans.
// Uppercase is set with text-transform rather than synthesized small caps: Geist Mono
// ships no small-cap glyphs and a synthesized 12px small cap falls below legible size.
export function Label({ children, className = '', style, as: Tag = 'span' }: LabelProps) {
  return (
    <Tag className={className} style={{ display: 'block', ...LABEL_STYLE, ...style }}>
      {children}
    </Tag>
  );
}
