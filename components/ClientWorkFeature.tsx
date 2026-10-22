import { SecondaryLink } from './Button';
import { Eyebrow } from './Section';

type WorkSummary = { slug: string; client: string; title: string; summary: string };

const featuredClientStories: readonly WorkSummary[] = [
  {
    slug: 'manufacturing-systems',
    client: 'Custom manufacturing',
    title: 'From a complex quoting workbook to company-owned software and fractional CTO leadership.',
    summary: 'A systems assessment for a custom manufacturer grew into an ongoing fractional CTO role on the management team. The work spans a custom quoting and intake application, management reporting tied directly to ERP source records, and moving critical infrastructure into company custody.',
  },
  {
    slug: 'shared-context',
    client: 'Healthcare services',
    title: "Architecting the cloud engine that powers a healthcare team's 28+ AI workflows and morning operations.",
    summary: 'A healthcare services team had core software, documented SOPs, and operators building AI workflows, and needed an outside architect to connect their systems. I built a cloud data and orchestration engine that unifies four systems and thousands of PDFs nightly, powers 28+ operational workflows and scheduled morning case audits, and lets operations leaders publish new workflows themselves.',
  },
];

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
    {featuredClientStories.map(story => <li className="card" key={story.slug}>
      <ClientWorkCard story={story} nested={nested} featured />
    </li>)}
  </ul>;
}
