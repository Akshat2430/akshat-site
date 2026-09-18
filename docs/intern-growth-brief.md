# Website growth brief — intern handoff

Prepared 18 September 2026. Owner: Akshat. Executor: an intern comfortable editing the site with AI tools. Budget: ten full working days, approximately 70 hours including contingency.

## 1. Assignment and success

Make the website generate more relevant conversations about AI adoption and agent builds. Keep brand strategy visible. Compare three creative campaign concepts before building one.

The journey: a recognizable workplace problem → a useful existing tool → a specific recommendation and relevant proof → an optional project conversation.

Improve the current site and tools. Do not create another diagnostic from scratch. The site already has an adoption scorecard, a first-agent picker, and downloadable resources. Those are the foundation.

Deliver: revised homepage and resources page; improved scorecard results and tool navigation; one campaign with four entries; analytics events; launch assets; QA evidence; a preview for Akshat to review. This brief itself makes no production changes.

Commercial success means conversations with leaders who own a relevant team/workflow problem and can sponsor a next step. Traffic and quiz completions are supporting signals, not the objective.

## 2. Visual audit: observed findings and exact changes

Audit scope: live Chromium screenshots of the homepage at 1440×1000 and 390×844, resources at 1440×1000, and scorecard introduction at 390×844; supporting review of local HTML, CSS, navigation, and scorecard logic. This is a focused visual and conversion audit, not a complete accessibility, performance, or cross-browser certification. Result-flow recommendations below come from source inspection; result screens were not visually exercised during this audit.

Evidence: [desktop first screen](growth-audit/desktop-fold.png), [mobile first screen](growth-audit/mobile-fold.png), [desktop homepage](growth-audit/home-desktop.png), [mobile homepage](growth-audit/home-mobile.png), [resources](growth-audit/resources.png), [scorecard introduction](growth-audit/scorecard.png).

| Priority | Observed issue | Intern instruction | Acceptance criterion |
|---|---|---|---|
| Keep | Warm paper, espresso text, orange accents, serif headlines and hand-drawn art form a consistent identity. | Reuse the current design system. Give the campaign its own illustration within it. | No unrelated fonts, generic dashboard aesthetic, or stock AI imagery. |
| P0 | The hero emphasizes a broad global strategy promise rather than the AI services now prioritized. | Use the hero copy below and surface the scorecard. | A visitor can identify the service and next action from the first screen. |
| P0 | The homepage has no direct scorecard or agent-picker entry. | Add the scorecard CTA in the hero and a two-tool section below early proof. | Both tools are one click from the homepage. |
| P1 | Desktop navigation has eight links at 12px, with equal emphasis. | Use Work, Free Tools, About, and a visually clear Let's talk link. Move Method, Writing, Speaking, Content and Side Quests to the footer. Free Tools can retain the resources.html route. | Main links use approximately 14px text; old pages remain reachable; mobile menu works by keyboard. |
| P1 | On mobile, a large coffee illustration follows the hero; aggregate stats appear before specific case evidence. Homepage height is approximately 5,855px at 390px width. | Put one verified AI proof statement directly below hero actions. Reduce mobile illustration height to roughly 160–180px; consolidate aggregate stats lower down. | Hero CTA remains visible at 390×844; one relevant proof statement appears before decorative art. Do not enforce an arbitrary total page length. |
| P1 | Three service columns have equal visual weight; the first featured case is brand work. | Give adoption and agents two prominent cards; put brand strategy in a smaller linked row. Order featured work: adoption, agents, brand. | AI priorities are obvious without removing brand work. |
| P1 | Resources are dominated by large PDF screenshots; interactive tools are smaller stacked tiles. | Put two equal-width interactive-tool cards first, followed by compact download cards. Replace tool screenshots with a readable sample output. | Each tool shows a problem, time estimate, output and action before the download grid. |
| P1 | The layout repeats text blocks and thin separators, with no visual demonstration of the diagnostic's value. | Introduce one inset paper panel showing a clearly labelled example result. | The example is readable on mobile and never presented as the visitor's real assessment. |
| Keep | Scorecard introduction has a legible heading and a clear orange start button visible on mobile. | Retain this clarity; add a modest link back to the site. | Start remains visible without scrolling at 390×844 under default text size. |

The sampled pages showed no horizontal overflow at the measured widths. That is not evidence that all pages or breakpoints pass. Existing homepage CTAs are already above the fold on mobile; do not describe this as a hidden-button problem.

