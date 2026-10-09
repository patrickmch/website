import { Figure, Flow, Node, Connector } from '../Figure';

/** The compact business-to-growth idea from the LinkedIn banner. */
export function GrowthConcept() {
  return (
    <Figure
      n={1}
      showCaption={false}
      className="hero-concept"
      caption="Your business, systems that fit, room to grow."
      description="Three connected boxes run from Your business to Systems that fit to Room to grow. Systems that fit is circled in orange. No visible caption or additional note."
    >
      <Flow>
        <Node label="Your business" />
        <Connector />
        <Node label="Systems that fit" marked />
        <Connector />
        <Node label="Room to grow" />
      </Flow>
    </Figure>
  );
}
