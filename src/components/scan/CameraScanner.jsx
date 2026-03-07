import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../ui/Button';

const CameraScanner = ({ onScanComplete, isScanning = false }) => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const constraints = { 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setError(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Failed to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass border-white/20 shadow-2xl">
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="w-12 h-12 text-danger mb-4" />
          <h3 className="text-lg font-bold mb-2">Camera Error</h3>
          <p className="text-text-secondary text-sm mb-6">{error}</p>
          <button 
            onClick={startCamera}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full bg-black">
          <video 
            ref={videoRef}
            autoPlay 
            playsInline
            muted
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Scanning Box Overlays */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full aspect-square border-2 border-primary/30 rounded-3xl">
              {/* Corners */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
              
              {/* Scanning Line */}
              {isScanning && (
                <motion.div 
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                  animate={{ top: ['10%', '90%'] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              )}
            </div>
          </div>
          
          {/* Status Text */}
          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center">
            <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
              {isScanning ? (
                <>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono tracking-widest uppercase">Scanning...</span>
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 text-text-secondary" />
                  <span className="text-xs font-mono tracking-widest uppercase text-text-secondary">Position QR inside frame</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;