Design implementation: retain DM Serif Display, DM Sans and Caveat. Use handwriting only for short decorative notes. Reuse the final house-system tokens in styles.css; earlier definitions are overridden later in that file. Use 16px or larger body text for new components, 14px or larger meaningful metadata, comfortable line spacing, and approximately 44px interactive targets. Use orange mainly for actions and selected emphasis. Avoid adding more decoration between a question and its answer.

## 3. Homepage specification and draft copy

Sequence:

1. Simplified navigation.
2. Hero with tool CTA and direct project CTA.
3. One verified adoption outcome and one verified agent outcome, linked to their cases.
4. Two interactive-tool cards with an example result.
5. Two primary service cards and a secondary brand-strategy row.
6. Three selected cases, AI first.
7. Campaign teaser.
8. Compact speaking/writing section.
9. Project invitation and footer links.

Hero:

> **Make AI part of how your team works.**
>
> I help leaders turn scattered experiments into everyday workflows with practical agents and the adoption work that makes them stick.
>
> **Find your adoption bottleneck** · **Discuss a project**

Under the primary CTA: “Free scorecard · 10 questions · No email required.” Keep the current two-minute estimate only if timed user trials support it.

Tool cards:

| Tool | Headline | Supporting copy | CTA |
|---|---|---|---|
| Adoption scorecard | Your team has AI. What's getting in the way? | Get a likely adoption pattern, two areas to investigate, and a practical next step. | Check your rollout |
| First-agent picker | Which agent should you build first? | Start with the work that is piling up. Get a suggested starting point to investigate. | Find a starting point |

Example result panel, labelled “Illustrative example”: “Likely pattern: Island of excellence. A few people get value; the practice isn't spreading. This week: give one champion protected time to help three colleagues complete a real task. Measure: how many repeat it without help.”

Adoption service: “Turn access into everyday practice.” Agent service: “Build an agent around a real workflow.” Brand row: “Entering a new market or rethinking your positioning? Explore brand & GTM work.”

Proposed entry engagement for Akshat to validate: **AI Workflow & Adoption Sprint**. Deliverables: one workflow map, an agreed baseline, one scoped experiment, an accountable owner, and a continue/change/stop recommendation. Intern drafts the offer; Akshat confirms duration, capacity, price presentation, and whether implementation is included. Until then, use “Discuss your workflow” without a fixed delivery promise.

Proof inventory: create a sheet with claim, client/project, source, date, observed versus projected, permission to publish, and exact approved wording. Reconcile market-share, preference and impressions language before repeating it. Replace ambiguous “Building” labels with a clear role label or remove them; do not imply project status without verification. Never manufacture missing results or testimonials.

## 4. Compare three campaign concepts

| Concept | Familiar format and sample items | Useful bridge | Main tradeoff |
|---|---|---|---|
| **AI Lost & Found** | Lost-property office. Workshop enthusiasm: “Last seen on Monday.” Pilot owner: “Everyone remembers meeting them.” ROI baseline: “Missing since launch.” Unused licence: “Still being billed.” | Each item explains one adoption failure and links to the existing scorecard or a relevant checklist. | Strong connection to paid work, but keep the tone constructive. |
| **AI Office Gift Shop** | Absurd office catalogue. Prompt-and-Pray Candle. Dashboard Rose-Tinted Glasses. Pilot Life-Support Kit. Champion's Invisible Time Allocation. | “What this actually needs” reveals a practical action and relevant tool. No fake checkout. | Most immediately comic; risks attracting broad AI humor traffic and resembles the article's store. |
| **AI Departures** | Airport departure board. Pilot to Production: delayed, no owner. Workshop to Habit: cancelled after launch. Licence to Value: gate change. Agent to Everyday Use: awaiting handoff. | Select a delayed journey to see the blocker and next action. | Best fit with Business Backpacker; requires more care to keep the metaphor understandable and accessible. |

Starting recommendation: AI Lost & Found. Treat this as a hypothesis until concept testing. Avoid unsupported “world's first” claims.

On Day 1, make one desktop/mobile concept sheet per option: title, one sample item, revealed practical advice, and destination CTA. Cap effort at 45 minutes per concept; these are sketches, not three builds.

Akshat supplies five target-buyer contacts or handles introductions: heads of operations/transformation, team leaders responsible for AI adoption, or executives sponsoring agents. The intern must not send outreach in Akshat's name without authorization.

Use 15-minute sessions. Rotate concept order. Ask: “What is this?”, “Who would you send it to?”, “What problem does it remind you of?”, “What would you click next?” Record exact reactions and comprehension; do not ask only whether they like it.

Score each 1–5: buyer recognition 35%, connection to paid work 30%, willingness to share with a specific colleague 20%, build simplicity 15%. These are decision aids, not statistically validated research. Akshat chooses on Day 2. If interviews cannot be arranged, present an explicitly judgement-based comparison and continue independent homepage/tool work while the selection is pending.

