import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ClientWorkFeature } from '../components/ClientWorkFeature';

export default function ClientWorkPage() {
  usePageMeta('Client Work | Patrick McHeyser', 'Explore software, automation and AI built by Patrick McHeyser around real operating work.', '/work');
  return <>
    <Section first className="hero"><div className="hero__text">
      <h1>Client work</h1>
      <p className="lead">Software, automation and AI built around the work a business needs to do. Explore the operating problem, the system behind the change and the work it takes on.</p>
    </div></Section>
    <Section><ClientWorkFeature /></Section>
    <Section className="closing" labelledBy="work-contact"><h2 id="work-contact">Have a similar problem?</h2>
      <Prose><p>Tell me which part of the work needs to get easier.</p></Prose>
      <div className="work-actions"><ButtonLink to="/contact">Let's talk</ButtonLink><SecondaryLink to="/working-together">How we work together</SecondaryLink></div>
    </Section>
  </>;
}
