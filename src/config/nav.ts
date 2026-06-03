export const NAV_ITEMS = [
  {
    label: 'Product',
    megamenu: true,
    items: [
      { label: 'AI Receipts', href: '/product/ai-receipts', description: 'The provable record of every AI decision' },
      { label: 'Time-Travel', href: '/product/time-travel', description: 'Replay any decision with period-accurate knowledge' },
      { label: 'Compliance Packs', href: '/product/compliance-packs', description: 'Signed, framework-shaped audit evidence on demand' },
      { label: 'Policy-as-Code', href: '/product/policy-as-code', description: 'Rules the model cannot break' },
      { label: 'Two-Tier Knowledge', href: '/product/two-tier-knowledge', description: 'Standard corpus + isolated tenant layer' },
      { label: 'Ambient Cases', href: '/product/ambient-cases', description: 'Background case files, always up to date' },
      { label: 'Moderator', href: '/product/moderator', description: 'The multi-role panel behind every answer' },
    ],
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Developers', href: '/developers' },
  { label: 'Trust', href: '/trust' },
  { label: 'Customers', href: '/customers' },
  { label: 'Compare', href: '/compare' },
  { label: 'Company', href: '/company' },
] as const;
