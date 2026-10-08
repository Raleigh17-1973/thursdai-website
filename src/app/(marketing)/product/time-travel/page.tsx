import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProductPillar, PillarStatus } from '@/components/templates/ProductPillar';
import { ReplayDiagram } from '@/components/diagrams/ReplayDiagram';
import { SAMPLE_LABEL_SIGNED } from '@/config/site';
import { HIRING_REPLAY, HIRING_REPLAY_DECISION_INDEX, HIRING_REPLAY_QUESTION } from '@/config/demo-hiring-replay';

// The scrubber is the product here, so it leads; it loads as its own chunk and still renders on the server.
const TimeTravelScrubber = dynamic(() =>
  import('@/components/demos/TimeTravelScrubber').then((m) => m.TimeTravelScrubber),
);

export const metadata: Metadata = {
  title: 'Time-Travel: Thursdai',
  description:
    'Reopen a recorded AI decision as its audit trail had it: the knowledge, policies and roles named on its receipt, even after all three have changed.',
};

export default function TimeTravelPage() {
  return (
    <ProductPillar
      crumb="Time-Travel"
      label="Time-Travel"
      title="See what was recorded when it decided."
      demoHref="/demo#replay"
      status={<PillarStatus>In development. Replay is not yet available in pilots.</PillarStatus>}
      promise={
        <>
          Time-Travel reopens a recorded decision as its audit trail had it, with the knowledge,
          policies and roles named on its receipt, even after all three have changed.
        </>
      }
      visualLayout="wide"
      visual={
        <TimeTravelScrubber
          question={HIRING_REPLAY_QUESTION}
          questionLabel="Replaying"
          snapshots={HIRING_REPLAY}
          initialIndex={HIRING_REPLAY_DECISION_INDEX}
          sliderLabel="Replay requisition JR-204 at a point in time"
          footnote={SAMPLE_LABEL_SIGNED}
        />
      }
      facts={{
        label: 'Kept with each decision',
        title: 'What a replay restores.',
        items: [
          {
            label: 'Knowledge',
            body: (
              <>
                The version of every document the decision drew on. Your tenant knowledge and the standard
                corpus are versioned separately.
              </>
            ),
          },
          {
            label: 'Policy',
            body: <>The policy set that was live and the result of each check, not the rules as they read today.</>,
          },
          {
            label: 'Roles',
            body: <>The system that recommended, the model version it ran and the person who reviewed the recommendation.</>,
          },
        ],
      }}
      diagram={{
        label: 'Versions over time',
        title: 'The record stays where the decision was.',
        body: (
          <>
            The rubric, the policy set and the model all move on. A replay reads each one at the moment of
            the decision, which is the moment an auditor asks about.
          </>
        ),
        figure: <ReplayDiagram />,
      }}
      verify={
        <>
          A replay starts from the signed receipt, which names the versions the decision used, so what the
          replay shows can be checked against what was signed.
        </>
      }
      close={{
        title: 'Replay a signed decision.',
        body: (
          <>
            The demo replays one hiring decision at the moment it was made: the knowledge, policies and roles
            it met. No login.
          </>
        ),
      }}
    />
  );
}
