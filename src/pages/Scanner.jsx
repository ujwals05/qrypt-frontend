import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, LayoutGrid, FileImage } from 'lucide-react';
import CameraScanner from '../components/scan/CameraScanner';
import ImageUploader from '../components/scan/ImageUploader';
import StageProgress from '../components/scan/StageProgress';
import { cn } from '../components/ui/Button';
import { scanQRImage } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Scanner = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('camera'); // 'camera' | 'upload'
  const [isScanning, setIsScanning] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleScan = async (file) => {
    setIsScanning(true);
    setShowProgress(true);
    
    try {
      // API call will happen here, but we'll show progress first
      await scanQRImage(file);
      // Data is pre-fetched, navigation happens after progress completion
    } catch (err) {
      console.error(err);
      setIsScanning(false);
      setShowProgress(false);
    }
  };

  const handleProgressComplete = () => {
    navigate('/analysis');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black">Security Scanner</h1>
        <p className="text-text-secondary">Choose your scan method to begin forensic analysis</p>
      </div>

      <AnimatePresence mode="wait">
        {!showProgress ? (
          <motion.div
            key="interface"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* Tabs */}
            <div className="flex p-1.5 glass rounded-2xl w-full max-w-sm mx-auto">
              <button
                onClick={() => setMode('camera')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300",
                  mode === 'camera' ? "bg-primary text-black font-bold shadow-lg" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Camera className="w-4 h-4" />
                Live Camera
              </button>
              <button
                onClick={() => setMode('upload')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300",
                  mode === 'upload' ? "bg-primary text-black font-bold shadow-lg" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
            </div>

            {/* Main Surface */}
            <div className="glass rounded-[32px] p-8 sm:p-12 min-h-[500px] flex flex-col items-center justify-center">
              {mode === 'camera' ? (
                <div className="space-y-8 w-full text-center">
                  <CameraScanner isScanning={isScanning} onScanComplete={handleScan} />
                  {!isScanning && (
                    <div className="animate-bounce inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest text-primary">
                      Position QR to Scan
                    </div>
                  )}
                </div>
              ) : (
                <ImageUploader onUpload={handleScan} />
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[32px] p-12 sm:p-20 flex flex-col items-center justify-center min-h-[600px]"
          >
            <div className="w-full max-w-md space-y-12">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl mx-auto flex items-center justify-center">
                  <LayoutGrid className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-widest">Analysis in Progress</h2>
                <p className="text-text-secondary text-sm">Our engines are running multi-layer security checks</p>
              </div>
              
              <StageProgress onComplete={handleProgressComplete} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scanner;
