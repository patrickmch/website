# Story figures: diagnosis and proposed redraw (5 October 2026)

Status: built and revised. The figures now sit on the reviewer's text (6 October, Patrick's choice), each under the subheading it illustrates, with a full drawing from 1024px up and a simple three-step version below that. The fixed-canvas scaling tried on 5 October is retired (tag story-figures-fixed-canvas-2026-10-06).
client-story figures read as pretty additions and do not show what he actually does.

## Why the current figures feel vague

1. One shape, five times. Every story figure is a row of three or four boxes ending in a
   circled "a person decides". A reader learns the shape once and stops reading.
2. Abstract nouns in the boxes: "Business judgment", "Implementation", "Collection and
   validation", "Gather and prepare". Nothing in them could only be true of this work.
3. No objects. Real systems produce things: a quote saved as version 3, a test report with
   14 passed and 7 defects, a review-queue card, an answer with source references. The
   figures show steps and never the thing a step produces. The prose now carries these
   specifics; the figures lag it.
4. No example instance. The Working Together illustrations (a quote moving through a
   business, a customer record with a missing PO number, a job board) are more concrete
   than the real client figures. The illustrations are drawn better than the work.
5. The pen mark has become a tic. Five identical "a person decides" circles. The site's
   one pen idea should land on the one interesting point per figure and say what happens
   there.
6. The mechanism is invisible. The distinctive engineering (nightly publish that keeps
   serving the last good copy, four permission tiers, a pre-check that gates browser QA,
   three separate verdicts, a daily job with per-part health and a watchdog, exactly-once
   cards) is what makes the work credible, and none of it is drawn.

## Rules kept

- Drawn with the existing primitives: Flow, Node, Connector, Fan, Stack, the `record`
  card, `resolved-line`, PenCircle, PenTick, Annotation. One small generalisation: the
  record card accepts key and value rows, not only "on file" and "missing".
- The pen keeps its story-page meaning: it circles the step where a person decides.
- No vendor names, locations, entity counts, customer names, currency or client incidents
  in the anonymous figures. Example values are obviously illustrative.
- No figure wider than four nodes plus one fan, stack or record (five nodes clip at 768px).
- Counts in nodes describe the system or one run (rules, tools, tiers, cases). No savings,
  ROI or outcome numbers.

## Manufacturing: three figures

### Fig. 1  One quote through the application
Shape: record card, fan out, stack (the paperwork shape on Working Together).
- Record "Quote request": Product family; Dimensions; Material; Quantities 250, 500, 1,000.
- Node "Rules": 111 explicit rules and 37 reference tables, written down from the spreadsheet.
- Fan out to a stack of four small nodes: "Priced lines: material, labor, vendor, freight";
  "Three quantity alternatives"; "Version 3, compared with version 2"; "Customer PDF".
- Pen circle on "Version 3, compared with version 2", annotation "earlier versions kept".
  (If the pen must mean a person: circle "Operator review" as a fourth node instead.)
- Caption: One quote through the application. Priced by explicit rules, saved as a version
  that cannot be overwritten, compared with the last version and sent as a PDF. Ninety-nine
  archived quotes were reproduced this way with zero defects before operators saw it.

### Fig. 2  Tracing one report figure to its source
Shape: node, node, record, node, node.
- Node "Report figure": on-time delivery, this month.
- Node "Trace the population": which orders, which lines, which dates count.
- Record "Found" (each row flagged): Counted order lines, not orders; Partial month inside
  the year-to-date total; Customer IDs duplicated by capitalization; A data feed that had
  stopped updating.
- Node "Definition ratified with the owner": seven on-time definitions agreed. Pen circle,
  annotation "a person decides what counts".
- Node "Figures traceable to source": 29,820 comparison formulas corrected. Tick.
- Caption: Tracing one report figure to its source. The errors a traced reconciliation
  finds, the definition the owner ratifies, and a figure that can be checked.
(If five elements are too wide, drop "Report figure" and start at the trace.)

### Fig. 3  How a change ships
Shape: three nodes, fan out, stack of three, resolved line.
- Node "Build in an isolated copy": one bounded change, AI-assisted, repeatable code checks.
- Node "Pre-check gate": browser QA cannot start until it passes.
- Node "Browser QA on a local candidate": throwaway database, real clicks, screenshots.
- Fan out to a stack: "Product verdict"; "Evidence verdict"; "Release verdict" (pen circle,
  annotation "a person decides"; a no-go returns to the build).
