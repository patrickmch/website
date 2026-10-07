# mcheyser-site: progress

## 2026-10-07: Outcome headings and proof callouts live

- Patrick approved the headings and pen-note branch for release. GitHub `main` fast-forwarded from `bf6b101` to `57f53af`; Railway served the new bundle within a minute. Gate: clean tree, build, production check.
- Patrick also asked to merge the other active branch, `pen-notes-2026-10-07`. It is the other session's build of the same pen-note design from the same afternoon: the same eight notes, record-row support and legend, in the same eight files, but without the headings and still carrying the "99 old quotes, 99 matches" note Patrick had vetoed. Merging it would have conflicted in every file and reintroduced that note, so it was left unmerged; everything of value in it is in `57f53af`. `claude/inspiring-sagan-4kon9p` (external-review scripts, 4 October) is unrelated to the site pages and was not merged.

## 2026-10-07: Outcome headings and proof callouts

- Patrick reviewed two rounds of heading proposals (saved in the McHeyser wiki, `story-headings-proposal-2026-10-07.md`). Every story title and subheading now states a specific outcome in his chosen words; Psyche gets subheadings for the first time. Narratives, summaries, bullets and status lines are unchanged. Page titles follow the new H1s; the production check's expected titles and heading filters follow.
- The pen circle no longer repeats "a person decides" on every figure. It marks the proof point in each figure, with a note that states the fact: 10,000 formulas distilled into 111 rules; four errors found, 29,820 formulas fixed; 1,500 tests before anything goes live; a failed night keeps yesterday's copy; two records disagree, so it says so; a broken source raises an alert; seven failures, each with steps to repeat it; five skills, each with a pass or fail check. The human step stays unmarked. Record rows can carry a circle and a note. Legend: the pen marks the detail worth checking.
- The Working Together illustrations' notes say what happens rather than a state: the quote waits for the owner's price; no PO number, so the invoice waits; waiting on the owner's price; an unusual job, so a person prices it.

## 2026-10-07: Client stories live

