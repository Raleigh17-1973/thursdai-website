// Content collection helpers — wraps the Velite output
// The .velite directory is generated at build time; never import raw .velite paths outside this file.

import type { Post, CaseStudy, Changelog } from '../../.velite';

export async function getAllPosts(): Promise<Post[]> {
  const { blog } = await import('../../.velite');
  return blog.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  // slug may be the full path (e.g. "blog/hello-world") or just the last segment
  return posts.find(
    (p: Post) => p.slug === slug || p.slug.split('/').pop() === slug,
  );
}

export async function getApprovedCaseStudies(): Promise<CaseStudy[]> {
  const { caseStudies } = await import('../../.velite');
  return caseStudies.filter((c: CaseStudy) => c.approved);
}

export async function getAllChangelog(): Promise<Changelog[]> {
  const { changelog } = await import('../../.velite');
  return changelog.sort((a: Changelog, b: Changelog) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
