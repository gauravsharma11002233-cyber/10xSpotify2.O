import React, { useEffect, useState } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { PlayIcon } from './Icons';
import './MainContent.css';

const MainContent = () => {
  const { sdk, user } = useSpotify();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (sdk && user) {
      fetchFeaturedPlaylists();
      fetchNewReleases();
      fetchRecentlyPlayed();
    }
  }, [sdk, user]);

  const fetchFeaturedPlaylists = async () => {
    try {
      const data = await sdk.browse.getFeaturedPlaylists();
      setFeaturedPlaylists(data.playlists.items);
    } catch (error) {
      console.error('Error fetching featured playlists:', error);
    }
  };

  const fetchNewReleases = async () => {
    try {
      const data = await sdk.browse.getNewReleases();
      setNewReleases(data.albums.items);
    } catch (error) {
      console.error('Error fetching new releases:', error);
    }
  };

  const fetchRecentlyPlayed = async () => {
    try {
      const data = await sdk.player.getRecentlyPlayed();
      setRecentlyPlayed(data.items);
    } catch (error) {
      console.error('Error fetching recently played:', error);
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="main-content">
      <div className="greeting">
        <h1>{getTimeOfDay()}</h1>
      </div>

      <section className="section quick-picks">
        <div className="quick-picks-grid">
          {recentlyPlayed.slice(0, 6).map((item, index) => (
            <div key={index} className="quick-pick-card">
              <img 
                src={item.track.album.images[0]?.url || '/placeholder.jpg'} 
                alt={item.track.name} 
              />
              <span>{item.track.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Your top mixes</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="cards-horizontal">
          {featuredPlaylists.slice(0, 7).map((playlist) => (
            <div key={playlist.id} className="card">
              <div className="card-image-wrapper">
                <img 
                  src={playlist.images[0]?.url || '/placeholder.jpg'} 
                  alt={playlist.name} 
                />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <div className="card-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.description?.replace(/<[^>]*>/g, '').substring(0, 60) || 'Spotify Playlist'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Made For You</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="cards-horizontal">
          {featuredPlaylists.slice(7, 14).map((playlist) => (
            <div key={playlist.id} className="card">
              <div className="card-image-wrapper">
                <img 
                  src={playlist.images[0]?.url || '/placeholder.jpg'} 
                  alt={playlist.name} 
                />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <div className="card-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.description?.replace(/<[^>]*>/g, '').substring(0, 60) || 'Personalized playlist'}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recently played</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="cards-horizontal">
          {recentlyPlayed.slice(0, 7).map((item, index) => (
            <div key={index} className="card">
              <div className="card-image-wrapper">
                <img 
                  src={item.track.album.images[0]?.url || '/placeholder.jpg'} 
                  alt={item.track.name} 
                />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <div className="card-info">
                <h3>{item.track.name}</h3>
                <p>{item.track.artists.map(a => a.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>New releases for you</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="cards-horizontal">
          {newReleases.slice(0, 7).map((album) => (
            <div key={album.id} className="card">
              <div className="card-image-wrapper">
                <img 
                  src={album.images[0]?.url || '/placeholder.jpg'} 
                  alt={album.name} 
                />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <div className="card-info">
                <h3>{album.name}</h3>
                <p>{album.artists.map(a => a.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;