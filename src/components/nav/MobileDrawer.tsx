'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';
import { Button } from '@/components/ui/Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo?: () => void;
}

export function MobileDrawer({ isOpen, onClose, onRequestDemo }: MobileDrawerProps) {
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

  const otherItems = NAV_ITEMS.filter((item) => item.label !== 'Product');
  const linkClass =
    'block px-3 py-3 rounded-[2px] text-[17px] no-underline hover:no-underline hover:bg-[var(--sunk)]';

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[199]"
        style={{
          background: 'rgba(20, 18, 15, 0.45)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 180ms ease',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-[200] flex flex-col"
        style={{
          background: 'var(--paper)',
          borderLeft: '1px solid var(--ink)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--rule)', height: '64px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--ink-2)',
            }}
          >
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 rounded-[2px]"
            style={{ color: 'var(--ink)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="list-none p-0 m-0">
            <li>
              <Link href="/product" onClick={onClose} className={linkClass} style={{ color: 'var(--ink)' }}>
                Product
              </Link>
            </li>
            {otherItems.map((item) =>
              'href' in item ? (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose} className={linkClass} style={{ color: 'var(--ink)' }}>
                    {item.label}
                  </Link>
                </li>
              ) : null,
            )}
            <li>
              <Link href="/demo" onClick={onClose} className={linkClass} style={{ color: 'var(--ink)' }}>
                Demo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="px-6 py-6 flex-shrink-0" style={{ borderTop: '1px solid var(--rule)' }}>
          <Button onClick={onRequestDemo ?? onClose} className="w-full">
            Request a pilot
          </Button>
        </div>
      </div>
    </>
  );
}