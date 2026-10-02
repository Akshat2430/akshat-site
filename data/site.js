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

  // Homepage "Currently obsessed with:" line. One is picked at random on each
  // page load (never auto-rotates). Keep each under ~45 characters.
  obsessions: [
    '[[AKSHAT: draft: "why AI pilots die in month 3"]]',
    '[[AKSHAT: draft: "the gap between AI usage and AI adoption"]]',
    '[[AKSHAT: draft: "agents a CEO actually opens every morning"]]',
    '[[AKSHAT: draft: "why every country treats obesity differently"]]',
    '[[AKSHAT: draft: "picking country no. 41"]]',
    '[[AKSHAT: draft: "fiction that has nothing to do with AI"]]',
    '[[AKSHAT: draft: "the perfect cafe to work from in Gurgaon"]]'
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

  // Operator "The route so far". Oldest stop first. `logo` is optional
  // (path under public/images/). The final "Next stop: your bet." stop is
  // added by the build, so don't list it here.
  routeStops: [
    { org: 'BITS Pilani', place: 'Goa', logo: 'bits-pilani.png',
      line: '[[AKSHAT: draft: "Learned to build things. There was a beach 5 minutes away."]]' },
    { org: 'EY', place: 'Delhi', logo: 'ey.png',
      line: '[[AKSHAT: draft: "Lots of PowerPoint and Excel."]]' },
    { org: '[[AKSHAT: which org was Mumbai? Viacom?]]', place: 'Mumbai',
      line: '[[AKSHAT: draft: "Football streaming rights. Messi lifted the World Cup. You\'re welcome."]]' },
    { org: 'KPMG', place: 'Gurgaon', logo: 'kpmg.png',
      line: '[[AKSHAT: draft: "Lots of PowerPoint and Excel, again."]]' },
    { org: 'INSEAD', place: 'Fontainebleau → Singapore', logo: 'insead.png',
      line: '[[AKSHAT: draft: "Two campuses, one Dean\'s List."]]' },
    { org: 'Tata Steel', place: 'Kolkata', logo: 'tata.png',
      line: '[[AKSHAT: draft: "Internship. Everything was sorted except the work."]]' },
    { org: 'Novo Nordisk', place: 'India → Denmark → UK', logo: 'novo-nordisk.png',
      line: '[[AKSHAT: draft: "Global brand strategy for GLP-1s, across 15+ countries."]]' },
    { org: 'Clinton Health Access Initiative', place: '30+ countries', logo: 'chai.png',
      line: '[[AKSHAT: draft: "Taking generative AI from pilot to habit."]]' },
    { org: 'LevelUp Labs', place: 'Gurgaon', logo: 'levelup-labs.png',
      line: '[[AKSHAT: draft: "Chai & AI, for executives who hate AI hype."]]' }
  ],

  // Operator "Bets I got wrong". Real stories only, 2-3 max. An empty array
  // hides the whole section, so empty it if you want to ship before writing.
  pratfalls: [
    {
      believed: '[[AKSHAT: what I believed]]',
      happened: '[[AKSHAT: what actually happened]]',
      now: '[[AKSHAT: what I do differently now]]'
    },
    {
      believed: '[[AKSHAT: what I believed]]',
      happened: '[[AKSHAT: what actually happened]]',
      now: '[[AKSHAT: what I do differently now]]'
    }
  ],

  // Optional "messy artefact" per featured case card: a whiteboard photo,
  // early ugly draft, sticky notes. `image` is a path under public/images/.
  // Cards look complete without one, so only add the ones you have.
  // Example: { caseSlug: 'scale-ai-across-30-countries', image: 'artefacts/chai-v1.jpg', caption: 'Version 1. It was wrong.' }
  caseArtefacts: []
};

if (typeof module !== 'undefined') module.exports = site;
