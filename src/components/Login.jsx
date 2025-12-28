import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import './Login.css';

const Login = () => {
  const { login } = useSpotify();

  return (
    <div className="login">
      <div className="login__container">
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
          alt="Spotify Logo" 
        />
        <h1>10xSpotify2.O</h1>
        <p>Advanced Spotify Experience</p>
        <button onClick={login} className="login__button">
          LOGIN WITH SPOTIFY
        </button>
        <div className="features-preview">
          <h2>Advanced Features</h2>
          <ul>
            <li>Enhanced playback controls</li>
            <li>Advanced search algorithms</li>
            <li>Intelligent playlist management</li>
            <li>AI-powered recommendations</li>
            <li>Customizable UI themes</li>
            <li>Offline mode</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;