#!/usr/bin/env node
//
// Writes a real HTML file for every route, so that /lessons/what-is-ai/ is a
// page a server can return and a crawler can read, rather than a shape the
// browser only takes on after JavaScript runs.
//
// index.html stays the source of truth and is still a working site on its own.
// Each generated page is that same document with three changes: the right
// section marked active, the lesson markup already rendered where there is one,
// and the head rewritten to describe that page rather than the home page.
//
// No dependencies. Run it after editing index.html or js/lessons.js:
//
//     node build.js
//
'use strict';

const fs = require('fs');
const path = require('path');

const SITE = 'https://yanj428.github.io/ai-literacy-toolkit/';
const ROOT = __dirname;

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// The lesson data and the lesson template are the ones the browser uses. They
// are evaluated rather than imported so that neither file needs to know it is
// also being read by a build.
const lessons = eval(read('js/lessons.js') + '; lessons');
const view = {};
(function () {
  const module = { exports: {} };
  eval(read('js/lesson-view.js'));
  Object.assign(view, module.exports);
})();

const template = read('index.html');

// Every route, with the copy that describes it. Titles and descriptions are
// per page because that is what a search result and a shared link show.
const PAGES = [
  { route: '/', page: 'home',
    title: 'AI Literacy Toolkit: free lesson plans in English and Thai',
    desc: 'Free, ready-to-teach AI literacy lessons for ages 11 to 14, in English and Thai. Five lessons designed to work with or without classroom technology.' },
  { route: '/start/', page: 'start',
    title: 'Quick start: teach your first AI lesson',
    desc: 'Five steps and about fifteen minutes of preparation to teach your first AI literacy lesson, with or without classroom technology.' },
  { route: '/lessons/', page: 'learn',
    title: 'All 5 lessons: AI Literacy Toolkit',
    desc: 'Five ready-to-teach AI literacy lessons for ages 11 to 14. Each has an objective, materials list, classroom activity and reflection questions, in English and Thai.' },
  { route: '/faq/', page: 'faq',
    title: 'Questions teachers ask: AI Literacy Toolkit',
    desc: 'Do you need to know about AI to teach this? How long is a lesson? Do you need computers? Answers for teachers running the toolkit for the first time.' },
  { route: '/curriculum/', page: 'curriculum',
    title: 'Curriculum Alignment: AI Literacy Toolkit',
    desc: 'Learning outcomes, skills and assessment evidence for each lesson, mapped to Standard O3.1 of the Basic Education Core Curriculum B.E. 2551.' },
  { route: '/about/', page: 'about',
    title: 'About: AI Literacy Toolkit',
    desc: 'Why Youth of Change, a group of high school students, built a free AI literacy curriculum for middle school classrooms in English and Thai.' },
  { route: '/contact/', page: 'contact',
    title: 'Contact us: AI Literacy Toolkit',
    desc: 'Questions, feedback, or want to run a pilot lesson at your school? Get in touch with Youth of Change.' },
  { route: '/privacy/', page: 'privacy',
    title: 'Privacy policy: AI Literacy Toolkit',
    desc: 'What this site does and does not collect: no accounts, no analytics, no advertising, and no cookies.' },
];

lessons.forEach((l, i) => {
  PAGES.push({
    route: `/lessons/${l.id}/`,
    page: 'lesson',
    lesson: l,
    index: i,
    title: `${l.title.en}: Lesson ${i + 1}, AI Literacy Toolkit`,
    desc: `${l.short.en} A ${l.duration} lesson for ages 11 to 14, with materials, activity and reflection questions in English and Thai.`,
  });
});

// A page at /lessons/what-is-ai/ is three levels below the site root, so its
// relative links need to climb back out. Absolute, protocol and fragment URLs
// are left alone.
function rewriteRelativeUrls(html, depth) {
  if (depth === 0) return html;
  const up = '../'.repeat(depth);
  return html.replace(/(\s(?:src|href))="(?!https?:|\/\/|\/|#|mailto:|data:)([^"]+)"/g,
                      (_, attr, url) => `${attr}="${up}${url}"`);
}

function setActivePage(html, pageId) {
  // Only one section is active in a generated page, and it is not always home.
  html = html.replace('<div id="page-home" class="page active">', '<div id="page-home" class="page">');
  return html.replace(`<div id="page-${pageId}" class="page">`, `<div id="page-${pageId}" class="page active">`);
}

