import { Figure, Flow, Stack, Node, Connector, Fan, Record } from '../Figure';
import { useWideFigure } from '../../hooks/useWideFigure';

/** Manufacturing, figure 1: one quote through the custom application. */
export function ManufacturingQuote() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      caption="One quote through the custom application. The user enters the product type, dimensions, materials, and target quantities. The pricing engine applies the company's pricing rules and lookup tables to calculate materials, labor, outside components, and shipping across quantity options at once, saves the new revision alongside prior versions, and generates a customer-ready PDF."
      description={wide
        ? "A quote request entered by sales lists product type, dimensions, materials, and target quantities. An arrow leads to the pricing engine, marked automatic and circled with the note 'workbook logic translated into shared rules': pricing rules and material lookup tables from the workbook. Arrows fan out to four automatic outputs: materials, labor, outside parts, and shipping; priced across quantity options at once; saved alongside prior quote revisions; and a customer-ready PDF quote. The four outputs fan back in to sales review and send, with exceptions routed to leadership."
        : "Three steps. Quote specs entered: product, dimensions, materials, quantities. Pricing engine, marked automatic and circled with the note 'workbook logic translated into shared rules': pricing rules and lookup tables. Sales review and PDF."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Quote request" tag="entered by sales" rows={[
            { key: 'Product type', value: 'supported product family' },
            { key: 'Dimensions', value: 'length, width, depth' },
            { key: 'Materials', value: 'grade and thickness' },
            { key: 'Quantities', value: 'multiple quantity breaks' },
          ]} />
          <Connector />
          <Node label="Pricing engine" auto where="pricing rules and material lookup tables from the workbook" marked annotation="workbook logic translated into shared rules" annotationPlacement="below" />
          <Fan count={4} direction="out" mobileLabel="produces" />
          <Stack tag="automatic">
            <Node label="Materials, labor, outside parts, shipping" small />
            <Node label="Priced across quantity options at once" small />
            <Node label="Saved alongside prior quote revisions" small />
            <Node label="Customer-ready PDF quote" small />
          </Stack>
          <Fan count={4} direction="in" mobileLabel="then" />
          <Node label="Sales review and send" where="exceptions routed to leadership" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Quote specs entered" where="product, dimensions, materials, quantities" />
          <Connector />
          <Node label="Pricing engine" auto where="pricing rules and lookup tables" marked annotation="workbook logic translated into shared rules" annotationPlacement="below" />
          <Connector />
          <Node label="Sales review and PDF" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 2: tying management reporting to raw ERP transactions. */
