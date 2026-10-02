import React from 'react';
import { H1_STYLE, H2_STYLE } from './scale';

interface DisplayProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
  style?: React.CSSProperties;
}

// Page H1 in Newsreader (opsz 72). Rendered as h2 it takes the H2 size so the
// scale stays at three sizes above body.
export function Display({ children, className = '', as: Tag = 'h1', style }: DisplayProps) {
  const base = Tag === 'h1' ? H1_STYLE : H2_STYLE;
  return (
    <Tag className={className} style={{ ...base, ...style }}>
      {children}
    </Tag>
  );
}
