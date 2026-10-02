import * as runtime from 'react/jsx-runtime';

interface MDXContentProps {
  code: string;
}

/**
 * Renders Velite-compiled MDX content strings.
 * Velite's s.mdx() produces a function body that reads the JSX runtime from
 * arguments[0]. This is a server component on purpose: evaluating the body in
 * the browser needs 'unsafe-eval', which our CSP does not allow.
 */
export function MDXContent({ code }: MDXContentProps) {
  const Component = new Function(code)({ ...runtime }).default as React.ComponentType;
  return <Component />;
}
