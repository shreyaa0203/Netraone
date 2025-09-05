# API Documentation

## Base URL
- Development: `http://localhost:8000`
- Production: `https://api.deepguard-ai.com`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { ... }
  }
}
```

## Endpoints

### Authentication Endpoints

#### Google OAuth Login
```
POST /api/auth/google
```

**Request Body:**
```json
{
  "token": "google-oauth-token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "jwt-token",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "User Name",
      "picture": "https://example.com/avatar.jpg"
    }
  }
}
```

#### Get User Profile
```
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://example.com/avatar.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

#### Refresh Token
```
POST /api/auth/refresh
```

**Headers:**
```
Authorization: Bearer <current-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "new-jwt-token"
  }
}
```

#### Logout
```
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### Detection Endpoints

#### Upload File for Detection
```
POST /api/detect
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

**Request Body:**
```
file: <binary-file-data>
```

**Supported File Types:**
- Images: JPEG, PNG, WebP (max 10MB)
- Videos: MP4, AVI, MOV (max 100MB)  
- Audio: MP3, WAV, M4A (max 50MB)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "detection-uuid",
    "file_name": "example.jpg",
    "file_type": "image",
    "result": "authentic",
    "confidence": 87.5,
    "model": "FaceNet + DeepFace",
    "processing_time": 2350,
    "created_at": "2024-01-01T00:00:00Z",
    "details": {
      "faces_detected": 1,
      "authenticity_score": 0.875,
      "consistency_score": 0.92,
      "artifact_score": 0.81
    }
  }
}
```

**Error Responses:**
```json
// File too large
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit",
    "details": {
      "max_size": "10MB",
      "file_size": "15MB"
    }
  }
}

// Unsupported file type
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "File type not supported",
    "details": {
      "supported_types": ["image/jpeg", "image/png", "video/mp4"]
    }
  }
}
```

#### Get Detection History
```
GET /api/history?limit=20&offset=0&file_type=all&result=all
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 20, max: 100)
- `offset` (optional): Number of results to skip (default: 0)
- `file_type` (optional): Filter by file type (`image`, `video`, `audio`, `all`)
- `result` (optional): Filter by result (`authentic`, `deepfake`, `all`)
- `sort` (optional): Sort order (`created_at_desc`, `created_at_asc`, `confidence_desc`)

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "detection-uuid",
        "file_name": "example.jpg",
        "file_type": "image",
        "result": "authentic",
        "confidence": 87.5,
        "model": "FaceNet + DeepFace",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 45,
      "limit": 20,
      "offset": 0,
      "has_next": true
    }
  }
}
```

#### Get Detection Details
```
GET /api/detect/{detection_id}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "detection-uuid",
    "file_name": "example.jpg",
    "file_type": "image",
    "result": "authentic",
    "confidence": 87.5,
    "model": "FaceNet + DeepFace",
    "processing_time": 2350,
    "created_at": "2024-01-01T00:00:00Z",
    "details": {
      "faces_detected": 1,
      "authenticity_score": 0.875,
      "consistency_score": 0.92,
      "artifact_score": 0.81,
      "technical_analysis": {
        "image_dimensions": "1920x1080",
        "color_space": "RGB",
        "compression_ratio": 0.85,
        "metadata_found": true
      }
    }
  }
}
```

### Statistics Endpoints

#### Get User Statistics
```
GET /api/stats?period=30d
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `period` (optional): Time period (`7d`, `30d`, `90d`, `1y`, `all`)

**Response:**
```json
{
  "success": true,
  "data": {
    "total_scans": 156,
    "authentic_files": 123,
    "deepfake_files": 33,
    "avg_confidence": 84.2,
    "file_type_breakdown": {
      "image": 89,
      "video": 45,
      "audio": 22
    },
    "monthly_trends": [
      {
        "month": "2024-01",
        "scans": 45,
        "authentics": 38,
        "deepfakes": 7
      }
    ],
    "model_performance": {
      "FaceNet + DeepFace": {
        "accuracy": 95.2,
        "avg_processing_time": 2100
      }
    }
  }
}
```

#### Get System Statistics (Admin Only)
```
GET /api/stats/system
```

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_users": 1247,
    "total_detections": 15632,
    "daily_active_users": 89,
    "avg_processing_time": 2250,
    "system_health": {
      "cpu_usage": 45.2,
      "memory_usage": 67.8,
      "disk_usage": 23.4,
      "database_connections": 12
    }
  }
}
```

### Content Endpoints

#### Get Cyber Security News
```
GET /api/news?limit=10&source=all
```

**Query Parameters:**
- `limit` (optional): Number of articles to return (default: 10, max: 50)
- `source` (optional): Filter by news source (`all`, `inshorts`, `cybersecurity_today`)

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "news-uuid",
        "title": "New Deepfake Detection Method Developed",
        "content": "Researchers have developed a new method...",
        "url": "https://example.com/article",
        "published_at": "2024-01-01T00:00:00Z",
        "source": "CyberSecurity Today",
        "category": "technology"
      }
    ],
    "last_updated": "2024-01-01T12:00:00Z"
  }
}
```

