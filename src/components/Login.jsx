import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSpotify } from '../context/SpotifyContext';
import './Login.css';

const Login = () => {
  const { login } = useSpotify();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for token in URL hash (from Spotify OAuth redirect)
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      // Extract token from URL hash
      token = hash.substring(1).split('&').find(param => param.startsWith('access_token='))?.split('=')[1];
      
      if (token) {
        window.localStorage.setItem('token', token);
        // Remove token from URL hash to clean it up
        window.location.hash = '';
        navigate('/');
      }
    }
  }, [navigate]);

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