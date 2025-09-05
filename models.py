"""
Database models for user data and detection logs
"""

from sqlalchemy import Column, Integer, String, DateTime, Float, Text, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

Base = declarative_base()

class User(Base):
    """User model for authentication and profile data"""
    
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    picture = Column(String)
    google_id = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    # Relationship to detection results
    detection_results = relationship("DetectionResult", back_populates="user")

class DetectionResult(Base):
    """Model for storing deepfake detection results"""
    
    __tablename__ = "detection_results"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    file_name = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # 'image', 'video', 'audio'
    result = Column(String, nullable=False)  # 'authentic' or 'deepfake'
    confidence = Column(Float, nullable=False)
    model = Column(String, nullable=False)
    processing_time = Column(Integer, nullable=False)  # in milliseconds
    file_size = Column(Integer)  # in bytes
    file_hash = Column(String)  # for deduplication
    metadata = Column(Text)  # JSON string for additional details
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationship to user
    user = relationship("User", back_populates="detection_results")

class UserSession(Base):
    """Model for managing user sessions"""
    
    __tablename__ = "user_sessions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    session_token = Column(String, unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    is_active = Column(Boolean, default=True)
    ip_address = Column(String)
    user_agent = Column(String)

class SystemLog(Base):
    """Model for system logging and monitoring"""
    
    __tablename__ = "system_logs"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    level = Column(String, nullable=False)  # INFO, WARNING, ERROR, CRITICAL
    message = Column(Text, nullable=False)
    module = Column(String)
    function = Column(String)
    user_id = Column(String, ForeignKey("users.id"))
    request_id = Column(String)
    timestamp = Column(DateTime, server_default=func.now())
    metadata = Column(Text)  # JSON string for additional context

class APIUsage(Base):
    """Model for tracking API usage and rate limiting"""
    
    __tablename__ = "api_usage"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    endpoint = Column(String, nullable=False)
    method = Column(String, nullable=False)
    status_code = Column(Integer)
    response_time = Column(Float)  # in seconds
    request_size = Column(Integer)  # in bytes
    response_size = Column(Integer)  # in bytes
    timestamp = Column(DateTime, server_default=func.now())
    ip_address = Column(String)