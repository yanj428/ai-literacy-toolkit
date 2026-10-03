# CLAUDE.md

A static, bilingual (English and Thai) AI literacy unit for ages 11 to 14,
served by GitHub Pages at https://yanj428.github.io/ai-literacy-toolkit/.
No framework, no package.json, no dependencies. README.md explains the design;
this file is the short list of things that are easy to get wrong.

## Build and run

```bash
node build.js                    # after editing index.html, js/lessons.js, js/lesson-view.js or build.js
python3 -m http.server 8787      # then open http://localhost:8787/
```

There are no tests. To check a change, run the build, serve the folder and
look at the affected pages in both languages and both classroom modes.

## Source vs generated

- **Edit:** `index.html` (markup for every page), `css/styles.css`, `js/*.js`,
  `build.js`, `404.html`, `sw.js`.
- **Never hand-edit:** `lessons/**/index.html`, `start/`, `faq/`, `curriculum/`,
  `about/`, `contact/`, `privacy/`, the whole of `th/` (the Thai copy of every
  page), all written by `build.js`, and `sitemap.xml` (also from `PAGES`).
- The JSON-LD block inside `index.html` is generated too. The rest of
  `index.html` is hand-edited.
- Generated files are committed. Commit them with the source change that
  produced them. CI (`.github/workflows/build.yml`) rebuilds on push to `main`
  as a backstop, not as the plan.
- A second `node build.js` must produce no diff. Keep it idempotent.

## Content rules

- Every piece of user-facing text exists in both languages. In markup that
  means a pair: `<span class="en-text" lang="en">…</span><span class="th-text" lang="th">…</span>`
  (or `<p>`). In `js/lessons.js` every field is `{ en, th }`.
- Thai curriculum indicators are quoted as published, not back-translated.
- Each lesson has a No Technology and a Technology version. Changes to one
  usually need a matching change to the other.
- No em dashes anywhere: site, docs, comments or commit messages. Use a
  colon, a comma or a plain hyphen.

## Code conventions

- Plain browser JS, no modules or bundler. `js/lessons.js` is data only and
  must not touch the DOM. `build.js` `eval`s it and `js/lesson-view.js`, so
  both have to work in Node as well as the browser.
- Build URLs with `asset()` / `BASE` in `app.js`, never bare relative paths:
  pages live at different depths (`/`, `/faq/`, `/lessons/what-is-ai/`).
- Comments explain why, in full sentences, and are generous. Match that.

## Things that do not follow from the data

- **Adding a route or lesson:** add it to `PAGES` in `build.js` (lessons are
  added automatically from `js/lessons.js`) with its Thai head copy in
  `TH_COPY`, then add the English and `th/` routes and any new artwork to
  `SHELL` in `sw.js` and bump `CACHE_VERSION`. The 404 page has its
  own `ROUTES` list of top-level sections.
- **Language is in the path.** English is `/lessons/x/`, Thai is
  `/th/lessons/x/`; there is no `?lang` parameter any more except as an old
  link that gets redirected. Anything that builds a URL in `app.js` goes through
  `setRoute` or `langPrefix()` so the prefix is kept.
- **`CACHE_VERSION`** is bumped only when the precache list changes, not for
  ordinary HTML, CSS or JS edits.
- **`404.html`** is self-contained: inline styles, root worked out at runtime.
  Do not make it depend on `css/` or `js/`.
- **`robots.txt`** has no effect while this is a project site. Do not try to
  fix SEO through it. The sitemap is submitted through Search Console.

## Commits

Imperative subject in plain English, no prefix (`Add the printable
worksheets`, not `feat: worksheets`). The body explains why and what was
verified, wrapped at about 72 columns.
