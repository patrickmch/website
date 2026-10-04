import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';

export default function AboutPage() {
  usePageMeta(
    'About Patrick McHeyser',
    'Meet Patrick McHeyser, a Boulder-based software engineer and operations consultant who works directly with your team to understand problems and implement improvements.'
  );

  return (
    <>
      <Section first className="hero">
        <div className="about-hero">
          <div className="about-hero__text hero__text">
            <h1>Hi, I'm Patrick McHeyser.</h1>
            <p className="lead">
              I help owners and operations leaders make their businesses easier to run and better able to grow. My
              work combines understanding the operation with building the software and systems that help it work
              better.
            </p>
            <p>I'm based in Boulder, Colorado. You'll work directly with me.</p>
          </div>
          <div className="about-hero__photo">
            <img
              className="portrait"
              src="/patrick-dog-800.jpg"
              srcSet="/patrick-dog-800.jpg 800w, /patrick-dog-1600.jpg 1600w"
              sizes="(min-width: 1024px) 350px, (min-width: 768px) 40vw, 100vw"
              width={800}
              height={1200}
              decoding="async"
              alt="Patrick McHeyser, smiling, holding a black and white spotted dog."
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="story-heading">
        <div className="bio">
          <div className="bio__text">
            <div className="section__heading">
              <h2 id="story-heading">I came to software through customer success.</h2>
            </div>
            <Prose>
              <p>
                I taught myself to code and made the move from customer success to software engineering, eventually
                working as a senior engineer. My background also includes seven years leading international leadership
                programs with NOLS.
              </p>
              <p>
                In my consulting work, I spend time with the people responsible for the outcome and the people doing
                the work. Both have information I need: what the business is trying to accomplish, and what happens
                when a request is incomplete, a system doesn't have the answer, or the usual person is away.
              </p>
              <p>That understanding informs what I recommend and what I build.</p>
            </Prose>
          </div>
          <div className="bio__photo">
            <img
              className="portrait"
              src="/patrick-ridge-800.jpg"
              srcSet="/patrick-ridge-800.jpg 800w, /patrick-ridge-1200.jpg 1200w"
              sizes="350px"
              width={800}
              height={1064}
              loading="lazy"
              decoding="async"
              alt="Patrick McHeyser in a climbing helmet on a mountain ridge."
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="how-heading">
        <div className="section__heading">
          <h2 id="how-heading">How I work with your team</h2>
        </div>
        <Prose>
          <p>
            I'll ask to see recent examples and have people walk me through the job. I want to understand the
            workarounds as well as the documented process.
          </p>
          <p>
            I'll explain what I find, what I recommend, and what still needs checking. You'll have a chance to
            challenge the assumptions before committing to the next step.
          </p>
          <p>
            When we're implementing a change, I build and test it with the people who will use it. We work through
            the exceptions and agree on how it will be supported once it's in place.
          </p>
        </Prose>
        <ProofSlot
          kind="quote"
          className="sprint-proof"
          note="Approved testimonial that supports these working-style claims."
        />
      </Section>

      <Section labelledBy="closing-heading" className="closing">
        <h2 id="closing-heading">Let's talk about what you want to improve.</h2>
        <ButtonLink to="/contact">Let's talk</ButtonLink>
      </Section>
    </>
  );
}
