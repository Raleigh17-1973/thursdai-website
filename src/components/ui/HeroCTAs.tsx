'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { DemoRequestModal } from './DemoRequestModal';

export function HeroCTAs() {
  const [modalOpen, setModalOpen] = useState(false);

  function scrollToDemo() {
    const el = document.getElementById('replay-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg" onClick={scrollToDemo}>
          Try the replay demo
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setModalOpen(true)}>
          Get a tenant pilot
        </Button>
      </div>
      <DemoRequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
