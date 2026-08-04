// Service worker for the AI Literacy Toolkit.
//
// The point of this file is the premise of the toolkit: a teacher should be
// able to open a lesson in a classroom with no internet. Once the site has
// been visited, the whole site works offline, and any slide deck that has been
// opened once stays available too.
//
// Bump CACHE_VERSION when the precache list below changes. Editing the page,
// styles or scripts does not need a bump: those are fetched network-first, so a
// deploy takes effect on the next visit on its own. Old caches are deleted on
// activate, so a stale version never lingers.
const CACHE_VERSION = 'v4';
const SHELL_CACHE = `toolkit-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `toolkit-runtime-${CACHE_VERSION}`;

// Relative paths throughout: the site is served from a subdirectory on GitHub
// Pages and from the root locally, and the worker must work either way.
const SHELL = [
  './',
  'index.html',

  // Every route is its own page now, so each one has to be here or a visit
  // to /faq/ with no connection would fall back to the home page's HTML.
  'lessons/',
  'faq/',
  'curriculum/',
  'about/',
  'contact/',
  'privacy/',
  'lessons/what-is-ai/',
  'lessons/how-ai-learns/',
  'lessons/ai-mistakes/',
  'lessons/ai-responsibly/',
  'lessons/ai-project/',

  'css/styles.css',
  'js/lessons.js',
  'js/app.js',
  'js/lesson-view.js',
  'site.webmanifest',
  'assets/hero-background.jpg',
  'assets/hero-mascot.png',
  'assets/icon-chip.png',
  'assets/icon-document.png',
  'assets/icon-lightbulb.png',
  'assets/icon-magnifier.png',
  'assets/logo-youth-of-change.png',
  'assets/logo-youth-of-change-footer.png',
  'assets/lessons/lesson-1-what-is-ai-en.jpg',
  'assets/lessons/lesson-1-what-is-ai-th.jpg',
  'assets/lessons/lesson-2-how-ai-learns-en.jpg',
  'assets/lessons/lesson-2-how-ai-learns-th.jpg',
  'assets/lessons/lesson-3-ai-mistakes-en.jpg',
  'assets/lessons/lesson-3-ai-mistakes-th.jpg',
  'assets/lessons/lesson-4-ai-responsibly-en.jpg',
  'assets/lessons/lesson-4-ai-responsibly-th.jpg',
  'assets/lessons/lesson-5-ai-project-en.jpg',
  'assets/lessons/lesson-5-ai-project-th.jpg',
];

// 404.html is not precached either. It is served with a 404 status, which the
// caching helpers already refuse to store, and it is only ever reached through
// a real navigation to a URL that does not exist.

// The slide decks are deliberately NOT precached: they are 41MB together, and
// forcing that download on every visitor to make one lesson available offline
// is the wrong trade. They are cached individually the first time one is
// opened, so preparing a lesson at home keeps it for the classroom.

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      // addAll is atomic: one 404 would throw away the whole install, so each
      // file is added on its own and a missing one is simply skipped.
      .then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('toolkit-') && k !== SHELL_CACHE && k !== RUNTIME_CACHE)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Network first, falling back to whatever was cached. Used for the page and for
// the styles and scripts, so an edit to the site shows up on the next visit
// instead of waiting a further visit for a background refresh to land.
//
// timeoutMs guards the obvious cost of that choice. On the slow connections
// this toolkit is meant for, waiting on a request that is crawling would be
// worse than showing the copy already on the device, so once the deadline
// passes the cached copy is served and the download carries on into the cache
// for next time. Without a cached copy there is nothing to fall back to, so the
// request is simply awaited.
async function networkFirst(request, cacheName, timeoutMs = 0) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(res => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);   // resolves either way, so racing it cannot reject

  if (cached && timeoutMs) {
    const deadline = new Promise(resolve => setTimeout(() => resolve(null), timeoutMs));
    return (await Promise.race([network, deadline])) || cached;
  }
  return (await network)
    || cached
    || await cache.match('index.html')
    || await cache.match('./')
    || Response.error();
}

// Serve the cached copy immediately and refresh it in the background, so the
// site is instant offline and still picks up changes.
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(res => {
      // Opaque responses (cross-origin fonts) report status 0 but are still
      // usable from the cache, so they are kept as well.
      if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || network || fetch(request);
}

// Cache first: for a slide deck, whichever copy we have is the right one, and
// re-downloading 12MB to check is not.
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const fresh = await fetch(request);
  if (fresh && fresh.ok) cache.put(request, fresh.clone());
  return fresh;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // Never touch the Google Form or the Office viewer: both need the live
  // service, and a cached copy would be worse than an honest failure.
  if (!sameOrigin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, SHELL_CACHE, 4000));
    return;
  }
  if (!sameOrigin) {                       // Google Fonts
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }
  if (/\.(pdf|pptx)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }
  // Styles and scripts change together with the markup, and a page rendered
  // with last week's script is a bug, not a stale detail. They go network-first
  // so a deploy takes effect immediately rather than on the visit after.
  if (/\.(css|js)$/.test(url.pathname)) {
    event.respondWith(networkFirst(request, SHELL_CACHE, 3000));
    return;
  }
  // Images and the manifest are effectively immutable: their names change when
  // their contents do, so serving the cached copy first costs nothing.
  event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
});
