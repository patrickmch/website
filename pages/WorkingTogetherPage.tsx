import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';
import { InkBlock } from '../components/InkBlock';
import { PenUnderline } from '../components/marks/PenUnderline';
import { SprintTimeline } from '../components/diagrams/SprintTimeline';
import { QuotingTool } from '../components/diagrams/QuotingTool';
import { Paperwork } from '../components/diagrams/Paperwork';
import { SharedView } from '../components/diagrams/SharedView';

const stages = [
  {
    title: 'Understand what needs to change',
    body: 'We look at recent work with the people who did it, including the steps that took longer than they should. I look at the process and the systems together, then recommend where to focus.',
  },
  {
    title: 'Build and put it to work',
    body: 'I build software, connect systems, and set up automation and AI around the work your team needs to do. That includes testing with the people who will use it, working through exceptions, and helping them make it part of the job.',
  },
  {
    title: 'Keep improving as the business grows',
    body: 'Once the team is using a change, we can see what is working and what still needs attention. We can keep improving the systems as the business grows, with a clear agreement on what I am responsible for.',
  },
];

const questions = [
  {
    q: 'How do you decide between custom software, automation, and AI?',
    a: 'Each tool solves a different part of an operational bottleneck. Deterministic software and business rules handle pricing calculations, permissions, and data pipelines where every run must follow exact logic. AI handles unstructured documents, cross-system synthesis, and first-draft preparation for a person to review. Most engagements combine both around the systems your team already uses.',
  },
  {
    q: 'Can you work with our existing team or technology provider?',
    a: 'Yes. I can work alongside your team and existing providers. We agree on who is making decisions, doing the work, testing it, and supporting it afterward.',
  },
  {
    q: 'How much does a Discovery Sprint cost?',
    a: "I'll propose a fee once we've agreed on the question and scope. You'll know the fee, timing, and what's included before deciding to proceed. Any implementation is scoped and priced separately.",
  },
];

