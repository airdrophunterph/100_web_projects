import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect, so keep typing every day.",
  "JavaScript is a versatile programming language.",
  "React is a library for building user interfaces.",
  "Coding is like solving puzzles with logic.",
];

const TypingPractice = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);

  const startTest = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setText(randomText);
    setInput('');
    setStarted(false);
    setFinished(false);
    setErrors(0);
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

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== text[i]) errorCount++;
    }
    setErrors(errorCount);
    setAccuracy(Math.round(((value.length - errorCount) / value.length) * 100) || 100);

    // Check if finished
    if (value === text) {
      const timeTaken = (Date.now() - startTime) / 1000 / 60; // minutes
      const words = text.split(' ').length;
      setWpm(Math.round(words / timeTaken));
      setFinished(true);
    }
  };

  const getCharClass = (idx) => {
    if (idx >= input.length) return 'text-white/40';
    if (input[idx] === text[idx]) return 'text-green-400';
    return 'text-red-400 bg-red-400/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">⌨️ Typing Practice</h1>

        {finished ? (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-6">Great Job!</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400">{wpm}</div>
                <div className="text-white/60">WPM</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-400">{accuracy}%</div>
                <div className="text-white/60">Accuracy</div>
              </div>
            </div>
            <button
              onClick={startTest}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            {/* Stats */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{accuracy}%</div>
                <div className="text-white/60 text-sm">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{errors}</div>
                <div className="text-white/60 text-sm">Errors</div>
              </div>
            </div>

            {/* Text to type */}
            <div className="bg-black/30 rounded-xl p-6 mb-6 font-mono text-xl leading-relaxed">
              {text.split('').map((char, idx) => (
                <span key={idx} className={getCharClass(idx)}>{char}</span>
              ))}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Start typing..."
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 font-mono text-lg"
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

export default TypingPractice;
