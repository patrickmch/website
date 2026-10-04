# Adversarial review: grok ((grok CLI default))

Generated 2026-10-04T04:07:58.750Z in 972s.

I'll review the spec, the copy, the built site, and the screenshots as an outside critic, then write the findings to `review-out/grok.md`.The skill harness is for a gated multi-model pass. This request is the review itself, so I’m reading the spec, copy, source, and screenshots directly.The screenshots and the source disagree in a few places that matter. I’m writing the review from those, not from the spec’s intentions.The review is in `review-out/grok.md`. Full text follows.

# Adversarial review: McHeyser site, October 2026

Reviewed the design spec, the copy document, the source, and the 1440px and 390px tiles (home, working-together, about, contact), plus `public/og.png` and `public/favicon.svg`. The dashed proof boxes were judged as placement only.

## 1. Verdict

I would not ship this to the owner in the brief. The copy is a plain letter and, left alone, it would hold up. The design puts a brand system in front of that letter: a fiddled wordmark, a tracked mono eyebrow, an orange button, and a flowchart, with no face and no proof in the first screen. On a laptop the first viewport already contains "or AI tools" and Fig. 1, and Fig. 1 does not fit its row.

The single biggest risk is credibility. The page shows invented operational detail, including "Maria," "Quote 118, Hillside," and "Job 2041," and it withholds every real detail. A skeptical owner has been trained by agency sites to read that combination as costume. The pen metaphor is the right instinct and the wrong execution: by the time a circle appears, orange already means "button" and "link."

## 2. Findings

### 1. Blocker — Invented specificity is doing the job of proof

**Where:** Spec §6, Fig. 5, and the "Illustrative." captions. Built in `components/diagrams/SharedView.tsx`. Home, "What this can look like." `components/ProofSlot.tsx` renders nothing in production.

**What is wrong:** Fig. 5 is a job board with a person, a place, and job numbers: "Quote 118, Hillside," "Maria," "Job 2041, Unit 12," "Order 77, Lot 4," "Crew B." Fig. 1 states a diagnosis as fact: "The circled step is where work usually waits" and "waits for the owner." The only thing that says this is not a client is the word "Illustrative." in 13px gray mono under the drawing. The spec forbids real client names and numbers that read as results. These read as a real board anyway. Production then deletes every testimonial and the sample findings, so the published home page has fictional operations detail and zero evidence.

**Why it matters:** This reader runs a real board. A made-up one, drawn with more confidence than the letter, is the slickness they came in distrusting. They will believe you invented a client, or they will believe Quote 118 is a client you are showing off. Both lose the engagement.

**Fix:** Strip names, places, and job numbers. Use "a quote," "the owner," "the crew," or an obviously blank row. Put the word "Example" in the table header, at the same size as the cells. Do not publish the Discovery Sprint pitch until one proof slot is real: a named quote with permission, or a redacted findings memo a visitor can open with no signup. Until then, the examples section should be the three paragraphs and no drawings.

### 2. Major — The first screen is a system, and the person is on the fourth tile

**Where:** Spec §2 principle 5 ("one scroll down") against §7.1, which places the portrait after the hero, four problems, the approach, three examples, and the sprint block. `pages/HomePage.tsx`. Tiles `home-desktop-01` through `home-desktop-04`, `home-mobile-01` and `home-mobile-06`.

**What is wrong:** Desktop tile 1 is the eyebrow "OPERATIONS AND TECHNOLOGY FOR GROWING BUSINESSES," the headline, both hero paragraphs, an orange "Let's talk," Fig. 1, and the proof placeholder. The seated photograph is tile 4. On the phone it is tile 6. Principle 5 and section 7 disagree, and the build followed section 7. The first screen also contains the second hero sentence, "build the software, automation, or AI tools that help the work move forward."

**Why it matters:** In five seconds this owner decides whether a person has looked at work like theirs, or whether a designer has built a concept. They get the concept. "AI tools" lands before any sentence that walks it back. That walk-back exists, and it is on another page, inside "Does it have to be an AI project?"

