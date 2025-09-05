# AI Deepfake Detection & Awareness Platform

A comprehensive platform for detecting deepfake content using advanced AI models and providing cybersecurity awareness to protect against AI-powered fraud.

## 🔍 Overview

This platform combines state-of-the-art deepfake detection technology with educational resources to help users identify and protect themselves from synthetic media threats.

### Key Features

- **AI-Powered Detection**: Upload images, videos, or audio files for deepfake analysis using FaceNet, Resemblyzer, ECAPA-TDNN, and DeepFace models
- **Google OAuth Authentication**: Secure sign-in with Gmail accounts
- **Hourly Dashboard Updates**: Track detection statistics and logs with scheduled refreshes
- **Interactive Results**: Popup modals displaying detection results with confidence scores
- **Educational Content**: Blog articles, cyber news feed, and awareness hub
- **Onboarding System**: Flashcard-based guidance for new users

## 🏗️ Architecture

### Frontend (React.js)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **State Management**: Context API for global state
- **Authentication**: JWT-based session management

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.8+
- **AI Models**: Integration with deepfake detection models
- **Database**: PostgreSQL for user data and detection logs
- **Authentication**: Google OAuth2 integration
- **File Storage**: AWS S3 for media uploads
- **API Documentation**: Automatic OpenAPI/Swagger docs

### AI Detection Models
- **FaceNet**: Facial recognition and manipulation detection
- **DeepFace**: Additional facial analysis validation
- **Resemblyzer**: Voice cloning detection
- **ECAPA-TDNN**: Speaker verification and audio authenticity

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- PostgreSQL 13+
- Google OAuth credentials

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn main:app --reload --port 8000
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/deepfake_detection

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRE_MINUTES=60
GOOGLE_CLIENT_ID=your-google-client-id

# Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-s3-bucket

# External APIs
INSHORTS_API_KEY=your-inshorts-api-key
```

## 📱 Usage

### File Upload & Detection
1. Sign in with Google OAuth
2. Upload an image, video, or audio file
3. Wait for AI analysis (2-5 seconds)
4. Review detection results in popup modal
5. View detailed confidence scores and recommendations

### Dashboard Monitoring
- Access hourly refreshed statistics
- Review detection history
- Download analysis reports
- Track authentication and confidence trends

### Educational Resources
- Browse awareness hub for latest threat alerts
- Read blog articles on deepfake prevention
- Stay updated with cyber security news feed
- Follow onboarding flashcards for guidance

## 🔒 Security Features

### File Security
- MIME type validation
- File size limits (10MB images, 100MB videos, 50MB audio)
- Content scanning for malicious patterns
- SHA-256 hash calculation for deduplication

### Authentication Security
- Google OAuth2 integration
- JWT token-based sessions
- Secure token refresh mechanism
- Session management and validation

### Data Protection
- Encrypted file storage
- User data anonymization
- GDPR compliance measures
- Secure API endpoints with rate limiting

## 🤖 AI Model Integration

### Image Detection (FaceNet + DeepFace)
```python
from backend.models.face_detection import FaceNetDetector

detector = FaceNetDetector()
result = detector.detect(image_path)
# Returns: {'result': 'authentic/deepfake', 'confidence': 85.6}
```

### Audio Detection (Resemblyzer + ECAPA-TDNN)
```python
from backend.models.voice_detection import ResemblyzerDetector

detector = ResemblyzerDetector()
result = detector.detect(audio_path)
# Returns: {'result': 'authentic/deepfake', 'confidence': 78.9}
```

### Video Detection (Combined Analysis)
```python
from backend.models.video_detection import VideoDeepfakeDetector

detector = VideoDeepfakeDetector()
result = detector.detect(video_path)
# Returns: Combined facial and audio analysis results
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get user profile
- `POST /api/auth/refresh` - Refresh JWT token

### Detection
- `POST /api/detect` - Upload file for analysis
- `GET /api/history` - Get detection history
- `GET /api/stats` - Get user statistics

### Content
- `GET /api/news` - Get cyber security news
- `GET /api/blog` - Get blog articles
- `GET /api/awareness` - Get awareness content

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563EB) - Trust and security
- **Secondary**: Teal (#0D9488) - Technology and innovation
- **Accent**: Orange (#EA580C) - Alerts and warnings
- **Success**: Green (#16A34A) - Authentic content
- **Error**: Red (#DC2626) - Deepfake detection

### Typography
- **Headings**: Inter font family (120% line height)
- **Body**: Inter font family (150% line height)
- **Code**: JetBrains Mono (monospace)

### Spacing System
- Base unit: 8px
- Consistent spacing scale: 8, 16, 24, 32, 48, 64px

## 🔧 Development

### Code Structure
```
src/
├── components/          # React components
├── contexts/           # Context providers
├── types/              # TypeScript types
├── utils/              # Utility functions
└── styles/             # CSS and styling

backend/
├── models/             # AI detection models
├── database/           # Database models and connections
├── services/           # Business logic services
├── utils/              # Backend utilities
└── main.py            # FastAPI application
```

### Testing
```bash
# Frontend tests
npm test

# Backend tests
pytest backend/tests/

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Cloud Deployment (AWS/GCP)
1. Set up container registry
2. Configure environment variables
3. Deploy with Kubernetes or container service
4. Set up load balancer and SSL certificates

## 📈 Monitoring & Analytics

### Performance Metrics
- Detection accuracy rates
- Processing time statistics
- User engagement metrics
- System performance monitoring

### Logging
- Structured logging with correlation IDs
- Error tracking and alerting
- Security event monitoring
- User activity logging

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/documentation` folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join community discussions
- **Email**: support@deepguard-ai.com

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core detection functionality
- ✅ User authentication
- ✅ Basic dashboard and awareness content

### Phase 2 (Next)
- 🔄 Real-time detection improvements
- 🔄 Advanced AI model integration
- 🔄 Mobile app development

### Phase 3 (Future)
- 📋 Enterprise features
- 📋 API marketplace
- 📋 Global threat intelligence

---

Built with ❤️ for digital security and deepfake awareness.