import type { MetadataRoute } from 'next';
import { getAllPosts, getApprovedCaseStudies } from '@/lib/velite';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thursdai.com';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, priority: 1.0, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/pricing`, priority: 1.0, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/security`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/compare/glean`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/compare/microsoft-copilot`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/compare/chatgpt-enterprise`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/annex-iii`, priority: 0.9, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product/moderator`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product/time-travel`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product/policy-as-code`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product/ambient-cases`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product/two-tier-knowledge`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/product`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/developers`, priority: 0.7, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/developers/mcp`, priority: 0.7, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/developers/api`, priority: 0.6, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/developers/sdk`, priority: 0.6, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/developers/docs`, priority: 0.6, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/developers/changelog`, priority: 0.5, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/customers`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/iso-42001`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/deployment`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/data`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/certifications`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/trust/subprocessors`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/resources/blog`, priority: 0.6, changeFrequency: 'daily' },
  { url: `${SITE_URL}/resources/research`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/resources/role-bench`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/company`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/company/team`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/company/careers`, priority: 0.5, changeFrequency: 'weekly' },
  { url: `${SITE_URL}/company/press`, priority: 0.4, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const studies = await getApprovedCaseStudies();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/resources/blog/${post.slug.split('/').pop()}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${SITE_URL}/customers/${study.slug.split('/').pop()}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...blogRoutes, ...caseStudyRoutes];
}
