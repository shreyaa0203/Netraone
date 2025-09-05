"""
Utility functions for file handling and validation
"""

import os
import hashlib
import tempfile
from typing import Optional, Dict, Any, List
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class FileHandler:
    """Utility class for handling file operations"""
    
    # Supported file types and their MIME types
    SUPPORTED_TYPES = {
        'image': [
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/webp',
            'image/gif'
        ],
        'video': [
            'video/mp4',
            'video/avi', 
            'video/mov',
            'video/quicktime',
            'video/x-msvideo'
        ],
        'audio': [
            'audio/mpeg',
            'audio/mp3',
            'audio/wav',
            'audio/wave',
            'audio/x-wav',
            'audio/mp4',
            'audio/x-m4a'
        ]
    }
    
    # Maximum file sizes (in bytes)
    MAX_FILE_SIZES = {
        'image': 10 * 1024 * 1024,   # 10MB
        'video': 100 * 1024 * 1024,  # 100MB
        'audio': 50 * 1024 * 1024    # 50MB
    }
    
    @classmethod
    def validate_file_type(cls, content_type: str) -> Optional[str]:
        """
        Validate file type based on MIME type
        
        Args:
            content_type: MIME type of the file
            
        Returns:
            File category ('image', 'video', 'audio') if valid, None otherwise
        """
        for category, mime_types in cls.SUPPORTED_TYPES.items():
            if content_type.lower() in mime_types:
                return category
        return None
    
    @classmethod
    def validate_file_size(cls, file_size: int, file_type: str) -> bool:
        """
        Validate file size based on type
        
        Args:
            file_size: Size of the file in bytes
            file_type: Type of file ('image', 'video', 'audio')
            
        Returns:
            True if size is valid, False otherwise
        """
        max_size = cls.MAX_FILE_SIZES.get(file_type)
        if not max_size:
            return False
        
        return file_size <= max_size
    
    @classmethod
    def calculate_file_hash(cls, file_content: bytes) -> str:
        """
        Calculate SHA-256 hash of file content
        
        Args:
            file_content: File content as bytes
            
        Returns:
            Hexadecimal hash string
        """
        return hashlib.sha256(file_content).hexdigest()
    
    @classmethod
    def save_temp_file(cls, file_content: bytes, filename: str) -> str:
        """
        Save file content to temporary file
        
        Args:
            file_content: File content as bytes
            filename: Original filename
            
        Returns:
            Path to temporary file
        """
        try:
            # Get file extension
            file_extension = Path(filename).suffix
            
            # Create temporary file
            temp_file = tempfile.NamedTemporaryFile(
                delete=False, 
                suffix=file_extension
            )
            
            # Write content to file
            temp_file.write(file_content)
            temp_file.flush()
            temp_file.close()
            
            logger.info(f"Saved temporary file: {temp_file.name}")
            return temp_file.name
            
        except Exception as e:
            logger.error(f"Error saving temporary file: {str(e)}")
            raise
    
    @classmethod
    def cleanup_temp_file(cls, file_path: str) -> None:
        """
        Clean up temporary file
        
        Args:
            file_path: Path to temporary file
        """
        try:
            if os.path.exists(file_path):
                os.unlink(file_path)
                logger.info(f"Cleaned up temporary file: {file_path}")
        except Exception as e:
            logger.warning(f"Error cleaning up temporary file {file_path}: {str(e)}")
    
    @classmethod
    def get_file_info(cls, file_path: str) -> Dict[str, Any]:
        """
        Get information about a file
        
        Args:
            file_path: Path to the file
            
        Returns:
            Dictionary containing file information
        """
        try:
            stat_result = os.stat(file_path)
            
            return {
                'size': stat_result.st_size,
                'created': stat_result.st_ctime,
                'modified': stat_result.st_mtime,
                'extension': Path(file_path).suffix.lower(),
                'name': Path(file_path).name
            }
            
        except Exception as e:
            logger.error(f"Error getting file info: {str(e)}")
            return {}
    
    @classmethod
    def is_safe_filename(cls, filename: str) -> bool:
        """
        Check if filename is safe (no path traversal attempts)
        
        Args:
            filename: Filename to check
            
        Returns:
            True if filename is safe, False otherwise
        """
        # Check for path traversal attempts
        if '..' in filename or '/' in filename or '\\' in filename:
            return False
        
        # Check for system files
        dangerous_names = ['con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 
                          'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 
                          'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 
                          'lpt7', 'lpt8', 'lpt9']
        
        name_without_ext = Path(filename).stem.lower()
        if name_without_ext in dangerous_names:
            return False
        
        return True

class SecurityScanner:
    """Security scanner for uploaded files"""
    
    @classmethod
    def scan_file_content(cls, file_content: bytes, file_type: str) -> Dict[str, Any]:
        """
        Scan file content for potential security threats
        
        Args:
            file_content: File content as bytes
            file_type: Type of file
            
        Returns:
            Security scan results
        """
        results = {
            'is_safe': True,
            'threats_detected': [],
            'file_hash': FileHandler.calculate_file_hash(file_content),
            'content_length': len(file_content)
        }
        
        try:
            # Check for suspicious patterns in file headers
            suspicious_patterns = [
                b'<script',      # JavaScript
                b'<?php',        # PHP
                b'#!/bin/',      # Shell scripts
                b'MZ',           # Windows executables
                b'\x7fELF'       # Linux executables
            ]
            
            file_header = file_content[:1024].lower()  # Check first 1KB
            
            for pattern in suspicious_patterns:
                if pattern.lower() in file_header:
                    results['is_safe'] = False
                    results['threats_detected'].append(f"Suspicious pattern detected: {pattern.decode('utf-8', errors='ignore')}")
            
            # Additional checks based on file type
            if file_type == 'image':
                results.update(cls._scan_image_content(file_content))
            elif file_type == 'audio':
                results.update(cls._scan_audio_content(file_content))
            elif file_type == 'video':
                results.update(cls._scan_video_content(file_content))
            
            logger.info(f"Security scan completed. Safe: {results['is_safe']}")
            return results
            
        except Exception as e:
            logger.error(f"Error during security scan: {str(e)}")
            # Default to unsafe if scan fails
            results['is_safe'] = False
            results['threats_detected'].append("Security scan failed")
            return results
    
    @classmethod
    def _scan_image_content(cls, content: bytes) -> Dict[str, Any]:
        """Scan image-specific content"""
        results = {'image_specific_threats': []}
        
        # Check for EXIF data that might contain malicious code
        if b'Exif' in content[:2048]:
            results['image_specific_threats'].append("EXIF data present - review manually")
        
        return results
    
    @classmethod
    def _scan_audio_content(cls, content: bytes) -> Dict[str, Any]:
        """Scan audio-specific content"""
        results = {'audio_specific_threats': []}
        
        # Check for embedded metadata
        if b'ID3' in content[:512]:
            results['audio_specific_threats'].append("ID3 tags present")
        
        return results
    
    @classmethod
    def _scan_video_content(cls, content: bytes) -> Dict[str, Any]:
        """Scan video-specific content"""
        results = {'video_specific_threats': []}
        
        # Check for common video headers
        video_headers = [b'ftyp', b'moov', b'RIFF', b'\x00\x00\x00 ftyp']
        header_found = False
        
        for header in video_headers:
            if header in content[:512]:
                header_found = True
                break
        
        if not header_found:
            results['video_specific_threats'].append("Suspicious video format")
        
        return results