import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { clientStories } from '../content/clientStories';

function Paragraph({ text }: { text: string }) {
  const lead = text.match(/^\*\*(.+?)\*\* (.*)$/);
  return <p>{lead ? <><strong>{lead[1]}</strong> {lead[2]}</> : text}</p>;
}

export default function ClientStoryPage({ slug }: { slug: typeof clientStories[number]['slug'] }) {
  const story = clientStories.find(item => item.slug === slug)!;
  usePageMeta(story.metaTitle, story.description, `/work/${story.slug}`);
  return <>
    <Section first className="hero work-story-hero">
      <SecondaryLink to="/work">All client work</SecondaryLink>
      <div className="hero__text"><p className="work-client">{story.label}</p>
        <h1>{story.title}</h1><p className="lead">{story.paragraphs[0]}</p>
      </div>
    </Section>
    <Section>
      <Prose>{story.paragraphs.slice(1).map(text => <Paragraph key={text} text={text} />)}</Prose>
      {'diagram' in story && <figure className="story-diagram" aria-labelledby="story-diagram-caption">
        <img className="story-diagram__image" src={story.diagram.src} alt={story.diagram.alt} />
        <div className="story-diagram__mobile">
          <p>{story.diagram.alt}</p>
          <dl>{story.diagram.groups.map(group => <div key={group.label}>
            <dt>{group.label}</dt><dd>{group.details.join('. ')}</dd>
          </div>)}</dl>
        </div>
        <figcaption id="story-diagram-caption">{story.diagram.caption} <a href={story.diagram.src}>View full diagram</a></figcaption>
      </figure>}
      {'table' in story && <div className="story-work-list">
        {story.table.rows.map(row => <dl key={row[0]}>{row.map((cell, i) => <div key={cell}>
          <dt>{story.table.headers[i]}</dt><dd>{cell}</dd>
        </div>)}</dl>)}
      </div>}
    </Section>
    <Section className="closing" labelledBy="work-contact"><h2 id="work-contact">Have a similar problem?</h2>
      <Prose><p>Tell me which part of the work needs to get easier.</p></Prose>
      <div className="work-actions"><ButtonLink to="/contact">Let's talk</ButtonLink><SecondaryLink to="/working-together">How we work together</SecondaryLink></div>
    </Section>
  </>;
}
