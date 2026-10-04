import { Figure, Flow, Stack, Node, Fan } from '../Figure';
import { PenCircle } from '../marks/PenCircle';
import { PenTick } from '../marks/PenTick';

const rows = [
  { key: 'Customer name', missing: false },
  { key: 'Site address', missing: false },
  { key: 'Contact', missing: false },
  { key: 'PO number', missing: true },
  { key: 'Start date', missing: false },
];

/** Fig. 4: customer paperwork with less retyping. */
export function Paperwork() {
  return (
    <Figure
      n={4}
      caption="Information collected once carries into the documents. Missing details are flagged before anything goes out. Illustrative."
      description="A customer record lists five fields: customer name, site address, contact, PO number, and start date. All are on file except the PO number, which is empty, circled, and flagged as missing. Arrows carry the record into three documents: a work order, a contract, and an invoice. A note beneath says the paperwork is checked by a person before it goes out."
    >
      <Flow>
        <div className="record">
          <div className="record__title">Customer record</div>
          {rows.map((row) => (
            <div key={row.key} className={`record__row ${row.missing ? 'record__row--marked' : ''}`}>
              <span className="record__key">{row.key}</span>
              {row.missing ? (
                <span className="record__val">
                  <span className="record__gap" aria-hidden="true" />
                  <span className="record__flag">flagged: missing</span>
                </span>
              ) : (
                <span className="record__val">
                  <PenTick />
                  on file
                </span>
              )}
              {row.missing && <PenCircle padX={8} padY={5} />}
            </div>
          ))}
        </div>
        <Fan count={3} direction="out" />
        <Stack className="stack--docs">
          <Node label="Work order" small />
          <Node label="Contract" small />
          <Node label="Invoice" small />
        </Stack>
      </Flow>
      <p className="resolved-line">
        <PenTick />
        Checked by a person before it goes out.
      </p>
    </Figure>
  );
}
