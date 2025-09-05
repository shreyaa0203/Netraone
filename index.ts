export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  createdAt: Date;
}

export interface DetectionResult {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'image' | 'video' | 'audio';
  result: 'authentic' | 'deepfake';
  confidence: number;
  model: string;
  createdAt: Date;
  processingTime: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  readTime: number;
}

export interface CyberNews {
  id: string;
  title: string;
  content: string;
  url: string;
  publishedAt: string;
  source: string;
}

export interface FlashcardStep {
  id: number;
  title: string;
  description: string;
  action?: string;
  completed: boolean;
}

export interface UploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  message?: string;
}