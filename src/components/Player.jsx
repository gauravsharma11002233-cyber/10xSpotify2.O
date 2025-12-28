import React, { useState, useRef } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, ShuffleIcon, RepeatIcon, VolumeIcon, LikeIcon, QueueIcon, DevicesIcon } from './Icons';
import './Player.css';

const Player = () => {
  const { 
    currentTrack, 
    isPlaying, 
    setIsPlaying, 
    volume, 
    setVolume, 
    devices,
    sdk
  } = useSpotify();
  
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0); // 0 = off, 1 = repeat all, 2 = repeat one

  const togglePlay = async () => {
    if (sdk) {
      try {
        if (isPlaying) {
          await sdk.player.pausePlayback();
        } else {
          await sdk.player.resumePlayback();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Error toggling play/pause:', error);
      }
    }
  };

  const skipNext = async () => {
    if (sdk) {
      try {
        await sdk.player.skipToNext();
      } catch (error) {
        console.error('Error skipping to next track:', error);
      }
    }
  };

  const skipPrevious = async () => {
    if (sdk) {
      try {
        await sdk.player.skipToPrevious();
      } catch (error) {
        console.error('Error skipping to previous track:', error);
      }
    }
  };

  const handleVolumeChange = async (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    
    if (sdk) {
      try {
        await sdk.player.setVolume(Math.floor(newVolume * 100));
      } catch (error) {
        console.error('Error setting volume:', error);
      }
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    // In a real implementation, you would seek to this position
  };

  return (
    <div className="player">
      <div className="player__left">
        {currentTrack && (
          <>
            <img 
              src={currentTrack.album?.images[0]?.url || '/placeholder.jpg'} 
              alt={currentTrack.name} 
              className="player__album"
            />
            <div className="player__song-info">
              <h4>{currentTrack.name}</h4>
              <p>{currentTrack.artists?.map(artist => artist.name).join(', ')}</p>
            </div>
            <button className="player__like-button">
              <LikeIcon size={16} />
            </button>
          </>
        )}
      </div>

      <div className="player__center">
        <div className="player__controls">
          <button className="player__control-button" onClick={() => setShuffle(!shuffle)}>
            <ShuffleIcon size={16} active={shuffle} />
          </button>
          <button className="player__control-button" onClick={skipPrevious}>
            <SkipBackIcon size={16} />
          </button>
          <button className="player__control-button large" onClick={togglePlay}>
            {isPlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
          </button>
          <button className="player__control-button" onClick={skipNext}>
            <SkipForwardIcon size={16} />
          </button>
          <button className="player__control-button" onClick={() => setRepeat((repeat + 1) % 3)}>
            <RepeatIcon size={16} active={repeat > 0} repeatOne={repeat === 2} />
          </button>
        </div>
        <div className="player__progress">
          <span className="player__time">0:00</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="player__progress-bar"
          />
          <span className="player__time">3:00</span>
        </div>
      </div>

      <div className="player__right">
        <button className="player__control-button">
          <QueueIcon size={16} />
        </button>
        <button className="player__control-button">
          <DevicesIcon size={16} />
        </button>
        <div className="player__volume">
          <VolumeIcon size={16} level={volume > 0.5 ? 'high' : volume > 0 ? 'medium' : 'mute'} />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            className="player__volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;