# Adversarial review: codex ((codex default))

Generated 2026-10-04T03:59:12.448Z in 212s.

## 1. Verdict

I would not ship this build unchanged. The visual concept is appropriate, but it currently demonstrates diagram-making more convincingly than consulting competence. In the first five seconds, a skeptical owner sees a readable, restrained promise about familiar problems, but little evidence that Patrick has solved them. The biggest risk is that illustrative workflows occupy the space where credible proof and a concrete description of the paid engagement should be. Keep the underlying visual system, correct the contradictory offer description, shorten the route to the offer, and verify the contact path before release.

**Verification:** Reviewed the supplied screenshots, spec, copy, and local source. TypeScript and the production build pass. Browser verification was blocked by `listen EPERM` when starting the local server; findings below distinguish source defects from unverified behavior. No project files were changed.

## 2. Findings

1. **Blocker, verification gap — Contact submission; `pages/ContactPage.tsx`, launch handoff.**  
   The sole conversion mechanism has no demonstrated end-to-end delivery in the review evidence. The handoff explicitly leaves EmailJS configuration, template compatibility, and receipt of a real message for launch; `check-production.mjs` checks invalid inputs, not delivery. **Fix:** Before release, submit through the configured candidate, confirm the actual received message contains all five fields and a usable reply address, and exercise failure and retry behavior. An API success response alone does not establish that Patrick received the note.

2. **Major — Fig. 2; spec §6 and `components/diagrams/SprintSteps.tsx`.**  
   “What a Discovery Sprint does with the work” includes “Build and test it with the team.” Working Together explicitly says the Sprint ends with findings and review, with implementation scoped separately. This is a material contradiction about what the customer buys, introduced by the design spec. **Fix:** Rename Fig. 2 to describe the overall engagement, or end its Sprint-specific sequence at reviewing findings and choosing the next step.

3. **Major — Proof strategy; Home, Working Together, About.**  
   Removing unfilled proof slots is honest, but the resulting site has no testimonial, inspected deliverable, or concrete engagement example. The About page adds “senior engineer” without naming the work or showing its substance. A polished process description cannot carry the same evidentiary weight. **Fix:** Add one approved, specific engagement account or redacted findings excerpt, including context, Patrick’s contribution, and limitations. If only a constructed sample is available, label it prominently as a sample.

4. **Major — Home information order; spec §7.1.**  
   The paid first engagement appears after the hero workflow, four problem cards, the approach section, and three illustrated examples. On mobile it arrives in tile five; Patrick appears in tile six. This directly undermines the spec’s promise that the person appears “one scroll down.” **Fix:** Move the Discovery Sprint introduction and a compact personal introduction substantially earlier. Preserve the words while moving detailed examples below the buying decision.

5. **Major — Mobile diagram relationships; `Fan` in `components/Figure.tsx`.**  
   Below 768px, branching and merging connectors become a single downward arrow. Fig. 3 consequently looks like a sequence ending in “Ready for review” followed by “Needs a judgment call,” rather than two alternative outcomes. Fig. 4 similarly loses the relationship between one record and three separate documents. **Fix:** Give mobile diagrams explicit grouped inputs and labeled alternative outputs, using short branch connectors or “Either” and “Creates these documents” labels. Stacking boxes is not enough to preserve meaning.

6. **Major — Desktop connector geometry; Fig. 4 and `Fan`.**  
   The fan positions endpoints at equal percentages of its own stretched height, rather than at the actual centers of adjacent nodes. In `home-desktop-03.png`, the upper branch ends above the “Work order” box. The diagram’s lines fail to connect the things they supposedly connect. **Fix:** Align connector tracks with the destination rows or measure actual node centers. Check variable-height labels and intermediate widths.

7. **Major — Contact field visibility; `.field__input` in `styles/components.css`.**  
   The border token against the page measures approximately **1.45:1**; the input fill against the page is approximately **1.08:1**. The screenshots show pale rectangles whose boundaries require unnecessary effort to locate. This matters especially on a bright phone screen or for reduced vision. **Fix:** Use `--stroke` for idle control borders and reserve `--line` for noninteractive separators.

8. **Major — Focus visibility on the Discovery Sprint block; `styles/base.css`.**  
   The global focus outline is `--ink`, and the ink block background is also `--ink`. “See how we work together” therefore receives an effectively invisible custom focus outline on Home. **Fix:** Set a contrasting `:focus-visible` outline within `.ink-block`, using `--paper` and adequate offset.

9. **Major — Route and mobile-menu focus; `App.tsx`, `components/Header.tsx`.**  
   Route changes scroll without moving focus into the new page. Escape closes the mobile panel without returning focus to its toggle, and following a mobile link hides the currently focused navigation region. The source has no deliberate focus handoff for either case. **Fix:** Return focus to Menu on Escape and focus the new page’s main region or heading after navigation. Verify the sequence with keyboard and screen-reader use.

10. **Major — Contact success transition; `pages/ContactPage.tsx`.**  
    Success removes the entire form, including the focused submit button and existing live region. It mounts a new `role="status"` containing the confirmation, without moving focus. Reliable announcement and orientation are therefore not established. **Fix:** Keep a persistent status region and move focus to a confirmation heading when replacing the form. Verify that the message is announced once.

