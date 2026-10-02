#!/usr/bin/env node
/*
 * build.js — static pre-render step.
 *
 * data/cases.js stays the single source of truth for case content. This script
 * bakes that content into the served HTML so search engines and link-preview
 * bots see it without running JS:
 *   - work/<slug>.html      generated in full from work/_template.html
 *   - index.html            "Selected work" cards written between BUILD markers
 *   - work.html             the three category buckets written between BUILD markers
 *   - index.html, about.html Person JSON-LD from data/person.js
 *   - sitemap.xml           regenerated from the page list below (lastmod from git)
 *
 * Runs on every Vercel deploy (see vercel.json "buildCommand"). Safe to run
 * repeatedly: output is deterministic and idempotent.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const { execSync } = require('child_process');
const cases = require('./data/cases.js');
const { SITE, PERSON_ID, person } = require('./data/person.js');

/* ------------------------------------------------------------------ helpers */

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function write(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content);
}

// Replace everything between (and keeping) two marker strings.
function replaceBetween(html, startMarker, endMarker, inner) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker);
  if (s === -1 || e === -1) {
    throw new Error(`build.js: markers not found (${startMarker} … ${endMarker})`);
  }
  return html.slice(0, s + startMarker.length) + inner + html.slice(e);
}

function replaceToken(html, token, value) {
  return html.split(token).join(value);
}

function jsonLd(obj) {
  return `\n  <script type="application/ld+json">\n  ${JSON.stringify(obj)}\n  </script>\n  `;
}

// "2026-09-24" -> "Sep 2026". Must match the fallback in work/_template.html.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function displayDate(iso) {
  const [y, m] = iso.split('-');
  return `${MONTHS[+m - 1]} ${y}`;
}

/* ------------------------------------------------------- case page rendering */

// Mirrors the fallback template literal in work/_template.html so the JS-off
// output and the progressive-enhancement output are identical.
function renderCaseBody(c, prev, next) {
  return `
    <div class="case-hero">
      <a href="../work" class="case-back">← Back to work</a>
      <span class="tag tag-${c.category}">${c.category}</span>
      <h1 class="case-title">${c.question}</h1>
      <p class="case-subtitle">${c.subtitle}</p>
      <div class="case-meta">
        <div class="case-meta-item">
          <div class="case-meta-label">Client</div>
          <div class="case-meta-val">${c.client}</div>
        </div>
        <div class="case-meta-item">
          <div class="case-meta-label">Context</div>
          <div class="case-meta-val">${c.context}</div>
        </div>
        <div class="case-meta-item">
          <div class="case-meta-label">Category</div>
          <div class="case-meta-val">${c.category}</div>
        </div>
        <div class="case-meta-item">
          <div class="case-meta-label">Updated</div>
          <div class="case-meta-val"><time datetime="${c.updated}">${displayDate(c.updated)}</time></div>
        </div>
      </div>
    </div>

    <hr class="divider" />

    <div class="case-section">
      <h2 class="case-section-title">The problem</h2>
      <p class="case-body">${c.problem}</p>
    </div>

    <div class="case-section">
      <h2 class="case-section-title">What I did</h2>
      <p class="case-body">${c.what_i_did}</p>
    </div>

    <hr class="divider" />

    <div class="case-section">
      <h2 class="case-section-title">Outcomes</h2>
      <div class="outcomes-grid">
        ${c.outcomes.map(o => `
          <div class="outcome-card">
            <div class="outcome-num">${o.number}</div>
            <div class="outcome-label">${o.label}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <hr class="divider" />

    <div class="case-section">
      <h2 class="case-section-title">What I learned</h2>
      ${c.learnings.map(l => `
        <div class="learning-item">
          <p class="learning-text">${l}</p>
        </div>
      `).join('')}
    </div>

    <hr class="divider" />

    <div class="cta-block">
      <h2 class="cta-title">Got a similar problem?</h2>
      <p class="cta-sub">Tell me what you're working on. I'll tell you if it's a fit.</p>
      <div class="contact-form-mount" data-location="case_${c.slug}"></div>
      <p class="cta-fallback">Prefer email? <a href="mailto:workwithakshatkharbanda@gmail.com" onclick="if(typeof va==='function'){va('event',{name:'mailto_click',data:{location:'case_${c.slug}'}})}">workwithakshatkharbanda@gmail.com →</a></p>
    </div>

    <hr class="divider" />

    <div class="case-nav">
      ${prev ? `<a href="${prev.slug}" class="case-nav-btn">← ${prev.question.substring(0, 40)}…</a>` : '<span></span>'}
      ${next ? `<a href="${next.slug}" class="case-nav-btn">${next.question.substring(0, 40)}… →</a>` : '<span></span>'}
    </div>
  `;
}

function renderCaseJsonLd(c, url, desc) {
  const outcomesSummary = c.outcomes.map(o => `${o.number} ${o.label}`).join(', ');
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": c.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${c.what_i_did} Result: ${outcomesSummary}.`
      }
    }]
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": c.question,
    "description": desc,
    "url": url,
    "mainEntityOfPage": url,
    "image": `${SITE}/public/images/og-image.jpeg`,
    "datePublished": c.published,
    "dateModified": c.updated,
    "articleSection": "Case study",
    "about": c.client,
    "author": { "@type": "Person", "@id": PERSON_ID, "name": person.name, "url": person.url },
    "publisher": { "@type": "Person", "@id": PERSON_ID, "name": person.name }
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": "Work", "item": `${SITE}/work` },
      { "@type": "ListItem", "position": 3, "name": c.question, "item": url }
    ]
  };
  return [article, breadcrumbs, faq].map(jsonLd).join('');
}

