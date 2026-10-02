import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  title: 'Thursdai and Glean',
  description:
    'Where Glean is strong and where Thursdai differs: enterprise search and knowledge versus a signed record of every AI decision. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'Glean',
  slug: 'glean',
  title: 'Search is not a record.',
  lead: 'Glean is a strong enterprise search and assistant product. Thursdai records the decisions AI systems make and signs each one. They are often evaluated together, and they can run together.',
  summary: {
    line: 'Glean helps people find what the company knows. Thursdai records what its AI systems decided.',
    theyAreFor: 'Finding and using company knowledge across your workplace apps.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'Your main need is search and answers across many systems.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'Search across everything',
      body: 'Glean connects to more than 100 workplace apps and indexes them together. If the need is "find anything across all our systems", it is built for that and Thursdai is not.',
    },
    {
      title: 'Answers that respect permissions',
      body: 'Results follow the access rules of the source systems, so people see what they are already allowed to see.',
    },
    {
      title: 'A broad connector ecosystem',
      body: 'Integrations with Google Workspace, Microsoft 365, Salesforce, Jira and many more. If your workflow depends on connectors, its ecosystem is mature.',
    },
  ],
  differences: [
    {
      title: 'A record, not an answer',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with an assistant like Glean's.",
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
    { capability: 'Primary job', them: 'Enterprise search and an AI assistant over company knowledge', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Connectors', them: 'More than 100 workplace app connectors', thursdai: 'One API call from any system; not a search connector platform' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II and ISO/IEC 27001, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareGleanPage() {
  return <CompareTemplate {...DATA} />;
}
