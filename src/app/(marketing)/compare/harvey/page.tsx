import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  // Not reviewed to the Glean page standard yet; keep out of the index until it is.
  robots: { index: false },
  title: 'Thursdai and Harvey',
  description:
    'Where Harvey is strong and where Thursdai differs: AI for legal work versus a signed record of AI decisions across any team. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'Harvey',
  slug: 'harvey',
  title: 'Legal AI is not a record.',
  lead: 'Harvey is AI built for legal work. Thursdai records the decisions AI systems make across any team and signs each one. Legal and compliance teams often look at both, and they can run together.',
  summary: {
    line: 'Harvey is AI for legal work. Thursdai is a record of AI decisions across any team.',
    theyAreFor: 'Drafting, reviewing and researching for lawyers and legal teams.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'Your main need is AI for attorneys doing legal work.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'Built for legal work',
      body: 'Harvey is designed around how lawyers draft, review and research. If the users are attorneys and the work is legal, its specialisation is the point and Thursdai is not a substitute.',
    },
    {
      title: 'Contract review at volume',
      body: 'It supports reviewing contracts and suggesting changes in context, which matters when legal teams handle many agreements.',
    },
    {
      title: 'Legal research and workflows',
      body: 'It is aimed at research, diligence and the day-to-day workflows of law firms and in-house legal teams.',
    },
  ],
  differences: [
    {
      title: 'A record, not legal work product',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with a tool like Harvey.",
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
    { capability: 'Primary job', them: 'AI for legal work, including drafting, review and research', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Legal drafting and contract review', them: 'Yes, its core purpose', thursdai: 'Not its purpose' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareHarveyPage() {
  return <CompareTemplate {...DATA} />;
}
