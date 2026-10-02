import React from 'react';
import { ReceiptFrame } from '@/components/receipt/ReceiptFrame';
import { SAMPLE_HIRING_RECEIPT } from '@/components/receipt/sample';

// Kept as a thin wrapper so older imports keep working. New code should render
// <ReceiptFrame {...props} /> directly.
export function AiReceiptCard() {
  return <ReceiptFrame {...SAMPLE_HIRING_RECEIPT} />;
}
