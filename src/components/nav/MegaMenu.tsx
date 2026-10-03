'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';
import { MOTION_CLASS } from '@/lib/motion';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const productItem = NAV_ITEMS.find((item) => item.label === 'Product');
const productItems = productItem && 'items' in productItem ? productItem.items : [];

export function MegaMenu({ isOpen, onClose, triggerRef }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const focused = document.activeElement;
        const idx = itemRefs.current.indexOf(focused as HTMLAnchorElement);
        const next = idx < itemRefs.current.length - 1 ? idx + 1 : 0;
        itemRefs.current[next]?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const focused = document.activeElement;
        const idx = itemRefs.current.indexOf(focused as HTMLAnchorElement);
        const prev = idx > 0 ? idx - 1 : itemRefs.current.length - 1;
        itemRefs.current[prev]?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(e: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Product features"
      className={`absolute top-full left-0 right-0 z-50 ${MOTION_CLASS.panel}`}
      style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--ink)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 mb-6">
          {productItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              ref={(el) => { itemRefs.current[idx] = el; }}
              onClick={onClose}
              className="flex items-start gap-4 p-4 rounded-[2px] no-underline hover:no-underline hover:bg-[var(--sunk)] transition-colors"
              style={{ color: 'inherit' }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: '22px',
                  color: 'var(--ink-3)',
                  flexShrink: 0,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-[15px] font-medium mb-1" style={{ color: 'var(--ink)' }}>
                  {item.label}
                </div>
                <div className="text-[14px] leading-snug" style={{ color: 'var(--ink-2)' }}>
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}