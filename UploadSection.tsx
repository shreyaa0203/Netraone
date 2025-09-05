import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileImage, FileVideo, FileAudio, X, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { DetectionResult, UploadProgress } from '../types';

const UploadSection: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const { addDetectionResult, showDetectionResult, updateFlashcardStep } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    progress: 0,
    status: 'idle'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!isAuthenticated) {
      alert('Please sign in to upload files');
      return;
    }

    // Update flashcard step
    updateFlashcardStep(1, true);

    const fileType = file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'audio';

    setUploadProgress({ progress: 0, status: 'uploading' });

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev.progress >= 100) {
          clearInterval(uploadInterval);
          setUploadProgress({ progress: 100, status: 'processing', message: 'AI analysis in progress...' });
          updateFlashcardStep(2, true);
          
          // Simulate AI processing
          setTimeout(() => {
            const mockResult: DetectionResult = {
              id: Date.now().toString(),
              userId: '1',
              fileName: file.name,
              fileType,
              result: Math.random() > 0.3 ? 'authentic' : 'deepfake',
              confidence: Math.round((Math.random() * 30 + 70) * 100) / 100,
              model: fileType === 'image' ? 'FaceNet + DeepFace' : 
                     fileType === 'video' ? 'FaceNet + ECAPA-TDNN' : 'Resemblyzer + ECAPA-TDNN',
              createdAt: new Date(),
              processingTime: Math.round(Math.random() * 5000 + 2000)
            };

            addDetectionResult(mockResult);
            showDetectionResult(mockResult);
            updateFlashcardStep(3, true);
            setUploadProgress({ progress: 100, status: 'completed' });
          }, 3000);

          return prev;
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 200);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-8 h-8" />;
    if (type.startsWith('video/')) return <FileVideo className="w-8 h-8" />;
    return <FileAudio className="w-8 h-8" />;
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Shield className="w-24 h-24 text-primary-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            AI-Powered Deepfake Detection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect yourself from deepfake fraud with our advanced AI detection system. 
            Upload images, videos, or audio files to verify their authenticity.
          </p>
          <motion.button
            onClick={login}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in with Google to Get Started
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Upload Media for Analysis
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI models will analyze your files using advanced deepfake detection algorithms
          including FaceNet, Resemblyzer, ECAPA-TDNN, and DeepFace.
        </p>
      </motion.div>

      <AnimatePresence>
        {uploadProgress.status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {uploadProgress.status === 'uploading' && (
                  <Upload className="w-5 h-5 text-primary-600 animate-pulse" />
                )}
                {uploadProgress.status === 'processing' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Shield className="w-5 h-5 text-primary-600" />
                  </motion.div>
                )}
                {uploadProgress.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-success-600" />
                )}
                <span className="font-medium">
                  {uploadProgress.status === 'uploading' && 'Uploading...'}
                  {uploadProgress.status === 'processing' && 'AI Analysis in Progress...'}
                  {uploadProgress.status === 'completed' && 'Analysis Complete!'}
                </span>
              </div>
              {uploadProgress.status !== 'completed' && (
                <span className="text-sm text-gray-600">{uploadProgress.progress}%</span>
              )}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress.progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {uploadProgress.message && (
              <p className="text-sm text-gray-600 mt-2">{uploadProgress.message}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className={`w-16 h-16 mx-auto mb-6 ${dragActive ? 'text-primary-600' : 'text-gray-400'}`} />
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Drop your files here or click to browse
        </h3>
        <p className="text-gray-600 mb-6">
          Supports images (JPG, PNG, WebP), videos (MP4, AVI, MOV), and audio files (MP3, WAV, M4A)
        </p>
        
        <motion.button
          onClick={() => fileInputRef.current?.click()}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Choose Files
        </motion.button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center"
        >
          <FileImage className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Image Detection</h3>
          <p className="text-gray-600">
            Analyze images using FaceNet and DeepFace for facial manipulation detection
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center"
        >
          <FileVideo className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Detection</h3>
          <p className="text-gray-600">
            Detect deepfake videos using advanced ECAPA-TDNN and FaceNet models
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg text-center"
        >
          <FileAudio className="w-12 h-12 text-accent-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Detection</h3>
          <p className="text-gray-600">
            Identify voice cloning using Resemblyzer and ECAPA-TDNN voice analysis
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadSection;