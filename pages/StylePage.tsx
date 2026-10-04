import { usePageMeta } from '../hooks/usePageMeta';
import { Section } from '../components/Section';
import { Wordmark } from '../components/Wordmark';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';
import { PenCircle } from '../components/marks/PenCircle';
import { PenUnderline } from '../components/marks/PenUnderline';
import { PenTick } from '../components/marks/PenTick';
import { Field } from '../components/form/Field';
import { QuoteFlow } from '../components/diagrams/QuoteFlow';
import { SprintSteps } from '../components/diagrams/SprintSteps';
import { QuotingTool } from '../components/diagrams/QuotingTool';
import { Paperwork } from '../components/diagrams/Paperwork';
import { SharedView } from '../components/diagrams/SharedView';
import { SprintTimeline } from '../components/diagrams/SprintTimeline';

const colors = [
  ['--paper', '#F4F2ED', 'page background'],
  ['--paper-2', '#ECE9E2', 'inputs, stripes'],
  ['--ink', '#16202B', 'text, ink block'],
  ['--ink-2', '#3D4854', 'captions, 8.3:1'],
  ['--stroke', '#6B7682', 'drawing strokes'],
  ['--line', '#CFCBC2', 'hairlines'],
  ['--mark', '#D9622B', 'the pen, 3.3:1'],
  ['--mark-text', '#B04A1B', 'pen words, 4.9:1'],
  ['--resolved', '#3F7D5C', 'tick strokes'],
  ['--resolved-text', '#2F6A4A', 'tick words, 5.7:1'],
];

/** Dev-only style tile: tokens, type, marks, components, every figure. */
export default function StylePage() {
  usePageMeta('Style tile | McHeyser', 'Design system reference.');
  const noop = () => undefined;

  return (
    <Section first className="style-page">
      <p className="eyebrow">Style tile (dev only)</p>
      <h1>Make the work visible</h1>

      <section>
        <h2>Color</h2>
        <ul className="swatches">
          {colors.map(([token, hex, use]) => (
            <li key={token}>
              <div className="swatch__chip" style={{ background: `var(${token})` }} />
              <div className="swatch__meta">
                {token}
                <br />
                {hex}
                <br />
                {use}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Type</h2>
        <div className="type-row">
          <p className="eyebrow">Display, serif 500</p>
          <h1>Make it easier to take on more business.</h1>
        </div>
        <div className="type-row">
          <p className="eyebrow">H2, serif 500</p>
          <h2>Where is the extra work coming from?</h2>
        </div>
        <div className="type-row">
          <p className="eyebrow">H3, serif 600</p>
          <h3>Every new customer brings another round of admin.</h3>
        </div>
        <div className="type-row">
          <p className="eyebrow">Lead, sans 400</p>
          <p className="lead">I help owners and operations leaders get quotes out faster.</p>
        </div>
        <div className="type-row">
          <p className="eyebrow">Body, sans 400</p>
          <p>
            I work with your team to find where things are getting held up, improve the process, and build the
            software, automation, or AI tools that help the work move forward. A <a href="#/">text link</a> looks like
            this.
          </p>
        </div>
        <div className="type-row">
          <p className="eyebrow">Figure text, mono</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-fig)' }}>Price decided / waits for the owner</p>
        </div>
      </section>

      <section>
        <h2>Wordmark</h2>
        <div className="style-row">
          <Wordmark size="header" asText />
          <Wordmark size="footer" asText />
          <Wordmark size="display" asText />
          <div className="ink-sample">
            <Wordmark size="footer" asText />
          </div>
        </div>
      </section>

      <section>
        <h2>Pen marks</h2>
        <div className="style-row is-drawn">
          <span className="mark-sample" style={{ border: '1.5px solid var(--stroke)', borderRadius: 2 }}>
            Price decided
            <PenCircle />
          </span>
          <span className="underlined" style={{ fontFamily: 'var(--font-serif)', fontSize: 28 }}>
            Discovery Sprint
            <PenUnderline />
          </span>
          <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
            <PenTick /> Nothing waiting
          </span>
        </div>
      </section>

      <section>
        <h2>Buttons and links</h2>
        <div className="style-row">
          <ButtonLink to="/contact">Let's talk</ButtonLink>
          <ButtonLink to="/contact" small>
            Let's talk
          </ButtonLink>
          <SecondaryLink to="/working-together">See how we work together</SecondaryLink>
          <div className="ink-sample style-row">
            <ButtonLink to="/contact">Let's talk</ButtonLink>
            <SecondaryLink to="/about">More about Patrick</SecondaryLink>
          </div>
        </div>
      </section>

      <section>
        <h2>Form fields</h2>
        <div className="form">
          <Field id="s-name" name="name" label="Name" value="" onChange={noop} />
          <Field id="s-site" name="website" label="Company website" optional value="" onChange={noop} />
          <Field id="s-email" name="email" label="Email" value="not an email" onChange={noop} error="Please enter a valid email address." />
          <Field id="s-note" name="challenge" as="textarea" rows={3} label="What is getting harder to manage as the business grows?" value="" onChange={noop} />
        </div>
      </section>

      <section>
        <h2>Proof slot</h2>
        <ProofSlot kind="quote" note="Early trust signal. Use a real, approved client quote with attribution." />
      </section>

      <section>
        <h2>Figures</h2>
        <div className="style-grid">
          <QuoteFlow />
          <SprintSteps />
          <QuotingTool />
          <Paperwork />
          <SharedView />
          <SprintTimeline />
        </div>
      </section>
    </Section>
  );
}
