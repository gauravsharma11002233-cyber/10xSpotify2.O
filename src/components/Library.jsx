import React, { useState, useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import './Library.css';

const Library = () => {
  const { sdk } = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [activeTab, setActiveTab] = useState('playlists');

  useEffect(() => {
    if (sdk) {
      fetchLibraryData();
    }
  }, [sdk]);

  const fetchLibraryData = async () => {
    try {
      // Get user's playlists
      const userPlaylists = await sdk.playlists.getUserPlaylists();
      setPlaylists(userPlaylists.items);

      // Get saved tracks
      const tracks = await sdk.library.getUsersSavedTracks();
      setSavedTracks(tracks.items);

      // Get saved albums
      const albums = await sdk.library.getUsersSavedAlbums();
      setSavedAlbums(albums.items);
    } catch (error) {
      console.error('Error fetching library data:', error);
    }
  };

  return (
    <div className="library">
      <div className="library__header">
        <h1>Your Library</h1>
      </div>
      
      <div className="library__tabs">
        <button 
          className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
        <button 
          className={`tab ${activeTab === 'liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked')}
        >
          Liked Songs
        </button>
        <button 
          className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
      </div>
      
      <div className="library__content">
        {activeTab === 'playlists' && (
          <div className="library-section">
            <div className="library-items">
              {playlists.map(playlist => (
                <div key={playlist.id} className="library-item">
                  <img 
                    src={playlist.images[0]?.url || '/placeholder.jpg'} 
                    alt={playlist.name} 
                  />
                  <div className="library-item-info">
                    <h3>{playlist.name}</h3>
                    <p>Playlist • {playlist.tracks.total} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'liked' && (
          <div className="library-section">
            <div className="library-items">
              {savedTracks.map((item, index) => (
                <div key={item.track.id} className="library-item">
                  <img 
                    src={item.track.album.images[0]?.url || '/placeholder.jpg'} 
                    alt={item.track.name} 
                  />
                  <div className="library-item-info">
                    <h3>{item.track.name}</h3>
                    <p>{item.track.artists.map(artist => artist.name).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'albums' && (
          <div className="library-section">
            <div className="library-items">
              {savedAlbums.map(item => (
                <div key={item.album.id} className="library-item">
                  <img 
                    src={item.album.images[0]?.url || '/placeholder.jpg'} 
                    alt={item.album.name} 
                  />
                  <div className="library-item-info">
                    <h3>{item.album.name}</h3>
                    <p>Album • {item.album.artists.map(artist => artist.name).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;