**Fix:** Hero becomes the headline, the first paragraph, the seated portrait, the name, and one button. Move "or AI tools" out of that paragraph. That is a copy change, and it is required: the design cannot feature that sentence and also respect the reader the brief describes. Put Fig. 1, if it survives finding 5, next to problem 03, which is the paragraph that actually says work waits on one person.

### 3. Major — The pen is spent before it means anything

**Where:** Spec §2 principle 2 against §3.1, §5.3, and §5.6. `styles/base.css` (`a` underline is `--mark`), `styles/components.css` (`.btn` fill is `--mark`, `.card__n` is `--mark-text`, `.site-nav__link.is-active`). Footer on every page tile.

**What is wrong:** Principle 2 says one pen, used the way a reviewer uses it, never as a wash and never as decoration, so that it means attention. The spec then fills the primary button with it, underlines every text link with it, underlines the active nav item with it, and paints the card numbers "01"–"04" in orange. The footer is five orange underlines: Working Together, About, Let's talk, the email address, LinkedIn. The header button is orange before the reader has seen a single circled step. Token `--mark-text` is defined for "diagram annotation labels, form error messages" only. Section 5.6 spends it on decorative index numbers.

**Why it matters:** When the circle finally shows up on "Price decided," it matches the buttons. It does not read as a pen. The owner has seen this orange-button, warm-paper arrangement on other consultancy sites. Scarcity was the whole idea, and the spec repealed it in the component section.

**Fix:** Buttons are `--ink` fill with `--paper` text. Links and the active nav item use an ink underline. Orange is allowed on pen strokes, the single underline under "Discovery Sprint," annotation labels, and form errors. Delete the orange "01"–"04." If a button must stay orange, it is the only orange control on the site, and no link may use that color.

### 4. Major — The wordmark looks broken at the size people see it

**Where:** Spec §4.1. `components/Wordmark.tsx`, `components/marks/PenUnderline.tsx` (`scaled`, `preserveAspectRatio="none"`, two paths), `styles/components.css` (`.wordmark__c`, `.wordmark__stroke` at `1.1em` by `0.3em`). Header on every tile. `public/og.png`. `public/favicon.svg`.

**What is wrong:** The `c` is 0.6em and raised 0.42em. Under it, the two-stroke underline is stretched with `preserveAspectRatio="none"`, so the 2px stroke the spec requires becomes a squat blot. At 22px in the header the blot is a speck and the small `c` looks like a typesetting error. At 96px on the social image the two strokes read as a brush logo under the `c`. The favicon stroke runs from x=8 to x=24, a wide curve under the M, which reads as a smile. Spec §4.2 asked for a short stroke. The historical superscript is a real convention. This audience is not looking for it, and the orange smear does not teach it.

**Why it matters:** The name is the trust object. The first thing a skeptical owner tries to do is read it and remember how to spell it. A raised `c` plus a smudge makes them pause on the logo instead of the sentence.

**Fix:** Header and footer: "McHeyser" on one baseline, in the same serif as the headlines, with no stroke. If the superscript stays, use it in the footer only, at 28px or larger, with a single 2px stroke drawn in pixel space, the same way `PenCircle` is drawn, not stretched. Favicon: serif M on ink, no curve.

### 5. Major — Fig. 1, the first diagram, does not fit

**Where:** Spec §6 Fig. 1. `components/diagrams/QuoteFlow.tsx`. `styles/components.css` (`.flow > .node { flex: 1 1 0; min-width: 0 }` from 768px up). Tile `home-desktop-01`. `public/og.png` avoids the problem by deleting two of the five nodes.

**What is wrong:** Five mono nodes in one row inside a 1120px container. Equal flex and `min-width: 0` force the second lines to wrap. On the desktop tile, "re-typed into a spreadsheet" and "email, then follow-up" break inside the boxes, and the boxes end up different heights. The circle is the one clean mark in a row that looks like it failed to layout. The phone stack in `home-mobile-01` is readable. The desktop row is what a laptop sees without scrolling.

**Why it matters:** This is the concept's proof, sitting in the first viewport. If the drawing of the work is cramped and hyphenated, the owner concludes the person does not sweat the details of a page, which is a bad advertisement for someone who is selling attention to process.