11. **Major — Four-page discoverability; spec §7.5, `App.tsx`, `index.html`.**  
    All pages are fragment routes under one HTML document. Changing `document.title` does not supply independently served page metadata, and every route shares the same static Open Graph URL, title, and description. This limits the value of building separate service and biography pages for search and sharing. **Fix:** Generate HTML at real paths for the four marketing pages, with route-specific metadata. Preserve old hash links through a compatibility redirect. A client-side router swap alone would not provide prerendered content.

12. **Major — Public client-specific intake; `pages/IntakePage.tsx`.**  
    The retained page is described as “hidden,” but it is publicly routable and eagerly included in the application. It contains a named client, a named contact, and engagement-specific references. A dynamically inserted `noindex` tag does not make that material private. **Fix:** Establish whether this content is authorized for public access. Remove it if obsolete; otherwise move confidential intake content behind appropriate access control and stop describing an unlinked public page as hidden.

13. **Major, copy issue — Discovery Sprint buying information.**  
    The offer explains its philosophy repeatedly but never gives a representative duration, client time commitment, fee range, or visible example of the deliverable. “We agree on the scope, fee, and timing upfront” promises a later explanation rather than helping an owner judge fit now. **Fix:** Add truthful commercial bounds or a clearly labeled example engagement, approved in the copy source. Do not invent a standard package if Patrick does not have one.

14. **Major, diagram-copy issue — Fig. 1’s claimed diagnosis.**  
    “The circled step is where work usually waits” presents owner pricing decisions as the usual bottleneck without evidence. “Illustrative” does not neutralize that generalization. It also prediagnoses the reader immediately before selling an investigation. **Fix:** Say “In this example, the quote waits for a pricing decision.” Retain other bottlenecks elsewhere so the owner is not always cast as the problem.

15. **Minor — Human approval is a footnote rather than a workflow step; Figs. 3–4.**  
    Fig. 3 sends exceptions “to a person,” although routine quotes also require review. Fig. 4 puts “Checked by a person before it goes out” underneath the diagram rather than showing a review gate. Without captions, the human-control boundary is ambiguous. **Fix:** Show routine review and exception resolution separately, followed by an explicit approval gate before anything is sent.

16. **Minor — Home’s vertical cost; supplied mobile tiles and `.hero__figure`.**  
    The first workflow alone consumes roughly half a thousand vertical pixels on mobile to explain that an owner’s pricing decision delays a quote. Five boxes, four arrows, an annotation, and a caption repeat a short idea. **Fix:** Use a compact mobile treatment centered on the waiting step, with the full workflow available later. Keep readable text rather than shrinking the existing diagram.

17. **Minor — Figure typography; spec §3.2 and §5.8.**  
    The information that supposedly makes the work visible is often the smallest, most mechanically styled text on the page. At 13–14px, long monospaced labels wrap awkwardly and compete with captions for reading effort. **Fix:** Use the sans family at approximately 15–16px for node labels and values; retain mono for figure numbers, IDs, and short annotations. Simplify diagrams where the larger type needs room.

18. **Minor — Fig. 5 mobile annotation; `SharedView.tsx`, `.board td`.**  
    The marked cell becomes a flex row containing the generated column label, “Price decision,” and the annotation as siblings. The screenshot shows the value squeezed onto two lines while the annotation sits beside it. This is visibly different from the intended annotation-below treatment. **Fix:** Wrap the value and annotation in one content column, with the annotation beneath the value.

19. **Minor — Mobile table accessibility; `.board thead`.**  
    The responsive treatment removes the header row with `display:none` and substitutes CSS-generated labels. That removes the explicit header cells from the accessible presentation and makes interpretation dependent on generated-content behavior. **Fix:** Preserve accessible table headers, or render a deliberate mobile description-list structure. Verify the resulting reading order rather than assuming visual labels are sufficient.

20. **Minor — Hit areas fail the project’s stated requirement.**  
    `.btn--small` is explicitly 40px high; desktop navigation links are roughly 36px high. Wordmark and footer links also lack the specified 44px minimum target treatment. **Fix:** Add target padding or minimum dimensions without enlarging the visible typography. Distinguish the project’s 44px requirement from any narrower accessibility-standard exceptions for inline links.

21. **Minor — Button contrast narrowly misses the specified threshold; `styles/tokens.css`.**  
    `#16202B` on `#D9622B` calculates to approximately **4.49:1**, below the spec’s 4.5:1 target. Rounding the displayed ratio to 4.5 does not create margin. **Fix:** Slightly adjust the fill or text token and calculate the actual pair again. Choose a comfortable margin rather than tuning to the boundary.

22. **Minor — Review screenshots conceal the actual public composition.**  
    Dashed proof slots add large orange objects and substantial spacing that disappear in production. Their presence changes both the visual rhythm and the perceived amount of supporting material. Existing production checks establish that they disappear, but not that the resulting composition works. **Fix:** Review a second complete screenshot set with `review=0` before accepting spacing, emphasis, and page length.

