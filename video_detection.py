"""
Video deepfake detection combining facial and audio analysis
"""

import numpy as np
import cv2
from typing import Dict, Any, List
import logging
import tempfile
import os
from .face_detection import FaceNetDetector
from .voice_detection import ResemblyzerDetector, ECAPATDNNDetector

class VideoDeepfakeDetector:
    """
    Combined video deepfake detection using facial and audio analysis
    """
    
    def __init__(self):
        """Initialize video detector with sub-detectors"""
        self.logger = logging.getLogger(__name__)
        self.face_detector = FaceNetDetector()
        self.voice_detector = ResemblyzerDetector()
        self.speaker_detector = ECAPATDNNDetector()
    
    def extract_frames(self, video_path: str, max_frames: int = 30) -> List[np.ndarray]:
        """
        Extract frames from video for analysis
        
        Args:
            video_path: Path to the video file
            max_frames: Maximum number of frames to extract
            
        Returns:
            List of extracted frames
        """
        try:
            cap = cv2.VideoCapture(video_path)
            if not cap.isOpened():
                raise ValueError(f"Could not open video file: {video_path}")
            
            frames = []
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            fps = cap.get(cv2.CAP_PROP_FPS)
            
            # Calculate frame sampling interval
            if frame_count <= max_frames:
                step = 1
            else:
                step = frame_count // max_frames
            
            frame_idx = 0
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                if frame_idx % step == 0:
                    frames.append(frame)
                    if len(frames) >= max_frames:
                        break
                
                frame_idx += 1
            
            cap.release()
            
            self.logger.info(f"Extracted {len(frames)} frames from video")
            return frames
            
        except Exception as e:
            self.logger.error(f"Error extracting frames: {str(e)}")
            raise
    
    def extract_audio(self, video_path: str) -> str:
        """
        Extract audio track from video
        
        Args:
            video_path: Path to the video file
            
        Returns:
            Path to extracted audio file
        """
        try:
            # Create temporary audio file
            temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
            audio_path = temp_audio.name
            temp_audio.close()
            
            # In production, use ffmpeg or similar to extract audio
            # os.system(f'ffmpeg -i "{video_path}" -vn -acodec wav "{audio_path}"')
            
            # For mock purposes, create a dummy audio file
            import librosa
            dummy_audio = np.random.normal(0, 0.1, 16000 * 5)  # 5 seconds of audio
            import soundfile as sf
            sf.write(audio_path, dummy_audio, 16000)
            
            return audio_path
            
        except Exception as e:
            self.logger.error(f"Error extracting audio: {str(e)}")
            raise
    
    def analyze_temporal_consistency(self, frames: List[np.ndarray]) -> Dict[str, Any]:
        """
        Analyze temporal consistency across video frames
        
        Args:
            frames: List of video frames
            
        Returns:
            Temporal consistency analysis
        """
        try:
            if len(frames) < 2:
                return {'consistency_score': 0.8}
            
            # Analyze frame-to-frame consistency (mock implementation)
            consistency_scores = []
            
            for i in range(len(frames) - 1):
                # In production, implement actual frame comparison
                # Could include:
                # - Facial landmark consistency
                # - Lighting consistency
                # - Color distribution consistency
                # - Motion flow analysis
                
                # Mock consistency calculation
                score = np.random.uniform(0.7, 0.95)
                consistency_scores.append(score)
            
            avg_consistency = np.mean(consistency_scores)
            
            # Check for sudden changes that might indicate splicing
            consistency_variance = np.var(consistency_scores)
            
            return {
                'avg_consistency': float(avg_consistency),
                'consistency_variance': float(consistency_variance),
                'frame_count': len(frames),
                'suspicious_transitions': int(np.sum(np.array(consistency_scores) < 0.75))
            }
            
        except Exception as e:
            self.logger.error(f"Error analyzing temporal consistency: {str(e)}")
            return {'avg_consistency': 0.5}
    
    def analyze_audio_video_sync(self, video_path: str, audio_path: str) -> Dict[str, Any]:
        """
        Analyze audio-video synchronization
        
        Args:
            video_path: Path to the video file
            audio_path: Path to the audio file
            
        Returns:
            Audio-video sync analysis
        """
        try:
            # In production, implement lip-sync analysis
            # This would involve:
            # - Detecting lip movements in video frames
            # - Analyzing audio for speech segments
            # - Computing correlation between lip movement and audio
            
            # Mock sync analysis
            sync_score = np.random.uniform(0.65, 0.9)
            lip_sync_confidence = np.random.uniform(0.7, 0.95)
            
            return {
                'sync_score': float(sync_score),
                'lip_sync_confidence': float(lip_sync_confidence),
                'audio_segments_detected': np.random.randint(3, 10),
                'video_segments_analyzed': np.random.randint(5, 15)
            }
            
        except Exception as e:
            self.logger.error(f"Error analyzing audio-video sync: {str(e)}")
            return {'sync_score': 0.5}
    
    def detect(self, video_path: str) -> Dict[str, Any]:
        """
        Main video deepfake detection method
        
        Args:
            video_path: Path to the video file
            
        Returns:
            Detection results combining facial and audio analysis
        """
        audio_path = None
        try:
            # Extract frames and audio
            frames = self.extract_frames(video_path)
            audio_path = self.extract_audio(video_path)
            
            # Analyze visual components
            # Save first frame for face analysis
            temp_frame = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg')
            cv2.imwrite(temp_frame.name, frames[0])
            
            face_analysis = self.face_detector.detect(temp_frame.name)
            temporal_analysis = self.analyze_temporal_consistency(frames)
            
            # Clean up temp frame file
            os.unlink(temp_frame.name)
            
            # Analyze audio components
            audio_analysis = self.voice_detector.detect(audio_path)
            speaker_analysis = self.speaker_detector.verify_speaker_consistency(audio_path)
            
            # Analyze audio-video synchronization
            sync_analysis = self.analyze_audio_video_sync(video_path, audio_path)
            
            # Combine all analyses
            face_score = face_analysis['confidence'] / 100
            audio_score = audio_analysis['confidence'] / 100
            temporal_score = temporal_analysis['avg_consistency']
            sync_score = sync_analysis['sync_score']
            
            # Weighted combination
            overall_score = (
                face_score * 0.35 +      # Face analysis
                audio_score * 0.25 +     # Audio analysis  
                temporal_score * 0.25 +  # Temporal consistency
                sync_score * 0.15        # Audio-video sync
            )
            
            # Determine final result
            is_authentic = overall_score > 0.72
            confidence = overall_score * 100
            
            return {
                'result': 'authentic' if is_authentic else 'deepfake',
                'confidence': round(confidence, 2),
                'model': 'FaceNet + ECAPA-TDNN',
                'details': {
                    'face_analysis': face_analysis,
                    'audio_analysis': audio_analysis,
                    'temporal_analysis': temporal_analysis,
                    'sync_analysis': sync_analysis,
                    'speaker_analysis': speaker_analysis
                }
            }
            
        except Exception as e:
            self.logger.error(f"Video detection failed: {str(e)}")
            raise
        finally:
            # Clean up temporary audio file
            if audio_path and os.path.exists(audio_path):
                os.unlink(audio_path)