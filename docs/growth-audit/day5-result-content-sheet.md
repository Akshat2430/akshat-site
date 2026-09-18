# Scorecard result-content sheet — Day 5 prep

Built before coding, per brief §6. Covers the 8 driver dimensions (each can be one of a user's "two weakest areas") and the 6 named patterns. All experiments below are new (existing code only has the `FIX` one-liners, no owner/baseline/outcome structure). Case/resource pairings are my judgement — flagging clearly, since the brief only requires "a relevant case," not a specific one, and several dimensions have no perfect match in the existing 17 cases.

## Per-dimension: seven-day experiment, owner, baseline, outcome

| Dimension | 7-day experiment | Owner | Baseline (measure before) | Outcome to check (after 7 days) | Case | Resource |
|---|---|---|---|---|---|---|
| Leadership | One senior leader shares something they made with AI (a doc, analysis, draft) at the next team meeting or in the team channel. | The most senior leader willing to go first. | Ask three people if they've seen a leader's own AI work — count the yeses. | Whether anyone references that leader's example in their own work the following week. | CHAI rollout (`scale-ai-across-30-countries`) | AI Champions Playbook |
| Safety | Next time someone finishes fast with AI, their manager says so out loud, framed as a win. | Direct manager of the team's fastest AI adopter. | Note whether AI-assisted wins are currently mentioned openly or kept quiet. | Whether that person (or others) mention AI use openly again the following week. | Novo Nordisk pilot (`ai-pilot-that-actually-works`) | AI Champions Playbook |
| Incentive | Add one explicit line crediting AI-assisted efficiency as a positive in the next review conversation. | The manager running that review. | Whether AI use is currently part of any review criteria (yes/no). | Whether that person keeps using AI visibly after the review. | CEO AI workforce (`build-a-ceo-an-ai-workforce`) | — (route to scorecard/agent picker) |
| First win | Sit the next new hire down with one real, finishable task on day one, using AI start to finish. | Whoever runs onboarding. | How long it took the last new hire to do something real with AI. | Whether they use AI again unprompted in week two. | Novo Nordisk pilot (`ai-pilot-that-actually-works`) | AI Champions Playbook |
| Workflow | Move the AI step for one recurring task into the tool people already use for it, out of a separate tab. | Owner of that recurring task/process. | Where AI currently lives for that task (separate tab vs. embedded). | Whether the embedded step keeps getting used without reminders a week later. | CEO AI workforce (`build-a-ceo-an-ai-workforce`) | First-agent picker (cross-link) |
| Governance | Write exactly three rules (what's fine, what's off-limits, who to ask) and post them where the team will see them. | Owner of AI/compliance policy. | Ask three people what they think the rules are today — count how many different answers. | Ask the same three people again in a week — check for consistency. | CHAI rollout (`scale-ai-across-30-countries`) | — |
| Champions | Give one named champion two protected hours this week to help three colleagues finish one real task each. | The champion's manager (has to approve the time). | Rough count of who that champion has informally helped in the last month. | How many of the three colleagues use it again unprompted the following week. | Novo Nordisk pilot (`ai-pilot-that-actually-works`) | AI Champions Playbook (direct match) |
| Measurement | Pull this week's usage report, find the lowest 20% of users, have one real conversation with one of them about why. | Owner of the AI tooling budget/admin console. | Current usage report, or "we can't see this yet" as the honest starting point. | Whether that person's usage changes at all after the conversation. | Viacom18 dashboard (`give-executives-time-back`) | — |

## Per-pattern: case + resource + CTA

| Pattern | Case shown | Resource shown | CTA |
|---|---|---|---|
| Shelfware | `scale-ai-across-30-countries` — went from early adopters to majority active | AI Champions Playbook | Discuss your rollout |
| Compliance theatre | `ai-pilot-that-actually-works` — leadership modeled the behaviour first | AI Champions Playbook | Discuss your rollout |
| Island of excellence | `scale-ai-across-30-countries` — spread beyond the first pilots | AI Champions Playbook | Discuss your rollout |
| Wide and shallow | `give-executives-time-back` — scattered light effort became one adopted system | — | Discuss your rollout |
| Fear-frozen | `scale-ai-across-30-countries` — governance that let nervous first-timers try safely | — | Discuss your rollout |
| It's holding | `scale-ai-across-30-countries` — already the flagship sustained-adoption story | — | Existing honest copy kept ("you don't need me to run this") |

## Marked as illustrative / uncertain

- Every "outcome to check" above is a suggested measurement, not a guarantee — the tool should frame these as things to *check*, not promises.
- Case-to-dimension pairing is my judgement call, made without user testing. If Akshat has a stronger case fit for any dimension (particularly Incentive, Governance, Measurement, where the fit is weakest), swap it — the code below reads from a single lookup object, so this is a one-line change.
- Both time estimates ("about 2 minutes") carried through from existing site copy are still unverified against real completions (see Day 1 inventory §7 gap).
