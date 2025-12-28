import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import './NowPlayingBar.css';

const NowPlayingBar = () => {
  const { currentTrack } = useSpotify();

  if (!currentTrack) return null;

  return (
    <div className="now-playing-bar">
      <div className="now-playing-content">
        <img 
          src={currentTrack.album?.images[0]?.url || '/placeholder.jpg'} 
          alt={currentTrack.name}
          className="now-playing-image"
        />
        <div className="now-playing-info">
          <h4>{currentTrack.name}</h4>
          <p>{currentTrack.artists?.map(artist => artist.name).join(', ')}</p>
        </div>
        <button className="now-playing-like">
          <i className="material-icons">favorite_border</i>
        </button>
      </div>
    </div>
  );
};

export default NowPlayingBar;
