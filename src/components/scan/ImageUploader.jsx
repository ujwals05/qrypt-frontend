import React, { useState, useRef } from 'react';
import { Upload, X, FileImage, CheckCircle2 } from 'lucide-react';
import { cn } from '../ui/Button';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploader = ({ onUpload, className }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-300",
              dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/10 hover:border-primary/50 bg-white/5",
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
            />
            
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">Drop QR image here</h3>
            <p className="text-text-secondary text-center mb-8">
              or click to browse from your device<br/>
              <span className="text-xs mt-2 inline-block opacity-60">Supports JPG, PNG, WEBP</span>
            </p>
            
            <Button variant="secondary" onClick={onButtonClick}>
              Select File
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="relative aspect-video bg-black/40 flex items-center justify-center overflow-hidden">
              <img 
                src={preview} 
                alt="QR Preview" 
                className="max-w-full max-h-full object-contain"
              />
              <button 
                onClick={removeFile}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <FileImage className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-text-secondary">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              
              <Button 
                onClick={() => onUpload(file)}
                className="gap-2"
              >
                Scan This QR
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
