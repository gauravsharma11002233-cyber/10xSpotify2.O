# 10xSpotify2.O - Advanced Spotify Experience

An enhanced Spotify clone with advanced features and modern UI/UX design.

## Features

- Spotify authentication via OAuth
- Device selection & volume control
- Track search and playlist access
- Responsive modern interface
- Advanced playback controls
- AI-powered recommendations
- Customizable UI themes
- Offline mode

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
4. Add your Spotify Client ID to the `.env` file
5. Start the development server: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
REACT_APP_REDIRECT_URI=http://localhost:5173
```

## Technologies Used

- React 19
- Vite 7
- Spotify Web API TypeScript SDK
- Axios
- React Router DOM
- CSS3

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context providers
├── assets/         # Static assets
└── App.jsx         # Main application component
```
