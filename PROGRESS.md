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

## 2026-10-04: Approved About wording

- Applied Patrick's approved paragraph verbatim, keeping software automation integrated with his instructor support, emergency response, performance feedback, and expedition logistics responsibilities. Updated the preceding copy to leadership intensives, Wharton and other leading MBA audiences, and custom applications/marketing automation.
- Updated `pages/AboutPage.tsx` and `docs/website-copy-2026-10.md`. Typecheck, build, production check, and diff whitespace check passed before release. Scope is About copy only; existing design, photos, and case-study plans are unchanged.

## 2026-10-04: Approved portrait retouch

- Patrick approved publishing a thumbs-up edit of his ridge portrait and requested one rope strand. Used the built-in image editor for the gesture and rope edits, then exported responsive JPEGs. Prompt: preserve the portrait and scene; change the hand to a thumbs-up, then replace the doubled foreground rope with one strand. This is the explicitly requested exception to the general no-generated-imagery design rule.
- Original `public/patrick-ridge-{800,1200}.jpg` files remain unchanged. Both generated masters are retained in `docs/photo-variants/`: `patrick-ridge-thumbs-up.png` and `patrick-ridge-thumbs-up-single-rope.png`. About uses the new single-rope 800/1088 JPEGs; no original asset was overwritten.
- Validation: typecheck, production build/check, original-file diff check, and JPEG dimensions passed. Updated the image dimensions to match the exported 800 x 1065 image.
