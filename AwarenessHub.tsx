import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Phone, 
  Mail, 
  MessageSquare,
  Lock,
  Users,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const AwarenessHub: React.FC = () => {
  const scamAlerts = [
    {
      id: 1,
      title: 'Voice Cloning Phone Scams',
      severity: 'high',
      description: 'Criminals are using AI to clone voices of family members to request emergency money transfers.',
      tips: [
        'Ask personal questions only the real person would know',
        'Hang up and call them back on their known number',
        'Never send money based on voice calls alone'
      ]
    },
    {
      id: 2,
      title: 'Deepfake Video Blackmail',
      severity: 'critical',
      description: 'Fake intimate videos created using deepfake technology to blackmail victims.',
      tips: [
        'Report to authorities immediately',
        'Do not engage with blackmailers',
        'Document all communications'
      ]
    },
    {
      id: 3,
      title: 'CEO Fraud with Face Swap',
      severity: 'medium',
      description: 'Deepfake videos of executives instructing employees to transfer funds or share sensitive data.',
      tips: [
        'Verify through multiple channels',
        'Follow company verification protocols',
        'Be suspicious of urgent requests'
      ]
    }
  ];

  const detectionTips = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual Inconsistencies',
      description: 'Look for unnatural blinking, inconsistent lighting, or facial artifacts around the edges.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Audio-Visual Sync',
      description: 'Check if lip movements match the audio. Poor synchronization often indicates manipulation.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Quality Variations',
      description: 'Deepfakes often have inconsistent quality between the face and the rest of the video.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Context Verification',
      description: 'Verify the source and context. Be suspicious of unexpected or unusual content.'
    }
  ];

  const preventionGuide = [
    {
      step: 1,
      title: 'Educate Yourself',
      description: 'Stay informed about the latest deepfake technology and common attack methods.',
      action: 'Read our blog posts and follow security news'
    },
    {
      step: 2,
      title: 'Verify Sources',
      description: 'Always verify suspicious content through multiple independent sources.',
      action: 'Cross-check with official channels and trusted contacts'
    },
    {
      step: 3,
      title: 'Use Detection Tools',
      description: 'Regularly scan suspicious media files using AI detection tools like ours.',
      action: 'Upload files to our detection system'
    },
    {
      step: 4,
      title: 'Report Incidents',
      description: 'Report suspected deepfake fraud to authorities and relevant platforms.',
      action: 'Contact law enforcement and social media platforms'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-error-500 bg-error-50';
      case 'high': return 'border-warning-500 bg-warning-50';
      case 'medium': return 'border-primary-500 bg-primary-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Shield className="w-16 h-16 text-primary-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Deepfake Awareness Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed about deepfake threats, learn detection techniques, and protect yourself 
          from AI-powered fraud and manipulation.
        </p>
      </motion.div>

      {/* Current Scam Alerts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 text-error-600 mr-2" />
          Current Threat Alerts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {scamAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`border-l-4 p-6 rounded-lg ${getSeverityColor(alert.severity)}`}
            >
              <h3 className="font-bold text-gray-900 mb-2">{alert.title}</h3>
              <p className="text-gray-700 mb-4">{alert.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Prevention Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {alert.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Detection Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Spot Deepfakes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {detectionTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ y: -5 }}
            >
              <div className="text-primary-600 mb-4">{tip.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Prevention Guide */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">4-Step Prevention Guide</h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {preventionGuide.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`p-8 ${index !== preventionGuide.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Action:</strong> {step.action}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact and Resources */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="bg-primary-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 text-primary-600 mr-2" />
            Report Deepfake Fraud
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-medium">FBI IC3:</span>
              <span className="text-primary-600">ic3.gov</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">FTC:</span>
              <span className="text-primary-600">reportfraud.ftc.gov</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Local Police:</span>
              <span className="text-primary-600">911 (emergency)</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary-50 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 text-secondary-600 mr-2" />
            Additional Resources
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-medium">CISA Guidelines:</span>
              <span className="text-secondary-600">cisa.gov/deepfakes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Digital Literacy:</span>
              <span className="text-secondary-600">digitalwellness.org</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">Support Groups:</span>
              <span className="text-secondary-600">scamsurvivors.com</span>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AwarenessHub;