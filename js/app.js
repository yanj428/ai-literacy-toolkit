// Routing, language/mode switching, and rendering.
// Depends on `lessons` from js/lessons.js, which must load first.

// Both preferences are remembered. Keep them in one place so neither can be
// silently dropped: switching language used to reload the page, which reset
// the classroom mode back to No Technology mid-lesson.
const PREFS = {
  lang: () => (localStorage.getItem('lang') === 'th' ? 'th' : 'en'),
  mode: () => (localStorage.getItem('mode') === 'tech' ? 'tech' : 'notech'),
};

// The language also lives in the address, so a link can carry it. Without this
// a Thai teacher sharing a lesson sent a link that opened in English for
// anyone whose own saved preference was English, which is most people.
//
// English is the default and stays out of the address, keeping the canonical
// URL clean; Thai is explicit. A ?lang in the address wins over the saved
// preference, because someone who follows a Thai link is asking for Thai.
function langFromUrl() {
  const v = new URLSearchParams(location.search).get('lang');
  return v === 'th' || v === 'en' ? v : null;
}

// Keeps the address showing the language actually on screen, so whatever the
// reader copies out of the address bar opens the way it looks to them.
function syncLangParam(lang) {
  const params = new URLSearchParams(location.search);
  if (lang === 'th') params.set('lang', 'th');
  else params.delete('lang');
  const q = params.toString();
  const url = location.pathname + (q ? '?' + q : '') + location.hash;
  if (url !== location.pathname + location.search + location.hash) {
    history.replaceState(null, '', url);
  }
}

let currentLang = 'en';
function setLang(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);
  for (const l of ['en', 'th']) {
    const btn = document.getElementById('lang-' + l);
    btn.classList.toggle('active', lang === l);
    btn.setAttribute('aria-pressed', String(lang === l));
  }
  document.documentElement.setAttribute('lang', lang);
  renderTopics();
  renderLessonCards();
  syncNavHeight();
  if (document.getElementById('page-lesson').classList.contains('active') && window.__openLessonId) {
    openLesson(window.__openLessonId, false);
  }
}

// Re-renders in place. Reloading would be enough to swap the language, but it
// also discards every other bit of state on the page.
function changeLang(lang) {
  localStorage.setItem('lang', lang);
  setLang(lang);
  syncLangParam(lang);
}

// Routes are real paths, and every one of them exists as a static file that
// build.js writes: /lessons/, /faq/, /lessons/what-is-ai/ and so on. A request
// therefore returns that page's own HTML, which is what makes the site
// indexable and what a reader sees before this script runs. From then on
// navigation is client-side.
//
// The site sits at a domain root locally and in a subdirectory on GitHub Pages,
// so the base cannot be hardcoded. Each generated page states its own route in
// body[data-route]; the base is whatever precedes it in the address.
const PAGE_ROUTES = { home: '/', start: '/start/', learn: '/lessons/', about: '/about/', contact: '/contact/', faq: '/faq/', curriculum: '/curriculum/', privacy: '/privacy/' };
const ROUTE_PAGES = { '/': 'home', '/start/': 'start', '/lessons/': 'learn', '/about/': 'about', '/contact/': 'contact', '/faq/': 'faq', '/curriculum/': 'curriculum', '/privacy/': 'privacy' };
const LESSON_ROUTE = '/lessons/';

const BASE = (() => {
  const route = document.body.dataset.route || '/';
  let path = location.pathname;
  if (!path.endsWith('/')) path += '/';
  return path.endsWith(route) ? path.slice(0, path.length - route.length + 1) : '/';
})();

// Relative URLs written into the page by the markup are rewritten by build.js
// so they climb back out of /lessons/what-is-ai/. Ones written by this script
// are not: the browser resolves them against the address bar, so a bare
// "assets/..." on a lesson page asks for /lessons/what-is-ai/assets/... and
// 404s. Anything this file injects has to be anchored to the site root.
function asset(p) { return BASE + p.replace(/^\/+/, ''); }

// Route for whatever address we are on now.
function currentRoute() {
  let path = location.pathname;
  if (!path.endsWith('/')) path += '/';
  const route = path.startsWith(BASE) ? '/' + path.slice(BASE.length) : '/';
  return route === '//' ? '/' : route;
}