function buildCasePages(template) {
  cases.forEach((c, i) => {
    const prev = i > 0 ? cases[i - 1] : null;
    const next = i < cases.length - 1 ? cases[i + 1] : null;

    const title = `${c.question} · Akshat Kharbanda`;
    const desc = `${c.subtitle}. Case study by Akshat Kharbanda, 0→1 strategy and operations consultant.`;
    const url = `${SITE}/work/${c.slug}`;

    let html = template.replace(/\s*<!--TEMPLATE-NOTE[\s\S]*?TEMPLATE-NOTE-->/, '');
    html = replaceToken(html, '<head>', '<head>\n  <!-- Generated by build.js from work/_template.html + data/cases.js. Do not edit by hand. -->');
    html = replaceToken(html, '{{PAGE_TITLE}}', title);
    html = replaceToken(html, '{{PAGE_DESC}}', desc);
    html = replaceToken(html, '{{CANONICAL_URL}}', url);
    html = replaceToken(html, '{{PUBLISHED}}', c.published);
    html = replaceToken(html, '{{UPDATED}}', c.updated);
    html = replaceBetween(html, '<!--BUILD:JSONLD-->', '<!--/BUILD:JSONLD-->', renderCaseJsonLd(c, url, desc));
    html = replaceBetween(html, '<!--BUILD:START-->', '<!--BUILD:END-->', renderCaseBody(c, prev, next));

    write(path.join('work', `${c.slug}.html`), html);
  });
  return cases.length;
}

/* --------------------------------------------------- homepage featured cards */

function renderFeaturedCards() {
  const rows = cases.filter(c => c.featured).map(c => `
        <a href="work/${c.slug}" class="work-row">
          <span class="tag tag-${c.category}">${c.homeTag || c.category}</span>
          <div class="work-row-body">
            <div class="work-row-q">${c.question}</div>
            <div class="work-row-meta">${c.client} · ${c.context}</div>
            <span class="work-row-outcome">${c.outcomes.map(o => `${o.number} ${o.label}`).join(" · ")}</span>
          </div>
          <div class="work-row-arrow">→</div>
        </a>`).join('');
  return rows + '\n      ';
}

function buildIndex() {
  let html = read('operator.html');
  html = replaceBetween(
    html,
    '<!--BUILD:featured-cases-->',
    '<!--/BUILD:featured-cases-->',
    renderFeaturedCards()
  );
  write('operator.html', html);
  return cases.filter(c => c.featured).length;
}

/* ------------------------------------------------------- work page buckets */

const bucketMeta = [
  { key: 'Entering', title: 'Entering new markets', blurb: 'Category creation, first-mover GTM, and strategy for spaces with no precedent.' },
  { key: 'Finding', title: 'Finding signal in noise', blurb: 'Cross-cultural research, consumer insight, and competitive intelligence.' },
  { key: 'Building', title: "Building what didn't exist", blurb: 'Frameworks, pilots, capabilities, and systems built from scratch.' }
];

function caseCard(c) {
  return `
            <a href="work/${c.slug}" class="case-card${c.highlight ? ' case-card-highlight' : ''}">
              ${c.highlight ? '<span class="case-card-star" aria-label="Highlight" title="Highlight project">★</span>' : ''}
              <span class="case-card-client">${c.client} · ${c.context}</span>
              <div class="case-card-q">${c.question}</div>
              <div class="case-card-sub">${c.subtitle}</div>
              <span class="case-card-arrow">→</span>
            </a>`;
}

