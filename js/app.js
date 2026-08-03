// Routing, language/mode switching, and rendering.
// Depends on `lessons` from js/lessons.js, which must load first.

// Both preferences are remembered. Keep them in one place so neither can be
// silently dropped: switching language used to reload the page, which reset
// the classroom mode back to No Technology mid-lesson.
const PREFS = {
  lang: () => (localStorage.getItem('lang') === 'th' ? 'th' : 'en'),
  mode: () => (localStorage.getItem('mode') === 'tech' ? 'tech' : 'notech'),
};

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
  if (document.getElementById('page-lesson').classList.contains('active') && window.__openLessonId) {
    openLesson(window.__openLessonId, false);
  }
}

// Re-renders in place. Reloading would be enough to swap the language, but it
// also discards every other bit of state on the page.
function changeLang(lang) {
  localStorage.setItem('lang', lang);
  setLang(lang);
}

// Routes live in the hash (#/lessons, #/lessons/what-is-ai) rather than the
// path. The site is served from a subdirectory on GitHub Pages
// (/ai-literacy-toolkit/), and path-based routing would both rewrite the URL
// to the wrong place and 404 on reload, since there is no server-side rewrite
// to index.html. Hashes need no server config and work from any base path,
// including file://.
const PAGE_ROUTES = { home: '/', learn: '/lessons', about: '/about', contact: '/contact', privacy: '/privacy' };
const ROUTE_PAGES = { '/': 'home', '/lessons': 'learn', '/about': 'about', '/contact': 'contact', '/privacy': 'privacy' };
const LESSON_ROUTE = '/lessons/';

// Page-navigation buttons only. The EN/TH toggle also lives in .nav-links,
// and clearing its .active would drop the selected-language highlight.
const NAV_PAGE_BUTTONS = '.nav-links > li:not(.lang-toggle) button';

