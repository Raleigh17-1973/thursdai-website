import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { AnalyticsInit } from '@/components/analytics/Analytics';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <BackToTop />
      <Footer />
      {/* PostHog, cookieless and loaded after the page (src/lib/analytics.ts); a no-op without a key.
          Here rather than the root layout so it rides the client chunk this layout already loads. */}
      <AnalyticsInit />
    </>
  );
}
