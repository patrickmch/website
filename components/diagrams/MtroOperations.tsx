import { Fragment } from 'react';
import { Figure, Flow, Node, Connector } from '../Figure';
import { mtroWork } from '../../content/mtroWork';

/**
 * The two MTRO PRO figures: one lane each, drawn in the same hand as the Home
 * figures. The pen circles the step where a person decides.
 */
export function MtroOperations({ lane }: { lane: 0 | 1 }) {
  const data = mtroWork.lanes[lane];
  const last = data.nodes.length - 1;
  return (
    <Figure n={lane + 1} caption={`${data.title}. ${data.caption}`} description={data.description} className="story-figure">
      <Flow className="flow--even">
        {data.nodes.map(([label, where], index) => (
          <Fragment key={label}>
            {index > 0 && <Connector />}
            <Node label={label} where={where} marked={index === last} annotation={index === last ? 'a person decides' : undefined} annotationPlacement="below" />
          </Fragment>
        ))}
      </Flow>
    </Figure>
  );
}

/** The three-node preview of the MTRO PRO work on Home and the Client Work index. */
export function MtroPreview({ n = 1 }: { n?: number }) {
  return (
    <Figure
      n={n}
      caption="From account context to a reviewed next step."
      description="Account context supports follow-up preparation, then a person reviews the proposed next step; that step is circled."
      className="work-preview"
    >
      <Flow className="flow--even">
        <Node label="Customer context" />
        <Connector />
        <Node label="Prepared follow-up" />
        <Connector />
        <Node label="Human review" marked annotation="a person decides" annotationPlacement="below" />
      </Flow>
    </Figure>
  );
}
