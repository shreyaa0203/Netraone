"""
Authentication service for Google OAuth integration
"""

import os
import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from google.auth.transport import requests
from google.oauth2 import id_token
import logging

logger = logging.getLogger(__name__)

class AuthService:
    """Service for handling authentication and authorization"""
    
    def __init__(self):
        self.jwt_secret = os.getenv("JWT_SECRET", "your-secret-key-here")
        self.jwt_algorithm = "HS256"
        self.jwt_expire_minutes = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))
        self.google_client_id = os.getenv("GOOGLE_CLIENT_ID")
        
    def verify_google_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        Verify Google OAuth token
        
        Args:
            token: Google OAuth token
            
        Returns:
            User information if valid, None otherwise
        """
        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                self.google_client_id
            )
            
            # Token is valid, extract user information
            user_info = {
                'google_id': idinfo['sub'],
                'email': idinfo['email'],
                'name': idinfo['name'],
                'picture': idinfo.get('picture', ''),
                'email_verified': idinfo.get('email_verified', False)
            }
            
            logger.info(f"Successfully verified Google token for user: {user_info['email']}")
            return user_info
            
        except ValueError as e:
            logger.error(f"Invalid Google token: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error verifying Google token: {str(e)}")
            return None
    
    def create_jwt_token(self, user_data: Dict[str, Any]) -> str:
        """
        Create JWT token for authenticated user
        
        Args:
            user_data: User information
            
        Returns:
            JWT token string
        """
        try:
            # Create token payload
            payload = {
                'user_id': user_data['id'],
                'email': user_data['email'],
                'exp': datetime.utcnow() + timedelta(minutes=self.jwt_expire_minutes),
                'iat': datetime.utcnow()
            }
            
            # Create and return token
            token = jwt.encode(payload, self.jwt_secret, algorithm=self.jwt_algorithm)
            
            logger.info(f"Created JWT token for user: {user_data['email']}")
            return token
            
        except Exception as e:
            logger.error(f"Error creating JWT token: {str(e)}")
            raise
    
    def verify_jwt_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        Verify JWT token
        
        Args:
            token: JWT token string
            
        Returns:
            Token payload if valid, None otherwise
        """
        try:
            # Decode and verify token
            payload = jwt.decode(
                token, 
                self.jwt_secret, 
                algorithms=[self.jwt_algorithm]
            )
            
            return payload
            
        except jwt.ExpiredSignatureError:
            logger.warning("JWT token has expired")
            return None
        except jwt.InvalidTokenError as e:
            logger.warning(f"Invalid JWT token: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Error verifying JWT token: {str(e)}")
            return None
    
    def refresh_token(self, token: str) -> Optional[str]:
        """
        Refresh JWT token
        
        Args:
            token: Current JWT token
            
        Returns:
            New JWT token if valid, None otherwise
        """
        try:
            # Verify current token
            payload = self.verify_jwt_token(token)
            if not payload:
                return None
            
            # Create new token with fresh expiration
            user_data = {
                'id': payload['user_id'],
                'email': payload['email']
            }
            
            new_token = self.create_jwt_token(user_data)
            
            logger.info(f"Refreshed JWT token for user: {user_data['email']}")
            return new_token
            
        except Exception as e:
            logger.error(f"Error refreshing JWT token: {str(e)}")
            return None
    
    def extract_user_from_token(self, authorization_header: str) -> Optional[Dict[str, Any]]:
        """
        Extract user information from Authorization header
        
        Args:
            authorization_header: Bearer token from request header
            
        Returns:
            User information if valid, None otherwise
        """
        try:
            if not authorization_header or not authorization_header.startswith("Bearer "):
                return None
            
            token = authorization_header.split(" ")[1]
            payload = self.verify_jwt_token(token)
            
            if payload:
                return {
                    'user_id': payload['user_id'],
                    'email': payload['email']
                }
            
            return None
            
        except Exception as e:
            logger.error(f"Error extracting user from token: {str(e)}")
            return None

# Global auth service instance
auth_service = AuthService()