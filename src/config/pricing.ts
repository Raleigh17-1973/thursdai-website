// ALL pricing constants — single source of truth
// Jeffrey Hoyt must confirm these values before /pricing goes live.
// See implementation plan: D2, Week 5 Day 34, Risk 2.

export const PRICING = {
  // Platform fee tiers (annual, USD)
  platform: {
    smb: 60_000,        // < 500 seats
    midmarket: 120_000, // 500–2,000 seats
    enterprise: 280_000, // 2,000–10,000 seats
    fortune100: 480_000, // > 10,000 seats
  },

  // Credit pricing
  creditsPerThousandTokens: 0.018, // USD per 1K inference tokens

  // Outcome pricing
  perClosedCase: 2.20, // USD per closed case

  // Seat thresholds
  seatThresholds: {
    smb: 500,
    midmarket: 2000,
    enterprise: 10000,
  },
} as const;

// IMPORTANT: These are illustrative numbers from the implementation plan.
// Jeffrey Hoyt must confirm all values before enabling the pricing page.
// Feature flag: 'pricing-page-live' (PostHog) defaults to false.
