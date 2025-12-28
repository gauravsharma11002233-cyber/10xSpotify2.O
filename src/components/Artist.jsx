import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSpotify } from '../context/SpotifyContext';
import { PlayIcon, PauseIcon, MoreIcon, LikeIcon } from './Icons';
import './Artist.css';

const Artist = () => {
  const { id } = useParams();
  const { sdk, isPlaying } = useSpotify();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (sdk && id) {
      fetchArtistData();
    }
  }, [sdk, id]);

  const fetchArtistData = async () => {
    try {
      const artistData = await sdk.artists.get(id);
      setArtist(artistData);

      const topTracksData = await sdk.artists.getTopTracks(id, 'US');
      setTopTracks(topTracksData.tracks);

      const albumsData = await sdk.artists.getAlbums(id);
      setAlbums(albumsData.items);

      const relatedData = await sdk.artists.getRelatedArtists(id);
      setRelatedArtists(relatedData.artists);
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };

  if (!artist) {
    return <div className="artist__loading">Loading artist...</div>;
  }

  return (
    <div className="artist">
      <div className="artist__header" style={{
        backgroundImage: `linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), url(${artist.images[0]?.url})`,
      }}>
        <div className="artist__header-content">
          <div className="artist__badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5z"></path>
            </svg>
            <span>Verified Artist</span>
          </div>
          <h1>{artist.name}</h1>
          <p className="artist__stats">
            {(artist.followers.total / 1000000).toFixed(1)}M monthly listeners
          </p>
        </div>
      </div>

      <div className="artist__controls">
        <button className="artist__play-button">
          {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
        </button>
        <button className={`artist__follow-button ${isFollowing ? 'following' : ''}`} onClick={() => setIsFollowing(!isFollowing)}>
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <button className="artist__more-button">
          <MoreIcon size={32} />
        </button>
      </div>

      <section className="artist__section">
        <h2>Popular</h2>
        <div className="artist__top-tracks">
          {topTracks.slice(0, 5).map((track, index) => (
            <div key={track.id} className="top-track">
              <span className="track-number">{index + 1}</span>
              <img src={track.album.images[0]?.url} alt={track.name} />
              <div className="track-info">
                <h4>{track.name}</h4>
                <p>{(track.popularity / 100 * 1000000000).toLocaleString()} plays</p>
              </div>
              <span className="track-duration">
                {Math.floor(track.duration_ms / 60000)}:
                {Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
        <button className="see-more-button">See more</button>
      </section>

      <section className="artist__section">
        <h2>Discography</h2>
        <div className="artist__albums">
          {albums.slice(0, 6).map((album) => (
            <div key={album.id} className="artist__album-card">
              <div className="album-image">
                <img src={album.images[0]?.url} alt={album.name} />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <h3>{album.name}</h3>
              <p>{album.release_date.split('-')[0]} • {album.album_type}</p>
            </div>
          ))}
        </div>
        <button className="see-discography-button">See discography</button>
      </section>

      <section className="artist__section">
        <h2>Fans also like</h2>
        <div className="artist__related">
          {relatedArtists.slice(0, 6).map((relatedArtist) => (
            <div key={relatedArtist.id} className="related-artist-card">
              <div className="related-artist-image">
                <img src={relatedArtist.images[0]?.url} alt={relatedArtist.name} />
                <button className="card-play-button">
                  <PlayIcon size={24} />
                </button>
              </div>
              <h3>{relatedArtist.name}</h3>
              <p>Artist</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Artist;