23. **Minor — QA coverage is narrower than the acceptance claim; screenshot and production scripts.**  
    Screenshots cover 390px and 1440px, while the spec also requires 360px, 768px, and 1024px. Screenshots force reduced motion, so they cannot verify the ordinary draw-on behavior. The production checks do not establish keyboard-menu behavior, delivery, or transfer size. **Fix:** Add a bounded matrix covering the missing breakpoints, normal and reduced motion, keyboard navigation, and form states. Report each untested requirement as open.

24. **Minor — Font and performance promises lack supporting evidence; spec §9 and `index.html`.**  
    `display=swap` permits a font replacement; it does not ensure absence of layout shift. The external stylesheet requests three families and multiple styles, while the 600KB transfer target has no measured network result here. The resized 800px portraits do pass the stated 160KB image limit. **Fix:** Measure actual transferred bytes and layout shift with a cold cache. Subset or self-host needed fonts and use compatible fallback metrics if the measurements justify it.

25. **Minor — Unrequested motion and lost reading position; `styles/base.css`, `ScrollManager`.**  
    Global `scroll-behavior: smooth` adds a second motion behavior despite the spec’s “exactly one motion idea.” Unconditional top scrolling also discards reading position when returning to these very long pages. **Fix:** Use immediate scrolling for new-page navigation and restore position for history navigation. Keep motion local to the intended pen treatment.

26. **Minor — Numbered problem cards imply a process; Home problem grid.**  
    “01–04” suggests stages or a diagnostic sequence, but these are independent symptoms. The repeated bordered-card treatment also contributes a familiar agency-site structure despite the document concept. **Fix:** Remove the numbers from symptoms and use compact editorial rows or unnumbered groups. Keep numbering where order actually matters.

27. **Taste — The wordmark’s distinguishing detail does not survive small sizes.**  
    At header size, the orange stroke under the raised `c` is nearly punctuation. In the social image it is prominent, but the historical explanation carries more of its meaning than the rendered mark does. **Fix:** Simplify to one stronger stroke and tune the raised character separately at header size. Keep the name readable without requiring anyone to notice the device.

28. **Taste — “One pen” becomes a repeated decorative formula.**  
    Nearly every figure circles something, even when the semantic purpose changes from bottleneck to missing information to recommended deliverable. Repeating the same irregular oval makes the mark feel templated. The paper/navy/orange palette supports readability, but does not substantiate the spec’s claim that “nobody in this space looks like this.” **Fix:** Reserve circles for actual exceptions or decisions; use ordinary grouping for process structure. Judge distinctiveness through a specific, useful artifact rather than the palette.

29. **Taste — About supplies personality before professional substance.**  
    The dog portrait is warm, but occupies most of a mobile screen before the reader reaches the career explanation. Desktop adds a second large leisure photograph while professional evidence remains abstract. **Fix:** Keep one personal photograph, reduce its mobile footprint, and give the recovered space to a concrete account of relevant work. The climbing photo is optional, not a credibility requirement.

30. **Minor — The social preview is too detailed for its likely display size; `public/og.png`.**  
    The diagram is legible at 1200px, but at a small card width its sublabels and annotation become tiny. The largest element is the surname, while the reason to investigate the service is smaller. **Fix:** Test at approximately 400px wide. Use the business promise and one compact waiting-step illustration, with fewer subordinate labels.

## 3. What works

- The serif/sans pairing, readable body text, and restrained colors suit a thoughtful solo consultant.
- Specific operational language is stronger than generic technology or transformation claims.
- Clear “Illustrative” labels and omitted unfilled proof blocks preserve an important honesty boundary.
- The explicit ability to take the findings elsewhere or stop after discovery reduces perceived lock-in.
- Visible FAQ answers, persistent contact access, and a direct email alternative are sensible.
- HTML diagram text, native figure markup, labeled inputs, and responsive portrait assets are sound foundations.
- The implementation’s native `<figure>` with caption and description is a reasonable improvement over the spec’s prescribed generic group role.

## 4. Alternative directions

**An actual findings document.** Build the site around one approved, redacted engagement artifact: the original question, a small work map, an observed exception, the recommendation, and what remained uncertain. Use a margin-note layout with restrained annotation and clear separation between observation and interpretation. This would fulfill “make the work visible” more convincingly than six constructed schematics because visitors could inspect the quality of the thinking they are being asked to purchase.

**A concise principal-led practice.** Open with the current promise, a compact seated portrait, a short verified professional introduction, and the Discovery Sprint’s deliverable and commercial bounds. Follow with three operational examples, each supported by one useful artifact rather than a complete diagram system. This direction makes the solo relationship and credibility visible early and substantially reduces mobile reading distance.

**A single worked operational example.** Use one clearly labeled illustrative quote from request to approval throughout Home. Show the original waiting point, the proposed change, the exception path, and the decision an owner would need to make before implementing it. Keep other services as brief text. A continuous example would demonstrate depth and judgment while avoiding the present collection of separate diagrams that often restate their neighboring paragraphs.
