'use client';

import React, { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '44px',
        height: '44px',
        borderRadius: '2px',
        background: 'var(--paper)',
        color: 'var(--ink)',
        border: '1px solid var(--ink)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.2s ease',
        zIndex: 50,
      }}
    >
      ↑
    </button>
  );
}