**Fix:** Do not put five of these labels in one row. Use the mobile stack up to 1100px, or break the row after node 3 so the circled node ends a line. Give nodes `flex: 0 1 auto` and let the connectors shrink. Keep each "where" line on one line, or drop it under a width where it would wrap. The social image's three-node cut is more honest about the space than the page is.

### 6. Major — Fig. 5 falls apart in the column it was given, and collides on the phone

**Where:** Spec §6 Fig. 5 and §7.1 (figure in 7 of 12 columns). `components/diagrams/SharedView.tsx` (`placement="below"`). `styles/components.css` (`.board td { display: flex }` under 640px). Tiles `home-desktop-03` and `home-mobile-05`.

**What is wrong:** Desktop, the 7-column slot is too narrow for `JOB | WAITING ON | WHO | NEXT` in 14px mono. "Follow up Thursday" wraps, and "Crew B" breaks so "B" sits alone on the next line. The note "waiting on a decision" is inside the cell, under a circle around "Price decision," and the row grows to hold it. Phone, the cell becomes a flex row: the label, the words "Price decision," and the annotation sit side by side. "Price decision" wraps, the circle wraps the fragment, and "waiting on a decision" collides with the circle. Spec §5.7 says the note sits above-right from 768px up and under the node on small screens. This annotation is hard-coded to `below`, and the flex rule then ignores "below" entirely.

**Why it matters:** This is the diagram that means "a clear view of what needs attention." The owner cannot get a clear view of the diagram. The collision also puts the orange scribble on the wrong piece of the phrase, so the pen looks careless.

**Fix:** Give this table the full container, under the paragraph, at every width. `white-space: nowrap` on the who-column, or stack each record as label/value pairs below 900px with the annotation as a block under the value, not a flex sibling. Circle the whole phrase "Price decision."

### 7. Major — Fig. 2 repeats the paragraph beside it, and the build mis-grids it

**Where:** Spec §6 Fig. 2 and §7.1.4 (text 7 columns, figure 5). `components/diagrams/SprintSteps.tsx`. `styles/pages.css` (`.approach__figure { grid-column: 9 / span 4 }`, so column 8 is empty and the figure is 4 columns, not 5). Tiles `home-desktop-02` and `home-mobile-03`.

**What is wrong:** Four numbered sentences joined by a line, with a small circle around the numeral 2 and no annotation. The sentences restate the three paragraphs to their left: walk through real examples, find the hold-up, recommend, build and test. The circle has nothing to add, because step 2 already says "Find where it is held up." The empty grid column leaves the list floating in a hole. Spec §9 says a circled node also has a text annotation. Spec §6 says this figure has no annotation. The build obeyed §6.

**Why it matters:** An owner does not need a drawing of a paragraph they just read. A circle on a numeral, with no note, is decoration. It trains them to skip the later drawings too.

**Fix:** Delete Fig. 2. Let that section be the three paragraphs at the prose measure. If a diagram stays, it has to show something the paragraphs do not, and the grid should be `span 7` and `span 5` with no hole.

### 8. Major — Fig. 6 redraws the page, and the desktop fan knots

**Where:** Spec §6 Fig. 6. `components/diagrams/SprintTimeline.tsx`. Tiles `working-together-desktop-02` and `working-together-mobile-02`. The same four endings are repeated in "What happens afterward."

**What is wrong:** Three boxes, then four branches: "Take it forward with your team," "Use another provider," "Ask me to scope the next stage," "Stop here." Those are the next section's sentences, drawn first. The circle is on "Findings and a recommendation," which is the product, not a step where work waits. There is no annotation, so the circle means "this box is the important one," which is what a highlight color means in a sales deck. On desktop the four curves and their arrowheads bunch into the right edge of that circle. The node text is already wrapping ("reviewed together," "a quote, a handoff, a report"). The sublines are not in the spec's node list. The phone version, a stack plus a 2 by 2, is readable and still redundant.

**Why it matters:** This is the offer page. The drawing that should make the sprint concrete instead repeats it and then tangles. The owner learns nothing from Fig. 6 that "You leave with a recommendation you can act on" does not say better, immediately underneath.

**Fix:** Delete Fig. 6. Keep the three headings and the bulleted list. The right to stop, switch provider, or continue is already in "What happens afterward," and that prose is the credible version because it includes "use another provider" as a sentence rather than as a little box.

