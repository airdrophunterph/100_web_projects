import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let period = '';
    
    if (!is24Hour) {
      period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }
    
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    
    return { h, m, s, period };
  };

  const { h, m, s, period } = formatTime();

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString('en-US', options);
  };

  const themes = {
    dark: 'from-violet-900 via-purple-900 to-fuchsia-900',
    blue: 'from-blue-900 via-cyan-900 to-teal-900',
    green: 'from-green-900 via-emerald-900 to-teal-900',
    red: 'from-red-900 via-rose-900 to-pink-900',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[theme]} p-4 transition-all duration-500`}>
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold text-white/60 mb-8">Digital Clock</h1>
        
        {/* Clock Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="bg-white/20 rounded-2xl p-4 md:p-6">
              <span className="text-5xl md:text-8xl font-mono font-bold text-white">{h}</span>
            </div>
            <span className="text-5xl md:text-8xl font-bold text-white animate-pulse">:</span>
            <div className="bg-white/20 rounded-2xl p-4 md:p-6">
              <span className="text-5xl md:text-8xl font-mono font-bold text-white">{m}</span>
            </div>
            {showSeconds && (
              <>
                <span className="text-5xl md:text-8xl font-bold text-white animate-pulse">:</span>
                <div className="bg-white/20 rounded-2xl p-4 md:p-6">
                  <span className="text-5xl md:text-8xl font-mono font-bold text-white">{s}</span>
                </div>
              </>
            )}
            {!is24Hour && (
              <div className="bg-white/20 rounded-xl p-3 md:p-4 ml-2">
                <span className="text-xl md:text-3xl font-bold text-white">{period}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Date */}
        <div className="text-white/60 text-xl md:text-2xl mb-8">{formatDate()}</div>
        
        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              is24Hour ? 'bg-white text-gray-900' : 'bg-white/20 text-white'
            }`}
          >
            24H
          </button>
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              showSeconds ? 'bg-white text-gray-900' : 'bg-white/20 text-white'
            }`}
          >
            Seconds
          </button>
          {Object.keys(themes).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-10 h-10 rounded-lg capitalize font-medium transition ${
                theme === t ? 'ring-2 ring-white' : ''
              } bg-gradient-to-br ${themes[t]}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
