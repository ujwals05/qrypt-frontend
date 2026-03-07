import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ShieldAlert, Eye, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';

const AIContextCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card title="AI Forensic Analysis" icon={ShieldAlert}>
      <div className="space-y-6">
        {/* Brand Check */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-text-secondary" />
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary block">Detected Brand</span>
              <span className="text-sm font-bold">{data.expected_brand}</span>
            </div>
          </div>
          <Badge variant={data.url_match.toLowerCase()}>
            {data.url_match} Match
          </Badge>
        </div>

        {/* Visual Context */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase text-primary">Visual Context</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            {data.visual_context}
          </p>
        </div>

        {/* Impersonation Probability */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-xs font-bold uppercase">Impersonation Risk</span>
            </div>
            <span className="text-sm font-bold text-warning">{Math.round(data.impersonation_probability * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-warning glow-warning"
              initial={{ width: 0 }}
              animate={{ width: `${data.impersonation_probability * 100}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>

        {/* AI Explanation */}
        <div className="pt-2">
          <p className="text-xs italic text-text-secondary bg-white/5 p-3 rounded-lg border-l-2 border-primary/30">
            {data.explanation}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-[10px] text-text-secondary uppercase">Analysis Confidence</span>
          <span className="text-[10px] font-bold">{Math.round(data.confidence * 100)}%</span>
        </div>
      </div>
    </Card>
  );
};

export default AIContextCard;
