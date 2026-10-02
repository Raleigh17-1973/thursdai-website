'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/config/nav';
import { MegaMenu } from './MegaMenu';
import { MobileDrawer } from './MobileDrawer';
import { ThursdaiWordmark } from './ThursdaiWordmark';
import { DemoRequestModal } from '@/components/ui/DemoRequestModal';
import { Button } from '@/components/ui/Button';

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 6h16M2 14h16" stroke="currentColor" strokeWidth="1.5" />
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
  const [demoOpen, setDemoOpen] = useState(false);
  const productButtonRef = useRef<HTMLButtonElement>(null);

  const otherNavItems = NAV_ITEMS.filter((item) => item.label !== 'Product');

  return (
    <header
      className="sticky top-0 z-[10]"
      style={{
        height: '64px',
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
      }}
    >

      <div className="relative h-full max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Thursdai home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <ThursdaiWordmark />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2">
          {/* Product with megamenu */}
          <button
            ref={productButtonRef}
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1.5 px-3 py-2 rounded-[2px] text-[15px] hover:text-[var(--ink)]"
            style={{ color: megaOpen ? 'var(--ink)' : 'var(--ink-2)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 400, lineHeight: 'inherit' }}
          >
            Product
            <ChevronDownIcon open={megaOpen} />
          </button>

          {otherNavItems.map((item) => (
            'href' in item && (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-[2px] text-[15px] text-[var(--ink-2)] hover:text-[var(--ink)] hover:no-underline"
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Demo (plain text link) and Request a pilot: hidden on mobile (both live in the drawer) */}
          <Link
            href="/demo"
            className="hidden md:block px-3 py-2 rounded-[2px] text-[15px] text-[var(--ink-2)] hover:text-[var(--ink)] hover:no-underline"
          >
            Demo
          </Link>
          <div className="hidden md:block">
            <Button size="sm" onClick={() => setDemoOpen(true)}>
              Request a pilot
            </Button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-[2px]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{ color: 'var(--ink)', background: 'transparent', border: 'none', cursor: 'pointer' }}
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
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} onRequestDemo={() => { setMobileOpen(false); setDemoOpen(true); }} />

      {/* Demo request modal */}
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} source="nav" />
    </header>
  );
}
