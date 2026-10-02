'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { DemoRequestModal } from './DemoRequestModal';

export function ClosingCTAs() {
  const [modalOpen, setModalOpen] = useState(false);

  function scrollToDemo() {
    document.getElementById('replay-demo')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          size="lg"
          onClick={scrollToDemo}
        >
          See a replay
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setModalOpen(true)}
        >
          Request a pilot
        </Button>
      </div>
      <DemoRequestModal open={modalOpen} onClose={() => setModalOpen(false)} source="closing" />
    </>
  );
}
