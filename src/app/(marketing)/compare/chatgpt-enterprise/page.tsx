import type { Metadata } from 'next';
import { CompareTemplate, type CompareTemplateProps } from '@/components/templates/CompareTemplate';

export const metadata: Metadata = {
  title: 'Thursdai and ChatGPT Enterprise',
  description:
    'Where ChatGPT Enterprise is strong and where Thursdai differs: a general-purpose AI assistant versus a signed record of every AI decision. An honest table and a sample receipt you can verify.',
};

const DATA: CompareTemplateProps = {
  competitor: 'ChatGPT Enterprise',
  slug: 'chatgpt-enterprise',
  title: 'An assistant is not a record.',
  lead: 'ChatGPT Enterprise is a capable general-purpose assistant for work. Thursdai records the decisions AI systems make and signs each one. They solve different problems and can run together.',
  summary: {
    line: 'ChatGPT Enterprise helps people think and write. Thursdai records what AI systems decided.',
    theyAreFor: 'A general-purpose AI assistant for analysis, drafting and coding across your organisation.',
    thursdaiIsFor: 'A signed, verifiable record of each AI decision, including vendor tools.',
    chooseThem: 'You need a capable general assistant for your people.',
    chooseThursdai: 'You must show an auditor what an AI system decided and why.',
  },
  strengths: [
    {
      title: 'Capable general-purpose models',
      body: 'For open-ended reasoning, analysis, coding and drafting, it gives people a strong assistant with little setup.',
    },
    {
      title: 'Enterprise controls',
      body: 'It offers administration controls and a published security programme, and OpenAI states that business data is not used for training by default.',
    },
    {
      title: 'A broad ecosystem',
      body: 'A mature API, extensive documentation and a large developer community mean most teams can build on it quickly.',
    },
  ],
  differences: [
    {
      title: 'A record, not an answer',
      body: "Thursdai's output is a signed receipt of a decision made by any AI system, your own or a vendor's. That can include decisions made with an assistant like ChatGPT.",
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
    { capability: 'Primary job', them: 'A general-purpose AI assistant for work', thursdai: 'Recording and signing the decisions AI systems make' },
    { capability: 'Model access', them: "OpenAI's models", thursdai: 'Model-agnostic; records decisions from whichever model made them' },
    { capability: 'Records decisions made by other AI systems', them: 'Not its purpose', thursdai: 'Yes, one signed receipt per decision, including vendor tools' },
    { capability: 'Signed record anyone can verify', them: 'Not confirmed', thursdai: 'Yes, Ed25519 signature and sha256 fingerprint' },
    { capability: 'Replay a decision as of its date', them: 'Not confirmed', thursdai: 'Yes, knowledge, policies and model version at the time' },
    { capability: 'Policy results per decision', them: 'Not confirmed', thursdai: 'Yes, each policy, its version and result on the receipt' },
    { capability: 'EU AI Act mapping', them: 'Not confirmed', thursdai: 'Published, article by article, on the trust pages' },
    { capability: 'Security certifications', them: 'SOC 2 Type II, per its trust center', thursdai: 'None held yet; roadmap on the trust page' },
    { capability: 'HIPAA workloads', them: 'Not confirmed; check its trust center', thursdai: 'Architecture designed for HIPAA workloads; no attestation held' },
  ],
};

export default function CompareChatGPTEnterprisePage() {
  return <CompareTemplate {...DATA} />;
}
