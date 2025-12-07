import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  const startStop = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps(prev => [...prev, { id: prev.length + 1, time }]);
    }
  };

  const getBestWorst = () => {
    if (laps.length < 2) return { best: null, worst: null };
    const lapTimes = laps.map((lap, i) => ({
      id: lap.id,
      diff: i === 0 ? lap.time : lap.time - laps[i - 1].time
    }));
    const sorted = [...lapTimes].sort((a, b) => a.diff - b.diff);
    return { best: sorted[0]?.id, worst: sorted[sorted.length - 1]?.id };
  };

  const { best, worst } = getBestWorst();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">⏱️ Stopwatch</h1>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 text-center">
          {/* Time Display */}
          <div className="text-6xl md:text-7xl font-mono font-bold text-white mb-8">
            {formatTime(time)}
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={reset}
              disabled={time === 0}
              className="w-20 h-20 rounded-full bg-white/20 text-white font-bold text-lg disabled:opacity-50"
            >
              Reset
            </button>
            <button
              onClick={startStop}
              className={`w-24 h-24 rounded-full font-bold text-xl ${
                isRunning 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button
              onClick={addLap}
              disabled={!isRunning}
              className="w-20 h-20 rounded-full bg-white/20 text-white font-bold text-lg disabled:opacity-50"
            >
              Lap
            </button>
          </div>
        </div>

        {/* Laps */}
        {laps.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur rounded-2xl p-4">
            <h3 className="text-white font-bold mb-3">Laps</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {laps.slice().reverse().map((lap, i) => {
                const prevTime = laps.length - i - 2 >= 0 ? laps[laps.length - i - 2].time : 0;
                const diff = lap.time - prevTime;
                return (
                  <div 
                    key={lap.id}
                    className={`flex justify-between p-3 rounded-lg ${
                      lap.id === best ? 'bg-green-500/20 text-green-400' :
                      lap.id === worst ? 'bg-red-500/20 text-red-400' :
                      'bg-white/10 text-white'
                    }`}
                  >
                    <span>Lap {lap.id}</span>
                    <span className="font-mono">+{formatTime(diff)}</span>
                    <span className="font-mono">{formatTime(lap.time)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
