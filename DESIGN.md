# The Business Backpacker redesign

## Architecture and audit
Static HTML and vanilla JavaScript, deployed through Vercel. `styles.css` is the shared component system; `nav.js` injects navigation/footer. `data/cases.js` is the authoritative case content and `build.js` renders 17 case pages from `work/_template.html`, homepage featured entries, and Work categories. Keep BUILD markers intact. The two interactive tools have isolated inline styling and scoring logic. Contact forms, Cal.com, analytics, and embedded media are independent integrations.

The original layout constrained every page and eight navigation links to 720px, used repeating rounded cards and a continuously moving, greyed-out logo strip. Mobile navigation lacked expanded state and keyboard dismissal; several project links were pointer-only. The site already pre-renders cases and uses video facades and lazy images; preserve these advantages. External fonts, media, and booking still depend on third-party availability.

## Direction and implementation
Warm paper, espresso ink, burnt orange, the existing DM Serif Display / DM Sans / Caveat font families, fine editorial rules, deliberate asymmetric compositions. Keep all factual copy, metadata, routes, downloadable resources, case data, and integrations. The homepage adds an original lightweight SVG coffee/hand illustration, crossed-out signature, numbered field notes, a moving strip of unmodified logos, outcome-led dispatches, a speaking photograph, and a personal contact invitation. Shared rules carry the identity across all content pages and generated cases. No added client framework or production dependencies.

The appended house-system block in `styles.css` explicitly overrides legacy component styling while preserving component contracts. The original responsive rules remain available for specialist components such as About's journey photos. Shared navigation adds focus styling, a skip link, active-page semantics, mobile state, Escape dismissal, and keyboard activation for legacy click-only links.

## Validation
See final implementation notes for executed build, browser, accessibility, asset, and route checks. Browser verification scripts and screenshots are local to `/tmp/akshat-check`, avoiding production test dependencies. No lint or TypeScript setup existed in this vanilla JavaScript repository; syntax validation and production generation are the relevant native checks.

## Completed checks and remaining limits
- Ran the original site locally and captured a baseline before changes.
- Chromium checks across 12 representative routes at 1440, 1024, 768, and 390 pixels; desktop/mobile screenshots reviewed for every major page and both tools. No horizontal page overflow or JavaScript runtime errors.
- Every local HTML asset/link target resolves. All 17 generated case routes return HTTP 200 and retain a single H1.
- `npm run build` succeeds. All inline JavaScript blocks and JSON-LD parse; shared scripts pass Node syntax checks; `git diff --check` succeeds. There is no configured lint, TypeScript, or pre-existing test command.
- Axe scans include contrast checks across the 12 representative pages. First-party issues fixed: heading order, tool landmarks and contrast, scroll-region keyboard access, and main landmark naming. Remaining scan findings are inside third-party LinkedIn/Instagram iframe documents (missing image alternatives, player labels, heading order, duplicate landmarks), which this site cannot edit.
- Exercised both tools through to results and the agent picker's restart; verified result layouts at 390px. Verified menu expanded state/Escape dismissal and reduced motion.
- Verified contact success with an intercepted local network response (nothing sent). Restored native required-field validation and ensured the form hides on success. Live submission/delivery and actual booking were not performed.
- Verified deferred Cal.com mounting when the homepage booking disclosure opens. Added a direct booking fallback on pages with embeds. Fonts, social embeds, and calendar still require external providers; no blanket external-link availability guarantee.

## Changed files
`index.html`, `styles.css`, and new `public/images/field-marks.svg` implement the main identity. `nav.js`, `cal-embed.js`, and `contact-form.js` improve shared accessibility/loading/interaction. Work, Writing, Speaking, Content, and Side Quests move contact invitations beneath content. About and Method gain semantic heading refinements; both tools receive aligned colours, focus/reduced-motion support, and main landmarks. `build.js` and `work/_template.html` preserve generated-page semantics and add existing outcomes to homepage dispatches; all 17 case pages are regenerated. `resources.html` receives its new appearance through the shared stylesheet. `data/cases.js`, original logo/image files, SEO values, downloads, and scoring logic are unchanged.

Production deployment follows the Vercel integration on the GitHub `main` branch.

## Follow-up refinements
Removed the homepage geographic strip; shortened the human-gap and brand headings; restored continuous logos with pause/reduced-motion controls; positioned the speaking photo crop to retain headroom; updated all booking destinations and the shared embed to `akshatkharbanda/strategy-call`.

## Illustrations across the site
Added a shared, 9 KB SVG symbol file (`public/images/page-doodles.svg`) with seven page illustrations: country flags for Work, a 10/90 diagram for Method, a notebook and pen for Writing, a microphone for Speaking, conversation bubbles and a camera for Content, an open backpack for Side Quests, and a worksheet folder for Resources. The homepage Selected Work heading repeats the flags. Smaller quotation marks, pen strokes, route endpoints, step connectors, code brackets, sparks, and paper clips carry each visual theme into the page.

Illustrated introductions share a responsive component; mobile puts illustrations below the original introduction. Decorative figures are hidden from assistive technology and do not receive focus. The Method diagram has an accessible explanation. No new animation, raster downloads, JavaScript, or production dependencies. About, existing logos, copy, bookings, and tools are preserved.

Validation: all eight affected pages checked in Chromium at 1440, 1024, 768, and 390 pixels, with desktop and mobile illustrations visually reviewed. All retain a single H1 and have no page overflow or runtime errors. SVG parsed and referenced symbol IDs validated; generated Work route marks are maintained in both build output and fallback rendering.