export function ManufacturingReporting() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="Tying management reporting to raw ERP transactions. Tracing delivery and revenue figures back to source orders resolved discrepancies in how order lines, date ranges, customer names, and data feeds were handled. With explicit business definitions built into the cloud data warehouse, leadership can inspect any metric down to the underlying records."
      description={wide
        ? "Four steps in a row. Trace metrics to raw ERP orders: management reports checked against source transactions. A record titled Source discrepancies resolved lists order-level vs. line-level grouping (aligned), comparable date-range windows (standardized), customer name variations (normalized), and automated ERP data sync (restored). Next, explicit business rules codified: agreed with the owner and built into the pipeline. Last, verified warehouse reporting, marked automatic and circled with the note 'every figure traces to source ERP records': maintained in-house with customer-level drilldown."
        : "Three steps. Trace metrics to raw ERP orders. Source discrepancies resolved: order grouping, date windows, customer records, sync, circled with the note 'every figure traces to source ERP records'. Business rules in cloud warehouse."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Trace metrics to raw ERP orders" where="management reports checked against source transactions" />
          <Connector />
          <Record title="Source discrepancies resolved" rows={[
            { key: 'Order-level vs. line-level grouping', value: 'aligned', state: 'tick' },
            { key: 'Comparable date-range windows', value: 'standardized', state: 'tick' },
            { key: 'Customer name variations', value: 'normalized', state: 'tick' },
            { key: 'Automated ERP data sync', value: 'restored', state: 'tick' },
          ]} />
          <Connector />
          <Node label="Explicit business rules codified" where="agreed with the owner and built into the pipeline" />
          <Connector />
          <Node label="Verified warehouse reporting" auto where="maintained in-house with customer-level drilldown" marked annotation="every figure traces to source ERP records" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Trace metrics to raw ERP orders" where="checked against source transactions" />
          <Connector />
          <Node label="Source discrepancies resolved" where="order grouping, date windows, customer records, sync" marked annotation="every figure traces to source ERP records" annotationPlacement="below" />
          <Connector />
          <Node label="Business rules in cloud warehouse" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 3: from job intake to engineering and estimating handoffs. */
export function ManufacturingDelivery() {
  const wide = useWideFigure();
  return (
    <Figure
      n={3}
      caption="From job intake to engineering and estimating handoffs. Incoming requests capture specifications, customer context, and files up front, then route into dedicated operational queues so design, sample production, and estimating receive actionable work."
      description={wide
        ? "Structured job intake captures specs, customer context, and files up front. An arrow leads to routed to the right queue, marked automatic and circled with the note 'dedicated queues in one shared workflow'. Arrows fan out to five queues marked automatic: sales requests, house accounts, engineering, drawings, and samples. The queues fan back in to design, samples, and estimating, where the team receives a complete brief with a clear stage owner."
        : "Three steps. Structured job intake, with specs and files captured up front. Routed to the right queue, marked automatic and circled with the note 'dedicated queues in one shared workflow': sales, house accounts, engineering, drawings, and samples. Design, samples, and estimating receives a complete brief."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Structured job intake" where="specs, customer context, and files captured up front" />
          <Connector />
          <Node label="Routed to the right queue" auto where="by job type, account, and required engineering work" marked annotation="dedicated queues in one shared workflow" annotationPlacement="below" />
          <Fan count={5} direction="out" mobileLabel="routed into" />
          <Stack tag="automatic">
            <Node label="Sales requests" small />
            <Node label="House accounts" small />
            <Node label="Engineering" small />
            <Node label="Drawings" small />
            <Node label="Samples" small />
          </Stack>
          <Fan count={5} direction="in" mobileLabel="then" />
          <Node label="Design, samples, and estimating" where="complete brief up front, clear owner at each step" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Structured job intake" where="specs and files captured up front" />
          <Connector />
          <Node label="Routed to the right queue" auto where="sales, house accounts, engineering, drawings, samples" marked annotation="dedicated queues in one shared workflow" annotationPlacement="below" />
          <Connector />
          <Node label="Design, samples, and estimating" where="clear owner at each step" />
        </Flow>
      )}
    </Figure>
  );
}

