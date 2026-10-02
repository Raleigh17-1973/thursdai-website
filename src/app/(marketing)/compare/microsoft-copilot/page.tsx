import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  title: 'Thursdai and Microsoft Copilot',
  description:
    'Where Microsoft Copilot is strong and where Thursdai differs: a general assistant inside Microsoft 365 versus a signed record of every AI decision. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'Microsoft Copilot',
  slug: 'microsoft-copilot',
  title: 'A productivity layer is not a record.',
  lead: 'Microsoft Copilot is a capable assistant built into the tools your teams already use. Thursdai records the decisions AI systems make and signs each one. They solve different problems and can run together.',
  summary: {
    line: 'Copilot helps people get work done in Microsoft 365. Thursdai records what AI systems decided.',
    theyAreFor: 'Drafting, summarising and answering inside Word, Excel, Outlook, Teams and the rest of Microsoft 365.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'You need a general assistant for your people inside Microsoft 365.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'Built into Microsoft 365',
      body: 'Copilot works inside Word, Excel, Outlook and Teams. If your team lives in Microsoft 365, it is the lowest-friction way to put an assistant in front of them. Copilot is better if you need a general assistant.',
    },
    {
      title: 'Strong language models',
      body: 'Drafting, summarising and answering questions across your documents and mail are what it is built for, and it does them well.',
    },
    {
      title: 'Enterprise reach',
      body: "Microsoft's distribution, administration tooling and published compliance programme make it straightforward to bring into a large organisation.",
    },
  ],
  differences: [
    {
      title: 'A record, not an assistant',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with an assistant like Copilot.",
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
    { capability: 'Primary job', them: 'A general AI assistant across Microsoft 365', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Microsoft 365 integration', them: 'Built into Word, Excel, Outlook and Teams', thursdai: 'One API call from any system; not a Microsoft 365 add-in' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareMicrosoftCopilotPage() {
  return <CompareTemplate {...DATA} />;
}
