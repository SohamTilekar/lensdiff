import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-95 cursor-pointer',
          {
            'bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-sm': variant === 'primary',
            'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700': variant === 'secondary',
            'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-slate-100': variant === 'ghost',
            'border border-slate-700 hover:border-slate-500 text-slate-200 bg-transparent': variant === 'outline',
            'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30': variant === 'danger',
          },
          {
            'text-xs px-2.5 py-1.5 h-8': size === 'sm',
            'text-sm px-4 py-2 h-10': size === 'md',
            'text-base px-6 py-2.5 h-12': size === 'lg',
            'p-2 w-9 h-9 justify-center': size === 'icon',
          },
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
