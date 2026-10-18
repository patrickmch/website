import { Figure, Flow, Stack, Node, Connector, Fan, Record } from '../Figure';
import { useWideFigure } from '../../hooks/useWideFigure';

/** Manufacturing, figure 1: one quote through the custom application. */
export function ManufacturingQuote() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      caption="One quote through the custom application. Sales enters the product type, dimensions, materials, and three target quantities. The pricing engine applies 111 rules and 37 lookup tables to calculate materials, labor, outside components, and shipping across all three quantities at once, saves the new revision alongside prior versions, and generates a customer-ready PDF."
      description={wide
        ? "A quote request entered by sales lists product type, dimensions, materials, and quantities (250, 500, and 1,000 units). An arrow leads to the pricing engine, marked automatic and circled with the note '10,000 formulas distilled into 111 rules': 111 pricing rules and 37 lookup tables extracted from the workbook. Arrows fan out to four automatic outputs: materials, labor, outside parts, and shipping; priced across all three quantities; saved as revision 3 alongside revision 2; and a customer-ready PDF quote. The four outputs fan back in to sales review and send, with exceptions routed to leadership."
        : "Three steps. Quote specs entered: product, dimensions, materials, quantities. Pricing engine, marked automatic and circled with the note '10,000 formulas distilled into 111 rules': 111 rules and 37 lookup tables. Sales review and PDF."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Quote request" tag="entered by sales" rows={[
            { key: 'Product type', value: 'one of six product families' },
            { key: 'Dimensions', value: 'length, width, depth' },
            { key: 'Materials', value: 'grade and thickness' },
            { key: 'Quantities', value: '250, 500, and 1,000 units' },
          ]} />
          <Connector />
          <Node label="Pricing engine" auto where="111 pricing rules and 37 lookup tables extracted from the workbook" marked annotation="10,000 formulas distilled into 111 rules" annotationPlacement="below" />
          <Fan count={4} direction="out" mobileLabel="produces" />
          <Stack tag="automatic">
            <Node label="Materials, labor, outside parts, shipping" small />
            <Node label="Priced across all three quantities" small />
            <Node label="Saved as revision 3 alongside revision 2" small />
            <Node label="Customer-ready PDF quote" small />
          </Stack>
          <Fan count={4} direction="in" mobileLabel="then" />
          <Node label="Sales review and send" where="exceptions routed to leadership" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Quote specs entered" where="product, dimensions, materials, quantities" />
          <Connector />
          <Node label="Pricing engine" auto where="111 rules and 37 lookup tables" marked annotation="10,000 formulas distilled into 111 rules" annotationPlacement="below" />
          <Connector />
          <Node label="Sales review and PDF" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 2: rebuilding management reporting from raw ERP transactions. */
export function ManufacturingReporting() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="Rebuilding management reporting from raw ERP transactions. Tracing monthly on-time delivery back to source orders exposed four systemic errors across nearly 30,000 spreadsheet formulas. After establishing seven explicit business rules with the owner and restoring the stalled data feed, the reporting pipeline updates automatically in the cloud data warehouse."
      description={wide
        ? "Four steps in a row. Trace metric to raw ERP orders: monthly on-time delivery audited against source transactions. A record titled Four systemic errors uncovered lists order lines counted as full orders (fixed), partial month compared to full month (fixed), customer records split by capitalization (fixed), and automated data feed silently stalled (restored). Next, seven business rules codified: agreed with the owner and built into the pipeline. Last, verified warehouse reporting, marked automatic and circled with the note 'four errors resolved across 29,820 formulas': maintained in-house by internal specialist."
        : "Three steps. Trace metric to raw ERP orders. Four systemic errors resolved: lines as orders, partial month, split records, stalled feed, circled with the note 'four errors resolved across 29,820 formulas'. Seven rules in cloud warehouse."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Trace metric to raw ERP orders" where="monthly on-time delivery audited against source transactions" />
          <Connector />
          <Record title="Four systemic errors uncovered" rows={[
            { key: 'Order lines counted as full orders', value: 'fixed', state: 'tick' },
            { key: 'Partial month compared to full month', value: 'fixed', state: 'tick' },
            { key: 'Customer records split by capitalization', value: 'fixed', state: 'tick' },
            { key: 'Automated data feed silently stalled', value: 'restored', state: 'tick' },
          ]} />
          <Connector />
          <Node label="Seven business rules codified" where="agreed with the owner and built into the pipeline" />
          <Connector />
          <Node label="Verified warehouse reporting" auto where="maintained in-house by internal specialist" marked annotation="four errors resolved across 29,820 formulas" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Trace metric to raw ERP orders" where="audited against source transactions" />
          <Connector />
          <Node label="Four systemic errors resolved" where="lines as orders, partial month, split records, stalled feed" marked annotation="four errors resolved across 29,820 formulas" annotationPlacement="below" />
          <Connector />
          <Node label="Seven rules in cloud warehouse" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 3: sales-to-engineering handoff across five operational queues. */
export function ManufacturingDelivery() {
  const wide = useWideFigure();
  return (
    <Figure
      n={3}
      caption="From sales intake to engineering handoff across five operational queues. Complete job specifications are captured up front, connected to customer and item records, and routed to the right queue so engineering and sample production receive actionable work."
      description={wide
        ? "Complete job intake in CRM and quoting captures specs, customer records, and item records up front. An arrow leads to routed into five queues, marked automatic and circled with the note 'five operational queues in one shared system'. Arrows fan out to five queues marked automatic: sales requests, house accounts, engineering, drawings, and samples. The five queues fan back in to design and production, where engineering receives complete specs with a clear stage owner."
        : "Three steps. Complete job intake, with specs captured up front. Routed into five queues, marked automatic and circled with the note 'five operational queues in one shared system': sales, house accounts, engineering, drawings, and samples. Design and production receives complete specs."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Complete job intake" where="specs, customer and item records captured up front" />
          <Connector />
          <Node label="Routed into five queues" auto where="by job type, account, and required engineering work" marked annotation="five operational queues in one shared system" annotationPlacement="below" />
          <Fan count={5} direction="out" mobileLabel="routed into" />
          <Stack tag="automatic">
            <Node label="Sales requests" small />
            <Node label="House accounts" small />
            <Node label="Engineering" small />
            <Node label="Drawings" small />
            <Node label="Samples" small />
          </Stack>
          <Fan count={5} direction="in" mobileLabel="then" />
          <Node label="Design and production" where="complete specs up front, clear owner at each step" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Complete job intake" where="specs captured up front" />
          <Connector />
          <Node label="Routed into five queues" auto where="sales, house accounts, engineering, drawings, samples" marked annotation="five operational queues in one shared system" annotationPlacement="below" />
          <Connector />
          <Node label="Design and production" where="clear owner at each step" />
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
