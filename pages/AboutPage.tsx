import { usePageMeta } from '../hooks/usePageMeta';
import { asset } from '../lib/asset';
import { Section, Prose } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
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
              I work with owners and operations leaders whose businesses are growing faster than their systems and
              processes can handle. I've worked in software engineering, customer success, and executive leadership
              development.
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
                I started in customer success and taught myself to code, eventually becoming a senior software
                engineer. I built custom applications and automated marketing workflows, working directly with
                business teams to translate their needs into working software.
              </p>
              <p>
                At NOLS, I led leadership intensives for Fortune 500 executives, military special operations
                personnel, and participants from Wharton and other leading MBA programs. We used demanding wilderness
                expeditions to practice making decisions, communicating clearly, and leading a team.
              </p>
              <p>
                I also trained and supported instructors, worked with international teams, and coordinated expedition
                logistics. Alongside handling emergencies and evacuations, I gave difficult performance feedback and
                helped instructors develop their judgment. I used my software skills to automate repetitive work, too.
                I still draw on that experience when a technical change depends on people learning new ways to work
                together.
              </p>
            </Prose>
          </div>
          <div className="bio__photo">
            <img
              className="portrait"
              src={asset("patrick-ridge-thumbs-up-single-rope-800.jpg")}
              srcSet={`${asset("patrick-ridge-thumbs-up-single-rope-800.jpg")} 800w, ${asset("patrick-ridge-thumbs-up-single-rope-1088.jpg")} 1088w`}
              sizes="350px"
              width={800}
              height={1065}
              loading="lazy"
              decoding="async"
              alt="Patrick McHeyser giving a thumbs-up in a climbing helmet on a mountain ridge."
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
            I'll explain my recommendations and work through your questions with you. When we put a change in place, I
            want your team to understand how it works and feel confident using it.
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
        <div className="cta-row">
          <ButtonLink to="/contact">Let's talk</ButtonLink>
          <SecondaryLink to="/work">See how I've worked with others</SecondaryLink>
        </div>
      </Section>
    </>
  );
}
