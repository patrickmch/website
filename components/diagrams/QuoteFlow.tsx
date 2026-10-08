import { Figure, Flow, Node, Connector } from '../Figure';

/** An illustrative before-and-after, with routine work and exceptions separated. */
export function QuoteFlow() {
  return (
    <Figure
      n={1}
      showCaption={false}
      className="quote-comparison"
      caption="An example of reducing the work involved in preparing a quote."
      description="Two flows compare preparing a quote before and after an improvement. Before: a request comes in, details are retyped, the owner decides the price, and the quote is written manually. After: job details are entered once, agreed pricing rules prepare the quote, and the team reviews and sends it. The pricing rules are circled with the note 'The team can prepare routine quotes without waiting for the owner.' An unusual job branches from the pricing rules to the owner, who reviews the exception."
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
        <div className="quote-comparison__after">
          <Node className="quote-comparison__input" label="Job details entered once" />
          <Connector className="quote-comparison__to-rules" />
          <Node
            className="quote-comparison__rules"
            label="Agreed pricing rules"
            where="prepare the quote"
            marked
            annotation="The team can prepare routine quotes without waiting for the owner."
          />
          <div className="quote-comparison__exception">
            <div className="quote-comparison__branch">
              <Connector />
              <span>Unusual job</span>
            </div>
            <Node label="Owner reviews" where="the exception" small />
          </div>
          <Connector className="quote-comparison__to-review" />
          <Node className="quote-comparison__review" label="Team reviews and sends" />
        </div>
      </div>
    </Figure>
  );
}
