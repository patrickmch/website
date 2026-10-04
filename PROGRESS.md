# mcheyser-site: progress

## Current state (2026-10-04)

**Phase:** redesign built on branch `redesign-2026-10`, reviewed by Gemini, Codex and Grok, fixes landed, waiting on Patrick's decisions and the launch.

- Spec: `docs/design-spec.md` (also GitHub issue #1), amended for the review. Copy: `docs/website-copy-2026-10.md`; About revised October 4 to connect software engineering with executive leadership development.
- Every finding from the three reviews and its disposition: `docs/design-review-2026-10.md`. Raw reviews: `review-out/`.
- The redesign review passed `npm run typecheck`, `npm run build`, `npm run check` and both screenshot sets. After the October 4 About-only copy revision, typecheck and build passed again, and the rendered page was checked in the local browser preview.
- Routing moved to real paths (BrowserRouter); old `/#/` links are rewritten on arrival.

## What's next

- Patrick's decisions: the open questions in spec section 14 plus the concept-level disagreements listed in the review log.
- Merge `redesign-2026-10` into `main` (Railway deploys from `main`), confirm the three `VITE_EMAILJS_*` variables on the Railway service, send a real note through the live form and confirm it arrives with all five fields, check that fresh loads of `https://mcheyser.com/working-together`, `https://mcheyser.com/intake/denver-zen-den` and the old `https://mcheyser.com/#/apply` all land, confirm `og.png` on a link preview, and do a VoiceOver pass of Home and Contact.
- Real testimonials and a sample findings deliverable: the slots exist and render nothing until then.

## 2026-10-04: About positioning revision

- Updated the About copy document and page from Patrick's supplied LinkedIn biography and requested executive focus. Named the NOLS program audiences, distinguished expedition leadership from program supervision, and connected the experience to hands-on consulting delivery. Kept existing photographs and layout.
- Verification: `npm run typecheck`, `npm run build`, `git diff --check`, and rendered About content/layout at `http://localhost:4173/about`. The running preview serves the rebuilt output. No form was submitted.
- Patrick deferred case studies and further proof additions to a second pass after launch. No case study, client endorsement, outcome metric, or production deployment was added in this change.
