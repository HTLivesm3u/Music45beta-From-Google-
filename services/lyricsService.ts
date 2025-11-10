import { LRCLIB_API_BASE_URL } from '../constants';
import { Lyrics } from '../types';

export const getLyrics = async (artistName: string, trackName: string, albumName: string, duration: number): Promise<Lyrics | null> => {
    const params = new URLSearchParams({
        artist_name: artistName,
        track_name: trackName,
        album_name: albumName,
        duration: Math.round(duration).toString(),
    });

    try {
        const response = await fetch(`${LRCLIB_API_BASE_URL}/get?${params.toString()}`);
        if (!response.ok) {
            // LRC Lib returns 404 if not found, which is not an error for us.
            if (response.status === 404) return null;
            throw new Error('Failed to fetch lyrics');
        }
        const data: Lyrics = await response.json();
        if (!data.plainLyrics && !data.syncedLyrics) {
            return null;
        }
        return data;
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        return null;
    }
};