function setHead(html, { title, desc, route }) {
  const url = SITE + route.slice(1);
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="alternate" hreflang="th" href=")[^"]*(")/, `$1${url}?lang=th$2`)
    .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
}

// ── Structured data ────────────────────────────────────────────────────────
//
// Search engines cannot tell from the markup alone that this is a set of free
// bilingual lesson plans for a particular age group. Saying so in schema.org
// terms is what lets a result show as something other than a blue link.
//
// The FAQ and quick start entries are read back out of index.html rather than
// retyped here: two copies of the same wording would drift, and stale
// structured data is worse than none.

const ORG_ID = SITE + '#org';
const UNIT_ID = SITE + 'lessons/#unit';

const stripTags = h => h
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ').trim();

// The English half of a bilingual block. Thai sits in a sibling .th-text span,
// and schema.org has no clean way to carry both, so the markup's own language
// split is honoured and English is what gets described.
const englishOnly = h => {
  const en = [...h.matchAll(/<span class="en-text"[^>]*>([\s\S]*?)<\/span>/g)].map(m => m[1]);
  return stripTags(en.length ? en.join(' ') : h);
};

function section(html, id) {
  const i = html.indexOf(`<div id="page-${id}"`);
  if (i < 0) return '';
  const j = html.indexOf('<footer>', i);
  return html.slice(i, j < 0 ? html.length : j);
}

function faqEntries(html) {
  const body = section(html, 'faq');
  const out = [];
  const re = /<h2>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2>|$)/g;
  let m;
  while ((m = re.exec(body))) {
    const question = englishOnly(m[1]);
    const answer = [...m[2].matchAll(/<p class="en-text"[^>]*>([\s\S]*?)<\/p>/g)]
      .map(p => stripTags(p[1])).join(' ');
    if (question && answer) out.push({ question, answer });
  }
  return out;
}

function quickStartSteps(html) {
  const body = section(html, 'start');
  const out = [];
  const re = /<li class="quickstart-step">([\s\S]*?)<\/li>/g;
  let m;
  while ((m = re.exec(body))) {
    const h = m[1].match(/<h2>([\s\S]*?)<\/h2>/);
    const p = m[1].match(/<p class="en-text"[^>]*>([\s\S]*?)<\/p>/);
    if (h && p) out.push({ name: englishOnly(h[1]), text: stripTags(p[1]) });
  }
  return out;
}

// "40–50 min" → PT40M. The range's lower bound is the honest single value.
function isoDuration(d) {
  const n = String(d).match(/\d+/);
  return n ? `PT${n[0]}M` : undefined;
}

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Youth of Change',
  description: 'A group of high school students writing free AI literacy lessons for middle school classrooms.',
  url: SITE,
  logo: { '@type': 'ImageObject', url: SITE + 'assets/icon-512.png', width: 512, height: 512 },
  sameAs: ['https://instagram.com/youthofchange_th'],
  email: 'youthofchange8@gmail.com',
};

const website = {
  '@type': 'WebSite',
  '@id': SITE + '#website',
  name: 'AI Literacy Toolkit',
  url: SITE,
  inLanguage: ['en', 'th'],
  publisher: { '@id': ORG_ID },
};

function lessonNode(spec) {
  const l = spec.lesson, url = SITE + spec.route.slice(1);
  const parts = [];
  if (l.slidesFile) parts.push({
    '@type': 'DigitalDocument', name: `${l.title.en} slides`,
    url: SITE + l.slidesFile.replace(/\.pptx$/, '.pdf'), encodingFormat: 'application/pdf',
  });
  if (l.worksheetFile) parts.push({
    '@type': 'DigitalDocument', name: `${l.title.en} worksheet`,
    url: SITE + l.worksheetFile, encodingFormat: 'application/pdf',
  });
  return {
    '@type': 'LearningResource',
    '@id': url + '#lesson',
    name: l.title.en,
    description: spec.desc,
    url,
    inLanguage: ['en', 'th'],
    learningResourceType: 'Lesson plan',
    educationalUse: 'instruction',
    educationalLevel: 'Middle school',
    typicalAgeRange: '11-14',
    timeRequired: isoDuration(l.duration),
    teaches: l.objective.en,
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': UNIT_ID },
    position: spec.index + 1,
    ...(parts.length ? { hasPart: parts } : {}),
  };
}

