import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const drums = [
  { key: 'Q', name: 'Kick', color: 'from-red-500 to-orange-500' },
  { key: 'W', name: 'Snare', color: 'from-orange-500 to-yellow-500' },
  { key: 'E', name: 'Hi-Hat', color: 'from-yellow-500 to-green-500' },
  { key: 'A', name: 'Tom 1', color: 'from-green-500 to-teal-500' },
  { key: 'S', name: 'Tom 2', color: 'from-teal-500 to-cyan-500' },
  { key: 'D', name: 'Tom 3', color: 'from-cyan-500 to-blue-500' },
  { key: 'Z', name: 'Crash', color: 'from-blue-500 to-indigo-500' },
  { key: 'X', name: 'Ride', color: 'from-indigo-500 to-purple-500' },
  { key: 'C', name: 'Clap', color: 'from-purple-500 to-pink-500' },
];

// Simple audio context for drum sounds
const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  const sounds = {
    'Kick': { freq: 60, type: 'sine', duration: 0.5 },
    'Snare': { freq: 200, type: 'triangle', duration: 0.2 },
    'Hi-Hat': { freq: 800, type: 'square', duration: 0.1 },
    'Tom 1': { freq: 150, type: 'sine', duration: 0.3 },
    'Tom 2': { freq: 120, type: 'sine', duration: 0.3 },
    'Tom 3': { freq: 90, type: 'sine', duration: 0.3 },
    'Crash': { freq: 400, type: 'sawtooth', duration: 0.8 },
    'Ride': { freq: 600, type: 'triangle', duration: 0.4 },
    'Clap': { freq: 1000, type: 'square', duration: 0.15 },
  };
  
  const sound = sounds[type] || sounds['Kick'];
  oscillator.type = sound.type;
  oscillator.frequency.setValueAtTime(sound.freq, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + sound.duration);
};

const DrumKit = () => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [sequence, setSequence] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playDrum = useCallback((drum) => {
    playSound(drum.name);
    setActiveKeys(prev => new Set([...prev, drum.key]));
    setTimeout(() => {
      setActiveKeys(prev => {
        const next = new Set(prev);
        next.delete(drum.key);
        return next;
      });
    }, 100);
    
    if (isRecording) {
      setSequence(prev => [...prev, { key: drum.key, time: Date.now() }]);
    }
  }, [isRecording]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const drum = drums.find(d => d.key === e.key.toUpperCase());
      if (drum) {
        playDrum(drum);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playDrum]);

  const startRecording = () => {
    setSequence([]);
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const playRecording = async () => {
    if (sequence.length === 0) return;
    
    setIsPlaying(true);
    const startTime = sequence[0].time;
    
    for (let i = 0; i < sequence.length; i++) {
      const delay = sequence[i].time - startTime;
      await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : sequence[i].time - sequence[i-1].time));
      const drum = drums.find(d => d.key === sequence[i].key);
      if (drum) playDrum(drum);
    }
    
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🥁 Drum Kit</h1>
        <p className="text-white/60 text-center mb-8">Press keys or click pads to play</p>
        
        {/* Drum Pads */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {drums.map((drum) => (
            <button
              key={drum.key}
              onClick={() => playDrum(drum)}
              className={`
                aspect-square rounded-2xl font-bold text-white
                bg-gradient-to-br ${drum.color}
                transition-all duration-100
                ${activeKeys.has(drum.key) ? 'scale-95 brightness-125 shadow-lg' : 'hover:scale-105'}
              `}
            >
              <div className="text-3xl mb-1">{drum.key}</div>
              <div className="text-sm opacity-80">{drum.name}</div>
            </button>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex gap-3 justify-center mb-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 flex items-center gap-2"
            >
              <span className="w-3 h-3 bg-white rounded-full"></span> Record
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-400 animate-pulse"
            >
              ⬛ Stop
            </button>
          )}
          
          <button
            onClick={playRecording}
            disabled={sequence.length === 0 || isPlaying}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-400 disabled:opacity-50"
          >
            ▶️ Play ({sequence.length})
          </button>
        </div>
        
        <div className="text-center text-white/40 text-sm">
          Use keys Q W E A S D Z X C
        </div>
      </div>
    </div>
  );
};

export default DrumKit;
