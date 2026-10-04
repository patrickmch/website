# mcheyser-site: progress

## Current state (2026-10-04)

**Phase:** redesign built on branch `redesign-2026-10`, reviewed by Gemini, Codex and Grok, fixes landed, waiting on Patrick's decisions and the launch.

- Spec: `docs/design-spec.md` (also GitHub issue #1), amended for the review. Copy: `docs/website-copy-2026-10.md`, unchanged.
- Every finding from the three reviews and its disposition: `docs/design-review-2026-10.md`. Raw reviews: `review-out/`.
- `npm run typecheck`, `npm run build`, `npm run check` and both screenshot sets pass.
- Routing moved to real paths (BrowserRouter); old `/#/` links are rewritten on arrival.

## What's next

- Patrick's decisions: the open questions in spec section 14 plus the concept-level disagreements listed in the review log.
- Merge `redesign-2026-10` into `main` (Railway deploys from `main`), confirm the three `VITE_EMAILJS_*` variables on the Railway service, send a real note through the live form, check `https://mcheyser.com/#/apply` lands on the contact page, and confirm `og.png` on a link preview.
- Real testimonials and a sample findings deliverable: the slots exist and render nothing until then.
