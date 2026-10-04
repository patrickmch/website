# McHeyser site

The marketing site for McHeyser (Patrick McHeyser): operations and technology consulting for growing businesses. Live at [mcheyser.com](https://mcheyser.com).

Four pages: Home, Working Together, About, Contact. The design concept, tokens, components, and acceptance criteria are in [`docs/design-spec.md`](docs/design-spec.md). The words come from [`docs/website-copy-2026-10.md`](docs/website-copy-2026-10.md).

## Run

```bash
npm install
npm run dev        # Vite dev server on http://localhost:2000
npm run build      # production build to dist/
npm run preview    # serve dist/
npm run typecheck  # tsc --noEmit
```

In development the proof-slot placeholders (testimonial and sample deliverable positions) are visible, and two extra routes exist: `/#/style` (style tile) and `/#/og` (social preview template). On the published site, proof slots render nothing unless the route carries `?review=1`.

## Screenshots

```bash
npm run screenshots                    # dev server; writes ./screenshots and public/og.png
MODE=preview npm run screenshots       # the production build
```

Needs Playwright with Chromium. If Playwright is installed globally, point at it with `PLAYWRIGHT_PATH=/path/to/node_modules/playwright`.

## Adversarial review by outside models

```bash
TILES=1 npm run screenshots          # page tiles the models can read
GEMINI_API_KEY=... OPENAI_API_KEY=... XAI_API_KEY=... npm run review
```

Each reply lands in `review-out/<provider>.md`. The Codex CLI is used automatically when it is signed in (`codex login --device-auth` works without a browser) and no `OPENAI_API_KEY` is set. With no provider at all, `EMIT=1 npm run review` writes the prompt, the packet, and the images to `review-out/packet` for pasting into a chat interface. In a cloud environment, the hosts `api.openai.com`, `auth.openai.com`, `chatgpt.com`, and `api.x.ai` must be on the network allowlist.

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
App.tsx               routes (HashRouter), skip link, scroll reset
styles/               tokens.css, base.css, components.css, pages.css
components/           wordmark, header, footer, buttons, figure primitives, pen marks, diagrams, form field
hooks/                usePageMeta, useReviewMode, useDrawOnView
pages/                Home, Working Together, About, Contact, the retained intake page, dev-only Style and Og pages
public/               favicon, portraits, og.png, the hosted talk under stoppromptingstartshipping/
scripts/              screenshots.mjs, adversarial-review.mjs
docs/                 design spec, copy doc, review log
```

## Deployment

Railway serves the static build; the apex domain points there from Namecheap DNS. Pushes to `main` deploy.
