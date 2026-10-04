# mcheyser-site: progress

## Current state (2026-10-04)

**Phase:** live. The October 2026 redesign was merged into `main` (`a4dd7f8`) and deployed by Railway at 08:52 MDT on 4 October 2026, after two rounds of outside-model review and Patrick's local review.

- Spec: `docs/design-spec.md` (amendments marked "Amended"). Copy: `docs/website-copy-2026-10.md`.
- Every review finding and its disposition, both rounds plus the fresh branch review and Patrick's rulings: `docs/design-review-2026-10.md`. Raw replies: `review-out/`.
- `npm run typecheck`, `npm run build`, `npm run check` and both screenshot sets pass.
- Launch checks done on the live site: real paths and the old `/#/apply` link land; a real note went through the live form and arrived (Gmail, 14:55:40 UTC); `og.png`, the favicon, the 1200w portrait and the hosted talk are served.
- Launch finding fixed the same morning (`97645cc`): the host sent no `Cache-Control`, so `npm start` now runs `scripts/serve.mjs` with `no-cache` for HTML and `immutable` for hashed assets.
- EmailJS template `template_epa95qj` ("Contact Us") updated on 4 October at 5:12 pm MDT in the dashboard (account under patrick@mcheyser.com): subject "New note from {{name}}", body with Name, Email, Company, Website and the note (line breaks kept), retired fields removed. Verified with a second live send, which arrived with all five fields.

## What's next

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

## 2026-10-04: Client Work and MTRO PRO

- Added `/work` and `/work/mtro-pro`, linked from header/footer, Home, Working Together and About. Home now features the published work rather than the three generic examples.
- Built two responsive, accessible diagrams using the existing Figure/Flow/Node components. Story explains account research, follow-up preparation, support intake and browser QA. It makes no numerical savings claim. Other story material is excluded from this release.
- Updated canonical copy before implementation. Added route/metadata, click-through, CTA, external-client-link and diagram-layout checks; removed assertions for the retired Home example diagrams.
- Typecheck, production build/check, full desktop/mobile screenshots, five-width overflow checks and diff whitespace check passed. Contact-provider checks are mocked; no email was sent. First new-route test attempt checked the DOM before navigation had rendered; fixed the test to wait for the destination diagram and reran successfully.
- Release target: `patrickmch/website` main, automatically deployed by Railway. Previous live revision `22f4fdc`; rollback is a reviewed revert of this release commit. Live verification follows push.

- **Live verified:** release `5f9d7df` pushed to `main`; Railway serves `/work` and `/work/mtro-pro`. Headless Chrome confirmed exact story paragraphs, canonical URL, both diagrams, Home-to-story and story-to-contact navigation, mobile menu and diagram fit at 390px. No contact message sent.
