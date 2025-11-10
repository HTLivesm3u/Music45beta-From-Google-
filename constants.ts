export const SPOTIFY_CLIENT_ID = "f4d5c0dc1d694f61ab0b92eba378776e";
// IMPORTANT: You must add this URL to your "Redirect URIs" in the Spotify Developer Dashboard.
// For local development, it might be 'http://localhost:5173/'. For production, it's the URL of your deployed app.
export const SPOTIFY_REDIRECT_URI = window.location.origin;
export const SPOTIFY_SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "playlist-read-private",
].join(" ");
export const MUSIC45_API_BASE_URL = "https://music45-api.vercel.app/api";
export const LRCLIB_API_BASE_URL = "https://lrclib.net/api";
