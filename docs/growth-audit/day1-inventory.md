# Day 1 — Inventory: current assets, proof, and missing facts

Prepared 18 September 2026, against `docs/intern-growth-brief.md`. Covers brief section 7, Day 1: "Existing assets and missing facts are recorded."

## 1. Existing pages and routes (all preserved, per brief §8)

| Route | Purpose | Notes |
|---|---|---|
| `index.html` | Homepage | Has `<!--BUILD:featured-cases-->` marker; regenerated in part by `build.js`. Currently: hero (broad "biggest global bet" framing), proof strip (5 stats), three equal-weight surface cards (adoption / agents / brand, already AI-first in copy order), logo marquee, 3 featured cases, speaking preview, writing preview, contact CTA. No scorecard/agent-picker link anywhere on the page today. |
| `work.html` | Full case index | Categories: Entering, Finding, Building (see `data/cases.js`) |
| `resources.html` | Free Resources | 2 PDF downloads + 1 PDF field guide + 2 tool cards, all in one 5-up grid, tools visually subordinate to PDFs (tools use `case-card-thumb-sm`, PDFs use full `case-card-thumb`) |
| `tools/adoption-scorecard.html` | AI Adoption Scorecard | Standalone HTML/CSS/JS, own font stack (Newsreader/Inter/IBM Plex Mono) and colour tokens, not wired to `styles.css` |
| `tools/first-agent-picker.html` | First-Agent Picker | Same isolation pattern, own Newsreader/Inter tokens |
| `method.html`, `about.html`, `writing.html`, `speaking.html`, `content.html`, `sidequests.html` | Secondary pages | Nav currently gives these equal weight to Work/Resources |
| `work/_template.html` + 17 generated case pages | Case studies | Built from `data/cases.js` via `build.js`; **do not hand-edit generated case HTML directly** |

## 2. Navigation (`nav.js`)

Current desktop links (8, ~12px per brief audit): Work, Free Resources, Method, Writing, Speaking, Content, Side Quests, About. No visually distinct "Let's talk" link — contact lives only in-page (`#contact` anchor / footer email).

Brief §2 P1 asks for: Work, Free Resources, About, + clear "Let's talk" in nav; Method/Writing/Speaking/Content/Side Quests move to footer. `nav.js` currently has no footer-links section for internal pages — footer only has LinkedIn/Instagram/Substack/Email. This needs new footer link markup, not just reshuffling `links[]`.

## 3. Design system (source of truth: `styles.css`, final override block from line 2083)

```
--bg: #f8f3e9        --surface: #f1e9dc       --surface-hover: #eee2d2
--text-primary: #35251f   --text-secondary: #66544a   --text-tertiary: #756254
--accent: #a74320     --accent-light: #f0deca
--border: #d8caba     --border-strong: #a79079
--font-serif: 'DM Serif Display'   --font-sans: 'DM Sans'   (Caveat for hand-notes)
--radius: 2px (all sizes)   --max-w: 1120px   --nav-h: 86px
```
Earlier `:root` block (line 8) is legacy/superseded — confirmed by DESIGN.md's "final override block" note. Any new component styling should sit in or after the line-2083 block.

Illustration system: `public/images/page-doodles.svg` (shared symbol sprite — flags, folder, notebook, mic, etc.) and `public/images/field-marks.svg` (coffee art, route mark). New campaign work should add its own symbol(s) to one of these files rather than introducing a new SVG convention.

## 4. Analytics — what's already firing

Vercel Web Analytics (`va()`) is loaded on every top-level page via the inline stub + `cdn.vercel-insights.com/v1/script.js` (see `index.html:63-66`, repeated per page). **Confirmed existing custom events:**

| Event name | Fires from | Data shape |
|---|---|---|
| `mailto_click` | Footer email link (`nav.js`), and per-page "Prefer email?" fallback on about/writing/speaking/content/sidequests/case pages | `{location: '<page or case slug>'}` |
| `resource_click` | Each of the 5 resources.html cards | `{resource: '<slug>'}`, e.g. `adoption_scorecard`, `first_agent_picker` |
| (cal-embed.js also calls `window.va('event', ...)`) | Booking disclosure interactions | not yet inventoried in detail — check `cal-embed.js:13` before adding new booking events |

**Not yet present:** `tool_entry_click`, `tool_start`, `tool_complete`, `campaign_item_open`, `campaign_share_click`, `consultation_click` — none of the six events brief §9 asks for exist today. **Neither tool currently fires any `va()` event at all** — `tools/adoption-scorecard.html` and `tools/first-agent-picker.html` have zero analytics instrumentation. This is a straight gap, not a rename.

One duplicate-tracker risk flagged for Day 8: confirm the `window.va` stub pattern is consistent before wiring new events — every page redefines the same stub inline rather than sharing it from one script, so a typo in one page's stub would silently drop events on just that page.

## 5. Both tools — current logic (for Day 5 result-content sheet, recorded now while fresh)

