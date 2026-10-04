# Design review, October 2026: findings and dispositions

Three outside models reviewed the redesign on 3 and 4 October 2026 with the same packet: `docs/design-spec.md`, `docs/website-copy-2026-10.md`, the full source of the branch at `1472a7f`, and 31 screenshot tiles of every page at 1440px and 390px with review mode on. The brief (`BRIEF` in `scripts/adversarial-review.mjs`) told them to attack the concept and the spec as well as the build. Their full replies are in `review-out/`.

| Reviewer | Model | Time | Findings | Verdict in one line |
| --- | --- | --- | --- | --- |
| Gemini | gemini-2.5-pro (API) | 61s | 10 | Ship after the majors; the hash router is the biggest risk |
| Codex | Codex CLI 0.160.0, Patrick's default model | 212s | 30 | Not unchanged: proof and the offer need to come earlier, and the contact path must be verified |
| Grok | Grok CLI, default model | 972s | 27 | Not as is: the design puts a brand system in front of a plain letter, and the drawings read as costume |

The independent Claude session named in spec section 13 did not run: the cloud session that was to host it was stopped before it produced output. This local session reviewed the screenshots itself and its own observations are listed under "This session" below.

Severities are the reviewers' own. Where this session disagrees, the disposition says so. Commits are on `redesign-2026-10`:

| Commit | Scope |
| --- | --- |
| `29e0a78` | Screenshot tooling: public-composition set, overflow at 360, 768 and 1024px |
| `d3be95c` | `scripts/check-production.mjs` rewritten with one assertion per fix (50 failures before the fixes, 0 after) |
| `19c9365` | Routing: BrowserRouter, old `#/` links rewritten, per-route metadata, focus on navigation, intake page in its own chunk |
| `af836ef` | Accessibility: focus on ink, keyboard menu, table semantics, 44px targets, input borders, scroll margins |
| `5eb7924`, `d95779e` | Diagrams: measured fans, phone branch labels, elbow leader, node sizing, Fig. 4 circle, Fig. 5 caption and columns, captions |
| `f5513ba` | Home, footer, motion, token, social image, wordmark, favicon, invented heading |
| `0c428b7` | Contact form: focus, alert, honeypot, mail library on demand |
| `0601519` | Spec amendments and project docs |
| `7b7b7b7` | Round two: validated snapshot send, safer honeypot, persistent review flag, heading levels, Fig. 2 boundary, labels, phone circle padding |
| `a7ac302` | Round two craft: 2px wordmark stroke, disabled button opacity, 16px header button, 1200w portrait, quiet console, focus the heading, and the fresh branch review's minors |
| `739c809` | Phone circles drawn inside a full-width box, with an edge assertion in the check |

## Dispositions

