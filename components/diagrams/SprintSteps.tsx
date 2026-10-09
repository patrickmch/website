import { Figure, Flow, Node, Connector } from '../Figure';

/** Client outcomes from discovery through separately scoped implementation. */
export function SprintSteps() {
  return (
    <Figure
      n={2}
      showCaption={false}
      className="sprint-outcomes"
      caption="From a clear view of the problem to improvements in use by your team."
      description="Three connected boxes in two groups. Discovery Sprint covers a clear view of what's slowing the work down, followed by a plan for what to change first. An arrow leads to Implementation, scoped separately: improvements tested and in use by your team. This final outcome is circled. There is no additional annotation or visible caption."
    >
      <div className="sprint-outcomes__group">
        <p className="sprint-outcomes__label">Discovery Sprint</p>
        <Flow className="sprint-outcomes__flow">
          <Node label="A clear view of what's slowing the work down" />
          <Connector />
          <Node label="A plan for what to change first" />
        </Flow>
      </div>
      <div className="sprint-outcomes__group">
        <div className="sprint-outcomes__transition">
          <div className="connector" aria-hidden="true">
            <svg className="connector__v" viewBox="0 0 16 80" focusable="false">
              <path d="M8 0 V76" />
              <path d="M2 70 L8 77 L14 70" />
            </svg>
          </div>
          <p className="sprint-outcomes__label">Implementation, scoped separately</p>
        </div>
        <Node label="Improvements tested and in use by your team" marked />
      </div>
    </Figure>
  );
}
