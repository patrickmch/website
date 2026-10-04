import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../lib/asset';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';
import { InkBlock } from '../components/InkBlock';
import { PenUnderline } from '../components/marks/PenUnderline';
import { QuoteFlow } from '../components/diagrams/QuoteFlow';
import { SprintSteps } from '../components/diagrams/SprintSteps';
import { QuotingTool } from '../components/diagrams/QuotingTool';
import { Paperwork } from '../components/diagrams/Paperwork';
import { SharedView } from '../components/diagrams/SharedView';

const problems = [
  {
    title: 'Every new customer brings another round of admin.',
    body: "Your team prepares the same documents, re-enters information, and chases the next response. The customer list grows, and so does the effort it takes to keep track of everything. You're wondering how much more the team can take on.",
  },
  {
    title: 'A status update takes too much digging.',
    body: "Before you can answer a customer or decide what needs attention, someone has to check email, spreadsheets, and a business system. You need a dependable view of what's waiting, what's missing, and who needs to act.",
  },
  {
    title: 'Work keeps coming back to you or the same few people.',
    body: "Someone needs a pricing decision. A customer request falls outside the usual process. The team turns to the person who knows the history, and work waits until they're available.",
  },
  {
    title: "You're spending on systems and still filling the gaps.",
    body: 'People still move information from one tool to another or build the report by hand. You need to know whether to improve what you have, connect the systems, or change the process before investing again.',
  },
];

export default function HomePage() {
  usePageMeta(
    'Patrick McHeyser | Operations and technology consulting',
    'Practical help with the processes, software, and administrative work that make growth harder. Work directly with Patrick McHeyser from discovery through implementation.',
    '/'
  );

  return (
    <>
      <Section first className="hero">
        <div className="hero__text">
          <Eyebrow>Operations and technology for growing businesses</Eyebrow>
          <h1>Make it easier to take on more business.</h1>
          <p className="lead">
            I help owners and operations leaders get quotes out faster, reduce repetitive paperwork, and give their
            teams a clear view of what needs attention.
          </p>
          <p>
            I work with your team to find where things are getting held up, improve the process, and build the
            software, automation, or AI tools that help the work move forward.
          </p>
          <div className="hero__cta">
            <ButtonLink to="/contact">Let's talk</ButtonLink>
          </div>
        </div>
        <div className="hero__figure">
          <QuoteFlow />
        </div>
        <ProofSlot
          kind="quote"
          className="proof-slot--after-hero"
          note="Early trust signal. Use a real, approved client quote with attribution."
        />
      </Section>

      <Section labelledBy="problems-heading">
        <div className="section__heading">
          <h2 id="problems-heading">Where is the extra work coming from?</h2>
        </div>
        <ol className="cards cards--2">
          {problems.map((problem, index) => (
            <li key={problem.title} className="card">
              <div className="card__n" aria-hidden="true">
                0{index + 1}
              </div>
              <h3>{problem.title}</h3>
              <p>{problem.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="approach-heading">
        <div className="approach">
          <div className="approach__text">
            <div className="section__heading">
              <h2 id="approach-heading">I help you decide what to change and carry it through.</h2>
            </div>
            <Prose>
              <p>
                We start with real examples of the work and the people responsible for it. I look at the handoffs,
                information, and systems involved, then recommend where a change is most likely to help.
              </p>
              <p>
                I build and test the changes with the people who will use them. We work through the exceptions
                together and make sure the team knows how to use what's been put in place.
              </p>
              <p>
                My focus is on businesses around $5 million to $25 million in annual revenue, where the owners and
                operations leaders want to grow and are ready to improve how the business runs.
              </p>
            </Prose>
          </div>
          <div className="approach__figure">
            <SprintSteps />
          </div>
        </div>
      </Section>

      <Section labelledBy="examples-heading">
        <div className="section__heading">
          <h2 id="examples-heading">What this can look like</h2>
          <p className="lead">Here are examples of the kinds of improvements we can make.</p>
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
            <QuotingTool />
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
            <Paperwork />
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
            <SharedView />
          </div>
        </div>
      </Section>

      <Section labelledBy="sprint-heading">
        <InkBlock>
          <h2 id="sprint-heading">
            Start with a{' '}
            <span className="underlined">
              Discovery Sprint
              <PenUnderline />
            </span>
            .
          </h2>
          <Prose>
            <p>
              A Discovery Sprint is a focused, paid engagement to understand what's holding the work up. We agree on
              the scope, fee, and timing upfront. You leave with the findings, a recommendation on what to change
              first, and a defined next step.
            </p>
          </Prose>
          <div className="ink-block__cta">
            <SecondaryLink to="/working-together">See how we work together</SecondaryLink>
          </div>
        </InkBlock>
      </Section>

      <Section labelledBy="person-heading">
        <div className="person">
          <div className="person__photo">
            <img
              className="portrait portrait--4x5"
              src={asset("patrick-seated-800.jpg")}
              srcSet={`${asset("patrick-seated-800.jpg")} 800w, ${asset("patrick-seated-1600.jpg")} 1600w`}
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 40vw, 100vw"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              alt="Patrick McHeyser, seated, in a navy shirt."
            />
          </div>
          <div className="person__text">
            <h2 id="person-heading">You'll work directly with me.</h2>
            <Prose>
              <p>
                I'm Patrick McHeyser, a software engineer and operations consultant based in Boulder, Colorado. I
                work directly with you and your team, from understanding the problem through putting the changes
                into practice.
              </p>
            </Prose>
            <SecondaryLink to="/about">More about Patrick</SecondaryLink>
            <ProofSlot
              kind="quote"
              className="person__proof"
              note="Approved testimonial about the experience of working with him."
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="closing-heading" className="closing">
        <h2 id="closing-heading">What is getting harder as your business grows?</h2>
        <Prose>
          <p>Tell me what's slowing the work down and what you'd like to change.</p>
        </Prose>
        <ButtonLink to="/contact">Let's talk</ButtonLink>
      </Section>
    </>
  );
}
