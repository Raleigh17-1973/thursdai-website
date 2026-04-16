import { TopNav } from '@/components/nav/TopNav';
import { Footer } from '@/components/nav/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main>{children}</main>
      <BackToTop />
      <Footer />
    </>
  );
}
