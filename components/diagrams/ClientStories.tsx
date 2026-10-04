import { Figure, Flow, Node, Connector } from '../Figure';

/* Figures for the client stories, drawn with the same primitives as the Home figures.
   Words come from the Client Work sections of docs/website-copy-2026-10.md. */

/** Manufacturing, figure 1: from business rules to tested software. */
export function ManufacturingDelivery() {
  return (
    <Figure
      n={1}
      caption="Business judgment defines the work. Separate implementation and verification steps turn that judgment into software, with defects routed back for correction."
      description="Four steps in a row. Business judgment supplies rules, real examples, priorities and acceptance. Implementation is a bounded specification, an AI-assisted build and repeatable code checks. Independent verification is browser-based QA, evidence and code review, with failures kept visible and corrections routed back to the build. Release and operator review, circled as the step where a person decides, covers the tested change, the authorized release and feedback from use, which informs the next requirement."
      className="story-figure"
    >
      <Flow className="flow--even">
        <Node label="Business judgment" where="rules + real examples, priorities + acceptance" />
        <Connector />
        <Node label="Implementation" where="bounded specification, AI-assisted build, code checks" />
        <Connector />
        <Node label="Independent verification" where="browser QA, evidence + code review; failures go back to the build" />
        <Connector />
        <Node label="Release + operator review" where="authorized release, feedback from use" marked annotation="a person decides" annotationPlacement="below" />
      </Flow>
    </Figure>
  );
}

/** Manufacturing, figure 2: reporting that connects the numbers to what happened. */
export function ManufacturingReporting() {
  return (
    <Figure
      n={2}
      caption="Reporting: connect the numbers to what happened. Figures are traced to source transactions, definitions are agreed, and known gaps are made explicit."
      description="Three steps in a row. Source transactions: trace the report population and check omissions and timing. Definitions and corrections: agree what is being measured, repair and reconcile the logic. Management information, shown with a check mark: figures traceable to source, known gaps made explicit."
      className="story-figure"
    >
      <Flow className="flow--even">
        <Node label="Source transactions" where="trace the report population; check omissions + timing" />
        <Connector />
        <Node label="Definitions + corrections" where="agree what is being measured; repair and reconcile logic" />
        <Connector />
        <Node label="Management information" where="figures traceable to source; known gaps made explicit" tick />
      </Flow>
    </Figure>
  );
}

/** Healthcare, figure 1: shared context, useful work. */
export function SharedContext() {
  return (
    <Figure
      n={1}
      caption="Existing tools feed a shared context store. Staff reach it through their AI workspace. Reusable workflows also retrieve current source documents when the task requires them."
      description="Four steps in a row. Collection and validation collects source records from the existing business tools (operational records, customer records, documents), matches related information and prepares queryable views. Shared context keeps related records, source references and unresolved facts. The staff AI workspace, reached through a controlled connection with access-scoped queries, is where someone asks a question or starts a workflow: assemble a profile, prepare recurring documents, check supporting evidence. Human review and decision, circled as the step where a person decides, checks the output and its sources, resolves exceptions and approves the next action."
      className="story-figure"
    >
      <Flow className="flow--even">
        <Node label="Collection + validation" where="from existing tools: operational records, customer records, documents" />
        <Connector />
        <Node label="Shared context" where="related records matched; source references kept; unresolved facts retained" />
        <Connector />
        <Node label="Staff + AI workspace" where="ask a question or start a workflow, through a controlled connection" />
        <Connector />
        <Node label="Human review + decision" where="check the output and its sources; approve the next action" marked annotation="a person decides" annotationPlacement="below" />
      </Flow>
    </Figure>
  );
}
