import { SecondaryLink } from './Button';
import { Eyebrow } from './Section';
import { MtroPreview } from './diagrams/MtroOperations';
import { mtroWork } from '../content/mtroWork';

/** The featured MTRO PRO work: text beside its preview figure, on the Home grid the examples used. */
export function ClientWorkFeature({ nested = false }: { nested?: boolean }) {
  const Heading = nested ? 'h3' : 'h2';
  return (
    <article className="example work-feature" aria-labelledby="mtro-feature-title">
      <div className="example__text">
        <Eyebrow>MTRO PRO</Eyebrow>
        <Heading id="mtro-feature-title">{mtroWork.title}</Heading>
        <p>{mtroWork.summary}</p>
        <SecondaryLink to="/work/mtro-pro">See the work</SecondaryLink>
      </div>
      <div className="example__figure">
        <MtroPreview n={nested ? 3 : 1} />
      </div>
    </article>
  );
}