- Resolved line: Passing changes deploy automatically with a recorded live check and a
  rollback point.
- Caption: How a change ships. The build never tests itself. About 135 runs and 2,800
  screenshots in the first four weeks.

## Healthcare: two figures

### Fig. 1  How the store is built and kept current
Shape: stack of four small nodes, fan in, three nodes.
- Stack: "Work-management boards"; "CRM"; "Document storage"; "Website records".
- Fan in, mobile label "collected nightly".
- Node "Collect and match": never joined on an ID alone; duplicates merged by reviewed
  overrides; conflicting identities held for a person. Pen circle, annotation "conflicts
  held for a person".
- Node "Gates": field validation, source priority, redaction hard stop, volume checks.
- Node "Nightly publish": swaps in under a minute; the last good copy keeps serving if a
  run fails. Tick.
- Caption: How the store is built and kept current. Four systems collected each night into
  the client's own account, matched, checked and published without readers noticing a
  failed run.

### Fig. 2  What a person sees
Shape: node, node, record, node.
- Node "Staff seat": the team's existing AI workspace.
- Node "Controlled connection": 20 read-only tools; 4 permission tiers; denials tested live.
- Record "Answer for case 1234": Status, confirmed, source: board record 14 May (tick);
  Supporting document, on file, source: document storage (tick); Contact preference,
  unresolved, two records disagree (flagged).
- Node "Person reviews and decides". Pen circle, annotation "a person decides".
- Resolved line: The same connection runs the team's workflows: profile preparation,
  recurring paperwork, a final evidence check.
- Caption: What a person sees. Every answer carries its source, unresolved facts stay
  visible, and a person retrieves only what their role allows.

## MTRO PRO: two figures and the preview

### Fig. 1  The daily account brief
Shape: record, node, node, node.
- Record "Seven sources, every morning": Email (tick); Text messages, recovered after an
  alert (tick); Customer community (tick); Team chat (tick); Product activity (tick); CRM
  (tick); Calendar (tick).
- Node "Account brief": setup done? properties added? payments connected? last reply?
  next call?
- Node "Review-queue card": support requests join here, each one exactly once.
- Node "Person edits and sends". Pen circle, annotation "a person decides".
- Caption: The daily account brief. Seven sources gathered every morning, each part
  reporting its health, and a person edits what the customer receives.

### Fig. 2  One QA wave
Shape: node, node, record, node, resolved line.
- Node "Written plan": 19 cases: booking, lease signing, checkout, payment status,
  notifications.
- Node "Browser run": real clicks against the product; a screenshot per step.
- Record "Report": 14 passed (tick); 7 defects, each with repro steps (flagged); Verdict:
  ready with caveats.
- Node "Fix, retest, release judgment". Pen circle, annotation "a person decides".
- Resolved line: Rule added after an audit: no browser run, no pass.
- Caption: One QA wave, March 2026. Nineteen booking-flow cases in a real browser with
  screenshot evidence; seven defects documented, fixed and retested.

### Preview on Home and the index
Three nodes: "Seven sources, every morning" → "Account brief with the next action" →
"A person edits and sends" (pen circle, "a person decides").

## Psyche Digital: optional figure
The only story without a figure, which also leaves its index card bare.
Shape: record, fan out, stack, node.
- Record "Meeting recap": decisions; owners; due dates.
- Fan out to a stack: "Tasks updated with the agreed instructions"; "Client-specific
  materials prepared"; "The right people get the context".
- Node "Pass/fail check, then a person approves". Pen circle, annotation "a person decides".
- Caption: The follow-through workflow. What a recap still leaves to do, done from the
  team's existing documents and task system, and checked before anyone relies on it.

## What changes beyond the components
- `scripts/check-production.mjs`: figure and circle counts per page (MTRO two figures,
  manufacturing three, healthcare two, Psyche one if added).
- `docs/design-spec.md` 6 and 7.1: story figures may carry counts that describe the
  system or one run; outcome numbers stay banned. Record the new shapes per page.
- `docs/website-copy-2026-10.md`: the "System diagrams" blocks and captions.
