# McHeyser Site

Marketing site for McHeyser (mcheyser.com): operations and technology consulting for owners and operations leaders at businesses around $5M to $25M in revenue. Four pages: Home, Working Together, About, Contact.

## Status

Redesign (October 2026) on branch `redesign-2026-10`: concept "make the work visible" (paper, ink, one pen color, drawn diagrams of work). Spec: `docs/design-spec.md` (amendments marked "Amended"). Copy: `docs/website-copy-2026-10.md`. Tracking issue: #1. Adversarial review log with every finding and its disposition: `docs/design-review-2026-10.md`; the raw reviews are in `review-out/`. Testimonial and sample-deliverable slots are built but render nothing until real, approved material exists.

## Quick Start

```bash
npm install
npm run dev        # Vite dev server on http://localhost:2000
npm run build      # Build to dist/
npm run typecheck  # tsc --noEmit
npm run check      # builds with placeholder mail keys, then scripts/check-production.mjs (nothing is sent)
npm run screenshots  # Playwright: all routes at 1440 and 390, writes ./screenshots and public/og.png
OUT=screenshots/public REVIEW=0 npm run screenshots  # the public composition, proof slots hidden
TILES=1 npm run screenshots && npm run review        # the outside-model review (see README)
```

## Architecture

- **Stack**: React 19 + Vite 6, TypeScript, React Router 7 (BrowserRouter)
- **Styling**: plain CSS with custom properties in `styles/` (tokens, base, components, pages). No Tailwind, no CSS-in-JS, no icon library.
- **Diagrams**: HTML for text, inline SVG for strokes and pen marks (`components/Figure.tsx`, `components/marks/`, `components/diagrams/`)
- **Form**: EmailJS from the browser (no backend)
- **Routing**: BrowserRouter with real paths. The host (Railway) and `vite preview` serve `index.html` for every path. Old `/#/path` links are rewritten to `/path` before the router starts. `/apply` redirects to `/contact`. Review mode on the published site: `/?review=1`.

### Key Files
```
App.tsx                    routes, skip link, navigation focus and scroll
index.html                 fonts, meta, Open Graph tags
styles/tokens.css          every color, type, spacing, and motion token
components/Figure.tsx      Figure, Flow, Stack, Node, Connector, Fan, Annotation
components/diagrams/       the six figures (QuoteFlow, SprintSteps, QuotingTool, Paperwork, SharedView, SprintTimeline)
components/ProofSlot.tsx   testimonial and sample placeholders (review mode only)
hooks/useReviewMode.ts     dev, or ?review=1
pages/                     HomePage, WorkingTogetherPage, AboutPage, ContactPage, IntakePage (retained client page), StylePage and OgPage (dev only)
scripts/screenshots.mjs    screenshots (REVIEW=0 for the public set) and the overflow check at five widths
scripts/check-production.mjs  the production check behind npm run check
scripts/adversarial-review.mjs  sends the review packet to Gemini, Codex and Grok (and the OpenAI and xAI APIs when keyed)
docs/                      design spec, copy doc, review log
```

## Deployment

- **Domain**: mcheyser.com. DNS at Namecheap (NS `dns1/dns2.registrar-servers.com`), apex to Railway.
- **Host**: Railway (`server: railway-hikari`). One service serves the static build; no built-in path routing to other services.
- Git remote: `patrickmch/website`. Pushes to `main` deploy.
- Sibling deliverables host: `content.mcheyser.com` (separate Railway project `mcheyser-content`) serves PIN-gated client deliverables at paths, e.g. `/psyche`.

## Env Vars

```
VITE_EMAILJS_PUBLIC_KEY    EmailJS public key
VITE_EMAILJS_SERVICE_ID    EmailJS service ID
VITE_EMAILJS_TEMPLATE_ID   EmailJS template ID
```

## People

- Patrick McHeyser (patrick@mcheyser.com)

## Rules

- Visitor-facing words come from `docs/website-copy-2026-10.md` verbatim. Change the copy doc first, then the page.
- Every color must be a token from `styles/tokens.css`. The orange (`--mark`, `#D9632B`) is a pen: strokes, the primary button, link underlines. Never a background wash, never small text (use `--mark-text` for words).
- No gradients, shadows, blur, grain, pills, icon sets, stock or AI-generated imagery. One ink block per page at most.
- Contact form has five fields (`name`, `email`, `company`, `website`, `challenge`) plus a hidden honeypot (`fax`) and the hidden `_subject`. Don't re-bloat it.
- `npm run check` must pass before merging. It mocks the mail provider; it never sends.
- `public/stoppromptingstartshipping/` is a hosted talk. Leave it alone.
- `/intake/denver-zen-den` is a retained client page; delete the route when that engagement is over.

Last Updated: 2026-10-04 (review round one dispositioned)
