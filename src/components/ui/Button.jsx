import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes
 */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variants = {
  primary: 'bg-primary text-black hover:bg-primary/90 glow-primary border-transparent',
  secondary: 'bg-transparent border-border text-text-primary hover:bg-white/5',
  danger: 'bg-danger text-white hover:bg-danger/90 glow-danger border-transparent',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary border-transparent'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base font-bold'
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg border transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
export { cn };