Disposition values: **fixed** (with the commit), **fixed in part** (what was done and what was not), **declined** (with the reason), **deferred** (Patrick's decision, see the last section), **open** (verified at launch).

### Gemini

| # | Severity | Where | What | Disposition |
| --- | --- | --- | --- | --- |
| G1 | major | `App.tsx` routing | `/#/` URLs look dated, hurt search and analytics | **fixed** `19c9365`: BrowserRouter with real paths. The live Railway host and `vite preview` already serve `index.html` for every path (probed before the change). Old `#/` links are rewritten on arrival. Each route sets its canonical link and Open Graph title, description and URL. Prerendering static HTML per route is deferred (see decisions) |
| G2 | major | `Figure.tsx` annotation leader | Straight line where the spec says a two-segment elbow | **fixed** `5eb7924`. Re-graded minor: a craft detail, not a reader-facing defect |
| G3 | major | `App.tsx` skip link | `onClick` is "insufficient for keyboard users" | **declined**: pressing Enter on a focused link dispatches a click event, so the handler already runs for keyboard users. With real paths the `href="#main"` also works natively |
| G4 | minor | `base.css` link underline | `--mark` underline is 3.3:1 on paper | **declined**: the underline exceeds the 3:1 non-text minimum, the link text is ink, and the orange underline is the pen rule in `CLAUDE.md` (Patrick's) |
| G5 | minor | `AboutPage.tsx` `sizes="350px"` | Browser may download a larger image than needed | **declined with evidence**: the photo is hidden below 1024px and lazy, and 350px is its only rendered width. Measured on the build: at 390px no ridge file is requested; at 1440px (1x and 2x) the 800w file is |
| G6 | minor | `Header.tsx` menu | Body scroll not locked behind the open menu | **declined**: the panel pushes content down beneath a sticky header and is two rows tall (spec 5.1). Locking scroll is the overlay pattern, which the spec rejects |
| G7 | minor | Fig. 6 outcomes | Stacked column on desktop leaves space; use the 2 by 2 grid | **declined**: the fan needs four vertical targets. Each branch now meets its node exactly (`5eb7924`), which was the real weakness |
| G8 | minor | spec 7.1 | "H3-level heading styled as H2" is confusing | **fixed** in the spec, `0601519`: it is an H2 |
| G9 | taste | spec 3.1 `--mark` | Orange too bright; mute to `#D15B2F` | **declined**: the tokens are fixed by Patrick's instruction. The only change to `--mark` is one unit of green for contrast (C21) |
| G10 | taste | spec 3.2 type | Source superfamily is generic; try IBM Plex | **declined**: tokens fixed. Noted for Patrick |

### Codex

| # | Severity | Where | What | Disposition |
| --- | --- | --- | --- | --- |
| C1 | blocker | Contact submission | End-to-end delivery is not demonstrated; the failure and retry path is unverified | **verified at launch** (4 October, 08:55 MDT): a real note sent through the live form arrived in Patrick's inbox at 14:55:40 UTC with name, email, website and challenge, and the reply-to set to the sender. Finding from that email: the EmailJS template is still the old application template and has no line for `company` (it prints the retired Community, Involvement, Goals, Why Now, Additional and Budget fields instead); Patrick updates the template in the EmailJS dashboard. The failure path, the retry, the honeypot and the success path are exercised by `npm run check` with the provider mocked (`d3be95c`, `0c428b7`) |
| C2 | major | Fig. 2 | "Build and test it with the team" contradicts the Sprint ending at findings | **fixed** `5eb7924`: the caption now reads "How the work gets looked at, then changed. A Discovery Sprint covers the first three steps." The screen-reader description says building is scoped separately. Spec amended |
| C3 | major | Proof | No testimonial, deliverable or named engagement on the published site | **deferred** to Patrick (open question 4). Nothing can be fabricated |
| C4 | major | Home order (spec 7.1) | The offer and the person come after the hero diagram, four cards, the approach and three examples | **deferred** to Patrick: section order is the copy doc's order and the spec's principle 5 is a deliberate choice. Recommendation in the last section |
| C5 | major | `Fan` on phones | Branches collapse to one arrow, so Fig. 3 reads as a sequence and Fig. 4 loses "one record, three documents" | **fixed** `5eb7924`: on phones a fan is a labelled connector ("both go in", "one of these", "carries into each", "then one of these") and the stacked boxes get a bracket |
| C6 | major | `Fan` geometry | Endpoints at equal fractions of the stretched height miss the nodes; Fig. 4's upper branch ends above "Work order" | **fixed** `5eb7924`: the fan measures the real centres of the boxes on both sides, on resize and font load. The check measured the miss at 32px before and 0px after |
| C7 | major | `.field__input` | Border 1.45:1 and fill 1.08:1 against the page | **fixed** `af836ef`: idle border is `--stroke` (3.8:1 on the input fill). Spec amended |
| C8 | major | `base.css` focus in the ink block | Ink outline on ink background is invisible | **fixed** `af836ef`: `.ink-block :focus-visible` is paper |
| C9 | major | Route and menu focus | No focus handoff on navigation; Escape strands focus | **fixed** `19c9365` (a new page moves focus to `main`, not on back and forward) and `af836ef` (Escape returns focus to the Menu toggle). Both are asserted by the check |
| C10 | major | Contact success | The form unmounts under the focused button and a new status region is not reliably announced | **fixed** `0c428b7`: the confirmation receives focus. Asserted with the provider mocked |
| C11 | major | Discoverability | One document for four pages; client-side titles do not give independently served metadata | **fixed in part** `19c9365`: real paths, canonical and Open Graph per route. Codex is right that prerendered HTML per route is the complete answer; it is deferred because it needs the host to serve a generated `/about/index.html` for `/about` (file-based serving, a different behaviour from the index fallback the live host was probed for), which can only be confirmed by deploying such files. See decisions |
| C12 | major | `IntakePage.tsx` | A named client's intake is publicly routable; `noindex` is not privacy | **deferred** to Patrick (open question 3). Mitigation now: the page is its own chunk, not in the marketing bundle (`19c9365`). Recommendation: remove the route |
| C13 | major, copy | Discovery Sprint terms | No duration, time commitment, fee range or visible deliverable | **deferred** to Patrick: the words are fixed by the copy doc, and the FAQ answers the fee question deliberately |
| C14 | major, copy | Fig. 1 caption | "where work usually waits" states a diagnosis as fact | **fixed** `5eb7924`: "In this example, the work waits for a pricing decision." Re-graded minor |
| C15 | minor | Figs. 3 and 4 | Human approval is a footnote, not a step | **declined**: Fig. 3's centre node says "prepared for review" and one output says "Ready for review"; Fig. 4 says "Checked by a person before it goes out." A separate approval gate would clutter both drawings |
| C16 | minor | Fig. 1 on phones | Five stacked boxes cost about 500px to say one thing | **deferred** to Patrick: Grok found the same stack readable. A three-node phone variant (the social image already defines one) is a small change if wanted |
| C17 | minor | Figure type | Mono at 13 to 14px is the smallest text on the page; use sans at 15 to 16px | **declined**: mono figure text is the spec's type system, and the screenshots read cleanly at 14px/500 |
| C18 | minor | Fig. 5 on phones | Value and annotation become flex siblings | **fixed** `5eb7924`: the annotation sits under the value in its own column |
| C19 | minor | `.board thead` | `display:none` removes the headers from the accessibility tree | **fixed** `af836ef`: visually hidden instead, with explicit table roles |
| C20 | minor | Hit areas | Small button 40px, nav links 36px, wordmark and footer links smaller | **fixed** `af836ef`: all at least 44px, asserted by the check |
| C21 | minor | `tokens.css` | Ink on `#D9622B` is 4.49:1, under the spec's 4.5:1 | **fixed** `f5513ba`: `--mark` is `#D9632B` (one unit of green), 4.52:1. Calculated, not rounded. The only token touched; favicon, style tile and spec follow |
| C22 | minor | Review screenshots | The dashed slots change the composition reviewers see | **fixed** `29e0a78`: `REVIEW=0` writes the public set, which was looked at. The person slot moved below its row (`f5513ba`) so the public layout no longer depends on it |
| C23 | minor | QA coverage | Missing breakpoints, forced reduced motion, no keyboard or delivery checks | **fixed in part** `29e0a78`, `d3be95c`: overflow at 360, 768 and 1024px; keyboard menu, form paths, focus, transfer size in the check. Draw-on verified by hand (dash offset sampled 1 to 0 over about 600ms). Still untested by script: screen-reader reading order and layout shift |
| C24 | minor | Fonts and performance | No measured transfer or layout shift; Google Fonts is a third party | **measured**: Home cold transfer 571 KB including fonts (budget 600 KB). Self-hosting fonts deferred to Patrick (recommended later) |
| C25 | minor | `scroll-behavior: smooth`; scroll reset | A second motion idea; reading position lost on back | **fixed** `f5513ba` (no smooth scroll) and `19c9365` (no scroll-to-top on back and forward) |
| C26 | minor | Problem cards | 01 to 04 imply a sequence | **fixed** `f5513ba`: the four problems are unnumbered; the three stages keep their numbers |
| C27 | taste | Wordmark at header size | The device does not survive 22px | **fixed in part** `f5513ba`: one stroke at header size. The raised c stays (spec 4.1) |
| C28 | taste | Circles everywhere | The same mark for different meanings | **declined**: one circle per figure marking the step that matters is the concept. Noted for Patrick |
| C29 | taste | About | Personality before professional substance | **deferred** with the climbing photo (open question 1) |
| C30 | minor | `og.png` | Too detailed for card size | **fixed** `f5513ba`: labels only, larger promise and annotation, tested at card size |

### Grok

| # | Severity | Where | What | Disposition |
| --- | --- | --- | --- | --- |
| X1 | blocker | Fig. 5, Fig. 1 caption, proof | Invented names and job numbers read as a real board or as costume; "Illustrative." is the only hedge; no proof is published | **fixed in part** `5eb7924`: Fig. 5 carries the visible title "Example job board" and Fig. 1's caption says what this example shows. **Declined**: stripping names and numbers, because the drawings are meant to look like real work and are labelled as examples twice. Proof: deferred (open question 4) |
| X2 | major | Home first screen | A system before a face; "or AI tools" in the hero; the person on tile 4 | **deferred** to Patrick: the hero words and the section order are the copy doc's. See decisions |
| X3 | major | The pen is spent | Orange on the button, every link underline, the active nav item and the card numbers | **declined**: the button and underline uses are Patrick's rule in `CLAUDE.md`. The card numbers are gone (`f5513ba`). Noted for Patrick as the main concept-level disagreement |
| X4 | major | Wordmark and favicon | Stretched strokes become a blot; the favicon curve reads as a smile | **fixed in part** `f5513ba`: one stroke at header size, a shorter favicon stroke. Close-ups at 1x and 3x showed a small pen dash, not a blot. The raised c stays (spec 4.1) |
| X5 | major | Fig. 1 desktop | Labels wrap and boxes differ in height | **fixed** `5eb7924`, `d95779e`: boxes size to their text, share the slack and are one height; sublabels stay on one line from 1200px (measured at 1200, 1280 and 1440px) |
| X6 | major | Fig. 5 | "Crew B" breaks; the phone annotation collides with the circle | **fixed** `5eb7924`: who and next columns do not wrap; the phone annotation sits under the value. A full-width table was not needed after the fix |
| X7 | major | Fig. 2 | Repeats the paragraphs; grid hole at column 8 | **fixed in part** `5eb7924`: columns 8 to 12, and the caption now adds what the paragraphs do not (which steps are the Sprint). Deleting the figure is declined; noted for Patrick |
| X8 | major | Fig. 6 | Redraws the next section; the desktop fan knots; sublabels not in the spec | **fixed in part** `5eb7924`: the fan is measured, so the knot is gone. Sublabels kept and the spec amended. Deleting the figure is declined; noted for Patrick |
| X9 | major | "Fig." and "Illustrative." | The apparatus turns a letter into a white paper | **declined**: the findings-document register is the concept (spec 2 and 5.4). Noted for Patrick. The spec's "two spaces" is amended to one |
| X10 | major | Working Together | Commercial terms are the quietest text on the page | **deferred** to Patrick (copy) |
| X11 | major | Stage cards | A generic services grid, and a hidden heading not in the copy | **fixed in part** `f5513ba`: the invented hidden heading "How we work together" is removed. The cards stay (spec 7.2) |
| X12 | major | Climbing photo | Sells a different practice; the loudest orange on the site | **deferred** to Patrick (open question 1). Recommendation: cut it |
| X13 | major | "Work directly with me" row | Designed around a slot production removes; a future quote would be a footnote | **fixed** `f5513ba`: the slot sits below the whole row at full width; the public composition was screenshotted and looked at |
| X14 | major | Focus on the Sprint link | Ink ring on ink | **fixed** `af836ef` |
| X15 | major | Form submit | Focus thrown away; "Sending" shown twice; error should alert with a mailto; spec centres the success copy | **fixed** `0c428b7`: focus moves to the confirmation, the error is a `role="alert"` with a mailto link, the live region announces sending without showing it twice. Spec amended: success copy left-aligned |
| X16 | major | One HTML file | Every page shares the home title and image for crawlers and chat apps | **fixed in part** `19c9365` (real paths, canonical and Open Graph per route). Prerendering and a second social image for Working Together are deferred |
| X17 | major | Intake page | A named client's intake in the public bundle | **deferred** to Patrick (open question 3); now its own chunk. Recommendation: remove the route |
| X18 | major | Figs. 3, 4, 5 | Wireframes of software that does not exist; Fig. 4's circle swallows the flag | **fixed in part** `5eb7924`: Fig. 4 circles the empty gap only. The rest is declined: the drawings show work and its outcomes, not product chrome, and the spec lists their content |
| X19 | minor | Header button 40px; "Let's talk" on Contact | Below the 44px rule; a self-link beside Send | **fixed in part** `af836ef` (44px). The header stays the same on every page |
| X20 | minor | Sticky header | A focused field can scroll under it | **fixed** `af836ef`: `scroll-margin-top` on fields and headings |
| X21 | minor | Form protection | No honeypot or rate limit; polite error; address not a link | **fixed in part** `0c428b7`: honeypot, alert, mailto. Rate limiting is an EmailJS dashboard setting (Patrick). A copy clause naming the form provider is deferred (copy) |
| X22 | minor | Bundle contents | Review strings and the invented heading ship; unused italics in the font URL; EmailJS on Home | **fixed in part** `0c428b7` (EmailJS loads on send), `f5513ba` (heading gone). **Declined**: italic faces are only fetched when italic text renders, and the proof-slot labels are not placeholder testimonials |
| X23 | minor | Social image and spec mismatches | Name line and sans tagline not in the spec; smooth scroll | **fixed** `f5513ba` (smooth scroll, image sizing) and the spec amended to match the image |
| X24 | minor | `PenCircle` draw-on | The path appears after the class, so the hero circle never animates; padding crowds connectors | **declined with evidence**: sampled on the build without reduced motion, the hero path exists before the class lands and its dash offset runs 1 to 0 over about 600ms. Fig. 4's circle now sits on the gap only |
| X25 | minor | spec 5.8 | `role="group"` would wipe the figure role; the hidden text repeats the nodes | **fixed** in the spec `0601519` (native figure). The descriptions stay because they carry the arrows, which the boxes alone do not |
| X26 | taste | Palette, type, radius, green, eyebrow | A known independent-consultant kit | **declined**: tokens and type are fixed by Patrick's instruction. Noted |
| X27 | taste | Section padding | Tuned like a specimen | **declined** (spec 3.3). Noted |

### The handoff's own flags

| # | Where | What | Disposition |
| --- | --- | --- | --- |
| H1 | Routing | Search engines see one page | **fixed** `19c9365` (prerendering deferred) |
| H2 | Problem cards | 01 to 04 suggest a sequence | **fixed** `f5513ba` |
| H3 | Fonts | Self-host the three families | **deferred** to Patrick (recommended as a follow-up) |
| H4 | Fig. 6 | Sublabels the spec did not list | **fixed** in the spec `0601519` |
| H5 | Figures | Spec says `role="group"`, build uses `<figure>` | **fixed** in the spec `0601519` |
| H6 | Fig. 1 on phones | Five stacked nodes run long | **deferred** (see C16) |
| H7 | Footer | The copy doc's "Patrick McHeyser" line only in the copyright | **fixed** `f5513ba` |

### This session

| # | Where | What | Disposition |
| --- | --- | --- | --- |
| S1 | Fig. 1 desktop | Node boxes of different heights, centre-aligned, looked jittery | **fixed** `5eb7924`, `d95779e` |
| S2 | Fig. 3 desktop | The pen circle touched the node above it | **fixed** `5eb7924` (16px stack gap) |
| S3 | Review tooling | Codex 0.147.0 could not run Patrick's configured model | **fixed** outside the repo: `npm i -g @openai/codex@latest` on eagle (0.160.0). Untracked machine change; rollback `npm i -g @openai/codex@0.144.6` |

## What changed and what was kept

Changed, in short: real paths with old links preserved and per-route metadata; focus, keyboard and contrast fixes; fans that meet their nodes and phone diagrams that keep their meaning; captions that say what each example is and which steps are the Sprint; the four problems unnumbered; the footer name line; the form's focus, alert and honeypot; one unit of green in `--mark`; a tidier wordmark stroke and favicon; a social image that reads at card size.

Kept, on purpose: the concept and its register (paper, ink, one pen, "Fig." captions, "Illustrative."); the tokens and type; the orange button and link underlines; all six figures; the section order and every visitor-facing word in the copy doc. Three reviewers argued against parts of this. The arguments are summarised next so Patrick can rule on them.

## Concept-level disagreements for Patrick

1. **The pen is spent on buttons and links** (Grok 3, Codex 28). Both say orange on the primary button, every link underline and the active nav item means the circle no longer reads as a pen. Kept: it is the rule in `CLAUDE.md`. If you agree with them, the change is an ink button and ink underlines, with orange only on pen marks and "Discovery Sprint". Cost: the header loses its one warm element.
2. **The person and the offer come late on Home** (Codex 4, Grok 2). Both want the portrait and the Discovery Sprint within the first screen or two. Kept: the copy doc's order and principle 5. Grok also wants "or AI tools" out of the hero paragraph. That is a copy decision.
3. **Fig. 2 and Fig. 6 restate their paragraphs** (Grok 7 and 8, Codex 2 on Fig. 2). Kept, with the captions and geometry fixed. If you would rather have fewer drawings, these two are the ones to cut.
4. **"Fig." and "Illustrative."** (Grok 9). Grok reads the apparatus as a white paper, not a letter. Kept: it is the concept.
5. **Invented detail in Fig. 5** (Grok 1). Kept with the visible "Example job board" title. If you want it plainer, replace "Maria" with "Office" and drop the job numbers.
6. **Prerendering** (Codex 11, Grok 16). Real paths are in. A build step that writes static HTML per route with its own metadata is the complete answer and is worth doing once the site is live and the host's handling of nested paths can be checked.
7. **Self-hosted fonts** (Codex 24, handoff). Transfer is under budget. Self-hosting removes a third-party request and is a good follow-up.

## Launch, 4 October 2026

Merged as `a4dd7f8` (pull request 4) at 08:51 MDT; Railway's deployment succeeded and the new title was live at 08:52. Checks on the live site: fresh loads of `/`, `/working-together`, `/about`, `/contact`, `/apply`, `/intake/denver-zen-den` and an unknown path all serve the new build; the old `/#/apply` link lands on `/contact`; `og.png` (61,962 bytes), `favicon.svg`, the 1200w portrait and the hosted talk are served; a real note through the live form arrived (C1 above).

| # | Severity | What | Disposition |
| --- | --- | --- | --- |
| L1 | major | The host's default static serving sent no `Cache-Control` (only ETag and Last-Modified), so browsers applied heuristic freshness: a visitor who had loaded the old site could keep seeing it for days, and with its asset hashes gone, get a blank page once those were evicted. Seen in the browser pane, which showed the old site at `/` while a never-visited path showed the new one | **fixed** `97645cc`, deployed 08:57: `npm start` runs `scripts/serve.mjs`, which sends `no-cache` for HTML, `immutable` for hashed assets, an hour for other files, gzip, ETags and a real 404 for a missing file. Verified on the live site and with the full production check against the server locally. Copies of the old page cached before the fix expire on their own |
| L2 | minor | The EmailJS template is the old application template: no Company line, retired fields, subject "New Application from {{name}}" | **fixed** 4 October, 5:12 pm MDT, in the EmailJS dashboard after Patrick signed in: subject "New note from {{name}}", a clean body with Name, Email, Company, Website and the note (line breaks kept), retired fields gone. A second live send arrived with all five fields |

## Patrick's rulings

Recorded as Patrick decides, after seeing the build locally on 4 October 2026.

1. **Wordmark.** The raised c goes. "McHeyser" is set with every letter at the same size and a hand-drawn pen underline runs the full width of the word, the same stroke as the "Discovery Sprint" underline: one stroke in the header and footer, two on the social image. This answers Codex 27, Grok 4, X2-9 and X2-35, and Gemini G2-8, all of which said the device did not survive header size. Spec 4.1 amended.

2. **"Illustrative."** Gone from the four example captions. Patrick read it on the live site as internal text that had leaked through, which is what Grok's X9 and X2-21 argued. The examples are still identified as examples by the section line, Fig. 1's "In this example" and Fig. 5's "Example job board" title. Spec 5.4 and 6 amended. The "Fig. N" prefix stays for now.

## Open questions from spec section 14, with recommendations

1. **Climbing photograph on About.** Recommend cutting it. Two reviewers called it the wrong story, it is the loudest orange on the site, and phones never see it, so the page tells two stories.
2. **LinkedIn link in the footer.** Recommend keeping it. Grok said keep; this audience looks people up.
3. **Intake page.** Recommend removing the route now unless that engagement is live. Two reviewers graded it major, and the page addresses a named contact about a meeting that has passed.
4. **Testimonials and sample deliverable.** The slots render nothing until real material exists. All three reviewers say the strongest proof is one redacted findings deliverable a visitor can open. Recommend making that the first proof to chase.
5. **Documentary photographs.** No change. Decide after launch.

## Verification

On `a7ac302`: `npm run typecheck` clean; `npm run build` clean; `npm run check` passes all assertions (it was 50 failures on `54aea42` before the fixes; it now also asserts heading levels on every route, the persistent review flag, read-only fields while sending, no focus steal on a redirect's first load, a query kept before a legacy hash, the intake page's own canonical, and the pen colour in the rendered header stroke); `TILES=1 npm run screenshots` and `OUT=screenshots/public REVIEW=0 npm run screenshots` report no horizontal overflow at 1440, 390, 360, 768 and 1024px, no failed requests and no console errors. Home cold load, decoded bytes including fonts: 573 KB (an upper bound on transfer; the preview server sends no compression). Still not tested by script: screen-reader reading order (VoiceOver) and layout shift; both are manual checks for Patrick or a later session.

## Round two

The same packet was sent again at `0601519` (the fixed build with the amended spec) on 4 October 2026, into `review-out/round-2/`. A fresh-context Claude reviewer also read the branch diff `1472a7f..cfc499f` with the plan, the spec, the copy doc and the dispositions above.

| Reviewer | Round one | Round two | What moved |
| --- | --- | --- | --- |
| Gemini | ship after the majors; biggest risk the hash router | would not ship: the concept is "designer-pleasing", kill the animation, rougher drawings, different fonts | Praises the metadata and real paths it called a major before; its new case is the concept itself |
| Codex | not unchanged: proof and offer come late; verify the contact path | keep the direction, not ready for launch: proof, offer order, Sprint scale; 29 findings | Round-one craft items are gone; the new concrete items are below and were fixed |
| Grok | would not ship: a brand system in front of a letter | would not ship: same case, 35 findings | Confirms the phone circle, heading and Fig. 2 fixes it could see; adds craft points on the wordmark stroke, the disabled button, the portrait and focus, all fixed |
| Fresh Claude review | (none) | ready with fixes: two Important items, both already fixed in `7b7b7b7`, and nine minors | Verified the routing, the Fan guard, the contrast arithmetic and copy fidelity on a clean export; see below |

### Gemini, round two (12)

| # | Severity | What | Disposition |
| --- | --- | --- | --- |
| G2-1 | blocker | The concept reads as the designer's process: too clean, animated, "perfectly rendered imperfection" | **declined**: the concept and its motion rule are the spec's (2, 3.5); noted for Patrick with the other concept-level disagreements |
| G2-2 | major | `Fan` is over-engineered (ResizeObserver, layout effect) | **declined**: the measurement replaced a 32px miss that CSS cannot fix for boxes of different heights; it is 60 guarded lines and the fresh review confirmed it cannot loop |
| G2-3 | major | Fig. 6 on phones is incoherent | **declined** with the tile: three stacked steps, a connector labelled "then one of these", a bracketed 2 by 2 |
| G2-4 | major | Button fill 3.3:1 on paper is "insufficient" | **declined**: 3:1 is the non-text minimum and the ink label on it is 4.52:1; the suggested darker fill would break the label contrast |
| G2-5 | major | Source fonts generic | **declined** (tokens fixed), as G10 |
| G2-6 | minor | Lock body scroll under the menu | **declined**, as G6 |
| G2-7 | minor | Fig. 2 is decorative | **declined**; noted (the Sprint boundary is now drawn, `7b7b7b7`) |
| G2-8 | minor | Remove the wordmark stroke | **fixed in part** `a7ac302`: the stroke is now a real 2px line (it was rendering sub-pixel); removal declined (spec 4.1) |
| G2-9 | minor | ARIA roles on the table are redundant | **declined**: `display: block` on table parts strips their semantics in some browsers; explicit roles are the standard responsive-table fix |
| G2-10 | minor | Climbing photo | **deferred**, open question 1 |
| G2-11 | minor | Invalid field shows a 3px ring | **declined**: the 2px outline sits 1px inside the 1px border, 2px on screen, and no layout shift |
| G2-12 | taste | The draw-on animation | **declined** (spec 3.5); noted |

### Codex, round two (29)

| # | Severity | What | Disposition |
| --- | --- | --- | --- |
| C2-1, 2, 3 | major | No proof; offer and person late; no Sprint scale | **deferred**, as C3, C4, C13 |
| C2-4 | major | Phone diagrams cost too much height | **deferred**, as C16 |
| C2-5 | major | Fig. 2 still draws implementation as part of the Sprint | **fixed** `7b7b7b7`: two groups, "Discovery Sprint" over steps 1 to 3 and "Implementation, scoped separately" over step 4 |
| C2-6 | major | Fig. 3's two routes both need a person | **declined**: spec content; the caption says which ones need judgment |
| C2-7 | major | Fig. 4 omits scope, pricing and terms | **declined**: illustrative by design (spec 6) |
| C2-8 | major | Real paths without prerendered metadata | **deferred**, as C11 |
| C2-9 | major | Mocked checks cannot prove delivery | **verified at launch**, as C1 |
| C2-10 | major | Fields stay editable while a note sends; the live form is what gets sent | **fixed** `7b7b7b7`: a trimmed snapshot of the validated values is sent with `send`; fields are read-only while sending; a second submit is ignored |
| C2-11 | major | Back/forward restoration is asserted, not implemented | **declined with evidence**: probed in Chromium, Back restored 2200px and Forward 900px with native `scrollRestoration` |
| C2-12, 13 | minor | Circles mean different things; repeated pen is decoration | **declined**; noted |
| C2-14 | minor | "Price decided" contradicts "waits for the owner" | **fixed** `7b7b7b7`: "Price decision" |
| C2-15 | minor | Phone circles crowd the viewport edge | **fixed** `7b7b7b7`: 6px overshoot below 480px |
| C2-16 | minor | Fig. 5 annotation repeats the column | **declined** (spec 6) |
| C2-17 | minor | Mono figure text | **declined**, as C17 |
| C2-18 | minor | Heading levels skip on Working Together | **fixed** `7b7b7b7`: stage titles are H2s set at H3 size; the check asserts no page skips a level |
| C2-19 | minor | Screen-reader reading order needs testing | **open**: a manual VoiceOver pass is on the launch list |
| C2-20 | minor | Fonts and layout shift | **deferred**, as C24 |
| C2-21 | minor | Unknown paths silently become Home | **deferred**: a not-found page needs words that are not in the copy doc |
| C2-22 | minor | Dog portrait height on phones | **declined** (taste) |
| C2-23 | minor | Submission does not trim | **fixed** `7b7b7b7` |
| C2-24 | minor | Honeypot can swallow an autofilled note | **fixed** `7b7b7b7`: the field is `reference`, a name autofill does not recognise; the fresh review agreed |
| C2-25 | minor | Section gaps amplify repeated copy | **declined** (spec 3.3) |
| C2-26 | minor | Review flag drops on the first link | **fixed** `7b7b7b7`: `?review=1` persists for the session, `?review=0` ends it |
| C2-27 | minor | Stale spec details | **fixed** `7b7b7b7`, `a7ac302` |
| C2-28, 29 | taste | Identity not distinctive; Fig. 6's four branches | **declined**; noted |

### Grok, round two (35)

| # | Severity | What | Disposition |
| --- | --- | --- | --- |
| X2-1 | blocker | Invented detail as proof | as X1: title and caption fixed, names kept, proof deferred |
| X2-2 | blocker | The intake page | **deferred** (open question 3); recommendation stands: remove the route |
| X2-3 | major | Hero: diagram in the empty column, "AI tools" out | **deferred**: the words and layout are the copy doc's and spec 7.1; noted |
| X2-4, 5, 6 | major | Orange on buttons and links; drawings are CSS boxes and green ticks; pricing circled twice | **declined** (Patrick's rule, spec 3.1 and 6); noted, with a cheap option for X2-6 (vary Fig. 5's marked row) |
| X2-7 | major | Fig. 6 knots; branch labels wrap; delete it | **fixed in part** `5eb7924` (the knot); wrapping is inherent at this width; deletion declined |
| X2-8 | major | Fig. 2: bracket the Sprint or delete | **fixed** `7b7b7b7` (the boundary is drawn) |
| X2-9 | major | The wordmark stroke renders sub-pixel and pale | **fixed** `a7ac302`: `non-scaling-stroke` at 2 CSS pixels; the check samples the rendered pixels for the pen colour |
| X2-10 | major | Phone circles reach x=386 of 390 | **fixed** `7b7b7b7` |
| X2-11 | major | Portrait late; ridge photo | **deferred**, open question 1 and the order question |
| X2-12 | major | The ink block is a banner with no facts | **declined** (spec 5.11); the facts are copy, deferred |
| X2-13 | major | Heading skip; two-up headings at H3 size | **fixed** `7b7b7b7` (levels); the two-up size is spec 7.2 |
| X2-14 | major | Prerender and a real 404 | **deferred** |
| X2-15 | major | Honeypot; third-party disclosure; disabled button at 2.8:1 | **fixed** `7b7b7b7` (honeypot) and `a7ac302` (no opacity on the disabled button); the disclosure sentence is copy, deferred |
| X2-16 | major | The 2 by 2 problem cards | **declined** (spec 5.6); noted |
| X2-17, 18 | minor | Footer underlines and stage numbers in orange | **declined** (Patrick's rule; spec 5.6) |
| X2-19 | minor | The PO circle is a flat loop | **fixed** `a7ac302`: the circle is on the field name |
| X2-20, 21 | minor | Fig. 5 annotation; "Illustrative." and the slot under Fig. 1 | **declined** (spec 6, 5.4, 7.1) |
| X2-22 | minor | Header button text at 15px | **fixed** `a7ac302`: 16px |
| X2-23 | minor | `--mark` only just clears 4.5:1 | **declined**: measured, and the one case that moved it (opacity) is fixed |
| X2-24 | minor | 1600w portrait on 2x screens; fonts; the check skips the budget when fonts fail | **fixed in part** `a7ac302` (a 1200w candidate, 177 KB); fonts deferred; the skip is deliberate and now printed plainly |
| X2-25 | minor | Slot notes in the bundle | **declined**, as X22 |
| X2-26 | minor | OG label differs from Fig. 1 | **resolved**: both say "Price decision", image regenerated (Grok read the tree mid-change) |
| X2-27 | minor | Spec 11 still said HashRouter | **fixed** `7b7b7b7` |
| X2-28 | minor | 404 page | **deferred** (copy) |
| X2-29 | minor | `console.error` on a failed send | **fixed** `a7ac302`: logs only in development; the check no longer exempts it |
| X2-30 | minor | Focus lands on main with no ring | **fixed** `a7ac302`: focus goes to the page's H1 |
| X2-31 | minor | Header button on Contact | **declined**, as X19 |
| X2-32 | minor | Marks hidden until an observer fires; no-JS | **declined**: a client-rendered page shows nothing without JavaScript anyway; draw-on was measured working |
| X2-33, 34, 35 | taste | Fonts; "four costumes"; the raised c | **declined** (tokens, concept, spec 4.1); noted |

### Fresh-context branch review (Claude)

Read the diff on a clean export, ran the typecheck and the check there (both passed, 571 KB), probed old links, the Fan guard, contrast arithmetic, nav underline states and copy fidelity. Verdict: ready with fixes.

| # | Severity | What | Disposition |
| --- | --- | --- | --- |
| R-I1 | important | H1 to H3 skip on Working Together after the hidden heading was removed | **fixed** `7b7b7b7` (spec 5.6 and 7.2 say H2 at H3 size) |
| R-I2 | important | The `fax` honeypot can be autofilled and silently drops a note | **fixed** `7b7b7b7` |
| R-M1 | minor | A redirect straight off the first load (`/apply`) moves focus to main | **fixed** `a7ac302`: a REPLACE whose previous location is the default is still the first load; asserted |
| R-M2 | minor | A query before a legacy hash is dropped | **fixed** `a7ac302`; asserted |
| R-M3 | minor | The intake page inherits Home's canonical and Open Graph tags | **fixed** `a7ac302`; asserted |
| R-M4 | minor | Fan silently falls back when a stack's size differs from `count` | **fixed** `a7ac302`: development warning |
| R-M5 | minor | Fixed sleeps, masked 404s, "transfer" label in the check | **fixed** `a7ac302`: explicit waits, only the failures the script causes are masked, the byte count is labelled as decoded bytes |
| R-M6 | minor | Three stale spec lines | **fixed** `a7ac302` |
| R-M7 | minor | C11's reason contradicted the ledger; launch list lacks real-path checks | **fixed** here: C11 reworded above; the launch list in `PROGRESS.md` now includes a fresh load of `/working-together` and `/intake/denver-zen-den` |
| R-M8 | minor | Phone circles crowd the bracket | **fixed** `7b7b7b7` and the follow-up commit below: on a box that spans the phone screen the circle is drawn 8px inside the box, as a pen circles the words, and the check asserts every circle stays clear of the screen edges |
| R-M9 | minor | The lazy intake chunk has no error boundary | **declined**: only reachable by direct link, and any message would be new copy; the route is Patrick's open question 3 |
