import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ExternalLink, Clock, TrendingUp, Shield, AlertTriangle, RefreshCw as Refresh } from 'lucide-react';
import { CyberNews as CyberNewsType } from '../types';

const CyberNews: React.FC = () => {
  const [news, setNews] = useState<CyberNewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock news data - in production, this would fetch from Inshorts API
  const mockNews: CyberNewsType[] = [
    {
      id: '1',
      title: 'New AI-Generated Deepfake Scam Targets Banking Customers',
      content: 'Security researchers have identified a sophisticated deepfake scam campaign targeting bank customers through fake video calls from supposed bank officials. The scammers use AI-generated faces to appear as legitimate representatives.',
      url: 'https://example.com/news1',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'CyberSecurity Today'
    },
    {
      id: '2',
      title: 'Major Social Media Platform Implements New Deepfake Detection',
      content: 'A leading social media company announced the deployment of advanced AI detection systems to identify and flag potentially harmful deepfake content before it spreads across the platform.',
      url: 'https://example.com/news2',
      publishedAt: '2024-01-15T08:15:00Z',
      source: 'Tech Security News'
    },
    {
      id: '3',
      title: 'Government Agencies Issue Warning About Voice Cloning Fraud',
      content: 'Federal authorities have issued a public advisory about the increasing use of voice cloning technology in phone-based fraud schemes, urging citizens to verify suspicious calls through alternative means.',
      url: 'https://example.com/news3',
      publishedAt: '2024-01-14T16:45:00Z',
      source: 'Government Security Alert'
    },
    {
      id: '4',
      title: 'Corporate Executive Deepfake Used in $25M Wire Fraud',
      content: 'A multinational corporation fell victim to a sophisticated deepfake attack where criminals used AI-generated video of a CEO to authorize fraudulent wire transfers totaling $25 million.',
      url: 'https://example.com/news4',
      publishedAt: '2024-01-14T14:20:00Z',
      source: 'Financial Crime Report'
    },
    {
      id: '5',
      title: 'New Research Shows 73% Increase in Deepfake Incidents',
      content: 'Academic researchers published findings showing a dramatic 73% increase in reported deepfake-related incidents over the past year, with the majority involving financial fraud and identity theft.',
      url: 'https://example.com/news5',
      publishedAt: '2024-01-13T12:00:00Z',
      source: 'Cybersecurity Research Journal'
    },
    {
      id: '6',
      title: 'AI Detection Tool Achieves 97% Accuracy in Spotting Fakes',
      content: 'Researchers at a leading university have developed an AI detection system that can identify deepfake content with 97% accuracy, potentially revolutionizing the fight against synthetic media abuse.',
      url: 'https://example.com/news6',
      publishedAt: '2024-01-13T09:30:00Z',
      source: 'AI Research Weekly'
    },
    {
      id: '7',
      title: 'Election Officials Prepare for Deepfake Disinformation',
      content: 'Election security teams are implementing new protocols and training programs to combat potential deepfake disinformation campaigns ahead of upcoming elections.',
      url: 'https://example.com/news7',
      publishedAt: '2024-01-12T18:15:00Z',
      source: 'Election Security Today'
    },
    {
      id: '8',
      title: 'Insurance Companies Begin Covering Deepfake Fraud Losses',
      content: 'Several major insurance providers have started offering specialized coverage for businesses and individuals affected by deepfake-related fraud and identity theft.',
      url: 'https://example.com/news8',
      publishedAt: '2024-01-12T11:40:00Z',
      source: 'Insurance Industry News'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true);
      // In production, implement actual API call to Inshorts or similar service
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNews(mockNews);
      setLastUpdated(new Date());
      setLoading(false);
    };

    fetchNews();
  }, []);

  const refreshNews = () => {
    setNews([]);
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getNewsIcon = (title: string) => {
    if (title.toLowerCase().includes('fraud') || title.toLowerCase().includes('scam')) {
      return <AlertTriangle className="w-5 h-5 text-error-600" />;
    }
    if (title.toLowerCase().includes('detection') || title.toLowerCase().includes('security')) {
      return <Shield className="w-5 h-5 text-success-600" />;
    }
    return <TrendingUp className="w-5 h-5 text-primary-600" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
              <Globe className="w-10 h-10 text-primary-600 mr-3" />
              Cyber Security News
            </h1>
            <p className="text-lg text-gray-600">
              Latest updates on deepfake threats, cybersecurity, and digital fraud prevention
            </p>
          </div>
          <motion.button
            onClick={refreshNews}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            <Refresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              whileHover={{ y: -3 }}
              onClick={() => window.open(article.url, '_blank')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getNewsIcon(article.title)}
                  <span className="text-sm text-gray-600">{article.source}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{getTimeAgo(article.publishedAt)}</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {article.content}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(article.publishedAt)}</span>
                <motion.span
                  className="text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  Read full article →
                </motion.span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* News Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">News Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="bg-error-50 p-4 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-8 h-8 text-error-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Fraud Alerts</h3>
            <p className="text-sm text-gray-600">Latest scam warnings</p>
          </motion.div>
          
          <motion.div
            className="bg-success-50 p-4 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Security Updates</h3>
            <p className="text-sm text-gray-600">Protection measures</p>
          </motion.div>
          
          <motion.div
            className="bg-primary-50 p-4 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Trends</h3>
            <p className="text-sm text-gray-600">Industry insights</p>
          </motion.div>
          
          <motion.div
            className="bg-secondary-50 p-4 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Globe className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Global News</h3>
            <p className="text-sm text-gray-600">Worldwide coverage</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default CyberNews;