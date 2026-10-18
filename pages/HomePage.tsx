import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../lib/asset';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';
import { InkBlock } from '../components/InkBlock';
import { QuoteFlow } from '../components/diagrams/QuoteFlow';
import { SprintSteps } from '../components/diagrams/SprintSteps';
import { GrowthConcept } from '../components/diagrams/GrowthConcept';
import { ClientWorkFeature } from '../components/ClientWorkFeature';

export default function HomePage() {
  usePageMeta(
    'Patrick McHeyser | Custom software, automation and AI',
    'Give your team the systems to handle more business. Patrick McHeyser designs and builds custom software, automation, and AI around the systems your business already runs.',
    '/'
  );

  return (
    <>
      <Section first className="hero">
        <div className="hero__layout">
          <div className="hero__text">
            <Eyebrow>Custom software, automation and AI for growing businesses</Eyebrow>
            <h1>Give your team the systems to handle more business.</h1>
            <p className="lead">As a business grows, critical work starts getting stuck between your existing software, spreadsheets, and a few key people. I design and build custom software, automation, and AI that close those gaps and keep work moving.</p>
            <p>The work starts with how your operation actually runs. I work with your team to see where quoting, handoffs, or reporting get held up, build what is missing around the systems you already use, and get it working in their day-to-day jobs.</p>
            <div className="hero__cta cta-row">
              <ButtonLink to="/contact">Let's talk</ButtonLink>
              <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
            </div>
          </div>
          <GrowthConcept />
        </div>
        <blockquote className="client-quote client-quote--after-hero">
          <p className="client-quote__text">
            “We came to Patrick already with data, systems, and skills. He built the engine that put it all together in AWS. Many companies like my own will not have an internal AI architect on their team and will need to outsource.”
          </p>
          <footer className="client-quote__footer">CEO, healthcare services business</footer>
        </blockquote>
      </Section>

      <Section labelledBy="outcomes-heading">
        <div className="section__heading"><h2 id="outcomes-heading">Give your team more capacity, and your customers a better experience.</h2></div>
        <Prose><p>As customer volume grows, the coordination behind every job multiplies: documents to prepare, systems to cross-check, and handoffs to track. Well-designed software and AI absorb that repeatable load so your team stays focused on customers and exceptions.</p></Prose>
        <article className="home-outcome" aria-labelledby="outcome-1">
          <div className="home-outcome__text">
            <h3 id="outcome-1">Give customers a faster, more dependable response.</h3>
            <Prose><p>When a customer asks for an update, the person answering has the full history, open questions, and next steps in front of them. Software assembles the context from your existing systems and drafts the routine follow-up, so your team spends the conversation resolving the issue rather than hunting through email threads and spreadsheets.</p></Prose>
          </div>
        </article>
        <article className="home-outcome" aria-labelledby="outcome-2">
          <div className="home-outcome__text">
            <h3 id="outcome-2">Turn your best operators' judgment into rules the whole team can run.</h3>
            <Prose><p>The pricing and routing logic your most experienced people carry in their heads becomes part of the system the whole team uses. In a quoting workflow, sales enters the job details once, the system calculates the price from agreed rules, and the team reviews and sends the quote. Routine requests move immediately, while complex jobs route to the right person for a decision.</p></Prose>
          </div>
          <div className="home-outcome__figure"><QuoteFlow /></div>
        </article>
        <article className="home-outcome" aria-labelledby="outcome-3">
          <div className="home-outcome__text">
            <h3 id="outcome-3">See where the business needs attention while there's still time to act.</h3>
            <Prose><p>A shared operational view shows which jobs are waiting on information, what is missing, and who owns the next step. Your team follows up before a delay turns into a customer escalation, and every management metric traces directly back to the underlying source records.</p></Prose>
          </div>
        </article>
      </Section>

      <Section labelledBy="examples-heading">
        <div className="section__heading"><h2 id="examples-heading">See what I've built with other teams.</h2></div>
        <Prose className="home-work-intro"><p>Two examples of how I work with established teams to replace manual bottlenecks with production software and AI infrastructure they own.</p></Prose>
        <ClientWorkFeature nested />
        <div className="work-all"><SecondaryLink to="/work">Explore client work</SecondaryLink></div>
      </Section>

      <Section labelledBy="approach-heading">
        <div className="approach">
          <div className="approach__text">
            <div className="section__heading"><h2 id="approach-heading">From an operating problem to a system your team can use.</h2></div>
            <Prose>
              <p>I work through real examples with the people doing the job: what they need to know, which decisions they make, and where the work gets held up. Together, we decide what the system needs to do and what your existing tools can support.</p>
              <p>I then design and build the software or integrations, test them against real work, and work through the exceptions with your team. The build includes a plan for putting it into use and clarity about who will maintain it. If you already have a developer or technology provider, I can work alongside them.</p>
              <p>My focus is on established businesses, typically around $10 million to $75 million in annual revenue, where the owners and operations leaders have core systems in place and are ready to improve how the work moves across the company.</p>
            </Prose>
          </div>
          <div className="approach__figure"><SprintSteps /></div>
        </div>
      </Section>

      <Section labelledBy="sprint-heading">
        <InkBlock>
          <h2 id="sprint-heading">Know what to build first, and what it will take.</h2>
          <Prose>
              <p>A Discovery Sprint is a focused, paid engagement around an operating problem. It might be why each new customer creates so much admin, or whether your existing software can support the next stage of growth.</p>
              <p>I review the work and systems with your team, then recommend what to change first. You'll understand what your existing tools can handle, where a build would help, and what implementation would involve. We review the architecture, trade-offs, and implementation scope together so you have a clear basis for what to build first.</p>
              <p>We agree on the scope, fee and timing before starting. Implementation is scoped separately. If you already have a clear project in mind, we can discuss the build directly.</p>
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
              srcSet={`${asset("patrick-seated-800.jpg")} 800w, ${asset("patrick-seated-1200.jpg")} 1200w, ${asset("patrick-seated-1600.jpg")} 1600w`}
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
              <p>I'm Patrick McHeyser, a software engineer and operations consultant based in Boulder, Colorado. My background spans customer success, software engineering and executive leadership development. I'm comfortable talking through a decision with an owner, working out the details with the team, and building the software myself.</p>
              <p>I own the work from architecture and code through testing, rollout, and team handoff, so your business ends up with production systems your people actually use.</p>
            </Prose>
            <SecondaryLink to="/about">More about Patrick</SecondaryLink>
          </div>
        </div>
        <ProofSlot kind="quote" className="person__proof"
          note="Approved testimonial about the experience of working with him." />
      </Section>

      <Section labelledBy="closing-heading" className="closing">
        <h2 id="closing-heading">What would your business be able to do with more capacity?</h2>
        <Prose><p>Tell me what's taking too much of your team's time, or what you'd like the business to be able to handle next.</p></Prose>
        <div className="cta-row">
          <ButtonLink to="/contact">Let's talk</ButtonLink>
          <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
        </div>
      </Section>
    </>
  );
}
