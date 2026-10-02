import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProductPillar } from '@/components/templates/ProductPillar';
import { ModeratorRolesDiagram } from '@/components/diagrams/ModeratorRolesDiagram';
import { RECEIPT_TERM } from '@/config/site';

const ModeratorPanel = dynamic(() => import('@/components/demos/ModeratorPanel').then((m) => m.ModeratorPanel));

export const metadata: Metadata = {
  title: 'Moderator: Thursdai',
  description:
    'Thursdai’s own role panel: Legal, Finance and Engineering answer side by side and the Moderator reconciles them into one answer, recorded like a decision from any other AI system.',
};

export default function ModeratorPage() {
  return (
    <ProductPillar
      crumb="Moderator"
      label="Moderator"
      title="Three roles. One reconciled answer."
      promise={
        <>
          When you ask Thursdai itself, Legal, Finance and Engineering roles answer side by side and the
          Moderator reconciles them into one answer, recorded like any other AI decision.
        </>
      }
      visualLayout="wide"
      visual={<ModeratorPanel />}
      visualNote="Sample answers for a fictional model-selection question. Select a role to read its full answer and sources."
      facts={{
        label: 'The panel',
        title: 'How the panel works.',
        items: [
          {
            label: 'Roles',
            body: (
              <>
                Each role answers from its own corpus sections and policy set. Role definitions control what
                each one may cite.
              </>
            ),
          },
          {
            label: 'Reconcile',
            body: (
              <>
                The Moderator merges the answers, flags disagreement for a person to resolve and applies the
                policies that span roles.
              </>
            ),
          },
          {
            label: 'Record',
            body: (
              <>
                The answer gets an {RECEIPT_TERM} like a decision from any other system. The Moderator is one
                source among many, not a special case.
              </>
            ),
          },
        ],
      }}
      diagram={{
        label: 'Deliberation',
        title: 'Three roles, one answer, one receipt.',
        body: (
          <>
            The roles deliberate before anything reaches your team. What reaches the record is one answer,
            with each sentence attributed to the role and source it came from.
          </>
        ),
        figure: <ModeratorRolesDiagram />,
      }}
      verify={
        <>
          A Moderator answer is signed the same way as any receipt, so its roles and sources can be checked
          later.
        </>
      }
      close={{
        title: 'See the record behind an answer.',
        body: (
          <>
            The demo follows one signed decision end to end: the receipt, the replay and the audit pack. No
            login.
          </>
        ),
      }}
    />
  );
}
