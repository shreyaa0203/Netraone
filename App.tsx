import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import Dashboard from './components/Dashboard';
import AwarenessHub from './components/AwarenessHub';
import BlogSection from './components/BlogSection';
import CyberNews from './components/CyberNews';
import OnboardingFlashcards from './components/OnboardingFlashcards';
import DetectionResultModal from './components/DetectionResultModal';

function App() {
  const [activeSection, setActiveSection] = useState('upload');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'upload':
        return <UploadSection />;
      case 'dashboard':
        return <Dashboard />;
      case 'awareness':
        return <AwarenessHub />;
      case 'blog':
        return <BlogSection />;
      case 'news':
        return <CyberNews />;
      default:
        return <UploadSection />;
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          
          <main className="pt-8">
            <AnimatePresence mode="wait">
              {renderActiveSection()}
            </AnimatePresence>
          </main>

          <OnboardingFlashcards />
          <DetectionResultModal />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;