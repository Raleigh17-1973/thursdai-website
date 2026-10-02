import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  // Not reviewed to the Glean page standard yet; keep out of the index until it is.
  robots: { index: false },
  title: 'Thursdai and Writer',
  description:
    'Where Writer is strong and where Thursdai differs: enterprise content generation with brand guidance versus a signed record of every AI decision. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'Writer',
  slug: 'writer',
  title: 'Brand guidance is not a record.',
  lead: 'Writer is an enterprise platform for generating on-brand content with AI. Thursdai records the decisions AI systems make and signs each one. They are often raised in the same review, and they can run together.',
  summary: {
    line: 'Writer helps teams produce on-brand content. Thursdai records what AI systems decided.',
    theyAreFor: 'Generating consistent, on-brand content at scale for marketing, communications and other teams.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'Your main need is consistent, on-brand content from AI.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'Enterprise content generation',
      body: 'Writer is built for high-volume business content such as marketing copy, internal communications and product descriptions. If the need is consistent text at scale, it is built for that and Thursdai is not.',
    },
    {
      title: 'Brand voice and style',
      body: 'Its style and brand voice features help many writers stay consistent with one standard.',
    },
    {
      title: 'Approachable for non-technical teams',
      body: 'It is designed for marketers, communicators and other teams who are not developers, which makes wide rollout easier.',
    },
  ],
  differences: [
    {
      title: 'A record, not a draft',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with a tool like Writer.",
    },
    {
      title: 'Verifiable without trusting us',
      body: 'Each receipt carries an Ed25519 signature and a sha256 fingerprint. Anyone can check it against the public key, without an account.',
    },
    {
      title: 'Replay as of the decision',
      body: 'What the system knew, the policies that applied and the model version are kept as they were at the moment of the decision, so a later change does not rewrite the past.',
    },
    {
      title: 'Policy results on the record',
      body: 'Every policy checked, its version and its result are part of the signed receipt, which is what an examiner asks for.',
    },
  ],
  rows: [
    { capability: 'Primary job', them: 'Enterprise content generation with brand and style guidance', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Brand voice and style guidance', them: 'Yes, a core feature', thursdai: 'Not its purpose' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareWriterPage() {
  return <CompareTemplate {...DATA} />;
}
