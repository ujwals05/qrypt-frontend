import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  ShieldAlert, 
  Share2, 
  Database, 
  Fingerprint, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { cn } from '../ui/Button';

const STAGES = [
  { id: 1, text: "Extracting QR code...", icon: QrCode },
  { id: 2, text: "Checking physical integrity...", icon: Fingerprint },
  { id: 3, text: "Analyzing redirects...", icon: Share2 },
  { id: 4, text: "Querying threat intelligence...", icon: Database },
  { id: 5, text: "Running AI forensic analysis...", icon: ShieldAlert }
];

const StageProgress = ({ onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStage, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {STAGES.map((stage, index) => {
        const isCompleted = index < currentStage;
        const isActive = index === currentStage;
        const isPending = index > currentStage;
        const Icon = stage.icon;

        return (
          <div 
            key={stage.id}
            className={cn(
              "flex flex-col gap-2 transition-all duration-300",
              isPending ? "opacity-30 translate-x-4" : "opacity-100 translate-x-0"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  isCompleted ? "bg-success/20 text-success" : 
                  isActive ? "bg-primary/20 text-primary" : "bg-white/5 text-text-secondary"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "font-medium",
                  isActive ? "text-text-primary" : "text-text-secondary"
                )}>
                  {stage.text}
                </span>
              </div>
              
              {isActive && (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              )}
            </div>
            
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  isCompleted ? "bg-success" : isActive ? "bg-primary" : "bg-transparent"
                )}
                initial={{ width: 0 }}
                animate={{ width: isCompleted ? "100%" : isActive ? "70%" : "0%" }}
                transition={{ 
                  duration: isCompleted ? 0.3 : 0.8,
                  ease: isActive ? "linear" : "easeOut"
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StageProgress;
