import { SecondaryLink } from './Button';
import { Eyebrow } from './Section';
import { clientStories } from '../content/clientStories';

type WorkSummary = { slug: string; client: string; title: string; summary: string };

export function ClientWorkCard({ story, nested = false, featured = false }: { story: WorkSummary; nested?: boolean; featured?: boolean }) {
  const Heading = nested ? 'h3' : 'h2';
  return (
    <article className={featured ? 'work-feature' : 'work-story-card'} aria-labelledby={`${story.slug}-title`}>
      <Eyebrow>{story.client}</Eyebrow>
      <Heading className="card__title" id={`${story.slug}-title`}>{story.title}</Heading>
      <p>{story.summary}</p>
      <SecondaryLink to={`/work/${story.slug}`}>See the work</SecondaryLink>
    </article>
  );
}

/** The same two lead engagements appear on Home and the Client Work index. */
export function ClientWorkFeature({ nested = false }: { nested?: boolean }) {
  return <ul className="cards cards--2 work-features">
    {clientStories.filter(story => story.featured).map(story => <li className="card" key={story.slug}>
      <ClientWorkCard story={story} nested={nested} featured />
    </li>)}
  </ul>;
}