## 5. Campaign build specification

Implement only the selected concept. For Lost & Found, create /lost-and-found.html and four stable anchors: #licences, #enthusiasm, #owner, #baseline. Each entry must work through a normal link and open/scroll correctly when shared directly. Other concepts use the same structure with their selected name and objects.

Each entry includes: short comic label, one sentence of recognition, 60–100 words of explanation, one concrete action, one relevant link, and Copy link. No login or email gate. Static HTML/CSS/SVG is sufficient; no AI backend required.

Example entry:

> **Workshop enthusiasm**
> Last seen: the Monday after training.
>
> The workshop created ideas, but nobody changed a recurring task. Pick one real workflow and have a small team practise it together this week. Give them a reviewer and time to compare outputs. Check whether they repeat it next week without being prompted.
>
> **Find what's blocking your rollout →**

Route licences and enthusiasm to the scorecard. Route owner to a small ownership checklist, then the agent picker if the problem is choosing an agent. Route baseline to a simple measurement template, then the scorecard. Templates can be short sections on the campaign page to keep scope controlled.

Create one 1200×630 campaign share image, a page title and social description. Anchor links generally share the same page metadata; unique social previews per object would require separate pages and are outside this sprint.

Make the campaign reachable from the homepage and resources page. Keep the main homepage CTA focused on the useful tool.

## 6. Improve existing tools before adding features

Adoption scorecard already contains ten questions, pattern logic, two weak areas, optional spending estimates and a result CTA. Keep the existing route and initial question count. Time five completions before deciding whether it needs shortening.

Required result changes:

- Lead with “Your answers suggest…” and explain which answers support the pattern. A self-report quiz is not a definitive organizational diagnosis.
- For each weak area, specify one seven-day experiment, an owner, a baseline and an outcome to check. Example: onboarding → team lead helps three new users complete one recurring task → record current completion time and rework → check independent repeat use and quality after a week.
- Add a relevant case and a free resource. Do not send every result directly to a calendar.
- Change the optional spending statement: current logic estimates non-weekly usage from a usage band but says access is never opened. Label it “Estimated spend associated with seats not used weekly,” display the midpoint assumption, and state that infrequent use is not automatically wasted spend. Verify cost units against the field label.
- Fix the CTA mismatch: current “Get the Teardown” copy promises a Loom and written fix list, but links to a booking page. Default to “Discuss your rollout,” accurately describing a conversation. Retain the teardown only if Akshat commits to a defined intake and fulfillment process.
- Add Copy action plan or Print/save as PDF. Email delivery is optional future work, not a dependency for launch.
- Add a quiet return link to resources on both tools. Check that first-agent results have an understandable next step and an appropriate case link; preserve their existing decision logic unless a specific defect is demonstrated.

Build a result-content sheet before coding: current pattern → supporting answers → action → owner → baseline → outcome → case/resource → CTA. Cover every pattern and low/medium/high examples. Mark all illustrative or uncertain claims.

## 7. Ten-day work plan

| Day | Hours | Work and deliverable | Done when |
|---|---:|---|---|
| 1 | 7 | Inventory current pages/tools and proof; prepare three concept sheets and homepage wireframe. | Existing assets and missing facts are recorded; three comparable sketches exist. |
| 2 | 7 | Concept sessions/comparison; owner selection; finalize homepage copy and results sheet. | Akshat has a concrete concept recommendation and factual copy to review. |
| 3 | 7 | Implement navigation, hero, early proof and service hierarchy. | Desktop/mobile preview matches the specification. |
| 4 | 7 | Rework resources; add homepage tool previews and reordered cases. | Both tool journeys are reachable and understandable. |
| 5 | 7 | Improve scorecard explanation, spending language, next actions and CTA. | Results match inputs and promises match destinations. |
| 6 | 7 | Build the selected campaign and four entries. | All entries work without accounts or services. |
| 7 | 7 | Finish campaign links, template content, share image, metadata and save/copy behavior. | A recipient can open a shared link and understand it independently. |
| 8 | 6 | Add analytics and create launch assets. | Events can be verified; launch copy is ready for owner review. |
| 9 | 7 | Responsive, keyboard, tool-flow, link and build QA; fix defects. | QA matrix passes or remaining issues are explicitly documented. |
| 10 | 8 | Contingency, owner walkthrough, final handoff and launch preparation. | Akshat receives a working preview, copy/assets, evidence and measurement sheet. |

