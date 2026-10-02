import React from 'react';
import { Arrow, Line, Node, Sheet, Text, Box } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE =
  'Ambient case assembly: events from four streams, the ones that match a case rule are gathered into one case file';

const LEGEND: LegendItem[] = [
  { term: 'Event streams', detail: 'Contracts, policy changes, incidents and AI Receipts from connected systems.' },
  { term: 'Ticks and squares', detail: 'Each tick is an event. A square is an event that matches a case rule.' },
  { term: 'Case file', detail: 'The matched events, the policies in scope and the related receipts, in order.' },
  { term: 'Before anyone opens it', detail: 'Assembly runs in the background, so an investigator starts with the facts.' },
];

const STREAMS = [
  { label: 'Contracts', ticks: [0.08, 0.3, 0.52, 0.86], match: [0.3] },
  { label: 'Policy changes', ticks: [0.2, 0.62], match: [0.62] },
  { label: 'Incidents', ticks: [0.12, 0.44, 0.7, 0.9], match: [0.44] },
  { label: 'AI Receipts', ticks: [0.04, 0.16, 0.26, 0.38, 0.5, 0.58, 0.74, 0.82, 0.94], match: [0.38, 0.74] },
];

const CASE_ITEMS = ['matched events', 'policies in scope', 'related receipts', 'timeline'];

/** Snap a fraction of a stream's length to the 4px grid. */
const at = (x0: number, x1: number, f: number) => x0 + Math.round(((x1 - x0) * f) / 4) * 4;

function Stream({ x0, x1, y, ticks, match }: { x0: number; x1: number; y: number; ticks: number[]; match: number[] }) {
  return (
    <g>
      <Line points={[[x0, y], [x1, y]]} />
      {ticks.map((t) =>
        match.includes(t) ? (
          <Node key={t} x={at(x0, x1 - 24, t)} y={y} shape="square" />
        ) : (
          <Line key={t} points={[[at(x0, x1 - 24, t), y - 4], [at(x0, x1 - 24, t), y + 4]]} />
        ),
      )}
    </g>
  );
}

function CaseFile({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={144} kind="record" title="Case file" />
      {CASE_ITEMS.map((item, i) => (
        <g key={item}>
          <rect
            x={x + 12}
            y={y + 40 + i * 24}
            width={8}
            height={8}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.6}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
          <Text x={x + 28} y={y + 48 + i * 24}>
            {item}
          </Text>
        </g>
      ))}
    </g>
  );
}

function Wide() {
  // Streams run from x=200 to the bus at x=648; the bus feeds the case file.
  const ys = [48, 104, 160, 216];
  return (
    <Sheet title={TITLE} width={960} height={264}>
      {STREAMS.map((s, i) => (
        <g key={s.label}>
          <Text x={20} y={ys[i] + 4} tone="label">
            {s.label}
          </Text>
          <Stream x0={200} x1={648} y={ys[i]} ticks={s.ticks} match={s.match} />
        </g>
      ))}
      <Line points={[[648, 48], [648, 216]]} />
      <Node x={648} y={132} />
      <Text x={648} y={28} anchor="middle" tone="label">
        Matched
      </Text>
      <Arrow points={[[648, 132], [700, 132]]} />
      <CaseFile x={700} y={60} w={236} />
    </Sheet>
  );
}

function Narrow() {
  // Each stream gets its label above it; the streams meet on a lane at x=300 that drops into
  // the case file.
  const ys = [40, 96, 152, 208];
  return (
    <Sheet title={TITLE} width={340} height={424}>
      {STREAMS.map((s, i) => (
        <g key={s.label}>
          <Text x={20} y={ys[i] - 12} tone="label">
            {s.label}
          </Text>
          <Stream x0={20} x1={300} y={ys[i]} ticks={s.ticks} match={s.match} />
        </g>
      ))}
      <Arrow points={[[300, 40], [300, 256]]} />
      <CaseFile x={20} y={256} w={296} />
    </Sheet>
  );
}

export function AmbientCaseDiagram() {
  return <DiagramFigure title="Ambient case assembly" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
