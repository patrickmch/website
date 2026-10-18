import { Figure, Flow, Stack, Node, Connector, Fan } from '../Figure';

/** Fig. 4: a Discovery Sprint, start to finish. */
export function SprintTimeline({ n = 4 }: { n?: number } = {}) {
  return (
    <Figure
      n={n}
      caption="A Discovery Sprint turns an operational bottleneck into a concrete system map, prioritized recommendations, and a ready-to-build scope."
      description="Three steps in a row: agree on the question; trace real workflows with your team; architecture and build plan, which is circled. From the plan, three branches show what the Sprint delivers: workflow and system map, prioritized recommendations, and implementation scope and timeline."
    >
      <Flow>
        <Node label="Agree on the question" where="scope, fee, timing, people" />
        <Connector />
        <Node label="Trace real workflows with your team" where="a quote, a handoff, a report" />
        <Connector />
        <Node label="Architecture and build plan" where="reviewed together" marked />
        <Fan count={3} direction="out" mobileLabel="delivers" />
        <Stack className="stack--outcomes">
          <Node label="Workflow and system map" small />
          <Node label="Prioritized recommendations" small />
          <Node label="Implementation scope and timeline" small />
        </Stack>
      </Flow>
    </Figure>
  );
}