If behind schedule, cut extra illustration polish, email capture and animations first. Preserve clear proof, honest results, working routes and QA. Owner supplies approved evidence and commercial terms; the intern is not expected to invent them.

## 8. Implementation notes for this repository

Static HTML and vanilla JavaScript; shared styles.css and nav.js. No framework migration needed. Read DESIGN.md before editing. Work in a branch/preview so Akshat can review before publication; the documented main-branch integration deploys to Vercel.

| Area | Source of truth |
|---|---|
| Homepage layout and copy | index.html; preserve BUILD markers |
| Shared visual rules | styles.css; inspect final override block |
| Navigation/footer | nav.js |
| Resource cards | resources.html |
| Adoption tool | tools/adoption-scorecard.html, including inline logic/styles |
| Agent tool | tools/first-agent-picker.html, including inline logic/styles |
| Case facts and generated featured work | data/cases.js and build.js; template in work/_template.html |
| Booking and contact behavior | cal-embed.js, contact-form.js; preserve working integrations |

Do not hand-edit generated case content as the only change: the next build can overwrite it. Keep all existing public routes. Add the selected campaign to sitemap.xml. Reuse existing SVG conventions for art.

## 9. Measurement and launch

Inspect existing analytics before adding anything. Some pages already call Vercel's va event API; confirm the tools load the tracker and that custom events are available in the deployed setup. Avoid duplicate trackers.

| Event | Trigger | Minimal properties |
|---|---|---|
| tool_entry_click | Homepage/resources/campaign tool link | source, tool, item_id if applicable |
| tool_start | First actual interaction/start | tool |
| tool_complete | Result rendered, once per run | tool, pattern_id |
| campaign_item_open | Entry opened | item_id |
| campaign_share_click | Copy/share action | item_id, method |
| consultation_click | Booking/contact action | source, tool if applicable |

Do not send raw answers, company details, emails or spending figures into analytics. Distinguish a share-button click from a completed share, and a booking-link click from a confirmed meeting. Count confirmed conversations separately in a simple sheet.

Prepare three posts: campaign launch, one relatable object with a practical fix, and a tool example. Also prepare two static social cards, one 30–45 second screen recording, and one short newsletter/community pitch for Akshat to send. Use consistent source/medium/campaign tags, such as linkedin/organic/ai_lost_found. No bulk automated outreach or manufactured testimonials.

Measurement sheet columns: week, source, campaign visits, tool starts, completions, consultation clicks, confirmed conversations, qualified conversations, recurring buyer objections. Definitions: completion rate = completed runs / started runs; qualified conversation = relevant leader + active problem + ability to sponsor a next step. Label tracked counts as approximate where blockers or repeat visits affect them.

Review after two weeks of distribution. Plenty of visits but few starts: fix the promise and entry CTA. Starts but few completions: inspect unclear questions and usability. Completions without inquiries: inspect buyer fit, usefulness, offer and next step. Low traffic: improve distribution before attributing failure to the page. Small counts are directional; avoid conversion guarantees and premature A/B tests.

## 10. QA and final handoff

Check 390, 768, 1024 and 1440px; also spot-check 320px and 200% text zoom. Verify no clipped text or horizontal overflow, visible focus, keyboard-operable menu/questions, readable text contrast, reduced-motion behavior and correct heading order. Check the edited homepage, resources, campaign, both tools and representative generated case pages.

Exercise every scorecard pattern and representative agent results; verify back/restart behavior, missing optional cost inputs, currency and units, result explanation and CTA destination. Changed diagnostic logic warrants explicit input/output fixtures. Cosmetic changes need practical visual QA, not a large new test suite.

Run npm run build, JavaScript syntax checks for edited scripts, and git diff --check. Verify all internal links/assets and social metadata. Confirm events in the actual analytics setup or document the exact remaining dependency. Do not send contact forms or book real appointments during QA.

Handoff folder: copy deck, concept comparison and notes, claim inventory, working preview URL, desktop/mobile screenshots, QA matrix, analytics verification, launch assets and a short walkthrough. Flag owner decisions or unverified claims explicitly. Akshat reviews the concrete preview and publishes through the established workflow.

## Reference lessons

[100 School](https://www.100school.com/) makes the behavior-change offer concrete and supports it with outcomes. Borrow specificity and proof structure, not its copy or unverified performance claims.

[MultiplAI roadmap](https://www.multiplai-growth.com/ai-roadmap) previews a useful deliverable and explains the steps. Borrow the preview and clear expectations; do not copy its human-review or delivery-time promises without capacity.

The CISO campaign article supplied by Akshat provides the creative principle: a recognizable format, made specific to the buyer's frustrations. Its reported results are inspiration, not a forecast for this site.
