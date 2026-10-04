import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { MtroOperations } from '../components/diagrams/MtroOperations';
import { mtroWork } from '../content/mtroWork';

export default function MtroWorkPage() {
  usePageMeta('MTRO PRO: Customer Success and QA Automation | Patrick McHeyser', 'How Patrick McHeyser built customer-account research, support intake and browser-based QA for MTRO PRO, a mid-term rental software platform.', '/work/mtro-pro');
  return <>
    <Section first className="hero work-story-hero">
      <SecondaryLink to="/work">All client work</SecondaryLink>
      <div className="hero__text">
        <Eyebrow>MTRO PRO</Eyebrow>
        <p className="small muted story-engagement">Software for mid-term rental operators</p>
        <h1>{mtroWork.title}</h1><p className="lead">{mtroWork.intro}</p>
        <a className="work-external" href="https://mtropro.com/" rel="noopener noreferrer">Visit MTRO PRO</a>
      </div>
    </Section>
    {mtroWork.sections.map((section, index) => <Section key={section.heading} labelledBy={`work-section-${index}`}>
      <div className="section__heading"><h2 id={`work-section-${index}`}>{section.heading}</h2></div>
      <Prose>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Prose>
      {index < 2 && <MtroOperations lane={index as 0 | 1} />}
    </Section>)}
    <Section className="closing" labelledBy="work-contact"><h2 id="work-contact">Have a similar problem?</h2>
      <Prose><p>Tell me which part of the work needs to get easier.</p></Prose>
      <div className="work-actions"><ButtonLink to="/contact">Let's talk</ButtonLink><SecondaryLink to="/working-together">How we work together</SecondaryLink></div>
    </Section>
  </>;
}
