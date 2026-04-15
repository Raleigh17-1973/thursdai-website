'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';
import { MegaMenu } from './MegaMenu';
import { MobileDrawer } from './MobileDrawer';
import { Toggle } from '@/components/ui/Toggle';

function ThursdaiLogo({ light = false }: { light?: boolean }) {
  const fill = light ? '#ffffff' : 'var(--color-accent)';
  return (
    <svg
      width="140"
      height="28"
      viewBox="0 0 140 28"
      fill="none"
      aria-label="Thursdai"
      role="img"
    >
      <text
        x="0"
        y="22"
        fontFamily="var(--font-sans)"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.03em"
        fill={fill}
      >
        Thursdai
      </text>
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 150ms ease',
      }}
    >
      <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TopNav() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const productButtonRef = useRef<HTMLButtonElement>(null);

  const otherNavItems = NAV_ITEMS.filter((item) => item.label !== 'Product');

  return (
    <header
      className="sticky top-0 z-[10]"
      style={{
        height: '64px',
        borderBottom: '1px solid var(--color-border-default)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'color-mix(in srgb, var(--color-surface-primary) 80%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-hidden="true"
      />

      <div className="relative h-full max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Thursdai home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ThursdaiLogo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {/* Product with megamenu */}
          <button
            ref={productButtonRef}
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1 px-3 py-2 rounded-md text-[14px] font-medium"
            style={{ color: 'var(--color-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            Product
            <ChevronDownIcon open={megaOpen} />
          </button>

          {otherNavItems.map((item) => (
            'href' in item && (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-[14px] font-medium"
                style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Toggle />

          {/* Request demo — hidden on mobile */}
          <Link
            href="/demo"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-[14px] font-semibold text-white"
            style={{ background: 'var(--color-accent)', textDecoration: 'none' }}
          >
            Request demo
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-md"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{ color: 'var(--color-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <HamburgerIcon />
          </button>
        </div>
      </div>

      {/* MegaMenu — positioned relative to the sticky header */}
      <div className="absolute left-0 right-0 top-full">
        <MegaMenu
          isOpen={megaOpen}
          onClose={() => setMegaOpen(false)}
          triggerRef={productButtonRef}
        />
      </div>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
