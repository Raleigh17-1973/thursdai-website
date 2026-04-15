export const NAV_ITEMS = [
  {
    label: 'Product',
    megamenu: true,
    items: [
      { label: 'Moderator', href: '/product/moderator', description: 'Role-based answer panels with reconciliation' },
      { label: 'Time-Travel', href: '/product/time-travel', description: 'Replay any decision with period-accurate knowledge' },
      { label: 'Policy-as-Code', href: '/product/policy-as-code', description: 'Rules the model cannot break' },
      { label: 'Ambient Cases', href: '/product/ambient-cases', description: 'Background case files, always up to date' },
      { label: 'Two-Tier Knowledge', href: '/product/two-tier-knowledge', description: 'Standard corpus + isolated tenant layer' },
    ],
  },
  { label: 'Developers', href: '/developers' },
  { label: 'Trust', href: '/trust' },
  { label: 'Customers', href: '/customers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Compare', href: '/compare/glean' },
] as const;
