import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';

const BreakdownBar = ({ title, score, weight, contribution, colorClass = 'bg-primary' }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-text-secondary">
        <span>{title}</span>
        <span>Score: {score} × {weight} = {contribution.toFixed(1)}</span>
      </div>
      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          className={cn("h-full", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default BreakdownBar;
