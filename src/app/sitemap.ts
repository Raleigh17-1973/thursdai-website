import type { MetadataRoute } from 'next';
import { getAllChangelog, getAllPosts, getApprovedCaseStudies } from '@/lib/velite';
import { SITE_URL } from '@/config/site';
import { STATIC_ROUTES } from '@/config/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const studies = await getApprovedCaseStudies();
  const changelog = await getAllChangelog();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: r.path === '/' ? SITE_URL : `${SITE_URL}${r.path}`,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }));

  // Index pages 404 until they have published entries, so list them only then.
  const indexRoutes: MetadataRoute.Sitemap = [
    ...(posts.length ? [{ url: `${SITE_URL}/resources/blog`, priority: 0.6, changeFrequency: 'daily' as const }] : []),
    ...(changelog.length ? [{ url: `${SITE_URL}/developers/changelog`, priority: 0.5, changeFrequency: 'weekly' as const }] : []),
  ];

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

  return [...staticRoutes, ...indexRoutes, ...blogRoutes, ...caseStudyRoutes];
}
