import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Zap, ArrowRight, Camera, Upload } from 'lucide-react';
import Button from '../components/ui/Button';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass p-8 rounded-3xl hover:border-primary/30 transition-colors group"
  >
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{description}</p>
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="py-20 text-center space-y-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            The Future of QR Security
          </div>
          <h1 className="text-7xl font-black tracking-tighter leading-[0.9] text-gradient-primary">
            SafeQR
          </h1>
          <h2 className="text-3xl font-bold tracking-tight text-white/90">
            Context-Aware QR Security Intelligence
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed pt-4">
            Defend against QRishing and physical QR tampering with real-time URL forensics, 
            redirect path analysis, and AI-powered visual context verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-16 px-10 gap-3 text-lg"
            onClick={() => navigate('/scan')}
          >
            <Camera className="w-6 h-6" />
            Scan with Camera
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            className="w-full sm:w-auto h-16 px-10 gap-3 text-lg"
            onClick={() => navigate('/scan')}
          >
            <Upload className="w-6 h-6" />
            Upload Image
          </Button>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <FeatureCard 
          icon={ShieldCheck} 
          title="Physical Analysis" 
          description="Detect microscopic tampering, overlays, and edge anomalies on physical QR prints." 
          delay={0.1}
        />
        <FeatureCard 
          icon={ArrowRight} 
          title="Threat Intelligence" 
          description="Instant reputation checks across 70+ engines with full redirect path extraction." 
          delay={0.2}
        />
        <FeatureCard 
          icon={Eye} 
          title="AI Forensics" 
          description="Cross-references visual branding context with URL destination to stop impersonation." 
          delay={0.3}
        />
      </section>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>
    </div>
  );
};

export default Landing;
