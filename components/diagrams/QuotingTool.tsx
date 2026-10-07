import { Figure, Flow, Stack, Node, Fan } from '../Figure';

/** Fig. 3: a quoting tool that follows your rules. */
export function QuotingTool({ n = 1 }: { n?: number } = {}) {
  return (
    <Figure
      n={n}
      caption="Routine quotes get drafted. The ones that need judgment get flagged for a person."
      description="Two inputs, job details and pricing rules, feed a draft quote. The draft goes one of two ways: ready for review, shown with a check mark, or needs a judgment call, which is circled with the note 'an unusual job, so a person prices it'."
    >
      <Flow>
        <Stack>
          <Node label="Job details" />
          <Node label="Pricing rules" />
        </Stack>
        <Fan count={2} direction="in" mobileLabel="both go in" />
        <Node label="Draft quote" where="prepared for review" />
        <Fan count={2} direction="out" mobileLabel="one of these" />
        <Stack>
          <Node label="Ready for review" tick />
          <Node label="Needs a judgment call" marked annotation="an unusual job, so a person prices it" annotationPlacement="below" />
        </Stack>
      </Flow>
    </Figure>
  );
}