#### Get Blog Articles
```
GET /api/blog?limit=10&category=all&search=deepfake
```

**Query Parameters:**
- `limit` (optional): Number of articles to return (default: 10, max: 50)
- `category` (optional): Filter by category (`technology`, `security`, `awareness`, `legal`)
- `search` (optional): Search in title and content

**Response:**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "blog-uuid",
        "title": "Understanding Deepfake Technology",
        "excerpt": "Learn about the basics of deepfake technology...",
        "content": "Full article content...",
        "author": "Dr. Sarah Chen",
        "published_at": "2024-01-01T00:00:00Z",
        "tags": ["technology", "education", "ai"],
        "read_time": 8,
        "category": "technology"
      }
    ],
    "categories": ["technology", "security", "awareness", "legal"],
    "total": 45
  }
}
```

#### Get Awareness Content
```
GET /api/awareness?type=all
```

**Query Parameters:**
- `type` (optional): Content type (`alerts`, `tips`, `guides`, `all`)

**Response:**
```json
{
  "success": true,
  "data": {
    "scam_alerts": [
      {
        "id": "alert-uuid",
        "title": "Voice Cloning Phone Scams",
        "severity": "high",
        "description": "Criminals are using AI to clone voices...",
        "prevention_tips": [
          "Ask personal questions only the real person would know",
          "Hang up and call them back on their known number"
        ],
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "detection_tips": [
      {
        "icon": "eye",
        "title": "Visual Inconsistencies",
        "description": "Look for unnatural blinking patterns..."
      }
    ],
    "prevention_guides": [
      {
        "step": 1,
        "title": "Educate Yourself",
        "description": "Stay informed about deepfake technology...",
        "action": "Read our blog posts and follow security news"
      }
    ]
  }
}
```

### File Management Endpoints

#### Download Detection Report
```
GET /api/reports/{detection_id}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="detection-report.pdf"

<PDF file binary data>
```

#### Export Detection History
```
POST /api/export/history
```

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "format": "csv",
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "filters": {
    "file_type": "all",
    "result": "all"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "download_url": "https://api.example.com/downloads/export-uuid.csv",
    "expires_at": "2024-01-01T01:00:00Z"
  }
}
```

## Rate Limiting

API endpoints are rate limited per user:
- Authentication endpoints: 10 requests per minute
- Detection endpoints: 20 requests per hour for free users, 100 for premium
- Other endpoints: 100 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 15
X-RateLimit-Reset: 1609459200
```

## Error Codes

### Authentication Errors
- `AUTH_REQUIRED`: Authentication required
- `TOKEN_INVALID`: Invalid or expired token
- `TOKEN_EXPIRED`: Token has expired
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions

### File Upload Errors
- `FILE_TOO_LARGE`: File exceeds size limit
- `UNSUPPORTED_FILE_TYPE`: File type not supported
- `FILE_CORRUPTED`: File appears to be corrupted
- `SECURITY_SCAN_FAILED`: File failed security scan

### Processing Errors
- `DETECTION_FAILED`: AI detection processing failed
- `MODEL_UNAVAILABLE`: Required AI model is unavailable
- `PROCESSING_TIMEOUT`: Detection processing timed out

### General Errors
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal server error
- `MAINTENANCE_MODE`: System under maintenance

## WebSocket Events (Future Enhancement)

For real-time detection progress:

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:8000/ws/detection');

// Listen for detection progress
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('Detection progress:', data.progress);
};
```

## SDK Usage Examples

### JavaScript/TypeScript
```typescript
import { DeepGuardAPI } from '@deepguard/api-client';

const api = new DeepGuardAPI({
  baseURL: 'https://api.deepguard-ai.com',
  apiKey: 'your-jwt-token'
});

// Upload file for detection
const result = await api.detect.uploadFile(file);
console.log('Detection result:', result.data);

// Get user statistics
const stats = await api.stats.getUser({ period: '30d' });
console.log('User stats:', stats.data);
```

### Python
```python
from deepguard_api import DeepGuardClient

client = DeepGuardClient(
    base_url='https://api.deepguard-ai.com',
    api_key='your-jwt-token'
)

# Upload file for detection
with open('image.jpg', 'rb') as file:
    result = client.detect.upload_file(file)
    print(f"Detection result: {result.data}")

# Get detection history
history = client.history.list(limit=20, file_type='image')
print(f"History: {history.data}")
```

This API documentation provides comprehensive coverage of all available endpoints with detailed request/response examples and error handling information.