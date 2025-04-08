'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface AccessibleInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ label, hint, id, className = '', ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="mb-4">
        <label 
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium"
        >
          {label}
        </label>
        <input
          {...props}
          id={inputId}
          ref={ref}
          className={`tg-input ${className}`}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />
        {hint && (
          <p 
            id={`${inputId}-hint`}
            className="tg-hint mt-1"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput'; 