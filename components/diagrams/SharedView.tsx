import { Figure, Annotation } from '../Figure';
import { PenCircle } from '../marks/PenCircle';
import { PenTick } from '../marks/PenTick';

/** Fig. 5: a shared view of work that needs attention. */
export function SharedView() {
  return (
    <Figure
      n={5}
      caption="What's waiting, on whom, and what happens next. Illustrative."
      description="A table of three jobs with columns for the job, what it is waiting on, who is responsible, and what happens next. Quote 118 at Hillside waits on customer sign-off; Maria follows up Thursday. Job 2041, Unit 12, waits on a price decision from the owner, due Friday; that cell is circled and noted 'waiting on a decision'. Order 77, Lot 4, waits on nothing, shown with a check mark; Crew B starts Monday."
    >
      <table className="board">
        <thead>
          <tr>
            <th scope="col">Job</th>
            <th scope="col">Waiting on</th>
            <th scope="col">Who</th>
            <th scope="col">Next</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Job">Quote 118, Hillside</td>
            <td data-label="Waiting on">Customer sign-off</td>
            <td data-label="Who">Maria</td>
            <td data-label="Next">Follow up Thursday</td>
          </tr>
          <tr>
            <td data-label="Job">Job 2041, Unit 12</td>
            <td data-label="Waiting on" className="board__cell--marked">
              <span className="board__mark">
                Price decision
                <PenCircle padX={8} padY={3} />
              </span>
              <Annotation text="waiting on a decision" placement="below" />
            </td>
            <td data-label="Who">Owner</td>
            <td data-label="Next">Decide by Friday</td>
          </tr>
          <tr>
            <td data-label="Job">Order 77, Lot 4</td>
            <td data-label="Waiting on">
              <span className="board__tick">
                <PenTick />
                Nothing
              </span>
            </td>
            <td data-label="Who">Crew B</td>
            <td data-label="Next">Starts Monday</td>
          </tr>
        </tbody>
      </table>
    </Figure>
  );
}
