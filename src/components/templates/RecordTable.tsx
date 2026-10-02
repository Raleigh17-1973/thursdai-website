import React from 'react';
import { LABEL_STYLE } from '@/components/typography/scale';

export interface RecordColumn {
  key: string;
  label: string;
  /** Desktop width, e.g. "34%". */
  width?: string;
}

export type RecordRow = Record<string, React.ReactNode> & { id: string };

interface RecordTableProps {
  caption: string;
  columns: RecordColumn[];
  rows: RecordRow[];
  /** The column that names each row; rendered as the row header. Defaults to the first. */
  rowHeader?: string;
  style?: React.CSSProperties;
}

const cell = 'block md:table-cell md:px-4 md:py-4 md:align-top';

// A document table: strong ink rule on top, a sunk mono header, hairline rows. Below md each
// row stacks into a block with its own mono labels, so nothing scrolls sideways on a phone.
// Used by the Trust document and Compare templates.
export function RecordTable({ caption, columns, rows, rowHeader, style }: RecordTableProps) {
  const headerKey = rowHeader ?? columns[0]?.key;
  return (
    <table
      className="block md:table"
      style={{ width: '100%', borderCollapse: 'collapse', borderTop: '1px solid var(--ink)', ...style }}
    >
      <caption className="sr-only">{caption}</caption>
      <thead className="hidden md:table-header-group">
        <tr style={{ background: 'var(--sunk)', borderBottom: '1px solid var(--rule)' }}>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className="px-4 py-3"
              style={{ ...LABEL_STYLE, color: 'var(--ink-2)', textAlign: 'left', width: col.width }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {rows.map((row) => (
          <tr
            key={row.id}
            className="flex flex-col gap-y-3 py-5 md:table-row md:py-0"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            {columns.map((col) => {
              const content = row[col.key];
              if (col.key === headerKey) {
                return (
                  <th
                    key={col.key}
                    scope="row"
                    className={cell}
                    style={{
                      textAlign: 'left',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: 1.45,
                      color: 'var(--ink)',
                    }}
                  >
                    {content}
                  </th>
                );
              }
              return (
                <td
                  key={col.key}
                  className={cell}
                  style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--color-text-secondary)' }}
                >
                  <span className="block md:hidden" style={{ ...LABEL_STYLE, marginBottom: '0.25rem' }}>
                    {col.label}
                  </span>
                  {content}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
