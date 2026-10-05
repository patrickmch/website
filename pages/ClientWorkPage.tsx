import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ClientWorkFeature } from '../components/ClientWorkFeature';
import { clientStories } from '../content/clientStories';

export default function ClientWorkPage() {
  usePageMeta('Client Work | Patrick McHeyser', 'Explore software, automation and AI built by Patrick McHeyser around real operating work.', '/work');
  return <>
    <Section first className="hero"><div className="hero__text">
      <h1>Client work</h1>
      <p className="lead">Software, automation and AI built around the work a business needs to do. Explore the operating problem, the system behind the change and the work it takes on.</p>
    </div></Section>
    <Section><ClientWorkFeature /></Section>
    {clientStories.map(story => <Section key={story.slug}>
      <article className="work-story-card" aria-labelledby={`${story.slug}-title`}>
        <Eyebrow>{story.client}</Eyebrow>
        <h2 id={`${story.slug}-title`}>{story.title}</h2>
        <Prose><p>{story.summary}</p></Prose>
        <SecondaryLink to={`/work/${story.slug}`}>See the work</SecondaryLink>
      </article>
    </Section>)}
    <Section className="closing" labelledBy="work-contact"><h2 id="work-contact">Have a similar problem?</h2>
      <Prose><p>Tell me which part of the work needs to get easier.</p></Prose>
      <div className="cta-row"><ButtonLink to="/contact">Let's talk</ButtonLink><SecondaryLink to="/working-together">How we work together</SecondaryLink></div>
    </Section>
  </>;
}
