import { Fragment } from 'react';
import { Figure, Flow, Node, Connector } from '../Figure';
import { mtroWork } from '../../content/mtroWork';

export function MtroOperations({ lane }: { lane: 0 | 1 }) {
  const data = mtroWork.lanes[lane];
  return <Figure n={lane + 1} caption={data.caption} description={data.description} className="work-diagram">
    <p className="work-diagram__label">{data.title}</p>
    <Flow className="work-flow">
      {data.nodes.map(([label, where], index) => <Fragment key={label}>
        {index > 0 && <Connector />}
        <Node label={label} where={where} className={index === 3 ? 'work-node--human' : ''} />
      </Fragment>)}
    </Flow>
  </Figure>;
}

export function MtroPreview({ n = 1 }: { n?: number }) {
  return <Figure n={n} caption="From account context to a reviewed next step." description="Account context supports follow-up preparation, then a person reviews the proposed next step." className="work-preview">
    <Flow><Node label="Customer context" /><Connector /><Node label="Prepared follow-up" /><Connector /><Node label="Human review" className="work-node--human" /></Flow>
  </Figure>;
}
