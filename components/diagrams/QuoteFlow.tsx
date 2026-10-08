import { Figure, Flow, Node, Connector } from '../Figure';

/** An illustrative improvement to preparing routine quotes. */
export function QuoteFlow() {
  return (
    <Figure
      n={1}
      showCaption={false}
      caption="An example of reducing the work involved in preparing a quote."
      description="Three steps show an improved quoting process. Job details are entered once, agreed pricing rules prepare the quote, and the team reviews and sends it. The pricing rules are circled with the note 'The team can prepare routine quotes without waiting for the owner.'"
    >
      <Flow annotated className="flow--even quote-flow">
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
    </Figure>
  );
}