- Patrick approved the figures branch for release. GitHub `main` fast-forwarded from `49aec9f` to `569ac52` (ten commits: the language review's four stories and the drawn figures with their full and simple versions). Railway rebuilt and the live bundle changed within two minutes of the push.
- Pre-deploy gate in the worktree: clean tree, build, production check passed. The deploy was a fast-forward, so no merge commit; the stories branch `client-stories-stronger-2026-10` is fully included.
- Live checks: Client Work index, the manufacturing story at pane width (simple figures) and at 1280px (full figures), the healthcare story at phone width, console clean.

## 2026-10-06: Figures on the reviewer's text, full on wide screens and simple on phones

- Patrick chose the language-review text over the 4 October narrative and liked its outcome subheadings, so the figures branch now sits on `d9727dd` with that text untouched. Earlier figure work is tagged `story-figures-fixed-canvas-2026-10-06`.
- Each story figure has two drawings. From 1024px up it shows the full drawing, which is laid out for that width. Below 1024px (phones, tablets, and the app's side pane) it shows a simple three-step version in the same primitives: a `useWideFigure` hook switches them, so only one is in the page at a time. The fixed-canvas scaling is gone.
- Figures sit under the subheading they illustrate: manufacturing under pricing, reporting and delivery; healthcare after the connected-systems and access paragraphs; Psyche after the recap example; MTRO PRO under its first two sections. Two manufacturing subheadings and the healthcare handover section have no figure on purpose.
- Pen circles measure layout size now, so a circle inside any transformed ancestor is not scaled twice (the defect Patrick saw as a missing mark). Small print says automatic on the steps that run on their own; a legend under the first figure on each page explains it.
- Production check passed in the worktree; figure counts three, two, one and two. Copy canon, design spec (5.8, 7.1) and the proposal record the change.

## 2026-10-06: Fuller manufacturing story with outcome subheadings

- Expanded the manufacturing story from roughly 250 to 370 words before subheadings. The narrative explains the sales handoff, quoting application, reporting ownership and development process. Four supporting bullets retain the metrics and add hiring/handover and software-investment details. The approved main title is unchanged.
- Added five outcome subheadings above the substantive body paragraphs: "A clearer path from sales into operations", "Pricing expertise turned into working software", "Management reporting with traceable numbers and clear ownership", "A repeatable way to deliver and improve software", and "Technical decisions backed by hands-on delivery". The list introduction remains a short label. The closing paragraph keeps anticipated business gains framed as the aim of the engagement.
- Updated the copy canon before the content file. Verified exact canon agreement and that all other stories, the main title, summary, metadata, figures and tables are unchanged. Production checks passed, including navigation, five-width layouts, semantic headings and bullets, metrics, metadata and mocked contact paths. Browser readback confirmed all five subheadings. Language analysis flagged only the Markdown emphasis used for headings and metrics; that approved formatting was retained.
- Changed files: `content/clientStories.ts`, `docs/website-copy-2026-10.md`, `docs/design-spec.md`, `scripts/check-production.mjs`, and `PROGRESS.md`. Existing untracked `AGENTS.md` and `raw/` remain excluded. This revision stays on `client-stories-stronger-2026-10` for local review; no production release.

## 2026-10-06: Outcome headings and manufacturing narrative

- Applied Patrick's approved manufacturing narrative: assessment into fractional CTO and management-team work, sales handoffs across CRM and team responsibilities, two supporting examples, and the intended business outcomes. Retained the scale of the quoting workbook (almost 10,000 formulas), comparison against 99 archived quotes, reporting logic repeated across nearly 30,000 formulas, and operator-testing context.
- Replaced all four story titles with outcome statements, shared by their cards and detail pages. Manufacturing: "Business priorities turned into working systems." Healthcare: "Scattered records brought together for daily work." MTRO PRO: "Customer problems turned into product improvements." Psyche: "A team equipped to build and improve its own AI tools." Revised healthcare and MTRO editorial section headings in the same direction, along with browser metadata titles.
- Updated the copy canon first. Added semantic list rendering within the existing story prose so the two manufacturing examples support the narrative. Other story bodies, summaries, figures and tables are unchanged.
- Typecheck, canonical-copy comparison (38 strings), production checks and normal preview build passed. The production check covers five-width layouts, navigation, metadata, list rendering, retained metrics, intended-outcome wording and mocked mail paths. Browser readback confirmed the manufacturing narrative and all four index titles. No new browser errors were found. The humanizer reported only the explicitly approved bold emphasis and labeled bullets, with no content, language or filler findings; those formatting choices were retained.
- Changed files: `content/clientStories.ts`, `content/mtroWork.ts`, `docs/website-copy-2026-10.md`, `pages/ClientStoryPage.tsx`, `docs/design-spec.md`, `scripts/check-production.mjs`, and `PROGRESS.md`. Existing untracked `AGENTS.md` and `raw/` remain excluded.
- Continued on `client-stories-stronger-2026-10` for local review at `http://localhost:4173/work/manufacturing-systems`. No production release.

## 2026-10-06: Local preview restored

- Investigated a blank manufacturing story in the open review tab. The browser reported `Failed to fetch dynamically imported module` for `ClientStoryPage-OBeECiix.js`; the file existed in `dist/assets/`, but nothing was listening on port 4173.
- Restarted the existing build with `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` and reloaded the tab. The story and module returned HTTP 200. Verified the latest manufacturing copy and navigation from Client Work back into the story, with no new browser errors.
- No application changes or deployment. Only this progress record changed. The preview is a local process and must be restarted if that process stops.

## 2026-10-05: Broader engagement narratives and portfolio emphasis

- Applied Patrick's approved direction: shorter technical examples within stories that explain the broader responsibility, work with existing teams, and handoff. Manufacturing now leads with fractional technical leadership, investment advice, reporting ownership and delivery standards. Healthcare includes operational discovery, staff-built workflows and maintenance guidance. MTRO PRO connects customer support with engineering repairs and QA. Psyche includes implementation guidance and a method for the team to maintain its own tools.
- Body copy across the four stories is about 24% shorter (1,751 to 1,335 words). Metrics support selected examples. Operator testing, continuing rollout, the uninstalled Psyche workflows and unmeasured time savings remain explicit. Anonymous stories retain generic sector labels and exclude client names, staff names, vendor identities and private research.
- Home and Client Work lead with manufacturing and healthcare in the existing responsive card grid. MTRO PRO and Psyche follow under "More client work" on the index. Working Together now points to manufacturing. The detailed story figures and tables are unchanged; the MTRO preview is no longer on Home or the index.
- Updated the copy canon before implementation and checked all 46 story text/metadata strings against it. Typecheck passed. The first production run exposed a missing wait in the new ordering check; fixed it. The next attempt encountered an occupied test port. `BASE_URL=http://127.0.0.1:4173 npm run check` then passed all checks, including story order, five-width layout, navigation, metadata, mocked mail paths and browser errors. Home cold load measured 586 KB, within the existing budget. Reviewed the lead stories and overview in the browser at desktop and narrow widths. Language checks passed; they supplement the editorial and source review.
- Changed files: `components/ClientWorkFeature.tsx`, `content/clientStories.ts`, `content/mtroWork.ts`, `docs/design-spec.md`, `docs/website-copy-2026-10.md`, `pages/ClientWorkPage.tsx`, `pages/MtroWorkPage.tsx`, `pages/WorkingTogetherPage.tsx`, `scripts/check-production.mjs`, `styles/pages.css` (comment only), and `PROGRESS.md`. Existing untracked `AGENTS.md` and `raw/` are excluded.
- Review branch: `client-stories-stronger-2026-10`. Preview: `http://localhost:4173/work`. This revision is for review; main and production are unchanged.

## 2026-10-05: Remaining client story narratives

- Applied the approved manufacturing narrative approach to MTRO PRO, healthcare and Psyche Digital. Updated their summaries and body copy, plus healthcare and Psyche metadata, in the copy canon before updating the content files.
- MTRO connects account preparation with testing the customer journey. Healthcare follows scattered records into a shared source that supports preparation and review. Psyche follows the used content system into the broader assessment and materials for a first trial. Counts explain the scope of the work rather than stand alone as accomplishments.
- Kept the existing production, rollout and trial boundaries, including unmeasured time savings. The manufacturing story, tables and newly redrawn figures are unchanged.
- Typecheck, production build/check, exact canonical-copy checks and diff whitespace checks passed. Production checks include five-width story layout and mocked contact-form paths. Read back the three rewritten pages in the local preview with no browser errors.
- Continued on `client-stories-stronger-2026-10`. Local review starts at `http://localhost:4173/work`; production release remains a separate decision.

## 2026-10-05: Manufacturing story narrative

- Revised only the manufacturing story, its summary and metadata after feedback that the shorter prose still read as a list. The story now follows the engagement from assessment into technical leadership, carrying spreadsheet knowledge into software and establishing a way to maintain it.
- Used the figures to explain the work: spreadsheet size describes complexity, archived quotes explain how the application was checked, and repeated comparison logic explains the scale of the reporting corrections. Reporting ends with agreed definitions and an internal handover. Operator testing and pending business approval remain explicit.
- Updated the canonical copy and `content/clientStories.ts`. Other stories, figures and tables are unchanged. Typecheck, production checks, canonical-copy checks and diff whitespace checks passed. A final wording refinement was rebuilt for preview.
- Continued on `client-stories-stronger-2026-10` for review at `http://localhost:4173/work/manufacturing-systems`. Production release remains a separate decision.

## 2026-10-05: Client story language review

- Revised the four stories and their summaries on `client-stories-stronger-2026-10`. Updated the canonical copy first, then `content/clientStories.ts` and `content/mtroWork.ts`.
- Shortened the prose by about 22%. Kept concrete examples while cutting repeated counts of reports, screenshots and code changes. Replaced internal testing terms with explanations a business owner can read, and split long lists into shorter sentences.
- Retained operator testing, staff rollout, the proposed first trial and unmeasured time savings as distinct statuses. This was an editorial review of the existing branch, not a new audit of the underlying engagement records.
- Verified canonical copy against all revised summaries, paragraphs, headings and metadata. Typecheck, production build/check and diff whitespace checks passed. The production check covers story navigation, metadata, five-width layout checks and mocked contact-form paths. Reviewed the overview and manufacturing story in the local preview.
- Ready for copy review at `http://localhost:4173/work`. This revision is on the existing review branch. Production release remains a separate decision.

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

## 2026-10-04: Additional client stories

- Added anonymous manufacturing and healthcare stories and a named Psyche Digital story under Client Work. Existing MTRO PRO copy and diagrams are unchanged.
- Manufacturing reporting describes source tracing and metric definitions; the quoting, software delivery and operator-testing status remain. Healthcare retains ongoing rollout and unmeasured impact. Psyche retains the first-trial status.
- Added the two approved diagrams, readable mobile text views, workflow breakdowns, story navigation and contact links. Canonical copy is in `docs/website-copy-2026-10.md`.
- Verified typecheck, production checks, exact approved body copy for healthcare and Psyche, diagram integrity, desktop/mobile screenshots, and overflow checks at 360/390/768/1024/1440 pixels. No mail sent. Live verification follows deployment.
- Live verification passed at mcheyser.com for all three new story routes: exact body copy, canonical URLs, original diagram bytes, overview-to-story and story-to-contact journeys, mobile fit and readable diagram views. No browser errors or form submission. Initial readback raced page rendering; waiting for the complete story confirmed the expected copy. Application release: `8363574`.

## 2026-10-04: Client Work brought into the design system

- Patrick asked for the new Client Work pages to match the existing way of working. The two story diagrams were external SVG images in a different palette and typeface; the MTRO figures marked the human step with an orange box border; client labels were bold sans with a middle-dot meta string; bold lead-ins sat inside paragraphs; the workflow tables were ad-hoc definition lists; the phone fallback used an orange rule as decoration.
- Now: every figure is drawn with the Figure primitives (equal-height node rows), the pen circles the step where a person decides with the note "a person decides" below it, client names are the mono eyebrow with the kind of engagement on a small line, lead-ins are H2s set at H3 size, tables use the board style (headers over values on phones), and the SVG files are gone. The healthcare figure is four nodes (five clipped single words at 768px). Spec section 7.6 records the pages; the copy doc's diagram sections match the drawings; the check asserts drawn figures, circles, board tables and headings on every story.
- Patrick then approved five copy and structure changes, applied the same evening: client labels are the client or sector only; "and" replaces "+" in figure words; the three illustrative examples (quoting tool, paperwork, job board) are back on Working Together under "What this can look like" as Figs. 1 to 3, with the Sprint timeline as Fig. 4 and their checks restored; the two "not yet measured" closers fold into the status sentences; every story link says "See the work" and every index link "See all client work".

## 2026-10-04: Calls to action point at the client work

- Patrick asked for some calls to action to say "see how I've worked with others". Wherever "Let's talk" stood alone in a hero or closing call (the Home hero and closing, the Working Together hero and closing, the About closing), the secondary link "See how I've worked with others" now sits beside it and opens Client Work. On About it replaces "See all client work". The three closing calls on the Client Work pages keep "How we work together". Navigation links to the index ("See all client work" after the featured work on Home, and above each story's title) are unchanged.
- The button and the link share one row class, `.cta-row`, centered on one line; the link drops under the button on phones. That also fixed the About closing, where the button sat lower than the link because the closing's button margin applied inside the row.
- Copy doc (page sections, shared links table, content brief) and spec 5.3, 7.1, 7.2, 7.3 and 7.6 amended. The check asserts every pair (destinations, wording, one center line at 1280px), that the hero link opens Client Work, that the Client Work closing does not link to itself, and that the phone hero row fits the screen.
- Typecheck and the production check passed.

## 2026-10-04: Index links say a sample, not all

- Patrick flagged "See all client work": "all" claims the index shows everything, and it shows a sample. The three index links (after the featured work on Home, and above each story's title) now read "See a sample of client work". "A sample of" rather than "sample work", so nobody reads "sample" as mock-up work beside the illustrative examples on Working Together.
- Copy doc and spec 7.1 and 7.6 amended. The check asserts the index link text on Home and two story pages and that no link on those pages contains "all ... work".