/** Healthcare, figure 1: how the cloud data and orchestration engine stays current. */
export function SharedContextBuild() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      caption="How the cloud data and orchestration engine stays current. Every night, records from six project boards, the CRM, thousands of PDFs in cloud storage, and the live website are unified in the company's cloud account, matched across systems, and validated before publication. If an upstream feed fails, the engine keeps the prior verified snapshot live."
      description={wide
        ? "Four systems stacked on the left: six project boards, CRM records, cloud PDF storage, and the live website. Their arrows merge, labelled ingested nightly, into cross-system identity resolution, marked automatic: links related records and flags source conflicts. Next, pre-publish validation, marked automatic: verifies completeness, source priority, and role permissions. Last, nightly production snapshot, marked automatic and circled with the note 'automated rollback keeps prior verified snapshot live': atomic switch in under a minute."
        : "Three steps. Four systems ingested nightly, marked automatic. Identity resolution and validation, marked automatic: links records and flags source conflicts. Nightly production snapshot, marked automatic and circled with the note 'automated rollback keeps prior verified snapshot live'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Stack>
            <Node label="Six project boards" small />
            <Node label="CRM records" small />
            <Node label="Cloud PDF storage" small />
            <Node label="Live website" small />
          </Stack>
          <Fan count={4} direction="in" mobileLabel="ingested nightly" />
          <Node label="Cross-system identity resolution" auto where="links related records and flags source conflicts" />
          <Connector />
          <Node label="Pre-publish validation" auto where="verifies completeness, source priority, and role permissions" />
          <Connector />
          <Node label="Nightly production snapshot" auto where="atomic switch in under a minute" marked annotation="automated rollback keeps prior verified snapshot live" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Four systems ingested nightly" auto />
          <Connector />
          <Node label="Identity resolution and validation" auto where="links records and flags source conflicts" />
          <Connector />
          <Node label="Nightly production snapshot" auto marked annotation="automated rollback keeps prior verified snapshot live" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Healthcare, figure 2: source-cited answers inside the team's AI assistant. */
export function SharedContextAnswer() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="Source-cited answers inside the team's AI assistant. Every response links directly to the underlying CRM, board, or document record and enforces role-based access through 34+ governed tools. When two systems disagree on a fact, the engine flags both sources side by side so staff can resolve the discrepancy directly."
      description={wide
        ? "Four steps in a row. Coordinator or workflow query: inside the team's AI assistant or morning run. 34+ governed tools, marked automatic: read-only access scoped to the requester's role. Source-cited response for Case 1234, marked automatic, lists three facts: case status, confirmed from project board dated May 14; supporting PDF, verified on file; and contact preference where CRM and board disagree, flagged with both citations and circled with the note 'flags conflicting records side by side'. Coordinator resolves directly: checks cited sources and updates the record."
        : "Three steps. Coordinator or workflow query, inside the team's AI assistant. Source-cited response, marked automatic and circled with the note 'flags conflicting records side by side': read-only via 34+ role-scoped tools. Coordinator resolves directly."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Coordinator or workflow query" where="inside the team's AI assistant or morning run" />
          <Connector />
          <Node label="34+ governed tools" auto where="read-only access scoped to the requester's role" />
          <Connector />
          <Record title="Source-cited response, Case 1234" tag="automatic" rows={[
            { key: 'Case status', value: 'confirmed (project board, May 14)', state: 'tick' },
            { key: 'Supporting PDF', value: 'verified on file', state: 'tick' },
            { key: 'Contact preference: CRM and board disagree', value: 'flagged with both citations', state: 'flag', marked: true, annotation: 'flags conflicting records side by side' },
          ]} />
          <Connector />
          <Node label="Coordinator resolves directly" where="checks cited sources and updates the record" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Coordinator or workflow query" where="inside the team's AI assistant" />
          <Connector />
          <Node label="Source-cited response" auto where="read-only via 34+ role-scoped tools" marked annotation="flags conflicting records side by side" annotationPlacement="below" />
          <Connector />
          <Node label="Coordinator resolves directly" />
        </Flow>
      )}
    </Figure>
  );
}

/** Psyche Digital, figure 1: from meeting recap to assigned client work. */
export function PsycheFollowThrough() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      caption="From meeting recap to assigned client work. Decisions from the call automatically draft task updates, client materials, and assignee context, then run through a pass/fail check before account manager approval."
      description={wide
        ? "A meeting recap lists decisions, three agreed; task owners, assigned; and due dates, set. Arrows fan out, labelled carried into, to three automatic outputs: task tracker updated with scope, client deliverable brief drafted, and source context attached for assignee. The three fan back in to pass/fail check and approval, verified against workflow rules before release and circled with the note 'five AI skills, each with a pass/fail check'."
        : "Three steps. Meeting recap: decisions, owners, due dates. Tasks, briefs, and context drafted, marked automatic. Pass/fail check and approval, circled with the note 'five AI skills, each with a pass/fail check'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Meeting recap" rows={[
            { key: 'Decisions', value: 'three agreed' },
            { key: 'Task owners', value: 'assigned' },
            { key: 'Due dates', value: 'set' },
          ]} />
          <Fan count={3} direction="out" mobileLabel="carried into" />
          <Stack tag="automatic">
            <Node label="Task tracker updated with scope" small />
            <Node label="Client deliverable brief drafted" small />
            <Node label="Source context attached for assignee" small />
          </Stack>
          <Fan count={3} direction="in" mobileLabel="then" />
          <Node label="Pass/fail check and approval" where="verified against workflow rules before release" marked annotation="five AI skills, each with a pass/fail check" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Meeting recap" where="decisions, owners, due dates" />
          <Connector />
          <Node label="Tasks, briefs, and context drafted" auto />
          <Connector />
          <Node label="Pass/fail check and approval" marked annotation="five AI skills, each with a pass/fail check" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}
