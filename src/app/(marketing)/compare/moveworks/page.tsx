import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  // Not reviewed to the Glean page standard yet; keep out of the index until it is.
  robots: { index: false },
  title: 'Thursdai and Moveworks',
  description:
    'Where Moveworks is strong and where Thursdai differs: IT and HR service automation versus a signed record of every AI decision. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'Moveworks',
  slug: 'moveworks',
  title: 'Automation is not a record.',
  lead: 'Moveworks is a strong platform for automating IT and HR service requests. Thursdai records the decisions AI systems make and signs each one. They are often evaluated together, and they can run together.',
  summary: {
    line: 'Moveworks resolves employee requests. Thursdai records what its AI systems decided.',
    theyAreFor: 'Resolving IT and HR requests for employees, with an AI assistant and workflow automation.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'Your main need is automating IT and HR service delivery.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'IT help desk automation',
      body: 'Moveworks resolves common IT requests such as access and password issues. If deflecting service volume is the goal, it is built for that and Thursdai is not.',
    },
    {
      title: 'HR service delivery',
      body: 'It connects to HR and service management systems so employees can ask about benefits, time off and onboarding in one place.',
    },
    {
      title: 'Multi-step workflows',
      body: 'It can chain steps across systems, such as granting access and notifying the people involved, so a request is carried through to the end.',
    },
  ],
  differences: [
    {
      title: 'A record, not a resolved ticket',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with an assistant like Moveworks.",
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
    { capability: 'Primary job', them: 'IT and HR service automation with an AI assistant', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Service desk integrations', them: 'Connects to IT service management and HR systems', thursdai: 'One API call from any system; not a service desk platform' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareMoveworksPage() {
  return <CompareTemplate {...DATA} />;
}
