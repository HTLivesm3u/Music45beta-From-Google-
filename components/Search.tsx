import React, { useState, useCallback } from 'react';
import { Song, SearchResults } from '../types';
import { search } from '../services/music45Service';
import SongItem from './SongItem';
import { getBestImage } from '../utils';

interface SearchProps {
    onPlaySong: (song: Song) => void;
}

const Search: React.FC<SearchProps> = ({ onPlaySong }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const searchResults = await search(query);
            setResults(searchResults);
        } catch (err) {
            setError('Failed to fetch search results.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Search</h1>
            <form onSubmit={handleSearch} className="mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for songs, artists, albums..."
                    className="w-full p-4 bg-background-tertiary rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </form>

            {loading && <div className="text-center p-8">Loading...</div>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {!loading && !error && results && (
                <div className="space-y-12">
                    {results.songs && results.songs.data.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
                            <div className="flex flex-col gap-1">
                                {results.songs.data.map((song, index) => (
                                    <SongItem key={song.id} song={song} onPlay={onPlaySong} index={index} />
                                ))}
                            </div>
                        </section>
                    )}
                     {results.artists && results.artists.data.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Artists</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {results.artists.data.map(artist => (
                                    <div key={artist.id} className="bg-card/50 p-4 rounded-lg hover:bg-card-hover transition-all duration-300 group text-center cursor-pointer">
                                        <img src={getBestImage(artist.image) || ''} alt={artist.name} className="w-full aspect-square object-cover rounded-full mb-4 shadow-card" />
                                        <h3 className="font-bold truncate">{artist.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
