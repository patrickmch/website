# Adversarial review: gemini (gemini-2.5-pro)

Generated 2026-10-04T03:52:16.506Z in 61s.

### Verdict
I would ship this site after fixing the major findings. The core concept—"make the work visible"—is strong, distinctive, and a good fit for the skeptical business owner audience. It successfully avoids the slick, generic feel of typical agency sites. The execution is largely high-quality, with a disciplined visual system and well-crafted components. The single biggest risk is the choice to use a `HashRouter`. The `/#/` in every URL is a technical compromise that undermines the site's air of quiet competence, is poor for SEO, and is unnecessary on modern static hosting.

### Findings

1.  **Severity:** Major
    **Where:** `App.tsx`, routing
    **What is wrong:** The site uses `HashRouter`.
    **Why it matters to this reader:** A business owner paying for technical competence will see a URL like `mcheyser.com/#/working-together` and, consciously or not, register it as dated or incorrect. It looks like a workaround, not a professional choice. It also harms search engine optimization and makes analytics tracking more complex.
    **The concrete fix:** Switch to `BrowserRouter`. Configure the static host (Netlify, Vercel, etc.) to handle client-side routing by redirecting all requests to `index.html`. This is a standard configuration for single-page applications.

2.  **Severity:** Major
    **Where:** `components/Figure.tsx`, `components/diagrams/SharedView.tsx`
    **What is wrong:** The annotation leader lines are implemented as straight diagonal or vertical lines, not as the "elbow, two segments" specified.
    **Why it matters to this reader:** The "pen on paper" concept lives or dies by these small, authentic details. A straight line looks like a default software-generated connector. An elbow looks like a mark a person drew by hand. The spec was right, and the build is wrong. This failure to execute the concept's details, repeated across multiple diagrams, makes the whole thing feel less considered.
    **The concrete fix:** Replace the single `<path>` in the `Annotation` component's leader SVG with two `<path>` elements or a single path with three points to create the specified elbow shape. Adjust the coordinates to connect the annotation text to the circled element correctly.

3.  **Severity:** Major
    **Where:** `App.tsx`, `styles/base.css`
    **What is wrong:** The skip link's primary interaction model is an `onClick` handler, which is insufficient for keyboard-only users navigating a single-page app with a hash router.
    **Why it matters to this reader:** Accessibility is a mark of professional-grade engineering. A component that only works for mouse users is a defect.
    **The concrete fix:** The `onClick` handler correctly prevents default and focuses the main content area. This is good. However, ensure this behavior is also triggered on key press events (like Enter) for full keyboard accessibility, or simplify to a standard `href="#main"` and ensure the router doesn't interfere with this fragment identifier behavior. Since `HashRouter` is already a problem, the fix is to move to `BrowserRouter`, where a simple `href="#main"` will work as expected without JS.

