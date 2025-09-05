import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DetectionResult, FlashcardStep } from '../types';

interface AppContextType {
  detectionResults: DetectionResult[];
  showResultModal: boolean;
  currentResult: DetectionResult | null;
  flashcardSteps: FlashcardStep[];
  showOnboarding: boolean;
  setDetectionResults: (results: DetectionResult[]) => void;
  addDetectionResult: (result: DetectionResult) => void;
  showDetectionResult: (result: DetectionResult) => void;
  hideResultModal: () => void;
  updateFlashcardStep: (stepId: number, completed: boolean) => void;
  setShowOnboarding: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const initialFlashcardSteps: FlashcardStep[] = [
  {
    id: 1,
    title: 'Upload Your Media',
    description: 'Select an image, video, or audio file to analyze for deepfake detection.',
    action: 'Upload File',
    completed: false
  },
  {
    id: 2,
    title: 'AI Analysis in Progress',
    description: 'Our AI models are analyzing your media using advanced deepfake detection algorithms.',
    completed: false
  },
  {
    id: 3,
    title: 'View Results',
    description: 'Review the detection results with confidence scores and detailed analysis.',
    completed: false
  },
  {
    id: 4,
    title: 'Stay Informed',
    description: 'Explore our awareness hub and stay updated with the latest cyber security news.',
    completed: false
  }
];

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [flashcardSteps, setFlashcardSteps] = useState<FlashcardStep[]>(initialFlashcardSteps);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const addDetectionResult = (result: DetectionResult) => {
    setDetectionResults(prev => [result, ...prev]);
  };

  const showDetectionResult = (result: DetectionResult) => {
    setCurrentResult(result);
    setShowResultModal(true);
  };

  const hideResultModal = () => {
    setShowResultModal(false);
    setCurrentResult(null);
  };

  const updateFlashcardStep = (stepId: number, completed: boolean) => {
    setFlashcardSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, completed } : step
      )
    );
  };

  const value: AppContextType = {
    detectionResults,
    showResultModal,
    currentResult,
    flashcardSteps,
    showOnboarding,
    setDetectionResults,
    addDetectionResult,
    showDetectionResult,
    hideResultModal,
    updateFlashcardStep,
    setShowOnboarding
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};