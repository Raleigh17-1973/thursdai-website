'use client';

import React, { useId, useRef, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTab, className = '', onChange }: TabsProps) {
  const uid = useId();
  const [activeId, setActiveId] = useState<string>(defaultTab ?? tabs[0]?.id ?? '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function activate(id: string) {
    setActiveId(id);
    onChange?.(id);
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      activate(tabs[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div className={className}>
      <div role="tablist" className="flex border-b" style={{ borderColor: 'var(--color-border-default)' }}>
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeId;
          const tabId = `${uid}-tab-${tab.id}`;
          const panelId = `${uid}-panel-${tab.id}`;
          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => activate(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="px-4 py-2 text-[14px] font-medium transition-colors"
              style={{
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                cursor: 'pointer',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const tabId = `${uid}-tab-${tab.id}`;
        const panelId = `${uid}-panel-${tab.id}`;
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isActive}
            className="pt-4 focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}
