export interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
}

export interface SpotifyUser {
  display_name: string;
  email: string;
  images: { url: string }[];
  id: string;
}

export interface Image {
  quality: '50x50' | '150x150' | '500x500';
  url: string;
}

export interface ArtistSimple {
    id: string;
    name: string;
    url: string;
    image: Image[] | false;
    type: 'artist';
    role: string;
}

export interface Song {
  id: string;
  name: string;
  type: 'song';
  year: string | null;
  releaseDate: string | null;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: string;
  hasLyrics: boolean;
  lyricsId: string | null;
  url: string;
  copyright: string;
  album: {
    id: string;
    name: string;
    url: string;
  };
  artists: {
    primary: ArtistSimple[];
    featured: ArtistSimple[];
    all: ArtistSimple[];
  };
  image: Image[];
  downloadUrl: { quality: string; url: string }[];
}

export interface Album {
  id: string;
  name: string;
  year: string;
  songCount: string;
  url: string;
  image: Image[];
  songs: Song[];
  artists: {
    primary: ArtistSimple[];
    featured: ArtistSimple[];
    all: ArtistSimple[];
  };
}

export interface Artist {
    id: string;
    name: string;
    url: string;
    image: Image[];
    followerCount: string;
    fanCount: string;
    isVerified: boolean;
    dominantLanguage: string;
    dominantType: string;
    topSongs: Song[];
    topAlbums: Album[];
}

export interface Playlist {
    id: string;
    name: string;
    followerCount: string;
    songCount: string;
    url: string;
    image: Image[];
    songs: Song[];
}

export interface Lyrics {
  id: number;
  trackName: string;
  artistName: string;
  albumName: string;
  duration: number;
  instrumental: boolean;
  plainLyrics: string;
  syncedLyrics: string;
}

export type SearchType = 'songs' | 'albums' | 'artists' | 'playlists';

export interface SearchResults {
  songs?: { data: Song[]; total: number };
  albums?: { data: Album[]; total: number };
  artists?: { data: Artist[]; total: number };
  playlists?: { data: Playlist[]; total: number };
}

export interface RecentlyPlayedItem {
  song: Song;
  playedAt: number;
}
