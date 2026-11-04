# McHeyser site

The marketing site for McHeyser (Patrick McHeyser): operations and technology consulting for growing businesses. Live at [mcheyser.com](https://mcheyser.com).

Pages include Home, Working Together, Client Work, About, Contact, and Blog. The design concept, tokens, components, and acceptance criteria are in [`docs/design-spec.md`](docs/design-spec.md). The words come from [`docs/website-copy-2026-10.md`](docs/website-copy-2026-10.md).

## Run

```bash
npm install
npm run dev        # Vite dev server on http://localhost:2000
npm run build      # production build to dist/
npm run preview    # serve dist/
npm run typecheck  # tsc --noEmit
npm run check      # production check: builds with placeholder mail keys, runs scripts/check-production.mjs
```

In development the proof-slot placeholders (testimonial and sample deliverable positions) are visible, and two extra routes exist: `/style` (style tile) and `/og` (social preview template). On the published site, proof slots render nothing unless the URL carries `?review=1`.

Routes are real paths (`/working-together`, `/about`, `/contact`). The host serves `index.html` for every path. Links from the old hash router (`/#/apply`, `/#/intake/denver-zen-den`) are rewritten to real paths on arrival.

## Screenshots

```bash
npm run screenshots                    # dev server; writes ./screenshots and public/og.png
OUT=screenshots/public REVIEW=0 npm run screenshots   # the public composition, proof slots hidden
MODE=preview npm run screenshots       # the production build
```

Every run also checks for horizontal overflow at 360, 768 and 1024px.

Needs Playwright with Chromium. If Playwright is installed globally, point at it with `PLAYWRIGHT_PATH=/path/to/node_modules/playwright`.

## Adversarial review by outside models

```bash
TILES=1 npm run screenshots          # page tiles the models can read
GEMINI_API_KEY=... OPENAI_API_KEY=... XAI_API_KEY=... npm run review
```

Each reply lands in `review-out/<provider>.md` (`OUT=review-out/round-2 npm run review` for a later round). The Codex CLI is used automatically when it is signed in (`codex login --device-auth` works without a browser) and no `OPENAI_API_KEY` is set; the Grok CLI when it is on the PATH and no `XAI_API_KEY` is set. Findings and their dispositions are logged in `docs/design-review-2026-10.md`. With no provider at all, `EMIT=1 npm run review` writes the prompt, the packet, and the images to `review-out/packet` for pasting into a chat interface. In a cloud environment, the hosts `api.openai.com`, `auth.openai.com`, `chatgpt.com`, and `api.x.ai` must be on the network allowlist.

## Environment variables

The contact form sends through EmailJS. Set these at build time:

```
VITE_EMAILJS_PUBLIC_KEY
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
```

Form field names are `name`, `email`, `company`, `website`, and `challenge`.

## Structure

```
index.html            fonts, meta, Open Graph tags
App.tsx               routes (BrowserRouter), skip link, navigation focus and scroll
styles/               tokens.css, base.css, components.css, pages.css
components/           wordmark, header, footer, buttons, figure primitives, pen marks, diagrams, form field
hooks/                usePageMeta, useReviewMode, useDrawOnView
pages/                Home, Working Together, About, Contact, the retained intake page, dev-only Style and Og pages
public/               favicon, portraits, og.png, the hosted talk under stoppromptingstartshipping/
scripts/              screenshots.mjs, check-production.mjs, adversarial-review.mjs
docs/                 design spec, copy doc, review log
```

## Deployment

Railway builds `dist/` and runs `npm start`, which is `scripts/serve.mjs`: a small static server that sends `Cache-Control: no-cache` for `index.html` (so a new deploy is picked up on the next visit), `immutable` for the hashed files under `assets/`, an hour for other files, gzip, ETags, and a real 404 for a missing file. The host's default static serving sent no cache headers at all, which could show a returning visitor the previous build for days. The apex domain points at Railway from Namecheap DNS. Pushes to `main` deploy.

## Publish a blog post

The blog lives at `/blog/`. Each post has a permanent URL at `/blog/<slug>/`. The build renders complete HTML using the same React components as the browser. Search engines and link previews can read the article before JavaScript runs.

1. Add the approved article and summary to `docs/website-copy-2026-10.md`.
2. Add an entry to `content/blogPosts.json` with a unique lowercase hyphenated slug, title, description, publication date (`YYYY-MM-DD`), author, and paragraphs.
3. Run `npm run typecheck` and `npm run check`. The checks mock the contact form provider and send no mail.
4. Review the listing and article at desktop and phone widths. `OUT=screenshots/blog npm run check:blog` saves views of the first post.
5. Commit and push the reviewed change to `main` when publication is authorized.
6. Verify Railway reports success, then run `BASE_URL=https://mcheyser.com npm run check:blog` for the live blog checks.

New entries appear first by publication date. Every entry in the file is public, including dates in the future. Keep unpublished drafts outside this file. The current format supports paragraphs, without a separate editor or database.

`npm run build` also writes `dist/sitemap.xml`, `dist/robots.txt`, and a blog-specific 404 page. The production server returns HTTP 404 for unknown blog URLs. The standard site social image remains the article's preview image.


## Website analytics

Umami Cloud is prepared but stays disabled until `UMAMI_WEBSITE_ID` is set at build time.
Use the public website UUID from the account's tracking code, never a password or API key.
The build adds the shared loader to the main site, generated blog, and standalone case-study HTML.
The existing hosted talk and client intake pages stay excluded.

Run `node scripts/check-analytics.mjs` to check activation, URL filtering, and page coverage without sending events.
Account setup, activation, and verification instructions are in `docs/analytics-setup.md`.
