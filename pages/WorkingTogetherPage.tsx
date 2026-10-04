import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';
import { InkBlock } from '../components/InkBlock';
import { PenUnderline } from '../components/marks/PenUnderline';
import { SprintTimeline } from '../components/diagrams/SprintTimeline';

const stages = [
  {
    title: 'Understand what needs to change',
    body: 'We look at how the work gets done, where it gets held up, and what your team has to do to keep it moving. I assess the process and the technology together, then recommend where to focus.',
  },
  {
    title: 'Build and put it to work',
    body: 'I build software, connect systems, and set up automation and AI around the work your team needs to do. That includes testing with the people who will use it, working through exceptions, and helping them make it part of the job.',
  },
  {
    title: 'Keep improving as the business grows',
    body: 'Once a change is in use, we can see what it has resolved and what still needs attention. Further improvements and ongoing support can follow, with the responsibility and scope agreed together.',
  },
];

const questions = [
  {
    q: 'Does it have to be an AI project?',
    a: 'No. The right change might be a simpler process, better use of existing software, a connection between systems, or a custom tool. AI can help with tasks such as finding relevant information or preparing a document for someone to review. We choose it where it serves the work.',
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
    'Start with a focused Discovery Sprint to understand an operating problem and decide what to change. Explore the process, deliverables, and implementation work.',
    '/working-together'
  );

  return (
    <>
      <Section first className="hero">
        <div className="hero__text">
          <h1>Start with the work that's slowing you down.</h1>
          <p className="lead">
            You may know where the problem is. Quotes take too long. Each new customer brings more paperwork. Your
            team spends hours putting together information that should be easy to find.
          </p>
          <p>
            You may also have people working on the technology already, but need help deciding whether the work is
            taking the business in the right direction.
          </p>
          <p>I work with you to understand what's happening, decide what to change, and put the improvements into use.</p>
          <div className="hero__cta">
            <ButtonLink to="/contact">Let's talk</ButtonLink>
          </div>
        </div>
      </Section>

      <Section labelledBy="stages-heading">
        <h2 id="stages-heading" className="visually-hidden">
          How we work together
        </h2>
        <ol className="cards cards--3">
          {stages.map((stage, index) => (
            <li key={stage.title} className="card">
              <div className="card__n" aria-hidden="true">
                0{index + 1}
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="sprint-heading">
        <InkBlock>
          <h2 id="sprint-heading">
            Begin with a{' '}
            <span className="underlined">
              Discovery Sprint
              <PenUnderline />
            </span>
          </h2>
          <Prose>
            <p>
              A Discovery Sprint is a focused, paid engagement to understand an operating problem and decide what to
              do about it. It gives you a clear first step before committing to a larger project.
            </p>
            <p>
              We might investigate why quotes take so long, why serving each customer requires so much
              administration, or whether your existing software can support the way you want to grow.
            </p>
          </Prose>
        </InkBlock>

        <div className="sprint-figure">
          <SprintTimeline />
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
                The point is to understand where time goes, why work gets repeated, and what has to be true for a
                change to help.
              </p>
            </Prose>
          </div>
          <div className="sprint-steps__item">
            <h3>You leave with a recommendation you can act on.</h3>
            <Prose>
              <p>The findings explain:</p>
              <ul>
                <li>Where the work is getting held up, with examples that support the diagnosis.</li>
                <li>What I recommend changing first and why.</li>
                <li>What your existing tools can support and where further work is needed.</li>
                <li>What the next step involves, who needs to be involved, and what still needs to be confirmed.</li>
              </ul>
              <p>We'll walk through the findings together so you can question the recommendations and decide how to proceed.</p>
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
                You can take the recommendations forward with your team, use another provider, ask me to scope the
                next stage, or stop there. The Discovery Sprint ends with the findings and our review of them.
              </p>
              <p>
                If we continue, we agree on the implementation work separately. If the problem and scope are already
                clear at the outset, we can discuss a scoped implementation directly.
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

      <Section labelledBy="closing-heading" className="closing">
        <h2 id="closing-heading">Tell me where the work is getting stuck.</h2>
        <Prose>
          <p>We'll start with a conversation about the problem and whether I can help.</p>
        </Prose>
        <ButtonLink to="/contact">Let's talk</ButtonLink>
      </Section>
    </>
  );
}
