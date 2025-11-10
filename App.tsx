import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SpotifyToken, SpotifyUser, Song } from './types';
import { handleAuthCallback, getStoredToken, loginToSpotify, logout, getUserProfile } from './services/spotifyService';
import useLocalStorage from './hooks/useLocalStorage';
import Login from './components/Login';
import Layout from './components/Layout';
import Player from './components/Player';
import LyricsView from './components/LyricsView';

const App: React.FC = () => {
    const [token, setToken] = useState<SpotifyToken | null>(getStoredToken());
    const [user, setUser] = useState<SpotifyUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Music state
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // User data from localStorage
    const [likedSongs, setLikedSongs] = useLocalStorage<string[]>('liked_songs', []);
    const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage<Song[]>('recently_played', []);

    useEffect(() => {
        const existingToken = getStoredToken();
        const newToken = handleAuthCallback();
        const activeToken = newToken || existingToken;

        if (activeToken) {
            setToken(activeToken);
            getUserProfile(activeToken.access_token)
                .then(setUser)
                .catch(err => {
                    console.error(err);
                    logout(); // Token might be invalid
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const handlePlaySong = useCallback((song: Song) => {
        setCurrentSong(song);
        setIsPlaying(true);

        setRecentlyPlayed(prev => {
            const newHistory = [song, ...prev.filter(s => s.id !== song.id)];
            return newHistory.slice(0, 20);
        });

        const streamUrl = song.downloadUrl.find(u => u.quality === '320kbps')?.url;
        if (audioRef.current && streamUrl) {
            audioRef.current.src = streamUrl;
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
    }, [setRecentlyPlayed]);

    const handlePlayPause = () => {
        if (!currentSong || !audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const toggleLikeSong = (songId: string) => {
        setLikedSongs(prev => 
            prev.includes(songId) 
                ? prev.filter(id => id !== songId) 
                : [...prev, songId]
        );
    };

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>;
    }

    if (!token || !user) {
        return <Login onLogin={loginToSpotify} />;
    }

    const isCurrentSongLiked = currentSong ? likedSongs.includes(currentSong.id) : false;

    return (
        <div className="bg-background text-foreground h-screen font-sans">
            <Layout 
                user={user} 
                onLogout={logout}
                likedSongs={likedSongs}
                recentlyPlayed={recentlyPlayed}
                playSong={handlePlaySong}
            />
            <Player 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={() => { /* TODO: Implement next song logic */ }}
                onPrev={() => { /* TODO: Implement previous song logic */ }}
                isLiked={isCurrentSongLiked}
                onToggleLike={() => currentSong && toggleLikeSong(currentSong.id)}
                onShowLyrics={() => setShowLyrics(true)}
            />
            {showLyrics && <LyricsView song={currentSong} onClose={() => setShowLyrics(false)} />}
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
        </div>
    );
};

export default App;
