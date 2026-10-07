import { Figure, Flow, Stack, Node, Connector, Fan, Record } from '../Figure';
import { PenTick } from '../marks/PenTick';
import { useWideFigure } from '../../hooks/useWideFigure';

/* Figures for the client stories, drawn with the same primitives as the Home and Working
   Together figures, in plain words. Each shows one real mechanism with an example in it.
   Small print says which steps run on their own. The pen circles the step where a person
   decides. From 1024px up a figure shows its full drawing; below that it shows a simple
   three-step version, because a full drawing restacked or shrunk does not communicate.
   Words come from docs/website-copy-2026-10.md. */

const LEGEND = 'Small print says automatic when a step runs on its own. The pen circle is where a person decides.';

/** Manufacturing, figure 1: one quote through the new software. */
export function ManufacturingQuote() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      legend={LEGEND}
      caption="One quote through the new software. Sales types in the request. The rules work out the price, save it as a new version and make the customer's PDF. A person checks it before it goes out. The software was tried on 99 old quotes and matched the spreadsheet every time."
      description={wide
        ? "A quote request lists four things typed in by sales: what it is, one of six product types; the size, length, width and depth; the material, type and thickness; and how many, 250, 500 or 1,000. An arrow leads to the pricing rules, marked automatic: 111 rules and 37 lookup tables, written down from the old spreadsheet. Arrows fan out to four results, marked automatic: a priced quote with materials, labor, outside parts and shipping; prices for all three quantities; the quote saved as version 3 next to version 2; and a PDF for the customer. The four results fan back in to a person checking the quote before it goes to the customer, which is circled with the note 'a person decides'."
        : "Three steps. A quote request, typed in by sales. Priced by the rules, marked automatic: 111 rules and 37 lookup tables. A person checks the quote, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Quote request" tag="typed in by sales" rows={[
            { key: 'What it is', value: 'one of six product types' },
            { key: 'Size', value: 'length, width, depth' },
            { key: 'Material', value: 'type and thickness' },
            { key: 'How many', value: '250, 500 or 1,000' },
          ]} />
          <Connector />
          <Node label="The pricing rules" auto where="111 rules and 37 lookup tables, written down from the old spreadsheet" />
          <Fan count={4} direction="out" mobileLabel="produces" />
          <Stack tag="automatic">
            <Node label="A priced quote" where="materials, labor, outside parts, shipping" small />
            <Node label="Prices for all three quantities" small />
            <Node label="Saved as version 3, next to version 2" small />
            <Node label="A PDF for the customer" small />
          </Stack>
          <Fan count={4} direction="in" mobileLabel="then" />
          <Node label="A person checks the quote" where="before it goes to the customer" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Quote request" where="typed in by sales" />
          <Connector />
          <Node label="Priced by the rules" auto where="111 rules and 37 lookup tables" />
          <Connector />
          <Node label="A person checks the quote" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 2: making a report number trustworthy. */
export function ManufacturingReporting() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="Making a report number trustworthy. I follow the number back to the orders behind it, fix what is wrong, and agree with the owner what the number should mean. The fixed reports now update on their own."
      description={wide
        ? "Four steps in a row. Follow the number back: on-time delivery this month, asking which orders and dates should count. A list titled What I found shows four problems, each marked fixed: order lines counted instead of orders; a half month counted as a whole month; the same customer counted twice because of capital letters; and a data feed that had stopped, marked restored. The owner and I agreed what counts, seven on-time rules written down, is circled with the note 'a person decides'. Reports you can check, marked automatic with a check mark: 29,820 formulas fixed, and the reports update on their own."
        : "Three steps. Follow the number back to the orders behind it. Four errors found and fixed: order lines counted as orders, a half month, duplicates, a stopped feed. The owner and I agreed what counts, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="Follow the number back" where="on-time delivery this month: which orders and dates should count?" />
          <Connector />
          <Record title="What I found" rows={[
            { key: 'Order lines counted instead of orders', value: 'fixed', state: 'tick' },
            { key: 'A half month counted as a whole month', value: 'fixed', state: 'tick' },
            { key: 'The same customer counted twice (capital letters)', value: 'fixed', state: 'tick' },
            { key: 'A data feed that had stopped', value: 'restored', state: 'tick' },
          ]} />
          <Connector />
          <Node label="The owner and I agreed what counts" where="seven on-time rules, written down" marked annotation="a person decides" annotationPlacement="below" />
          <Connector />
          <Node label="Reports you can check" auto where="29,820 formulas fixed; the reports update on their own" tick />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Follow the number back" where="to the orders behind it" />
          <Connector />
          <Node label="Four errors found and fixed" where="lines counted as orders, a half month, duplicates, a stopped feed" />
          <Connector />
          <Node label="The owner and I agreed what counts" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Manufacturing, figure 3: how a change gets into the software safely. */
export function ManufacturingDelivery() {
  const wide = useWideFigure();
  return (
    <Figure
      n={3}
      caption="How a change gets into the software safely. Nothing goes live until the automatic checks pass, a computer has tried it the way a user would, and a person has said yes. About 135 of these runs in the first four weeks, with 2,800 screenshots."
      description={wide
        ? "Three steps in a row, then three questions. AI writes the change, marked automatic, in a safe copy so nothing live is touched. The checks must pass, marked automatic: about 1,500 automatic tests run first. A computer tries it out, marked automatic: it clicks through the screens like a user and takes screenshots. Arrows fan out to three questions. Does it work, and is there proof, are marked automatic. Should it go live is circled with the note 'a person decides'. A line beneath, with a check mark, says a yes goes live on its own, with a check afterward and a way to undo it."
        : "Three steps. AI writes the change in a safe copy, marked automatic. The checks and a computer try-out must pass, marked automatic: about 1,500 tests, real clicks, screenshots. Should it go live, circled with the note 'a person decides'; a yes goes live with a way back."}
      className="story-figure"
    >
      {wide ? (
        <>
          <Flow>
            <Node label="AI writes the change" auto where="in a safe copy, so nothing live is touched" />
            <Connector />
            <Node label="The checks must pass" auto where="about 1,500 automatic tests run first" />
            <Connector />
            <Node label="A computer tries it out" auto where="clicks through the screens like a user, takes screenshots" />
            <Fan count={3} direction="out" mobileLabel="then three questions" />
            <Stack>
              <Node label="Does it work?" auto small />
              <Node label="Is there proof?" auto small />
              <Node label="Should it go live?" small marked annotation="a person decides" annotationPlacement="below" />
            </Stack>
          </Flow>
          <p className="resolved-line">
            <PenTick />
            A yes goes live on its own, with a check afterward and a way to undo it.
          </p>
        </>
      ) : (
        <Flow className="flow--even">
          <Node label="AI writes the change" auto where="in a safe copy" />
          <Connector />
          <Node label="Checks and a computer try-out must pass" auto where="about 1,500 tests, real clicks, screenshots" />
          <Connector />
          <Node label="Should it go live?" where="a yes goes live, with a way back" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Healthcare, figure 1: how the shared information is built and kept fresh. */
export function SharedContextBuild() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      legend={LEGEND}
      caption="How the shared information is built and kept fresh. Four systems are gathered every night into one place the client owns, matched up, checked and published. If a night fails, yesterday's copy keeps working and nobody notices."
      description={wide
        ? "Four systems stacked on the left: project boards, customer records, files and documents, and the website. Their arrows merge, labelled gathered every night, into gather and match up, marked automatic: records that belong together are joined, and a number alone is never enough. That step is circled with the note 'if records disagree, a person decides'. Next, checked before publishing, marked automatic: missing fields, which source wins, private details kept out. Last, updated every night, marked automatic with a check mark: the switch takes under a minute, and if a night fails yesterday's copy keeps working."
        : "Three steps. Four systems, gathered every night, marked automatic. Matched and checked, marked automatic and circled with the note 'if records disagree, a person decides'. Updated every night, marked automatic with a check mark: yesterday's copy keeps working if a run fails."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Stack>
            <Node label="Project boards" small />
            <Node label="Customer records" small />
            <Node label="Files and documents" small />
            <Node label="The website" small />
          </Stack>
          <Fan count={4} direction="in" mobileLabel="gathered every night" />
          <Node label="Gather and match up" auto where="records that belong together are joined; a number alone is never enough" marked annotation="if records disagree, a person decides" annotationPlacement="below" />
          <Connector />
          <Node label="Checked before publishing" auto where="missing fields, which source wins, private details kept out" />
          <Connector />
          <Node label="Updated every night" auto where="the switch takes under a minute; if a night fails, yesterday's copy keeps working" tick />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Four systems, gathered every night" auto />
          <Connector />
          <Node label="Matched and checked" auto marked annotation="if records disagree, a person decides" annotationPlacement="below" />
          <Connector />
          <Node label="Updated every night" auto where="yesterday's copy keeps working if a run fails" tick />
        </Flow>
      )}
    </Figure>
  );
}

/** Healthcare, figure 2: what a person sees. */
export function SharedContextAnswer() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="What a person sees. Every answer says where it came from. Anything the records disagree on is shown, not hidden. Each person can only see what their role allows, and the assistant can read the records but never change them."
      description={wide
        ? "Four steps in a row. A staff member asks, in the AI assistant they already use. A locked door, marked automatic: the assistant can read but never change the records, and each person sees only what their role allows. The answer for case 1234, marked automatic, lists three facts: status, confirmed from a board record dated 14 May, with a check mark; the supporting document, on file, with a check mark; and the contact preference, where two records disagree, flagged not settled. A person reviews and decides, circled with the note 'a person decides'."
        : "Three steps. A staff member asks, in the AI assistant they already use. An answer with its sources, marked automatic: read only, limited by role. A person reviews and decides, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="A staff member asks" where="in the AI assistant they already use" />
          <Connector />
          <Node label="A locked door" auto where="can read, never change; each person sees only what their role allows" />
          <Connector />
          <Record title="Answer, case 1234" tag="automatic" rows={[
            { key: 'Status', value: 'confirmed (board record, 14 May)', state: 'tick' },
            { key: 'Supporting document', value: 'on file', state: 'tick' },
            { key: 'Contact preference: two records disagree', value: 'not settled', state: 'flag' },
          ]} />
          <Connector />
          <Node label="A person reviews and decides" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="A staff member asks" where="in the AI assistant they already use" />
          <Connector />
          <Node label="An answer with its sources" auto where="read only, limited by role" />
          <Connector />
          <Node label="A person reviews and decides" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Psyche Digital, figure 1: after the meeting. */
export function PsycheFollowThrough() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      legend={LEGEND}
      caption="After the meeting. What a recap still leaves to do gets done from the team's own documents and task list, checked, and approved by a person."
      description={wide
        ? "A meeting recap lists decisions, three agreed; who owns each, named; and due dates, set. Arrows fan out, labelled carried into, to three results marked automatic: tasks updated with what was agreed, materials prepared for that client, and the right people get the context. The three fan back in to checked, then a person approves, where a quick check runs first; it is circled with the note 'a person decides'."
        : "Three steps. A meeting recap. Tasks, materials and context prepared, marked automatic. Checked, then a person approves, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Meeting recap" rows={[
            { key: 'Decisions', value: 'three agreed' },
            { key: 'Who owns each', value: 'named' },
            { key: 'Due dates', value: 'set' },
          ]} />
          <Fan count={3} direction="out" mobileLabel="carried into" />
          <Stack tag="automatic">
            <Node label="Tasks updated with what was agreed" small />
            <Node label="Materials prepared for that client" small />
            <Node label="The right people get the context" small />
          </Stack>
          <Fan count={3} direction="in" mobileLabel="then" />
          <Node label="Checked, then a person approves" where="a quick check runs first" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Meeting recap" where="decisions, owners, due dates" />
          <Connector />
          <Node label="Tasks, materials and context prepared" auto />
          <Connector />
          <Node label="Checked, then a person approves" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}
