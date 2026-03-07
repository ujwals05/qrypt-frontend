import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  History,
  Share2,
  Calendar
} from 'lucide-react';
import { scanResults } from '../mock/scanResults';
import RiskScoreCircle from '../components/results/RiskScoreCircle';
import VerdictBadge from '../components/results/VerdictBadge';
import PhysicalCard from '../components/results/PhysicalCard';
import TechnicalCard from '../components/results/TechnicalCard';
import AIContextCard from '../components/results/AIContextCard';
import RedirectChain from '../components/results/RedirectChain';
import BreakdownBar from '../components/results/BreakdownBar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { cn } from '../components/ui/Button';

const Analysis = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In a real app, we'd check location.state or fetch by ID
    // For demo, we just use the mock result
    const timer = setTimeout(() => {
      setData(scanResults);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  const getVerdictAction = (verdict) => {
    switch (verdict) {
      case 'SAFE':
        return {
          title: "Safe to Proceed",
          message: "Our multi-layer forensic analysis shows no signs of malicious activity or physical tampering. This QR code appears authentic and safe to use.",
          className: "bg-success/10 border-success/30 text-success",
          icon: CheckCircle2
        };
      case 'CRITICAL':
      case 'HIGH_RISK':
        return {
          title: "Proceed with Extreme Caution",
          message: "Forensics detected patterns highly consistent with phishing or malware delivery. The URL destination does not match the visual branding, and physical integrity checks failed.",
          className: "bg-danger/10 border-danger/30 text-danger",
          icon: ShieldAlert
        };
      default:
        return {
          title: "Proceed with Caution",
          message: "Some anomalies were detected during analysis. While not definitively malicious, the source or destination shows signs of risk. Verify the source carefully.",
          className: "bg-warning/10 border-warning/30 text-warning",
          icon: AlertTriangle
        };
    }
  };

  const action = getVerdictAction(data.risk.verdict);
  const ActionIcon = action.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-20"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-text-secondary text-xs font-bold uppercase tracking-[0.2em]">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(data.timestamp).toLocaleDateString()} at {new Date(data.timestamp).toLocaleTimeString()}
          </div>
          <h1 className="text-3xl font-black flex items-center gap-4">
            Analysis Report 
            <span className="text-text-secondary font-mono text-sm tracking-tighter bg-white/5 px-2 py-1 rounded">
              ID: {data.scan_id}
            </span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <History className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Hero Section - Risk Score */}
      <section className="flex flex-col items-center justify-center space-y-8 py-10 glass rounded-[40px] border-white/5 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        
        <RiskScoreCircle score={data.risk.score} />
        
        <div className="text-center space-y-4">
          <VerdictBadge verdict={data.risk.verdict} />
          <p className="text-text-secondary max-w-md mx-auto italic text-sm">
            Based on physical, technical, and visual analysis layers.
          </p>
        </div>
      </section>

      {/* Main Analysis Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PhysicalCard data={data.physical_analysis} />
        <TechnicalCard data={data.url_intelligence} threatIntel={data.threat_intel} />
        <AIContextCard data={data.ai_context} />
      </section>

      {/* Expandable Details */}
      <section className="space-y-6">
        <Card title="Full Redirect Chain" icon={Share2} expandable>
          <RedirectChain chain={data.url_intelligence.redirect_chain} />
        </Card>

        <Card title="Risk Score Breakdown" icon={LayoutGrid} expandable defaultExpanded>
          <div className="space-y-8 p-4">
            <BreakdownBar 
              title="Physical Analysis" 
              score={data.risk.breakdown.physical_score} 
              weight={data.risk.breakdown.physical_weight} 
              contribution={data.risk.breakdown.physical_score * data.risk.breakdown.physical_weight}
              colorClass="bg-purple-500"
            />
            <BreakdownBar 
              title="Threat Intelligence" 
              score={data.risk.breakdown.threat_intel_score} 
              weight={data.risk.breakdown.threat_intel_weight} 
              contribution={data.risk.breakdown.threat_intel_score * data.risk.breakdown.threat_intel_weight}
              colorClass="bg-primary"
            />
            <BreakdownBar 
              title="AI Forensic Context" 
              score={data.risk.breakdown.ai_context_score} 
              weight={data.risk.breakdown.ai_context_weight} 
              contribution={data.risk.breakdown.ai_context_score * data.risk.breakdown.ai_context_weight}
              colorClass="bg-success"
            />
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-center font-bold">
              <span className="text-text-secondary uppercase text-xs">Total Aggregate Risk</span>
              <span className="text-2xl text-primary">{data.risk.score} / 100</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Final Action Box */}
      <section className={cn(
        "p-8 rounded-[32px] border flex flex-col md:flex-row items-center gap-8",
        action.className
      )}>
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center shrink-0">
          <ActionIcon className="w-10 h-10" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-tight">{action.title}</h3>
          <p className="text-sm opacity-80 leading-relaxed font-semibold">
            {action.message}
          </p>
        </div>
        <div className="md:ml-auto">
          <Button 
            className={cn(
              "whitespace-nowrap h-14 px-8 font-black gap-2",
              data.risk.verdict === 'SAFE' ? "bg-success text-black outline-none border-none" : "bg-white/10 text-white"
            )}
          >
            Visit URL anyway <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

// Placeholder for LayoutGrid which was used but not imported
const LayoutGrid = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

export default Analysis;
