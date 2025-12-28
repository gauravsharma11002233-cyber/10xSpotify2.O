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

### Local Development

Create a `.env` file in the root directory with the following variables:

```
VITE_SPOTIFY_CLIENT_ID=a43cd3a475f44520a98f9752b3eee688
VITE_REDIRECT_URI=http://localhost:5173
```

**Note:** 
- For Vite projects, use `VITE_` prefix for environment variables.
- The client ID `a43cd3a475f44520a98f9752b3eee688` is hardcoded as a fallback, but it's recommended to set it in environment variables.

### Production Deployment (Vercel)

For your deployment at `https://10x-spotify2-o.vercel.app/`, you need to:

1. **Set Environment Variables in Vercel (Optional but Recommended):**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the following:
     - `VITE_SPOTIFY_CLIENT_ID`: Your Spotify Client ID
     - `VITE_REDIRECT_URI`: `https://10x-spotify2-o.vercel.app` (optional - the app will auto-detect this)

   **Note:** The redirect URI is automatically set to `window.location.origin` if not specified, so it will work without setting `VITE_REDIRECT_URI` in production.

2. **Configure Spotify Developer Dashboard (REQUIRED):**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Select your app
   - Click "Edit Settings"
   - Under "Redirect URIs", add: `https://10x-spotify2-o.vercel.app`
   - **Important:** No trailing slash, exact match required
   - Save changes

**How it works:**
- When a user clicks "Login with Spotify", they're redirected to Spotify's authorization page
- After authorization, Spotify redirects back to your app at the redirect URI
- The app automatically extracts the access token from the URL hash and authenticates the user

### Troubleshooting "INVALID_CLIENT: Invalid redirect URI"

If you see this error, check the following:

1. **Verify Redirect URI in Spotify Dashboard:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Select your app (Client ID: `a43cd3a475f44520a98f9752b3eee688`)
   - Click "Edit Settings"
   - Under "Redirect URIs", make sure you have EXACTLY:
     - For production: `https://10x-spotify2-o.vercel.app` (no trailing slash, no http://)
     - For local dev: `http://localhost:5173` (if testing locally)
   - The redirect URI must match EXACTLY (case-sensitive, no trailing slash)

2. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check the Console tab when clicking "Login with Spotify"
   - You'll see logs showing:
     - Client ID being used
     - Redirect URI being used
     - Full authorization URL

3. **Verify Environment Variables in Vercel:**
   - Make sure `VITE_SPOTIFY_CLIENT_ID` is set to: `a43cd3a475f44520a98f9752b3eee688`
   - Optionally set `VITE_REDIRECT_URI` to: `https://10x-spotify2-o.vercel.app`
   - Redeploy after changing environment variables

4. **Common Issues:**
   - ❌ `https://10x-spotify2-o.vercel.app/` (has trailing slash) → ✅ `https://10x-spotify2-o.vercel.app`
   - ❌ `http://10x-spotify2-o.vercel.app` (wrong protocol) → ✅ `https://10x-spotify2-o.vercel.app`
   - ❌ Redirect URI not added in Spotify Dashboard → ✅ Must be added and saved

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
