import React, { useState, useEffect } from 'react';
import { Song, Lyrics as LyricsType } from '../types';
import { getLyrics } from '../services/lyricsService';
import { CloseIcon } from './Icons';
import { getBestImage } from '../utils';

interface LyricsViewProps {
    song: Song | null;
    onClose: () => void;
}

const LyricsView: React.FC<LyricsViewProps> = ({ song, onClose }) => {
    const [lyrics, setLyrics] = useState<LyricsType | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (song) {
            setLoading(true);
            setLyrics(null);
            getLyrics(song.artists.primary[0].name, song.name, song.album.name, song.duration)
                .then(setLyrics)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [song]);

    if (!song) return null;
    const imageUrl = getBestImage(song.image, '500x500');

    return (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-lg z-50 flex flex-col animate-fade-in">
             {imageUrl && (
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ 
                        backgroundImage: `url(${imageUrl})`,
                        maskImage: 'linear-gradient(to bottom, black 5%, transparent 100%)'
                    }}
                />
             )}
            <div className="flex-shrink-0 flex justify-between items-center p-4 md:p-8 z-10">
                <div>
                    <h2 className="text-3xl font-bold">{song.name}</h2>
                    <p className="text-foreground-secondary">{song.artists.primary.map(a => a.name).join(', ')}</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-background-secondary">
                    <CloseIcon className="w-8 h-8"/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
                {loading && <p className="text-center text-lg">Loading lyrics...</p>}
                {!loading && !lyrics && <p className="text-center text-lg text-foreground-muted">No lyrics found for this song.</p>}
                {lyrics && (
                    <div className="text-center text-2xl md:text-4xl leading-relaxed font-semibold text-foreground-secondary space-y-4">
                        {(lyrics.syncedLyrics || lyrics.plainLyrics).split('\n').map((line, index) => (
                            <p key={index} className="transition-colors hover:text-foreground">{line.replace(/\[.*?\]\s*/, '') || '\u00A0'}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LyricsView;