### 9. Major — "Fig." and "Illustrative." turn the letter into a white paper

**Where:** Spec §5.4. `components/Figure.tsx`. Every figure caption on Home and Working Together.

**What is wrong:** The copy is first person, sentence case, no apparatus. Under each drawing the design adds "Fig. 1" through "Fig. 6" and, on the examples, the word "Illustrative." The build also uses one space after the number; the spec asked for two. That miss is trivial. The voice is not. Museum labels sit between the reader and the next paragraph, and "Illustrative." is a hedge in the quietest type on the page (see finding 1).

**Why it matters:** The copy sounds like a person. The captions sound like a designer protecting a concept. The owner feels the shift and discounts both.

**Fix:** No figure numbers on the marketing pages. No "Illustrative." The examples section already has the honest line: "Here are examples of the kinds of improvements we can make." One line, once. Captions that remain should be a single plain sentence in the body face, or nothing.

### 10. Major — The offer's commercial terms are the quietest text on page two

**Where:** Spec §7.2 order. `pages/WorkingTogetherPage.tsx`. Tiles `working-together-desktop-02` through `working-together-desktop-04`.

**What is wrong:** "Begin with a Discovery Sprint" is a dark card. Under it, a diagram, three subsections, a sample slot, then two columns set at H3 size while using H2 elements: "What I need from your team" and "What happens afterward." The only answer to "How much does a Discovery Sprint cost?" is an FAQ item at the bottom, styled identically to the AI question and the subcontracting question. The card says the engagement is paid and that fee and timing are agreed up front. It does not say there is no published price, that implementation is priced separately, or what the buyer has to give up (someone who owns the problem, time with the people doing the work, access to the systems).

**Why it matters:** This reader buys with a checkbook and a calendar. The page's visual climax is a flowchart of four endings. The sentences that decide a yes are smaller than the FAQ heading, and the price sentence is last. They will feel managed.

**Fix:** Under the sprint paragraphs, still on paper, set three short blocks at the same size as the body: what you need from the team, what they leave with, and the cost answer copied verbatim from the FAQ. Leave the FAQ as the repeat. Drop the dark card, or keep it as ink text with no extra weight. Set "What I need from your team" and "What happens afterward" at real H2 size, stacked, not as a demoted pair.

### 11. Major — The three stage cards are a generic services grid, placed above the offer

**Where:** Spec §7.2.2. `pages/WorkingTogetherPage.tsx` (`stages`, and the visually hidden heading "How we work together," which is not in the copy document). Tile `working-together-desktop-01`.

**What is wrong:** After the hero, three equal cards: "Understand what needs to change," "Build and put it to work," "Keep improving as the business grows." Orange "01" "02" "03." No visible section heading. Card 02's first sentence is "I build software, connect systems, and set up automation and AI." The hero already said understand, decide, and put into use. The sprint section says it again. Sighted users get an untitled services row. Screen reader users get an invented heading, "How we work together."

**Why it matters:** Equal cards say these are three products of the same kind. They are not. The only thing being sold on this page is the sprint. "Keep improving as the business grows" reads as a retainer with no contents. "Automation and AI" in the first line of a card is another early hit of the phrase this reader distrusts.

**Fix:** Delete the cards. The hero covers them. If the three phases stay, they are one short list under a real heading taken from the copy, after the sprint, with no numerals and no boxes.

### 12. Major — The climbing photograph sells a different practice

**Where:** Spec §7.3, §8, and open question 1. `pages/AboutPage.tsx` (`patrick-ridge-800.jpg`). Tile `about-desktop-01`. Hidden below 1024px by `.bio__photo { display: none }`.

**What is wrong:** Beside "I came to software through customer success," half the section is Patrick in a bright orange jacket on a ridge. NOLS is one clause in that section. The photograph makes it the point. The jacket is also the loudest orange on the site, larger than any pen mark. The spec calls that a happy accident. A reader sees a brand color in a lifestyle photo. The dog portrait above it is a person, at home, and it can stay. The ridge cannot. `patrick-ridge-800.jpg` is 149KB, just under the spec's 160KB cap, for an image that should not be on the page.

