import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { HTMLAttributes, InputHTMLAttributes, useRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelClassName?: string;
  className?: string;
  containerClassName?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  label?: string;
  message?: string;
  error?: boolean;
  color?: 'sky';
  clear?: () => void;
  required?: boolean;
  isBgWhite?: boolean;
}

const colorClasses = {
  sky: 'border-gray-300 focus:ring-sky-400 focus:border-sky-400',
};

export default function Input({
  labelClassName,
  className,
  containerClassName,
  containerProps,
  label,
  message,
  error = false,
  color = 'sky',
  clear,
  required = false,
  name,
  type,
  value,
  isBgWhite = false,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx(containerClassName, 'relative text-left')} {...containerProps}>
      {label !== undefined && (
        <label
          htmlFor={name}
          className={clsx('block text-lg font-medium lg:text-xl', labelClassName)}
        >
          <span>{label}</span>
          {required && (
            <span className="text-cox500 absolute ml-1 translate-x-1 translate-y-0.5 text-sm">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative mt-4 rounded-xl shadow-sm">
        <input
          ref={ref}
          type={type ?? 'text'}
          name={name}
          className={clsx(
            className,
            'block w-full rounded-xl pr-10 text-base focus:outline-none',
            {
              [colorClasses[color]]: !error,
              'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500':
                error,
            },
            {
              'disabled:bg-gray-100': !isBgWhite,
              'disabled:bg-white': isBgWhite,
            },
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={name && error ? `${name}-error` : undefined}
          value={value}
          {...props}
        />
        {error && type !== 'password' && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
        {type === 'password' && value && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={(e) => {
              e.preventDefault();
              if (clear) clear();
            }}
            aria-label="Erase"
          >
            <XIcon
              className={clsx('h-5 w-5', {
                'text-red-500': error,
              })}
            />
          </button>
        )}
      </div>
      {message !== undefined && (
        <p
          className={clsx('mt-2 text-sm font-medium', {
            'text-gray-500': !error,
            'text-red-400': error,
          })}
          id={name && error ? `${name}-error` : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}
