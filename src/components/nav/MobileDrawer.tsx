'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when opened
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const productItem = NAV_ITEMS.find((item) => item.label === 'Product');
  const productItems = productItem && 'items' in productItem ? productItem.items : [];
  const otherItems = NAV_ITEMS.filter((item) => item.label !== 'Product');

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[199] transition-opacity duration-250"
        style={{
          background: 'rgba(0,0,0,0.5)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed top-0 right-0 h-full w-[280px] z-[200] flex flex-col"
        style={{
          background: 'var(--color-surface-primary)',
          boxShadow: 'var(--shadow-lg)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--color-border-default)', height: '64px' }}
        >
          <span
            className="text-[15px] font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Menu
          </span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-8 h-8 rounded-md"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-6">
          {/* Product sub-list */}
          <div className="mb-6">
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.08em] px-2 mb-3"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Product
            </div>
            <ul className="space-y-1 list-none p-0 m-0">
              {productItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2 px-2 py-2.5 rounded-md text-[15px]"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--color-surface-secondary)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-accent)' }}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other nav items */}
          <ul className="space-y-1 list-none p-0 m-0">
            {otherItems.map((item) => (
              'href' in item && (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-2 py-2.5 rounded-md text-[15px] font-medium"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--color-surface-secondary)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div
          className="px-4 py-6 border-t flex-shrink-0"
          style={{ borderColor: 'var(--color-border-default)' }}
        >
          <Link
            href="/demo"
            onClick={onClose}
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-[14px] font-semibold text-white"
            style={{ background: 'var(--color-accent)', textDecoration: 'none' }}
          >
            Request demo
          </Link>
        </div>
      </div>
    </>
  );
}
