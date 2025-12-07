import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FlashlightApp = () => {
  const [isOn, setIsOn] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [color, setColor] = useState('#ffffff');
  const [isStrobe, setIsStrobe] = useState(false);

  useEffect(() => {
    let interval;
    if (isStrobe && isOn) {
      interval = setInterval(() => {
        setIsOn(prev => !prev);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStrobe]);

  const colors = ['#ffffff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181'];

  return (
    <div 
      className="min-h-screen transition-all duration-200"
      style={{ 
        backgroundColor: isOn ? color : '#1a1a1a',
        opacity: isOn ? brightness / 100 : 1
      }}
    >
      <div className={`p-4 ${isOn ? 'text-gray-900' : 'text-white'}`}>
        <Link to="/" className={`inline-flex items-center mb-6 ${isOn ? 'text-gray-600' : 'text-white/80'} hover:opacity-70`}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="max-w-md mx-auto">
          <h1 className={`text-4xl font-bold text-center mb-8 ${isOn ? 'text-gray-900' : 'text-white'}`}>
            🔦 Flashlight
          </h1>

          {/* Main Toggle */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => { setIsOn(!isOn); setIsStrobe(false); }}
              className={`w-32 h-32 rounded-full text-4xl font-bold transition-all shadow-2xl ${
                isOn 
                  ? 'bg-gray-900 text-white shadow-gray-900/50' 
                  : 'bg-yellow-400 text-gray-900 shadow-yellow-400/50'
              }`}
            >
              {isOn ? 'OFF' : 'ON'}
            </button>
          </div>

          {/* Controls - only visible when off or dimmed */}
          <div className={`space-y-6 p-6 rounded-2xl ${isOn ? 'bg-black/20' : 'bg-white/10'}`}>
            {/* Brightness */}
            <div>
              <label className={`block mb-2 ${isOn ? 'text-gray-800' : 'text-white/80'}`}>
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className={`block mb-2 ${isOn ? 'text-gray-800' : 'text-white/80'}`}>
                Color
              </label>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      color === c ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Strobe */}
            <button
              onClick={() => { setIsStrobe(!isStrobe); if (!isStrobe) setIsOn(true); }}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isStrobe 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : isOn ? 'bg-gray-900 text-white' : 'bg-white/20 text-white'
              }`}
            >
              {isStrobe ? '⚡ STROBE ON' : '⚡ Strobe Mode'}
            </button>
          </div>

          <p className={`text-center mt-6 text-sm ${isOn ? 'text-gray-600' : 'text-white/40'}`}>
            Tip: Use this in dark environments for a quick light source
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashlightApp;
