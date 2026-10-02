import React from 'react';
import { ButtonLink } from './Button';
import { RequestPilotButton } from './RequestPilotButton';

// Home hero (plan Item 3.3): the fast path is real, so it is the primary. "Open the demo"
// goes to /demo; "Request a pilot" opens the pilot modal.
export function HeroCTAs() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ButtonLink href="/demo" variant="primary" size="lg">
        Open the demo
      </ButtonLink>
      <RequestPilotButton source="hero" variant="secondary" size="lg" />
    </div>
  );
}
