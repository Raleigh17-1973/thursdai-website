import React from 'react';
import type { Metadata } from 'next';
import { ClosingCTAs } from '@/components/ui/ClosingCTAs';
import { TrustDocument, FactList } from '@/components/templates/TrustDocument';
import { RecordTable } from '@/components/templates/RecordTable';
import { ClosingBand } from '@/components/templates/ClosingBand';

export const metadata: Metadata = {
  title: 'Deployment options: Thursdai',
  description:
    'Managed, dedicated single-tenant, your own cloud or on-premises: data residency, customer-managed keys and set-up times for each Thursdai deployment model.',
};

const MATRIX = [
  {
    id: 'residency',
    aspect: 'Data residency',
    managed: 'US or EU, your choice',
    dedicated: 'US or EU, your choice',
    vpc: 'Your cloud region',
    onprem: 'Your data centre',
  },
  {
    id: 'keys',
    aspect: 'Customer-managed keys',
    managed: 'No',
    dedicated: 'Yes',
    vpc: 'Yes',
    onprem: 'Yes, with your own HSM',
  },
  {
    id: 'time',
    aspect: 'Set-up time',
    managed: 'Set up with your pilot',
    dedicated: '5 to 10 business days',
    vpc: '15 to 30 business days',
    onprem: '60 to 90 business days',
  },
  {
    id: 'maintenance',
    aspect: 'Maintenance',
    managed: 'Fully managed by Thursdai',
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
      lead="Four deployment models, from fully managed to on-premises and air-gapped. Every model supports your data residency requirements; customer-managed keys are available from dedicated single-tenant upward."
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
                { key: 'managed', label: 'Managed, multi-tenant' },
                { key: 'dedicated', label: 'Dedicated single-tenant' },
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
                  term: 'Managed',
                  body: 'You have no strict residency rules beyond US or EU, want to start fastest and are comfortable with shared infrastructure. Thursdai holds no SOC 2 or ISO/IEC 27001 certificate yet, so check the security overview against your vendor policy.',
                },
                {
                  term: 'Dedicated',
                  body: 'You need an isolated instance, customer-managed keys or a dedicated endpoint, without running infrastructure yourself.',
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
