import React from 'react';
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';

const getScoreColor = (score) => {
  if (score < 40) return '#00ff88'; // Success
  if (score < 60) return '#ffaa00'; // Warning
  if (score < 80) return '#f97316'; // Orange-500
  return '#ff4455'; // Danger
};

const RiskScoreCircle = ({ score = 0, size = 280 }) => {
  const data = [
    { name: 'score', value: score, fill: getScoreColor(score) }
  ];

  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="75%" 
          outerRadius="100%" 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            cornerRadius={size / 2}
            background={{ fill: 'rgba(255,255,255,0.05)' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl font-black font-mono tracking-tighter"
          style={{ color: getScoreColor(score) }}
        >
          {score}
        </motion.span>
        <span className="text-text-secondary uppercase tracking-widest text-xs font-bold mt-1 opacity-60">
          Risk Score
        </span>
      </div>
      
      {/* Decorative Glow */}
      <div 
        className="absolute inset-4 rounded-full -z-10 blur-3xl opacity-20"
        style={{ backgroundColor: getScoreColor(score) }}
      />
    </div>
  );
};

export default RiskScoreCircle;
