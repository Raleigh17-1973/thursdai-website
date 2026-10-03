'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { DemoRequestModal, type CtaLocation } from './DemoRequestModal';
import { track } from '@/lib/analytics';

interface RequestPilotButtonProps {
  /** Which placement opened the modal; sent with the lead as cta_location. */
  source: CtaLocation;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// The one way the site asks for a pilot: a button that opens the pilot request modal.
// A client island so the pages around it stay server components.
export function RequestPilotButton({
  source,
  variant = 'primary',
  size = 'lg',
  className,
  style,
  children = 'Request a pilot',
}: RequestPilotButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} size={size} className={className} style={style} onClick={() => {
          track({ name: 'cta_click', props: { location: source, label: typeof children === 'string' ? children : 'Request a pilot' } });
          setOpen(true);
        }}
      >
        {children}
      </Button>
      <DemoRequestModal open={open} onClose={() => setOpen(false)} source={source} />
    </>
  );
}
