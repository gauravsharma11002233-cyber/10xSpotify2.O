import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const storedUser = localStorage.getItem('spotify_user');
    
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
  }, []);

  // Initialize SDK when token is available
  useEffect(() => {
    if (token) {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const spotifyApi = SpotifyApi.withAccessToken(clientId, { access_token: token });
        setSdk(spotifyApi);
        
        // Fetch user data
        spotifyApi.currentUser.profile().then((userData) => {
          setUser(userData);
          localStorage.setItem('spotify_user', JSON.stringify(userData));
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      } catch (error) {
        console.error('Error initializing Spotify SDK:', error);
      }
    }
  }, [token]);

  const login = () => {
    // Redirect to Spotify authorization
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI || process.env.REACT_APP_REDIRECT_URI || window.location.origin;
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
    
    window.location.href = authUrl;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setSdk(null);
    setIsAuthenticated(false);
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_user');
  };

  const handleToken = (accessToken, expiresIn) => {
    setToken(accessToken);
    setIsAuthenticated(true);
    localStorage.setItem('spotify_token', accessToken);
    
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