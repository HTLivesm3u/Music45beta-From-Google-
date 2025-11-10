import React from 'react';
import { Song } from '../types';
import { getBestImage } from '../utils';
import { PlayIcon } from './Icons';

interface HomeProps {
    recentlyPlayed: Song[];
    onPlaySong: (song: Song) => void;
}

const Home: React.FC<HomeProps> = ({ recentlyPlayed, onPlaySong }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Home</h1>
            
            <section>
                <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
                {recentlyPlayed.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {recentlyPlayed.map(song => (
                            <div key={song.id} className="bg-card/50 p-4 rounded-lg hover:bg-card-hover transition-all duration-300 group cursor-pointer" onClick={() => onPlaySong(song)}>
                                <div className="relative mb-4">
                                    <img src={getBestImage(song.image, '500x500') || ''} alt={song.name} className="w-full aspect-square object-cover rounded-md shadow-card" />
                                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300 shadow-lg hover:scale-110">
                                        <PlayIcon className="w-6 h-6 ml-1" />
                                    </button>
                                </div>
                                <h3 className="font-bold truncate">{song.name}</h3>
                                <p className="text-sm text-foreground-secondary truncate">{song.artists.primary.map(a => a.name).join(', ')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-40 bg-card/30 rounded-lg">
                        <p className="text-foreground-muted">No recently played songs. Start listening to see them here!</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
