import { Fragment, type ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { Section, Prose, Eyebrow } from '../components/Section';
import { ButtonLink, SecondaryLink } from '../components/Button';
import { ManufacturingQuote, ManufacturingReporting, ManufacturingDelivery, SharedContextBuild, SharedContextAnswer, PsycheFollowThrough } from '../components/diagrams/ClientStories';
import { clientStories } from '../content/clientStories';

type Slug = (typeof clientStories)[number]['slug'];

/**
 * The figures each story carries, keyed by the index of the paragraph they follow,
 * so each sits under the subheading it illustrates. A section with nothing a drawing
 * would add has no figure.
 */
const figuresAfter: Partial<Record<Slug, Record<number, ReactNode>>> = {
  'manufacturing-systems': { 2: <ManufacturingQuote />, 3: <ManufacturingReporting />, 4: <ManufacturingDelivery /> },
  'shared-context': { 2: <SharedContextBuild />, 4: <SharedContextAnswer /> },
  'psyche-digital': { 2: <PsycheFollowThrough /> },
};

/** Body paragraphs grouped into runs, each run ending where a figure goes. */
function groups(paragraphs: readonly string[], figures: Record<number, ReactNode> | undefined) {
  const runs: { texts: string[]; figure?: ReactNode }[] = [{ texts: [] }];
  paragraphs.forEach((text, i) => {
    const index = i + 1; // the lead paragraph is index 0 and lives in the hero
    runs[runs.length - 1].texts.push(text);
    const figure = figures?.[index];
    if (figure) {
      runs[runs.length - 1].figure = figure;
      runs.push({ texts: [] });
    }
  });
  return runs.filter((run) => run.texts.length > 0 || run.figure);
}

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
        {groups(story.paragraphs.slice(1), figuresAfter[story.slug]).map((run, i) => (
          <Fragment key={i}>
            {run.texts.length > 0 && (
              <Prose className="story-body">
                {run.texts.map((text) => (
                  <Body key={text} text={text} />
                ))}
              </Prose>
            )}
            {run.figure}
          </Fragment>
        ))}
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
