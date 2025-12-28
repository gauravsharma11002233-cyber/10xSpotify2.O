import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const SpotifyContext = createContext();

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (!context) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};

export const SpotifyProvider = ({ children }) => {
  const [sdk, setSdk] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [devices, setDevices] = useState([]);

  // Initialize Spotify SDK
  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('spotify_token');
    const storedExpiration = localStorage.getItem('spotify_token_expiration');
    const storedUser = localStorage.getItem('spotify_user');
    
    if (storedToken) {
      // Check if token is still valid
      const now = Date.now();
      const expiration = storedExpiration ? parseInt(storedExpiration, 10) : 0;
      
      if (expiration > now) {
        setToken(storedToken);
        setIsAuthenticated(true);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error('Error parsing stored user:', e);
          }
        }
      } else {
        // Token expired, clear it
        localStorage.removeItem('spotify_token');
        localStorage.removeItem('spotify_token_expiration');
        localStorage.removeItem('spotify_user');
      }
    }
  }, []);

  // Initialize SDK when token is available
  useEffect(() => {
    if (token) {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.REACT_APP_SPOTIFY_CLIENT_ID || 'a43cd3a475f44520a98f9752b3eee688';
        if (!clientId) {
          console.error('Spotify Client ID is not configured. Please set VITE_SPOTIFY_CLIENT_ID in your .env file.');
          return;
        }
        
        const spotifyApi = SpotifyApi.withAccessToken(clientId, { access_token: token });
        setSdk(spotifyApi);
        
        // Fetch user data to validate token
        spotifyApi.currentUser.profile().then((userData) => {
          setUser(userData);
          localStorage.setItem('spotify_user', JSON.stringify(userData));
        }).catch((error) => {
          console.error('Error fetching user data - token may be invalid:', error);
          // If token is invalid, logout the user
          if (error.status === 401 || error.status === 403) {
            logout();
          }
        });
      } catch (error) {
        console.error('Error initializing Spotify SDK:', error);
      }
    }
  }, [token, logout]);

  const login = () => {
    // Redirect to Spotify authorization
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.REACT_APP_SPOTIFY_CLIENT_ID || 'a43cd3a475f44520a98f9752b3eee688';
    
    // Use environment variable if set, otherwise use current origin (works for both dev and production)
    // Remove trailing slash if present
    let redirectUri = import.meta.env.VITE_REDIRECT_URI || process.env.REACT_APP_REDIRECT_URI || window.location.origin;
    redirectUri = redirectUri.replace(/\/$/, ''); // Remove trailing slash
    
    // Debug logging
    console.log('Spotify Auth Configuration:');
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);
    console.log('Full URL:', window.location.href);
    
    if (!clientId) {
      console.error('Spotify Client ID is missing!');
      alert('Spotify Client ID is not configured. Please set VITE_SPOTIFY_CLIENT_ID in your environment variables.');
      return;
    }
    
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
      'user-library-read',
      'user-library-modify',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'streaming'
    ];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    
    console.log('Redirecting to Spotify:', authUrl);
    window.location.href = authUrl;
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setSdk(null);
    setIsAuthenticated(false);
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_token_expiration');
    localStorage.removeItem('spotify_user');
  }, []);

  const handleToken = (accessToken, expiresIn) => {
    setToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem('spotify_token', accessToken);
    
    // Store expiration time (current time + expiresIn seconds)
    const expirationTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('spotify_token_expiration', expirationTime.toString());
    
    // Set timeout to refresh token before it expires
    setTimeout(() => {
      // In a real app, you would implement token refresh here
      // For now, we'll just logout
      logout();
    }, (expiresIn - 60) * 1000); // Refresh 1 minute before expiration
  };

  const value = {
    sdk,
    user,
    setUser,
    token,
    isAuthenticated,
    login,
    logout,
    handleToken,
    player,
    setPlayer,
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    devices,
    setDevices
  };

  return (
    <SpotifyContext.Provider value={value}>
      {children}
    </SpotifyContext.Provider>
  );
};