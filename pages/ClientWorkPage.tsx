import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ClientWorkCard, ClientWorkFeature } from '../components/ClientWorkFeature';
import { clientStories } from '../content/clientStories';
import { mtroWork } from '../content/mtroWork';

const supportingStories = [
  { slug: 'mtro-pro', client: 'MTRO PRO', title: mtroWork.title, summary: mtroWork.summary },
  ...clientStories.filter(story => !story.featured),
];

export default function ClientWorkPage() {
  usePageMeta('Client Work | Patrick McHeyser', 'Technical leadership, software and AI engagements, from assessment through delivery and team handoff.', '/work');
  return <>
    <Section first className="hero"><div className="hero__text">
      <h1>Client work</h1>
      <p className="lead">A closer look at the work, from the first assessment to building systems and helping the team take them on.</p>
    </div></Section>
    <Section><ClientWorkFeature /></Section>
    <Section labelledBy="more-work-heading">
      <div className="section__heading"><h2 id="more-work-heading">More client work</h2></div>
      <ul className="cards cards--2">
        {supportingStories.map(story => <li className="card" key={story.slug}>
          <ClientWorkCard story={story} nested />
        </li>)}
      </ul>
    </Section>
    <Section className="closing" labelledBy="work-contact"><h2 id="work-contact">Have a similar problem?</h2>
      <Prose><p>Tell me which part of the work needs to get easier.</p></Prose>
      <div className="cta-row"><ButtonLink to="/contact">Let's talk</ButtonLink><SecondaryLink to="/working-together">How we work together</SecondaryLink></div>
    </Section>
  </>;
}
