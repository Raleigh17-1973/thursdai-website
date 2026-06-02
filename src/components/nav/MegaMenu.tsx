'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';

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
      className="absolute top-full left-0 right-0 z-50 border-b"
      style={{
        background: 'var(--color-surface-primary)',
        borderColor: 'var(--color-border-default)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {productItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              ref={(el) => { itemRefs.current[idx] = el; }}
              onClick={onClose}
              className="flex items-start gap-3 p-4 rounded-lg transition-colors group"
              style={{ color: 'inherit', textDecoration: 'none' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--color-surface-secondary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {/* Icon placeholder */}
              <span
                className="mt-0.5 h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: 'var(--color-accent)', marginTop: '6px' }}
                aria-hidden="true"
              />
              <div>
                <div
                  className="text-[14px] font-semibold mb-1"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {item.label}
                </div>
                <div
                  className="text-[13px] leading-snug"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured callout */}
        <div
          className="border-t pt-4"
          style={{ borderColor: 'var(--color-border-default)' }}
        >
          <Link
            href="/resources/role-bench"
            role="menuitem"
            ref={(el) => { itemRefs.current[productItems.length] = el; }}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[13px] font-medium"
            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                background: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
              }}
            >
              New
            </span>
            Role Bench: see how Thursdai compares
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
