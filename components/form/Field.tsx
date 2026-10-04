import React from 'react';

type Common = {
  id: string;
  name: string;
  label: string;
  optional?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  autoComplete?: string;
  readOnly?: boolean;
};

type InputProps = Common & {
  as?: 'input';
  type?: 'text' | 'email' | 'url';
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
};

type TextareaProps = Common & {
  as: 'textarea';
  rows?: number;
};

export type FieldProps = InputProps | TextareaProps;

/** A labeled form field with error wiring (aria-describedby, aria-invalid). */
export function Field(props: FieldProps) {
  const { id, name, label, optional = false, error, value, onChange, onBlur, autoComplete, readOnly = false } = props;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
    onBlur,
    autoComplete,
    readOnly,
    className: 'field__input',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': optional ? undefined : true,
  };

  return (
    <div className={`field ${error ? 'field--invalid' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>
      {props.as === 'textarea' ? (
        <textarea {...shared} rows={props.rows ?? 6} />
      ) : (
        <input {...shared} type={props.type ?? 'text'} inputMode={props.inputMode} />
      )}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
