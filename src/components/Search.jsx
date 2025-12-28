import React, { useState } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import './Search.css';

const Search = () => {
  const { sdk } = useSpotify();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    tracks: [],
    artists: [],
    albums: [],
    playlists: []
  });
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || !sdk) return;

    try {
      const results = await sdk.search(searchTerm, ['track', 'artist', 'album', 'playlist']);
      
      setSearchResults({
        tracks: results.tracks?.items || [],
        artists: results.artists?.items || [],
        albums: results.albums?.items || [],
        playlists: results.playlists?.items || []
      });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const renderResults = () => {
    if (activeTab === 'all') {
      return (
        <>
          {searchResults.tracks.length > 0 && (
            <section className="search-section">
              <h2>Tracks</h2>
              <div className="search-results">
                {searchResults.tracks.slice(0, 5).map(track => (
                  <div key={track.id} className="search-result-item">
                    <img 
                      src={track.album.images[0]?.url || '/placeholder.jpg'} 
                      alt={track.name} 
                    />
                    <div className="result-info">
                      <h4>{track.name}</h4>
                      <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {searchResults.artists.length > 0 && (
            <section className="search-section">
              <h2>Artists</h2>
              <div className="search-results">
                {searchResults.artists.slice(0, 5).map(artist => (
                  <div key={artist.id} className="search-result-item">
                    <img 
                      src={artist.images[0]?.url || '/placeholder.jpg'} 
                      alt={artist.name} 
                    />
                    <div className="result-info">
                      <h4>{artist.name}</h4>
                      <p>Artist</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {searchResults.albums.length > 0 && (
            <section className="search-section">
              <h2>Albums</h2>
              <div className="search-results">
                {searchResults.albums.slice(0, 5).map(album => (
                  <div key={album.id} className="search-result-item">
                    <img 
                      src={album.images[0]?.url || '/placeholder.jpg'} 
                      alt={album.name} 
                    />
                    <div className="result-info">
                      <h4>{album.name}</h4>
                      <p>{album.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      );
    } else {
      const results = searchResults[activeTab] || [];
      if (results.length === 0) return null;
      
      return (
        <section className="search-section">
          <div className="search-results">
            {results.map(item => {
              let name, subtitle, image;
              
              if (activeTab === 'tracks') {
                name = item.name;
                subtitle = item.artists.map(artist => artist.name).join(', ');
                image = item.album.images[0]?.url;
              } else if (activeTab === 'artists') {
                name = item.name;
                subtitle = 'Artist';
                image = item.images[0]?.url;
              } else if (activeTab === 'albums') {
                name = item.name;
                subtitle = item.artists.map(artist => artist.name).join(', ');
                image = item.images[0]?.url;
              } else if (activeTab === 'playlists') {
                name = item.name;
                subtitle = item.owner.display_name;
                image = item.images[0]?.url;
              }
              
              return (
                <div key={item.id} className="search-result-item">
                  <img 
                    src={image || '/placeholder.jpg'} 
                    alt={name} 
                  />
                  <div className="result-info">
                    <h4>{name}</h4>
                    <p>{subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  };

  return (
    <div className="search">
      <div className="search__header">
        <form onSubmit={handleSearch} className="search__form">
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search__input"
          />
          <button type="submit" className="search__button">
            <i className="material-icons">search</i>
          </button>
        </form>
      </div>
      
      <div className="search__tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab ${activeTab === 'tracks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracks')}
        >
          Songs
        </button>
        <button 
          className={`tab ${activeTab === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveTab('artists')}
        >
          Artists
        </button>
        <button 
          className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
        <button 
          className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
      </div>
      
      <div className="search__results">
        {renderResults()}
      </div>
    </div>
  );
};

export default Search;