import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Body } from '@/components/typography/Body';
import { LongForm, LongFormSection, LongFormList } from '@/components/templates/LongForm';
import { CONTACT_EMAIL } from '@/config/site';
import { LEGAL_LAST_UPDATED, LEGAL_ENTITY } from '@/config/legal';

// Draft pending legal review. Every statement describes what this website's code does
// (src/lib/hubspot.ts, src/app/api/lead/route.ts, src/lib/analytics.ts, src/middleware.ts,
// src/app/layout.tsx). Anything not established in code is in [square brackets] for counsel.
// Not in the sitemap and noindex until the review is done.

export const metadata: Metadata = {
  title: 'Privacy policy (draft): Thursdai',
  description: 'How the Thursdai website collects and uses personal information. Draft pending legal review.',
  robots: { index: false },
};

const A: React.CSSProperties = { textDecoration: 'underline', textDecorationThickness: '1px' };
const mail = <a href={`mailto:${CONTACT_EMAIL}`} style={A}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  return (
    <LongForm
      notice={<>Draft pending legal review. Last updated {LEGAL_LAST_UPDATED}.</>}
      meta={['Legal', 'Privacy policy', 'Draft']}
      title="Privacy policy"
      lead={
        <>
          This policy explains what personal information {LEGAL_ENTITY} (&quot;Thursdai&quot;, &quot;we&quot;)
          collects through this website, getthursdai.com, why and what choices you have. It covers the website
          only. Data that customers put into the Thursdai platform is handled under their customer agreement and
          data processing agreement.
        </>
      }
    >
      <LongFormSection title="Who we are" id="who">
        <Body>
          The website is operated by {LEGAL_ENTITY} [confirm legal entity name, place of organisation and
          registered address]. For anything in this policy, contact us at {mail}.
        </Body>
      </LongFormSection>

      <LongFormSection title="What we collect and why" id="collect">
        <Body>
          <strong>When you request a pilot.</strong> The pilot form asks for your name, company, work email
          and, optionally, a free-text answer to the question of which decision you would most want to replay.
          We also record which button opened the form (for example the one at the top or the bottom of a page).
          Our server sends these details to HubSpot, our customer relationship management provider, so we can
          reply to you. We use them to respond to your request, to set up and run a pilot and to follow up
          about it. If the form cannot reach HubSpot, it offers you an email to {CONTACT_EMAIL} with your
          details filled in, which you can choose to send from your own email account.
        </Body>
        <Body>
          <strong>Other forms.</strong> The design partner application and the Role Bench forms ask for similar
          details (company, role, email address and a short description, or an email address alone to be told
          when results are published). They are sent to the same server endpoint and used for the same
          purpose: to reply to you.
        </Body>
        <Body>
          <strong>When you email us.</strong> We receive whatever you include in your message and use it to
          reply. [Name the email provider for {CONTACT_EMAIL}.]
        </Body>
        <Body>
          <strong>When you browse.</strong> We use the following to understand how the site is used and to keep
          it working:
        </Body>
        <LongFormList
          items={[
            <>
              <strong>Hosting (Vercel).</strong> The site is hosted by Vercel, which processes request data such
              as your IP address, browser and the page requested in order to serve the site and protect it. The
              receipt verifier on the site also keeps your IP address in memory for one minute to limit how often
              it can be called.
            </>,
            <>
              <strong>Vercel Web Analytics.</strong> Counts page views without cookies. [Confirm against
              Vercel&apos;s current documentation how visitors are counted and for how long that data is kept.]
            </>,
            <>
              <strong>PostHog.</strong> Records page views and a few named actions: clicks on the main
              &quot;Open the demo&quot; and &quot;Request a pilot&quot; buttons (with where the button was and its
              label), opening the demo, the result of the receipt check in the demo and whether a pilot request was
              delivered. It does not set cookies or use local storage, does not record sessions and does not
              capture what you type. If your browser sends a Do Not Track or Global Privacy Control signal,
              PostHog is not loaded at all. PostHog receives standard request details such as your IP address,
              browser and the page address. [Confirm the PostHog project region and whether IP capture is
              disabled in the project settings.]
            </>,
            <>
              <strong>Microsoft Clarity.</strong> Records how visitors interact with pages, such as clicks,
              scrolling and mouse movement, to produce heatmaps and session recordings. Clarity sets its own
              cookies and is provided by Microsoft. [Confirm Clarity&apos;s masking settings, its cookies and
              whether consent is required before it loads for visitors in the EEA and the UK.]
            </>,
          ]}
        />
        <Body>
          <strong>Error monitoring.</strong> The website does not send errors to Sentry. Sentry is used by the
          Thursdai platform and is listed on the{' '}
          <Link href="/trust/subprocessors" style={A}>
            subprocessors
          </Link>{' '}
          page.
        </Body>
      </LongFormSection>

      <LongFormSection title="Cookies and browser storage" id="cookies">
        <LongFormList
          items={[
            <>
              <strong>__thursdai_id</strong> (first party, set by our server). A random identifier that lasts one
              year. It is HttpOnly, so scripts on the page cannot read it. It exists to keep a visitor on the same
              version of a page while we test page variants. At the time of writing no such test is running,
              nothing reads it and it is not sent to any third party.
            </>,
            <>
              <strong>Session storage.</strong> One entry records that the site&apos;s display font has loaded in
              this browser session, so later pages show it at once. It holds no personal information and is
              cleared when you close the tab.
            </>,
            <>
              <strong>Microsoft Clarity cookies</strong> as described above. [List Clarity&apos;s cookie names and
              lifetimes.]
            </>,
          ]}
        />
        <Body>
          Neither PostHog nor Vercel Web Analytics sets cookies on this site.
        </Body>
      </LongFormSection>

      <LongFormSection title="Legal bases" id="bases">
        <Body>
          Where the GDPR or UK GDPR applies, we rely on our legitimate interests in responding to enquiries,
          running pilots, understanding how the site is used and keeping it secure, and on steps taken at your
          request before entering into a contract when you ask for a pilot. [Counsel to confirm the bases and
          where consent is required, in particular for Microsoft Clarity.]
        </Body>
      </LongFormSection>

      <LongFormSection title="Who we share it with" id="sharing">
        <Body>
          We share personal information only with service providers that process it for us: HubSpot (customer
          relationship management), Vercel (hosting and analytics), PostHog (analytics), Microsoft (Clarity) and
          our email provider. We may also disclose information where the law requires it or to protect our
          rights.
        </Body>
        <Body>
          We do not sell personal information, and we do not share it for cross-context behavioural advertising.
          [Counsel to confirm that Microsoft Clarity&apos;s terms do not amount to sharing under the CCPA.]
        </Body>
      </LongFormSection>

      <LongFormSection title="How long we keep it" id="retention">
        <LongFormList
          items={[
            <>Pilot requests and other form submissions in HubSpot: [retention period].</>,
            <>Emails you send us: [retention period].</>,
            <>PostHog events: [retention period under the PostHog plan].</>,
            <>Microsoft Clarity recordings and heatmaps: [retention period per Microsoft].</>,
            <>Vercel request logs and analytics: [retention period per Vercel].</>,
            <>The __thursdai_id cookie: one year from when it is set.</>,
            <>IP addresses held by the receipt verifier: one minute, in memory only.</>,
          ]}
        />
      </LongFormSection>

      <LongFormSection title="International transfers" id="transfers">
        <Body>
          Thursdai and the providers above are based in or process data in the United States. If you are in the
          EEA, the UK or Switzerland, your information is transferred to the United States. [Name the transfer
          mechanism for each provider, for example the EU-US Data Privacy Framework or standard contractual
          clauses.]
        </Body>
      </LongFormSection>

      <LongFormSection title="Your rights" id="rights">
        <Body>
          Depending on where you live, you may have the right to:
        </Body>
        <LongFormList
          items={[
            <>know what personal information we hold about you and get a copy of it;</>,
            <>have it corrected or deleted;</>,
            <>object to or restrict how we use it, or ask us to stop using it for analytics;</>,
            <>receive it in a portable format;</>,
            <>withdraw consent where we rely on it;</>,
            <>opt out of the sale or sharing of personal information (we do neither);</>,
            <>not be treated differently for using any of these rights.</>,
          ]}
        />
        <Body>
          To use any of these rights, email {mail}. We may need to confirm your identity before acting, and you
          may use an authorised agent where the law allows it. We will reply within [the period required by
          applicable law]. If you are in the EEA or the UK, you can also complain to your data protection
          supervisory authority.
        </Body>
      </LongFormSection>

      <LongFormSection title="Children" id="children">
        <Body>
          The website is meant for business users and is not directed at children under [16]. We do not
          knowingly collect their personal information.
        </Body>
      </LongFormSection>

      <LongFormSection title="Changes to this policy" id="changes">
        <Body>
          We will update this page when our practices change and change the date at the top. For questions
          about this policy, email {mail}.
        </Body>
      </LongFormSection>
    </LongForm>
  );
}
