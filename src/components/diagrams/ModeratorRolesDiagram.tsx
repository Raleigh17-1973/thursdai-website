import React from 'react';
import { Arrow, Box, Line, Node, Sheet } from './kit';
import { DiagramFigure, type LegendItem } from './DiagramFigure';

const TITLE = 'Moderator roles: Legal, Finance and Engineering weigh in, their views are merged into one answer and one receipt records it';

const LEGEND: LegendItem[] = [
  { term: 'Roles', detail: 'Legal, Finance and Engineering are example roles. Each gives a view grounded in the knowledge it is given.' },
  { term: 'Moderator', detail: 'Chooses which roles weigh in, and their views are merged into one answer.' },
  { term: 'One answer', detail: 'The roles and sources behind the answer are shown with it.' },
  { term: 'One receipt', detail: 'Recorded like a decision from any other system. The Moderator is one source among many.' },
];

const ROLES = [
  { title: 'Legal', line: 'contracts, policy' },
  { title: 'Finance', line: 'budget, approvals' },
  { title: 'Engineering', line: 'systems, SLAs' },
];

function Wide() {
  // Four columns of 176 with 64 gutters, centred on 960. Roles stack on the left and merge
  // on a bus at x=240 before the Moderator.
  const roleY = [28, 120, 212];
  return (
    <Sheet title={TITLE} width={960} height={300}>
      {ROLES.map((r, i) => (
        <Box key={r.title} x={32} y={roleY[i]} w={176} h={56} title={r.title} lines={[r.line]} />
      ))}
      <Line points={[[208, 56], [240, 56], [240, 240], [208, 240]]} />
      <Node x={240} y={148} />
      <Arrow points={[[208, 148], [272, 148]]} />
      <Box x={272} y={112} w={176} h={72} title="Moderator" lines={['chooses the roles,', 'merges the views']} />
      <Arrow points={[[448, 148], [512, 148]]} />
      <Box x={512} y={112} w={176} h={72} title="One answer" lines={['sources cited', 'by role']} />
      <Arrow points={[[688, 148], [752, 148]]} />
      <Box x={752} y={112} w={176} h={72} kind="record" title="AI Receipt" lines={['like any other', 'source']} />
    </Sheet>
  );
}

function Narrow() {
  // Roles stack; their right edges merge on a lane at x=300 that drops into the Moderator.
  const roleY = [20, 92, 164];
  return (
    <Sheet title={TITLE} width={340} height={524}>
      {ROLES.map((r, i) => (
        <Box key={r.title} x={20} y={roleY[i]} w={248} h={56} title={r.title} lines={[r.line]} />
      ))}
      <Line points={[[268, 48], [300, 48]]} />
      <Line points={[[268, 120], [300, 120]]} />
      <Line points={[[268, 192], [300, 192]]} />
      <Node x={300} y={120} />
      <Node x={300} y={192} />
      <Arrow points={[[300, 48], [300, 252]]} />
      <Box x={20} y={252} w={300} h={56} title="Moderator" lines={['chooses roles, merges views']} />
      <Arrow points={[[170, 308], [170, 348]]} />
      <Box x={20} y={348} w={300} h={56} title="One answer" lines={['sources cited by role']} />
      <Arrow points={[[170, 404], [170, 444]]} />
      <Box x={20} y={444} w={296} h={56} kind="record" title="AI Receipt" lines={['like any other source']} />
    </Sheet>
  );
}

export function ModeratorRolesDiagram() {
  return <DiagramFigure title="Moderator roles" wide={<Wide />} narrow={<Narrow />} legend={LEGEND} />;
}
