import React from 'react';
import type { Metadata } from 'next';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';

export const metadata: Metadata = {
  title: 'Deployment options: Thursdai',
  description:
    'Every Thursdai customer gets a dedicated, isolated tenant: managed by Thursdai, in your own cloud or on-premises. Data residency, customer-managed keys and set-up times for each deployment model.',
};

const MATRIX = [
  {
    id: 'residency',
    aspect: 'Data residency',
    dedicated: 'US or EU, your choice',
    vpc: 'Your cloud region',
    onprem: 'Your data centre',
  },
  {
    id: 'keys',
    aspect: 'Customer-managed keys',
    dedicated: 'Yes',
    vpc: 'Yes',
    onprem: 'Yes, with your own HSM',
  },
  {
    id: 'time',
    aspect: 'Set-up time',
    dedicated: '5 to 10 business days',
    vpc: '15 to 30 business days',
    onprem: '60 to 90 business days',
  },
  {
    id: 'maintenance',
    aspect: 'Maintenance',
    dedicated: 'Managed by Thursdai, isolated instance',
    vpc: 'Shared responsibility',
    onprem: 'You run it; Thursdai supports',
  },
];

export default function DeploymentPage() {
  return (
    <TrustDocument
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Trust', href: '/trust' },
        { label: 'Deployment' },
      ]}
      label="Deployment"
      title="Deploy where your data needs to live."
      lead="Every customer gets an isolated, dedicated tenant; there is no shared multi-tenant option. Three deployment models, from managed by Thursdai to on-premises and air-gapped. Every model supports your data residency requirements and customer-managed keys."
      meta={[{ label: 'Status as of', value: 'October 2026' }]}
      sections={[
        {
          id: 'models',
          title: 'Deployment models',
          body: (
            <RecordTable
              caption="Deployment models compared: residency, customer-managed keys, set-up time and maintenance"
              columns={[
                { key: 'aspect', label: 'Aspect', width: '20%' },
                { key: 'dedicated', label: 'Dedicated, managed by Thursdai' },
                { key: 'vpc', label: 'Your cloud (VPC)' },
                { key: 'onprem', label: 'On-premises' },
              ]}
              rows={MATRIX}
            />
          ),
        },
        {
          id: 'choosing',
          title: 'Choosing a model',
          body: (
            <FactList
              items={[
                {
                  term: 'Dedicated, managed by Thursdai',
                  body: 'Your own isolated instance in the US or EU with customer-managed keys and a dedicated endpoint, without running infrastructure yourself. This is where pilots start. Thursdai holds no SOC 2 or ISO/IEC 27001 certificate yet, so check the security overview against your vendor policy.',
                },
                {
                  term: 'Your cloud or on-premises',
                  body: 'Rules prevent data leaving your environment, you need air-gap capability or you have specific network requirements. Talk to us early: these have lead times.',
                },
              ]}
            />
          ),
        },
      ]}
      close={
        <ClosingBand
          heading="Scope your deployment in a pilot."
          body="A pilot starts with one AI system in the model that fits your rules. We will walk through residency, keys and timing with your security team."
          actions={<ClosingCTAs primary="pilot" />}
        />
      }
    />
  );
}
