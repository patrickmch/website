# McHeyser Site

Personal consulting portfolio website for McHeyser Consulting (mcheyser.com). Marketing site with hero, methodology, about, and application form.

## Status

Active. Full copy rewrite completed (Feb 2026) — repositioned from "community facilitation" to "operational strategy + technical execution." Ready for deploy review. Testimonials section hidden (needs real names).

## Quick Start

```bash
cd ~/projects/mcheyser/mcheyser-site
npm install
npm run dev  # Vite dev server
npm run build  # Build to dist/
```

## Architecture

- **Stack**: React 19 + Vite 6, TypeScript, React Router 7 (HashRouter)
- **Styling**: Inline/component styles (no Tailwind)
- **Icons**: Lucide React
- **Form**: EmailJS for application form submissions (no backend)
- **Routing**: HashRouter (static SPA-compatible)

### Key Files
```
App.tsx            — Root component, routes
pages/
  HomePage.tsx     — Main landing page content
  ApplyPage.tsx    — Application form (EmailJS)
components/
  Header.tsx       — Site header/nav
  Footer.tsx       — Site footer
index.html         — Entry point
vite.config.ts     — Vite configuration
```

## Deployment

- **Domain**: mcheyser.com — DNS at Namecheap (NS `dns1/dns2.registrar-servers.com`), apex → Railway.
- **Host**: live on Railway (`server: railway-hikari`). One service serves the static build; no built-in path routing to other services.
- Git remote: `patrickmch/website`
- Sibling deliverables host: `content.mcheyser.com` (separate Railway project `mcheyser-content`) serves PIN-gated client deliverables at paths, e.g. `/psyche`.

## Env Vars

```
VITE_EMAILJS_PUBLIC_KEY    — EmailJS public key
VITE_EMAILJS_SERVICE_ID    — EmailJS service ID
VITE_EMAILJS_TEMPLATE_ID   — EmailJS template ID
GEMINI_API_KEY             — Possibly for a chatbot feature (unclear if active)
```

## People

- Patrick McHeyser (patrick@mcheyser.com)

## Cross-Project Links

None.

## Rules

- Package name in package.json is stale (`mcheyser---community-catalyst`). Update when convenient.
- Testimonials section is hidden. Needs real client names/quotes before enabling.
- The Gemini API key and related config may be from an earlier AI Studio export. Verify if the chatbot feature is still wanted before removing.
- Apply form was simplified from 10+ to 7 fields. Don't re-bloat it.

Last Updated: 2026-03-09
