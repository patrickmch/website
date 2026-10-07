import { Figure, Flow, Node, Connector, Record } from '../Figure';
import { useWideFigure } from '../../hooks/useWideFigure';

/* The MTRO PRO figures, drawn in the same hand as the Home figures and in plain words: the
   morning account brief and one round of testing, each with the real objects in it. Small
   print says which steps run on their own. The pen circles the step where a person decides.
   From 1024px up a figure shows its full drawing; below that, a simple three-step version.
   Words come from docs/website-copy-2026-10.md. */

const LEGEND = 'Small print says automatic when a step runs on its own. The pen circle is where a person decides.';

/** Figure 1: the morning account brief. */
export function MtroAccountBrief() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      legend={LEGEND}
      caption="The morning account brief. Seven sources are gathered automatically every morning, and each one reports whether it worked. A person reads the page, edits the message and sends it."
      description={wide
        ? "A list titled gathered every morning, marked automatic, shows seven sources with check marks: email, text messages (noted back up after an alert), the customer forum, team chat, what the customer did in the app, customer records and the calendar. An arrow leads to one page per customer, marked automatic: set up yet, properties added, payments connected, last reply, next call. Next, on the to-do list, marked automatic: help requests from the app land here too, each one once. Last, a person edits and sends, circled with the note 'a person decides'."
        : "Three steps. Seven sources, every morning, marked automatic. One page per customer with the next action, marked automatic. A person edits and sends, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Gathered every morning" tag="automatic" rows={[
            { key: 'Email', value: 'ok', state: 'tick' },
            { key: 'Text messages', value: 'back up after an alert', state: 'tick' },
            { key: 'Customer forum', value: 'ok', state: 'tick' },
            { key: 'Team chat', value: 'ok', state: 'tick' },
            { key: 'What they did in the app', value: 'ok', state: 'tick' },
            { key: 'Customer records', value: 'ok', state: 'tick' },
            { key: 'Calendar', value: 'ok', state: 'tick' },
          ]} />
          <Connector />
          <Node label="One page per customer" auto where="set up yet? properties added? payments connected? last reply? next call?" />
          <Connector />
          <Node label="On the to-do list" auto where="help requests from the app land here too, each one once" />
          <Connector />
          <Node label="A person edits and sends" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Seven sources, every morning" auto />
          <Connector />
          <Node label="One page per customer" auto where="with the next action" />
          <Connector />
          <Node label="A person edits and sends" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}

/** Figure 2: one round of testing. */
export function MtroQaWave() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="One round of testing, March 2026. Nineteen booking steps, tried by a computer in a real browser with a screenshot each time. Seven problems were written up with steps to see them, fixed, and tried again. After one round passed without the browser ever running, the rule became: no screenshots, no pass."
      description={wide
        ? "Four steps in a row. I write the plan: 19 things to try, covering booking, signing the lease, checkout, payment and notifications. A computer tries each one, marked automatic: real clicks in the product, with a screenshot at every step. The report, marked automatic, lists 14 worked, with screenshots and a check mark; 7 problems, each with steps to see it again, flagged to fix; and the overall result, ready with cautions. Fix, try again, decide is circled with the note 'a person decides': what ships is a person's call."
        : "Three steps. I write the plan: 19 things to try. A computer tries each one, marked automatic, with a screenshot at every step: 14 worked, 7 problems. Fix, try again, decide, circled with the note 'a person decides'."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="I write the plan" where="19 things to try: booking, signing the lease, checkout, payment, notifications" />
          <Connector />
          <Node label="A computer tries each one" auto where="real clicks in the product; a screenshot at every step" />
          <Connector />
          <Record title="The report" tag="automatic" rows={[
            { key: '14 worked', value: 'with screenshots', state: 'tick' },
            { key: '7 problems, each with steps to see it again', value: 'to fix', state: 'flag' },
            { key: 'Overall', value: 'ready, with cautions' },
          ]} />
          <Connector />
          <Node label="Fix, try again, decide" where="what ships is a person's call" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="I write the plan" where="19 things to try" />
          <Connector />
          <Node label="A computer tries each one" auto where="a screenshot at every step: 14 worked, 7 problems" />
          <Connector />
          <Node label="Fix, try again, decide" marked annotation="a person decides" annotationPlacement="below" />
        </Flow>
      )}
    </Figure>
  );
}
