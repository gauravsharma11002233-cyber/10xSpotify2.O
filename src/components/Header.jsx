import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { BackIcon, ForwardIcon } from './Icons';
import './Header.css';

const Header = () => {
  const { user, logout } = useSpotify();

  return (
    <div className="header">
      <div className="header__left">
        <button className="header__button">
          <BackIcon size={20} />
        </button>
        <button className="header__button">
          <ForwardIcon size={20} />
        </button>
      </div>
      
      <div className="header__right">
        {user && (
          <div className="user-info">
            <span className="user-name">{user.display_name || user.id}</span>
            {user.images && user.images[0] && (
              <img 
                src={user.images[0].url} 
                alt="User profile" 
                className="user-image"
              />
            )}
          </div>
        )}
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;