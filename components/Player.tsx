import React from 'react';
import { Song } from '../types';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, HeartIcon, LyricsIcon } from './Icons';
import { getBestImage } from '../utils';

interface PlayerProps {
    currentSong: Song | null;
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    isLiked: boolean;
    onToggleLike: () => void;
    onShowLyrics: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev, isLiked, onToggleLike, onShowLyrics }) => {
    if (!currentSong) {
        return (
            <div className="fixed bottom-0 left-0 right-0 h-24 bg-background-tertiary/80 backdrop-blur-md shadow-player flex items-center justify-center text-foreground-muted">
                Select a song to play
            </div>
        );
    }
    
    const imageUrl = getBestImage(currentSong.image, '150x150');

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-background-tertiary/80 backdrop-blur-md shadow-player flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4 w-1/3 min-w-0">
                {imageUrl && <img src={imageUrl} alt={currentSong.name} className="w-16 h-16 rounded-md flex-shrink-0" />}
                <div className="min-w-0">
                    <p className="font-bold text-card-foreground truncate">{currentSong.name}</p>
                    <p className="text-sm text-foreground-secondary truncate">{currentSong.artists.primary.map(a => a.name).join(', ')}</p>
                </div>
            </div>

            <div className="flex items-center gap-4 justify-center">
                <button onClick={onPrev} className="text-foreground-secondary hover:text-foreground transition-all duration-200"><SkipBackIcon className="w-6 h-6" /></button>
                <button onClick={onPlayPause} className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-110 transition-transform">
                    {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 ml-1" />}
                </button>
                <button onClick={onNext} className="text-foreground-secondary hover:text-foreground transition-all duration-200"><SkipForwardIcon className="w-6 h-6" /></button>
            </div>

            <div className="flex items-center gap-6 w-1/3 justify-end">
                <button onClick={onShowLyrics} className="text-foreground-secondary hover:text-foreground transition-all duration-200">
                    <LyricsIcon className="w-5 h-5" />
                </button>
                <button onClick={onToggleLike} className={`transition-all duration-200 ${isLiked ? 'text-accent' : 'text-foreground-secondary hover:text-foreground'}`}>
                    <HeartIcon className="w-5 h-5" style={{ fill: isLiked ? 'currentColor' : 'none' }} />
                </button>
            </div>
        </div>
    );
};

export default Player;