function renderBucketRows() {
  const byBucket = {};
  bucketMeta.forEach(b => { byBucket[b.key] = []; });
  cases.forEach(c => { if (byBucket[c.category]) byBucket[c.category].push(c); });

  return bucketMeta.map(b => {
    const ordered = [...byBucket[b.key]].sort((a, z) => (z.highlight === true) - (a.highlight === true));
    return `
        <section class="case-bucket">
          <div class="case-bucket-head">
            <h2 class="case-bucket-title">${b.title}</h2>
            <svg class="bucket-route" aria-hidden="true" focusable="false"><use href="public/images/field-marks.svg#route" /></svg>
          </div>
          <p class="case-bucket-blurb">${b.blurb}</p>
          <div class="case-grid">${ordered.map(caseCard).join('')}
          </div>
        </section>`;
  }).join('') + '\n      ';
}

function buildWork() {
  let html = read('work.html');
  html = replaceBetween(
    html,
    '<!--BUILD:bucket-rows-->',
    '<!--/BUILD:bucket-rows-->',
    renderBucketRows()
  );
  write('work.html', html);
  return bucketMeta.length;
}

/* ----------------------------------------------------- Person JSON-LD */

function buildPerson() {
  const website = {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    "url": `${SITE}/`,
    "name": "Akshat Kharbanda",
    "publisher": { "@id": PERSON_ID }
  };
  const pages = {
    'index.html': { "@context": "https://schema.org", "@graph": [website, person] },
    'about.html': {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "url": `${SITE}/about`,
      "mainEntity": person
    }
  };
  for (const [file, obj] of Object.entries(pages)) {
    write(file, replaceBetween(read(file), '<!--BUILD:person-jsonld-->', '<!--/BUILD:person-jsonld-->', jsonLd(obj)));
  }
  return Object.keys(pages).length;
}

/* ------------------------------------------------------------- sitemap */

const sitemapPages = [
  ['index.html', '1.0'],
  ['operator.html', '0.95'],
  ['creator.html', '0.95'],
  ['about.html', '0.9'],
  ['work.html', '0.9'],
  ['resources.html', '0.9'],
  ['tools/adoption-scorecard.html', '0.8'],
  ['tools/first-agent-picker.html', '0.8'],
  ['method.html', '0.8'],
  ['writing.html', '0.8'],
  ['speaking.html', '0.8'],
  ['content.html', '0.7'],
  ['sidequests.html', '0.6']
];

function cleanUrl(file) {
  return file === 'index.html' ? `${SITE}/` : `${SITE}/${file.replace(/\.html$/, '')}`;
}

// Last-changed date for a hand-authored page. Uncommitted edits count as today.
// Vercel builds have no git history, so fall back to whatever the committed
// sitemap already says for that URL.
function lastmod(file, previous) {
  try {
    const dirty = execSync(`git status --porcelain -- "${file}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (dirty) return new Date().toISOString().slice(0, 10);
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (d) return d;
  } catch (e) { /* no git */ }
  return previous[cleanUrl(file)] || new Date().toISOString().slice(0, 10);
}

function buildSitemap() {
  const previous = {};
  try {
    const old = read('sitemap.xml');
    for (const m of old.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)) {
      previous[m[1].replace(/\.html$/, '').replace(/\/index$/, '/')] = m[2];
    }
  } catch (e) { /* first run */ }

  const urls = sitemapPages.map(([file, priority]) =>
    `  <url><loc>${cleanUrl(file)}</loc><lastmod>${lastmod(file, previous)}</lastmod><priority>${priority}</priority></url>`);
  cases.forEach(c => {
    urls.push(`  <url><loc>${SITE}/work/${c.slug}</loc><lastmod>${c.updated}</lastmod><priority>0.7</priority></url>`);
  });
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  return urls.length;
}

/* ------------------------------------------------------------------- run */

const template = read(path.join('work', '_template.html'));
const nPages = buildCasePages(template);
const nFeatured = buildIndex();
const nBuckets = buildWork();
const nPerson = buildPerson();
const nUrls = buildSitemap();

console.log(`build.js: ✓ ${nPages} case pages, ${nFeatured} featured cards, ${nBuckets} buckets, ${nPerson} person blocks, ${nUrls} sitemap URLs`);
