import React from 'react';
import { ButtonLink } from './Button';
import { RequestPilotButton } from './RequestPilotButton';

interface ClosingCTAsProps {
  /**
   * The page's primary action, repeated in its closing band (plan Item 3.3).
   * demo: "Open the demo" primary, "Request a pilot" secondary (home, product, solutions).
   * pilot: "Request a pilot" primary, "Open the demo" secondary (compare pages).
   * pilot-only: "Request a pilot" alone (/demo itself).
   */
  primary?: 'demo' | 'pilot' | 'pilot-only';
  align?: 'start' | 'center';
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}

export function ClosingCTAs({ primary = 'demo', align = 'start', size = 'lg', style }: ClosingCTAsProps) {
  const demo = (variant: 'primary' | 'secondary') => (
    <ButtonLink href="/demo" variant={variant} size={size} data-cta-location="closing" data-cta-label="Open the demo">
      Open the demo
    </ButtonLink>
  );
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        ...style,
      }}
    >
      {primary === 'demo' ? (
        <>
          {demo('primary')}
          <RequestPilotButton source="closing" variant="secondary" size={size} />
        </>
      ) : (
        <>
          <RequestPilotButton source="closing" variant="primary" size={size} />
          {primary === 'pilot' ? demo('secondary') : null}
        </>
      )}
    </div>
  );
}
