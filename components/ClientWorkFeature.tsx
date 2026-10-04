import { SecondaryLink } from './Button';
import { MtroPreview } from './diagrams/MtroOperations';
import { mtroWork } from '../content/mtroWork';

export function ClientWorkFeature({ nested = false }: { nested?: boolean }) {
  const Heading = nested ? 'h3' : 'h2';
  return <article className="work-feature" aria-labelledby="mtro-feature-title">
    <div className="work-feature__text">
      <p className="work-client">MTRO PRO</p>
      <Heading id="mtro-feature-title">{mtroWork.title}</Heading>
      <p>{mtroWork.summary}</p>
      <SecondaryLink to="/work/mtro-pro">See the work</SecondaryLink>
    </div>
    <MtroPreview n={nested ? 3 : 1} />
  </article>;
}