// Current route, normalised to a leading slash. '' (no hash) means home.
function currentRoute() {
  const h = location.hash.replace(/^#/, '');
  return h.startsWith('/') ? h : '/' + h;
}

// The route currently on screen. Tracked so that the hash we write ourselves
// doesn't get routed a second time by the listeners below.
let _renderedRoute = null;

function setRoute(route, replace = false) {
  _renderedRoute = route;
  if (currentRoute() === route) return;
  const url = location.pathname + location.search + '#' + route;
  if (replace) history.replaceState(null, '', url);
  else history.pushState(null, '', url);
}

function showPage(id, updateUrl = true) {
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
  if (updateUrl) setRoute(PAGE_ROUTES[id] || '/');
}

// Render whatever the current hash points at. Unknown routes and unknown
// lesson ids fall back to home rather than leaving the previous page on screen.
function routeToCurrentHash() {
  const route = currentRoute();
  if (route === _renderedRoute) return;
  _renderedRoute = route;
  if (route.startsWith(LESSON_ROUTE) && route.length > LESSON_ROUTE.length) {
    if (openLesson(route.slice(LESSON_ROUTE.length), false)) return;
    setRoute('/', true);   // unknown lesson id
  }
  showPage(ROUTE_PAGES[currentRoute()] || 'home', false);
}

// Back/forward across our own pushState entries fires popstate; an edited or
// pasted hash fires hashchange. Both funnel through the same handler, which
// no-ops when the route is already on screen.
window.addEventListener('popstate', () => routeToCurrentHash());
window.addEventListener('hashchange', () => routeToCurrentHash());

const colors = ['#E1E6FD','#DCE3FB','#E6E9FE','#ECE5FD','#EFE8FE'];
const colorsText = ['#2E43E6','#1B2361','#3B4FE0','#6C3CE0','#7B2FE0'];


let currentMode = 'notech';
function setMode(mode) {
  currentMode = mode;
  localStorage.setItem('mode', mode);
  document.querySelectorAll('.mode-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
  });
  renderLessonCards();
  if (document.getElementById('page-lesson').classList.contains('active') && window.__openLessonId) {
    openLesson(window.__openLessonId, false);
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
      <span class="topic-icon" style="background:${colors[i]};" aria-hidden="true">${l.icon}</span>
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
      const imgSrc = (currentLang === 'th' && l.imageTh) ? l.imageTh : l.image;
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
        <span class="badge" style="background:${colors[i]};color:${colorsText[i]};">${currentLang==='th' ? 'บทที่ '+(i+1) : 'Lesson '+(i+1)}</span>
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

function renderContentBlock(b, t) {
  const text = b.text ? `<p>${b.text[t] || b.text.en}</p>` : '';
  const items = b.items ? `<ul>${(b.items[t] || b.items.en).map(p => `<li>${p}</li>`).join('')}</ul>` : '';
  const link = b.link ? `<p><a href="${b.link.url}" target="_blank" rel="noopener" class="modal-link">🔗 ${b.link.label[t] || b.link.label.en}</a></p>` : '';
  const tip = b.tip ? `<div class="modal-tip">💡 <span>${b.tip[t] || b.tip.en}</span></div>` : '';
  if (b.activityStyle) {
    const heading = b.heading ? `<h4>🎯 ${b.heading[t] || b.heading.en}</h4>` : '';
    return `<div class="modal-activity">${heading}${text}${items}${link}</div>${tip}`;
  }
  const heading = b.heading ? `<h3>${b.heading[t] || b.heading.en}</h3>` : '';
  return heading + text + items + link + tip;
}

// Lessons reference a slide deck by path, but the .pptx files are not all in
// the repo yet. Probing the file keeps a missing deck from rendering an Office
// viewer pointed at a 404, and means a deck starts working the moment it is
// committed, with no change needed here.
const _slidesExist = new Map();   // absolute url -> boolean

function slidesPlaceholder() {
  return `<p class="lesson-extra-placeholder"><span class="en-text" lang="en">Slide deck coming soon.</span><span class="th-text" lang="th">สไลด์กำลังจะมาเร็ว ๆ นี้</span></p>`;
}

function slidesEmbed(url) {
  const viewerUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(url);
  return `
      <iframe class="lesson-slides-embed" src="${viewerUrl}" title="Slides">Loading…</iframe>
      <a class="lesson-download-btn" href="${url}" download>⬇ <span class="en-text" lang="en">Download Slides (.pptx)</span><span class="th-text" lang="th">ดาวน์โหลดสไลด์ (.pptx)</span></a>
    `;
}

// Renders the placeholder first and upgrades to the embed only once the deck
// is confirmed to exist, so a missing file never flashes a broken viewer.
async function renderSlides(el, lesson) {
  el.innerHTML = slidesPlaceholder();
  if (!lesson.slidesFile) return;
  // The Office viewer fetches the deck itself, so it needs a URL reachable
  // over the network, so there is nothing to embed when opened from disk.
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

  const url = new URL(lesson.slidesFile, document.baseURI).href;
  let exists = _slidesExist.get(url);
  if (!exists) {
    try {
      exists = (await fetch(url, { method: 'HEAD' })).ok;
    } catch (e) {
      exists = false;
    }
    // Only successes are cached. A probe can fail for transient network
    // reasons, and remembering that would hide a deck that is really there for
    // the rest of the visit; re-probing a missing file costs one HEAD request.
    if (exists) _slidesExist.set(url, true);
  }
  // The reader may have moved to another lesson while the probe was in flight.
  if (!exists || window.__openLessonId !== lesson.id) return;
  el.innerHTML = slidesEmbed(url);
}

// Returns false if `id` matches no lesson, so callers can fall back.
function openLesson(id, updateUrl = true) {
  const l = lessons.find(x => x.id === id);
  if (!l) return false;
  window.__openLessonId = id;
  const t = currentLang;
  const i = lessons.indexOf(l);
  const m = l.materials[currentMode];
  const act = l.activity[currentMode];
  const html = `
    <div class="modal-icon">${l.icon}</div>
    <h2>${l.title[t] || l.title.en}</h2>
    <div class="modal-meta">
      <span class="modal-tag" style="background:${colors[i]};color:${colorsText[i]}">${t==='th' ? 'บทที่ '+(i+1) : 'Lesson '+(i+1)}</span>
      <span class="modal-tag" style="background:#EDF0FD;color:var(--muted)">⏱ ${l.duration}</span>
    </div>

    <div class="mode-toggle modal-mode-toggle" role="group" aria-label="${t==='th' ? 'รูปแบบห้องเรียน' : 'Classroom setup'}">
      <button type="button" data-mode="notech" class="${currentMode==='notech' ? 'active' : ''}" aria-pressed="${currentMode==='notech'}" onclick="setMode('notech')"><span aria-hidden="true">📴</span> ${t==='th' ? 'ไม่ใช้เทคโนโลยี' : 'No Technology'}</button>
      <button type="button" data-mode="tech" class="${currentMode==='tech' ? 'active' : ''}" aria-pressed="${currentMode==='tech'}" onclick="setMode('tech')"><span aria-hidden="true">💻</span> ${t==='th' ? 'ใช้เทคโนโลยี' : 'Technology'}</button>
    </div>

    <div class="modal-body">
      <p><strong>${t==='th' ? 'จุดประสงค์: ' : 'Objective: '}</strong>${l.objective[t] || l.objective.en}</p>
      ${l.groupSize ? `<p><strong>${t==='th' ? 'ขนาดกลุ่ม: ' : 'Group Size: '}</strong>${l.groupSize[t] || l.groupSize.en}</p>` : ''}

      <h3>${t==='th' ? 'อุปกรณ์ที่ต้องเตรียม' : 'Materials Needed'}</h3>
      <ul>${(m[t] || m.en).map(p => `<li>${p}</li>`).join('')}</ul>

      ${l.beforeYouBegin ? `
      <h3>${t==='th' ? 'ก่อนเริ่มบทเรียน' : 'Before You Begin'}</h3>
      <p>${l.beforeYouBegin[t] || l.beforeYouBegin.en}</p>
      ` : ''}
      ${l.tipBeforeYouBegin ? `<div class="modal-tip">💡 <span>${l.tipBeforeYouBegin[t] || l.tipBeforeYouBegin.en}</span></div>` : ''}

      <h3>${t==='th' ? 'คำถามนำเข้าบทเรียน' : 'Warm-Up'}</h3>
      <ul>${(l.warmup[t] || l.warmup.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ${l.tipWarmup ? `<div class="modal-tip">💡 <span>${l.tipWarmup[t] || l.tipWarmup.en}</span></div>` : ''}

      <h3>${t==='th' ? 'คำอธิบาย' : 'Explanation'}</h3>
      <p>${l.explanation[t] || l.explanation.en}</p>
      ${l.aiAroundUs ? `
      <h3>${t==='th' ? 'AI รอบตัวเรา' : 'AI Around Us'}</h3>
      <ul>${(l.aiAroundUs[t] || l.aiAroundUs.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ` : ''}
      ${l.tipAiAroundUs ? `<div class="modal-tip">💡 <span>${l.tipAiAroundUs[t] || l.tipAiAroundUs.en}</span></div>` : ''}
      ${(l.bodyBlocks || []).map(b => renderContentBlock(b, t)).join('')}

      <div class="modal-activity">
        <h4>🎯 ${t==='th' ? 'กิจกรรมในชั้นเรียน' : 'Classroom Activity'} <span class="modal-activity-mode">${currentMode==='notech' ? (t==='th'?'(ไม่ใช้เทคโนโลยี)':'(No Technology)') : (t==='th'?'(ใช้เทคโนโลยี)':'(Technology)')}</span></h4>
        <p>${act[t] || act.en}</p>
        ${l.whyMistakes ? `<p>${l.whyMistakes[t] || l.whyMistakes.en}</p>` : ''}
      </div>
      ${l.tipActivity ? `<div class="modal-tip">💡 <span>${l.tipActivity[t] || l.tipActivity.en}</span></div>` : ''}
      ${(l.postActivityBlocks || []).map(b => renderContentBlock(b, t)).join('')}

      <h3>${t==='th' ? 'คำถามสะท้อนคิด' : 'Reflection Questions'}</h3>
      <ul>${(l.reflection[t] || l.reflection.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ${l.exitTicket ? `<p class="modal-exit-ticket">${l.exitTicket[t] || l.exitTicket.en}</p>` : ''}

      ${l.misconceptions ? `
      <h3>${(l.misconceptionsHeading && (l.misconceptionsHeading[t] || l.misconceptionsHeading.en)) || (t==='th' ? 'ความเข้าใจผิดที่พบบ่อย' : 'Common Misconceptions to Watch For')}</h3>
      <ul>${l.misconceptions.map(m2 => `<li><strong>"${m2.claim[t] || m2.claim.en}"</strong> ${m2.explanation[t] || m2.explanation.en}</li>`).join('')}</ul>
      ` : ''}

      ${l.differentiation ? `
      <h3>${t==='th' ? 'การปรับกิจกรรมตามระดับ' : 'Differentiation'}</h3>
      <ul>
        <li><strong>${t==='th' ? 'เสริมสำหรับผู้ต้องการความช่วยเหลือ: ' : 'Extra support: '}</strong>${l.differentiation.support[t] || l.differentiation.support.en}</li>
        <li><strong>${t==='th' ? 'ท้าทายเพิ่มเติม: ' : 'Extra challenge: '}</strong>${l.differentiation.challenge[t] || l.differentiation.challenge.en}</li>
      </ul>
      ` : ''}

      ${l.assessmentMaterials ? `
      <h3>${t==='th' ? 'การประเมิน / เอกสารประกอบการสอน' : 'Assessment / Materials Provided'}</h3>
      <ul>${(l.assessmentMaterials[t] || l.assessmentMaterials.en).map(p => `<li>${p}</li>`).join('')}</ul>
      ` : ''}
    </div>
  `;
  document.getElementById('lesson-page-content').innerHTML = html;
  renderSlides(document.getElementById('lesson-slides-content'), l);
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
  if (updateUrl) setRoute(LESSON_ROUTE + id);
  return true;
}

// setLang and setMode each render the cards and sync their own toggles, so
// restoring the saved preferences is all the bootstrapping the UI needs.
setLang(PREFS.lang());
setMode(PREFS.mode());
routeToCurrentHash();
