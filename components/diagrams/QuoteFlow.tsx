import { Figure, Flow, Node, Connector } from '../Figure';

/** Fig. 1: a quote, as it moves through a business. */
export function QuoteFlow() {
  return (
    <Figure
      n={1}
      caption="A quote, as it moves through a business. In this example, the work waits for a pricing decision."
      description="Five steps in a row. A request comes in by email. Job details are gathered and re-typed into a spreadsheet. A price decision, which waits for the owner; in this example that step is circled with the note 'the quote waits for the owner's price'. The quote is written in a Word template. The quote is sent by email, then followed up."
    >
      <Flow annotated className="flow--even">
        <Node label="Request comes in" where="email" />
        <Connector />
        <Node label="Job details gathered" where="re-typed into a spreadsheet" />
        <Connector />
        <Node label="Price decision" where="waits for the owner" marked annotation="the quote waits for the owner's price" />
        <Connector />
        <Node label="Quote written" where="Word template" />
        <Connector />
        <Node label="Quote sent" where="email, then follow-up" />
      </Flow>
    </Figure>
  );
}
