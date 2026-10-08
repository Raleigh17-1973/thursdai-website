// Real product captures (plan Item 6.1). Source: staging, the fictional Acme tenant, captured
// 2026-10-08 at 1440x900 and DSF 2 (outputs/product-captures/captures.md). Files in
// public/product are crops of those PNGs at full 2x resolution, losslessly recompressed.
//
// Honesty rules, binding and enforced by tests/components/captures.test.ts:
// - Staging does not sign records. A record view is never called a signed receipt, and its
//   crop keeps the "Demo record · Chained · not signed" chip and the "Signing is off" line.
// - The dashboard's EU AI Act panel is risk-tier classification, not a compliance report, and
//   its "full audit pack" tile is not repeated as a claim.
// - The seeded policy label is not turned into a Local Law 144 reporting claim.

export interface Capture {
  src: string;
  /** Intrinsic pixel size of the file (2x the CSS size it was captured at). */
  width: number;
  height: number;
  /** Route-like label for the frame's title bar. */
  label: string;
  alt: string;
  caption: string;
}

export const CAPTION_PREFIX = 'Sample tenant: Acme (fictional), staging.';

const RECORD_NOT_SIGNED =
  'Staging does not sign records, so this one reads not signed; production records are signed.';

/** The record view, cropped to the record: breadcrumb, status chips, integrity lines, summary. */
export const RECORD_VIEW_SUMMARY: Capture = {
  src: '/product/record-view-summary.png',
  width: 2044,
  height: 1310,
  label: 'Thursdai app / Decisions / Record',
  alt:
    'Screenshot of a decision record in the Thursdai app titled "Held an application for hiring-manager review", Recruiting, decided Jul 28, 2026. ' +
    'Status chips read Followed, Pending, High risk and "Demo record · Chained · not signed". ' +
    'A line says signing is off in this environment, so the entry has no signature. ' +
    'Below are a plain-language summary and the AI recommendation, hold for hiring manager, beside the reviewer decision to keep it.',
  caption: `${CAPTION_PREFIX} The record view in the Thursdai app. ${RECORD_NOT_SIGNED}`,
};

/** The same record view with the app navigation, for the pillar page. */
export const RECORD_VIEW_APP: Capture = {
  src: '/product/record-view-app.png',
  width: 2808,
  height: 1392,
  label: 'Thursdai app / Decisions / Record',
  alt:
    'Screenshot of the Thursdai app with its navigation on the left and Decisions selected. ' +
    'The page shows one decision record, "Held an application for hiring-manager review", with status chips Followed, Pending, High risk and "Demo record · Chained · not signed". ' +
    'A line says signing is off in this environment, so the entry has no signature. ' +
    'Below are a plain-language summary and the AI recommendation beside the reviewer decision.',
  caption: `${CAPTION_PREFIX} The record view in the Thursdai app. ${RECORD_NOT_SIGNED}`,
};

/** Further down the same record: what the decision ran on. */
export const RECORD_VIEW_PROVENANCE: Capture = {
  src: '/product/record-view-provenance.png',
  width: 2044,
  height: 1272,
  label: 'Thursdai app / Decisions / Record',
  alt:
    'Screenshot of the lower part of the same decision record. ' +
    'Model and confidence shows resume-screener-v2.3 at 82 percent. ' +
    'Policy snapshot shows the policy name, version v2, an effective date and a truncated content hash. ' +
    'Memory snapshot and review trail say none was captured or requested. ' +
    'Evidence lists one screening rubric and scorecard with its hash, and a collapsed ledger record section sits at the bottom.',
  caption: `${CAPTION_PREFIX} Further down the same record view: the model, the policy snapshot with its content hash, the review trail and the evidence. ${RECORD_NOT_SIGNED}`,
};

/** The decision ledger dashboard, with the app navigation. */
export const DECISION_LEDGER: Capture = {
  src: '/product/decision-ledger.png',
  width: 2808,
  height: 1660,
  label: 'Thursdai app / Decisions',
  alt:
    'Screenshot of the decision ledger dashboard in the Thursdai app, headed "AI Decisions across the organization" and computed live from 1,296 seeded decision records. ' +
    'Six tiles show decisions captured, high-risk decisions, decisions pending review, the human override rate, average AI confidence and the share of decisions with complete evidence. ' +
    'Below are high-risk decisions by domain and how captured decisions are distributed across EU AI Act risk tiers.',
  caption: `${CAPTION_PREFIX} The decision ledger, computed live from seeded sample decisions. The EU AI Act panel classifies risk tiers; it is not a compliance report.`,
};

export const CAPTURES = [RECORD_VIEW_SUMMARY, RECORD_VIEW_APP, RECORD_VIEW_PROVENANCE, DECISION_LEDGER];
