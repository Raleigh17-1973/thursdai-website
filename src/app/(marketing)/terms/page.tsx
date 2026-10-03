import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { LongForm, LongFormSection, LongFormList } from '@/components/templates/LongForm';
import { CONTACT_EMAIL } from '@/config/site';
import { LEGAL_LAST_UPDATED, LEGAL_ENTITY } from '@/config/legal';

// Draft website terms of use, pending legal review. Website use only: the platform is covered
// by a separate customer agreement. Placeholders for counsel are in [square brackets].
// Not in the sitemap and noindex until the review is done.

export const metadata: Metadata = {
  title: 'Terms of use (draft): Thursdai',
  description: 'The terms that apply to using the Thursdai website. Draft pending legal review.',
  robots: { index: false },
};

const A: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };
const mail = <a href={`mailto:${CONTACT_EMAIL}`} style={A}>{CONTACT_EMAIL}</a>;

export default function TermsPage() {
  return (
    <LongForm
      notice={<>Draft pending legal review. Last updated {LEGAL_LAST_UPDATED}.</>}
      meta={['Legal', 'Terms of use', 'Draft']}
      title="Terms of use"
      lead={
        <>
          These terms apply to your use of this website, getthursdai.com, operated by {LEGAL_ENTITY}
          (&quot;Thursdai&quot;, &quot;we&quot;) [confirm legal entity name and place of organisation]. By using the
          site you agree to them. If you do not agree, please do not use the site.
        </>
      }
    >
      <LongFormSection title="The website, not the product" id="scope">
        <Body>
          These terms cover the website only. Use of the Thursdai platform, including pilots, is governed by a
          separate written agreement between Thursdai and the customer. Nothing on this site forms part of that
          agreement unless the agreement says so.
        </Body>
      </LongFormSection>

      <LongFormSection title="Acceptable use" id="use">
        <Body>When you use the site, you agree not to:</Body>
        <LongFormList
          items={[
            <>use it in a way that breaks any law or the rights of others;</>,
            <>
              try to disrupt, overload or gain unauthorised access to the site or the systems behind it, including
              by getting around rate limits such as the one on the receipt verifier;
            </>,
            <>introduce malicious code or use automated means to collect content in a way that burdens the site;</>,
            <>submit personal information about someone else through our forms without the right to do so;</>,
            <>suggest that Thursdai endorses you or your product when it does not.</>,
          ]}
        />
      </LongFormSection>

      <LongFormSection title="Intellectual property" id="ip">
        <Body>
          The site and its content, including text, design, diagrams, code samples, the Thursdai name and the
          wordmark, belong to Thursdai or its licensors. You may view the site, share links to it and read the
          code samples as illustrations. Any other use needs our written permission. Names of other
          companies and products mentioned on the site belong to their owners and are used only to identify
          them.
        </Body>
      </LongFormSection>

      <LongFormSection title="Sample artifacts" id="samples">
        <Body>
          The sample receipts, audit packs, dashboards and demo data on this site describe a fictional company
          (Northwind Financial) and are provided for illustration of the format only. They are not records of
          real decisions. They are provided as is, without warranty of any kind, and you should not rely on
          them for any purpose other than understanding how Thursdai works.
        </Body>
      </LongFormSection>

      <LongFormSection title="Not legal advice" id="no-advice">
        <Body>
          The site discusses laws and standards such as the EU AI Act, New York City Local Law 144 and ISO/IEC
          42001. That material is general information, may not reflect the latest changes and is not legal
          advice. Using Thursdai does not by itself make an organisation compliant with any law or standard.
          Ask your own counsel about your obligations. To report an error on the site, email {mail}.
        </Body>
      </LongFormSection>

      <LongFormSection title="Links to other sites" id="links">
        <Body>
          The site links to sites we do not control, such as official sources for regulations. We are not
          responsible for their content or their privacy practices.
        </Body>
      </LongFormSection>

      <LongFormSection title="Disclaimer" id="disclaimer">
        <Body>
          The site is provided as is and as available. To the extent the law allows, we make no warranties about
          it, express or implied, including that it will be accurate, complete, uninterrupted or free of errors.
        </Body>
      </LongFormSection>

      <LongFormSection title="Limitation of liability" id="liability">
        <Body>
          [Limitation of liability clause to be drafted by counsel, including any cap and the exclusions the
          governing law requires.]
        </Body>
      </LongFormSection>

      <LongFormSection title="Governing law" id="law">
        <Body>
          [Governing law and venue to be confirmed by counsel.]
        </Body>
      </LongFormSection>

      <LongFormSection title="Privacy" id="privacy">
        <Body>
          How we handle personal information collected through the site is described in our{' '}
          <Link href="/privacy" style={A}>
            privacy policy
          </Link>
          .
        </Body>
      </LongFormSection>

      <LongFormSection title="Changes and contact" id="changes">
        <Body>
          We may update these terms and will change the date at the top when we do. Continuing to use the site
          after a change means you accept the updated terms. Questions: {mail}.
        </Body>
      </LongFormSection>
    </LongForm>
  );
}
