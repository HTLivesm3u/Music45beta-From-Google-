import React, { useState, useEffect } from 'react';
import { Song } from '../types';
import { getSongDetails } from '../services/music45Service';
import SongItem from './SongItem';

interface LibraryProps {
    likedSongs: string[];
    onPlaySong: (song: Song) => void;
}

const Library: React.FC<LibraryProps> = ({ likedSongs, onPlaySong }) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (likedSongs.length > 0) {
            setLoading(true);
            getSongDetails(likedSongs.join(','))
                .then(setSongs)
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setSongs([]);
        }
    }, [likedSongs]);

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Your Library</h1>
            <h2 className="text-2xl font-semibold mb-4">Liked Songs</h2>

            {loading ? (
                <p>Loading your liked songs...</p>
            ) : songs.length > 0 ? (
                <div className="flex flex-col gap-1">
                    {songs.map((song, index) => (
                        <SongItem key={song.id} song={song} onPlay={onPlaySong} index={index} />
                    ))}
                </div>
            ) : (
                 <div className="flex items-center justify-center h-40 bg-card/30 rounded-lg">
                    <p className="text-foreground-muted text-center">You haven't liked any songs yet. <br/> Find a song you love and click the heart icon!</p>
                </div>
            )}
        </div>
    );
};

export default Library;