export default function WorkingTogetherPage() {
  usePageMeta(
    'Working Together | Patrick McHeyser',
    'Find out what is holding the work up and what to change first. Start with a Discovery Sprint, then build and test improvements with Patrick and your team.',
    '/working-together'
  );

  return (
    <>
      <Section first className="hero">
        <div className="hero__text">
          <h1>Start with a clear first project, or a short sprint to scope it.</h1>
          <p className="lead">
            Some clients come in knowing which workflow needs to be built or fixed first: a quoting tool, a handoff
            between sales and production, or reporting that still takes days to reconcile by hand. When the target is
            clear, we scope that project directly and build it.
          </p>
          <p>
            When several problems are competing for attention, or you want an outside read on your systems before
            committing to a larger build, we start with a paid Discovery Sprint. Either way, I work alongside your
            team from deciding what to change through getting it working in daily use.
          </p>
          <div className="hero__cta cta-row">
            <ButtonLink to="/contact">Let's talk</ButtonLink>
            <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
          </div>
        </div>
      </Section>

      <Section>
        <ol className="cards cards--3">
          {stages.map((stage, index) => (
            <li key={stage.title} className="card">
              <div className="card__n" aria-hidden="true">
                0{index + 1}
              </div>
              <h2 className="card__title">{stage.title}</h2>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="examples-heading">
        <div className="section__heading">
          <h2 id="examples-heading">How software, automation, and human judgment fit together</h2>
          <p className="lead">
            Whether we build a custom application or connect the tools you already have, the goal is the same: let
            software handle the repeatable gathering, calculation, and cross-checking, and put clear exceptions in
            front of the right person.
          </p>
        </div>
        <div className="example">
          <div className="example__text">
            <h3>A quoting tool that follows your rules.</h3>
            <p>
              The tool brings together the job details and pricing rules, prepares a quote for review, and flags
              requests that need someone's judgment.
            </p>
          </div>
          <div className="example__figure">
            <QuotingTool n={1} />
          </div>
        </div>
        <div className="example example--flip">
          <div className="example__text">
            <h3>Customer paperwork with less retyping.</h3>
            <p>
              Information you've already collected carries into the documents your team needs. Missing details are
              flagged, and a person checks the paperwork before it's used.
            </p>
          </div>
          <div className="example__figure">
            <Paperwork n={2} />
          </div>
        </div>
        <div className="example">
          <div className="example__text">
            <h3>A shared view of work that needs attention.</h3>
            <p>
              The team can see which jobs are waiting for information or a decision, who is responsible, and what
              needs to happen next.
            </p>
          </div>
          <div className="example__figure">
            <SharedView n={3} />
          </div>
        </div>
      </Section>

      <Section labelledBy="sprint-heading">
        <InkBlock>
          <h2 id="sprint-heading">
            When to start with a{' '}
            <span className="underlined">
              Discovery Sprint
              <PenUnderline />
            </span>
          </h2>
          <Prose>
            <p>
              A Discovery Sprint is a focused, paid engagement to map an operating bottleneck and decide the
              highest-return fix. It is designed for teams that know work is getting stuck between people and systems,
              and want a concrete plan and working scope before committing to a build.
            </p>
            <p>
              We might trace why quotes or customer handoffs keep stalling between departments, why management numbers
              do not match the underlying orders, or whether your current software can support the next stage of
              growth.
            </p>
          </Prose>
        </InkBlock>

        <div className="sprint-figure">
          <SprintTimeline n={4} />
        </div>

        <div className="sprint-steps">
          <div className="sprint-steps__item">
            <h3>First, we agree on the question.</h3>
            <Prose>
              <p>
                In our initial conversation, we'll discuss what's getting harder, what you've tried, and what you need
                to decide. Then we agree on the scope, fee, timing, and the people and information needed for the
                work.
              </p>
            </Prose>
          </div>
          <div className="sprint-steps__item">
            <h3>Then I work through real examples with your team.</h3>
            <Prose>
              <p>
                I'll ask people to walk me through recent work: a quote, a customer handoff, a recurring report. We
                look at the systems and documents involved, including the steps that happen in email, spreadsheets,
                or someone's memory.
              </p>
              <p>
                We follow the work closely enough to see why it gets held up or repeated, and what would actually make
                it easier.
              </p>
            </Prose>
          </div>
          <div className="sprint-steps__item">
            <h3>You leave with a recommendation you can act on.</h3>
            <Prose>
              <p>The findings explain:</p>
              <ul>
                <li>Where the work is getting held up, with examples from your business.</li>
                <li>What I recommend changing first and why.</li>
                <li>What your existing tools can support and where further work is needed.</li>
                <li>What the next step involves, who needs to be involved, and what still needs to be confirmed.</li>
              </ul>
              <p>We review the architecture, trade-offs, and implementation plan together so you can decide the next step with complete clarity.</p>
            </Prose>
          </div>
        </div>

        <ProofSlot
          kind="sample"
          className="sprint-proof"
          note="Place an approved sample findings deliverable here when one is ready. Let visitors inspect it without a signup."
        />
      </Section>

      <Section labelledBy="needs-heading">
        <div className="two-up">
          <div>
            <h2 id="needs-heading">What I need from your team</h2>
            <Prose>
              <p>
                I'll need someone who owns the problem, time with the people doing the work, and access to the
                relevant systems or examples. We agree on that involvement before starting, so you can plan for it
                alongside the day-to-day business.
              </p>
            </Prose>
          </div>
          <div>
            <h2 id="afterward-heading">What happens afterward</h2>
            <Prose>
              <p>
                The Discovery Sprint stands on its own: you leave with the system map, prioritized recommendations, and
                implementation scope whether we build the next stage together or your internal team takes it forward.
              </p>
              <p>
                When we continue into implementation, we scope and price that build separately. And if you already have
                a defined project in mind, we can skip the sprint and scope the build directly.
              </p>
            </Prose>
          </div>
        </div>
        <ProofSlot
          kind="quote"
          className="sprint-proof"
          note="Approved testimonial about understanding the business, the usefulness of the work, or follow-through."
        />
      </Section>

      <Section labelledBy="questions-heading">
        <div className="section__heading">
          <h2 id="questions-heading">A few practical questions</h2>
        </div>
        <ul className="faq">
          {questions.map((item) => (
            <li key={item.q} className="faq__item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="work-example-heading">
        <div className="section__heading"><h2 id="work-example-heading">See how this takes shape in practice.</h2></div>
        <Prose><p>A systems assessment for a custom manufacturer grew into an ongoing fractional CTO role on the management team, with custom quoting software across five queues, rebuilt ERP reporting, and company-owned infrastructure.</p></Prose>
        <SecondaryLink to="/work/manufacturing-systems">See the work</SecondaryLink>
      </Section>

      <Section labelledBy="closing-heading" className="closing">
        <h2 id="closing-heading">Tell me where the work is getting stuck.</h2>
        <Prose>
          <p>We'll start with a conversation about the problem and whether I can help.</p>
        </Prose>
        <div className="cta-row">
          <ButtonLink to="/contact">Let's talk</ButtonLink>
          <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
        </div>
      </Section>
    </>
  );
}
