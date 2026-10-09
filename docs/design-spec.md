# McHeyser site redesign: design spec (October 2026)

**Status:** built, reviewed by three outside models, amended for the review (October 2026). Amendments are marked "Amended" and logged in `docs/design-review-2026-10.md`.
**Branch:** `redesign-2026-10`.
**Copy source:** `docs/website-copy-2026-10.md` (the designer handoff). That document prescribes the words. This document prescribes everything else. Where the two disagree on wording, the copy doc wins. Where they disagree on anything visual or structural, this spec wins.

---

## 1. What we are making, and for whom

- A four-page marketing site for McHeyser (Patrick McHeyser): operations and technology consulting for owners and operations leaders at businesses around $5M to $25M in annual revenue. Industry focus is open.
- Pages: **Home**, **Working Together**, **About**, **Contact**. Navigation is `Working Together | About | Let's talk`. The McHeyser wordmark links to Home.
- The promoted first engagement is the **Discovery Sprint**.
- The three examples on Home are illustrative. The design must never make them look like measured client results.
- Testimonial and sample placements must stay identifiable during design review and be omitted from a published page until real, approved material exists.
- This is a complete overhaul. Nothing from the current visual system is kept except two existing portrait photographs of Patrick. The current site's coaching-style palette (terracotta, cream, evergreen), Cormorant Garamond, Tailwind CDN, grain overlay, pill buttons, and scroll-fade animations are all removed.

**The reader** is a business owner or operations lead who runs a real operation: quotes, job folders, dispatch boards, paperwork, a few overloaded people. They distrust slick agency sites and "AI transformation" language. They respect competence, plain speech, and someone who looks at the actual work. The copy is already written that way. The design must match it.

---

## 2. Concept: make the work visible

**One sentence:** a calm, well-set document with a few hand-placed pen marks showing where the work is held up.

