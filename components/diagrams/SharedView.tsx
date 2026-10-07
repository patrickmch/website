import { Figure, Annotation } from '../Figure';
import { PenCircle } from '../marks/PenCircle';
import { PenTick } from '../marks/PenTick';

/** Fig. 5: a shared view of work that needs attention. */
export function SharedView({ n = 3 }: { n?: number } = {}) {
  return (
    <Figure
      n={n}
      caption="What's waiting, on whom, and what happens next."
      description="An example job board: a table of three jobs with columns for the job, what it is waiting on, who is responsible, and what happens next. Quote 118 at Hillside waits on customer sign-off; Maria follows up Thursday. Job 2041, Unit 12, waits on a price decision from the owner, due Friday; that cell is circled and noted 'waiting on the owner's price'. Order 77, Lot 4, waits on nothing, shown with a check mark; Crew B starts Monday."
    >
      <div className="board-wrap">
      <table className="board" role="table">
        <caption className="board__caption">Example job board</caption>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader">Job</th>
            <th scope="col" role="columnheader">Waiting on</th>
            <th scope="col" role="columnheader">Who</th>
            <th scope="col" role="columnheader">Next</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr role="row">
            <td role="cell" data-label="Job">Quote 118, Hillside</td>
            <td role="cell" data-label="Waiting on">Customer sign-off</td>
            <td role="cell" data-label="Who">Maria</td>
            <td role="cell" data-label="Next">Follow up Thursday</td>
          </tr>
          <tr role="row">
            <td role="cell" data-label="Job">Job 2041, Unit 12</td>
            <td role="cell" data-label="Waiting on" className="board__cell--marked">
              <span className="board__cell-content">
                <span className="board__mark">
                  Price decision
                  <PenCircle padX={8} padY={3} />
                </span>
                <Annotation text="waiting on the owner's price" placement="below" />
              </span>
            </td>
            <td role="cell" data-label="Who">Owner</td>
            <td role="cell" data-label="Next">Decide by Friday</td>
          </tr>
          <tr role="row">
            <td role="cell" data-label="Job">Order 77, Lot 4</td>
            <td role="cell" data-label="Waiting on">
              <span className="board__tick">
                <PenTick />
                Nothing
              </span>
            </td>
            <td role="cell" data-label="Who">Crew B</td>
            <td role="cell" data-label="Next">Starts Monday</td>
          </tr>
        </tbody>
      </table>
      </div>
    </Figure>
  );
}
