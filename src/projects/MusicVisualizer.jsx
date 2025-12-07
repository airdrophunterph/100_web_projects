import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MusicVisualizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState(Array(32).fill(10));
  const [theme, setTheme] = useState('rainbow');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setBars(prev => prev.map(() => Math.random() * 100 + 10));
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      setBars(Array(32).fill(10));
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const getBarColor = (index) => {
    const hue = (index / 32) * 360;
    switch (theme) {
      case 'rainbow': return `hsl(${hue}, 80%, 60%)`;
      case 'blue': return `hsl(${200 + index * 2}, 80%, ${40 + index}%)`;
      case 'fire': return `hsl(${index * 2}, 100%, 50%)`;
      case 'purple': return `hsl(${270 + index}, 80%, 60%)`;
      default: return `hsl(${hue}, 80%, 60%)`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎶 Music Visualizer</h1>

        {/* Visualizer */}
        <div className="bg-black rounded-2xl p-8 mb-6 overflow-hidden">
          <div className="flex items-end justify-center gap-1 h-64">
            {bars.map((height, i) => (
              <div
                key={i}
                className="w-3 rounded-t-sm transition-all duration-75"
                style={{
                  height: `${height}%`,
                  backgroundColor: getBarColor(i),
                  boxShadow: isPlaying ? `0 0 10px ${getBarColor(i)}` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition ${
              isPlaying 
                ? 'bg-red-500 shadow-lg shadow-red-500/50' 
                : 'bg-green-500 shadow-lg shadow-green-500/50'
            }`}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* Themes */}
          <div className="flex gap-3">
            {['rainbow', 'blue', 'fire', 'purple'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  theme === t ? 'bg-white text-black' : 'bg-white/10 text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="text-white/40 text-sm text-center">
            This is a simulated visualizer. In a real implementation,<br />
            you would use the Web Audio API to analyze audio frequency data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicVisualizer;
