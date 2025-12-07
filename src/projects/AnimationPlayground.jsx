import { useState } from 'react';
import { Link } from 'react-router-dom';

const AnimationPlayground = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('bounce');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState('#8b5cf6');

  const animations = {
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    ping: 'animate-ping',
    spin: 'animate-spin',
    wiggle: 'animate-wiggle',
    float: 'animate-float',
    shake: 'animate-shake',
    flip: 'animate-flip',
  };

  const customStyles = `
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
    @keyframes flip {
      0% { transform: perspective(400px) rotateY(0); }
      100% { transform: perspective(400px) rotateY(360deg); }
    }
    .animate-wiggle { animation: wiggle 0.3s ease-in-out infinite; }
    .animate-float { animation: float 2s ease-in-out infinite; }
    .animate-shake { animation: shake 0.5s ease-in-out infinite; }
    .animate-flip { animation: flip 1s ease-in-out infinite; }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <style>{customStyles}</style>
      
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎭 Animation Playground</h1>

        {/* Preview Area */}
        <div className="bg-black/30 rounded-2xl p-8 mb-6 min-h-[300px] flex items-center justify-center">
          <div
            className={`w-32 h-32 rounded-2xl ${isPlaying ? animations[selectedAnimation] : ''}`}
            style={{ 
              backgroundColor: color,
              animationDuration: `${1 / speed}s`
            }}
          />
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          {/* Animation Selection */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Animation Type</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(animations).map(anim => (
                <button
                  key={anim}
                  onClick={() => setSelectedAnimation(anim)}
                  className={`py-2 px-3 rounded-lg capitalize transition ${
                    selectedAnimation === anim 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {anim}
                </button>
              ))}
            </div>
          </div>

          {/* Speed Control */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Speed: {speed}x</label>
            <input
              type="range"
              min="0.25"
              max="3"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Color</label>
            <div className="flex gap-2">
              {['#8b5cf6', '#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#ec4899'].map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full ${color === c ? 'ring-4 ring-white' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </div>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-full py-3 rounded-lg font-bold ${
              isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {isPlaying ? '⏸️ Pause Animation' : '▶️ Play Animation'}
          </button>

          {/* CSS Output */}
          <div className="mt-6 p-4 bg-black/30 rounded-lg">
            <div className="text-white/60 text-sm mb-2">CSS Code:</div>
            <code className="text-green-400 text-sm">
              animation: {selectedAnimation} {(1 / speed).toFixed(2)}s ease-in-out infinite;
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationPlayground;
