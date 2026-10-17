import { Figure, Flow, Node, Connector } from '../Figure';

/** The compact business-to-growth idea from the LinkedIn banner. */
export function GrowthConcept() {
  return (
    <Figure
      n={1}
      showCaption={false}
      className="hero-concept"
      caption="Your current systems, software + AI, room to grow."
      description="Three connected boxes run from Your current systems to Software + AI to Room to grow. Software + AI is circled in orange. No visible caption or additional note."
    >
      <Flow>
        <Node label="Your current systems" />
        <Connector />
        <Node label="Software + AI" marked />
        <Connector />
        <Node label="Room to grow" />
      </Flow>
    </Figure>
  );
}
