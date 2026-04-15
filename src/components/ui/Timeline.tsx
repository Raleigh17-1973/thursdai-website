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
  done: 'rgb(34,197,94)',
  current: 'rgb(245,158,11)',
  upcoming: 'var(--color-border-default)',
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
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-2"
              style={{
                background: dotColors[item.status],
                boxShadow: `0 0 0 3px color-mix(in srgb, ${dotColors[item.status]} 20%, transparent)`,
              }}
            />
            {i < items.length - 1 && (
              <div
                className="flex-1 mt-1"
                style={{ width: '2px', background: 'var(--color-border-default)', minHeight: '32px' }}
              />
            )}
          </div>

          {/* Right column: content */}
          <div className="pb-8 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>
                {item.date}
              </span>
              <Badge variant={badgeVariants[item.status]}>{badgeLabels[item.status]}</Badge>
            </div>
            <p className="text-[15px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {item.title}
            </p>
            {item.description && (
              <p className="mt-1 text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
