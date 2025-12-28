import React, { useState, useEffect } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { PlayIcon } from './Icons';
import './Browse.css';

const Browse = () => {
  const { sdk } = useSpotify();
  const [categories, setCategories] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    if (sdk) {
      fetchBrowseContent();
    }
  }, [sdk]);

  const fetchBrowseContent = async () => {
    try {
      // Fetch browse categories
      const categoriesData = await sdk.browse.getCategories();
      setCategories(categoriesData.categories.items || []);

      // Fetch new releases
      const releasesData = await sdk.browse.getNewReleases();
      setNewReleases(releasesData.albums.items || []);

      // Fetch featured playlists
      const featuredData = await sdk.browse.getFeaturedPlaylists();
      setFeatured(featuredData.playlists.items || []);
    } catch (error) {
      console.error('Error fetching browse content:', error);
    }
  };

  const browseCategories = [
    { name: 'Podcasts', color: '#8400e7' },
    { name: 'Made For You', color: '#1e3264' },
    { name: 'New Releases', color: '#e13300' },
    { name: 'Hip-Hop', color: '#ba5d07' },
    { name: 'Pop', color: '#8d67ab' },
    { name: 'Latin', color: '#e8115b' },
    { name: 'Rock', color: '#dc148c' },
    { name: 'Workout', color: '#509bf5' },
    { name: 'Chill', color: '#777777' },
    { name: 'R&B', color: '#8d67ab' },
    { name: 'Country', color: '#bc5900' },
    { name: 'Jazz', color: '#777777' },
    { name: 'Indie', color: '#608108' },
    { name: 'Focus', color: '#503750' },
    { name: 'Party', color: '#af2896' },
    { name: 'Sleep', color: '#1e3264' },
  ];

  return (
    <div className="browse">
      <div className="browse__header">
        <h1>Browse All</h1>
      </div>

      <section className="browse__categories">
        {browseCategories.map((category, index) => (
          <div 
            key={index} 
            className="category-card"
            style={{ backgroundColor: category.color }}
          >
            <h3>{category.name}</h3>
          </div>
        ))}
      </section>

      <section className="browse__section">
        <div className="section-header">
          <h2>New Releases</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="browse__grid">
          {newReleases.slice(0, 6).map((album) => (
            <div key={album.id} className="browse-card">
              <div className="browse-card__image">
                <img src={album.images[0]?.url} alt={album.name} />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <h3>{album.name}</h3>
              <p>{album.artists.map(a => a.name).join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="browse__section">
        <div className="section-header">
          <h2>Featured Playlists</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        <div className="browse__grid">
          {featured.slice(0, 6).map((playlist) => (
            <div key={playlist.id} className="browse-card">
              <div className="browse-card__image">
                <img src={playlist.images[0]?.url} alt={playlist.name} />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <h3>{playlist.name}</h3>
              <p>{playlist.description?.replace(/<[^>]*>/g, '').substring(0, 50) || 'Playlist'}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Browse;
