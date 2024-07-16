import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const scopes = [
    'streaming',
    'user-read-email',
    'playlist-read-private',
    'user-read-private',
    'user-read-playback-state',
    'playlist-read-collaborative',
    'user-library-read',
    'user-top-read',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
  ].join(',');
  

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export const fetchSpotifyData = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  return response.json();
};

export const playSong = async (uri, accessToken) => {
    try {
      const response = await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {
          uris: [uri], // Spotify expects an array of URIs
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.status !== 204) { // Spotify API returns 204 No Content on success
        throw new Error('Failed to play track');
      }
    } catch (error) {
      console.error('Error playing track', error.response ? error.response.data : error.message);
    }
  };

export default spotifyApi;
export { LOGIN_URL };


