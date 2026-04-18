import type { Modality } from '@/types';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'modality' | 'discount' | 'new' | 'featured';
  modality?: Modality;
  className?: string;
}

const modalityStyles: Record<Modality, string> = {
  'En Vivo':   'bg-white/90 text-adipa-purple backdrop-blur-sm border border-white/50',
  'Online':    'bg-white/90 text-adipa-cyan-600 backdrop-blur-sm border border-white/50',
  'Presencial':'bg-white/90 text-adipa-orange-600 backdrop-blur-sm border border-white/50',
};

const modalityDots: Record<Modality, string> = {
  'En Vivo':   'bg-adipa-purple',
  'Online':    'bg-adipa-cyan',
  'Presencial':'bg-adipa-orange',
};

export function Badge({ children, variant = 'default', modality, className }: BadgeProps) {
  if (variant === 'modality' && modality) {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
          modalityStyles[modality],
          className,
        )}
      >
        <span className={clsx('h-1.5 w-1.5 rounded-full', modalityDots[modality])} />
        {children}
      </span>
    );
  }

  if (variant === 'discount') {
    return (
      <span
        className={clsx(
          'rounded-md bg-adipa-red px-2 py-0.5 text-xs font-bold text-white',
          className,
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === 'new') {
    return (
      <span
        className={clsx(
          'rounded-full bg-adipa-cyan px-2.5 py-1.5 text-xs font-bold text-white',
          className,
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === 'featured') {
    return (
      <span
        className={clsx(
          'rounded-full bg-adipa-orange px-2.5 py-1.5 text-xs font-bold text-white',
          className,
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full bg-adipa-purple-100 px-3 py-1 text-xs font-medium text-adipa-purple',
        className,
      )}
    >
      {children}
    </span>
  );
}
