'use client';

import React, { useEffect, useRef } from 'react';
import { REDUCED_MOTION_QUERY, shouldDeferReveal } from '@/lib/motion';

// Motion behaviour 2 (src/lib/motion.ts): a product visual rises 12px and fades in the first
// time it enters the viewport, then never animates again.
//
// The server renders a plain wrapper with nothing hidden, so crawlers and no-JS readers get
// the visual in place. After hydration, and only if the wrapper is still below the fold, it
// is marked "pending" (hidden by CSS) and handed to a shared IntersectionObserver; on entry it
// becomes "in" and the CSS transition runs. Reduced motion: never marked, never hidden.

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.reveal = 'in';
          observer?.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
  }
  return observer;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    if (!shouldDeferReveal(el.getBoundingClientRect().top, window.innerHeight)) return;
    el.dataset.reveal = 'pending';
    const io = getObserver();
    io.observe(el);
    return () => {
      io.unobserve(el);
      // A remount (or a back navigation) must never leave the visual hidden.
      if (el.dataset.reveal === 'pending') delete el.dataset.reveal;
    };
  }, []);

  return (
    <div ref={ref} data-motion="reveal" className={className} style={style}>
      {children}
    </div>
  );
}
