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
 *
 * Runs on every Vercel deploy (see vercel.json "buildCommand"). Safe to run
 * repeatedly: output is deterministic and idempotent.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const cases = require('./data/cases.js');

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

/* ------------------------------------------------------- case page rendering */

// Mirrors the fallback template literal in work/_template.html so the JS-off
// output and the progressive-enhancement output are identical.
function renderCaseBody(c, prev, next) {
  return `
    <div class="case-hero">
      <a href="../work.html" class="case-back">← Back to work</a>
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
      </div>
    </div>

    <hr class="divider" />

    <div class="case-section">
      <p class="case-section-title">The problem</p>
      <p class="case-body">${c.problem}</p>
    </div>

    <div class="case-section">
      <p class="case-section-title">What I did</p>
      <p class="case-body">${c.what_i_did}</p>
    </div>

    <hr class="divider" />

    <div class="case-section">
      <p class="case-section-title">Outcomes</p>
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
      <p class="case-section-title">What I learned</p>
      ${c.learnings.map(l => `
        <div class="learning-item">
          <p class="learning-text">${l}</p>
        </div>
      `).join('')}
    </div>

    <hr class="divider" />

    <div class="cta-block">
      <p class="cta-title">Got a similar problem?</p>
      <p class="cta-sub">Tell me what you're working on — I'll tell you if it's a fit.</p>
      <div class="contact-form-mount" data-location="case_${c.slug}"></div>
      <p class="cta-fallback">Prefer email? <a href="mailto:workwithakshatkharbanda@gmail.com" onclick="if(typeof va==='function'){va('event',{name:'mailto_click',data:{location:'case_${c.slug}'}})}">workwithakshatkharbanda@gmail.com →</a></p>
    </div>

    <hr class="divider" />

    <div class="case-nav">
      ${prev ? `<a href="${prev.slug}.html" class="case-nav-btn">← ${prev.question.substring(0, 40)}…</a>` : '<span></span>'}
      ${next ? `<a href="${next.slug}.html" class="case-nav-btn">${next.question.substring(0, 40)}… →</a>` : '<span></span>'}
    </div>
  `;
}

function renderFaqJsonLd(c) {
  const outcomesSummary = c.outcomes.map(o => `${o.number} ${o.label}`).join(', ');
  const obj = {
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
  return `\n  <script type="application/ld+json">\n  ${JSON.stringify(obj)}\n  </script>\n  `;
}

function buildCasePages(template) {
  cases.forEach((c, i) => {
    const prev = i > 0 ? cases[i - 1] : null;
    const next = i < cases.length - 1 ? cases[i + 1] : null;

    const title = `${c.question} — Akshat Kharbanda`;
    const desc = `${c.subtitle}. Case study by Akshat Kharbanda, cross-cultural strategist and AI adoption consultant.`;
    const url = `https://akshatkharbanda.com/work/${c.slug}.html`;

    let html = template.replace(/\s*<!--TEMPLATE-NOTE[\s\S]*?TEMPLATE-NOTE-->/, '');
    html = replaceToken(html, '<head>', '<head>\n  <!-- Generated by build.js from work/_template.html + data/cases.js. Do not edit by hand. -->');
    html = replaceToken(html, '{{PAGE_TITLE}}', title);
    html = replaceToken(html, '{{PAGE_DESC}}', desc);
    html = replaceToken(html, '{{CANONICAL_URL}}', url);
    html = replaceBetween(html, '<!--BUILD:FAQ-->', '<!--/BUILD:FAQ-->', renderFaqJsonLd(c));
    html = replaceBetween(html, '<!--BUILD:START-->', '<!--BUILD:END-->', renderCaseBody(c, prev, next));

    write(path.join('work', `${c.slug}.html`), html);
  });
  return cases.length;
}

/* --------------------------------------------------- homepage featured cards */

function renderFeaturedCards() {
  const rows = cases.filter(c => c.featured).map(c => `
        <a href="work/${c.slug}.html" class="work-row">
          <span class="tag tag-${c.category}">${c.category}</span>
          <div class="work-row-body">
            <div class="work-row-q">${c.question}</div>
            <div class="work-row-meta">${c.client} · ${c.context}</div>
          </div>
          <div class="work-row-arrow">→</div>
        </a>`).join('');
  return rows + '\n      ';
}

function buildIndex() {
  let html = read('index.html');
  html = replaceBetween(
    html,
    '<!--BUILD:featured-cases-->',
    '<!--/BUILD:featured-cases-->',
    renderFeaturedCards()
  );
  write('index.html', html);
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
            <a href="work/${c.slug}.html" class="case-card${c.featured ? ' case-card-highlight' : ''}">
              ${c.featured ? '<span class="case-card-star" aria-label="Highlight" title="Highlight project">★</span>' : ''}
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
    const ordered = [...byBucket[b.key]].sort((a, z) => (z.featured === true) - (a.featured === true));
    return `
        <section class="case-bucket">
          <div class="case-bucket-head">
            <h2 class="case-bucket-title">${b.title}</h2>
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

/* ------------------------------------------------------------------- run */

const template = read(path.join('work', '_template.html'));
const nPages = buildCasePages(template);
const nFeatured = buildIndex();
const nBuckets = buildWork();

console.log(`build.js: ✓ ${nPages} case pages, ${nFeatured} featured cards, ${nBuckets} buckets`);
