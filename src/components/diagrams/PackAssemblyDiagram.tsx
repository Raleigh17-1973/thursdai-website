import React from 'react';
import { Arrow, Box, Line, Sheet, Text } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE =
  'Pack assembly: receipts that already exist are selected by framework, period or system, bundled into one signed audit pack and checked by the auditor';

const LEGEND: LegendItem[] = [
  { term: 'Receipts', detail: 'Already recorded and signed. Nothing is written for the audit.' },
  { term: 'Select', detail: 'By framework, period or system. The outlined receipts are the ones in scope.' },
  { term: 'Audit pack', detail: 'Cover, receipts, policy results and evidence, then a signature over the whole.' },
  { term: 'Auditor', detail: 'Checks each receipt hash and the pack signature without an account.' },
];

// Which of the 12 receipts fall in scope (row-major, 4 across).
const IN_SCOPE = new Set([1, 4, 6, 9, 11]);

/** A small receipt: a card with two text rules and a signature rule. Out of scope: dashed. */
function MiniReceipt({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={40}
        height={48}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.6}
        strokeWidth={1.25}
        strokeDasharray={on ? undefined : '2 4'}
        vectorEffect="non-scaling-stroke"
      />
      {on ? (
        <>
          <Line points={[[x + 8, y + 12], [x + 32, y + 12]]} />
          <Line points={[[x + 8, y + 20], [x + 24, y + 20]]} />
          <Line points={[[x + 8, y + 36], [x + 32, y + 36]]} />
        </>
      ) : null}
    </g>
  );
}

function ReceiptGrid({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => (
        <MiniReceipt key={i} x={x + (i % 4) * 52} y={y + Math.floor(i / 4) * 64} on={IN_SCOPE.has(i)} />
      ))}
    </g>
  );
}

function Wide() {
  // Grid 196 x 176 at the left, then three boxes on the centre line y=132.
  return (
    <Sheet title={TITLE} width={960} height={248}>
      <Text x={20} y={28} tone="label">
        AI Receipts
      </Text>
      <ReceiptGrid x={20} y={44} />
      <Arrow points={[[216, 132], [272, 132]]} />
      <Box x={272} y={88} w={176} h={88} title="Select" lines={['framework', 'period', 'system']} />
      <Arrow points={[[448, 132], [504, 132]]} />
      <Box x={504} y={88} w={196} h={88} kind="record" title="Audit pack" lines={['cover, receipts,', 'policy results,', 'one signature']} />
      <Arrow points={[[704, 132], [756, 132]]} />
      <Box x={756} y={88} w={184} h={88} kind="external" title="Auditor" lines={['checks hashes', 'and signature']} />
    </Sheet>
  );
}

function Narrow() {
  return (
    <Sheet title={TITLE} width={340} height={524}>
      <Text x={72} y={28} tone="label">
        AI Receipts
      </Text>
      <ReceiptGrid x={72} y={44} />
      <Arrow points={[[170, 220], [170, 256]]} />
      <Box x={20} y={256} w={300} h={56} title="Select" lines={['by framework, period or system']} />
      <Arrow points={[[170, 312], [170, 352]]} />
      <Box x={20} y={352} w={296} h={56} kind="record" title="Audit pack" lines={['receipts, results, one signature']} />
      <Arrow points={[[170, 412], [170, 448]]} />
      <Box x={20} y={448} w={300} h={56} kind="external" title="Auditor" lines={['checks hashes and signature']} />
    </Sheet>
  );
}

export function PackAssemblyDiagram() {
  return <DiagramFigure title="Pack assembly" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
