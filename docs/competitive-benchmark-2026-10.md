# Competitive design and marketing benchmark: Thursdai vs 24 AI SaaS sites

**Date:** October 2, 2026
**Subject:** https://getthursdai.com (all 41 pages in the sitemap)
**Builds on:** `docs/saas-design-research-recommendations.md` (June 2026). That pass compared Thursdai to 25 general B2B SaaS homepages and produced REC-01 through REC-12. This pass is narrower and harder: AI SaaS only, every site fetched live and screenshotted on desktop and mobile, a shared 12-dimension rubric and Thursdai scored on the same rubric with the same standard.

---

## 1. Summary

**Thursdai ranks 25th of 25, total 56.7 / 100** (visual 56.7, marketing 56.7). The top of the board is Linear 85.0, Antimetal 82.5, Granola 82.5, Harvey 80.8, Vanta 80.0.

That rank is driven by three things, in order of weight:

1. **Proof and trust scores 2.** No logos, no named customers, every certification "Planned", every number "Illustrative". Every other site in the set, including the pivoted Patronus, has more. This single dimension costs about 5 points of total. It is also the dimension the site cannot fully fix with design.
2. **Polish scores 5 because of things that are not design at all.** Six pages reachable from the nav and sitemap are empty (Careers, Press, API Reference, Documentation, Research, Certifications: a heading, one sentence, a footer). The `og:url`, `sitemap.xml` and `robots.txt` all point to `thursdai.com`, which resolves to a GoDaddy "this domain is for sale" page. The `<title>` says "The Governed Agent Substrate for Regulated Enterprises" while the hero says "Every AI decision, on the record." These are an afternoon of work and they currently cap the site below Drata.
3. **Visual scores 5 to 6 across the board** because the site is built from the same kit as the bottom half of the set: three-card grids, indigo on white, tracked uppercase labels, HTML mockups. Nothing is broken. Nothing is distinctive either, and the top 10 all have one owned visual idea (Linear's black, Antimetal's blueprint, Cursor's paintings, Granola's collage, Vanta's lavender llama, Harvey's painted canvases).

What is working, and should not be touched in the next pass: the headline (7, within half a point of the top-10 median), the AI Receipt card as a hero artifact, the Differentiation score (7, at the top-10 median; the compare pages against Copilot, ChatGPT Enterprise and Glean are better than anything Credo or Holistic have), the load speed (among the three fastest in the set), and clean mobile with no horizontal overflow on any of 41 pages.

**The short version of the recommendation:** fix the four technical embarrassments this week, then pick one visual idea and commit the whole site to it, then rebuild the home page as seven beats with the problem statement second instead of eighth. Proof will come from the design-partner program; the site should stop apologizing for its absence and start showing the artifact instead.

---

## 2. Method

- 24 benchmark sites plus Thursdai, all fetched live on October 2, 2026 with headless Chromium at 1440×900 (desktop, Chrome UA) and 390×844 (iPhone UA, 2x). Hero, full-page and scroll-through screenshots, DOM text, fonts, nav items, above-fold CTAs, page height, load timing and horizontal-overflow checks were captured for each. Nothing in this report is from memory of what a site used to look like.
- Six sites rendered blank or errored on the first pass (Linear, Cursor, Antimetal, Drata, Harvey, Searchable) and were re-captured with a 9-second settle and software GPU. Where a site failed in both passes the failure is recorded in its Polish score, because a prospect on an older laptop sees the same thing.
- All 41 Thursdai pages from the sitemap were captured the same way. Interactive states were tested separately: the Product mega-menu, the "Get a Demo" modal, the "Try the replay demo" button and the theme toggle.
- Scores are 1 to 10 on 12 dimensions. Total = mean of the six visual dimensions × 5 + mean of the six marketing dimensions × 5, so each half is worth 50 and the total is out of 100.
- Load times measured from inside a proxied container are inflated and are used only relatively.

### Comparison set

| Group | Sites | Notes |
|---|---|---|
| Direct and adjacent competitors (9) | Credo AI, Holistic AI, Vanta, Drata, Arize, Fiddler, Galileo, Lakera, Patronus AI | Patronus has pivoted its home page from evals to "Digital World Models" research; kept as a cautionary case of a beautiful site with no buyer path. Humanloop was dropped because its home page is now a single "Humanloop joins Anthropic" announcement. Robust Intelligence's site did not respond. Weights & Biases is live but is MLOps rather than governance and was left out to keep the set at 24. |
| Design-leading AI SaaS (9) | Linear, Vercel, Anthropic, Cursor, ElevenLabs, Runway, Perplexity Enterprise, Cohere, Mistral | Perplexity scored on `/enterprise` because the root is the search app, not a marketing page. Replit is live but is a builder tool aimed at a different buyer and was left out. |
| Wildcards (6) | Harvey, Sierra, Antimetal, Attio, Granola, Searchable | Harvey and Sierra are vertical AI with best-in-class proof. Antimetal, Attio and Granola recur on Godly/recent.design, Bookmarkify and Veza's 2026 lists. Searchable was on Bookmarkify's end-of-2025 showcase and is kept to show how a curated-list hero can hide a broken live experience (client-side exception on first load, lead-gen modal hijacking every scroll). |

### Rubric

Visual professionalism (50%): 1 Typography · 2 Layout and spacing · 3 Color and theming · 4 Motion and interaction · 5 Imagery and product visuals · 6 Polish and craft.
Marketing effectiveness (50%): 7 Headline and value proposition · 8 Audience targeting · 9 Proof and trust · 10 Narrative structure · 11 Calls to action · 12 Differentiation.

Anchors used for every site: **9 to 10** would be studied by other designers; **7 to 8** professional, nothing to fix; **5 to 6** competent but generic or with visible seams; **3 to 4** actively hurts trust; **1 to 2** absent.

---

## 3. Leaderboard