### Adoption Scorecard (`tools/adoption-scorecard.html`)
- 10 questions, 8 "driver" dimensions (Leadership, First win, Safety, Champions, Workflow, Governance, Measurement, Incentive) + 1 non-driver "felt" self-report + 1 non-driver "breadth" (usage %, optional cost fields attached).
- 6 named patterns: Shelfware, Compliance theatre, Island of excellence, Wide and shallow, Fear-frozen, "It's holding". `derivePattern()` branches on score total + breadth + specific driver zero-scores.
- Confirmed CTA mismatch (brief §6 flagged this correctly): `routing()` always sends to `cal.com/akshatkharbanda/strategy-call` labelled **"Get the Teardown →"**, promising "a 15-minute Loom and a one-page fix list" — no such delivery mechanism exists in this codebase. Only the "holding" pattern gets honest copy ("You don't need me to run this").
- Cost estimate: `costLine()` computes `unused = seats * cost * (1 - breadth_midpoint)` and labels it "an estimate" already, but the on-page copy line to check against the brief's required rewording ("Estimated spend associated with seats not used weekly") hasn't been changed yet — current copy is "You're paying X a year, and about Y of it buys access nobody opens," which states non-use as fact rather than an estimate from a self-reported band.
- No Copy/Print action, no return-to-resources link, no analytics.

### First-Agent Picker (`tools/first-agent-picker.html`)
- 6 questions → `scoreAnswers()` (pure function, explicitly separated from render layer per its own code comments — good sign for a clean port).
- 5 archetypes (inbox_triage, meeting_to_action, research_brief, ops_rollup, first_draft) + 1 gate result `foundation_first` (fires on "it's in my head" / "no set way" / low-frequency-and-modest-ambition answers).
- CTA references **"Build Sprint"** — flagged in-code by an existing `TODO(Akshat)` comment (line 402) as an undefined offer with no page yet; currently just links to the booking call.
- No Copy/Print action, no return-to-resources link, no analytics.

## 6. Proof inventory — claims currently live on the site

| Claim | Where | Client/project | Status flag |
|---|---|---|---|
| "2000 seats across 30+ countries, from purchase to daily use" | Homepage surface card, linked to `work/scale-ai-across-30-countries.html` | CHAI | Case page says "Majority of staff now active users, up from early adopters" — homepage teaser says "2000 seats," case page doesn't state a seat count. **Reconcile exact seat number before reusing in new hero/proof copy.** |
| "AI workforces for CXOs running 2+ quarters later" | Homepage surface card, linked to `work/build-a-ceo-an-ai-workforce.html` | Public tech company | Case page confirms "4 dedicated agents in daily use, company-wide rollout now underway" — does not itself state "2+ quarters." **Verify duration claim before repeating.** |
| "double-digit share growth and 30M impressions in three months for a GLP-1 brand" | Homepage surface card | Novo Nordisk | This appears to conflate two different Novo Nordisk cases: `brand-for-millions-across-15-countries` (double-digit **projected global preference**, not "share growth") and `manage-300k-across-10-partners` (30M impressions in 3 months, UK media buy, not directly a "share growth" case). **These are two separate engagements; the homepage sentence merges them into one claim that doesn't match either case page. Needs Akshat's reconciliation before reuse anywhere new — do not repeat as-is.** |
| "25+ / 8 / 40+ / 5 / 50K+" stats row (projects / industries / talks / countries / followers) | Homepage proof strip | Aggregate, no single source | Fine as aggregate colour, but per brief §3 these should move lower on the page, after specific case evidence, not before it. |
| "Building" tag on 3 of 3 currently-featured homepage cases | Homepage `#featured-cases` | brand-for-millions, scale-ai-across-30-countries, build-a-ceo-an-ai-workforce | Brief §3 explicitly flags ambiguous "Building" labels — these read as project-status ("in progress") but are actually just `data/cases.js` category tags (Entering/Finding/Building = type of engagement, not completion state). **Confirmed ambiguous; needs a clear role label or removal, per brief.** |
| Adoption scorecard meta description promises "what unused seats are quietly costing you" | `tools/adoption-scorecard.html` `<meta name="description">` | — | Matches current tool behaviour (optional cost calculator exists), no change needed here specifically — only the on-result wording (see §5 above). |

**Not yet built:** the brief's full proof-inventory sheet (claim / client / source / date / observed-vs-projected / permission-to-publish / exact approved wording) is a Day 2 deliverable per §3. The table above is the Day 1 seed of it — every row flagged "reconcile/verify" needs Akshat's sign-off before it can be marked "approved wording" in that sheet. **No claim below has been verified against source data outside this repo; none should be treated as approved for new copy yet.**

## 7. Booking / contact integrations (`cal-embed.js`, `contact-form.js`)

Both preserved, functioning per DESIGN.md's validation notes. Cal.com destination is consistently `cal.com/akshatkharbanda/strategy-call` across homepage, both tools, and case CTAs. `mailto:workwithakshatkharbanda@gmail.com` is the fallback everywhere. No changes made or needed here for Day 1; noted so Day 5/6 CTA rewrites (scorecard "Discuss your rollout" default) know exactly what they're pointing at.

## 8. Gaps this inventory surfaces for later days

- **Entry engagement name** ("AI Workflow & Adoption Sprint," brief §3) does not exist anywhere in the current site or case data — it's a new offer the brief proposes and Akshat hasn't confirmed. Default to "Discuss your workflow" language until confirmed, per brief.
- **"Build Sprint"** referenced in `first-agent-picker.html`'s own code comment is in the same unconfirmed-offer state. Two different unconfirmed offer names exist in the codebase already (Workflow & Adoption Sprint vs. Build Sprint) — worth flagging to Akshat as a naming collision risk if both ship.
- No email-capture mechanism exists anywhere (confirmed absent, matches brief's "no email required" requirement — nothing to remove).
- No sample/illustrative result panel exists anywhere on the site today — brief §2 P1 (inset paper panel) and §3 (tool card example result) are both net-new components.
