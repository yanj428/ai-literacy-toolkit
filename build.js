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
// It also writes sitemap.xml from the same list of routes.
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

// Every route also exists in Thai, at the same path under /th/. They are
// separate URLs, not a ?lang parameter on one URL, because a search engine
// treats a query string as the same page and a canonical link on it can name
// only one language. Thai copy for the head lives here; the Thai text on the
// page is already in index.html and js/lessons.js.
const TH_COPY = {
  '/': { title: 'คู่มือการเรียนรู้ AI: แผนการสอนฟรี ภาษาไทยและอังกฤษ',
       desc: 'บทเรียนความรู้เท่าทัน AI ฟรีสำหรับนักเรียนอายุ 11-14 ปี ทั้งภาษาไทยและอังกฤษ 5 บทเรียน ใช้สอนได้ทั้งในห้องเรียนที่มีและไม่มีเทคโนโลยี' },
  '/start/': { title: 'เริ่มต้นอย่างรวดเร็ว: สอนบทเรียน AI แรกของคุณ',
             desc: 'ห้าขั้นตอนและเวลาเตรียมตัวประมาณ 15 นาที เพื่อสอนบทเรียนความรู้เท่าทัน AI บทแรก ไม่ว่าห้องเรียนของคุณจะมีหรือไม่มีเทคโนโลยี' },
  '/lessons/': { title: 'บทเรียนทั้ง 5 บท: คู่มือการเรียนรู้ AI',
               desc: 'บทเรียนความรู้เท่าทัน AI พร้อมสอน 5 บท สำหรับอายุ 11-14 ปี แต่ละบทมีจุดประสงค์ รายการอุปกรณ์ กิจกรรม และคำถามสะท้อนคิด ทั้งภาษาไทยและอังกฤษ' },
  '/faq/': { title: 'คำถามที่ครูถามบ่อย: คู่มือการเรียนรู้ AI',
           desc: 'ต้องรู้เรื่อง AI ก่อนสอนไหม บทเรียนใช้เวลานานเท่าไร ต้องมีคอมพิวเตอร์ไหม คำตอบสำหรับครูที่ใช้ชุดบทเรียนนี้เป็นครั้งแรก' },
  '/curriculum/': { title: 'ความสอดคล้องกับหลักสูตร: คู่มือการเรียนรู้ AI',
                  desc: 'ผลการเรียนรู้ ทักษะ และหลักฐานการประเมินของแต่ละบทเรียน เทียบกับมาตรฐาน O3.1 ของหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พุทธศักราช 2551' },
  '/about/': { title: 'เกี่ยวกับเรา: คู่มือการเรียนรู้ AI',
             desc: 'ทำไม Youth of Change กลุ่มนักเรียนมัธยมปลาย จึงสร้างหลักสูตรความรู้เท่าทัน AI ฟรีสำหรับห้องเรียนมัธยมต้น ทั้งภาษาไทยและอังกฤษ' },
  '/contact/': { title: 'ติดต่อเรา: คู่มือการเรียนรู้ AI',
               desc: 'มีคำถาม ข้อเสนอแนะ หรืออยากทดลองสอนที่โรงเรียนของคุณ? ติดต่อ Youth of Change ได้เลย' },
  '/privacy/': { title: 'นโยบายความเป็นส่วนตัว: คู่มือการเรียนรู้ AI',
               desc: 'เว็บไซต์นี้เก็บและไม่เก็บข้อมูลอะไร: ไม่มีระบบสมาชิก ไม่มีสคริปต์วิเคราะห์ ไม่มีโฆษณา และไม่ใช้คุกกี้' },
};
const TH_SITE_NAME = 'คู่มือการเรียนรู้ AI';

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

