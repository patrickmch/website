import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../lib/asset';
import { Section, Prose } from '../components/Section';
import { ButtonLink } from '../components/Button';
import { ProofSlot } from '../components/ProofSlot';

export default function AboutPage() {
  usePageMeta(
    'About Patrick McHeyser',
    'Meet Patrick McHeyser, a Boulder-based software engineer and operations consultant who works directly with your team to understand problems and implement improvements.',
    '/about'
  );

  return (
    <>
      <Section first className="hero">
        <div className="about-hero">
          <div className="about-hero__text hero__text">
            <h1>Hi, I'm Patrick McHeyser.</h1>
            <p className="lead">
              I help owners and operations leaders improve how their businesses run and build the capacity to grow.
              My background spans software engineering, customer success, and executive leadership development.
            </p>
            <p>I'm based in Boulder, Colorado. You'll work directly with me.</p>
          </div>
          <div className="about-hero__photo">
            <img
              className="portrait"
              src={asset("patrick-dog-800.jpg")}
              srcSet={`${asset("patrick-dog-800.jpg")} 800w, ${asset("patrick-dog-1600.jpg")} 1600w`}
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
              <h2 id="story-heading">A background in software and executive leadership development.</h2>
            </div>
            <Prose>
              <p>
                I started in customer success, helping business customers use software to do their jobs. I taught
                myself to code and moved into engineering, eventually becoming a senior software engineer. I built
                internal tools and marketing systems, working directly with the people who relied on them.
              </p>
              <p>
                Over nearly seven years at NOLS, I led expeditions and later supervised leadership programs.
                Participants included executives from Fortune 500 companies, military special operations personnel,
                and MBA students. The work involved helping people make decisions, communicate, and lead teams in
                unfamiliar situations.
              </p>
              <p>
                I also managed instructor training, coordinated program logistics across international locations,
                and used client feedback to improve how the programs ran.
              </p>
            </Prose>
          </div>
          <div className="bio__photo">
            <img
              className="portrait"
              src={asset("patrick-ridge-800.jpg")}
              srcSet={`${asset("patrick-ridge-800.jpg")} 800w, ${asset("patrick-ridge-1200.jpg")} 1200w`}
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
          <h2 id="how-heading">What that experience brings to your business</h2>
        </div>
        <Prose>
          <p>
            I'm comfortable talking through a decision with an owner, working out the details with the team, and
            building the software myself. I pay attention to what people need to do their jobs, where responsibilities
            are unclear, and what makes a change difficult to put into practice.
          </p>
          <p>
            You can expect clear explanations, room to question my recommendations, and direct involvement as we
            put the changes to work. My aim is to leave your team with something they understand and can use with
            confidence.
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
