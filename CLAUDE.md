# McHeyser Site

Marketing site for McHeyser (mcheyser.com): operations and technology consulting for owners and operations leaders at businesses around $5M to $25M in revenue. Four pages: Home, Working Together, About, Contact.

## Status

Redesign (October 2026) on branch `redesign-2026-10`: concept "make the work visible" (paper, ink, one pen color, drawn diagrams of work). Spec: `docs/design-spec.md`. Copy: `docs/website-copy-2026-10.md`. Tracking issue: #1. Adversarial review: the `external-review` skill (`.claude/skills/external-review/SKILL.md`) sends one packet to Gemini, OpenAI/Codex and Grok and logs every finding with a disposition in `docs/design-review-<date>.md`. Testimonial and sample-deliverable slots are built but render nothing until real, approved material exists.

## Quick Start

```bash
npm install
npm run dev        # Vite dev server on http://localhost:2000
npm run build      # Build to dist/
npm run typecheck  # tsc --noEmit
npm run screenshots  # Playwright: all routes at 1440 and 390, writes ./screenshots and public/og.png
npm run review:check # external review: which providers, hosts and models are usable from here
```

## Architecture

- **Stack**: React 19 + Vite 6, TypeScript, React Router 7 (HashRouter)
- **Styling**: plain CSS with custom properties in `styles/` (tokens, base, components, pages). No Tailwind, no CSS-in-JS, no icon library.
- **Diagrams**: HTML for text, inline SVG for strokes and pen marks (`components/Figure.tsx`, `components/marks/`, `components/diagrams/`)
- **Form**: EmailJS from the browser (no backend)
- **Routing**: HashRouter (static SPA-compatible). `/apply` redirects to `/contact`.

### Key Files
```
App.tsx                    routes, skip link, scroll reset
index.html                 fonts, meta, Open Graph tags
styles/tokens.css          every color, type, spacing, and motion token
components/Figure.tsx      Figure, Flow, Stack, Node, Connector, Fan, Annotation
components/diagrams/       the six figures (QuoteFlow, SprintSteps, QuotingTool, Paperwork, SharedView, SprintTimeline)
components/ProofSlot.tsx   testimonial and sample placeholders (review mode only)
hooks/useReviewMode.ts     dev, or ?review=1 on the hash route
pages/                     HomePage, WorkingTogetherPage, AboutPage, ContactPage, IntakePage (retained client page), StylePage and OgPage (dev only)
scripts/screenshots.mjs    screenshot and overflow check
scripts/adversarial-review.mjs  builds the review packet and sends it to Gemini, OpenAI (API or Codex CLI) and xAI, or writes it for pasting
scripts/merge-reviews.mjs  merges review-out/*.md into docs/design-review-<date>.md
docs/                      design spec, copy doc, review brief (review-brief.md), review logs
.claude/skills/external-review/  the review procedure, provider setup, brief template
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

External review (not needed for the build): `GEMINI_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY`, optional `ANTHROPIC_API_KEY`; models via `GEMINI_MODEL`, `OPENAI_MODEL`, `XAI_MODEL`, `CODEX_MODEL`. In a cloud session the keys must exist before the session starts and the network policy must allow `generativelanguage.googleapis.com`, `api.openai.com` and `api.x.ai`.

## People

- Patrick McHeyser (patrick@mcheyser.com)

## Rules

- Visitor-facing words come from `docs/website-copy-2026-10.md` verbatim. Change the copy doc first, then the page.
- Every color must be a token from `styles/tokens.css`. The orange (`--mark`) is a pen: strokes, the primary button, link underlines. Never a background wash, never small text (use `--mark-text` for words).
- No gradients, shadows, blur, grain, pills, icon sets, stock or AI-generated imagery. One ink block per page at most.
- Contact form has five fields (`name`, `email`, `company`, `website`, `challenge`). Don't re-bloat it.
- `public/stoppromptingstartshipping/` is a hosted talk. Leave it alone.
- `/intake/denver-zen-den` is a retained client page; delete the route when that engagement is over.
- External reviews go through the `external-review` skill. Every finding in the log ends as fixed, declined with a reason, or deferred to the owner; never delete a row.

Last Updated: 2026-10-04
