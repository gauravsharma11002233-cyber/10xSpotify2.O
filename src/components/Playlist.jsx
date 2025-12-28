import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpotify } from '../context/SpotifyContext';
import { PlayIcon } from './Icons';
import './Playlist.css';

const Playlist = () => {
  const { id } = useParams();
  const { sdk } = useSpotify();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sdk && id) {
      fetchPlaylist();
    }
  }, [sdk, id]);

  const fetchPlaylist = async () => {
    try {
      setIsLoading(true);
      const playlistData = await sdk.playlists.getPlaylist(id);
      setPlaylist(playlistData);
      
      const tracksData = await sdk.playlists.getPlaylistItems(id);
      setTracks(tracksData.items);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playPlaylist = async () => {
    if (sdk && playlist) {
      try {
        // In a real implementation, you would start playing the playlist
        console.log('Playing playlist:', playlist.name);
      } catch (error) {
        console.error('Error playing playlist:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="playlist">
        <div className="playlist__loading">Loading playlist...</div>
      </div>
    );
  }

  return (
    <div className="playlist">
      {playlist && (
        <div className="playlist__header">
          <img 
            src={playlist.images[0]?.url || '/placeholder.jpg'} 
            alt={playlist.name} 
            className="playlist__image"
          />
          <div className="playlist__info">
            <h1>{playlist.name}</h1>
            <p>{playlist.description?.replace(/<[^>]*>/g, '') || 'A Spotify playlist'}</p>
            <div className="playlist__meta">
              <span>{playlist.owner.display_name}</span>
              <span>•</span>
              <span>{playlist.tracks.total} songs</span>
            </div>
          </div>
          <button className="playlist__play-button" onClick={playPlaylist}>
            <PlayIcon size={24} />
          </button>
        </div>
      )}
      
      <div className="playlist__tracks">
        {tracks.map((item, index) => {
          const track = item.track;
          return (
            <div key={track.id} className="track-item">
              <div className="track-number">{index + 1}</div>
              <img 
                src={track.album.images[0]?.url || '/placeholder.jpg'} 
                alt={track.name} 
                className="track-image"
              />
              <div className="track-info">
                <h4>{track.name}</h4>
                <p>{track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
              <div className="track-album">{track.album.name}</div>
              <div className="track-duration">
                {Math.floor(track.duration_ms / 60000)}:
                {Math.floor((track.duration_ms % 60000) / 1000)
                  .toString()
                  .padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;