4.  **Severity:** Minor
    **Where:** `styles/base.css`, links in prose
    **What is wrong:** The default state for text link underlines uses `--mark` (#D9622B) on `--paper` (#F4F2ED), which has a 3.3:1 contrast ratio.
    **Why it matters to this reader:** This is a weak visual affordance. For users with any level of visual impairment, the underline—the primary signal that text is interactive—may be difficult to see. It looks elegant but sacrifices clarity.
    **The concrete fix:** Use `--mark-text` (#B04A1B, 4.9:1 contrast) for the default underline color. It's a slightly darker, higher-contrast orange already in the palette for this purpose. Keep the `--ink` hover state.

5.  **Severity:** Minor
    **Where:** `pages/AboutPage.tsx`
    **What is wrong:** The `sizes` attribute on the climbing photograph (`patrick-ridge-*.jpg`) is hardcoded to `350px`.
    **Why it matters to this reader:** This is sloppy. The attribute tells the browser which `srcset` image to download based on the layout width. A hardcoded value means the browser may download a much larger image than necessary, wasting bandwidth. This is a small but clear sign of inattention to detail.
    **The concrete fix:** Change `sizes="350px"` to a value that reflects the image's actual layout size, e.g., `sizes="(min-width: 1024px) 350px, 0px"` (since it's hidden below 1024px).

6.  **Severity:** Minor
    **Where:** `components/Header.tsx`
    **What is wrong:** When the mobile menu is open, the body content behind it can still be scrolled.
    **Why it matters to this reader:** This is a disorienting and unprofessional user experience. The spec explicitly allows this ("Body scroll is not locked"), which means the spec is wrong.
    **The concrete fix:** When the menu is opened, add a class to the `<body>` element that sets `overflow: hidden`. Remove the class when the menu is closed.

7.  **Severity:** Minor
    **Where:** `components/diagrams/SprintTimeline.tsx`, `components.css`
    **What is wrong:** In Fig. 6 on desktop, the four "outcome" nodes stack vertically. This is a weak, unbalanced layout that leaves a large amount of empty space.
    **Why it matters to this reader:** It looks like the layout wasn't fully considered for wider screens. The mobile 2x2 grid is a better solution.
    **The concrete fix:** Apply the 2x2 grid layout from the mobile breakpoint to the desktop view as well. In `components.css`, move the `display: grid` and `grid-template-columns: 1fr 1fr` rules for `.stack--outcomes` out of the `(max-width: 767px)` media query so they apply to all screen sizes.

8.  **Severity:** Minor
    **Where:** `pages/HomePage.tsx`, spec section 7.1
    **What is wrong:** The spec calls for an "H3-level heading styled as H2" for "What this can look like." The build correctly implements this as an `<h2>`, but the spec itself is confused.
    **Why it matters to this reader:** This kind of ambiguity leads to inconsistent heading structures, which is bad for accessibility and SEO.
    **The concrete fix:** The build is correct. Update the spec to simply say this is an `<h2>`.

9.  **Severity:** Taste
    **Where:** Spec section 3.1
    **What is wrong:** The `--mark` color, #D9622B, is a very bright, standard "web orange."
    **Why it matters to this reader:** For a site trying to be calm, grounded, and distinct, this color feels a little too energetic and generic. It's the color of a tech startup's "Get Started" button.
    **The concrete fix:** Mute the orange slightly. A color like #D15B2F would have a similar character but feel more integrated with the "paper and ink" palette while still passing contrast requirements for its intended uses.

10. **Severity:** Taste
    **Where:** Spec section 3.2
    **What is wrong:** The font stack (Source Serif, Sans, Code Pro) is competent, readable, and utterly generic. It's the default choice for thousands of sites aiming for a "serious but modern" feel.
    **Why it matters to this reader:** It does no harm, but it's a missed opportunity to be more distinctive. For a solo consultant, every detail contributes to the brand. This choice says "I pick the safe, standard option."
    **The concrete fix:** Consider a more characterful but still highly readable alternative. For example, replacing the Source superfamily with IBM Plex (Serif, Sans, Mono) would offer a slightly more technical and distinctive feel without sacrificing legibility.

### What works

*   The core concept ("paper, ink, one pen") is excellent and executed with discipline.
*   The wordmark is unique, memorable, and reinforces the concept.
*   The diagrams are honest, legible, and effectively translate abstract services into concrete visuals.
*   The copy and design are in perfect alignment, creating a cohesive and trustworthy tone.
*   The build quality is generally high, with good use of modern React, TypeScript, and semantic HTML.
*   The rejection of decorative fluff (animations, shadows, gradients) is a sign of confidence that serves the audience well.

### Alternative directions

1.  **The Engineer's Notebook.** Instead of a finished report, this direction would feel like a working document. The layout would be stricter, using a visible grid. The primary typeface would be a high-quality monospaced font like IBM Plex Mono or JetBrains Mono, even for headings. The accent color would be a blueprint blue instead of orange. Diagrams would be more detailed, with explicit dimensions and callouts, resembling schematics. This would appeal directly to an owner who is themselves technical or deeply respects rigorous, detail-oriented engineering.

2.  **The Premium Report.** This direction would elevate the "document" concept to feel more like a high-end financial or strategic report. Typography would shift to a more classic, elegant serif like Tiempos Text or FF Tisa Pro. The layout would feature more generous whitespace and wider margins. The accent color would be a deep burgundy or a dark forest green, evoking a fountain pen. Diagrams would be simplified and abstracted further, focusing on clarity over detail. This would position the service as more premium and strategic, appealing to the higher end of the $5M-$25M revenue range and to owners who value gravitas and a traditional sense of quality.

3.  **The Workshop Whiteboard.** This direction would feel more collaborative and dynamic. It would use a humanist sans-serif like Inter or Public Sans throughout. The layout would be less formal, with elements occasionally breaking the grid. The orange accent would be brighter and used more liberally for highlights and connectors. The diagrams would look more like quick whiteboard sketches—thicker, rougher lines, and handwritten-style annotations. This would project an image of speed, agility, and hands-on collaboration, appealing to founders in faster-moving industries or those who want a partner who feels more like part of the team.
