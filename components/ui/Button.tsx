import { clsx } from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-adipa-purple text-white hover:bg-adipa-cyan active:bg-adipa-cyan-600 shadow-sm hover:shadow-md hover:shadow-adipa-cyan/25',
  secondary:
    'bg-white text-adipa-purple border-2 border-adipa-purple hover:bg-adipa-cyan hover:border-adipa-cyan hover:text-white',
  outline:
    'border border-adipa-gray-200 bg-transparent text-adipa-gray-700 hover:border-adipa-purple hover:text-adipa-purple dark:border-adipa-gray-700 dark:text-white',
  ghost:
    'bg-transparent text-adipa-gray-700 hover:bg-adipa-purple-50 hover:text-adipa-purple dark:text-white',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[7px] font-semibold',
        'transition-all duration-200 ease-in-out',
        'focus-visible:outline-2 focus-visible:outline-adipa-purple focus-visible:outline-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Enviando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
