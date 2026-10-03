// Main navigation (plan Item 7.4): five sections plus one CTA. "Demo" sits beside the CTA as a
// text link (TopNav), not as a sixth section. Design partners live under Company: linked from
// the footer's Company column rather than a sixth top-level item. /company redirects to
// /company/team, which is why Company points there.
export const NAV_ITEMS = [
  {
    label: 'Product',
    megamenu: true,
    items: [
      { label: 'AI Receipts', href: '/product/ai-receipts', description: 'The provable record of every AI decision' },
      { label: 'Time-Travel', href: '/product/time-travel', description: 'Replay any decision with period-accurate knowledge' },
      { label: 'Compliance Packs', href: '/product/compliance-packs', description: 'Signed, framework-shaped audit evidence on demand' },
      { label: 'Policy-as-Code', href: '/product/policy-as-code', description: 'Rules written as code, results recorded on the receipt' },
      { label: 'Two-Tier Knowledge', href: '/product/two-tier-knowledge', description: 'Standard corpus and a tenant layer separated by row-level security' },
      { label: 'Moderator', href: '/product/moderator', description: 'The multi-role panel behind every answer' },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Developers', href: '/developers' },
  { label: 'Trust', href: '/trust' },
  { label: 'Company', href: '/company/team' },
] as const;

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// Footer columns mirror the nav sections. Every href here is a route in the sitemap
// (tests/config/nav.test.ts checks it), so the footer can never point at a removed page.
// The blog and changelog are added by the footer only while they have published entries,
// the same rule the sitemap uses.
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      ...NAV_ITEMS[0].items.map(({ label, href }) => ({ label, href })),
      { label: 'Demo', href: '/demo' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Overview', href: '/solutions' },
      { label: 'Compliance and risk', href: '/solutions/compliance' },
      { label: 'HR and People', href: '/solutions/people' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Overview and reference', href: '/developers' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { label: 'Overview', href: '/trust' },
      { label: 'Security overview', href: '/security' },
      { label: 'ISO/IEC 42001', href: '/trust/iso-42001' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Design partners', href: '/customers' },
      { label: 'Team', href: '/company/team' },
    ],
  },
];