// The route currently on screen. Tracked so a path we write ourselves is not
// then routed a second time.
let _renderedRoute = null;

function setRoute(route, replace = false) {
  _renderedRoute = route;
  const url = BASE + route.slice(1) + location.search;
  if (location.pathname + location.search === url) return;
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
}

// Page-navigation buttons only. The EN/TH toggle also lives in .nav-links,
// and clearing its .active would drop the selected-language highlight.
const NAV_PAGE_BUTTONS = '.nav-links > li:not(.lang-toggle) button';

// The feedback form is a Google iframe. loading="lazy" does not defer an
// iframe inside a display:none page, so the URL is parked in data-src and only
// becomes src when someone actually opens Contact. Without this every visitor
// hits Google on page load, which the privacy policy says does not happen.
function mountContactForm() {
  const f = document.querySelector('.contact-form-embed[data-src]');
  if (!f) return;
  f.src = f.dataset.src;
  f.removeAttribute('data-src');
}

function showPage(id, updateUrl = true) {
  if (id === 'contact') mountContactForm();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll(NAV_PAGE_BUTTONS).forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  const btn = document.getElementById('nav-' + id);
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
  }
  window.scrollTo(0, 0);
  focusPageHeading(document.getElementById('page-' + id), 'page:' + id);
  if (updateUrl) setRoute(PAGE_ROUTES[id] || '/');
}

// Render whatever the current address points at. Unknown routes and unknown
// lesson ids fall back to home rather than leaving the previous page on screen.
function routeToCurrentPath() {
  const route = currentRoute();
  if (route === _renderedRoute) return;
  _renderedRoute = route;
  if (route.startsWith(LESSON_ROUTE) && route.length > LESSON_ROUTE.length) {
    if (openLesson(route.slice(LESSON_ROUTE.length).replace(/\/$/, ''), false)) return;
    setRoute('/', true);   // unknown lesson id
  }
  showPage(ROUTE_PAGES[currentRoute()] || 'home', false);
}

// --nav-h drives everything that has to clear the sticky header. Measure it
// instead of trusting the 80px guessed in the stylesheet: it shifts with the
// viewport, with the language, and with any nav item added later. A stale
// value here is what let the lesson table of contents sit on the header.
function syncNavHeight() {
  const nav = document.querySelector('body > nav');
  if (!nav) return;
  const h = Math.round(nav.getBoundingClientRect().height);
  if (h) document.documentElement.style.setProperty('--nav-h', h + 'px');
}
window.addEventListener('resize', syncNavHeight);

// The skip link cannot be an <a href="#main">: the router owns the hash, and
// setting it would navigate. Move focus instead.
function skipToContent() {
  const page = document.querySelector('.page.active');
  if (!page) return;
  page.setAttribute('tabindex', '-1');
  page.focus({ preventScroll: true });
  page.scrollIntoView({ block: 'start' });
}

// Changing page here swaps the DOM but moves nothing else. A sighted reader
// sees the new page; a screen reader user is told nothing and is left reading
// the page they just left, and a keyboard user carries on tabbing from wherever
// they were in the old one. Moving focus to the new page's heading fixes both:
// the heading is announced, and tabbing continues from the top of what is now
// on screen.
//
// preventScroll because the caller decides where the page sits; focus() would
// otherwise fight it. Programmatic focus does not match :focus-visible, so no
// ring appears on the heading for mouse users, while a keyboard user who tabs
// back to it still gets one.
let _booted = false;
let _announced = null;
function focusPageHeading(page, key) {
  if (!_booted || !page) return;    // never steal focus on first load
  // Only on an actual navigation. Switching language or classroom mode
  // re-renders the open lesson through this same path, and pulling focus off
  // the toggle someone just pressed would announce the lesson title instead of
  // what their press did.
  if (key === _announced) return;
  _announced = key;
  const target = page.querySelector('h1, h2') || page;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

// Back and forward across our own pushState entries.
window.addEventListener('popstate', () => routeToCurrentPath());




let currentMode = 'notech';
function setMode(mode) {
  // The toggle inside a lesson is part of the markup openLesson re-renders, so
  // pressing it destroys the button being pressed and focus falls to the body.
  // Note where it was and put it back on the replacement.
  const fromLessonToggle = !!(document.activeElement && document.activeElement.closest('.modal-mode-toggle'));

  currentMode = mode;
  localStorage.setItem('mode', mode);
  document.querySelectorAll('.mode-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
  });
  renderLessonCards();
  if (document.getElementById('page-lesson').classList.contains('active') && window.__openLessonId) {
    openLesson(window.__openLessonId, false);
    if (fromLessonToggle) {
      const again = document.querySelector(`.modal-mode-toggle button[data-mode="${mode}"]`);
      if (again) again.focus({ preventScroll: true });
    }
  }
}