**Why it matters:** The owner came to see if this person can sit with a quoting mess. A summit photo answers a question they did not ask, and it revives the coaching-site feeling the spec said it was removing. On a phone they never see it, so the desktop and the phone tell different stories about who he is.

**Fix:** Cut the ridge photograph and the NOLS sentence can stay one clause. Do not replace it with another personal scene.

### 13. Major — The "work directly with me" row is designed around a box production removes

**Where:** Spec §5.10 and §7.1.7. `pages/HomePage.tsx` (the `ProofSlot` is inside `.person__text`). Tile `home-desktop-04` shows the slot; production renders `null`.

**What is wrong:** With the slot, the text column roughly balances the 4:5 portrait. Without it, that column is a heading, one paragraph, and a link, beside a tall photograph in a 5-column track. The published composition is a large portrait and a short block of text at the top of the right column. The slot is also the wrong width for a future quote: trapped in the 7-column text column, under the link, rather than full width under the row.

**Why it matters:** The review screenshots hide the hole the public site will ship. When a real quote exists, the current placement makes it a narrow footnote beside a torso.

**Fix:** Design and screenshot the published state with the slot gone. Center the text with the portrait, or use a smaller crop. Put any future quote under the whole row, full container width.

### 14. Major — Keyboard focus disappears on the sprint link

**Where:** Spec §9 (visible focus, 2px `--ink` outline). `styles/base.css` `:focus-visible`. `styles/components.css` `.ink-block` background is `--ink`. The only in-ink control is "See how we work together" in `pages/HomePage.tsx`. Tile `home-desktop-04`.

**What is wrong:** The outline is ink. The block behind that link is ink. `outline-offset: 2px` still paints the ring on the ink padding, so the focus state of the sprint link is invisible. Spec §5.3 states the ink-block button hover and never states an ink-block focus color.

**Why it matters:** That link is the path from the offer to the terms. A keyboard user cannot see where they are when they reach it.

**Fix:** `.ink-block :focus-visible { outline-color: var(--paper); }`. Check the footer only if a link ever moves onto ink. Add this state to the style page.

### 15. Major — Submitting the form throws focus away

**Where:** Spec §5.13 and §7.4. `pages/ContactPage.tsx`. The success branch replaces the form with a `role="status"` div. Nothing focuses it.

**What is wrong:** The focused control is the submit button. On success that button unmounts. Focus drops to the document. The confirmation is "Thanks for getting in touch. I've received your note and will follow up by email." It has `role="status"`, which some browsers will announce and some will lose because focus moved at the same moment. The spec also says to center that success message (§3.3). The build leaves it left-aligned. Left alignment is the better choice. The spec is wrong, and the focus bug is real. The sending label is duplicated: the live region and the button both say "Sending your note..."

**Why it matters:** This owner just wrote down an operational problem. Silence after Send feels like the note vanished. They should land on the sentence that says it arrived.

**Fix:** On `status === 'sent'`, move focus to the confirmation (`tabIndex={-1}`). Leave it left-aligned and delete the centering exception from the spec. Keep "Sending your note..." on the button only, and use the live region for the error. Make the error `role="alert"`. The error sentence should include a real `mailto:` on the address.

### 16. Major — One HTML file, so search and sharing only know the home page

**Where:** Spec §7.5 (HashRouter) and §10. `index.html` (one title, one description, one `og:url`, one `og:image`). `hooks/usePageMeta.ts` updates `document.title` and `meta[name=description]` only, after JavaScript runs.

**What is wrong:** `/working-together`, `/about`, and `/contact` are hash fragments on one document. A crawler or a chat app that does not execute the app gets the home title, the home description, and `og.png` for every page. `usePageMeta` never updates `og:title`, `og:description`, or `og:url`. There is no canonical URL. The spec requires this router because the host serves one static build. Static hosts can rewrite real paths to one `index.html`, and the four pages can be prerendered.

**Why it matters:** The Working Together page is the sales page. Anyone who pastes it into Slack, iMessage, or LinkedIn sends a card that says the home headline and shows the three-node drawing. Search gets one indexable document for four intended pages.

