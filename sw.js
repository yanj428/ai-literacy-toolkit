// Service worker for the AI Literacy Toolkit.
//
// The point of this file is the premise of the toolkit: a teacher should be
// able to open a lesson in a classroom with no internet. Once the site has
// been visited, the whole site works offline, and any slide deck that has been
// opened once stays available too.
//
// Bump CACHE_VERSION whenever the shell changes. Old caches are deleted on
// activate, so a stale version never lingers.
const CACHE_VERSION = 'v2';
const SHELL_CACHE = `toolkit-shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `toolkit-runtime-${CACHE_VERSION}`;

// Relative paths throughout: the site is served from a subdirectory on GitHub
// Pages and from the root locally, and the worker must work either way.
const SHELL = [
  './',
  'index.html',
  'css/styles.css',
  'js/lessons.js',
  'js/app.js',
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

// Network first, falling back to whatever was cached. Used for the page itself
// so an edit to the site shows up on the next online visit rather than being
// pinned by the cache.
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(request) || await cache.match('index.html') || await cache.match('./');
    if (cached) return cached;
    throw e;
  }
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
    event.respondWith(networkFirst(request, SHELL_CACHE));
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
  event.respondWith(staleWhileRevalidate(request, SHELL_CACHE));
});
