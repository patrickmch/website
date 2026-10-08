import { Wordmark } from '../components/Wordmark';
import { Flow, Node, Connector } from '../components/Figure';

/** Dev-only template for the 1200x630 social preview image (screenshotted by scripts/screenshots.mjs). */
export default function OgPage() {
  return (
    <div className="og is-drawn" id="og">
      <div>
        <Wordmark size="display" asText />
        <p className="og__tag">Build the capacity for your next stage of growth.</p>
      </div>
      <Flow annotated className="flow--even">
        <Node label="Request comes in" />
        <Connector />
        <Node label="Decision needed" marked annotation="the team waits for a decision" />
        <Connector />
        <Node label="Work continues" />
      </Flow>
      <div className="og__foot">
        <span>Patrick McHeyser</span>
        <span>Boulder, Colorado</span>
      </div>
    </div>
  );
}