| # | Site | Category | Typo | Layout | Color | Motion | Imagery | Polish | Headline | Audience | Proof | Narrative | CTA | Differentiation | Visual /100 | Marketing /100 | **Total** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | [Linear](https://linear.app) | Design leader | 9 | 9 | 9 | 9 | 10 | 9 | 8 | 8 | 7 | 8 | 8 | 8 | 91.7 | 78.3 | **85.0** |
| 2 | [Antimetal](https://antimetal.com) | Wildcard (design community) | 10 | 9 | 9 | 9 | 9 | 7 | 7 | 7 | 7 | 9 | 7 | 9 | 88.3 | 76.7 | **82.5** |
| 3 | [Granola](https://www.granola.ai) | Wildcard (design community) | 9 | 8 | 8 | 7 | 9 | 8 | 9 | 8 | 8 | 8 | 8 | 9 | 81.7 | 83.3 | **82.5** |
| 4 | [Harvey](https://www.harvey.ai) | Wildcard (vertical AI) | 9 | 9 | 8 | 7 | 9 | 7 | 7 | 9 | 10 | 8 | 7 | 7 | 81.7 | 80.0 | **80.8** |
| 5 | [Vanta](https://www.vanta.com) | Competitor (trust/compliance) | 8 | 8 | 8 | 7 | 8 | 8 | 7 | 8 | 10 | 9 | 8 | 7 | 78.3 | 81.7 | **80.0** |
| 6 | [Vercel](https://vercel.com) | Design leader | 9 | 9 | 8 | 8 | 8 | 9 | 6 | 7 | 8 | 7 | 8 | 7 | 85.0 | 71.7 | **78.3** |
| 7 | [Cohere](https://cohere.com) | Design leader | 9 | 8 | 8 | 7 | 8 | 7 | 8 | 8 | 8 | 8 | 7 | 8 | 78.3 | 78.3 | **78.3** |
| 8 | [Attio](https://attio.com) | Wildcard (design community) | 8 | 8 | 8 | 8 | 9 | 7 | 7 | 8 | 7 | 8 | 9 | 7 | 80.0 | 76.7 | **78.3** |
| 9 | [Cursor](https://cursor.com) | Design leader | 8 | 8 | 8 | 7 | 9 | 6 | 8 | 8 | 9 | 8 | 8 | 7 | 76.7 | 80.0 | **78.3** |
| 10 | [Perplexity Enterprise](https://www.perplexity.ai/enterprise) | Design leader | 8 | 8 | 8 | 7 | 8 | 7 | 8 | 8 | 9 | 8 | 8 | 6 | 76.7 | 78.3 | **77.5** |
| 11 | [ElevenLabs](https://elevenlabs.io) | Design leader | 8 | 8 | 8 | 8 | 9 | 8 | 5 | 8 | 8 | 8 | 8 | 7 | 81.7 | 73.3 | **77.5** |
| 12 | [Arize](https://arize.com) | Competitor (observability) | 8 | 7 | 7 | 7 | 8 | 6 | 8 | 8 | 9 | 8 | 9 | 7 | 71.7 | 81.7 | **76.7** |
| 13 | [Mistral](https://mistral.ai) | Design leader | 8 | 8 | 9 | 7 | 8 | 7 | 7 | 7 | 8 | 7 | 7 | 8 | 78.3 | 73.3 | **75.8** |
| 14 | [Anthropic](https://www.anthropic.com) | Design leader | 9 | 9 | 9 | 6 | 8 | 9 | 7 | 6 | 5 | 6 | 6 | 8 | 83.3 | 63.3 | **73.3** |
| 15 | [Holistic AI](https://www.holisticai.com) | Competitor (governance) | 7 | 7 | 7 | 7 | 7 | 7 | 7 | 8 | 9 | 8 | 7 | 6 | 70.0 | 75.0 | **72.5** |
| 16 | [Fiddler](https://www.fiddler.ai) | Competitor (observability/governance) | 7 | 7 | 6 | 6 | 5 | 7 | 8 | 8 | 9 | 8 | 8 | 7 | 63.3 | 80.0 | **71.7** |
| 17 | [Galileo](https://galileo.ai) | Competitor (observability/evals) | 7 | 7 | 7 | 6 | 6 | 7 | 8 | 7 | 7 | 7 | 8 | 8 | 66.7 | 75.0 | **70.8** |
| 18 | [Credo AI](https://www.credo.ai) | Competitor (governance) | 7 | 6 | 7 | 6 | 6 | 6 | 7 | 7 | 8 | 8 | 7 | 7 | 63.3 | 73.3 | **68.3** |
| 19 | [Runway](https://runway.com) | Design leader | 7 | 7 | 7 | 8 | 9 | 7 | 5 | 6 | 7 | 6 | 7 | 6 | 75.0 | 61.7 | **68.3** |
| 20 | [Sierra](https://sierra.ai) | Wildcard (vertical AI) | 8 | 8 | 8 | 8 | 8 | 7 | 4 | 6 | 8 | 7 | 5 | 5 | 78.3 | 58.3 | **68.3** |
| 21 | [Lakera](https://www.lakera.ai) | Competitor (AI security) | 7 | 7 | 7 | 6 | 5 | 6 | 6 | 7 | 8 | 7 | 8 | 5 | 63.3 | 68.3 | **65.8** |
| 22 | [Drata](https://drata.com) | Competitor (trust/compliance) | 6 | 5 | 6 | 6 | 7 | 4 | 5 | 7 | 9 | 7 | 7 | 5 | 56.7 | 66.7 | **61.7** |
| 23 | [Searchable](https://www.searchable.com) | Wildcard (design list pick) | 6 | 6 | 6 | 5 | 7 | 3 | 7 | 7 | 6 | 6 | 7 | 6 | 55.0 | 65.0 | **60.0** |
| 24 | [Patronus AI](https://www.patronus.ai) | Competitor (evals, pivoted) | 8 | 7 | 7 | 8 | 7 | 6 | 3 | 4 | 4 | 5 | 4 | 6 | 71.7 | 43.3 | **57.5** |
| 25 | [**Thursdai**](https://getthursdai.com) | Subject | 6 | 6 | 6 | 6 | 5 | 5 | 7 | 7 | 2 | 6 | 5 | 7 | 56.7 | 56.7 | **56.7** |

---

## 4. Score cards (one-line justification per score)

### 1. Linear (85.0)

https://linear.app · Design leader · Visual 91.7 · Marketing 78.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | Inter Variable, tight tracking, 64px hero, disciplined scale |
| Layout and spacing | 9 | Strict grid, 40% empty viewports, consistent section cadence |
| Color and theming | 9 | Near-black with one accent moment (yellow/lavender quote cards) |
| Motion and interaction | 9 | Fade-in product UI on scroll, smooth, nothing decorative |
| Imagery and product visuals | 10 | Real product UI in every section plus line-art isometrics |
| Polish and craft | 9 | Everything works; skip-link, footer, changelog all crafted |
| Headline and value proposition | 8 | 'The product development system for teams and agents' is clear in 5 seconds |
| Audience targeting | 8 | Builders and the agents they run; enterprise path via Contact |
| Proof and trust | 7 | OpenAI, Vercel, Figma, Cursor, Coinbase, Ramp logos; two named quotes; 40,000+ teams |
| Narrative structure | 8 | Hero, logos, manifesto line, four feature chapters, changelog, quotes, CTA |
| Calls to action | 8 | Sign up pill + Log in; Contact sales at the close |
| Differentiation | 8 | 'A new species of product tool' and the teams-and-agents framing |

### 2. Antimetal (82.5)

https://antimetal.com · Wildcard (design community) · Visual 88.3 · Marketing 76.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 10 | Signifier serif display + mono labels; the most resolved editorial type system in the set |
| Layout and spacing | 9 | Blueprint grid, huge margins, one idea per viewport |
| Color and theming | 9 | Warm stone and ink, no accent color needed; dark panels used as punctuation |
| Motion and interaction | 9 | Scroll-driven generative network and blueprint reveals, all purposeful |
| Imagery and product visuals | 9 | Generative viz, blueprint diagrams and real product UI, one consistent hand |
| Polish and craft | 7 | Heavy canvas work: hero paints blank in a fast headless run; first-paint risk on weak devices |
| Headline and value proposition | 7 | 'Production that runs itself.' is a claim, not a category; needs the sub to land |
| Audience targeting | 7 | Clearly platform/SRE engineers, but buyer path (CIO) is thin |
| Proof and trust | 7 | One Google VP video quote, SOC 2; few logos |
| Narrative structure | 9 | Essay structure: problem paragraph, vision, layers, platform, agents, FAQ, research log |
| Calls to action | 7 | Book a demo + Explore the research; no self-serve |
| Differentiation | 9 | 'Everyone else watches. We operate.' and 'a new layer of the stack' position against the category |

### 3. Granola (82.5)

https://www.granola.ai · Wildcard (design community) · Visual 81.7 · Marketing 83.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | Quadrant serif at 86px, confident |
| Layout and spacing | 8 | Collage layouts with photography; a little busy mid-page |
| Color and theming | 8 | Cream, lime, black; three colors, used consistently |
| Motion and interaction | 7 | Light; the product does the talking |
| Imagery and product visuals | 9 | Real app windows over photography; consistent collage hand |
| Polish and craft | 8 | Long page (14k px) but everything renders; clean footer |
| Headline and value proposition | 9 | 'The AI notepad for back-to-back meetings. Without a meeting bot.' category + differentiator in ten words |
| Audience targeting | 8 | Busy professionals; enterprise path in nav |
| Proof and trust | 8 | Linear, Intercom, Figma, Ramp, Vanta logos; Linear CEO quote |
| Narrative structure | 8 | Hero, how it works, logos, before/during/after, features, CTA |
| Calls to action | 8 | Download for free with platform line; Talk to sales |
| Differentiation | 9 | 'Without a meeting bot' is a one-phrase wedge against every competitor |

### 4. Harvey (80.8)

https://www.harvey.ai · Wildcard (vertical AI) · Visual 81.7 · Marketing 80.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | Custom serif at 72px, editorial pairing with a grotesque |
| Layout and spacing | 9 | Wide-margin two-column hero, calm rhythm |
| Color and theming | 8 | Monochrome plus painted texture backgrounds |
| Motion and interaction | 7 | Restrained; video modules on scroll |
| Imagery and product visuals | 9 | Real dashboards framed on painted canvases, portrait photography |
| Polish and craft | 7 | Several gray placeholder blocks on scroll (lazy video); announcement bar |
| Headline and value proposition | 7 | 'Build a Frontier Legal Organization' is aspirational; the sub does the explaining |
| Audience targeting | 9 | Law firms vs in-house split with separate paths |
| Proof and trust | 10 | 3,000+ legal orgs, 200,000+ professionals, 80+ AmLaw 100, logo wall, Reed Smith quote, ISO 42001 |
| Narrative structure | 8 | Hero, proof, two audiences, product, quotes, numbers, CTA |
| Calls to action | 7 | Single Request a Demo everywhere; no secondary path |
| Differentiation | 7 | Vertical focus is the differentiation; copy itself is generic 'frontier' |

### 5. Vanta (80.0)

https://www.vanta.com · Competitor (trust/compliance) · Visual 78.3 · Marketing 81.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | SC Ripley serif at 88px, Inter body; clear hierarchy |
| Layout and spacing | 8 | Centered hero, product shot, consistent six-card grids |
| Color and theming | 8 | One lavender, one purple; restrained and ownable |
| Motion and interaction | 7 | Light; llama mascot carries personality |
| Imagery and product visuals | 8 | Real product UI, illustrated mascot, portrait case studies |
| Polish and craft | 8 | Announcement bar plus nav; otherwise tight |
| Headline and value proposition | 7 | 'The new standard for trust' + sub naming compliance, risk, customer trust |
| Audience targeting | 8 | Startup / mid-market / enterprise paths named |
| Proof and trust | 10 | 16,000+ customers, Ramp/Cursor/Snowflake/Lovable, GitHub quote, Forrester Wave, 'Proof? We've got proof.' |
| Narrative structure | 9 | Hero, product, logos, platform, agent, quote, frameworks, segments, proof, resources, CTA |
| Calls to action | 8 | Email capture + Get a demo in hero; Plans in nav |
| Differentiation | 7 | 'Trust is everything'; category leader tone, not contrastive |

### 6. Vercel (78.3)

https://vercel.com · Design leader · Visual 85.0 · Marketing 71.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | Geist at scale; one typeface does everything |
| Layout and spacing | 9 | Three-column hero around a single glyph; generous |
| Color and theming | 8 | Pure monochrome; the triangle is the only mark |
| Motion and interaction | 8 | Subtle, fast; no scroll gimmicks |
| Imagery and product visuals | 8 | Real product UI and customer embeds (Notion, Zapier) |
| Polish and craft | 9 | Flawless load, skip-link, brand menu on logo |
| Headline and value proposition | 6 | 'Agentic Infrastructure' is a category label, not a value claim; the three sub-lines carry it |
| Audience targeting | 7 | Developers first, enterprise via Get a Demo |
| Proof and trust | 8 | Meta, Schwab, DoorDash, OpenAI, SpaceX logos; Notion and Zapier scale stats |
| Narrative structure | 7 | Hero, logos, two feature chapters; short and confident but thin on problem framing |
| Calls to action | 8 | Deploy now / Talk to sales / Get a Demo in nav |
| Differentiation | 7 | Positions on agents, but reads like the category rather than against it |

### 7. Cohere (78.3)

https://cohere.com · Design leader · Visual 78.3 · Marketing 78.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | CohereText at 96px; 'Your AI. Your rules.' is pure typography |
| Layout and spacing | 8 | Full-bleed product over landscape, then clean grid |
| Color and theming | 8 | Black, white, nature photography as the only color |
| Motion and interaction | 7 | Restrained; model visualizations animate |
| Imagery and product visuals | 8 | Product UI composited on landscapes; consistent |
| Polish and craft | 7 | Cookie banner and announcement bar stack on mobile |
| Headline and value proposition | 8 | 'Your AI. Your rules.' plus 'agentic enterprise AI platform that you control' |
| Audience targeting | 8 | Enterprise and sovereign buyers; industries section |
| Proof and trust | 8 | SAP, TD Bank, McKinsey; Jensen Huang quote; SOC2/ISO badges |
| Narrative structure | 8 | Hero, logos, empowerment, products, industries, customers, security, CTA |
| Calls to action | 7 | Request a demo only; no developer entry above the fold |
| Differentiation | 8 | Control and sovereignty against the hyperscaler labs |

### 8. Attio (78.3)

https://attio.com · Wildcard (design community) · Visual 80.0 · Marketing 76.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | interDisplay, tight; heavy weights carry the hero |
| Layout and spacing | 8 | Centered hero, long alternating feature chapters |
| Color and theming | 8 | White with one blue; dark closing chapter |
| Motion and interaction | 8 | Scroll-revealed product panels, smooth |
| Imagery and product visuals | 9 | Real product UI throughout |
| Polish and craft | 7 | Cookie banner; 17.6k px page is long |
| Headline and value proposition | 7 | 'Welcome to agentic revenue.' needs the sub ('the CRM that builds pipeline') |
| Audience targeting | 8 | GTM teams; Developers in nav |
| Proof and trust | 7 | Granola, Modal, Railway logos (startup tier); no named quotes |
| Narrative structure | 8 | Hero, logos, pipeline, deals, accounts, live-from-day-one, signals, ecosystem, CTA |
| Calls to action | 9 | Start for free + Talk to sales; mobile email capture |
| Differentiation | 7 | Agent-native CRM framing; strong but shared with competitors |

### 9. Cursor (78.3)

https://cursor.com · Design leader · Visual 76.7 · Marketing 80.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | CursorGothic; hero copy set unusually small (22px) and it works |
| Layout and spacing | 8 | Paintings as section canvases, UI windows layered |
| Color and theming | 8 | Warm cream and classical paintings; unexpected and ownable |
| Motion and interaction | 7 | Light; UI windows animate in |
| Imagery and product visuals | 9 | Real product windows over landscape paintings; the most distinctive imagery in the set |
| Polish and craft | 6 | First desktop load rendered 'Something went wrong' (chunk load failures); persistent cookie banner |
| Headline and value proposition | 8 | 'Cursor is your coding agent for building ambitious software.' one sentence |
| Audience targeting | 8 | Developers and engineering leaders; enterprise path |
| Proof and trust | 9 | Stripe, Datadog, NVIDIA, Adobe; quotes from Collison, Karpathy, shadcn; 'over half of Fortune 500' |
| Narrative structure | 8 | Hero, logos, agents, in-every-tool, teammates, quotes, frontier, research, changelog |
| Calls to action | 8 | Download for macOS + Request a demo |
| Differentiation | 7 | Agent-first positioning; copy is quiet rather than contrastive |

### 10. Perplexity Enterprise (77.5)

https://www.perplexity.ai/enterprise · Design leader · Visual 76.7 · Marketing 78.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | PPLX serif display with a clean sans; good hierarchy |
| Layout and spacing | 8 | Centered hero with floating UI; consistent card grids |
| Color and theming | 8 | Warm paper and deep teal; restrained |
| Motion and interaction | 7 | Light product transitions |
| Imagery and product visuals | 8 | Real product UI, no stock |
| Polish and craft | 7 | Clean; mobile hit a bot-check interstitial (CDN, not design) |
| Headline and value proposition | 8 | 'Accurate AI that works for your team' + one-sentence sub |
| Audience targeting | 8 | Team buyer; security section answers the CISO |
| Proof and trust | 9 | 50,000+ organizations, Databricks/Ramp/AlixPartners, per-customer stats, SOC 2 Type II |
| Narrative structure | 8 | Hero, logos, Computer, knowledge, browser, security, functions, proof, FAQ, CTA |
| Calls to action | 8 | Get started + Request a demo paired in hero |
| Differentiation | 6 | 'Orchestrates the best models' is a feature, not a stance |

### 11. ElevenLabs (77.5)

https://elevenlabs.io · Design leader · Visual 81.7 · Marketing 73.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | Waldenburg, clear scale |
| Layout and spacing | 8 | Two-column hero, consistent product chapters |
| Color and theming | 8 | Light neutral with colorful orbs as the only saturation |
| Motion and interaction | 8 | Interactive voice player and tabs in the hero |
| Imagery and product visuals | 9 | 3D orbs, real product UI, code; consistent |
| Polish and craft | 8 | Dense but everything works; large footer |
| Headline and value proposition | 5 | 'Bringing technology to life' says nothing; the sub names three products and three audiences |
| Audience targeting | 8 | Enterprises, creators, developers each get a chapter |
| Proof and trust | 8 | Logo wall, NVIDIA story, customer videos |
| Narrative structure | 8 | Hero, logos, two platforms, create, agents, API, research, safety, updates, CTA |
| Calls to action | 8 | Sign up + Contact sales |
| Differentiation | 7 | Research-first voice; 'leading AI voice generator' is a claim everyone makes |

### 12. Arize (76.7)

https://arize.com · Competitor (observability) · Visual 71.7 · Marketing 81.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | GT Alpina serif with a mono nav; distinctive pairing |
| Layout and spacing | 7 | Left-aligned hero, dense feature grids |
| Color and theming | 7 | Magenta, lavender, peach: one accent too many |
| Motion and interaction | 7 | Dotted-network hero animation; tab switcher |
| Imagery and product visuals | 8 | Real product UI; open-source Phoenix visuals |
| Polish and craft | 6 | Large cookie modal plus announcement bar on load |
| Headline and value proposition | 8 | 'The agent observability and evaluation platform.' exactly what it is |
| Audience targeting | 8 | Developers: 'Start in your terminal'; enterprise via demo |
| Proof and trust | 9 | DoorDash, Priceline, Wayfair, Uber, Duolingo, Reddit; 1 trillion spans; SOC2/HIPAA |
| Narrative structure | 8 | Hero, logos, product, numbers, workflows, infra, security, open source, quote, FAQ, CTA |
| Calls to action | 9 | Sign up, Book a demo, Start in product, Start in terminal |
| Differentiation | 7 | 'Don't ship vibes' and open source; otherwise category language |

### 13. Mistral (75.8)

https://mistral.ai · Design leader · Visual 78.3 · Marketing 73.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | Inter pushed to display scale; works through sheer size |
| Layout and spacing | 8 | Bento grid with visible hairlines; strong rhythm |
| Color and theming | 9 | Orange-red pixel mosaic is an unmistakable signature |
| Motion and interaction | 7 | Pixel animations; modest |
| Imagery and product visuals | 8 | Mosaic illustrations plus product shots; consistent |
| Polish and craft | 7 | Cookie modal with toggles on load |
| Headline and value proposition | 7 | 'Frontier AI. In your hands.' + 'tailored AI systems' |
| Audience targeting | 7 | Enterprises and developers; industries nav |
| Proof and trust | 8 | HSBC, ASML, AXA, Orange, IBM; case story carousel |
| Narrative structure | 7 | Hero, logos, stories, products, services, deploy anywhere, CTA |
| Calls to action | 7 | 'Get in touch' is the only path; developers must dig |
| Differentiation | 8 | Sovereign, open-weight, self-hosted against US labs |

### 14. Anthropic (73.3)

https://www.anthropic.com · Design leader · Visual 83.3 · Marketing 63.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 9 | Anthropic Sans with serif body; editorial, underlined keywords |
| Layout and spacing | 9 | Two-column hero, wide margins, newspaper rhythm |
| Color and theming | 9 | Warm off-white and ink; nothing else |
| Motion and interaction | 6 | Essentially static |
| Imagery and product visuals | 8 | Photography (starlings, orbit); no product UI on the home page |
| Polish and craft | 9 | Fastest load in the set; everything crafted |
| Headline and value proposition | 7 | 'AI research and products that put safety at the frontier' says who, not what to buy |
| Audience targeting | 6 | Public, researchers and enterprise at once |
| Proof and trust | 5 | No logos or metrics on the home page |
| Narrative structure | 6 | Hero, latest release, three announcements, mission links; a news feed |
| Calls to action | 6 | 'Try Claude' only; no enterprise path above the fold |
| Differentiation | 8 | Safety positioning is unmistakable |

### 15. Holistic AI (72.5)

https://www.holisticai.com · Competitor (governance) · Visual 70.0 · Marketing 75.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | Geist; competent, undistinguished |
| Layout and spacing | 7 | Two-column hero, consistent cards |
| Color and theming | 7 | Indigo on white (close to Thursdai's own palette) |
| Motion and interaction | 7 | Isometric platform animates, with a visible Pause motion control |
| Imagery and product visuals | 7 | Isometric illustration plus dashboard mockups |
| Polish and craft | 7 | Cookie banner; everything renders |
| Headline and value proposition | 7 | 'Govern AI across your enterprise.' + sub names models, agents, applications |
| Audience targeting | 8 | Enterprise governance buyer; regulation nav |
| Proof and trust | 9 | Gartner MQ Challenger, Unilever quotes, Siemens/GSK/Starling logos, €35M fine stat |
| Narrative structure | 8 | Hero, logos, Gartner, challenge, platform, agents, analysts, customers, news, CTA |
| Calls to action | 7 | Book a demo + Explore the platform |
| Differentiation | 6 | Reads interchangeably with Credo |

### 16. Fiddler (71.7)

https://www.fiddler.ai · Competitor (observability/governance) · Visual 63.3 · Marketing 80.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | Inter; clean but default |
| Layout and spacing | 7 | Two-column hero, tidy card grids |
| Color and theming | 6 | Sky-blue gradient sits behind everything |
| Motion and interaction | 6 | Little motion |
| Imagery and product visuals | 5 | AI-generated astronaut-in-a-field art; reads as stock |
| Polish and craft | 7 | Cookie banner; otherwise functional |
| Headline and value proposition | 8 | 'The Control Plane for Enterprise AI Agents' + crisp sub |
| Audience targeting | 8 | Search-box prompt 'Which teams ship unsafe agents?' speaks to the buyer's question |
| Proof and trust | 9 | Thumbtack, UWM, Boston Scientific, DOE, Global Payments; Nielsen CEO quote; 99% / <80ms / Zero; Gartner, Forrester |
| Narrative structure | 8 | Hero, logos, builders and guardians, quote, numbers, analyst, partners, CTA, FAQ |
| Calls to action | 8 | Request demo + 'See your evals' TCO' calculator |
| Differentiation | 7 | 'Control plane' and 'Trust Tax' are ownable terms |

### 17. Galileo (70.8)

https://galileo.ai · Competitor (observability/evals) · Visual 66.7 · Marketing 75.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | Geist; fine |
| Layout and spacing | 7 | Standard centered sections |
| Color and theming | 7 | Navy and coral; the coral word in the headline is the only flair |
| Motion and interaction | 6 | Minimal |
| Imagery and product visuals | 6 | Icon cards and schematic diagrams; generic |
| Polish and craft | 7 | Cisco acquisition banner; works |
| Headline and value proposition | 8 | 'Don't just monitor AI failures. Stop them.' punchy contrast |
| Audience targeting | 7 | AI engineers; enterprise via demo |
| Proof and trust | 7 | NTT, Comcast, ServiceTitan, HP; developer quotes |
| Narrative structure | 7 | Hero, pillars, logos, problem, lifecycle, deploy, quotes, CTA |
| Calls to action | 8 | Get Started for Free + Book a Demo |
| Differentiation | 8 | Evals-become-guardrails is a real stance against monitoring tools |

### 18. Credo AI (68.3)

https://www.credo.ai · Competitor (governance) · Visual 63.3 · Marketing 73.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | Instrument Sans; adequate |
| Layout and spacing | 6 | Hero paragraph is 60 words; 7 nav items plus announcement bar |
| Color and theming | 7 | Black hero with purple accent; rest is white |
| Motion and interaction | 6 | Live diagram pulses; little else |
| Imagery and product visuals | 6 | Diagram illustration, stock-feel portrait carousel |
| Polish and craft | 6 | Cookie modal, announcement ticker, long page |
| Headline and value proposition | 7 | 'AI Governance, Built for the Agentic Era' names the category |
| Audience targeting | 7 | Enterprise risk and compliance leaders |
| Proof and trust | 8 | Autodesk, Amazon, Mastercard, Databricks; 60%/4% stat; Version1 and IBM quotes; Forrester |
| Narrative structure | 8 | Challenge, standard, platform, why, recognition, CTA |
| Calls to action | 7 | Explore Platform + Talk to a Governance Expert |
| Differentiation | 7 | 'Created the AI governance category', 'only pure-play platform' |

### 19. Runway (68.3)

https://runway.com · Design leader · Visual 75.0 · Marketing 61.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | abcNormal at a modest 40px; hero copy is three sentences |
| Layout and spacing | 7 | Full-bleed video then grid; fine |
| Color and theming | 7 | Black video hero, white body |
| Motion and interaction | 8 | Cinematic hero video |
| Imagery and product visuals | 9 | Real generated video and film stills |
| Polish and craft | 7 | Functional; lots of nav depth |
| Headline and value proposition | 5 | 'Building Real-World Intelligence' is abstract |
| Audience targeting | 6 | Creative, Dev, Robotics: three audiences in one hero |
| Proof and trust | 7 | D&G, Wieden Kennedy, NVIDIA, Adobe, Allstate |
| Narrative structure | 6 | Hero, logos, three platforms, research, news |
| Calls to action | 7 | Try Runway for free; Enterprise Sales in nav |
| Differentiation | 6 | 'Real-world intelligence' is a lab claim, not a buyer wedge |

### 20. Sierra (68.3)

https://sierra.ai · Wildcard (vertical AI) · Visual 78.3 · Marketing 58.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | gtAmerica; clean |
| Layout and spacing | 8 | Full-bleed photo hero, centered sections |
| Color and theming | 8 | Photography carries color; UI is neutral |
| Motion and interaction | 8 | Video hero with chat overlay |
| Imagery and product visuals | 8 | Lifestyle photography with chat bubbles; consistent |
| Polish and craft | 7 | Cookie banner; long logo wall renders |
| Headline and value proposition | 4 | 'Better outcomes. Built on Sierra.' a stranger cannot say what it does |
| Audience targeting | 6 | CX leaders, implied by the logos rather than the copy |
| Proof and trust | 8 | Uber, SiriusXM, ADT, Sonos, Ramp wall; four quotes |
| Narrative structure | 7 | Hero, logos, experiences, agent builder, insights, trust, CTA |
| Calls to action | 5 | A single 'Learn more' button in the hero is the weakest CTA in the set |
| Differentiation | 5 | Nothing in the copy says why Sierra over the alternative |

### 21. Lakera (65.8)

https://www.lakera.ai · Competitor (AI security) · Visual 63.3 · Marketing 68.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 7 | Abcfavorit, large; fine |
| Layout and spacing | 7 | Centered; standard |
| Color and theming | 7 | Black with blue glow |
| Motion and interaction | 6 | Stat ticker |
| Imagery and product visuals | 5 | Generic glow and node diagrams |
| Polish and craft | 6 | Announcement bar; works |
| Headline and value proposition | 6 | 'The leading security platform to secure your AI future': 'leading' is filler |
| Audience targeting | 7 | Enterprise security teams |
| Proof and trust | 8 | Dropbox, AWS, Asana, Pearson; Gartner, OWASP, Snyk; Check Point parent |
| Narrative structure | 7 | Hero, stats, logos, products, engine, security, standards, recognition, CTA |
| Calls to action | 8 | Get Started + Talk to Sales |
| Differentiation | 5 | Interchangeable with any AI-security vendor |

### 22. Drata (61.7)

https://drata.com · Competitor (trust/compliance) · Visual 56.7 · Marketing 66.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 6 | Geist; hero fine, rest cramped |
| Layout and spacing | 5 | Nav rendered as an unstyled list on first paint in two separate captures; dense sections |
| Color and theming | 6 | Dark navy with a gradient CTA; muddy |
| Motion and interaction | 6 | Starfield background; little purposeful motion |
| Imagery and product visuals | 7 | Real product screenshots |
| Polish and craft | 4 | Persistent cookie modal blocks content on every scroll; unstyled nav and footer flashes; giant black diagonal blocks |
| Headline and value proposition | 5 | 'Explore the World of Agentic Trust' is a metaphor, not a value prop |
| Audience targeting | 7 | Security and GRC teams by stage |
| Proof and trust | 9 | 8,500+ customers, GitLab/Tenable/Brex/OpenAI, G2 4.8, 7,980 hours / $20M stats, Okta quotes |
| Narrative structure | 7 | Mission/orbit/flight theme forced across sections |
| Calls to action | 7 | Email + Get Started |
| Differentiation | 5 | Sounds like Vanta with a space theme |

### 23. Searchable (60.0)

https://www.searchable.com · Wildcard (design list pick) · Visual 55.0 · Marketing 65.0

| Dimension | Score | Why |
|---|---|---|
| Typography | 6 | Inter; fine |
| Layout and spacing | 6 | Centered; standard |
| Color and theming | 6 | Orange accent on white |
| Motion and interaction | 5 | Little |
| Imagery and product visuals | 7 | Real product UI |
| Polish and craft | 3 | Client-side exception on first desktop load; a 'Free PDF' modal hijacks every scroll; cookie banner stacked under it |
| Headline and value proposition | 7 | 'Visibility & Analytics from AI Search, and the actions to drive growth' |
| Audience targeting | 7 | Marketing and SEO teams |
| Proof and trust | 6 | Lottie, Bolt, Revlon logos |
| Narrative structure | 6 | Hero, product, logos, picture, features |
| Calls to action | 7 | Get a demo + Start for free |
| Differentiation | 6 | AEO framing is timely but not contrastive |

### 24. Patronus AI (57.5)

https://www.patronus.ai · Competitor (evals, pivoted) · Visual 71.7 · Marketing 43.3

| Dimension | Score | Why |
|---|---|---|
| Typography | 8 | Hostgrotesk at 96px; strong |
| Layout and spacing | 7 | Vast empty black stretches mid-page |
| Color and theming | 7 | Black with violet accent |
| Motion and interaction | 8 | Line-art ribbons animate well |
| Imagery and product visuals | 7 | Abstract line art and isometrics; no product |
| Polish and craft | 6 | Emoji in the announcement bar; empty regions |
| Headline and value proposition | 3 | 'Simulating the World's Intelligence' tells a buyer nothing |
| Audience targeting | 4 | Unclear whether this is a product company or a lab |
| Proof and trust | 4 | No logos; one Tim Sweeney quote; research stats |
| Narrative structure | 5 | Hero, research, world model, domains, capabilities, papers, quote |
| Calls to action | 4 | Hero button is 'Research'; Contact us buried in nav |
| Differentiation | 6 | Digital World Models is distinctive, but not a buyable proposition |

### 25. Thursdai (56.7)

https://getthursdai.com · Subject · Visual 56.7 · Marketing 56.7

| Dimension | Score | Why |
|---|---|---|
| Typography | 6 | Geist bold H1, italic Instrument Serif H2s, tracked uppercase labels, mono receipt: four typographic voices; the two-tone gradient words in the H1 read as 2021 SaaS |
| Layout and spacing | 6 | Hero is fine; below it twelve sections repeat label / heading / three cards; moderate whitespace |
| Color and theming | 6 | Indigo, dawn gradient, amber, navy, cream: more palette than the content needs; indigo-on-white is also Holistic AI's palette |
| Motion and interaction | 6 | Time-Travel slider and policy tabs are the only interactions; no hover craft; 'Try the replay demo' is a scroll anchor, not a demo |
| Imagery and product visuals | 5 | The AI Receipt card is a strong concrete artifact; everything else is HTML mockups labelled illustrative, no real product screenshots, no photography, generic icons |
| Polish and craft | 5 | Six pages in nav/sitemap are empty (Careers, Press, API Reference, Documentation, Research, Certifications); og:url, sitemap and robots point to thursdai.com, which resolves to a GoDaddy for-sale page; title tag says 'Governed Agent Substrate' while the hero says 'on the record'; load is among the fastest; mobile is clean |
| Headline and value proposition | 7 | 'Every AI decision, on the record.' plus a sub that names the artifact; a stranger gets it, though the hero stacks headline, sub, two CTAs and three checkmarks |
| Audience targeting | 7 | Compliance teams in six regulated industries, developers, HR/People; the buyer persona wavers between compliance, CISO, HR and engineering |
| Proof and trust | 2 | No logos, no customers ('Our first design partners' says none yet), every certification 'Planned', every number 'Illustrative' |
| Narrative structure | 6 | Thirteen beats; the problem statement ('Most AI tools weren't built for accountability') arrives at section eight |
| Calls to action | 5 | 'Try the replay demo' scrolls to a slider; 'Get a tenant pilot' opens a form; no self-serve, sandbox or docs (docs page is empty) |
| Differentiation | 7 | AI Receipt as a named artifact, 'not bolted on after', compare pages against Copilot/ChatGPT/Glean; distinct from Credo/Holistic's inventory framing |

---

## 5. Pattern analysis across the top 10

Top 10: Linear, Antimetal, Granola, Harvey, Vanta, Vercel, Cohere, Attio, Cursor, Perplexity Enterprise.

### 5.1 Recurring visual patterns

| Pattern | Who | What it looks like |
|---|---|---|
| **One typeface family at display scale, often a serif** | Antimetal (Signifier), Harvey (custom serif), Granola (Quadrant), Vanta (SC Ripley), Cohere (CohereText at 96px), Linear/Vercel (Inter/Geist pushed to 64px+) | Hero headlines at 64 to 96px. Six of ten use a serif for display (Antimetal, Harvey, Granola, Vanta, Perplexity; Cohere's CohereText has serif-like terminals and is counted as the sixth). None use gradient text. None mix more than two families on a page. |
| **Hero is either centered single-column or a hard two-column with the product filling the right half** | Centered: Vanta, Attio, Cohere, Perplexity. Two-column: Linear, Harvey, Granola, Cursor | Nobody stacks headline + sub + two CTAs + a checklist. The hero is headline, one line, one or two buttons, product. |
| **Nav caps at 5 or 6 items plus one filled CTA** | All ten; Antimetal has 3 | The CTA is a pill or a sharp rectangle in the brand's darkest color. Log in is a ghost button next to it. |
| **A single owned visual idea runs the whole page** | Linear: black with glowing UI. Antimetal: blueprint on stone. Cursor: UI windows over classical paintings. Granola: product-on-photography collage. Harvey: dashboards on painted canvases. Vanta: lavender and a llama. Mistral (13th): pixel mosaic | The idea is set in the hero and recurs in every section. It is what you remember. |
| **Real product UI in every feature section, not diagrams** | 9 of 10 (Antimetal mixes product with generative viz) | Dark-mode or light-mode screenshots, framed in a window chrome, cropped so one feature fills the frame. Icon-plus-paragraph cards appear only in the bottom half of the board. |
| **Backgrounds alternate at most twice** | Linear (all dark), Antimetal (stone, one dark panel), Attio (white, dark close), Cohere (white, dark close) | One base surface, one contrast surface for the closing CTA. Not light/dark/cream/dark/light. |
| **Section vertical padding at 120px or more; section count 4 to 10, most at 7 or 8** | All ten | Linear 7 beats, Vercel 4 (the sparsest), Granola 8, Vanta 10 (the densest). |
| **Logos sit directly under the hero, full-width, grayscale, no heading** | 7 of 10 (Antimetal, Cursor and Granola put them after one scroll) | Six to ten logos, one row, never a carousel. |

### 5.2 Recurring messaging patterns

| Pattern | Examples |
|---|---|
| **Headline formula A: "The [category] for [who]"** | Linear "The product development system for teams and agents". Granola "The AI notepad for back-to-back meetings". Arize (12th) "The agent observability and evaluation platform." Fiddler (16th) "The Control Plane for Enterprise AI Agents". This formula scores highest on Headline across the whole set. |
| **Headline formula B: two short sentences, claim then stance** | Cohere "Your AI. Your rules." Galileo "Don't just monitor AI failures. Stop them." Granola's sub "Without a meeting bot." Thursdai's "Every AI decision, on the record." belongs to this family and works. |
| **The problem is stated in the second or third beat, in one sentence, with a number** | Credo "60% of enterprises are scaling AI. Only 4% are governing it." Holistic "€35M or 7% of turnover." Antimetal's full paragraph essay on why production engineering is breaking. The top sites earn the right to show features by naming the pain first. |
| **Proof is layered three ways, each at a different scroll depth** | Logo wall (under hero) → one big number or three stats (mid-page: Harvey 3,000+ orgs, Vanta 16,000+ customers, Perplexity 50,000+) → named quote with face and title (late page). Certs are a quiet badge strip near the footer, never the headline of a section. |
| **Two CTAs, and they are different speeds** | Start for free / Talk to sales (Attio). Download / Request a demo (Cursor). Get started / Request a demo (Perplexity). The fast path is real: a download, a sandbox, a free tier. "Try the demo" that scrolls to a slider is not a fast path. |
| **The closing CTA repeats the headline, nothing new** | Vanta repeats "The new standard for trust". Linear "Built for the future. Available today." One line, one button, a contrasting surface. |

### 5.3 What the top 3 do that nobody else does

**Linear** turns restraint into the brand. There is no accent color in the hero at all; the only color on the page is two quote cards. It also writes the manifesto line ("A new species of product tool") *after* the logo wall, so the claim arrives with proof already on screen. Everyone else makes the claim first and proves it later.

**Antimetal** writes an essay instead of a landing page. The second beat is a 120-word paragraph in a serif with a drop cap, explaining why production engineering is broken. No cards, no icons. Then it labels its own sections "The vision", "The world model", "The autonomous layer" as if it were a whitepaper. For a governance product selling to compliance and risk officers, this is the closest model in the set: the buyer reads documents for a living, and Antimetal proves a site can look like a serious document and still be beautiful.

**Granola** closes the headline with the differentiator as a sentence fragment ("Without a meeting bot.") and then builds the entire page around before/during/after a meeting. The structure is the use case, not the feature list. It is the only site in the set where you can recite the product's wedge after one viewport.

### 5.4 Anti-patterns in the bottom 10

Bottom 10: Holistic AI, Fiddler, Galileo, Credo AI, Runway, Sierra, Lakera, Drata, Searchable, Patronus AI (Thursdai is 25th and shares several).

1. **The headline is a metaphor or a mood.** "Explore the World of Agentic Trust" (Drata), "Simulating the World's Intelligence" (Patronus), "Better outcomes. Built on Sierra." (Sierra), "Building Real-World Intelligence" (Runway). Sierra has one of the best logo walls in the set and still scores 68 because nobody can say what it does.
2. **Three-card grids with an icon and a paragraph as the main feature format.** Galileo, Lakera, Holistic, Credo, Fiddler and Thursdai all do this. It is the visual signature of "we used a template".
3. **Interstitials that outlive the first scroll.** Drata's cookie modal and Searchable's "Free PDF" modal re-cover the content on every viewport. Both sites lose three Polish points to it.
4. **Generic or AI-generated hero art.** Fiddler's astronaut in a meadow, Lakera's blue glow, Patronus's abstract ribbons. The top 10 show product or a photograph with a point of view; nobody shows a metaphor.
5. **Space, flight and frontier metaphors.** Drata's "mission control / orbit / flight", Harvey's and Patronus's "frontier", Runway's "real-world intelligence". It reads as a category tic now.
6. **"Leading" and "trusted" as the first adjective.** Lakera "The leading security platform", Holistic "The leading AI governance platform" in the title tag, Credo "The Trusted Leader". The top 10 never say leading; they show logos.
7. **Palette drift.** Arize (magenta + lavender + peach), Thursdai (indigo + dawn gradient + amber + navy + cream). Two colors is the ceiling in the top 10.
8. **Fast path that isn't.** Patronus's hero button is "Research". Sierra's is "Learn more". Thursdai's is a scroll anchor labeled "demo".
9. **Empty or placeholder destinations linked from the primary nav.** Harvey's lazy-video gray blocks, Thursdai's six empty pages.
10. **Title tag, hero and og copy that disagree.** Holistic's title tag says "The Leading AI Governance Platform", its DOM H1 says "AI Governance that Accelerates Transformation" and its visible hero says "Govern AI across your enterprise". Thursdai's title says "Governed Agent Substrate", its hero says "on the record".

---

## 6. Thursdai on the same rubric

**Rank 25 of 25. Total 56.7. Visual 56.7. Marketing 56.7.**

Pages reviewed: all 41 in the sitemap (home, product hub + 7 pillars, solutions + people, developers + 5 sub-pages, trust + 6 sub-pages, security, customers, 3 compare pages, company + 3 sub-pages, resources: blog, research, role-bench, 5 posts). Plus interactive states: Product mega-menu, Get a Demo modal, "Try the replay demo", theme toggle, 404.

### 6.1 Scorecard vs the top-10 median

| Dimension | Thursdai | Top-10 median | Gap |
|---|---|---|---|
| Typography | 6 | 9.0 | **-3.0** |
| Layout and spacing | 6 | 8.0 | **-2.0** |
| Color and theming | 6 | 8.0 | **-2.0** |
| Motion and interaction | 6 | 7.0 | **-1.0** |
| Imagery and product visuals | 5 | 9.0 | **-4.0** |
| Polish and craft | 5 | 7.0 | **-2.0** |
| Headline and value proposition | 7 | 7.5 | **-0.5** |
| Audience targeting | 7 | 8.0 | **-1.0** |
| Proof and trust | 2 | 8.0 | **-6.0** |
| Narrative structure | 6 | 8.0 | **-2.0** |
| Calls to action | 5 | 8.0 | **-3.0** |
| Differentiation | 7 | 7.0 | 0.0 |


Eleven of twelve dimensions are below the top-10 median. Differentiation is at it. The scorecard below goes through each gap in order of weight (score gap × what it costs on the leaderboard), with the exact element, the benchmark that handles it best and a change specific enough to hand off.

### 6.2 Proof and trust: 2 vs 8 (gap 6)

**What is weak.** The home page has no logos, no customer names, no metric. The industry band says "Trusted by compliance teams in Financial Services, Healthcare…" with no company behind it. `/customers` says "Our first design partners. Real case studies will live here as those deployments mature." `/trust/certifications` is empty. The cert strip shows SOC 2 Type II, ISO 27001, ISO 42001 and FedRAMP all tagged "Planned". The executive dashboard carries an "Illustrative data" banner. `/company/team` is one person with initials in a circle instead of a photo. This is all truthful, and it was a deliberate constraint in the June repositioning plan (no fabricated metrics or customers). The result on this rubric is that the page reads as pre-product.

**Who does it best.** Harvey (10): layers 3,000+ organizations, a 16-logo wall, four big numbers and a named Reed Smith quote at three different depths. Vanta (10): "Proof? We've got proof." as a section title with four video case studies. For a company with no customers, the closest model is **Antimetal (7)**: a single video quote from a Google VP of Engineering, a SOC 2 badge and a "From the research log" section that substitutes credibility for customers.

**Recommended change.** Stop presenting absence. Replace the three forms of apology (the "Planned" tags, the "Illustrative" banners, the empty Customers page) with proof you actually have, in this order:
1. **Replace the industry band with a design-partner band.** Even "Design partners in financial services, healthcare and HR, Q4 2026" with three initials-only anonymized tiles (industry, headcount, use case) beats a list of six industries nobody is attached to. Credo's "60% / 4%" stat band is the pattern: one number, one source, one line.
2. **Put the artifact where the logos would go.** The AI Receipt is the proof. Under the hero, replace the industry strip with a full-width, real, verifiable receipt: a signature hash that resolves at `api.thursdai.com/v1/receipts/verify`, a "verify this receipt" link and a timestamp. Perplexity and Vanta put product under the hero; Thursdai's product *is* a proof object, so it belongs there.
3. **Named advisor or design-partner quote with a face**, even one. Antimetal's single Google quote is worth more than a six-logo wall of unknowns.
4. **Certifications page: either delete it from nav until there is one, or turn it into a roadmap with dates.** "SOC 2 Type II: audit window opens January 2027, auditor engaged" is proof of intent. "Planned" is not.
5. **Team page: a photograph.** One person with a real photo and a LinkedIn link is the smallest credible unit for an enterprise buyer.
6. **The founder story on `/company` is a strength**; move the "I'm building in public" paragraph and the email up to the hero of that page and add the design-partner CTA there.

### 6.3 Imagery and product visuals: 5 vs 9 (gap 4)

**What is weak.** There is no screenshot of the actual Thursdai product anywhere on 41 pages. Every visual is an HTML mockup (receipt card, dashboard tiles, time-travel panel, policy tabs, agent chat), all labelled illustrative. Blog posts have no images at all. Product pillar pages use the same icon-in-a-circle cards as the home page. There is no photography.

**Who does it best.** Linear (10) and Attio (9): a cropped, window-framed real product screenshot in every single feature section. Cursor (9) and Harvey (9): the same screenshots composited on a painting or canvas so the page has one visual idea. Antimetal (9): when there is no screenshot, a generative diagram in the same hand as the rest of the page.

**Recommended change.**
1. **Ship real product screenshots** from the tenant app for the three pillars that exist: a receipt in the app's receipt viewer, the time-travel replay, a compliance pack export. Window chrome, 2x export, cropped so one feature fills the frame at 1200px wide. If the app UI is not ready to show, say so with a date on the product page rather than substituting HTML mockups that look like product.
2. **Make the receipt the only mockup, and make it the signature.** The receipt card is already the best visual on the site. Give it a consistent frame (paper-white card, mono text, one signature line) and reuse that exact frame on `/product/ai-receipts`, `/solutions/people`, the compare pages and the og:image. Delete the executive-dashboard mockup from the home page; it needs context the visitor does not have.
3. **One illustration style for everything that is not a screenshot.** Antimetal's blueprint linework is the model: thin-line, one color, labelled, looks like a technical drawing. Use it for the three-step "how it works" and the two-tier knowledge diagram. Remove the icon-in-a-circle cards.
4. **Blog posts need a header image** (the receipt frame with the post's subject, or a blueprint diagram). Five posts with a 300px block of headline and no image reads as a draft.

### 6.4 Typography: 6 vs 9 (gap 3)

**What is weak.** Four voices on one page: Geist Bold 56px H1 with two words in gradient fill ("on the record" in indigo-to-amber), italic Instrument Serif section headings rendered at 32px ("Three steps. One trusted answer."), tracked uppercase 12px labels ("AI RECEIPTS", "HOW IT WORKS", "✓ A RECEIPT FOR EVERY DECISION") and Geist Mono in the receipt. Measured: H1 56px, section H2 32px, hero sub-copy 20px, card titles 18px (also marked up as H2). A 32px H2 is 1.6x the sub-copy and under 2x the card titles, so the scale flattens; the top 10 run H1 64 to 96px and H2 at 40 to 48px. The gradient-filled words date the hero (none of the top 10 use gradient text; the June REC-06 recommended gradient text for the closing headline, which this pass reverses). The June REC-12 said "no changes needed" to typography; against this tighter set, it is three points below the median.

**Who does it best.** Antimetal (10): Signifier serif for every heading at every level, mono for every label, nothing else. Harvey (9): a custom serif at 72px for the H1 and plain sans for everything below. Cohere (9): one sans at 96px with two short sentences.

**Recommended change.** Pick one of two directions and commit:
- **Serif-led (recommended, fits "on the record" and the wordmark).** Instrument Serif Regular (not italic, not faux-bold: the June commit log notes the 56px faux-bold problem, which is why the H1 went back to Geist) for every heading: H1 at 72 to 80px, H2 at 44 to 48px, H3 at 28px. Geist for body at 17/1.6. Geist Mono for labels, receipt and code. Drop the gradient fill; set "on the record" in the brand indigo as solid color or leave the whole line ink. Drop the tracked-uppercase labels in favour of mono small caps in a muted ink (Antimetal's "THE VISION" treatment).
- **Sans-led.** Geist everywhere, H1 at 72px tight (-0.03em), H2 at 40px, labels in Geist Mono. Keep the serif only in the wordmark.
Either way: H2 must be larger than hero sub-copy, and there should be exactly three sizes above body.

### 6.5 Calls to action: 5 vs 8 (gap 3)

**What is weak.** "Try the replay demo" (primary, filled) is a `<button>` that scrolls to the Time-Travel section on the same page. A visitor who clicks expecting a demo gets a slider with illustrative text. "Get a tenant pilot" (secondary) opens a form, which is fine. The nav "Get a Demo" opens the same form. There is no self-serve path: `/developers/docs` and `/developers/api` are empty, there is no sandbox and no sign-in. The closing CTA repeats "Try the replay demo (no login required)", doubling down on the misnomer.

**Who does it best.** Arize (9): four entry points at four speeds (Sign up, Book a demo, Start in the product, Start in your terminal). Attio (9): Start for free + Talk to sales, and on mobile a single email field. Cursor and Granola: the fast path is a real download.

**Recommended change.**
1. **Rename the primary CTA to what it is** until there is a demo: "See a replay" with an in-page scroll, or better, make it an actual thing: a `/demo` page with the receipt viewer and time-travel on real sample data, no login, that the button links to. Nav "Get a Demo" and hero "Get a tenant pilot" then become the same request-demo modal, and the hero primary becomes "Open the demo", secondary "Request a pilot".
2. **Add a developer fast path.** A `curl` to `api.thursdai.com/v1/receipts/verify` against a public sample receipt, shown in the hero of `/developers` with a "Verify a receipt" button that runs it in-page. Nothing in the governance set has this and it is the cheapest "the product is real" signal available.
3. **One primary per page.** Compare pages end in "Try the replay demo"; they should end in "Request a pilot" because the reader has just been told why Copilot is not enough.

### 6.6 Narrative structure: 6 vs 8 (gap 2)

**What is weak.** The home page has 13 beats: hero → industries → AI Receipts → three steps → decision intelligence → People → Agent → "Most AI tools weren't built for accountability" (comparisons) → Time-Travel → Policy-as-Code → certs → API → CTA. The problem statement is the eighth beat. Receipts are explained twice (beat 3 and beat 12). The June plan's seven-section target (REC-04) has not been reached.

**Who does it best.** Granola (8): hero → how it works → logos → before/during/after → features → CTA, built around the use case. Credo (8) despite its visual score: the second beat is "AI is scaling faster than you can govern it. 60% / 4%." Antimetal (9): problem essay as beat two.

**Recommended change.** Seven beats, in this order:
1. Hero (headline, one line, two CTAs, the receipt).
2. **Problem, one paragraph, one number.** "Under EU AI Act Annex III, every automated hiring, credit or insurance decision must be logged and retained for six months. Most AI tools keep a chat history." Pull the Annex III post into this.
3. Design-partner / proof band (6.2).
4. The receipt, explained once: what is captured, signed and verifiable. Real screenshot.
5. Replay and audit packs (time-travel slider stays here; it is the one real interaction).
6. Policy-as-code with the code snippet (merge the current Policy and API sections; REC-10 from June).
7. Closing CTA on the dark surface, repeating the headline.
Move comparisons, People, Agent and certs to their own pages (all already exist). Delete "decision intelligence" from the home page or fold its three example questions into beat 5.

### 6.7 Layout and spacing: 6 vs 8 (gap 2)

**What is weak.** Below the hero, every section is the same unit: 11px label, heading, one paragraph, a row of three equal cards. Measured section padding is inconsistent: 24, 64, 80, 96 and 120px across the 13 sections, with the two 120px sections sitting next to 64px ones. Backgrounds alternate white / navy / cream / white / navy, so the page reads as a stack of bands rather than one surface with moments.

**Who does it best.** Linear (9) and Vercel (9): one surface, 120 to 160px between beats and a different layout for each beat (two-column, full-bleed product, three-up, quote pair). Antimetal (9): asymmetric, one idea per viewport.

**Recommended change.** Base surface white (or stone if going serif-led), one dark surface used once at the close. Section padding 128px desktop / 80px mobile. Vary the layout per beat: beat 2 is a single centered paragraph at 60% width; beat 4 is two-column with the screenshot right; beat 5 is full-bleed product; beat 6 is code left, prose right. No beat uses three equal cards.

### 6.8 Color and theming: 6 vs 8 (gap 2)

**What is weak.** Indigo primary, an indigo-to-amber "dawn" gradient as hero background and as text fill, navy dark sections, a cream band, amber accents in the receipt, a green "Signed" badge. Five surfaces and three accents. The indigo-on-white base is also Holistic AI's palette, which is the competitor Thursdai most resembles visually. The dark-mode toggle exists but is a feature the top 10 mostly do not offer on marketing pages (Linear is dark only, Antimetal and Harvey are light only).

**Who does it best.** Vanta (8): one lavender, one purple, everything else neutral; the lavender is now owned. Mistral (9): one orange-red mosaic. Linear (9): black plus one accent moment.

**Recommended change.** One base, one ink, one accent. If the serif-led direction is taken: base `#F6F4EF` stone, ink `#111`, accent the existing indigo for buttons and links only, with the amber reserved for the signature line on receipts so it means "signed" and nothing else. Remove the hero background gradient and the closing gradient text (the June REC-06 kept the gradient on the hero background and moved it to text in the closing section; this pass removes both: none of the top 10 use a gradient background or gradient text). Remove the theme toggle from the marketing nav and keep it for the app.

### 6.9 Polish and craft: 5 vs 7 (gap 2)

**What is weak.** Specific and checkable:
- `/company/careers`, `/company/press`, `/developers/api`, `/developers/docs`, `/resources/research`, `/trust/certifications` are each a heading, one sentence and the footer (905px tall). All six are linked from the nav or footer and listed in the sitemap.
- `og:url` is `https://thursdai.com`, `robots.txt` lists `Sitemap: https://thursdai.com/sitemap.xml`, and every `<loc>` in the sitemap is on `thursdai.com`. That domain is a GoDaddy "for sale" lander. Shared links will preview the wrong domain and crawlers are being sent to the wrong host.
- `<title>` is "Thursdai: The Governed Agent Substrate for Regulated Enterprises" and the meta description leads with "governed AI agent substrate with role-based moderation". The hero and the June repositioning say receipts. The product hub H1 is still "The governed agent substrate."
- The theme toggle button has no accessible label that distinguishes it from the Product menu button (a generic `header button:has(svg)` selector hit the menu first).
- Wins to keep: fastest tier of load in the set, no horizontal overflow on any of 41 mobile captures, working 404, working mega-menu and modal, consistent footer.

**Who does it best.** Vercel and Linear (9): nothing linked is empty; skip links; every state crafted.

**Recommended change.** This week, before any design work:
1. Change `metadataBase`/`og:url`, `robots.ts` and `sitemap.ts` to `https://getthursdai.com` (or buy `thursdai.com` if that was ever the plan; it is listed for sale).
2. Remove the six empty pages from nav, footer and sitemap, and return 404 or redirect them to the nearest real page (`/developers/api` → `/developers`, `/trust/certifications` → `/trust`, `/resources/research` → `/resources/blog`).
3. Align `<title>` and description with the hero: "Thursdai: a signed record for every AI decision" / "Thursdai writes a signed AI Receipt for every decision your AI makes and bundles them into audit-ready packs for the EU AI Act, NYC LL144 and ISO 42001."
4. `aria-label="Toggle theme"` on the toggle, or remove it per 6.8.

### 6.10 Motion and interaction: 6 vs 7 (gap 1)

**What is weak.** The time-travel slider and the policy tabs are the only interactions, and both are good. There are no hover states on cards, no transition on the mega-menu, no entrance on product visuals. The hero visual is static.

**Who does it best.** Antimetal (9): scroll-driven blueprint reveals. Linear (9): product UI fades up as it enters the viewport, 200ms, once. ElevenLabs (8): the hero itself is playable.

**Recommended change.** Two additions, nothing more: (a) the receipt in the hero "signs" on load, meaning the signature line types in over 600ms and the Signed badge appears, which turns the artifact into a moment; (b) product screenshots fade and rise 12px on first entry. Keep the slider. Add `prefers-reduced-motion` guards (Holistic AI's visible "Pause motion" button is a nice touch for an audience that includes accessibility reviewers).

### 6.11 Audience targeting: 7 vs 8 (gap 1)

**What is weak.** The hero speaks to "teams where AI decisions have real consequences", the industry band lists six verticals, the People solution speaks to HR, the developers page to engineers, the compare pages to IT buyers evaluating Copilot. Each is fine alone; together the home page does not say who signs the contract.

**Who does it best.** Harvey (9): "For Law Firms" and "For In-House" as two cards with separate CTAs in beat three. Vanta (8): Startups / Mid-market / Enterprise named with one line each.

**Recommended change.** Name the buyer in the hero sub-line ("for compliance, risk and HR leaders in regulated industries") and add a two-card beat on `/solutions`: "For compliance and risk" and "For HR and People", each with its own page and CTA. The developer path stays in the nav and does not appear on the home page except as the code beat.

### 6.12 Headline and value proposition: 7 vs 7.5 (gap 0.5)

**What is weak.** The headline is good. The hero is heavy: headline, 40-word sub, two buttons, three checkmark lines. The June REC-03 asked for one layer to go and the uppercase pre-headline did go; the checkmarks remain.

**Who does it best.** Granola (9): headline + fragment + one button + one availability line.

**Recommended change.** Keep "Every AI decision, on the record." Cut the sub to one sentence: "Thursdai writes a signed AI Receipt for every decision your AI makes, so your auditors see the answer, the policy and the sources." Delete the three checkmarks; "EU AI Act ready" moves to the proof band with the Annex III number.

### 6.13 Differentiation: 7 vs 7 (at median)

Not a gap. The AI Receipt as a named artifact, "not bolted on after" and three compare pages that are specific and fair ("Where Glean is strong" before "Where Thursdai differs") are better than anything in the governance group except Fiddler's "control plane". Two notes: the June naming decision ("Decision Receipts" vs "AI Receipts") is still unresolved on the live site, which uses "AI Receipt"; and the comparisons belong on their pages, not the home page, where they currently add a beat.

---

## 7. Prioritized change list

| # | Change | Dimension(s) | Effort | Expected lift |
|---|---|---|---|---|
| 1 | Fix og:url, robots and sitemap to getthursdai.com; align title and description with the hero | Polish | Hours | Polish 5→6 |
| 2 | Remove or redirect the six empty pages | Polish, CTA | Hours | Polish 6→7 |
| 3 | Rename "Try the replay demo" or build `/demo`; add the curl verify path on /developers | CTA | 1 to 3 days | CTA 5→7 |
| 4 | Replace industry band with a proof band (design-partner stat, one named quote, verifiable receipt) | Proof, Narrative | 2 to 5 days plus one partner conversation | Proof 2→5 |
| 5 | Rebuild the home page as the seven beats in 6.6, problem second | Narrative, Layout | 3 to 5 days | Narrative 6→8, Layout 6→7 |
| 6 | One visual idea: serif-led type system, stone base, single accent, receipt frame as the signature, blueprint linework for diagrams, remove gradients and three-card grids | Typography, Color, Layout, Imagery | 1 to 2 weeks with a designer | Typo 6→8, Color 6→8, Layout 7→8 |
| 7 | Real product screenshots in beats 4 and 5; blog header images | Imagery | Depends on app readiness | Imagery 5→8 |
| 8 | Hero receipt signing animation; entrance fades; reduced-motion guards | Motion | 1 day | Motion 6→7 |
| 9 | Buyer named in hero sub; two-card solutions beat; cut checkmarks | Audience, Headline | 1 day | Audience 7→8, Headline 7→8 |

If items 1 through 5 land, the modeled total is 65.0, which moves Thursdai from 25th to 22nd, just behind Lakera and ahead of Drata, Searchable and Patronus. Items 6 through 9 model to 74.2, which is 14th, between Mistral and Anthropic. Proof above 5 requires customers, not design, and is what separates the mid-70s from the 80s.

### Status of the June recommendations, observed on the live site

| June REC | Observed Oct 2 | Still open? |
|---|---|---|
| REC-01 Social proof before features | Industry band only, no logos or stat | Open (now 6.2) |
| REC-02 Trim nav to 5 | 6 items + CTA; Compare removed from primary nav | Mostly done |
| REC-03 Compress hero | Uppercase pre-headline removed; three checkmarks remain | Half done (6.12) |
| REC-04 Sections 12 → 7 or 8 | 13 beats | Open (6.6) |
| REC-05 Section padding | 24 to 120px, inconsistent | Open (6.7) |
| REC-06 Gradient on hero background and closing headline text only | Closing CTA is dark with gradient text; hero has the gradient background | Done as specified; this pass reverses it (6.8) |
| REC-07 Cert band earlier | Still after policy-as-code | Open; this pass moves certs off the home page entirely |
| REC-08 Receipt as hero visual | Done | Done |
| REC-09 Stat in hero | Not present | Superseded by 6.2 proof band |
| REC-10 Code earlier | API section is beat 12 | Open (6.6 beat 6) |
| REC-11 Mobile nav | Mobile drawer is clean | Done |
| REC-12 Typography unchanged | Against this set it is 3 below median | Reversed (6.4) |

---

## 8. Scope notes

- Two things this pass could not see: live hover and focus states beyond the mega-menu and modal, and the theme toggle's dark render (the toggle button could not be selected unambiguously, which is itself the a11y note in 6.9).
- Patronus and Searchable are scored on what rendered, including failures. If the Searchable client-side exception was transient, its Polish would rise to 5 and its total to 61.7, tying Drata for 22nd.
- Scores are one reviewer's calibration against written anchors. A ±1 change on one dimension moves a total by 0.83, which reorders the tie groups (Antimetal/Granola, Vercel/Cohere/Attio/Cursor, Perplexity/ElevenLabs, Credo/Runway/Sierra) and would tie Thursdai with Patronus for 24th. It does not move Thursdai into the bottom-10 pack above 60 unless Proof is scored 5 or higher, which the live site does not support.

Full capture set (hero, full-page, mobile and scroll-through screenshots for all 25 sites and all 41 Thursdai pages) is in the session workspace and can be committed to `docs/benchmark-2026-10/` on request.
