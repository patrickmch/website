import { Figure, Flow, Node, Connector } from '../Figure';

/** Fig. 1: a customer request waiting on an owner's decision. */
export function QuoteFlow() {
  return (
    <Figure
      n={1}
      caption="A customer request moving through the business. In this example, the team has the information but needs the owner's decision before work can continue."
      description="Five steps in a row. A customer request comes in. Information is gathered from several systems. A decision is needed from the owner, circled with the note 'the team waits for a decision'. Once the decision is made, the team continues the work and updates the customer on what happens next."
    >
      <Flow annotated className="flow--even">
        <Node label="Request comes in" where="from a customer" />
        <Connector />
        <Node label="Information gathered" where="from several systems" />
        <Connector />
        <Node label="Decision needed" where="waits for the owner" marked annotation="the team waits for a decision" />
        <Connector />
        <Node label="Work continues" where="with the team" />
        <Connector />
        <Node label="Customer updated" where="on what happens next" />
      </Flow>
    </Figure>
  );
}
