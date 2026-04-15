import React from 'react';

type InputVariant = 'text' | 'email' | 'textarea';

interface InputProps {
  label?: string;
  variant?: InputVariant; // default: 'text'
  error?: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  rows?: number; // for textarea
}

const baseFieldClass =
  'w-full rounded-lg px-3 py-2 text-[14px] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] transition-colors';

const borderStyle = {
  border: '1px solid var(--color-border-default)',
};

const focusClass =
  'focus:border-[var(--color-border-focus)] focus:outline focus:outline-2 focus:outline-[var(--color-border-focus)] focus:outline-offset-[-1px]';

export function Input({
  label,
  variant = 'text',
  error,
  id,
  placeholder,
  value,
  onChange,
  required,
  className = '',
  rows = 4,
}: InputProps) {
  const errorId = error ? `${id}-error` : undefined;

  const fieldProps = {
    id,
    placeholder,
    value,
    required,
    'aria-invalid': error ? (true as const) : undefined,
    'aria-describedby': errorId,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(e.target.value),
    className: [baseFieldClass, focusClass, error ? 'border-red-500' : '', className]
      .filter(Boolean)
      .join(' '),
    style: { ...borderStyle, ...(error ? { borderColor: 'rgb(239 68 68)' } : {}) },
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-[13px] font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {variant === 'textarea' ? (
        <textarea
          {...(fieldProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          rows={rows}
          onChange={(e) => onChange?.(e.target.value)}
        />
      ) : (
        <input
          {...(fieldProps as React.InputHTMLAttributes<HTMLInputElement>)}
          type={variant}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}

      {error && (
        <p id={errorId} className="text-[12px] text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
