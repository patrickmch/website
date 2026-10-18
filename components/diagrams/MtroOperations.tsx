import { Figure, Flow, Node, Connector, Record } from '../Figure';
import { useWideFigure } from '../../hooks/useWideFigure';

/** Figure 1: the morning account brief. */
export function MtroAccountBrief() {
  const wide = useWideFigure();
  return (
    <Figure
      n={1}
      caption="The morning account brief. Seven sources are ingested automatically every morning, with health checks on each feed. The team reviews the unified account brief, edits the drafted reply, and sends it."
      description={wide
        ? "A list titled Ingested every morning, marked automatic, shows seven sources with check marks: email, SMS feed (noted restored after alert, and circled with the note 'feed health check alerts on any stalled source'), customer forum, team chat, product usage telemetry, CRM account records, and calendar. An arrow leads to unified account brief, marked automatic: onboarding stage, properties, payments, last reply, next call. Next, support intake queue, marked automatic: incoming requests deduplicated with a drafted reply. Last, team reviews and sends."
        : "Three steps. Seven sources ingested daily, marked automatic and circled with the note 'feed health check alerts on any stalled source'. Account brief and support queue, marked automatic: with next action and draft reply. Team reviews and sends."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Record title="Ingested every morning" tag="automatic" rows={[
            { key: 'Email', value: 'healthy', state: 'tick' },
            { key: 'SMS feed', value: 'restored after alert', state: 'tick', marked: true, annotation: 'feed health check alerts on any stalled source' },
            { key: 'Customer forum', value: 'healthy', state: 'tick' },
            { key: 'Team chat', value: 'healthy', state: 'tick' },
            { key: 'Product usage telemetry', value: 'healthy', state: 'tick' },
            { key: 'CRM account records', value: 'healthy', state: 'tick' },
            { key: 'Calendar', value: 'healthy', state: 'tick' },
          ]} />
          <Connector />
          <Node label="Unified account brief" auto where="onboarding stage, properties, payments, last reply, next call" />
          <Connector />
          <Node label="Support intake queue" auto where="incoming requests deduplicated with a drafted reply" />
          <Connector />
          <Node label="Team reviews and sends" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="Seven sources ingested daily" auto marked annotation="feed health check alerts on any stalled source" annotationPlacement="below" />
          <Connector />
          <Node label="Account brief and support queue" auto where="with next action and draft reply" />
          <Connector />
          <Node label="Team reviews and sends" />
        </Flow>
      )}
    </Figure>
  );
}

/** Figure 2: automated browser QA across a 19-step booking journey. */
export function MtroQaWave() {
  const wide = useWideFigure();
  return (
    <Figure
      n={2}
      caption="Automated browser QA across a 19-step booking journey. An automated browser runner executes real clicks across lease signing, checkout, payment, and notifications, capturing screenshot evidence at every step so developers can reproduce and verify fixes before release."
      description={wide
        ? "Four steps in a row. 19-step booking test plan: booking, lease signing, checkout, payment, and notifications. Automated browser runner, marked automatic: executes real clicks with screenshot evidence at every step. QA verification report, marked automatic, lists 14 scenarios passed, verified with screenshots; 7 defects isolated with reproduction steps, queued for fix and circled with the note 'seven defects isolated with reproduction steps'; and release status, retested before deploy. Engineering fixes and retests: every repair runs through the same browser suite."
        : "Three steps. 19-step booking test plan. Automated browser runner, marked automatic and circled with the note 'seven defects isolated with reproduction steps': screenshot evidence, 14 passed, 7 defects. Engineering fixes and retests."}
      className="story-figure"
    >
      {wide ? (
        <Flow>
          <Node label="19-step booking test plan" where="booking, lease signing, checkout, payment, notifications" />
          <Connector />
          <Node label="Automated browser runner" auto where="executes real clicks with screenshot evidence at every step" />
          <Connector />
          <Record title="QA verification report" tag="automatic" rows={[
            { key: '14 scenarios passed', value: 'verified with screenshots', state: 'tick' },
            { key: '7 defects isolated with reproduction steps', value: 'queued for fix', state: 'flag', marked: true, annotation: 'seven defects isolated with reproduction steps' },
            { key: 'Release status', value: 'retested before deploy' },
          ]} />
          <Connector />
          <Node label="Engineering fixes and retests" where="every repair runs through the same browser suite" />
        </Flow>
      ) : (
        <Flow className="flow--even">
          <Node label="19-step booking test plan" />
          <Connector />
          <Node label="Automated browser runner" auto where="screenshot evidence: 14 passed, 7 defects" marked annotation="seven defects isolated with reproduction steps" annotationPlacement="below" />
          <Connector />
          <Node label="Engineering fixes and retests" />
        </Flow>
      )}
    </Figure>
  );
}
