import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Upload, Shield, BarChart3, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const OnboardingFlashcards: React.FC = () => {
  const { flashcardSteps, showOnboarding, setShowOnboarding } = useApp();

  const getStepIcon = (stepId: number) => {
    switch (stepId) {
      case 1: return <Upload className="w-6 h-6" />;
      case 2: return <Shield className="w-6 h-6" />;
      case 3: return <BarChart3 className="w-6 h-6" />;
      case 4: return <BookOpen className="w-6 h-6" />;
      default: return <Upload className="w-6 h-6" />;
    }
  };

  const completedSteps = flashcardSteps.filter(step => step.completed).length;
  const progress = (completedSteps / flashcardSteps.length) * 100;

  if (!showOnboarding) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-48px)]"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">Getting Started</h3>
              <motion.button
                onClick={() => setShowOnboarding(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm mt-1 text-white text-opacity-90">
              {completedSteps} of {flashcardSteps.length} steps completed
            </p>
          </div>

          {/* Steps */}
          <div className="p-4 space-y-3">
            {flashcardSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-start space-x-3 p-3 rounded-lg transition-all duration-300
                  ${step.completed 
                    ? 'bg-success-50 border border-success-200' 
                    : 'bg-gray-50 border border-gray-200'
                  }
                `}
              >
                <div className={`
                  flex-shrink-0 p-2 rounded-full
                  ${step.completed 
                    ? 'bg-success-100 text-success-600' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    getStepIcon(step.id)
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`
                    font-semibold text-sm
                    ${step.completed ? 'text-success-800' : 'text-gray-900'}
                  `}>
                    {step.title}
                  </h4>
                  <p className={`
                    text-xs mt-1 leading-relaxed
                    ${step.completed ? 'text-success-700' : 'text-gray-600'}
                  `}>
                    {step.description}
                  </p>
                  
                  {step.action && !step.completed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2"
                    >
                      <span className="inline-flex items-center px-2.5 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                        {step.action}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          {completedSteps === flashcardSteps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-gray-200 p-4 bg-gradient-to-r from-success-50 to-primary-50"
            >
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <h4 className="font-bold text-success-800 mb-1">All Set!</h4>
                <p className="text-sm text-success-700">
                  You've completed the onboarding process. Explore the platform!
                </p>
                <motion.button
                  onClick={() => setShowOnboarding(false)}
                  className="mt-3 bg-success-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-success-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Exploring
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingFlashcards;