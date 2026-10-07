import type { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ManufacturingDelivery, ManufacturingReporting, SharedContext } from '../components/diagrams/ClientStories';
import { clientStories } from '../content/clientStories';

type Slug = (typeof clientStories)[number]['slug'];

/** The figures each story carries, placed after its body text. */
const figures: Partial<Record<Slug, ReactNode>> = {
  'manufacturing-systems': (
    <>
      <ManufacturingDelivery />
      <ManufacturingReporting />
    </>
  ),
  'shared-context': <SharedContext />,
};

/**
 * A body block. A short bulleted list supports the surrounding narrative.
 * A bold lead-in in a paragraph becomes a heading over its
 * paragraph (spec 3.2): an H2 set at H3 size, since the page's only heading
 * above it is the H1.
 */
function Body({ text }: { text: string }) {
  if (text.startsWith('- ')) {
    return (
      <ul>
        {text.split('\n').map((item) => (
          <li key={item}>
            {item.slice(2).split(/(\*\*[^*]+\*\*)/g).map((part, index) => (
              part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part
            ))}
          </li>
        ))}
      </ul>
    );
  }
  const lead = text.match(/^\*\*(.+?)\*\* (.*)$/);
  if (!lead) return <p>{text}</p>;
  return (
    <>
      <h2 className="story-body__lead">{lead[1]}</h2>
      <p>{lead[2]}</p>
    </>
  );
}


/** Route wrapper: reads the slug from the URL and sends an unknown slug back to the Client Work index. */
export function ClientStoryRoute() {
  const { slug } = useParams();
  const story = clientStories.find((item) => item.slug === slug);
  if (!story) return <Navigate to="/work" replace />;
  return <ClientStoryPage slug={story.slug} />;
}

export default function ClientStoryPage({ slug }: { slug: Slug }) {
  const story = clientStories.find((item) => item.slug === slug)!;
  usePageMeta(story.metaTitle, story.description, `/work/${story.slug}`);
  return (
    <>
      <Section first className="hero work-story-hero">
        <SecondaryLink to="/work">See a sample of client work</SecondaryLink>
        <div className="hero__text">
          <Eyebrow>{story.label}</Eyebrow>
          <h1>{story.title}</h1>
          <p className="lead">{story.paragraphs[0]}</p>
        </div>
      </Section>

      <Section>
        <Prose className="story-body">
          {story.paragraphs.slice(1).map((text) => (
            <Body key={text} text={text} />
          ))}
        </Prose>
        {figures[story.slug]}
        {'table' in story && (
          <div className="board-wrap story-table">
            <table className="board" role="table">
              <thead role="rowgroup">
                <tr role="row">
                  {story.table.headers.map((header) => (
                    <th key={header} scope="col" role="columnheader">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody role="rowgroup">
                {story.table.rows.map((row) => (
                  <tr key={row[0]} role="row">
                    {row.map((cell, i) => (
                      <td key={cell} role="cell" data-label={story.table.headers[i]}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section className="closing" labelledBy="work-contact">
        <h2 id="work-contact">Have a similar problem?</h2>
        <Prose>
          <p>Tell me which part of the work needs to get easier.</p>
        </Prose>
        <div className="cta-row">
          <ButtonLink to="/contact">Let's talk</ButtonLink>
          <SecondaryLink to="/working-together">How we work together</SecondaryLink>
        </div>
      </Section>
    </>
  );
}
