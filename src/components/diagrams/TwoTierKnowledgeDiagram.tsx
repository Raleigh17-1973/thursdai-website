import React from 'react';
import { Arrow, Box, Line, Sheet, Text } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE =
  'Two-tier knowledge: a shared standard knowledge base and your own tenant layer, kept apart, both able to inform an answer, with the evidence used listed on the receipt';

const LEGEND: LegendItem[] = [
  { term: 'Standard knowledge', detail: 'Reference material maintained by Thursdai and shared by every tenant.' },
  { term: 'Your tenant layer', detail: 'Your own documents, separated from other tenants by Postgres row-level security.' },
  { term: 'Kept apart', detail: 'The two tiers are stored separately. An answer can draw on both.' },
  { term: 'Sources', detail: 'An answer cites the sources it used, and the evidence is listed on the receipt.' },
];

/** Two hairlines 4px apart with a label knocked out of the middle: the boundary between tiers. */
function Divider({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <Line points={[[x1, y - 2], [x2, y - 2]]} />
      <Line points={[[x1, y + 2], [x2, y + 2]]} />
      <Text x={(x1 + x2) / 2} y={y + 4} anchor="middle" tone="label" knockout>
        {label}
      </Text>
    </g>
  );
}

function Wide() {
  return (
    <Sheet title={TITLE} width={960} height={340}>
      <Box x={20} y={20} w={380} h={72} title="Standard knowledge" lines={['shared, maintained by Thursdai', 'reference material']} />
      <Divider x1={20} x2={400} y={112} label="Kept apart" />
      <Box x={20} y={132} w={380} h={72} title="Your tenant layer" lines={['row-level security', 'your own documents']} />
      <Box x={20} y={244} w={380} h={72} kind="external" title="Other tenants" lines={['separated the same way']} />

      {/* Both tiers can feed the answer */}
      <Arrow points={[[400, 56], [520, 56], [520, 96], [620, 96]]} />
      <Arrow points={[[400, 168], [520, 168], [520, 128], [620, 128]]} />
      <Text x={412} y={48} tone="label">
        Standard
      </Text>
      <Text x={412} y={160} tone="label">
        Tenant
      </Text>

      {/* Another tenant's rows are not returned to your queries */}
      <Arrow points={[[400, 280], [520, 280]]} end="bar" />
      <Text x={536} y={284} tone="label">
        RLS
      </Text>

      <Box x={620} y={64} w={316} h={72} title="Answer" lines={['draws on either tier', 'sources cited']} />
      <Arrow points={[[780, 136], [780, 232]]} />
      <Box x={620} y={232} w={316} h={72} kind="record" title="AI Receipt" lines={['evidence used', 'and its version']} />
    </Sheet>
  );
}

function Narrow() {
  return (
    <Sheet title={TITLE} width={340} height={480}>
      <Box x={20} y={20} w={280} h={72} title="Standard knowledge" lines={['shared, maintained by', 'Thursdai']} />
      <Divider x1={20} x2={300} y={112} label="Kept apart" />
      <Box x={20} y={132} w={132} h={72} title="Your tenant" lines={['row-level', 'security']} />
      <Box x={168} y={132} w={132} h={72} kind="external" title="Other tenants" lines={['separated the', 'same way']} />

      {/* The standard tier reaches the answer by the right-hand lane, outside the boundary */}
      <Arrow points={[[300, 56], [320, 56], [320, 296], [300, 296]]} />
      <Arrow points={[[86, 204], [86, 264]]} />
      <Arrow points={[[234, 204], [234, 236]]} end="bar" />
      <Text x={246} y={248} tone="label">
        RLS
      </Text>

      <Box x={20} y={264} w={280} h={72} title="Answer" lines={['draws on either tier,', 'sources cited']} />
      <Arrow points={[[160, 336], [160, 376]]} />
      <Box x={20} y={376} w={280} h={72} kind="record" title="AI Receipt" lines={['evidence used', 'and its version']} />
    </Sheet>
  );
}

export function TwoTierKnowledgeDiagram() {
  return <DiagramFigure title="Two-tier knowledge" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
