import { Figure } from '../Figure';
import { PenCircle } from '../marks/PenCircle';

const groups = [
  {
    label: 'Discovery Sprint',
    steps: ['Walk through real examples with the people doing the work', 'Find where it is held up', 'Recommend what to change first'],
  },
  {
    label: 'Implementation, scoped separately',
    steps: ['Build and test it with the team'],
  },
];

/** Fig. 2: how the work gets looked at, then changed. The Sprint's boundary is drawn, not only captioned. */
export function SprintSteps() {
  let n = 0;
  return (
    <Figure
      n={2}
      caption="From understanding the problem to putting a change into use. A Discovery Sprint covers the first three steps."
      description="Four numbered steps in two groups. Under the label Discovery Sprint: walk through real examples with the people doing the work; find where it is held up (this step is circled); recommend what to change first. Under the label Implementation, scoped separately: build and test it with the team."
    >
      {groups.map((group) => (
        <div key={group.label} className="steps-group">
          <p className="steps-group__label">{group.label}</p>
          <ol className="steps" start={n + 1}>
            {group.steps.map((text) => {
              n += 1;
              const index = n;
              return (
                <li key={text} className="steps__item">
                  <span className="steps__n">
                    {index}
                    {index === 2 && <PenCircle />}
                  </span>
                  <span className="steps__text">{text}</span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </Figure>
  );
}
