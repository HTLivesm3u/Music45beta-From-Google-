import { MUSIC45_API_BASE_URL } from '../constants';
import { Song, Album, Artist, Playlist, SearchResults } from '../types';

const apiFetch = async <T,>(endpoint: string): Promise<T> => {
    const response = await fetch(`${MUSIC45_API_BASE_URL}${endpoint}`);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || 'Failed to fetch data from Music45 API');
    }
    const data = await response.json();
    return data.data as T;
};

export const search = async (query: string): Promise<SearchResults> => {
    const response = await fetch(`${MUSIC45_API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const allResults = await response.json();
    return allResults.data as SearchResults;
};

export const getSongDetails = (id: string): Promise<Song[]> => apiFetch<Song[]>(`/songs?id=${id}`);
export const getAlbumDetails = (id: string): Promise<Album> => apiFetch<Album>(`/albums?id=${id}`);
export const getArtistDetails = (id: string): Promise<Artist> => apiFetch<Artist>(`/artists?id=${id}`);
export const getPlaylistDetails = (id: string): Promise<Playlist> => apiFetch<Playlist>(`/playlists?id=${id}`);
export const getSongSuggestions = (id: string): Promise<Song[]> => apiFetch<Song[]>(`/songs/${id}/suggestions`);
