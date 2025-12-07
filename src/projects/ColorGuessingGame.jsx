import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const generateColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const ColorGuessingGame = () => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('colorGameHighScore')) || 0;
  });
  const [message, setMessage] = useState('Guess the color!');
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const startNewRound = () => {
    const colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(generateColor());
    }
    const target = colors[Math.floor(Math.random() * colors.length)];
    setOptions(colors);
    setTargetColor(target);
    setMessage('Guess the color!');
    setGameOver(false);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleGuess = (color) => {
    if (gameOver) return;
    
    if (color === targetColor) {
      const newScore = score + (10 * (streak + 1));
      setScore(newScore);
      setStreak(streak + 1);
      setMessage(`Correct! +${10 * (streak + 1)} points`);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('colorGameHighScore', newScore.toString());
      }
      
      setTimeout(startNewRound, 1000);
    } else {
      setMessage('Wrong! Game Over');
      setGameOver(true);
      setStreak(0);
    }
  };

  const resetGame = () => {
    setScore(0);
    setStreak(0);
    startNewRound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Color Guessing Game</h1>
        
        {/* Scores */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-white">
            <div className="text-sm text-white/60">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
          <div className="text-yellow-400">
            <div className="text-sm text-yellow-400/60">High Score</div>
            <div className="text-2xl font-bold">{highScore}</div>
          </div>
          {streak > 0 && (
            <div className="text-green-400">
              <div className="text-sm text-green-400/60">Streak</div>
              <div className="text-2xl font-bold">🔥 {streak}</div>
            </div>
          )}
        </div>
        
        {/* Target color display */}
        <div 
          className="w-48 h-48 mx-auto rounded-2xl shadow-2xl mb-4 border-4 border-white/20"
          style={{ backgroundColor: targetColor }}
        ></div>
        
        <div className="text-white font-mono text-lg mb-2">{targetColor}</div>
        
        <div className={`text-xl font-bold mb-6 ${
          message.includes('Correct') ? 'text-green-400' : 
          message.includes('Wrong') ? 'text-red-400' : 'text-white'
        }`}>
          {message}
        </div>
        
        {/* Color options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {options.map((color, i) => (
            <button
              key={i}
              onClick={() => handleGuess(color)}
              disabled={gameOver}
              className="aspect-square rounded-xl transition-transform hover:scale-105 disabled:opacity-50 shadow-lg"
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
        
        {gameOver && (
          <button
            onClick={resetGame}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorGuessingGame;
