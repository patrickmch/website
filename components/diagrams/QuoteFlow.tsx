import { Figure, Flow, Node, Connector } from '../Figure';

/** An illustrative comparison with a simple, three-step improved flow. */
export function QuoteFlow() {
  return (
    <Figure
      n={1}
      showCaption={false}
      caption="An example of reducing the work involved in preparing a quote."
      description="Two flows compare preparing a quote before and after an improvement. Before: a request comes in, details are retyped, the owner decides the price, and the quote is written manually. After: job details are entered once, agreed pricing rules prepare the quote, and the team reviews and sends it. The pricing rules are circled with the note 'The team can prepare routine quotes without waiting for the owner.'"
    >
      <div className="quote-comparison__row">
        <p className="quote-comparison__label">Before</p>
        <Flow className="flow--even quote-comparison__before">
          <Node label="Request comes in" />
          <Connector />
          <Node label="Details retyped" />
          <Connector />
          <Node label="Owner decides the price" />
          <Connector />
          <Node label="Quote written manually" />
        </Flow>
      </div>
      <div className="quote-comparison__row">
        <p className="quote-comparison__label">After</p>
        <Flow className="flow--even quote-flow">
          <Node label="Job details entered once" />
          <Connector />
          <Node
            className="quote-flow__rules"
            label="Agreed pricing rules"
            where="prepare the quote"
            marked
            annotation="The team can prepare routine quotes without waiting for the owner."
          />
          <Connector />
          <Node label="Team reviews and sends" />
        </Flow>
      </div>
    </Figure>
  );
}
