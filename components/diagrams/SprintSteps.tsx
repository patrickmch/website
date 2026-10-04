import { Figure } from '../Figure';
import { PenCircle } from '../marks/PenCircle';

const steps = [
  'Walk through real examples with the people doing the work',
  'Find where it is held up',
  'Recommend what to change first',
  'Build and test it with the team',
];

/** Fig. 2: what a Discovery Sprint does with the work. */
export function SprintSteps() {
  return (
    <Figure
      n={2}
      caption="How the work gets looked at, then changed. A Discovery Sprint covers the first three steps."
      description="Four numbered steps joined by a line: walk through real examples with the people doing the work; find where it is held up (this step is circled); recommend what to change first; build and test it with the team. A Discovery Sprint covers the first three; building is scoped separately."
    >
      <ol className="steps">
        {steps.map((text, index) => (
          <li key={text} className="steps__item">
            <span className="steps__n">
              {index + 1}
              {index === 1 && <PenCircle />}
            </span>
            <span className="steps__text">{text}</span>
          </li>
        ))}
      </ol>
    </Figure>
  );
}
