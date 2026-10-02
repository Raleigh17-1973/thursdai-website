// Every static marketing route the sitemap lists. The sitemap, the footer test and the
// empty-page gate all read from here, so a page cannot be in one and missing from another.
export interface StaticRoute {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly';
}

export const STATIC_ROUTES: StaticRoute[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/demo', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/product', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/product/ai-receipts', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/product/time-travel', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/product/compliance-packs', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/product/policy-as-code', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/product/two-tier-knowledge', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/product/ambient-cases', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/product/moderator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/compliance', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions/people', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compare', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/compare/glean', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/compare/microsoft-copilot', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/compare/chatgpt-enterprise', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/resources/role-bench', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/developers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/developers/mcp', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/developers/sdk', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/trust', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/trust/annex-iii', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/trust/iso-42001', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/trust/deployment', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/trust/data', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/trust/subprocessors', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/company', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/customers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/company/team', priority: 0.5, changeFrequency: 'monthly' },
];
