import React from 'react';
import { Song } from '../types';
import { getBestImage, formatDuration } from '../utils';
import { PlayIcon } from './Icons';

interface SongItemProps {
    song: Song;
    onPlay: (song: Song) => void;
    index: number;
}

const SongItem: React.FC<SongItemProps> = ({ song, onPlay, index }) => {
    const imageUrl = getBestImage(song.image, '50x50');
    
    return (
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-card-hover group transition-colors duration-200">
            <div className="w-8 text-center text-foreground-muted">{index + 1}</div>
            <div className="w-12 h-12 relative flex-shrink-0">
                {imageUrl && <img src={imageUrl} alt={song.name} className="w-full h-full object-cover rounded-md"/>}
                <button onClick={() => onPlay(song)} className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                    <PlayIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-card-foreground truncate">{song.name}</p>
                <p className="text-sm text-foreground-secondary truncate">{song.artists.primary.map(a => a.name).join(', ')}</p>
            </div>
            <div className="hidden md:block flex-1 min-w-0 text-foreground-muted truncate">{song.album.name}</div>
            <div className="w-16 text-right text-foreground-muted">{formatDuration(song.duration)}</div>
        </div>
    );
};

export default SongItem;
