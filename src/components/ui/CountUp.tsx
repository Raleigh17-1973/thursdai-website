'use client';
import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  duration?: number; // ms, default 1800
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ to, duration = 1800, decimals = 0, prefix = '', suffix = '', className = '' }: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setValue(parseFloat((eased * to).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}{suffix}
    </span>
  );
}
