# System Architecture

## Overview

The AI Deepfake Detection & Awareness Platform follows a modern microservices architecture with clear separation of concerns between frontend, backend, AI processing, and data storage layers.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           Frontend Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   React SPA     │  │  Tailwind CSS   │  │ Framer Motion   │    │
│  │   TypeScript    │  │   Components    │  │   Animations    │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │ HTTPS/REST API
┌─────────────────────────────────────────────────────────────────────┐
│                          API Gateway Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   FastAPI       │  │  Authentication │  │   Rate Limiting │    │
│  │   OpenAPI       │  │   Middleware    │  │   & Validation  │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                        Business Logic Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Detection     │  │  User Management│  │  Content Service│    │
│  │   Service       │  │   Service       │  │                 │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                         AI Processing Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │    FaceNet      │  │   Resemblyzer   │  │   ECAPA-TDNN    │    │
│  │   DeepFace      │  │                 │  │                 │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Storage Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   PostgreSQL    │  │     AWS S3      │  │     Redis       │    │
│  │   Database      │  │  File Storage   │  │     Cache       │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Architecture

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   ├── layout/              # Layout components
│   ├── forms/               # Form components
│   └── sections/            # Page-specific components
├── contexts/
│   ├── AuthContext.tsx      # Authentication state
│   └── AppContext.tsx       # Application state
├── hooks/
│   ├── useAuth.ts           # Authentication hooks
│   └── useDetection.ts      # Detection hooks
├── services/
│   ├── api.ts               # API client
│   └── auth.ts              # Authentication service
├── types/
│   └── index.ts             # TypeScript definitions
└── utils/
    ├── constants.ts         # Application constants
    └── helpers.ts           # Utility functions
```

### Backend Architecture

```
backend/
├── main.py                  # FastAPI application entry point
├── models/
│   ├── face_detection.py    # Image deepfake detection
│   ├── voice_detection.py   # Audio deepfake detection
│   └── video_detection.py   # Video deepfake detection
├── database/
│   ├── models.py           # SQLAlchemy models
│   └── connection.py       # Database connection
├── services/
│   ├── auth_service.py     # Authentication logic
│   ├── detection_service.py# Detection orchestration
│   └── content_service.py  # Content management
├── utils/
│   ├── file_handler.py     # File processing utilities
│   └── security.py         # Security utilities
└── requirements.txt        # Python dependencies
```

## Data Flow Architecture

### File Upload & Detection Flow

```
1. User uploads file via React frontend
   ↓
2. Frontend validates file type and size
   ↓
3. File sent to FastAPI backend with authentication
   ↓
4. Backend validates user permissions and file security
   ↓
5. File temporarily stored and queued for processing
   ↓
6. AI models process file based on type:
   - Images: FaceNet + DeepFace analysis
   - Audio: Resemblyzer + ECAPA-TDNN analysis  
   - Video: Combined facial and audio analysis
   ↓
7. Results stored in database with confidence scores
   ↓
8. Real-time response sent back to frontend
   ↓
9. Results displayed in modal with detailed analysis
   ↓
10. Temporary files cleaned up
```

### Authentication Flow

```
1. User clicks "Sign in with Google"
   ↓
2. Frontend redirects to Google OAuth
   ↓
3. User authorizes application
   ↓
4. Google returns authorization code
   ↓
5. Backend exchanges code for user profile
   ↓
6. User record created/updated in database
   ↓
7. JWT token generated and returned
   ↓
8. Frontend stores token and updates auth state
   ↓
9. Subsequent requests include JWT in Authorization header
   ↓
10. Backend validates JWT for protected routes
```

## Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Security Layers                               │
│                                                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   HTTPS/TLS     │  │  Google OAuth2  │  │   JWT Tokens    │    │
│  │  Encryption     │  │ Authentication  │  │  Authorization  │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │  Input          │  │   File Security │  │   Rate Limiting │    │
│  │  Validation     │  │   Scanning      │  │   & Monitoring  │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

### File Security Pipeline

```
File Upload → MIME Validation → Size Check → Content Scan → Hash Calculation
     ↓              ↓              ↓            ↓              ↓
Virus Scan → Malware Check → Format Validation → AI Processing → Cleanup
```

## Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(500),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Detection results table
CREATE TABLE detection_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    result VARCHAR(50) NOT NULL,
    confidence DECIMAL(5,2) NOT NULL,
    model VARCHAR(100) NOT NULL,
    processing_time INTEGER NOT NULL,
    file_size INTEGER,
    file_hash VARCHAR(64),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User sessions table
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    session_token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    ip_address INET,
    user_agent TEXT
);
```

## Scalability Architecture

### Horizontal Scaling Strategy

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Load Balancer                                 │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Frontend      │ │   Frontend      │ │   Frontend      │
│   Instance 1    │ │   Instance 2    │ │   Instance N    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                │                │
         └────────────────┼────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     API Gateway                                     │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Backend       │ │   Backend       │ │   Backend       │
│   Instance 1    │ │   Instance 2    │ │   Instance N    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                │                │
         └────────────────┼────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   Shared Database                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### AI Processing Scaling

```
Request Queue → Worker Pool → GPU Cluster → Result Cache
     ↓              ↓            ↓             ↓
 Redis Queue → Python Workers → CUDA Nodes → Redis Cache
```

## Monitoring Architecture

### Observability Stack

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Application Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Structured    │  │   Performance   │  │   Business      │    │
│  │   Logging       │  │   Metrics       │  │   Metrics       │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                     Monitoring Layer                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Prometheus    │  │   Elasticsearch │  │   Grafana       │    │
│  │   Metrics       │  │   Log Storage   │  │   Dashboards    │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                      Alerting Layer                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   PagerDuty     │  │   Slack/Email   │  │   SMS Alerts    │    │
│  │   Integration   │  │   Notifications │  │                 │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## Performance Optimization

### Caching Strategy

```
Browser Cache (Static Assets)
     ↓
CDN Cache (Global Content)
     ↓  
Application Cache (API Responses)
     ↓
Database Query Cache (Frequently Accessed Data)
     ↓
AI Model Cache (Detection Results)
```

### Database Optimization

- **Indexing Strategy**: Optimized indexes on frequently queried columns
- **Partitioning**: Time-based partitioning for detection results
- **Connection Pooling**: Efficient database connection management
- **Read Replicas**: Separate read and write operations

## Deployment Architecture

### Container Strategy

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Kubernetes Cluster                              │
│                                                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Frontend      │  │    Backend      │  │   AI Workers    │    │
│  │   Deployment    │  │   Deployment    │  │   Deployment    │    │
│  │   (3 replicas)  │  │  (5 replicas)   │  │  (2 replicas)   │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   ConfigMaps    │  │    Secrets      │  │   Persistent    │    │
│  │   & Services    │  │   Management    │  │   Volumes       │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

This architecture ensures scalability, security, and maintainability while providing optimal performance for deepfake detection and user experience.