// The cards are <button>s, so their contents become the accessible name. Left
// alone that reads as one long run-on ("🧠 ⏱ 40–50 min What Is AI? A first
// look… Lesson 1 Open →"), so each card gets an explicit label instead, and
// the decorative emoji are hidden from assistive tech.
function cardLabel(kind, i, title) {
  const n = i + 1;
  if (currentLang === 'th') {
    return kind === 'lesson' ? `เปิดบทที่ ${n}: ${title}` : `ดูบทเรียนทั้งหมด: ${title}`;
  }
  return kind === 'lesson' ? `Open Lesson ${n}: ${title}` : `Browse lessons: ${title}`;
}

function renderTopics() {
  const grid = document.getElementById('topics-grid');
  grid.innerHTML = lessons.map((l, i) => {
    const title = l.title[currentLang] || l.title.en;
    return `
    <button type="button" class="topic-card" onclick="showPage('learn')" aria-label="${cardLabel('topic', i, title)}">
      <span class="topic-icon" style="background:${swatch(i)};" aria-hidden="true">${l.icon}</span>
      <span class="card-title">${title}</span>
      <span class="card-text">${l.short[currentLang] || l.short.en}</span>
    </button>
  `;
  }).join('');
}

function renderLessonCards() {
  const grid = document.getElementById('lessons-grid');
  grid.innerHTML = lessons.map((l, i) => {
    const title = l.title[currentLang] || l.title.en;
    const label = cardLabel('lesson', i, title);
    if (l.image) {
      const imgSrc = asset((currentLang === 'th' && l.imageTh) ? l.imageTh : l.image);
      return `
    <button type="button" class="lesson-card lesson-card-photo" style="aspect-ratio:${l.imageRatio || 'auto'}" onclick="openLesson('${l.id}')" aria-label="${label}">
      <img class="lesson-photo-img" src="${imgSrc}" alt="" loading="lazy" decoding="async" />
    </button>
  `;
    }
    return `
    <button type="button" class="lesson-card" onclick="openLesson('${l.id}')" aria-label="${label}">
      <span class="lesson-header">
        <span class="lesson-icon" aria-hidden="true">${l.icon}</span>
        <span class="lesson-duration">⏱ ${l.duration}</span>
      </span>
      <span class="card-title">${title}</span>
      <span class="card-text">${l.short[currentLang] || l.short.en}</span>
      <span class="lesson-footer">
        <span class="badge" style="background:${swatch(i)};color:${swatchText(i)};">${currentLang==='th' ? 'บทที่ '+(i+1) : 'Lesson '+(i+1)}</span>
        <span class="lesson-open">${currentLang==='th' ? 'เปิดดู →' : 'Open →'}</span>
      </span>
      <span class="lesson-tags">
        <span class="mini-tag ${currentMode==='notech' ? 'mini-tag-active' : ''}">📴 ${currentLang==='th' ? 'ไม่ใช้เทคโนโลยี' : 'No Technology'}</span>
        <span class="mini-tag ${currentMode==='tech' ? 'mini-tag-active' : ''}">💻 ${currentLang==='th' ? 'ใช้เทคโนโลยี' : 'Technology'}</span>
      </span>
    </button>
  `;
  }).join('');
}

function setActiveTocLink(link) {
  document.querySelectorAll('.lesson-toc-link').forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}
