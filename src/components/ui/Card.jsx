import { useState } from 'react';
import { cn } from './Button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ 
  title, 
  icon: Icon, 
  children, 
  className, 
  expandable = false,
  defaultExpanded = false,
  actions,
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        'glass rounded-xl overflow-hidden transition-all duration-300',
        className
      )}
      {...props}
    >
      {(title || Icon) && (
        <div 
          className={cn(
            'px-5 py-4 border-b border-white/10 flex items-center justify-between',
            expandable && 'cursor-pointer hover:bg-white/5'
          )}
          onClick={() => expandable && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-primary" />}
            {title && <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">{title}</h3>}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            {expandable && (
              isExpanded ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />
            )}
          </div>
        </div>
      )}
      
      <AnimatePresence initial={false}>
        {(!expandable || isExpanded) && (
          <motion.div
            initial={expandable ? { height: 0, opacity: 0 } : false}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
