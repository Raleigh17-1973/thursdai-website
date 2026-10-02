import React from 'react';
import { Arrow, Box, Sheet, Text } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE = 'Policy flow: a YAML policy is evaluated before the answer reaches a user, and the result is recorded on the receipt';

const LEGEND: LegendItem[] = [
  { term: 'Policy', detail: 'A YAML file your team versions and reviews like code.' },
  { term: 'AI system', detail: 'Proposes an answer or a decision. It may be a vendor’s system or your own.' },
  { term: 'Evaluate', detail: 'Every applicable policy runs before the answer reaches a user.' },
  { term: 'Recorded', detail: 'Pass or fail, the policy id, its version and the result go onto the AI Receipt.' },
];

function Wide() {
  // A cross: policy above, the proposing system left, the user right, the record below.
  return (
    <Sheet title={TITLE} width={960} height={372}>
      <Box x={380} y={20} w={200} h={72} title="policy.yaml" lines={['versioned, reviewed', 'like code']} />
      <Box x={20} y={148} w={200} h={72} kind="external" title="AI system" lines={['proposes an answer']} />
      <Box x={380} y={148} w={200} h={72} title="Evaluate" lines={['before the answer', 'reaches a user']} />
      <Box x={740} y={148} w={200} h={72} title="User" lines={['sees only what', 'passed']} />
      <Box x={380} y={276} w={200} h={72} kind="record" title="AI Receipt" lines={['policy, version', 'and result']} />

      <Arrow points={[[480, 92], [480, 148]]} />
      <Arrow points={[[220, 184], [380, 184]]} />
      <Arrow points={[[580, 184], [740, 184]]} />
      <Arrow points={[[480, 220], [480, 276]]} />

      <Text x={660} y={172} anchor="middle" tone="label">
        If it passes
      </Text>
      <Text x={492} y={252} tone="label">
        Every result
      </Text>
    </Sheet>
  );
}

function Narrow() {
  return (
    <Sheet title={TITLE} width={340} height={324}>
      <Box x={20} y={20} w={140} h={72} title="policy.yaml" lines={['versioned,', 'reviewed']} />
      <Box x={180} y={20} w={140} h={72} kind="external" title="AI system" lines={['proposes an', 'answer']} />
      <Arrow points={[[90, 92], [90, 132]]} />
      <Arrow points={[[250, 92], [250, 132]]} />
      <Box x={20} y={132} w={300} h={56} title="Evaluate" lines={['before the answer reaches a user']} />
      <Arrow points={[[90, 188], [90, 228]]} />
      <Arrow points={[[250, 188], [250, 228]]} />
      <Box x={20} y={228} w={140} h={72} title="User" lines={['sees only what', 'passed']} />
      <Box x={180} y={228} w={140} h={72} kind="record" title="AI Receipt" lines={['policy, version', 'and result']} />
    </Sheet>
  );
}

export function PolicyFlowDiagram() {
  return <DiagramFigure title="Policy flow" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