**Fix:** `BrowserRouter`, host rewrites to `index.html`, and four prerendered documents with their own title, description, canonical, and OG tags. Keep `og.png` for home. Make a second image for Working Together that says "Discovery Sprint" in the serif, with no diagram.

### 17. Major — A named client's intake is in the public bundle

**Where:** Spec §7.5 and open question 3. `App.tsx` route `/intake/denver-zen-den`. `pages/IntakePage.tsx`. The production bundle contains the strings (confirmed in `dist/assets/index-*.js`).

**What is wrong:** The page is described as hidden and `noindex`. It is a public route. The `noindex` meta tag is inserted in an effect, on a document that is also the marketing site, and hash URLs do not give crawlers a separate document to noindex. The page addresses Michael at Denver Zen Den, refers to a Thursday meeting, asks about "the MindWave B2B side," and says "You mentioned some stuff last year that didn't land." Those strings ship inside the JavaScript every home visitor downloads. The marketing nav does not link here. The URL and the bundle do.

**Why it matters:** This is someone else's operation, on the site of a person asking to be trusted with operations. An owner who finds it, or a client of Denver Zen Den who finds it, has a concrete reason to doubt discretion.

**Fix:** Remove the route and the module from this build. If the engagement is still live, host the form somewhere that is not `mcheyser.com` and is not inside this bundle. "Unlinked" is not "private."

### 18. Major — The diagrams are wireframes of software that does not exist

**Where:** Spec §2 ("honest, no fake screenshots of software that doesn't exist") and §6 Figs. 3, 4, and 5. `components/diagrams/QuotingTool.tsx`, `Paperwork.tsx`, `SharedView.tsx`.

**What is wrong:** The spec bars fake screenshots, then specifies boxes, a record card, a four-column board, green ticks, and a fork into "Ready for review" and "Needs a judgment call." That is a product UI, drawn schematically. Fig. 3's center node also adds "prepared for review," which is not in the spec, and which repeats the box to its right. Fig. 4 adds the words "on file," also not in the spec. Fig. 4 on the phone is the one drawing an owner can read without the caption: a record, a missing PO, three documents, a person checks it. The circle there encloses both the blank and the words "flagged: missing," so the pen goes around the explanation as well as the gap. Fig. 3 is the standard two-inputs, one-process, two-outputs diagram this reader has seen on software vendor sites.

**Why it matters:** The concept said the drawings would be honest because they would not pretend to be a product. Several of them pretend to be a product. Next to "AI tools," Fig. 3 reads as a feature diagram for a tool he will sell them.

**Fix:** Keep Fig. 4's content, full width, with the circle around the empty PO gap only. Redraw Fig. 3 as one sentence and two outcomes, or cut it. Stop adding sublines the spec did not list. A drawing earns its place only when the owner can point at it and say "that is our PO problem" without help from the caption.

### 19. Minor — Header target size, and "Let's talk" on the contact page

**Where:** Spec §5.1 (small button padding 12px by 18px) and §9 (44px hit area). `styles/components.css` `.btn--small` is `min-height: 40px`, padding `11px 16px`, 15px type. `components/Header.tsx` always renders the button. Tiles `contact-desktop-01` and `contact-mobile-01`.

**What is wrong:** The header control used on every page is 40px tall. The spec's own 44px rule and its small-button padding disagree; the build landed under both. On Contact the same orange button sits in the header while the page is the form, so the first screen on a phone has two "Let's talk" / "Send your note" actions.

**Why it matters:** The header button is the most-used control. On the form page it is a self-link that competes with Send.

**Fix:** Make the header button at least 44px tall. On `/contact`, remove it.

### 20. Minor — Sticky header can cover a focused field

**Where:** `styles/components.css` `.site-header` is sticky, 64px. No `scroll-margin` on headings or inputs. `pages/ContactPage.tsx` calls `focus()` on the first invalid field.

**What is wrong:** Focusing a field scrolls it to the top of the viewport. The sticky bar then sits on top of it.

**Fix:** `scroll-margin-top: 80px` on inputs, textareas, and headings.

### 21. Minor — Form is unprotected, and the failure path is easy to miss

