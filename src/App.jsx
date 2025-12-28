import { useState, useEffect } from 'react'
import { SpotifyProvider } from './context/SpotifyContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <SpotifyProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
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
          </Routes>
        </div>
      </Router>
    </SpotifyProvider>
  )
}

export default App
