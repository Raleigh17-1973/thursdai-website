import React from 'react';
import { Box, Line, Node, Sheet, Text } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

// Versions over time for the sample tenant's requisition JR-204, matching the /demo replay
// (src/config/demo-hiring-replay.ts): rubric v2, v3, v4; the LL144 notice filed on Sep 2;
// the vendor agent connected on Sep 2 and moved to a newer model on Sep 30.

const TITLE =
  'Replay: knowledge, policy and model each change over time; the replay reads the versions that were live at the decision on 16 September at 14:32';

const LEGEND: LegendItem[] = [
  { term: 'Tracks', detail: 'Knowledge, policy and the deciding model each change on their own schedule.' },
  { term: 'Decision line', detail: 'The moment on the receipt: 16 September, 14:32 UTC, in the sample tenant.' },
  { term: 'Solid, then dashed', detail: 'Solid is what was live up to the decision. Dashed is what changed after it.' },
  { term: 'As recorded', detail: 'What a replay restores: rubric v3, both policies and the model version that ran.' },
];

interface Track {
  label: string;
  /** Segments: start day offset from Aug 4 and the version label. */
  segments: { day: number; text: string; short: string }[];
  recorded: string;
}

const TRACKS: Track[] = [
  {
    label: 'Knowledge',
    segments: [
      { day: 0, text: 'rubric v2', short: 'v2' },
      { day: 29, text: 'rubric v3', short: 'v3' },
      { day: 57, text: 'v4', short: 'v4' },
    ],
    recorded: 'rubric v3',
  },
  {
    label: 'Policy',
    segments: [
      { day: 0, text: 'pii-block', short: 'pii-block' },
      { day: 29, text: '+ ll144', short: 'both' },
    ],
    recorded: 'll144-notice, pii-block',
  },
  {
    label: 'Model',
    segments: [
      { day: 0, text: 'none', short: 'none' },
      { day: 29, text: 'GPT-4o', short: 'GPT-4o' },
      { day: 57, text: 'newer', short: 'newer' },
    ],
    recorded: 'GPT-4o 2025-04-01',
  },
];

const DECISION_DAY = 43; // Sep 16
const DATES = [
  { day: 0, text: 'Aug 4' },
  { day: 29, text: 'Sep 2' },
  { day: 43, text: 'Sep 16' },
  { day: 57, text: 'Sep 30' },
];

interface TimelineProps {
  /** x of Aug 4 and px per day; the track runs to xEnd. */
  x0: number;
  perDay: number;
  xEnd: number;
  trackY: number[];
  labelAbove: boolean;
  axisY: number;
  top: number;
  compact: boolean;
}

function Timeline({ x0, perDay, xEnd, trackY, labelAbove, axisY, top, compact }: TimelineProps) {
  const xd = x0 + DECISION_DAY * perDay;
  return (
    <g>
      {TRACKS.map((t, i) => {
        const y = trackY[i];
        return (
          <g key={t.label}>
            <Text x={20} y={labelAbove ? y - 26 : y + 4} tone="label">
              {t.label}
            </Text>
            {/* Live up to the decision: solid. After it: dashed. */}
            <Line points={[[x0, y], [xd, y]]} />
            <Line points={[[xd, y], [xEnd, y]]} dashed />
            {t.segments.map((s) => {
              const sx = x0 + s.day * perDay;
              return (
                <g key={s.day}>
                  <Line points={[[sx, y - 8], [sx, y + 8]]} />
                  <Text x={sx + 8} y={y - 6}>
                    {compact ? s.short : s.text}
                  </Text>
                </g>
              );
            })}
            <Node x={xd} y={y} shape="square" />
          </g>
        );
      })}

      {/* The decision line */}
      <Line points={[[xd, top + 12], [xd, axisY]]} />
      <Text x={xd} y={top + 4} anchor="middle" tone="label">
        Decision 14:32
      </Text>

      {/* Time axis */}
      <Line points={[[x0, axisY], [xEnd, axisY]]} />
      {DATES.map((d) => {
        const dx = x0 + d.day * perDay;
        return (
          <g key={d.day}>
            <Line points={[[dx, axisY], [dx, axisY + 4]]} />
            <Text x={dx} y={axisY + 20} anchor={d.day === 0 ? 'start' : 'middle'} tone="label">
              {d.text}
            </Text>
          </g>
        );
      })}
    </g>
  );
}

function Recorded({ x, y, w, rows, rowY }: { x: number; y: number; w: number; rows: 'aligned' | 'stacked'; rowY: number[] }) {
  const h = rows === 'aligned' ? rowY[rowY.length - 1] - y + 28 : 108;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} kind="record" title="As recorded" />
      {TRACKS.map((t, i) =>
        rows === 'aligned' ? (
          <Text key={t.label} x={x + 12} y={rowY[i] + 4}>
            {t.recorded}
          </Text>
        ) : (
          <g key={t.label}>
            <Text x={x + 12} y={y + 52 + i * 20} tone="label">
              {t.label}
            </Text>
            <Text x={x + 116} y={y + 52 + i * 20}>
              {t.recorded}
            </Text>
          </g>
        ),
      )}
    </g>
  );
}

function Wide() {
  // 8px per day from Aug 4 at x=200; the decision falls on x=544.
  const trackY = [88, 136, 184];
  return (
    <Sheet title={TITLE} width={960} height={264}>
      <Timeline x0={200} perDay={8} xEnd={720} trackY={trackY} labelAbove={false} axisY={224} top={28} compact={false} />
      <Recorded x={744} y={44} w={192} rows="aligned" rowY={trackY} />
    </Sheet>
  );
}

function Narrow() {
  // 4px per day from Aug 4 at x=24; the decision falls on x=196.
  const trackY = [64, 112, 160];
  return (
    <Sheet title={TITLE} width={340} height={364}>
      <Timeline x0={24} perDay={4} xEnd={300} trackY={trackY} labelAbove axisY={192} top={20} compact />
      <Recorded x={20} y={236} w={296} rows="stacked" rowY={trackY} />
    </Sheet>
  );
}

export function ReplayDiagram() {
  return <DiagramFigure title="Versions over time" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
