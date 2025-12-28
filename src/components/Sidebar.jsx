import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, LibraryIcon, PlusIcon, LikeIcon } from './Icons';
import logo from '../assets/icon.jpg';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link to="/" className="sidebar__logo">
          <img src={logo} alt="10xSpotify Logo" className="sidebar__logo-img" />
          <h2>10xSpotify2.O</h2>
        </Link>
        
        <div className="sidebar__nav">
          <Link to="/" className={`sidebar__link ${location.pathname === '/' ? 'active' : ''}`}>
            <HomeIcon size={24} active={location.pathname === '/'} />
            <span>Home</span>
          </Link>
          <Link to="/search" className={`sidebar__link ${location.pathname === '/search' ? 'active' : ''}`}>
            <SearchIcon size={24} active={location.pathname === '/search'} />
            <span>Search</span>
          </Link>
          <Link to="/library" className={`sidebar__link ${location.pathname === '/library' ? 'active' : ''}`}>
            <LibraryIcon size={24} active={location.pathname === '/library'} />
            <span>Your Library</span>
          </Link>
        </div>
        
        <div className="sidebar__playlists">
          <div className="sidebar__title">
            <span>PLAYLISTS</span>
            <PlusIcon size={16} />
          </div>
          
          <div className="sidebar__playlist">
            <span>Liked Songs</span>
          </div>
          <div className="sidebar__playlist">
            <span>Discover Weekly</span>
          </div>
          <div className="sidebar__playlist">
            <span>Release Radar</span>
          </div>
          <div className="sidebar__playlist">
            <span>Daily Mix 1</span>
          </div>
          <div className="sidebar__playlist">
            <span>Daily Mix 2</span>
          </div>
          <div className="sidebar__playlist">
            <span>Chill Vibes</span>
          </div>
          <div className="sidebar__playlist">
            <span>Workout Hits</span>
          </div>
          <div className="sidebar__playlist">
            <span>Road Trip</span>
          </div>
        </div>
      </div>
      
      <div className="sidebar__bottom">
        <div className="sidebar__install">
          <svg role="img" height="24" width="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
            <path d="M12 6.05a1 1 0 0 1 1 1v7.486l1.793-1.793a1 1 0 1 1 1.414 1.414L12 18.364l-4.207-4.207a1 1 0 1 1 1.414-1.414L11 14.536V7.05a1 1 0 0 1 1-1z"></path>
          </svg>
          <span>Install App</span>
        </div>
        <div className="sidebar__create-playlist">
          <PlusIcon size={24} />
          <span>Create Playlist</span>
        </div>
        <div className="sidebar__create-playlist">
          <LikeIcon size={24} active={true} />
          <span>Liked Songs</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;