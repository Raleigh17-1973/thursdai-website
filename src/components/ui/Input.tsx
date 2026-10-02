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
  'w-full rounded-[2px] px-3.5 py-2.5 text-[15px] bg-[var(--color-surface-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors';

const borderStyle = {
  border: '1px solid var(--color-border-strong)',
};

const focusClass =
  'focus-visible:border-[var(--color-border-focus)] focus-visible:outline-2 focus-visible:outline-[var(--color-border-focus)] focus-visible:outline-offset-2';

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
    className: [baseFieldClass, focusClass, className]
      .filter(Boolean)
      .join(' '),
    style: { ...borderStyle, ...(error ? { borderColor: 'var(--status-flag)' } : {}) },
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] font-medium"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5" style={{ color: 'var(--status-flag)' }}>
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
        <p id={errorId} className="text-[14px]" style={{ color: 'var(--status-flag)' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
