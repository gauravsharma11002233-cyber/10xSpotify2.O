import { useState, useEffect } from 'react'
import { SpotifyProvider, useSpotify } from './context/SpotifyContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import Player from './components/Player'
import Login from './components/Login'
import Search from './components/Search'
import Library from './components/Library'
import Playlist from './components/Playlist'
import Browse from './components/Browse'
import Artist from './components/Artist'
import './App.css'

function AppContent() {
  const { isAuthenticated, isLoading, handleToken } = useSpotify();

  useEffect(() => {
    // Check for token in URL hash (OAuth callback)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const expiresIn = params.get('expires_in');
      
      if (accessToken && expiresIn) {
        handleToken(accessToken, parseInt(expiresIn, 10));
        // Clear hash from URL
        window.history.replaceState(null, null, ' ');
      }
    }
  }, [handleToken]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="Spotify Logo" 
            style={{ width: '200px', marginBottom: '20px' }}
          />
          <h1 style={{ margin: '10px 0', fontSize: '2rem' }}>10xSpotify2.O</h1>
          <p style={{ opacity: 0.7 }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <MainContent />
            </div>
            <Player />
          </>
        } />
        <Route path="/search" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <Search />
            </div>
            <Player />
          </>
        } />
        <Route path="/library" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <Library />
            </div>
            <Player />
          </>
        } />
        <Route path="/playlist/:id" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <Playlist />
            </div>
            <Player />
          </>
        } />
        <Route path="/browse" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <Browse />
            </div>
            <Player />
          </>
        } />
        <Route path="/artist/:id" element={
          <>
            <Header />
            <div className="main-container">
              <Sidebar />
              <Artist />
            </div>
            <Player />
          </>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <SpotifyProvider>
      <Router>
        <div className="app">
          <AppContent />
        </div>
      </Router>
    </SpotifyProvider>
  )
}

export default App