function goToTocSection(e, link) {
  e.preventDefault();
  setActiveTocLink(link);
  link.blur();
  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  setTimeout(() => {
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
  return false;
}

// Lessons reference a slide deck by path, but the .pptx files are not all in
// the repo yet. Probing the file keeps a missing deck from rendering an Office
// viewer pointed at a 404, and means a deck starts working the moment it is
// committed, with no change needed here.
const _slidesExist = new Map();   // absolute url -> boolean

function slidesPlaceholder() {
  return `<p class="lesson-extra-placeholder"><span class="en-text" lang="en">Slide deck coming soon.</span><span class="th-text" lang="th">สไลด์กำลังจะมาเร็ว ๆ นี้</span></p>`;
}

function slidesEmbed(pptxUrl, pdfUrl) {
  // The preview stays on the Office viewer even when a PDF exists: it streams
  // the deck, where embedding the PDF would push the whole file (16MB for
  // lesson 1) at anyone who opens the page.
  const viewer = pptxUrl
    ? `<iframe class="lesson-slides-embed" src="https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptxUrl)}" title="Slides">Loading…</iframe>`
    : '';
  // PDF first: it opens on any device, prints as-is, and needs no PowerPoint.
  const pdf = pdfUrl
    ? `<a class="lesson-download-btn" href="${pdfUrl}" download>⬇ <span class="en-text" lang="en">Download Slides (PDF)</span><span class="th-text" lang="th">ดาวน์โหลดสไลด์ (PDF)</span></a>`
    : '';
  const pptx = pptxUrl
    ? `<a class="lesson-download-btn lesson-download-alt" href="${pptxUrl}" download>⬇ <span class="en-text" lang="en">Download Slides (.pptx)</span><span class="th-text" lang="th">ดาวน์โหลดสไลด์ (.pptx)</span></a>`
    : '';
  return `${viewer}<div class="lesson-download-row">${pdf}${pptx}</div>`;
}

function worksheetPlaceholder() {
  return `<p class="lesson-extra-placeholder"><span class="en-text" lang="en">Printable worksheet coming soon.</span><span class="th-text" lang="th">ใบงานพิมพ์ได้กำลังจะมาเร็ว ๆ นี้</span></p>`;
}

// The worksheet is one page, so what a teacher wants first is simply to see
// it. An image of the page shows that in full at a glance; embedding the PDF
// instead wrapped it in the browser's reader chrome - toolbar, page thumbnail
// rail, zoom controls - which is a lot of furniture around a single sheet.
// The PDF is still what they download and print, from the buttons below.
function worksheetEmbed(url, preview) {
  const alt = currentLang === 'th' ? 'ตัวอย่างใบงาน' : 'Worksheet preview';
  const img = preview
    ? `<a class="lesson-worksheet-preview" href="${url}" target="_blank" rel="noopener" title="${alt}">
        <img src="${asset(preview)}" alt="${alt}" loading="lazy" decoding="async" width="1200" height="1553">
      </a>`
    : '';
  return `${img}
    <div class="lesson-download-row">
      <a class="lesson-download-btn" href="${url}" download>⬇ <span class="en-text" lang="en">Download Worksheet (PDF)</span><span class="th-text" lang="th">ดาวน์โหลดใบงาน (PDF)</span></a>
      <a class="lesson-download-btn lesson-download-alt" href="${url}" target="_blank" rel="noopener">🖨 <span class="en-text" lang="en">Open to print</span><span class="th-text" lang="th">เปิดเพื่อพิมพ์</span></a>
    </div>
    <p class="lesson-extra-note en-text" lang="en">One page, English only for now. Print one per student.</p>
    <p class="lesson-extra-note th-text" lang="th">หนึ่งหน้า ขณะนี้มีเฉพาะภาษาอังกฤษ พิมพ์คนละหนึ่งแผ่น</p>`;
}

async function fileExists(url) {
  if (_slidesExist.get(url)) return true;
  let ok = false;
  try {
    ok = (await fetch(url, { method: 'HEAD' })).ok;
  } catch (e) {
    ok = false;
  }
  // Only successes are cached. A probe can fail for transient network reasons,
  // and remembering that would hide a deck that is really there for the rest of
  // the visit; re-probing a missing file costs one HEAD request.
  if (ok) _slidesExist.set(url, true);
  return ok;
}

// Renders the placeholder first and upgrades to the embed only once a file is
// confirmed to exist, so a missing deck never flashes a broken viewer.
async function renderSlides(el, lesson) {
  el.innerHTML = slidesPlaceholder();
  if (!lesson.slidesFile) return;
  // Both the Office viewer and a download need a URL reachable over the
  // network, so there is nothing to offer when opened from disk.
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

  // Absolute, because the Office viewer is handed this URL over the network.
  const pptxUrl = new URL(asset(lesson.slidesFile), location.origin).href;
  const pdfUrl = pptxUrl.replace(/\.pptx$/, '.pdf');
  const [hasPptx, hasPdf] = await Promise.all([fileExists(pptxUrl), fileExists(pdfUrl)]);

  // The reader may have moved to another lesson while the probes were in flight.
  if (window.__openLessonId !== lesson.id) return;
  if (!hasPptx && !hasPdf) return;
  el.innerHTML = slidesEmbed(hasPptx ? pptxUrl : '', hasPdf ? pdfUrl : '');
}

// Same shape as renderSlides: placeholder first, embed only once the file is
// confirmed, so a lesson without a worksheet still reads correctly.
async function renderWorksheet(el, lesson) {
  el.innerHTML = worksheetPlaceholder();
  if (!lesson.worksheetFile) return;
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

  const url = new URL(asset(lesson.worksheetFile), location.origin).href;
  if (!(await fileExists(url))) return;
  if (window.__openLessonId !== lesson.id) return;
  el.innerHTML = worksheetEmbed(url, lesson.worksheetPreview);
}

// Returns false if `id` matches no lesson, so callers can fall back.
function openLesson(id, updateUrl = true) {
  const l = lessons.find(x => x.id === id);
  if (!l) return false;
  window.__openLessonId = id;
  const t = currentLang;
  const i = lessons.indexOf(l);
  const html = lessonDetailHtml(l, i, t, currentMode);
  document.getElementById('lesson-page-content').innerHTML = html;
  renderSlides(document.getElementById('lesson-slides-content'), l);
  renderWorksheet(document.getElementById('lesson-worksheet-content'), l);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-lesson').classList.add('active');
  document.querySelectorAll(NAV_PAGE_BUTTONS).forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  const navBtn = document.getElementById('nav-learn');
  if (navBtn) {
    navBtn.classList.add('active');
    navBtn.setAttribute('aria-current', 'page');
  }
  document.querySelectorAll('.lesson-toc-link').forEach((a, i) => a.classList.toggle('active', i === 0));
  window.scrollTo(0, 0);
  focusPageHeading(document.getElementById('lesson-page-content'), 'lesson:' + id);
  if (updateUrl) setRoute(LESSON_ROUTE + id + '/');
  return true;
}

// setLang and setMode each render the cards and sync their own toggles, so
// restoring the saved preferences is all the bootstrapping the UI needs.
// A language named in the address also becomes the saved preference: following
// a Thai link once should not leave the rest of the site in English.
const _urlLang = langFromUrl();
if (_urlLang) localStorage.setItem('lang', _urlLang);
setLang(_urlLang || PREFS.lang());
setMode(PREFS.mode());
syncLangParam(currentLang);
syncNavHeight();
// Links written while routes lived in the hash are still out there, in chat
// messages and bookmarks. Turn #/lessons into the real path once, before
// routing, so they land on the right page with a clean address.
if (location.hash.startsWith('#/')) {
  const legacy = location.hash.slice(2).replace(/\/$/, '');
  history.replaceState(null, '', BASE + (legacy ? legacy + '/' : '') + location.search);
}

routeToCurrentPath();
_booted = true;

// Offline support. Registered after the page is interactive so it never
// competes with the first render. The URL goes through asset(): a bare 'sw.js'
// is resolved against the page, so on /lessons/what-is-ai/ it asked for a
// worker that is not there and the registration quietly failed. Only someone
// who arrived at the home page ever got an offline copy, and a shared link or
// a search result lands on a deeper page.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(asset('sw.js')).catch(() => {
      // A failed registration is not worth bothering anyone about: the site
      // works exactly as before, just without the offline copy.
    });
  });
}
