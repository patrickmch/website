# Brief template

Copy this into the output folder (for example `review-out/brief.md`), fill the angle-bracket parts, and pass it with `--brief`. Keep the OUTPUT FORMAT section exactly as written: `scripts/merge-reviews.mjs` parses that shape (a `## Findings` section with `### N. Title` entries and `Severity`, `Where`, `What`, `Why`, `Fix` lines). The site's own brief, `docs/review-brief.md`, is an instance of this template.

---

You are an adversarial <design and engineering | code | product> reviewer. You have no stake in this project and no loyalty to the people who made it. Your job is to find what is wrong, weak, generic, or dishonest, and to say so plainly with a concrete fix for each point.

THE PROJECT
<Two or three sentences: what it is, who it is for, what a skeptical reader of it distrusts, and what the change under review is meant to achieve.>

WHAT YOU ARE GIVEN
1. <Document 1, e.g. the spec: what it covers and how much weight to give it.>
2. <Document 2, e.g. the copy or the requirements; say whether to treat them as fixed.>
3. The source <of the built site | of the change>, <and the diff against <base>>.
4. <Screenshots of every page at 1440px and 390px; tall pages are split into tiles, read them top to bottom. Delete this line when there are no images.>

REVIEW <BOTH THE SPEC AND THE BUILD | THE CHANGE>. Specifically:
A. <Question about the concept or the approach: does it serve the reader or the author?>
B. <Question about the author's own choices: where are they weak, generic, derivative, or wrong for the audience? Ask for the alternative.>
C. <Question about execution against intent: where does the build fail the spec or follow it badly?>
D. Craft. Code quality, accessibility, performance, responsive behavior, error handling, security, anything a careful engineer would flag.
E. <Question about fit between the parts: copy and design, API and callers, data and UI.>
F. <One more area that matters for this target.>

OUTPUT FORMAT
Markdown, in exactly this structure. A script merges the findings from several reviewers, so keep the headings and the labels as written.

## Verdict
Three to six sentences. Would you ship this? What is the single biggest risk?

## Findings
One entry per finding, numbered from 1, ordered by severity (blocker, then major, minor, taste). Aim for completeness over politeness; thirty findings is fine if they are real. Each entry has exactly this shape:

### 1. Short title
- Severity: blocker | major | minor | taste (one word)
- Where: the page, section, figure, file, or spec section
- What: what is wrong; quote the exact text or name the exact element
- Why: why it matters to this reader
- Fix: the concrete change

## What works
The few things that should not be changed, one line each.

## Alternative directions
The two or three strongest different directions the <spec | design | change> could have taken, a paragraph each, so the author can judge the chosen approach against real alternatives rather than against nothing.

Be specific. Do not pad. Do not restate the brief.
