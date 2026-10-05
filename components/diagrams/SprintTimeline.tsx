import { Figure, Flow, Stack, Node, Connector, Fan } from '../Figure';

/** Fig. 6: a Discovery Sprint, start to finish. */
export function SprintTimeline({ n = 4 }: { n?: number } = {}) {
  return (
    <Figure
      n={n}
      caption="The Sprint ends with the findings and our review of them. What happens next is your call."
      description="Three steps in a row: agree on the question; work through real examples with your team; findings and a recommendation, which is circled. From the findings, four branches lead to four choices: take it forward with your team, use another provider, ask me to scope the next stage, or stop here."
    >
      <Flow>
        <Node label="Agree on the question" where="scope, fee, timing, people" />
        <Connector />
        <Node label="Work through real examples with your team" where="a quote, a handoff, a report" />
        <Connector />
        <Node label="Findings and a recommendation" where="reviewed together" marked />
        <Fan count={4} direction="out" mobileLabel="then one of these" />
        <Stack className="stack--outcomes">
          <Node label="Take it forward with your team" small />
          <Node label="Use another provider" small />
          <Node label="Ask me to scope the next stage" small />
          <Node label="Stop here" small />
        </Stack>
      </Flow>
    </Figure>
  );
}