**Why this concept.** The copy keeps returning to one idea: a clear view of what needs attention, where things get held up, walk me through a recent quote, findings you can act on. The visual system should do what the service does: lay out ordinary work plainly, then mark the one step that matters. It is honest (no fake screenshots of software that doesn't exist), distinctive (nobody in this space looks like this), and cheap to extend (every new example is one more small drawing).

**Principles. Every design decision must trace back to one of these.**

1. **Paper and ink.** Off-white page, near-black navy ink, generous margins, strong typographic hierarchy. The site should feel like page one of a Discovery Sprint findings document, because that is literally the product.
2. **One pen.** A single accent color, used the way a reviewer uses a pen: a circle around the held-up step, an underline, a short tick, the primary button. Never as a background wash, never as decoration. Scarcity is what makes it mean "attention."
3. **Draw the work, don't photograph it.** Small schematic drawings of real work (a quote moving through the business, a form feeding documents, a board of jobs) replace stock photography and screenshots. Drawn in ink lines, with the pen color showing what changes.
4. **One inversion per page.** At most one block per page flips to ink background with paper text. On Home that block is the Discovery Sprint offer.
5. **The person is the proof, not the hero.** The hero shows the client's problem. Patrick's photograph appears where the copy says "You'll work directly with me," one scroll down, at a size that counts.
6. **Reading size, not billboard size.** The copy is a letter in the first person. Headlines are set at a size you read, not a size that shouts.
7. **Nothing decorative.** No gradients, blobs, glassmorphism, grain, drop shadows, icon sets, 3D, sparkle or "AI" iconography, stock photography, or AI-generated imagery. If an element isn't text, a rule, a drawing of work, a pen mark, or a photograph of Patrick, it doesn't belong.

---

## 3. Tokens

All tokens are CSS custom properties on `:root`. There is no dark theme; this is a single-surface marketing site. The ink block is a component, not a theme.

### 3.1 Color

| Token | Hex | Role | Allowed uses | Contrast notes |
|---|---|---|---|---|
| `--paper` | `#F4F2ED` | page background | body background, text on ink | ink on paper 14.7:1 |
| `--paper-2` | `#ECE9E2` | second paper surface | table stripes, input backgrounds, the form card | keep subtle |
| `--ink` | `#16202B` | primary ink | headings, body text, primary icon strokes, the ink block background, button hover fill | |
| `--ink-2` | `#3D4854` | secondary ink | captions, eyebrows, secondary text, form helper text | 8.3:1 on paper, passes small text |
| `--stroke` | `#6B7682` | drawing stroke | diagram node borders and connectors, dividers inside figures, idle input borders, disabled text | 4.15:1 on paper, 3.8:1 on paper-2. **Not for text under 24px.** |
| `--line` | `#CFCBC2` | hairline | section rules, header and footer borders, card borders, table rules | |
| `--mark` | `#D9632B` | the pen | pen circles, underlines, ticks, the primary button fill, active nav underline | 3.3:1 on paper. **Never small text.** Ink on it: 4.52:1 (Amended: was `#D9622B`, which measured 4.49:1 under ink) |
| `--mark-text` | `#B04A1B` | the pen, for words | small orange text only: diagram annotation labels, form error messages | 4.9:1 on paper |
| `--resolved` | `#3F7D5C` | after-state | green tick strokes in diagrams showing a step that no longer waits | strokes only |
| `--resolved-text` | `#2F6A4A` | after-state, for words | small green labels in diagrams | 5.7:1 on paper |

Rules:
- The primary button is `--mark` fill with `--ink` text (4.52:1). Hover is `--ink` fill with `--paper` text. Never white text on orange.
- Links in running text are `--ink` with a 2px `--mark` underline, offset 3px. Hover: underline becomes `--ink`. Never orange link text.
- `--mark` strokes are 2px at component scale and 2.5px inside figures.
- The ink block uses `--paper` text, `--mark` for strokes and the button, and `--line` at 20% opacity for its hairlines.
- Never use `--resolved` outside a figure.

### 3.2 Type

Three families, one superfamily, loaded from Google Fonts with `display=swap` and preconnect hints:

- **Headlines:** Source Serif 4 (variable; optical size axis on). Weights 500 and 600.
- **Body and UI:** Source Sans 3. Weights 400, 500, 600.
- **Labels, figure text, and annotations:** Source Code Pro. Weights 400, 500.

Font link (exact):
```
https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&family=Source+Code+Pro:wght@400;500&display=swap
```

Scale (fluid, `clamp()` between 360px and 1280px viewports):

| Style | Family | Size | Weight | Line height | Tracking | Notes |
|---|---|---|---|---|---|---|
| Display / H1 | Serif | 36px to 56px | 500 | 1.1 | -0.01em | one per page |
| H2 | Serif | 28px to 40px | 500 | 1.15 | -0.005em | section titles |
| H3 | Serif | 22px to 24px | 600 | 1.25 | 0 | bold lead-ins in the copy, example titles, FAQ questions |
| Lead paragraph | Sans | 20px to 22px | 400 | 1.5 | 0 | first paragraph of a hero only |
| Body | Sans | 17px to 18px | 400 | 1.6 | 0 | max measure 36em |
| Small | Sans | 15px | 400 | 1.5 | 0 | footer, form helper text |
| Eyebrow | Mono | 13px | 500 | 1.4 | 0.08em | uppercase, `--ink-2` |
| Figure caption | Mono | 13px | 400 | 1.5 | 0 | sentence case, `--ink-2`, prefixed "Fig. N" |
| Figure text | Mono | 13px to 14px | 400/500 | 1.3 | 0 | node labels, table cells |
| Annotation | Mono | 13px | 500 | 1.3 | 0 | `--mark-text`, sentence case |
| Button | Sans | 16px | 600 | 1 | 0 | |
| Nav | Sans | 16px | 500 | 1 | 0 | |

- Headlines use the serif's optical size axis so large sizes get finer strokes. Set `font-optical-sizing: auto`.
- Body measure is capped at 36em (about 65 characters). Prose columns are 680px max.
- Bold lead-ins in the copy ("**Every new customer brings another round of admin.**") become H3s, not bold spans.
- No all-caps outside eyebrows and the mono table header. No letter-spaced serif.

### 3.3 Layout

- Container: 1120px max, centered. Gutters: 24px at 768px and up, 16px below.
- Grid: 12 columns, 32px gap at 1024px and up; collapses to a single column below 768px.
- Prose column: 680px max, left-aligned, never centered text (Amended: the Contact success message is left-aligned like everything else).
- Vertical rhythm: 8px base. Section padding 96px top and bottom at 1024px and up, 64px below. Sections are separated by a 1px `--line` rule across the container, not by background color changes (the ink block is the one exception).
- Header height 64px. Content starts below it; the header is sticky.
- Figures span the full container width below the Home quoting example and in the Sprint timeline. In the example rows they take 7 of 12 columns with text in the other 5.

### 3.4 Shape, lines, elevation

- Corner radius: 2px on buttons, inputs, cards, and diagram nodes. Nothing is a pill. Nothing is a circle except the pen circle.
- Hairlines are 1px `--line`. Diagram node borders are 1.5px `--stroke`. Connectors are 1.5px `--stroke` with a small open arrowhead (two strokes, not a filled triangle).
- No shadows anywhere. Elevation is expressed by a border or by the ink inversion.
- Cards exist only where the copy groups items (the four problems, the three stages). A card is a 1px `--line` border with 24px padding. No fill.

### 3.5 Motion

- Exactly one motion idea: when a figure scrolls into view, its pen marks draw on (stroke-dashoffset from full length to 0, 600ms, ease-out, 150ms delay). It happens once.
- Hover transitions on buttons and links: 150ms on color and background only.
- No fade-ups, slide-ins, parallax, or scroll-triggered opacity on text and blocks. No smooth scrolling (Amended: `scroll-behavior: smooth` was a second motion idea).
- `prefers-reduced-motion: reduce` disables the draw-on; marks render fully drawn.

---

## 4. Brand marks

### 4.1 Wordmark

- Text, not an image: `McHeyser` set in Source Serif 4 at weight 600, 22px in the header, 28px in the footer, every letter at the same size.
- Beneath the whole word runs a hand-drawn pen underline in `--mark`: the same PenUnderline used under "Discovery Sprint", from the M through the r, sitting just under the letters, about 0.04em to 0.13em below the baseline (raised on 4 October at Patrick's request from 0.08em to 0.28em). The stroke scales with the type so it stays a fine pen: 1.25px under the 22px header, 1.5px under the 28px footer, 2px under the 96px social image. One stroke at header and footer size, two at display size. It is the brand idea in miniature: one pen mark on the page, and the same hand that circles the held-up step in the figures.
- Amended 4 October 2026 on Patrick's review of the build: the earlier raised `c` (0.6em, baseline-shifted, with a short stroke beneath it) read as too small and oddly underlined at header size. Three outside reviewers had said the same. The historical superscript is gone; the pen underline stays.
- The wordmark is a single link to Home with the accessible name "McHeyser, home".
- Inside the ink block and anywhere on ink, the wordmark is `--paper` with the stroke still `--mark`.
- No symbol, no monogram, no icon beside it.

### 4.2 Favicon

- 32px SVG. `--ink` rounded square (4px radius). A serif `M` in `--paper` (system serif fallback is acceptable; favicons cannot load web fonts). A short `--mark` stroke under the `M`, 3px, round caps.

### 4.3 Social preview image

- 1200 by 630 PNG at `public/og.png`, generated by screenshotting a dev-only `/og` route so it uses the real fonts.
- Content: paper background, wordmark at 96px with its two-stroke underline, the line "Operations and technology for growing businesses." in the body face at 44px, a simplified three-node version of Fig. 1 (labels only, no sublabels) with the middle node circled, and "Patrick McHeyser" and "Boulder, Colorado" in the mono eyebrow style. No photograph. Sized to read at a 400px-wide preview card (Amended).

---

## 5. Components

Each component lists purpose, anatomy, states, responsive behavior, and accessibility.

### 5.1 Header
- Sticky at top, 64px, `--paper` background, 1px `--line` bottom border. No blur, no transparency, no shrink-on-scroll.
- Left: wordmark. Right (768px and up): `Working Together`, `About` as nav text links, then `Let's talk` as the primary button at small size (12px by 18px padding, 44px tall). Every header target, the wordmark included, is at least 44px tall.
- Active nav link gets a 2px `--mark` underline. Hover gets a 2px `--ink` underline.
- Below 768px: wordmark left; right holds the `Let's talk` button (small) and a `Menu` text toggle (the word "Menu", turning into "Close"; no hamburger icon). Opening pushes a panel down beneath the header containing the two nav links stacked at 20px, 56px tall rows, separated by hairlines. No full-screen overlay. Body scroll is not locked.
- Accessibility: `<header>` with `<nav aria-label="Primary">`, a skip link ("Skip to content") as the first focusable element, toggle has `aria-expanded` and `aria-controls`, Escape closes the panel.

### 5.2 Footer
- `--paper`, 1px `--line` top border, 64px padding.
- Three columns at 768px and up, stacked below: (1) wordmark at 28px, then the copy doc's footer lines "Patrick McHeyser" and "Operations and technology for growing businesses."; (2) nav links: Working Together, About, Let's talk; (3) "Boulder, Colorado", `patrick@mcheyser.com` as a mailto link, and a LinkedIn link (addition beyond the copy doc; see open questions).
- Bottom row, small sans, `--ink-2`: "© {year} Patrick McHeyser". No Privacy or Terms links (the current ones point nowhere).

### 5.3 Buttons and links
- **Primary button:** `--mark` fill, `--ink` text, 2px radius, 14px by 22px padding, 16px/600 sans (the small header size changes padding only). Hover: `--ink` fill, `--paper` text. Disabled while sending: same fill and text, no opacity change (Amended: 0.75 opacity dropped the label to 2.8:1). Focus-visible: 2px `--ink` outline, 2px offset. On ink: same fill and text; hover becomes `--paper` fill, `--ink` text. Used for `Let's talk` and `Send your note` only.
- **Secondary link:** inline text link in 16px/600 sans with a 2px `--mark` underline and a trailing arrow glyph (→ drawn as a 16px inline SVG, 1.5px stroke). Used for `See how we work together`, `More about Patrick` and, beside `Let's talk` in every hero and closing call outside the Client Work pages, `See how I've worked with others` → Client Work (Amended 4 October 2026). A button and a secondary link that share a row (`.cta-row`) are centred on one line with a 24px gap, and the link drops under the button when the row is narrow.
- **Text links in prose:** `--ink`, 2px `--mark` underline, 3px offset. Hover: underline turns `--ink`.
- Buttons are `<a>` when they navigate and `<button>` when they submit. Minimum hit area 44px tall.

### 5.4 Eyebrow and figure caption
- **Eyebrow:** mono 13px/500 uppercase `--ink-2`, 16px above the heading it labels. Used for the Home hero tagline ("Custom software, automation and AI for growing businesses") and for figure numbering on the style page.
- **Figure caption:** mono 13px `--ink-2`, placed below the figure, prefixed "Fig. N" in 500 weight followed by a space and the caption text. (Amended 4 October 2026, Patrick: captions no longer end with the word "Illustrative.", which read as an editorial note left in by mistake. That the drawings are examples is carried by the section line "Here are examples of the kinds of improvements we can make.", Fig. 1's "In this example", and Fig. 5's "Example job board" title.)

### 5.5 Section and prose column
- `<section>` with a top 1px `--line` rule (except the first on a page), section padding per 3.3, and an optional `aria-labelledby` pointing at its H2.
- Prose column: 680px max, body style, paragraphs separated by 1em.

### 5.6 Card lists (problems and stages)
- The three stages carry a mono number `01`, `02`, `03` in `--mark-text` at 13px/500 above an H3 and a paragraph, because they happen in order. The four problems carry no number (Amended: they are symptoms, not a sequence, and the numbers spent the pen color on decoration). Grid: 2 by 2 at 768px and up (the four problems), 3 across at 1024px and up (the three stages), single column below. Items are cards (1px `--line` border, 24px padding).

### 5.7 Pen marks
Reusable inline SVG primitives, all `--mark`, round caps and joins, `aria-hidden`:
- **PenCircle:** an irregular ellipse path that overshoots its start by about a sixth of a turn, as a pen does when circling a word. Stroke 2.5px. Rendered as an absolutely positioned SVG around a diagram node, inset about 10px (6px on phones, where the gutter is 16px). Draw-on animation per 3.5.
- **PenUnderline:** a slightly wavy two-stroke underline. Stroke 2px. Used under the wordmark `c` and under a key phrase in the Discovery Sprint block heading.
- **PenTick:** a short check mark, two strokes. Stroke 2px. `--resolved` inside figures.
- **Annotation:** a mono 13px/500 `--mark-text` label with a thin 1px `--mark` leader line (an elbow, two segments, at 768px and up; a short vertical stub below) pointing at the circled node. Placed above-right of the node at 768px and up, directly below the node on small screens.

### 5.8 Figure and diagrams
- A `Figure` wrapper: a native `<figure>` with `aria-labelledby` pointing at its `<figcaption>` (per 5.4) and `aria-describedby` pointing at a visually hidden paragraph that describes the diagram and its arrows in words (Amended: `role="group"` with `aria-label` would discard the figure role).
- Diagrams are HTML for anything textual (nodes are `<div>`s with mono text; tables are `<table>`s) and SVG for strokes only (connectors, arrowheads, pen marks). This keeps text readable at every width and selectable.
- Node: 1.5px `--stroke` border, 2px radius, 10px by 14px padding, label in mono 14px/500 `--ink`, optional second line in mono 13px/400 `--ink-2` naming where the step happens ("email", "spreadsheet"). In a row made only of nodes (Fig. 1) the boxes size to their text, share the slack, and are one height; from 1200px their sublabels stay on one line.
- Connector: 1.5px `--stroke` line with an open arrowhead. Horizontal between nodes at 768px and up; vertical (nodes stacked, arrow pointing down) below.
- Fan: one connector splitting into several (or several merging into one). At 768px and up it measures the real centres of the boxes on either side so every branch meets its node. Below 768px it becomes a vertical connector with a short mono label saying how the stacked boxes relate ("both go in", "one of these", "carries into each", "then one of these"), and the stacked boxes get a 1.5px `--stroke` bracket on the left (Amended: stacking alone read as a sequence).
- Figures never exceed the container width and never scroll horizontally. The exact figures are specified in section 6. (Amended 6 October 2026, Patrick: a client-story figure has two drawings. From 1024px up it shows the full drawing, which is laid out for that width. Below 1024px it shows a simple three-step version in the same primitives, because the full drawing restacked or shrunk does not communicate on a phone. Small print inside a box, mono 11px uppercase `--ink-2`, says automatic when the step runs on its own, or who does it, and a legend line under the first figure on a page explains the small print and the pen circle. Each figure sits under the subheading it illustrates.)

### 5.9 Portrait
- `<img>` with `srcset` at 800w and 1600w, `sizes` matching the column, `loading="lazy"` except in the About hero, `decoding="async"`, 2px radius, 1px `--line` border, no filter. Aspect 4:5 on Home (object-fit cover, object-position top), native aspect on About.
- Alt text is descriptive and plain: "Patrick McHeyser, seated, in a navy shirt."

### 5.10 ProofSlot
- Props: `kind` ("quote" | "sample"), `note` (the editorial note from the copy doc).
- **Review mode** (true in `import.meta.env.DEV`, or when the URL carries `review=1`, which then stays on for the browser session so following a link keeps it; `review=0` switches it off): renders a 2px dashed `--mark` box, 24px padding, with the mono label `PROOF SLOT: TESTIMONIAL` or `PROOF SLOT: SAMPLE DELIVERABLE`, and the note in body style `--ink-2`. The box occupies the final layout position and approximate height (quote: 120px min; sample: 200px min) so reviewers can judge placement.
- **Published mode:** renders nothing. Not hidden, not empty space. Nothing.
- No placeholder quote text ever appears. The label says it is a slot.

### 5.11 Ink block
- Full container width (bleeds to the container edge, not the viewport), `--ink` background, `--paper` text, 2px radius, 48px padding at 768px and up, 32px below.
- Contents follow the copy exactly: H2, paragraph, secondary link. The H2's phrase "Discovery Sprint" carries a PenUnderline in `--mark`.
- Only one ink block per page. Home has it (Discovery Sprint). Working Together has it (Begin with a Discovery Sprint heading area). About and Contact have none.

### 5.12 FAQ
- "A few practical questions" is three stacked question-and-answer pairs: H3 question, body answer, hairline between pairs. No accordion. Nothing is hidden.

### 5.13 Form fields
- Label above the field: sans 15px/600 `--ink`. Optional fields say "(optional)" in 400 weight `--ink-2` after the label.
- Input: `--paper-2` background, 1px `--stroke` border (Amended: `--line` was 1.45:1 against the page), 2px radius, 12px by 14px padding, 17px sans, `--ink` text. Focus: 2px `--ink` border, no glow. Invalid: 2px `--mark` border. Fields and headings carry `scroll-margin-top` of 80px so a focused field is not hidden under the sticky header.
- Error message: mono 13px/500 `--mark-text` below the field, linked by `aria-describedby`; `aria-invalid="true"` on the field.
- Textarea: 6 rows, vertical resize only.
- Status region: `aria-live="polite"` paragraph that announces "Sending your note..." (visually hidden while sending, since the button already shows it). The submission error is a separate `role="alert"` paragraph with the address as a `mailto:` link. On success the confirmation replaces the form and receives focus.
- A visually hidden "Reference (leave this blank)" field (`name="reference"`, `aria-hidden`, out of the tab order, a name autofill does not recognise) is a honeypot: a filled one shows the confirmation and sends nothing.
- Submit: primary button, full width below 480px, auto width above. Disabled while sending with the label "Sending your note..." (from the copy doc). The mail library loads only when a note is sent.

### 5.14 PageMeta
- A `usePageMeta(title, description, path)` hook sets `document.title`, the `meta[name=description]` content, the canonical link, and the Open Graph title, description and URL on route change. Titles and descriptions come from the copy doc's metadata table.

---

## 6. Diagrams: exact content

Figure numbers restart on each page; the "Fig. N" names below are the figures' identities in this document. Since 4 October 2026 the quoting tool, paperwork and job board are Figs. 1 to 3 on Working Together and the Sprint timeline is Fig. 4 there; Home carries Figs. 1 and 2. Its selected-work section uses two text cards (Amended 5 October 2026).

All diagram text is illustrative and generic across industries. No real client names, no numbers that read as results, no currency.

The two Home diagrams omit visible captions and figure numbers (Patrick, 8 October 2026). Their drawings, pen annotations and screen-reader descriptions remain. The former caption text supplies an accessible figure name. Other pages retain their existing captions.

### Fig. 1 — Quote flow (Home quoting example)
**Approved for publication, 9 October 2026.** Patrick prefers Before and After together, keeping the simpler After flow without the owner-review branch. The drawing demonstrates an illustrative improvement using the same quoting example.

Accessible name only: "An example of reducing the work involved in preparing a quote."
- Before: Request comes in → Details retyped → Owner decides the price → Quote written manually.
- After: Job details entered once → Agreed pricing rules / prepare the quote → Team reviews and sends.
- The pen circles the pricing rules, with the note "The team can prepare routine quotes without waiting for the owner."

Two horizontal flows at 768px and up, with Before and After labels aligned at the left. On phones the flows stack vertically. Keep the existing mono text, paper, ink and pen tokens. No exception branch, visible figure caption or number.

The social preview remains the prior quoting illustration restored on 7 October. The October 9 homepage headline replaces the growth headline; the quoting comparison now sits beside its example in the page narrative.

### Fig. 2 — From understanding to use (Home engagement section)
Accessible name only: "From understanding the problem to putting a change into use. A Discovery Sprint covers the first three steps." (Amended: the old caption made step 4, building, part of the Sprint, which the Working Together page says is scoped separately.)
A vertical numbered strip with a 1.5px `--stroke` line down the left, in two groups so the Sprint's boundary is in the drawing (Amended): under the mono label "Discovery Sprint", steps 1 to 3; under the mono label "Implementation, scoped separately", step 4.
1. Walk through real examples with the people doing the work
2. Find where it is held up
3. Recommend what to change first
4. Build and test it with the team
Step 2 has a small PenCircle around its number. No annotation.

### Fig. 3 — A quoting tool that follows your rules (Home example 1)
Caption: "Routine quotes get drafted. The ones that need judgment get flagged for a person."
Left: two input nodes stacked, "Job details" and "Pricing rules". Both connect into a center node "Draft quote" (sublabel "prepared for review"). The center node connects to two output nodes stacked on the right: "Ready for review" (with a `--resolved` PenTick) and "Needs a judgment call" (PenCircle, annotation "an unusual job, so a person prices it").
Small screens: inputs, center, outputs stack vertically in that order, the fans labelled "both go in" and "one of these".

### Fig. 4 — Customer paperwork with less retyping (Home example 2)
Caption: "Information collected once carries into the documents. Missing details are flagged before anything goes out."
Left: a "Customer record" card listing five fields as mono rows with a tick and "on file", or a gap: Customer name ✓, Site address ✓, Contact ✓, PO number (the field name circled, an empty dashed gap, then the annotation "no PO number, so the invoice waits"), Start date ✓.
Arrows from the card to three document nodes stacked on the right: "Work order", "Contract", "Invoice".
Below the documents, a `--resolved-text` mono line with a PenTick: "Checked by a person before it goes out."
Small screens: the record, then a connector labelled "carries into each", then the three documents.

### Fig. 5 — A shared view of work that needs attention (Home example 3)
Caption: "What's waiting, on whom, and what happens next."
A table titled "Example job board" (a visible `<caption>` in the record-title style, so the invented details read as an example, not a client), with the mono header row `JOB | WAITING ON | WHO | NEXT` and three rows:
- Quote 118, Hillside | Customer sign-off | Maria | Follow up Thursday
- Job 2041, Unit 12 | Price decision | Owner | Decide by Friday
- Order 77, Lot 4 | Nothing | Crew B | Starts Monday
Row 2's "Price decision" cell gets a PenCircle; annotation "waiting on the owner's price" beneath the value. Row 3's "Nothing" cell gets a `--resolved` PenTick. The WHO and NEXT columns do not wrap at 640px and up.
Small screens: the table becomes a stacked list, each row a card with the four labels and values; the header row stays in the accessibility tree and the table keeps explicit ARIA table roles.

### Fig. 6 — A Discovery Sprint, start to finish (Working Together)
Caption: "The Sprint ends with the findings and our review of them. What happens next is your call."
Three nodes left to right, each with a sublabel: "Agree on the question" (scope, fee, timing, people) → "Work through real examples with your team" (a quote, a handoff, a report) → "Findings and a recommendation" (reviewed together). From the third node, four short branches fan out to four small nodes: "Take it forward with your team", "Use another provider", "Ask me to scope the next stage", "Stop here". PenCircle around "Findings and a recommendation". No annotation.
Small screens: the three main nodes stack; a connector labelled "then one of these" leads to the four branch nodes as a 2 by 2 grid beneath.

### Style page (dev only, `/style`)
Shows tokens as swatches with hex and contrast, the type scale, the wordmark at three sizes and on ink, the pen marks, buttons in all states, form fields in all states, a ProofSlot, and every figure. Excluded from production routes.

---

## 7. Pages

Section order is the copy doc's order. Every piece of visitor-facing copy comes from the copy doc verbatim. Editorial notes become ProofSlots or production behavior; they are never rendered as text.

### 7.1 Home

Amended October 9, 2026: approved build offer, homepage only.

1. **Hero.** "Take on more customers without the admin." Eyebrow and two paragraphs from the copy canon, with the existing paired contact and client-work links. No hero diagram.
2. **ProofSlot** for a real, approved client quote. Empty slots remain hidden in the public composition.
3. **Outcome examples.** Section heading and intro, then three short narratives. At desktop widths, each H3 spans four columns and its paragraph spans columns 6 through 12; stack on phones. Separate the narratives with fine rules. Place the accepted Before/After quoting comparison at full width immediately after the quoting paragraph. No visible figure caption.
4. **Client evidence.** Section heading and intro, then the existing manufacturing and healthcare cards, preserving their shared summaries. Link to the full Client Work index. No MTRO account-brief item.
5. **Engagement.** "From an operating problem to a system your team can use." Three paragraphs in seven columns, with the existing Sprint diagram in columns 8 to 12; stack below 1024px. Separate Sprint diagram work remains in its dev preview.
6. **Discovery ink block.** "Know what to build first, and what it will take." Three paragraphs and the existing Working Together link. Keep one ink block on the page.
7. **Personal introduction.** Existing seated portrait and expanded introduction, About link, then the existing full-width testimonial ProofSlot.
8. **Closing.** "What would your business be able to do with more capacity?" Paragraph and paired contact/client-work links.

### 7.2 Working Together
1. **Hero.** H1 "Start with the work that's slowing you down." three paragraphs, primary button "Let's talk" with the secondary link "See how I've worked with others" → Client Work beside it (Amended 4 October 2026).
2. **Three stages.** "Understand what needs to change", "Build and put it to work", "Keep improving as the business grows" as a numbered 3-across card grid (01 to 03), each an H2 set at H3 size plus a paragraph (Amended: the section has no heading of its own, so H3s would skip a level). The copy doc gives the section no heading, and no invented one is rendered for screen readers either.
2b. **"What this can look like."** (Moved here from Home on 4 October 2026.) H2, intro line "Here are examples of the kinds of improvements we can make.", then the three example rows exactly as 7.1 described them: text (H3 + paragraph) in 5 columns, figure in 7, sides alternating. The figures are the quoting tool, the paperwork record and the job board, numbered Figs. 1 to 3 on this page.
3. **"Begin with a Discovery Sprint."** H2 and the two paragraphs in the prose column. Then the Sprint timeline (Fig. 4 on this page; "Fig. 6" in section 6) at full width. Then the three bold lead-ins as H3s with their paragraphs ("First, we agree on the question." / "Then I work through real examples with your team." / "You leave with a recommendation you can act on." including the four-item bulleted list and the closing sentence). Then a **ProofSlot** (sample): "Place an approved sample findings deliverable here when one is ready. Let visitors inspect it without a signup."
4. **Two short sections side by side** at 768px and up: "What I need from your team" and "What happens afterward", each H2-styled-as-H3 plus paragraphs.
5. **ProofSlot** (quote): "Approved testimonial about understanding the business, the usefulness of the work, or follow-through."
6. **"A few practical questions."** H2 and three Q&A pairs per 5.12.
7. **Closing call.** H2 "Tell me where the work is getting stuck." paragraph, primary button "Let's talk" and the secondary link "See how I've worked with others" → Client Work (Amended 4 October 2026).

The ink block on this page wraps section 3's heading and two paragraphs only (Fig. 6 and the steps sit on paper below it).

### 7.3 About
1. **Hero.** H1 "Hi, I'm Patrick McHeyser." two paragraphs in 7 columns; portrait (dog photo, native aspect) in columns 9 to 12. Stacked below 768px, text first.
2. **"I came to software through customer success."** H2, three paragraphs in the prose column. The climbing photograph (`about-hero.png`, resized) sits beside the NOLS paragraph at 4 columns, 1024px and up only, with no caption. Alt: "Patrick McHeyser in a climbing helmet on a mountain ridge." (See open questions.)
3. **"How I work with your team."** H2, three paragraphs.
4. **ProofSlot** (quote): "Approved testimonial that supports these working-style claims."
5. **Closing call.** H2 "Let's talk about what you want to improve." primary button "Let's talk" and the secondary link "See how I've worked with others" → Client Work (Amended 4 October 2026; it replaced "See all client work" there).

### 7.4 Contact
1. **Hero.** H1 "What is getting harder as your business grows?" two paragraphs.
2. **Form** (prose column width, 640px max): Name, Email, Company, Company website (optional), "What is getting harder to manage as the business grows?" (textarea). Primary button "Send your note". Below the form: "Prefer email? Write to patrick@mcheyser.com." with the address as a mailto link.
3. **States** per the copy doc: sending label "Sending your note...", success replaces the form with the confirmation paragraph "Thanks for getting in touch. I've received your note and will follow up by email.", error shows "Something went wrong while sending your note. Please try again or email patrick@mcheyser.com." as an alert above the button, with the address as a mailto link. Validation messages are the copy doc's table, exactly.
4. **Validation rules:** Name, Email, Company, and the textarea are required. Email must match a basic address pattern. Website is optional; if present it must contain a dot and no spaces (scheme not required). Validate on submit; after the first submit attempt, re-validate on blur and on change. Focus moves to the first invalid field.
5. **Submission:** EmailJS `send` with the existing service, template, and public key env vars, given a snapshot of the validated, trimmed values (Amended: `sendForm` read the live form after validation). Template parameter names stay `name`, `email`, `company`, `website`, `challenge` so the existing EmailJS template keeps working, and the form fields carry the same names for autofill. The old `company_type` and `referral` fields are removed. `_subject` carries "New note from mcheyser.com". Fields are read-only while a note is sending, and a second submit while sending is ignored.

### 7.5 Routes
| Route | Renders |
|---|---|
| `/` | Home |
| `/working-together` | Working Together |
| `/work`, `/work/mtro-pro`, `/work/<story>` | Client Work (7.6) |
| `/about` | About |
| `/contact` | Contact |
| `/apply` | redirects (replace) to `/contact` so old links keep working |
| `/#/anything` | an old hash-router link: rewritten to `/anything` before the router starts (and on an in-page hash change), so `/#/apply` and `/#/intake/denver-zen-den` still land |
| `/intake/denver-zen-den` | the existing client intake page, restyled with the new form components, unchanged in content and behavior, still `noindex` |
| `/style` | dev only |
| `/og` | dev only |

BrowserRouter with real paths (Amended: the live Railway host and `vite preview` both serve `index.html` for every path, so the hash router's reason no longer held; real paths give each page its own URL, canonical link and Open Graph tags). The review flag is a normal query: `/?review=1`. Prerendering the four pages to static HTML is a possible follow-up, not part of this build.

### 7.6 Client Work (added 4 October 2026)

Pages: `/work` (index), `/work/mtro-pro`, and one page per story in `content/clientStories.ts`. Words are in the Client Work sections of the copy doc. Navigation gains `Client Work` between Working Together and About.

- **Index.** (Amended 5 October 2026.) Hero (H1, lead), then the same two featured story cards as Home, with H2 titles set at H3 size. A separate "More client work" section follows with MTRO PRO and Psyche Digital cards, H3 titles, in that order. All cards use the existing responsive two-column grid. The closing call retains the primary button and secondary link.
- **Story page.** Hero with "See a sample of client work" above it, the eyebrow (the client or sector only; the kind of engagement was dropped on 4 October), H1 and the first paragraph as the lead. Body in the prose column; a bold lead-in in the copy is a heading over its paragraph (3.2), an H2 set at H3 size because the hero's H1 is the only heading above it. Figures follow the body, then the workflow table in the board style (5.8, Fig. 5), then the closing call.
- **Story copy (amended 6 October 2026).** Titles and editorial section headings state the practical result or capability gained. Manufacturing develops the quoting, reporting and team delivery work in narrative paragraphs, each introduced by an outcome heading for readers who scan. Four supporting bullets carry metrics and additional responsibilities, with bold metrics for emphasis. The closing paragraph distinguishes intended business outcomes from work already delivered. Cards and page titles share the same wording.
- **Figures.** Drawn with the figure primitives only (5.8): no images of diagrams. On these pages the pen marks the proof point (amended 7 October 2026, Patrick): the one detail in each figure that shows the work holds up, with a note of a few words that states the fact, such as '10,000 formulas distilled into 111 rules' or 'a failed night keeps yesterday's copy'. The human step stays in the drawing but unmarked; it reads as human because it is the box without the automatic small print. A record row can carry the circle and its note. (Amended 6 October 2026: each figure shows one real mechanism with an example in it, in plain words, under the subheading it illustrates, with a simple three-step version below 1024px and small print marking the automatic steps.) MTRO PRO: the morning account brief and one round of testing, under its first two sections. Manufacturing: one quote through the new software, making a report number trustworthy, and how a change gets into the software safely, under the pricing, reporting and delivery subheadings. Healthcare: how the shared information is built and kept fresh, and what a person sees, after the connected-systems and access paragraphs. Psyche Digital: after the meeting, after the recap example. The workflow table follows the body as before.
- **Links.** One pattern: "See the work" on every link to a story, "See a sample of client work" for the index (Amended 4 October 2026: it said "See all client work"; the page is a sample of the work, not the whole of it, and no link may say "all"). Beside "Let's talk" in a hero or closing call the index link is a call to action and reads "See how I've worked with others" (Amended 4 October 2026); the closing calls on the Client Work pages themselves pair the button with "How we work together" instead.
- **Not used:** orange box borders, pastel fills, a second palette, bold sans labels, middle-dot meta strings, definition-list tables, external SVG files, "+" in figure words (write "and").

---

## 8. Imagery

- **Portraits.** Two existing photographs are reused: the seated chair portrait (navy shirt, neutral wall) on Home; the portrait with the dog on About. Both are resized to 800px and 1600px widths, JPEG quality 82, stripped of metadata; the seated portrait also has a 1200px width so a 2x laptop takes 170KB rather than 300KB (Amended). Originals leave `public/` (they remain in git history).
- **Climbing photograph.** `about-hero.png` resized to 800px and 1200px widths as JPEG, used only on About per 7.3. This is the one place the brand orange appears in a photograph, which is a happy accident, not a rule.
- **Removed:** `overwhelmed.png` (AI-generated, wrong audience), `patrick-photo.jpeg` (byte-identical duplicate of `hero-photo.jpeg`).
- **Never:** stock photography, AI-generated scenes, screenshots of software, icon illustrations, abstract shapes.
- **Later, optional:** documentary photographs of real work artifacts (a paper quote with pen notes, a whiteboard job board, a stack of job folders) shot by Patrick at a client site with permission, treated consistently (slight desaturation, 2px radius, hairline border). Only if real. Not part of this build.

---

## 9. Accessibility and performance requirements

- Landmarks: `header`, `nav`, `main`, `footer`. One H1 per page. Heading levels never skip.
- Skip link to `#main`.
- Every interactive element has a visible focus style (2px `--ink` outline, 2px offset) and a 44px minimum hit area.
- All text meets WCAG AA contrast per the token table; no text under 24px uses `--mark`, `--stroke`, or `--resolved`.
- Color is never the only signal: a circled node also has a text annotation; a ticked row also says "Nothing" or "Ready".
- Figures are native `<figure>` elements labelled by their caption and described by a visually hidden text description. Decorative SVG is `aria-hidden="true"`.
- Form fields have associated labels, `aria-describedby` error links, `aria-invalid`, an `aria-live` status region, and a `role="alert"` submission error. The confirmation receives focus. Keyboard: Escape closes the phone menu and returns focus to the toggle; a new page moves focus to its H1 (a visible ring for keyboard users); a focused field is never hidden under the sticky header. Nothing is logged to the console in production.
- Non-text contrast: idle input borders are `--stroke` (3.8:1 on paper-2); the focus ring inside the ink block is `--paper`.
- `prefers-reduced-motion` disables the draw-on animation.
- No layout shift from fonts beyond `display=swap`; image elements carry width and height attributes.
- No Tailwind CDN, no runtime CSS generation. One CSS bundle built by Vite.
- Home total transfer under 600KB including fonts and the hero portrait at 800w. Largest image under 160KB at 800w.
- No console errors or warnings in the production build.
- No horizontal scroll at 360px, 390px, 768px, 1024px, or 1440px (`npm run screenshots` checks all five).
- `npm run check` builds with placeholder mail keys and runs `scripts/check-production.mjs`, which asserts the items above that can be measured, with the mail provider mocked so nothing is sent.

---

## 10. Metadata

From the copy doc's table. Set by `usePageMeta`; defaults live in `index.html`.

| Page | Title | Description |
|---|---|---|
| Home | Patrick McHeyser \| Operations and technology consulting | Practical help with the processes, software, and administrative work that make growth harder. Work directly with Patrick McHeyser from discovery through implementation. |
| Working Together | Working Together \| Patrick McHeyser | Start with a focused Discovery Sprint to understand an operating problem and decide what to change. Explore the process, deliverables, and implementation work. |
| About | About Patrick McHeyser | Meet Patrick McHeyser, a Boulder-based software engineer and operations consultant who works directly with your team to understand problems and implement improvements. |
| Contact | Let's Talk \| Patrick McHeyser | Tell Patrick what is getting harder to manage as your business grows. Start a conversation about the problem and whether he can help. |

Also in `index.html`: `theme-color` = `#F4F2ED`, Open Graph title, description, type, image (`/og.png`), and `twitter:card=summary_large_image`. The old `metadata.json` (AI Studio export) is updated to the new name and description.

---

## 11. Implementation plan

**Stack stays:** React 19, Vite 6, TypeScript, React Router 7 (BrowserRouter, amended from HashRouter), EmailJS. **Removed:** Tailwind CDN, lucide-react, the Gemini `define` entries in `vite.config.ts` (nothing imports them), the grain and animation CSS in `index.html`.

**File structure after the build:**
```
index.html                      fonts, meta, favicon, OG tags, #root
index.tsx
App.tsx                         routes, redirect, old-link rewrite, navigation focus and scroll, skip link target
styles/
  tokens.css                    custom properties (3.1 to 3.5)
  base.css                      reset, type scale, prose, links, focus, reduced motion
  components.css                header, footer, buttons, cards, figures, forms, ink block, proof slot
  pages.css                     page-specific layout only
components/
  Wordmark.tsx
  Header.tsx
  Footer.tsx
  Button.tsx                    ButtonLink, SecondaryLink, Arrow
  Section.tsx                   Section, Prose, Eyebrow
  ProofSlot.tsx
  Figure.tsx                    Figure, Node, Connector, Annotation
  marks/PenCircle.tsx
  marks/PenUnderline.tsx
  marks/PenTick.tsx
  diagrams/QuoteFlow.tsx        Fig. 1
  diagrams/SprintSteps.tsx      Fig. 2
  diagrams/QuotingTool.tsx      Fig. 3
  diagrams/Paperwork.tsx        Fig. 4
  diagrams/SharedView.tsx       Fig. 5
  diagrams/SprintTimeline.tsx   Fig. 6
  form/Field.tsx                labeled input or textarea with error wiring
hooks/
  usePageMeta.ts                title, description, canonical, Open Graph per route
  useReviewMode.ts
  useDrawOnView.ts              IntersectionObserver for pen marks
  useParentSize.ts              measures a pen mark's parent
pages/
  HomePage.tsx
  WorkingTogetherPage.tsx
  AboutPage.tsx
  ContactPage.tsx
  IntakePage.tsx                existing, restyled
  StylePage.tsx                 dev only
  OgPage.tsx                    dev only
public/
  favicon.svg
  og.png
  patrick-seated-800.jpg, patrick-seated-1600.jpg
  patrick-dog-800.jpg, patrick-dog-1600.jpg
  patrick-ridge-800.jpg, patrick-ridge-1200.jpg
  stoppromptingstartshipping/   untouched (hosted talk)
docs/
  website-copy-2026-10.md       the copy doc (source of truth for words)
  design-spec.md                this document
  design-review-2026-10.md      review findings and dispositions (added after review)
scripts/
  screenshots.mjs               Playwright: all routes at 1440 and 390 (REVIEW=0 for the public set), overflow at 360, 768, 1024
  check-production.mjs          the production check (npm run check)
  adversarial-review.mjs        sends the review packet to Gemini, Codex, Grok (and the OpenAI and xAI APIs when keyed)
```

**Housekeeping in the same branch:** `package.json` name becomes `mcheyser-site`; `README.md` is rewritten for this project (the AI Studio template text goes); `CLAUDE.md` architecture, status, and rules are updated; `PROGRESS.md` is replaced by a short current-state note.

---

## 12. Acceptance criteria

The build is done when every line below is true.

**Words**
- [ ] Every visitor-facing string on all four pages matches `docs/website-copy-2026-10.md` exactly, including button labels, nav labels, footer, form labels, validation messages, and states.
- [ ] No editorial bracket text is rendered. No placeholder quotation exists anywhere in the bundle (the review-mode slot labels say they are slots and quote nothing).
- [ ] Page titles and descriptions match section 10.

**Concept**
- [ ] The only colors in the bundle are the ten tokens (plus transparent and the 20% hairline on ink).
- [ ] `--mark` appears only as pen strokes, the primary button, the active nav underline, and link underlines (and `--mark-text` only for annotation labels, form errors, and the three stage numbers).
- [ ] No gradients, shadows, blur, grain, pills, icon sets, stock or AI imagery.
- [ ] Exactly one ink block on Home and on Working Together; none on About or Contact.
- [ ] All six figures exist with the exact content in section 6 and render without horizontal scroll at 360px.
- [ ] Pen marks draw on once when scrolled into view and are static under reduced motion.

**Structure**
- [ ] Routes per 7.5 at real paths, including the `/apply` redirect, the old `#/` link rewrite, and the retained intake page.
- [ ] ProofSlots render in review mode and render nothing in a production build without the flag.
- [ ] The contact form validates per 7.4, shows the exact messages, moves focus to the first error, and submits through EmailJS with the five field names.

**Quality**
- [ ] `npm run build` and `tsc --noEmit` pass with no errors or warnings.
- [ ] `npm run check` passes.
- [ ] Screenshots of all routes at 1440px and 390px exist, in review mode and public mode, and have been looked at.
- [ ] No console errors in the production preview.
- [ ] Section 9 requirements hold.

**Housekeeping**
- [ ] Tailwind CDN, lucide-react, Gemini defines, old images, and old pages are gone. `README.md`, `CLAUDE.md`, `PROGRESS.md`, `package.json`, `metadata.json` updated.

---

## 13. Adversarial review plan

After the build is complete and pushed, four independent reviewers get the same packet and the same brief: Gemini, Codex (OpenAI), Grok (xAI), and an independent Claude session with no memory of this work.

**Packet:** this spec, the copy doc, full-page screenshots of every route at 1440px and 390px with review mode on, and the full source of the branch.

**Brief:** attack both the concept and the execution. Specifically: (1) does the design concept serve a $5M to $25M business owner, or is it designer-pleasing; (2) where does the spec itself make a weak or generic choice (palette, type, wordmark, diagrams, layout); (3) where does the implementation fail the spec; (4) code quality, accessibility, performance, and responsive defects; (5) does the copy land better or worse in this design than it would in a plain page; (6) what would a skeptical owner notice in the first five seconds. Each finding carries a severity (blocker, major, minor, taste) and a concrete fix.

**Disposition:** every finding is logged in `docs/design-review-2026-10.md` with one of: fixed (commit), declined (reason), or deferred (owner decision). Blockers and majors are fixed before the second round. A second round confirms the fixes.

**Round one (3 and 4 October 2026):** Gemini 2.5 Pro, Codex (0.160.0, Patrick's default model) and the Grok CLI reviewed the build at `1472a7f`; the independent Claude session did not run (the cloud session that was to host it was stopped). Their reviews are in `review-out/`. Dispositions and the second round are in the review log.

---

## 14. Open questions for Patrick

1. **Climbing photograph on About.** Included per 7.3 because it is real, warm, and happens to be in brand orange. Cut it if it undercuts the operations positioning.
2. **LinkedIn link in the footer.** Added beyond the copy doc because this audience will look him up. Remove if unwanted.
3. **Intake page.** `/intake/denver-zen-den` is kept and restyled. If that engagement is over, delete the route.
4. **Testimonials and sample deliverable.** Slots are built. They render nothing until real material exists.
5. **Documentary photographs.** Not in this build. Decide later whether a client site shoot is possible.