function unitNode() {
  return {
    '@type': ['ItemList', 'LearningResource'],
    '@id': UNIT_ID,
    name: 'AI Explorers: a five-lesson AI literacy unit',
    description: 'Five ready-to-teach AI literacy lessons for ages 11 to 14, in English and Thai.',
    url: SITE + 'lessons/',
    inLanguage: ['en', 'th'],
    learningResourceType: 'Unit plan',
    typicalAgeRange: '11-14',
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by-nc/4.0/',
    numberOfItems: lessons.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: lessons.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE}lessons/${l.id}/`,
      name: l.title.en,
    })),
  };
}

function structuredData(spec, template) {
  const url = SITE + spec.route.slice(1);
  const page = {
    '@type': 'WebPage',
    '@id': url + '#page',
    url,
    name: spec.title,
    description: spec.desc,
    inLanguage: 'en',
    isPartOf: { '@id': SITE + '#website' },
    about: { '@id': ORG_ID },
  };
  const graph = [organization, website, page];

  if (spec.page === 'lesson') {
    graph.push(lessonNode(spec));
    page.mainEntity = { '@id': url + '#lesson' };
  } else if (spec.page === 'learn') {
    graph.push(unitNode());
    page.mainEntity = { '@id': UNIT_ID };
  } else if (spec.page === 'home') {
    graph.push(unitNode());
  } else if (spec.page === 'faq') {
    const entries = faqEntries(template);
    if (entries.length) {
      page['@type'] = ['WebPage', 'FAQPage'];
      page.mainEntity = entries.map(e => ({
        '@type': 'Question',
        name: e.question,
        acceptedAnswer: { '@type': 'Answer', text: e.answer },
      }));
    }
  } else if (spec.page === 'start') {
    const steps = quickStartSteps(template);
    if (steps.length) {
      graph.push({
        '@type': 'HowTo',
        '@id': url + '#howto',
        name: 'Teach your first AI literacy lesson',
        description: spec.desc,
        totalTime: 'PT15M',
        step: steps.map((s, i) => ({
          '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text, url: `${url}#step-${i + 1}`,
        })),
      });
      page.mainEntity = { '@id': url + '#howto' };
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function setStructuredData(html, spec, template) {
  const json = JSON.stringify(structuredData(spec, template), null, 2)
    // A literal </script> inside JSON-LD would end the block early. Nothing
    // here contains one today; this keeps that true if the copy changes.
    .replace(/<\//g, '<\\/');
  return html.replace(
    /(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/,
    (_, open, close) => open + '\n' + json + '\n  ' + close);
}

let written = 0;
for (const spec of PAGES) {
  const depth = spec.route === '/' ? 0 : spec.route.split('/').filter(Boolean).length;

  // The home page is index.html, which is the source and stays hand-edited.
  // Its structured data is the one exception: it is derived from the lesson
  // data and the FAQ copy, so maintaining a second copy by hand would only
  // let the two drift. Replacing just that block is idempotent, so a second
  // run produces no diff.
  if (spec.route === '/') {
    const home = setStructuredData(template, spec, template);
    if (home !== template) {
      fs.writeFileSync(path.join(ROOT, 'index.html'), home);
      process.stdout.write('  / (structured data only)\n');
    }
    continue;
  }

  let html = template;

  html = setHead(html, spec);
  html = setStructuredData(html, spec, template);
  html = html.replace('<body data-lang="en">', `<body data-lang="en" data-route="${spec.route}">`);
  html = setActivePage(html, spec.page);

  if (spec.lesson) {
    // Render the lesson so the page carries its text without waiting for JS.
    // English and No Technology are the defaults a first-time visitor sees; the
    // script re-renders in the reader's saved language and mode on load.
    const detail = view.lessonDetailHtml(spec.lesson, spec.index, 'en', 'notech');
    html = html.replace('<div class="modal" id="lesson-page-content"></div>',
                        `<div class="modal" id="lesson-page-content">${detail}</div>`);
  }

  html = rewriteRelativeUrls(html, depth);

  const dir = path.join(ROOT, spec.route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  written++;
  process.stdout.write(`  ${spec.route}\n`);
}
console.log(`\n${written} route pages written from index.html`);
