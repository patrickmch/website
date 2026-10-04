# mcheyser-site: progress

## Current state (2026-10-04)

**Phase:** live. The October 2026 redesign was merged into `main` (`a4dd7f8`) and deployed by Railway at 08:52 MDT on 4 October 2026, after two rounds of outside-model review and Patrick's local review.

- Spec: `docs/design-spec.md` (amendments marked "Amended"). Copy: `docs/website-copy-2026-10.md`.
- Every review finding and its disposition, both rounds plus the fresh branch review and Patrick's rulings: `docs/design-review-2026-10.md`. Raw replies: `review-out/`.
- `npm run typecheck`, `npm run build`, `npm run check` and both screenshot sets pass.
- Launch checks done on the live site: real paths and the old `/#/apply` link land; a real note went through the live form and arrived (Gmail, 14:55:40 UTC); `og.png`, the favicon, the 1200w portrait and the hosted talk are served.
- Launch finding fixed the same morning (`97645cc`): the host sent no `Cache-Control`, so `npm start` now runs `scripts/serve.mjs` with `no-cache` for HTML and `immutable` for hashed assets.

## What's next

- Patrick: in the EmailJS dashboard, update the template the site uses. It is still the old application template: subject "New Application from {{name}}", and it has no line for `{{company}}` while still listing Community, Involvement, Goals, Why Now, Additional and Budget. Add Company, drop the retired fields, and set the subject to `{{_subject}}` or "New note from {{name}}".
- Patrick: a link preview (Slack, iMessage, LinkedIn) to confirm `og.png`, and a VoiceOver pass of Home and Contact.
- Patrick's remaining decisions from the review log: climbing photo, intake route, proof material, prerendering and self-hosted fonts as follow-ups.
- Visitors who loaded the old site in the days before launch may see it until their cached copy expires (the old host sent no cache headers). A reload fixes it; new visits are unaffected.
- Real testimonials and a sample findings deliverable: the slots exist and render nothing until then.
