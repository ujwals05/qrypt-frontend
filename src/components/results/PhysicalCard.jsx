import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Fingerprint, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../ui/Button';

const PhysicalCard = ({ data }) => {
  if (!data) return null;

  return (
    <Card 
      title="Physical Layer" 
      icon={Fingerprint}
      expandable
      actions={
        <Badge variant={data.tampered ? 'critical' : 'safe'}>
          {data.tampered ? 'Tampered' : 'Intact'}
        </Badge>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Analysis Confidence</span>
          <span className="text-sm font-bold text-primary">{data.confidence}%</span>
        </div>
        
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-sm text-text-secondary">
          "{data.evidence}"
        </div>

        <div className="space-y-3 pt-2">
          {Object.entries(data.checks).map(([key, check]) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                {check.triggered ? 
                  <XCircle className="w-4 h-4 text-danger" /> : 
                  <CheckCircle2 className="w-4 h-4 text-success" />
                }
                <span className="text-xs font-mono uppercase tracking-tight">
                  {key.replace('_', ' ')}
                </span>
              </div>
              <span className={cn(
                "text-xs font-bold",
                check.triggered ? "text-danger" : "text-success"
              )}>
                {check.confidence}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PhysicalCard;
