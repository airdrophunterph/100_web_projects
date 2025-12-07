import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const texts = [
  "The quick brown fox jumps over the lazy dog near the riverbank while the sun sets behind the mountains.",
  "Programming is the art of telling a computer what to do through a series of instructions called code.",
  "Success is not final and failure is not fatal. It is the courage to continue that counts the most.",
  "A journey of a thousand miles begins with a single step forward into the unknown adventure ahead.",
  "The best way to predict the future is to create it yourself with hard work and determination.",
];

const TypingSpeedTest = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0 });
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('typingHighScore')) || 0;
  });
  const inputRef = useRef(null);

  const startTest = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setText(randomText);
    setInput('');
    setStarted(false);
    setFinished(false);
    setStartTime(null);
    setEndTime(null);
    inputRef.current?.focus();
  };

  useEffect(() => {
    startTest();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    
    if (!started && value.length === 1) {
      setStarted(true);
      setStartTime(Date.now());
    }

    setInput(value);

    if (value === text) {
      const end = Date.now();
      setEndTime(end);
      setFinished(true);
      
      const timeInMinutes = (end - startTime) / 1000 / 60;
      const words = text.split(' ').length;
      const wpm = Math.round(words / timeInMinutes);
      
      let correct = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === text[i]) correct++;
      }
      const accuracy = Math.round((correct / text.length) * 100);
      
      setStats({ wpm, accuracy, time: Math.round((end - startTime) / 1000) });
      
      if (wpm > highScore) {
        setHighScore(wpm);
        localStorage.setItem('typingHighScore', wpm.toString());
      }
    }
  };

  const getCharClass = (idx) => {
    if (idx >= input.length) return 'text-white/40';
    if (input[idx] === text[idx]) return 'text-green-400';
    return 'text-red-400 bg-red-400/20';
  };

  const currentWPM = () => {
    if (!started || !startTime) return 0;
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const words = input.trim().split(' ').filter(w => w).length;
    return elapsed > 0 ? Math.round(words / elapsed) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">⌨️ Typing Speed Test</h1>
        <p className="text-white/60 text-center mb-8">High Score: {highScore} WPM</p>

        {finished ? (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-6">Test Complete!</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-400">{stats.wpm}</div>
                <div className="text-white/60">WPM</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400">{stats.accuracy}%</div>
                <div className="text-white/60">Accuracy</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-400">{stats.time}s</div>
                <div className="text-white/60">Time</div>
              </div>
            </div>

            {stats.wpm >= highScore && (
              <div className="text-yellow-400 font-bold mb-4">🏆 New High Score!</div>
            )}

            <button
              onClick={startTest}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            {/* Live Stats */}
            {started && (
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentWPM()}</div>
                  <div className="text-white/60 text-sm">WPM</div>
                </div>
              </div>
            )}

            {/* Text to type */}
            <div className="bg-black/30 rounded-xl p-6 mb-6 font-mono text-lg leading-relaxed">
              {text.split('').map((char, idx) => (
                <span key={idx} className={getCharClass(idx)}>{char}</span>
              ))}
            </div>

            {/* Input */}
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInput}
              placeholder="Start typing..."
              rows="3"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 font-mono resize-none"
              autoFocus
            />

            <button
              onClick={startTest}
              className="w-full mt-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
            >
              🔄 New Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTest;
