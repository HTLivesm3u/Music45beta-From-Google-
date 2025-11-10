import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } from '../constants';
import { SpotifyToken, SpotifyUser } from '../types';

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const API_ENDPOINT = "https://api.spotify.com/v1";
const TOKEN_KEY = 'spotify_token';

export const loginToSpotify = () => {
    const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        scope: SPOTIFY_SCOPES,
        response_type: 'token',
        show_dialog: 'true',
    });
    window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
};

export const handleAuthCallback = (): SpotifyToken | null => {
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get('access_token');
        const expires_in_str = params.get('expires_in');
        
        if (access_token && expires_in_str) {
            const expires_in = parseInt(expires_in_str, 10);
            const token: SpotifyToken = {
                access_token,
                token_type: 'Bearer',
                expires_in,
                expires_at: Date.now() + expires_in * 1000,
            };
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
            window.location.hash = ''; // Clear hash from URL
            return token;
        }
    }
    return null;
};

export const getStoredToken = (): SpotifyToken | null => {
    const tokenString = localStorage.getItem(TOKEN_KEY);
    if (!tokenString) return null;
    const token: SpotifyToken = JSON.parse(tokenString);
    if (token.expires_at && token.expires_at < Date.now()) {
        logout();
        return null;
    }
    return token;
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
};

export const getUserProfile = async (token: string): Promise<SpotifyUser> => {
    const response = await fetch(`${API_ENDPOINT}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user profile');
    }
    return response.json();
};
