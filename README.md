# AI Literacy Toolkit

A free, ready-to-teach AI literacy unit for middle school classrooms, in
English and Thai. Five lessons, each 40–60 minutes, for students aged 11–14.

**Live site:** https://yanj428.github.io/ai-literacy-toolkit/

Every lesson works two ways: a **No Technology** version that needs only
printed materials, and a **Technology** version that uses slides and digital
tools. Teachers pick whichever fits their classroom.

Made by [Youth of Change](https://instagram.com/youthofchange_th).

## The lessons

| # | Lesson | Length |
|---|--------|--------|
| 1 | What Is AI? | 40–50 min |
| 2 | How Does AI Learn? | 50 min |
| 3 | Can AI Make Mistakes? | 45–50 min |
| 4 | Using AI Responsibly | 50 min |
| 5 | AI Around Us Project | 50–60 min |

Each lesson page has the objective, materials list, warm-up questions,
classroom activity, reflection questions, common misconceptions, and
differentiation notes, plus a downloadable slide deck.

## Repository layout

```
index.html          markup for every page
css/styles.css      all styles
js/lessons.js       lesson content, EN + TH, data only, no DOM access
js/lesson-view.js   the lesson markup, shared by the browser and build.js
js/app.js           routing, language/mode switching, rendering
build.js            writes a page per route
lessons/, faq/ …    generated; edit index.html, not these
assets/             artwork, icons, logos
slides/             the five .pptx decks
```

It has one build step and no dependencies. `index.html` is the source and is a
working site on its own; `build.js` writes a real HTML file for every route, so
that `/lessons/what-is-ai/` is a page a server returns and a crawler reads,
rather than a shape the browser only takes on after JavaScript runs. Run it
after editing `index.html`, `js/lessons.js` or `js/lesson-view.js`:

```bash
node build.js
```

The generated pages are committed, because GitHub Pages serves the repository
as it is. Then serve the folder:

```bash
python3 -m http.server 8787
```

`404.html` catches typos and stale links. GitHub Pages renders it at whatever URL was
requested, so its styles are inline and its links are absolute: relative ones
would resolve against the missing path and fail in turn. If the address
contains a known route, such as a link written against the old path-based
routing, it is turned into the hash equivalent and the visitor lands where they
were going instead of on an error.

Routes are real paths. Each generated page records its own route in
`body[data-route]`, and the script derives the base from whatever precedes it in
the address, so the site still works from a domain root or a GitHub Pages
subdirectory without being told which. Links written when routes lived in the
hash are rewritten to paths on load.

## Being found

`sitemap.xml` lists the site and the five lesson PDFs. It does not list the
routes: search engines drop the fragment, so `#/lessons` and `#/faq` all resolve
to the same document and listing them would repeat one URL. The PDFs are the
exception, because search engines do index PDFs, which makes them the only
lesson-level URLs a teacher can actually find in a search.

`robots.txt` is here for completeness, but crawlers only read robots.txt at the
root of a host: while this is a GitHub Pages project site, the file that counts
is at `yanj428.github.io/robots.txt`, which this repository does not control.
Submit the sitemap through Google Search Console instead. The file becomes
effective as written if the site ever moves to its own domain.

## Offline use

A service worker (`sw.js`) caches the site on first visit, so once a teacher has
opened it the lessons, artwork and styles all work with no connection. Slide
decks are not precached, because together they are 41MB; each deck is cached
the first time it is opened, so preparing a lesson at home keeps it available
in the classroom.

`site.webmanifest` makes the site installable, which is what puts it on a phone
home screen and lets it open without browser chrome.

The page, the styles and the scripts are fetched network-first with a short
timeout: a deploy takes effect on the next visit, and if the network is slow the
cached copy is served instead of waiting. Images are served from the cache
first, and slide decks are cache-first once downloaded.

Bump `CACHE_VERSION` in `sw.js` only when the precache list itself changes, such
as when an asset is added or renamed. Editing HTML, CSS or JS does not need it.
Old caches are deleted on activate.

## Editing the lessons

All lesson content is in `js/lessons.js`, one object per lesson, with every
field carrying an `en` and a `th` string. Adding a lesson means adding an entry
there; the cards, the lesson page and the routes follow from the data.

Slide decks are looked up by the `slidesFile` path. A lesson whose deck is
missing shows "Slide deck coming soon" instead of a broken viewer, so a new
deck starts working as soon as it is committed.

## License

Two licenses, because this repository holds two different kinds of work:

- **Educational content**: the lesson plans, slide decks and artwork are under
  [CC BY-NC 4.0](LICENSE-CONTENT.md) (full text in [LICENSE](LICENSE)). Use them,
  translate them, adapt them and share them with other teachers, as long as you
  credit Youth of Change and do not use them commercially. Want to use the
  toolkit commercially? Email us and ask, and we can grant permission.
- **Website code**: the HTML, CSS and JavaScript are under the
  [MIT license](LICENSE-CODE).

If you translate or adapt these lessons for your own classroom, we would love
to hear about it: youthofchange8@gmail.com
