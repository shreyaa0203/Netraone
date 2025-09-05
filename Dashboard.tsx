import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Clock, 
  FileCheck,
  Calendar,
  Download
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { DetectionResult } from '../types';

const Dashboard: React.FC = () => {
  const { detectionResults, showDetectionResult } = useApp();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate hourly updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalScans: detectionResults.length,
    authenticFiles: detectionResults.filter(r => r.result === 'authentic').length,
    deepfakeFiles: detectionResults.filter(r => r.result === 'deepfake').length,
    avgConfidence: detectionResults.length > 0 
      ? Math.round(detectionResults.reduce((sum, r) => sum + r.confidence, 0) / detectionResults.length)
      : 0
  };

  const recentResults = detectionResults.slice(0, 10);

  const getResultColor = (result: string, confidence: number) => {
    if (result === 'authentic') {
      return confidence > 90 ? 'text-success-600 bg-success-50' : 'text-warning-600 bg-warning-50';
    }
    return confidence > 80 ? 'text-error-600 bg-error-50' : 'text-warning-600 bg-warning-50';
  };

  const getResultIcon = (result: string) => {
    return result === 'authentic' ? 
      <Shield className="w-4 h-4" /> : 
      <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Detection Dashboard</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        <p className="text-gray-600">
          Monitor your deepfake detection results and statistics. Data refreshes every hour.
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Scans</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-primary-600" />
          </div>
          <div className="mt-4 flex items-center text-success-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">+12% from last week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Authentic Files</p>
              <p className="text-3xl font-bold text-success-600">{stats.authenticFiles}</p>
            </div>
            <Shield className="w-12 h-12 text-success-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">
              {stats.totalScans > 0 ? Math.round((stats.authenticFiles / stats.totalScans) * 100) : 0}% of total scans
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deepfake Detected</p>
              <p className="text-3xl font-bold text-error-600">{stats.deepfakeFiles}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-error-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">
              {stats.totalScans > 0 ? Math.round((stats.deepfakeFiles / stats.totalScans) * 100) : 0}% of total scans
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
              <p className="text-3xl font-bold text-primary-600">{stats.avgConfidence}%</p>
            </div>
            <FileCheck className="w-12 h-12 text-primary-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">Across all detections</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Detections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Detections</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {recentResults.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentResults.map((result) => (
                  <motion.tr
                    key={result.id}
                    onClick={() => showDetectionResult(result)}
                    className="hover:bg-gray-50 cursor-pointer"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {result.fileType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${getResultColor(result.result, result.confidence)}
                      `}>
                        {getResultIcon(result.result)}
                        <span className="capitalize">{result.result}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {result.confidence}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {result.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {result.createdAt.toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No detections yet</h3>
              <p className="text-gray-600">Upload some files to see your detection results here.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;