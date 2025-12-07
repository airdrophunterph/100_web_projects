import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PomodoroTimer = () => {
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const times = { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };
  const colors = { work: 'from-red-500 to-rose-600', shortBreak: 'from-green-500 to-emerald-600', longBreak: 'from-blue-500 to-indigo-600' };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setSessions(prev => prev + 1);
      if ((sessions + 1) % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(times.longBreak);
      } else {
        setMode('shortBreak');
        setTimeLeft(times.shortBreak);
      }
    } else {
      setMode('work');
      setTimeLeft(times.work);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(times[newMode]);
    setIsRunning(false);
  };

  const reset = () => {
    setTimeLeft(times[mode]);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = ((times[mode] - timeLeft) / times[mode]) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors[mode]} p-4 transition-all duration-500`}>
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">🍅 Pomodoro Timer</h1>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { key: 'work', label: 'Focus' },
            { key: 'shortBreak', label: 'Short Break' },
            { key: 'longBreak', label: 'Long Break' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                mode === key ? 'bg-white/30' : 'bg-white/10'
              } text-white`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
            <circle
              cx="128" cy="128" r="120"
              stroke="white"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={753.98}
              strokeDashoffset={753.98 * (1 - progress / 100)}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-white font-mono">{formatTime(timeLeft)}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={reset}
            className="w-14 h-14 bg-white/20 rounded-full text-white text-xl"
          >
            ↺
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-20 h-20 bg-white rounded-full text-gray-900 text-2xl font-bold shadow-lg"
          >
            {isRunning ? '⏸' : '▶'}
          </button>
          <button
            onClick={handleComplete}
            className="w-14 h-14 bg-white/20 rounded-full text-white text-xl"
          >
            ⏭
          </button>
        </div>

        {/* Sessions */}
        <div className="bg-white/20 rounded-xl p-4">
          <div className="text-white/80">Sessions Completed</div>
          <div className="text-3xl font-bold text-white">{sessions}</div>
          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${i <= (sessions % 4 || (sessions > 0 ? 4 : 0)) ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
