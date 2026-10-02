import React from 'react';
import { Arrow, Box, Bracket, Sheet } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE = 'Three steps: capture, check against policy, sign';

const LEGEND: LegendItem[] = [
  { term: 'AI system', detail: 'Yours or a vendor’s. It makes the decision; Thursdai does not.' },
  { term: '01 Capture', detail: 'The decision, the model and version, the evidence used and the reviewer.' },
  { term: '02 Check', detail: 'Every policy that applies runs against the decision, and each result is kept.' },
  { term: '03 Sign', detail: 'Ed25519 over the canonical JSON. The result is an AI Receipt anyone can verify.' },
];

const STEPS = [
  { title: '01 Capture', lines: ['decision, model,', 'evidence'], one: 'decision, model, evidence' },
  { title: '02 Check', lines: ['against your', 'policies'], one: 'against your policies' },
  { title: '03 Sign', lines: ['Ed25519 over', 'canonical JSON'], one: 'Ed25519 over canonical JSON' },
];

function Wide() {
  // Row centre y=100. Source, a Thursdai bracket holding three steps, then the receipt.
  const stepX = [236, 412, 588];
  return (
    <Sheet title={TITLE} width={960} height={200}>
      <Box x={20} y={64} w={152} h={72} kind="external" title="AI system" lines={['yours or a', 'vendor’s']} />
      <Arrow points={[[172, 100], [236, 100]]} />
      <Bracket x={212} y={36} w={544} h={128} label="Thursdai" />
      {STEPS.map((s, i) => (
        <Box key={s.title} x={stepX[i]} y={64} w={144} h={72} title={s.title} lines={s.lines} />
      ))}
      <Arrow points={[[380, 100], [412, 100]]} />
      <Arrow points={[[556, 100], [588, 100]]} />
      <Arrow points={[[732, 100], [796, 100]]} />
      <Box x={796} y={64} w={144} h={72} kind="record" title="AI Receipt" lines={['signed,', 'verifiable']} />
    </Sheet>
  );
}

function Narrow() {
  const stepY = [140, 236, 332];
  return (
    <Sheet title={TITLE} width={340} height={540}>
      <Box x={44} y={20} w={252} h={56} kind="external" title="AI system" lines={['yours or a vendor’s']} />
      <Arrow points={[[170, 76], [170, 140]]} />
      <Bracket x={20} y={116} w={300} h={304} label="Thursdai" />
      {STEPS.map((s, i) => (
        <Box key={s.title} x={44} y={stepY[i]} w={252} h={64} title={s.title} lines={[s.one]} />
      ))}
      <Arrow points={[[170, 204], [170, 236]]} />
      <Arrow points={[[170, 300], [170, 332]]} />
      <Arrow points={[[170, 396], [170, 452]]} />
      <Box x={44} y={452} w={252} h={64} kind="record" title="AI Receipt" lines={['signed, verifiable']} />
    </Sheet>
  );
}

export function ThreeStepsDiagram() {
  return <DiagramFigure title="Three steps" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
