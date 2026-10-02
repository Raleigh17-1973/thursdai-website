import React from 'react';
import { Badge } from './Badge';

interface TimelineItem {
  date: string;
  title: string;
  description?: string;
  status: 'done' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const dotColors: Record<TimelineItem['status'], string> = {
  done: 'var(--color-text-primary)',
  current: 'var(--color-accent)',
  upcoming: 'var(--color-border-strong)',
};

const badgeVariants: Record<TimelineItem['status'], 'green' | 'amber' | 'muted'> = {
  done: 'green',
  current: 'amber',
  upcoming: 'muted',
};

const badgeLabels: Record<TimelineItem['status'], string> = {
  done: 'Complete',
  current: 'In Progress',
  upcoming: 'Planned',
};

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <ol className={['relative flex flex-col gap-0', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          {/* Left column: dot + line */}
          <div className="flex flex-col items-center" style={{ width: '20px', flexShrink: 0 }}>
            <div
              className="w-2.5 h-2.5 mt-1.5 flex-shrink-0"
              style={{ background: dotColors[item.status] }}
            />
            {i < items.length - 1 && (
              <div
                className="flex-1 mt-1"
                style={{ width: '1px', background: 'var(--color-border-default)', minHeight: '32px' }}
              />
            )}
          </div>

          {/* Right column: content */}
          <div className="pb-8 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.04em', color: 'var(--color-text-secondary)' }}>
                {item.date}
              </span>
              <Badge variant={badgeVariants[item.status]}>{badgeLabels[item.status]}</Badge>
            </div>
            <p className="text-[17px] font-medium m-0" style={{ color: 'var(--color-text-primary)' }}>
              {item.title}
            </p>
            {item.description && (
              <p className="mt-1 mb-0 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
