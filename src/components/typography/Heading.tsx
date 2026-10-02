import React from 'react';
import { H1_STYLE, H2_STYLE, H3_STYLE, H4_STYLE } from './scale';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function Heading1({ children, className = '', id, style }: HeadingProps) {
  return (
    <h1 id={id} className={className} style={{ ...H1_STYLE, ...style }}>
      {children}
    </h1>
  );
}

export function Heading2({ children, className = '', id, style }: HeadingProps) {
  return (
    <h2 id={id} className={className} style={{ ...H2_STYLE, ...style }}>
      {children}
    </h2>
  );
}

export function Heading3({ children, className = '', id, style }: HeadingProps) {
  return (
    <h3 id={id} className={className} style={{ ...H3_STYLE, ...style }}>
      {children}
    </h3>
  );
}

export function Heading4({ children, className = '', id, style }: HeadingProps) {
  return (
    <h4 id={id} className={className} style={{ ...H4_STYLE, ...style }}>
      {children}
    </h4>
  );
}