**Where:** `pages/ContactPage.tsx`. EmailJS `sendForm` with the public key. `console.error` on failure. Status region is `aria-live="polite"`.

**What is wrong:** There is no honeypot and no rate limit. A public EmailJS key will be posted to by bots, and the note is an operational description, sent through a third party the page never mentions. A send failure is polite, so assistive tech can defer it, and the address in the error sentence is not a link. The copy's "I'll read your note" is still true. It is incomplete.

**Why it matters:** The form is the conversion, and it asks for the kind of detail this owner is careful with. A spam flood also buries a real note.

**Fix:** Honeypot field, EmailJS's own spam controls, `role="alert"` for the error, and a mailto link in that sentence. Add one clause to the contact copy: the note is emailed to Patrick through the form provider. Do not invent a stronger privacy claim than that.

### 22. Minor — Production JavaScript still carries review copy and unused type

**Where:** Spec acceptance, "no placeholder testimonial text exists anywhere in the bundle." `components/ProofSlot.tsx` hint: "Shown in review mode only..." Font URL in `index.html` and spec §3.2 requests Source Serif 4 italic 400 and Source Sans 3 italic 400. No italic is used in the CSS. `ContactPage` is statically imported, so EmailJS is on the home page. Gzipped home script is about 88KB before fonts. I did not measure the font files, so I am not calling the 600KB budget a miss.

**What is wrong:** The published script contains "PROOF SLOT," the editorial notes, "How we work together," and the intake copy. The font stylesheet downloads italics nothing uses. The contact library downloads for visitors who never open the form.

**Fix:** Keep the proof strings out of the production graph (the `review` flag can lazy-load the placeholder). Delete the italic axes from the font URL. Dynamic-import EmailJS inside the submit handler.

### 23. Minor — Social image and a few spec mismatches

**Where:** Spec §4.3 and §5.4. `pages/OgPage.tsx`. `public/og.png`. `components/Figure.tsx` (one space after "Fig. N"). `styles/base.css` `scroll-behavior: smooth`, which the motion section does not list.

**What is wrong:** The spec's social image is the wordmark, the tagline, a three-node Fig. 1, and "Boulder, Colorado" in the mono eyebrow. The build adds "Patrick McHeyser" at the lower left and sets the tagline in 34px sans (`.og__tag`), not mono. The wordmark blot from finding 4 is largest here. Smooth scrolling is extra motion. Reduced motion does turn it off.

**Fix:** Regenerate `og.png` from a corrected wordmark. Tagline in the body face is fine; drop the extra name or keep it and amend the spec. Remove `scroll-behavior: smooth`.

### 24. Minor — Pen-circle measurement can miss the draw, and the circle often overshoots

**Where:** `hooks/useDrawOnView.ts`, `hooks/useParentSize.ts`, `components/marks/PenCircle.tsx`. Spec §3.5.

**What is wrong:** The path is inserted only after the parent has a size. If the figure is already in view, `is-drawn` is on the parent before the path exists, so the dashoffset transition never runs. The hero circle, the one people are supposed to watch draw, is the likely case. Default `padX` of 12px also lets circles crowd connectors. On Fig. 6 desktop that padding is part of the knot. On Fig. 4 the circle swallows the flag text.

**Fix:** Accept a static circle on anything in the first viewport. Tighten padding to 6px. Animate only circles that enter later, and add the path before the class is applied.

### 25. Minor — Spec asks for `role="group"` on figures; the build correctly ignores it

**Where:** Spec §5.8. `components/Figure.tsx` uses a native `figure` with `aria-labelledby` and `aria-describedby`.

**What is wrong:** `role="group"` would wipe the figure role. The hidden paragraph also repeats text that is already in the nodes, so a screen reader gets the boxes, then a prose retelling, then the caption.

**Fix:** Amend the spec. Drop the hidden paragraph where the diagram is real HTML text, and let the caption be the description.

### 26. Taste — The palette, the type, and the radius are a known outfit

**Where:** Spec §3.1, §3.2, §3.4. `styles/tokens.css`.

