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
  { route: '/lessons/', page: 'learn',
    title: 'All 5 lessons: AI Literacy Toolkit',
    desc: 'Five ready-to-teach AI literacy lessons for ages 11 to 14. Each has an objective, materials list, classroom activity and reflection questions, in English and Thai.' },
  { route: '/faq/', page: 'faq',
    title: 'Questions teachers ask: AI Literacy Toolkit',
    desc: 'Do you need to know about AI to teach this? How long is a lesson? Do you need computers? Answers for teachers running the toolkit for the first time.' },
  { route: '/curriculum/', page: 'curriculum',
    title: 'Curriculum alignment: AI Literacy Toolkit',
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

let written = 0;
for (const spec of PAGES) {
  const depth = spec.route === '/' ? 0 : spec.route.split('/').filter(Boolean).length;
  let html = template;

  html = setHead(html, spec);
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

  const dir = spec.route === '/' ? ROOT : path.join(ROOT, spec.route);
  fs.mkdirSync(dir, { recursive: true });
  // The home page is index.html itself, which is the source: never overwrite it.
  if (spec.route === '/') continue;
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  written++;
  process.stdout.write(`  ${spec.route}\n`);
}
console.log(`\n${written} route pages written from index.html`);
