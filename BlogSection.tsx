import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import { BlogPost } from '../types';

const BlogSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Deepfake Technology: A Complete Guide',
      excerpt: 'Explore the fundamentals of deepfake technology, how it works, and its implications for society.',
      content: 'Full blog content here...',
      author: 'Dr. Sarah Chen',
      publishedAt: new Date('2024-01-15'),
      tags: ['Technology', 'Education', 'AI'],
      readTime: 8
    },
    {
      id: '2',
      title: 'How to Protect Your Digital Identity from Deepfake Fraud',
      excerpt: 'Learn practical steps to safeguard yourself against deepfake-based identity theft and fraud.',
      content: 'Full blog content here...',
      author: 'Michael Rodriguez',
      publishedAt: new Date('2024-01-12'),
      tags: ['Security', 'Privacy', 'Prevention'],
      readTime: 6
    },
    {
      id: '3',
      title: 'The Rise of Voice Cloning Scams: What You Need to Know',
      excerpt: 'Recent trends in AI voice cloning and how criminals are exploiting this technology.',
      content: 'Full blog content here...',
      author: 'Emily Watson',
      publishedAt: new Date('2024-01-10'),
      tags: ['Fraud', 'Audio', 'Awareness'],
      readTime: 5
    },
    {
      id: '4',
      title: 'Legal Framework: Laws Against Deepfake Abuse',
      excerpt: 'Understanding the current legal landscape and regulations surrounding deepfake technology.',
      content: 'Full blog content here...',
      author: 'James Thompson',
      publishedAt: new Date('2024-01-08'),
      tags: ['Legal', 'Policy', 'Regulation'],
      readTime: 10
    },
    {
      id: '5',
      title: 'Corporate Security: Protecting Your Business from Deepfake Attacks',
      excerpt: 'Enterprise strategies for defending against deepfake-based business email compromise.',
      content: 'Full blog content here...',
      author: 'Lisa Park',
      publishedAt: new Date('2024-01-05'),
      tags: ['Business', 'Enterprise', 'Security'],
      readTime: 7
    },
    {
      id: '6',
      title: 'The Psychology of Deepfake Deception',
      excerpt: 'How our brains process synthetic media and why we\'re vulnerable to deepfake manipulation.',
      content: 'Full blog content here...',
      author: 'Dr. Robert Kim',
      publishedAt: new Date('2024-01-03'),
      tags: ['Psychology', 'Research', 'Behavior'],
      readTime: 9
    }
  ];

  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Deepfake Awareness Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay informed with the latest insights, research, and best practices for 
          deepfake detection and digital security.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Topics' : tag}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ y: -5 }}
          >
            <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold text-center px-4 leading-tight">
                  {post.title}
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">{post.author}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="mr-4">{post.publishedAt.toLocaleDateString()}</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime} min read</span>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <motion.button
                className="flex items-center text-primary-600 font-semibold hover:text-primary-700"
                whileHover={{ x: 5 }}
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white"
      >
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
          Get the latest articles on deepfake awareness, security tips, and technology updates 
          delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <motion.button
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogSection;