import React from 'react';
import { RequestPilotButton } from './RequestPilotButton';

// Closing action on the deployment page: the same pilot request as everywhere else.
export function EnterpriseCTA() {
  return <RequestPilotButton source="closing" />;
}
