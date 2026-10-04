import { useReviewMode } from '../hooks/useReviewMode';

/**
 * A placeholder for real, approved proof (a testimonial or a sample
 * deliverable). Visible in review mode so placement can be judged.
 * Renders nothing on the published site.
 */
export function ProofSlot({
  kind,
  note,
  className = '',
}: {
  kind: 'quote' | 'sample';
  note: string;
  className?: string;
}) {
  const review = useReviewMode();
  if (!review) return null;

  return (
    <div className={`proof-slot proof-slot--${kind} ${className}`} role="note">
      <p className="proof-slot__label">PROOF SLOT: {kind === 'quote' ? 'TESTIMONIAL' : 'SAMPLE DELIVERABLE'}</p>
      <p className="proof-slot__note">{note}</p>
      <p className="proof-slot__hint">
        Shown in review mode only. The published site renders nothing here until real, approved material exists.
      </p>
    </div>
  );
}
