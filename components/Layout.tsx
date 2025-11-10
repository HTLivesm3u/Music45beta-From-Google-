import React, { useState } from 'react';
import { SpotifyUser, Song } from '../types';
import { HomeIcon, SearchIcon, LibraryIcon, LogoutIcon } from './Icons';
import Home from './Home';
import Search from './Search';
import Library from './Library';
import { getBestImage } from '../utils';

type Page = 'home' | 'search' | 'library';

interface LayoutProps {
    user: SpotifyUser;
    onLogout: () => void;
    likedSongs: string[];
    recentlyPlayed: Song[];
    playSong: (song: Song) => void;
}

const NavLink: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 px-4 py-2 rounded-md transition-all duration-200 w-full text-left ${
            isActive ? 'bg-background-tertiary text-primary' : 'text-foreground-secondary hover:bg-background-secondary hover:text-foreground'
        }`}
    >
        {icon}
        <span className="font-semibold">{label}</span>
    </button>
);

const Layout: React.FC<LayoutProps> = ({ user, onLogout, likedSongs, recentlyPlayed, playSong }) => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const handlePlaySong = (song: Song) => {
        playSong(song);
        const imageUrl = getBestImage(song.image, '500x500');
        if (imageUrl) {
            document.documentElement.style.setProperty('--banner-cover-url', `url(${imageUrl})`);
        }
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home recentlyPlayed={recentlyPlayed} onPlaySong={handlePlaySong} />;
            case 'search':
                return <Search onPlaySong={handlePlaySong} />;
            case 'library':
                return <Library likedSongs={likedSongs} onPlaySong={handlePlaySong} />;
            default:
                return <Home recentlyPlayed={recentlyPlayed} onPlaySong={handlePlaySong} />;
        }
    };
    
    return (
        <div className="flex h-screen overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-20"
              style={{
                backgroundImage: 'var(--banner-cover-url)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

            <nav className="hidden md:flex flex-col w-64 bg-background-secondary/30 backdrop-blur-xl p-4 z-10">
                <div className="text-2xl font-bold mb-8 ml-4" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Music45</div>
                <div className="flex flex-col gap-2">
                    <NavLink icon={<HomeIcon />} label="Home" isActive={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
                    <NavLink icon={<SearchIcon />} label="Search" isActive={currentPage === 'search'} onClick={() => setCurrentPage('search')} />
                    <NavLink icon={<LibraryIcon />} label="Your Library" isActive={currentPage === 'library'} onClick={() => setCurrentPage('library')} />
                </div>
                <div className="mt-auto flex items-center gap-3 p-2">
                    <img src={user.images[0]?.url || 'https://picsum.photos/40'} alt={user.display_name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">{user.display_name}</p>
                    </div>
                    <button onClick={onLogout} className="text-foreground-muted hover:text-foreground">
                        <LogoutIcon />
                    </button>
                </div>
            </nav>

            <main className="flex-1 overflow-y-auto pb-32 md:pb-24 relative">
                <div className="p-4 md:p-8">
                   {renderPage()}
                </div>
            </main>
            
            <nav className="md:hidden fixed bottom-24 left-0 right-0 bg-background-tertiary/80 backdrop-blur-md h-16 flex justify-around items-center z-20 border-t border-background-tertiary">
                 <button onClick={() => setCurrentPage('home')} className={`p-2 rounded-full ${currentPage === 'home' ? 'text-primary' : 'text-foreground-secondary'}`}><HomeIcon /></button>
                 <button onClick={() => setCurrentPage('search')} className={`p-2 rounded-full ${currentPage === 'search' ? 'text-primary' : 'text-foreground-secondary'}`}><SearchIcon /></button>
                 <button onClick={() => setCurrentPage('library')} className={`p-2 rounded-full ${currentPage === 'library' ? 'text-primary' : 'text-foreground-secondary'}`}><LibraryIcon /></button>
                 <button onClick={onLogout} className="p-2 rounded-full text-foreground-secondary"><LogoutIcon /></button>
            </nav>
        </div>
    );
};

export default Layout;
