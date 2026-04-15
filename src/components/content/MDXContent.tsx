'use client';

import React, { useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';

interface MDXContentProps {
  code: string;
}

/**
 * Renders Velite-compiled MDX content strings.
 * Velite's s.mdx() produces a serialised JS bundle (not a React component).
 * We evaluate it at runtime using the react/jsx-runtime factory.
 */
export function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function('arguments', code);
      const result = fn(runtime);
      return result?.default ?? (() => null);
    } catch {
      return () => null;
    }
  }, [code]);

  return <Component />;
}
