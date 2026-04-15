'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { DemoRequestModal } from './DemoRequestModal';

export function EnterpriseCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DemoRequestModal open={open} onClose={() => setOpen(false)} />
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        Request a demo
      </Button>
    </>
  );
}
