import { Wordmark } from '../components/Wordmark';
import { Flow, Node, Connector } from '../components/Figure';

/** Dev-only template for the 1200x630 social preview image (screenshotted by scripts/screenshots.mjs). */
export default function OgPage() {
  return (
    <div className="og is-drawn" id="og">
      <div>
        <Wordmark size="display" asText />
        <p className="og__tag">Operations and technology for growing businesses.</p>
      </div>
      <Flow annotated>
        <Node label="Request comes in" where="email" />
        <Connector />
        <Node label="Price decided" where="waits for the owner" marked annotation="work waits here" />
        <Connector />
        <Node label="Quote sent" where="email, then follow-up" />
      </Flow>
      <div className="og__foot">
        <span>Patrick McHeyser</span>
        <span>Boulder, Colorado</span>
      </div>
    </div>
  );
}
