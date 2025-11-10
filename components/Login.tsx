import React from 'react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="text-center p-8">
                <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Music45</h1>
                <p className="text-lg text-foreground-secondary mb-8">Your music world awaits.</p>
                <button
                    onClick={onLogin}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg"
                >
                    Login with Spotify
                </button>
                <p className="text-xs text-foreground-muted mt-6 max-w-sm mx-auto">
                    Note: This app uses the Spotify API for authentication. The callback URL needs to be configured correctly in your Spotify Developer Dashboard.
                </p>
                <p className="text-xs text-foreground-muted mt-2">
                    Set Redirect URI to: <span className="font-mono bg-background-secondary p-1 rounded-sm">{window.location.origin}</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
