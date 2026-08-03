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
js/app.js           routing, language/mode switching, rendering
assets/             artwork, icons, logos
slides/             the five .pptx decks
```

It is a static site with no build step and no dependencies. Open `index.html`
directly, or serve the folder:

```bash
python3 -m http.server 8787
```

Routes live in the URL hash (`#/lessons`, `#/lessons/what-is-ai`) so the site
works from any base path: a domain root, a GitHub Pages subdirectory, or
`file://`, with no server configuration.

## Offline use

A service worker (`sw.js`) caches the site on first visit, so once a teacher has
opened it the lessons, artwork and styles all work with no connection. Slide
decks are not precached, because together they are 41MB; each deck is cached
the first time it is opened, so preparing a lesson at home keeps it available
in the classroom.

`site.webmanifest` makes the site installable, which is what puts it on a phone
home screen and lets it open without browser chrome.

Bump `CACHE_VERSION` in `sw.js` when the shell changes. Old caches are deleted
on activate. The page itself is fetched network-first, so edits appear on the
next online visit rather than being pinned by the cache.

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
