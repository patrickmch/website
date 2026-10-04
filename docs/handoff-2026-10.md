# Handoff: redesign review and launch (October 2026)

This note hands the redesign from the cloud build session to a local session on Patrick's Mac. Read it first, then `docs/design-spec.md` (section 13 for the review plan) and `docs/website-copy-2026-10.md`.

## Where things are

- Branch: `redesign-2026-10` on `patrickmch/website`, pushed and clean. `main` still serves the old site on Railway.
- Spec: GitHub issue #1 and `docs/design-spec.md`. Skill follow-up: issue #2.
- Preview of the production build (private link, proof slots hidden, form cannot send): https://claude.ai/artifact/GzXndmeXBfqoqVewJ4zBrJ
- Built and verified: all 4 pages, the `/apply` redirect, the restyled intake page, favicon, `public/og.png`. `npm run typecheck`, `npm run build` and `node scripts/check-production.mjs` all pass. No horizontal overflow at 390px or 1440px.
- Not done: the external adversarial reviews. The cloud environment had no keys and its network policy denied the OpenAI and xAI hosts. Three Claude reviewer agents were started there and then stopped, so no Claude review output exists either.

## Run locally

```bash
cd ~/projects/mcheyser/mcheyser-site
git fetch origin
git checkout redesign-2026-10
npm install
npx playwright install chromium        # once
npm run dev                             # http://localhost:2000, proof slots visible, /#/style and /#/og exist
```

## Step 1: external reviews

```bash
TILES=1 npm run screenshots             # writes ./screenshots and ./screenshots/tiles, and refreshes public/og.png
npm run review                          # writes review-out/<provider>.md
```

`npm run review` uses every provider it can find:

- Gemini: `GEMINI_API_KEY`, read from the environment or from `.env.local`
- Codex: the `codex` CLI when it is signed in and `OPENAI_API_KEY` is not set
- Grok: the `grok` CLI when it is on the PATH and `XAI_API_KEY` is not set (it reads the packet from disk; if it cannot view images it says so)
- OpenAI and xAI APIs directly when their keys are set

The review brief is the `BRIEF` constant in `scripts/adversarial-review.mjs`. It asks each model to attack both the spec and the build. `EMIT=1 npm run review` writes a manual packet to `review-out/packet` for pasting into a chat interface.

Commit `review-out/*.md` on the branch so the findings are kept.

## Step 2: dispositions and fixes

1. Create `docs/design-review-2026-10.md` with one table: finding, source model, severity, where, disposition (fixed with commit, declined with reason, or deferred to Patrick).
2. Fix every blocker and major. Fix minors that are plainly right. Decline with a reason anything that fights the concept or the copy.
3. Re-run `npm run typecheck`, `npm run build`, `TILES=1 npm run screenshots` and `node scripts/check-production.mjs`.
4. Second round: `npm run review` again and record what the models now say.

## Step 3: decisions for Patrick

Open questions from the spec, section 14:

- the climbing photo on About (included; cut it if it undercuts the positioning)
- the LinkedIn link in the footer (added beyond the copy doc)
- the intake page `/intake/denver-zen-den` (kept; delete the route if that engagement is over)
- testimonials and a sample findings deliverable (slots exist and render nothing until real material is approved)
- documentary photographs of real work (not in this build)

## Step 4: launch

1. Merge `redesign-2026-10` into `main`. Railway deploys from `main`.
2. Check the Railway service has `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID` and `VITE_EMAILJS_TEMPLATE_ID`. The form field names are `name`, `email`, `company`, `website`, `challenge`, plus the hidden `_subject`. The old `company_type` and `referral` fields are gone; check the EmailJS template does not require them.
3. Send a real test note through the live form and confirm the email arrives.
4. Check https://mcheyser.com/#/apply still lands on the contact page.
5. Share a link on a platform that renders previews and confirm `og.png` appears.

## Things the builder would flag first

These are not in the spec's acceptance criteria but a reviewer will probably raise them:

- Search engines see one page because of the hash router and no prerendering. The cheapest fix is a prerender step at build time for the 4 routes, or a switch to `BrowserRouter` with a static fallback on Railway. This matters more now that the site has 4 real pages.
- The 01 to 04 numbers on the four problem cards suggest a sequence that is not there. Removing them, or using a different device, is defensible.
- Fonts come from Google Fonts. Self-hosting the 3 families removes a third-party request and the swap flash.
- Fig. 6 nodes carry sublabels the spec did not list ("scope, fee, timing, people" and so on); they come from the copy, but the spec text was not updated.
- The spec says figures use `role="group"` with `aria-label`; the build uses `<figure>` with `aria-labelledby` and `aria-describedby`, which is the more correct pattern. Update the spec, not the build.
- The hero diagram on phones is 5 stacked nodes and runs long. A 3-node phone version is an option.
- The footer shows the wordmark and the tagline; the copy doc's first footer line, "Patrick McHeyser", appears only in the copyright line.

## Environment notes

- Scripts use 127.0.0.1, not localhost, because Node's fetch to localhost hung in the cloud container. Keep it that way.
- The screenshot script starts its own dev server on port 2000. Set `BASE_URL=http://127.0.0.1:2000` to use a server that is already running.
- Review mode: on in `npm run dev`; on the published site only with `?review=1` inside the hash route, for example `https://mcheyser.com/#/?review=1`.
- `public/stoppromptingstartshipping/` is a hosted talk. Leave it alone.