// Each page, once in English and once in Thai. The Thai one lives under /th/
// and carries its own head; everything in the body is the same document, which
// holds both languages and shows one according to body[data-lang].
const thDuration = d => String(d).replace(/s*min$/, ' นาที');
const VARIANTS = PAGES.flatMap(spec => {
  const copy = spec.lesson
    ? { title: `${spec.lesson.title.th}: บทที่ ${spec.index + 1}, ${TH_SITE_NAME}`,
        desc: `${spec.lesson.short.th} บทเรียนความยาว ${thDuration(spec.lesson.duration)} สำหรับอายุ 11-14 ปี มีรายการอุปกรณ์ กิจกรรม และคำถามสะท้อนคิด ทั้งภาษาไทยและอังกฤษ` }
    : TH_COPY[spec.route];
  return [
    { ...spec, lang: 'en', enRoute: spec.route },
    { ...spec, lang: 'th', enRoute: spec.route, route: '/th' + spec.route, title: copy.title, desc: copy.desc },
  ];
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

function setHead(html, { title, desc, route, enRoute, lang }) {
  const url = SITE + route.slice(1);
  const enUrl = SITE + enRoute.slice(1);
  const thUrl = SITE + 'th' + enRoute;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${enUrl}$2`)
    .replace(/(<link rel="alternate" hreflang="th" href=")[^"]*(")/, `$1${thUrl}$2`)
    .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${enUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${lang === 'th' ? 'th_TH' : 'en_US'}$2`)
    .replace(/(<meta property="og:locale:alternate" content=")[^"]*(")/, `$1${lang === 'th' ? 'en_US' : 'th_TH'}$2`)
    .replace('<html lang="en">', `<html lang="${lang}">`);
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

  // The Thai pages describe themselves in Thai and stop there. The lesson, unit,
  // FAQ and how-to nodes are written from the English copy and keyed to the
  // English URLs, so repeating them here would claim the same resource twice.
  if (spec.lang === 'th') {
    page.inLanguage = 'th';
    return { '@context': 'https://schema.org', '@graph': graph };
  }

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

// Paths, relative to the repository, whose content this run changed. A changed
// page is one the sitemap should report as modified today, even though git
// has not seen the change yet.
const changed = new Set();

function writeIfChanged(file, html) {
  const full = path.join(ROOT, file);
  const before = fs.existsSync(full) ? fs.readFileSync(full, 'utf8') : null;
  // A Windows checkout has CRLF on disk, and that alone is not a change.
  const lf = s => s.replace(/\r\n/g, '\n');
  if (before !== null && lf(before) === lf(html)) return;
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  changed.add(file);
}

let written = 0;
for (const spec of VARIANTS) {
  const depth = spec.route === '/' ? 0 : spec.route.split('/').filter(Boolean).length;

  // The home page is index.html, which is the source and stays hand-edited.
  // Its structured data is the one exception: it is derived from the lesson
  // data and the FAQ copy, so maintaining a second copy by hand would only
  // let the two drift. Replacing just that block is idempotent, so a second
  // run produces no diff.
  if (spec.route === '/') {
    const home = setStructuredData(template, spec, template);
    if (home !== template) {
      writeIfChanged('index.html', home);
      process.stdout.write('  / (structured data only)\n');
    }
    continue;
  }

  let html = template;

  html = setHead(html, spec);
  html = setStructuredData(html, spec, template);
  html = html.replace('<body data-lang="en">', `<body data-lang="${spec.lang}" data-route="${spec.route}">`);
  html = setActivePage(html, spec.page);

  if (spec.lesson) {
    // Render the lesson so the page carries its text without waiting for JS.
    // No Technology is the default a first-time visitor sees; the script
    // re-renders in the reader's saved mode on load.
    const detail = view.lessonDetailHtml(spec.lesson, spec.index, spec.lang, 'notech');
    html = html.replace('<div class="modal" id="lesson-page-content"></div>',
                        `<div class="modal" id="lesson-page-content">${detail}</div>`);
  }

  html = rewriteRelativeUrls(html, depth);

  writeIfChanged(pageFile(spec.route), html);
  written++;
  process.stdout.write(`  ${spec.route}\n`);
}
console.log(`\n${written} route pages written from index.html`);

// ── Sitemap ────────────────────────────────────────────────────────────────
//
// Written from PAGES, so a route added above is listed without anyone having
// to remember the sitemap. It used to be kept by hand, and its dates fell
// behind the pages within a day.
//
// lastmod is the only field search engines use, and only while it stays
// truthful, so each date is the last time that file actually changed: today if
// this run or an uncommitted edit changed it, otherwise its last commit.
// changefreq and priority are left out because Google ignores both.

function pageFile(route) {
  return route === '/' ? 'index.html' : route.slice(1) + 'index.html';
}

const git = args => require('child_process')
  .execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  .trim();

// Without full history every file looks as if it changed in the latest commit,
// which would date the whole site to today. No date beats a wrong one.
let haveHistory = false;
try { haveHistory = git(['rev-parse', '--is-shallow-repository']) === 'false'; } catch (e) {}
if (!haveHistory) console.warn('No full git history here, so the sitemap is written without lastmod.');

const isoDay = d => d.toISOString().slice(0, 10);
const TODAY = isoDay(new Date());

function lastModified(file) {
  if (!haveHistory) return null;
  if (changed.has(file)) return TODAY;
  if (git(['status', '--porcelain', '--', file])) return TODAY;   // edited or untracked
  const t = git(['log', '-1', '--format=%ct', '--', file]);
  return t ? isoDay(new Date(Number(t) * 1000)) : TODAY;
}

const urlOf = file => SITE + (file === 'index.html' ? '' : file.replace(/index\.html$/, ''));

// A page is listed once per language, and each entry names both, as Google asks.
function sitemapEntry(file, pair) {
  const url = urlOf(file);
  const mod = lastModified(file);
  const lines = [`    <loc>${url}</loc>`];
  if (pair) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="en" href="${pair.en}"/>`,
      `    <xhtml:link rel="alternate" hreflang="th" href="${pair.th}"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${pair.en}"/>`);
  }
  if (mod) lines.push(`    <lastmod>${mod}</lastmod>`);
  return `  <url>\n${lines.join('\n')}\n  </url>`;
}

// Search engines index PDFs, so the slide decks and worksheets are listed too.
// Only files that exist: a lesson whose deck is still coming has nothing to list.
const documents = lessons
  .flatMap(l => [l.slidesFile && l.slidesFile.replace(/\.pptx$/, '.pdf'), l.worksheetFile])
  .filter(f => f && fs.existsSync(path.join(ROOT, f)));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Generated by build.js. Edit PAGES there, not this file.
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...PAGES.flatMap(p => {
     const en = pageFile(p.route), th = pageFile('/th' + p.route);
     const pair = { en: urlOf(en), th: urlOf(th) };
     return [sitemapEntry(en, pair), sitemapEntry(th, pair)];
   }),
   ...documents.map(f => sitemapEntry(f, null))].join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log(`sitemap.xml lists ${PAGES.length * 2} pages (English and Thai) and ${documents.length} PDFs`);
