// Single source of truth for the Person entity (schema.org JSON-LD).
// build.js injects it into index.html and about.html, and case pages point
// their `author` at PERSON_ID. Edit here, never in the page HTML.

const SITE = 'https://akshatkharbanda.com';
const PERSON_ID = `${SITE}/#person`;

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  "name": "Akshat Kharbanda",
  "alternateName": "The Business Backpacker",
  "url": `${SITE}/`,
  "image": `${SITE}/public/images/akshat-avatar.jpg`,
  "jobTitle": "Independent Strategist | 0→1 Strategy & Operations",
  "description": "Akshat Kharbanda (The Business Backpacker). I build the system behind ambitious business bets, from market shaping and product strategy to AI systems and adoption.",
  "knowsAbout": [
    "0→1 strategy",
    "Go-to-market strategy",
    "Market shaping",
    "AI adoption",
    "AI agents and automation",
    "Cross-cultural strategy",
    "Brand strategy",
    "Healthcare and pharma strategy"
  ],
  "alumniOf": [
    { "@type": "CollegeOrUniversity", "name": "INSEAD" },
    { "@type": "CollegeOrUniversity", "name": "BITS Pilani" }
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Clinton Health Access Initiative"
  },
  "sameAs": [
    "https://www.linkedin.com/in/akshat-kharbanda/",
    "https://www.instagram.com/thebusinessbackpacker/",
    "https://github.com/Akshat2430"
  ]
};

module.exports = { SITE, PERSON_ID, person };
