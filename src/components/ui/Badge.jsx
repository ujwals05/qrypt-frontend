import { cn } from './Button';

const variants = {
  safe: 'bg-success/10 text-success border-success/20',
  low: 'bg-primary/10 text-primary border-primary/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-danger/10 text-danger border-danger/20',
  unknown: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20'
};

const Badge = ({ 
  children, 
  variant = 'unknown', 
  className,
  dot = true,
  ...props 
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors',
        variants[variant.toLowerCase()] || variants.unknown,
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant.toLowerCase() === 'safe' && 'bg-success shadow-[0_0_8px_rgba(0,255,136,0.5)]',
          variant.toLowerCase() === 'low' && 'bg-primary shadow-[0_0_8px_rgba(0,212,255,0.5)]',
          variant.toLowerCase() === 'medium' && 'bg-warning shadow-[0_0_8px_rgba(255,170,0,0.5)]',
          variant.toLowerCase() === 'high' && 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]',
          variant.toLowerCase() === 'critical' && 'bg-danger shadow-[0_0_8px_rgba(255,68,85,0.5)]',
          (!variant || variant.toLowerCase() === 'unknown') && 'bg-text-secondary'
        )} />
      )}
      {children}
    </span>
  );
};

export default Badge;
