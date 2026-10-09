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
    'Patrick McHeyser | Operations and technology consulting',
    "Take on more customers without the admin. Patrick McHeyser designs and builds software, automation and AI systems that take repetitive work off your team.",
    '/'
  );

  return (
    <>
      <Section first className="hero">
        <div className="hero__layout">
          <div className="hero__text">
            <Eyebrow>Custom software, automation and AI for growing businesses</Eyebrow>
            <h1>Take on more customers without the admin.</h1>
            <p className="lead">I design and build software, automation and AI systems that take repetitive work off your team, so they can spend more time on customers and handle more business.</p>
            <p>The work starts with understanding how your business runs. I work with your team to decide what needs to change, build the system and get it working in their day-to-day jobs.</p>
            <div className="hero__cta cta-row">
              <ButtonLink to="/contact">Let's talk</ButtonLink>
              <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
            </div>
          </div>
          <GrowthConcept />
        </div>
        <ProofSlot kind="quote" className="proof-slot--after-hero"
          note="Early trust signal. Use a real, approved client quote with attribution." />
      </Section>

      <Section labelledBy="outcomes-heading">
        <div className="section__heading"><h2 id="outcomes-heading">Give your team more capacity, and your customers a better experience.</h2></div>
        <Prose><p>The effort behind each customer can grow quickly: another document to prepare, another system to check, another handoff to follow up. The right system can carry more of that work. Here are a few examples of what that can make possible.</p></Prose>
        <article className="home-outcome" aria-labelledby="outcome-1">
          <div className="home-outcome__text">
            <h3 id="outcome-1">Give customers a faster, more dependable response.</h3>
            <Prose><p>When a customer asks for an update, the person answering can have the relevant history, outstanding questions and next steps in front of them. Software brings that context together and prepares the routine follow-up. Your team can spend the conversation resolving the issue, with less time spent hunting for information or asking colleagues to reconstruct what happened.</p></Prose>
          </div>
        </article>
        <article className="home-outcome" aria-labelledby="outcome-2">
          <div className="home-outcome__text">
            <h3 id="outcome-2">Keep work moving without every decision coming back to you.</h3>
            <Prose><p>The rules your experienced people use can become part of the system the whole team works with. In a quoting process, that could mean entering the job details once, preparing a price from agreed rules and giving the team a quote to review and send. Routine requests can move forward, while unusual jobs still get the judgment they need.</p></Prose>
          </div>
          <div className="home-outcome__figure"><QuoteFlow /></div>
        </article>
        <article className="home-outcome" aria-labelledby="outcome-3">
          <div className="home-outcome__text">
            <h3 id="outcome-3">See where the business needs attention while there's still time to act.</h3>
            <Prose><p>A shared view can show which jobs are waiting, what is missing and who needs to act next. Your team can follow up before a delay becomes a customer complaint. When management figures need explaining, the records behind them are available, so the conversation can move toward what to do next.</p></Prose>
          </div>
        </article>
      </Section>

      <Section labelledBy="examples-heading">
        <div className="section__heading"><h2 id="examples-heading">See what I've built with other teams.</h2></div>
        <Prose className="home-work-intro"><p>These engagements show how the work develops from understanding the business into software people can use, with testing, rollout and ownership considered along the way.</p></Prose>
        <ClientWorkFeature nested />
        <div className="work-all"><SecondaryLink to="/work">See a sample of client work</SecondaryLink></div>
      </Section>

      <Section labelledBy="approach-heading">
        <div className="approach">
          <div className="approach__text">
            <div className="section__heading"><h2 id="approach-heading">From an operating problem to a system your team can use.</h2></div>
            <Prose>
              <p>I work through real examples with the people doing the job: what they need to know, which decisions they make, and where the work gets held up. Together, we decide what the system needs to do and what your existing tools can support.</p>
              <p>I then design and build the software or integrations, test them against real work, and work through the exceptions with your team. The build includes a plan for putting it into use and clarity about who will maintain it. If you already have a developer or technology provider, I can work alongside them.</p>
              <p>My focus is on established businesses around $5 million to $25 million in annual revenue, where the owners and operations leaders are ready to invest in how the business runs.</p>
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
              <p>I review the work and systems with your team, then recommend what to change first. You'll understand what your existing tools can handle, where a build would help, and what implementation would involve. We walk through the findings together so you can question the reasoning and decide how to proceed.</p>
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
              <p>You can expect clear explanations and room to question my recommendations. I stay involved as the changes are tested and put into use.</p>
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
