// data/site.js — the small, frequently-edited bits of copy behind the
// "Alchemy" sections. build.js renders all of it into static HTML, so edit
// here and run `node build.js`. No HTML changes needed.
//
// PLACEHOLDERS: anything written as [[AKSHAT: ...]] shows as a loud yellow
// badge locally and on Vercel previews, and FAILS the Vercel production
// build. Replace the whole [[AKSHAT: ...]] wrapper with final text to ship.
// Drafts below are written as [[AKSHAT: draft: "..."]]. If the draft is
// right, keep only the quoted text.

const site = {

  // Homepage "Currently obsessed with:" line. A random pick on each page load
  // (never auto-rotates). Visitors cycle with the emoji buttons, or by
  // clicking the coffee cup. Add or remove categories freely; each needs an
  // emoji, a `noun` for screen readers, and items of { title, by? }.
  obsessions: [
    { key: 'show', emoji: '📺', noun: 'Show', items: [
      { title: 'The Mentalist' },
      { title: 'Dexter' },
      { title: 'The Sopranos' },
      { title: 'Modern Family' },
      { title: 'Better Call Saul' },
      { title: 'Suits' },
      { title: 'The Haunting of Hill House' }
    ] },
    { key: 'book', emoji: '📚', noun: 'Book', items: [
      { title: 'Alchemy', by: 'Rory Sutherland' },
      { title: 'Before the Coffee Gets Cold', by: 'Toshikazu Kawaguchi' },
      { title: 'A Man Called Ove', by: 'Fredrik Backman' },
      { title: 'Contagious', by: 'Jonah Berger' },
      { title: 'The Midnight Library', by: 'Matt Haig' },
      { title: 'Beyond Belief', by: 'Nir Eyal' },
      { title: 'The Vegetarian', by: 'Han Kang' },
      { title: 'Zero to Scale', by: 'Arindam Paul' }
    ] },
    { key: 'song', emoji: '🎧', noun: 'Song', items: [
      { title: '505', by: 'Arctic Monkeys' },
      { title: 'Meet Me Halfway', by: 'Black Eyed Peas' },
      { title: 'Instant Crush', by: 'Daft Punk' },
      { title: 'Let It Happen', by: 'Tame Impala' },
      { title: 'Mayonaka no Door (Stay With Me)', by: 'Miki Matsubara' },
      { title: 'All the Stars', by: 'Kendrick Lamar & SZA' },
      { title: 'Pompeii', by: 'Bastille' },
      { title: 'Riptide', by: 'Vance Joy' }
    ] }
  ],

  // Operator contact: honest scarcity line. Set any value to null to hide
  // the line entirely. After `validUntil` the build hides it automatically
  // and warns, so a stale "1 open" can never sit on the site.
  capacity: {
    perQuarter: 3,
    open: 1,
    quarterLabel: 'Q4 2026',
    validUntil: '2026-12-31'
  },

  // Operator "Bets I got wrong". Real stories only, 2-3 max. An empty array
  // hides the whole section, so empty it if you want to ship before writing.
  // Both drawn from Akshat's own case-study learnings (Viacom18 dashboard,
  // Novo Nordisk AI pilot).
  pratfalls: [
    {
      believed: 'A good dashboard shows everything. So my first one was built to be comprehensive.',
      happened: 'Too many metrics. Adoption only went up once I cut it back to the essentials.',
      now: 'I start from the decision an executive needs to make, and work backwards to the few numbers that answer it.'
    },
    {
      believed: 'Get the technology right on a “simple” AI tool, and people will use it.',
      happened: 'The technology was the easy part. I underestimated how much change management it needed.',
      now: 'I plan adoption from day one: start with 10 power users, appoint champions, scale only once it’s proven.'
    }
  ],

  // Optional "messy artefact" per featured case card: a whiteboard photo,
  // early ugly draft, sticky notes. `image` is a path under public/images/.
  // Cards look complete without one, so only add the ones you have.
  // Example: { caseSlug: 'scale-ai-across-30-countries', image: 'artefacts/chai-v1.jpg', caption: 'Version 1. It was wrong.' }
  caseArtefacts: []
};

if (typeof module !== 'undefined') module.exports = site;
