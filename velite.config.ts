import { defineConfig, s } from 'velite';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    blog: {
      name: 'Post',
      pattern: 'blog/**/*.mdx',
      schema: s.object({
        title: s.string().max(99),
        date: s.isodate(),
        category: s.enum(['product', 'trust', 'technical', 'company']),
        summary: s.string().max(160),
        ogImage: s.string().optional(),
        slug: s.path(),
        content: s.mdx(),
      }),
    },
    caseStudies: {
      name: 'CaseStudy',
      pattern: 'case-studies/**/*.mdx',
      schema: s.object({
        customer: s.string(),
        industry: s.enum(['financial-services', 'healthcare', 'legal', 'technology', 'other']),
        stat_headline: s.string(),
        stat_number: s.string(),
        quote: s.string(),
        quote_author: s.string(),
        approved: s.boolean().default(false),
        slug: s.path(),
        content: s.mdx(),
      }),
    },
    changelog: {
      name: 'Changelog',
      pattern: 'changelog/**/*.mdx',
      schema: s.object({
        title: s.string(),
        date: s.isodate(),
        version: s.string().optional(),
        slug: s.path(),
        content: s.mdx(),
      }),
    },
  },
});