**What is wrong:** Paper `#F4F2ED`, ink `#16202B`, burnt orange `#D9622B`, Source Serif 4, Source Sans 3, and Source Code Pro is a competent, familiar independent-consultant kit. The spec says nobody in this space looks like this. The mono uppercase eyebrow is the most generic piece, and it is the first line of the page. Tracked mono labels are a software-marketing habit from the last several years. Green `--resolved` is a second pen the principle did not allow; the words "Ready," "on file," and "Nothing" already carry that meaning. A 2px radius on every box is a system telling you it is a system. None of this is ugly. None of it is specific to this person or this work.

**Why it matters:** Distinctiveness was supposed to come from the drawings. The drawings look like product diagrams (finding 18). What remains is a well-set template. This owner has seen the template.

**Fix:** One family for headlines and body. Georgia or the serif you actually write a findings memo in. Mono only inside a drawing that is pretending to be a form label. Drop the green. Drop the eyebrow, and set "Operations and technology for growing businesses." once, in the footer, in the body face.

### 27. Taste — The page is tuned like a design specimen

**Where:** Spec §3.3, 96px section padding from 1024px up. The hairline between every section. The style-page completeness of states, which the marketing pages inherit.

**What is wrong:** Home is five desktop tiles to get through a letter, four problems, and three examples. The air is even, the rules are even, the cards are even. Nothing on the page is louder because it is more important, except the dark sprint card, which is louder for being a brand moment (finding 10). A findings document is dense where the evidence is and quiet where it is not. This is quiet everywhere.

**Fix:** Tighten section padding to 64px on desktop. Let the four problems and the contact form stay airy. Let everything that repeats a previous section be cut, not spaced.

## 3. What works

- The four problem headings and their paragraphs are the best writing on the site, and the line length lets an owner scan them.
- The contact page is the design getting out of the way: one question, labels above the fields, a button, a mailto, no diagram.
- The seated portrait is a real person at a size that counts, with a plain alt string, and it is the right photograph.
- The dog portrait can stay on About. It is a person, not a metaphor.
- "Menu" and "Close" as words, instead of an icon, fit this reader.
- The FAQ is visible text, not an accordion, and the AI answer and the cost answer are the right words.
- Fig. 4 on a phone is legible without its caption: record, missing PO, three documents, a person checks it.
- The underline under "Discovery Sprint" at heading size is the one pen mark that looks like a pen.
- Proof slots render nothing when review mode is off, and no fake quotation is shown as a quotation.
- The skip link accounts for the hash router. Heading levels on the four marketing pages do not skip. Reduced motion kills the draw-on.
- The footer email, the city, and the LinkedIn link are findable. Keep the LinkedIn link.
- The CSS is a small token system with no shadows, gradients, pills, or icon font. The component split matches the spec and is readable.

## 4. Alternative directions

**The letter.** Set the copy in one column, in one serif, with the seated portrait at the top of Home and the form at the end. No eyebrows, no cards, no figure numbers, no orange button. "Let's talk" is an ink text link. The four problems are a numbered list. Working Together is the sprint explanation, the three things required of the team, the cost answer, and the FAQ. This will look plain. Plain is what this reader trusts, and the copy is already good enough to carry it. The current design adds apparatus and then has to apologize for it with "Illustrative."

**The sample memo.** Make the site a redacted page-one of the actual deliverable. One quote, walked from request to send, with the hold-up marked by a real pen on a real artifact: a photograph of a paper quote or a printout he has marked, with permission, or a clearly labeled blank template he fills in the room. Fee, time, and what the buyer must provide sit on that page in the same type as the findings. The pen earns trust only if it looks like it touched a document. An SVG wobble (`0.03 * sin` in `PenCircle`) will always look authored. This direction spends its effort on one true artifact instead of six schematic ones, and it gives the empty sample slot a reason to exist.

**One diagram, one face, one offer.** Keep paper, ink, and a single drawing. Cut Figs. 2, 3, and 6, the stage cards, the climbing photo, the wordmark trick, and the mono eyebrow. Fig. 4, full width, is the diagram. The seated portrait is in the hero. The sprint block is body text plus the cost sentence, with orange used only on the missing PO and the underline under "Discovery Sprint." This keeps the part of the concept that survives contact with the reader, which is "show the work, mark the stuck step," and throws out the design system that grew up around it.

