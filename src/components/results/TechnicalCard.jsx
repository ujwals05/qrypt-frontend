import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Link2, Globe, Shield, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../ui/Button';

const TechnicalCard = ({ data, threatIntel }) => {
  if (!data) return null;

  return (
    <Card title="URL Intelligence" icon={Globe}>
      <div className="space-y-6">
        {/* URLs */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Original URL</span>
            <p className="text-sm font-mono break-all text-text-primary p-2 bg-white/5 rounded-lg border border-white/5">
              {data.original_url}
            </p>
          </div>
          
          <div className="flex justify-center -my-2">
            <ArrowRight className="w-4 h-4 text-text-secondary rotate-90" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Final Destination</span>
            <p className="text-sm font-mono break-all text-primary p-2 bg-primary/5 rounded-lg border border-primary/10">
              {data.final_url}
            </p>
          </div>
        </div>

        {/* Badges and Attributes */}
        <div className="flex flex-wrap gap-2">
          {data.is_shortener && <Badge variant="medium">Shortener Detected</Badge>}
          <Badge variant={data.ssl.valid ? 'safe' : 'critical'}>
            {data.ssl.valid ? 'Valid SSL' : 'Invalid SSL'}
          </Badge>
          <Badge variant="low" dot={false}>.{data.tld} Top Level Domain</Badge>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-white/5">
            <span className="text-[10px] uppercase font-bold text-text-secondary block mb-1">TLD Risk</span>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-orange-500" 
                style={{ width: `${data.tld_risk_score}%` }} 
              />
            </div>
            <span className="text-xs font-bold block text-right mt-1">{data.tld_risk_score}/100</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <span className="text-[10px] uppercase font-bold text-text-secondary block mb-1">Domain Entropy</span>
            <div className="flex items-end gap-1 mt-2">
              <span className="text-lg font-bold leading-none">{data.domain_entropy}</span>
              <span className="text-[10px] text-text-secondary pb-0.5">/ 8.0</span>
            </div>
          </div>
        </div>

        {/* Threat Intel */}
        {threatIntel && (
          <div className={cn(
            "p-4 rounded-xl border",
            threatIntel.malicious_count > 0 ? "bg-danger/5 border-danger/20" : "bg-success/5 border-success/20"
          )}>
            <div className="flex items-center gap-3 mb-3">
              <Shield className={cn(
                "w-5 h-5",
                threatIntel.malicious_count > 0 ? "text-danger" : "text-success"
              )} />
              <span className="text-sm font-bold uppercase tracking-wider">Threat Intelligence</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-text-secondary">Scanning Engines</span>
              <span className="text-xs font-bold">{threatIntel.malicious_count}/{threatIntel.total_engines} Flagged</span>
            </div>

            {threatIntel.previously_seen > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-danger/20 rounded-lg text-danger">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase">Reported {threatIntel.previously_seen} times previously</span>
              </div>
            )}
          </div>
        )}

        {/* Suspicious Keywords */}
        {data.suspicious_keywords.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-text-secondary">Suspicious Patterns</span>
            <div className="flex flex-wrap gap-1.5">
              {data.suspicious_keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-danger/10 text-danger text-[10px] font-mono border border-danger/10">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TechnicalCard;
