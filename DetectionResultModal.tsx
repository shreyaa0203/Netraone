import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Shield, 
  AlertTriangle, 
  Clock, 
  Database, 
  FileCheck,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const DetectionResultModal: React.FC = () => {
  const { showResultModal, currentResult, hideResultModal } = useApp();

  if (!showResultModal || !currentResult) return null;

  const isAuthentic = currentResult.result === 'authentic';
  const confidenceColor = currentResult.confidence > 90 ? 'success' : 
                         currentResult.confidence > 70 ? 'warning' : 'error';

  const getResultIcon = () => {
    return isAuthentic ? 
      <Shield className="w-16 h-16 text-success-600" /> : 
      <AlertTriangle className="w-16 h-16 text-error-600" />;
  };

  const getResultColor = () => {
    return isAuthentic ? 'success' : 'error';
  };

  const getConfidenceColor = () => {
    switch (confidenceColor) {
      case 'success': return 'text-success-600 bg-success-100';
      case 'warning': return 'text-warning-600 bg-warning-100';
      case 'error': return 'text-error-600 bg-error-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatProcessingTime = (ms: number) => {
    return ms > 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={hideResultModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`
            p-6 border-b border-gray-200 
            ${isAuthentic ? 'bg-success-50' : 'bg-error-50'}
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getResultIcon()}
                <div>
                  <h2 className={`
                    text-2xl font-bold 
                    ${isAuthentic ? 'text-success-800' : 'text-error-800'}
                  `}>
                    {isAuthentic ? 'Authentic Content' : 'Deepfake Detected'}
                  </h2>
                  <p className={`
                    text-sm 
                    ${isAuthentic ? 'text-success-600' : 'text-error-600'}
                  `}>
                    Analysis completed • {currentResult.fileName}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={hideResultModal}
                className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Confidence Score */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Confidence Score</h3>
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  ${getConfidenceColor()}
                `}>
                  {currentResult.confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className={`
                    h-3 rounded-full
                    ${confidenceColor === 'success' ? 'bg-success-600' :
                      confidenceColor === 'warning' ? 'bg-warning-600' : 'bg-error-600'}
                  `}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentResult.confidence}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-gray-900">AI Model</span>
                </div>
                <p className="text-sm text-gray-600">{currentResult.model}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-secondary-600" />
                  <span className="font-medium text-gray-900">Processing Time</span>
                </div>
                <p className="text-sm text-gray-600">
                  {formatProcessingTime(currentResult.processingTime)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileCheck className="w-5 h-5 text-accent-600" />
                  <span className="font-medium text-gray-900">File Type</span>
                </div>
                <p className="text-sm text-gray-600 capitalize">
                  {currentResult.fileType}
                </p>
              </div>
            </div>

            {/* Result Explanation */}
            <div className={`
              p-4 rounded-lg mb-6
              ${isAuthentic ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'}
            `}>
              <h3 className={`
                font-semibold mb-2
                ${isAuthentic ? 'text-success-800' : 'text-error-800'}
              `}>
                What This Means:
              </h3>
              <p className={`
                text-sm leading-relaxed
                ${isAuthentic ? 'text-success-700' : 'text-error-700'}
              `}>
                {isAuthentic ? (
                  `Our AI analysis indicates this content appears to be authentic. The confidence score of ${currentResult.confidence}% suggests the media has not been artificially manipulated using deepfake technology.`
                ) : (
                  `Our AI analysis has detected signs of deepfake manipulation in this content. The confidence score of ${currentResult.confidence}% indicates a high likelihood that this media has been artificially generated or altered.`
                )}
              </p>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommendations:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {isAuthentic ? (
                  <>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Content appears authentic, but always verify through multiple sources for important decisions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-success-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Continue to stay vigilant as deepfake technology continues to advance</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Do not trust this content for important decisions without additional verification</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Report suspicious content to relevant authorities if used maliciously</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-error-600 rounded-full mt-2 flex-shrink-0" />
                      <span>Share awareness about deepfake technology to help protect others</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Technical Details */}
            <details className="mb-6">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition-colors">
                Technical Details
              </summary>
              <div className="mt-3 text-sm text-gray-600 space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Analysis Date:</span>
                    <br />
                    {currentResult.createdAt.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">File Name:</span>
                    <br />
                    {currentResult.fileName}
                  </div>
                </div>
                <div>
                  <span className="font-medium">Detection Method:</span>
                  <br />
                  Advanced neural network analysis using {currentResult.model}
                </div>
              </div>
            </details>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
            <motion.button
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </motion.button>
            
            <motion.button
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-4 h-4" />
              <span>Share Results</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetectionResultModal;