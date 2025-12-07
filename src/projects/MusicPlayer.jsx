import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const tracks = [
  { id: 1, title: 'Chill Vibes', artist: 'LoFi Beats', duration: '3:45', color: 'from-purple-500 to-pink-500' },
  { id: 2, title: 'Summer Dreams', artist: 'Tropical House', duration: '4:12', color: 'from-orange-500 to-yellow-500' },
  { id: 3, title: 'Night Drive', artist: 'Synthwave', duration: '5:30', color: 'from-blue-500 to-purple-500' },
  { id: 4, title: 'Coffee Shop', artist: 'Jazz Hop', duration: '3:58', color: 'from-amber-600 to-orange-600' },
  { id: 5, title: 'Rainy Day', artist: 'Ambient', duration: '6:20', color: 'from-gray-500 to-blue-500' },
];

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextTrack();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(tracks[(idx + 1) % tracks.length]);
    setProgress(0);
  };

  const prevTrack = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(tracks[(idx - 1 + tracks.length) % tracks.length]);
    setProgress(0);
  };

  const selectTrack = (track) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTrack.color} p-4 transition-all duration-500`}>
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎵 Music Player</h1>

        {/* Now Playing */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
          <div className="w-48 h-48 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-2xl">
            <div className={`text-6xl ${isPlaying ? 'animate-pulse' : ''}`}>🎵</div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center">{currentTrack.title}</h2>
          <p className="text-white/60 text-center mb-6">{currentTrack.artist}</p>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/20 rounded-full mb-2">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-sm mb-6">
            <span>{Math.floor(progress / 100 * 225 / 60)}:{String(Math.floor(progress / 100 * 225 % 60)).padStart(2, '0')}</span>
            <span>{currentTrack.duration}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={prevTrack} className="text-white/80 hover:text-white text-2xl">⏮️</button>
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:scale-105 transition"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={nextTrack} className="text-white/80 hover:text-white text-2xl">⏭️</button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-white/60">🔈</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="flex-1"
            />
            <span className="text-white/60">🔊</span>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
          <h3 className="text-white font-bold mb-3">Playlist</h3>
          <div className="space-y-2">
            {tracks.map(track => (
              <button
                key={track.id}
                onClick={() => selectTrack(track)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  currentTrack.id === track.id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center`}>
                  {currentTrack.id === track.id && isPlaying ? '🎵' : '▶️'}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">{track.title}</div>
                  <div className="text-white/60 text-sm">{track.artist}</div>
                </div>
                <span className="text-white/40 text-sm">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
