import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const DinosaurGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
  const [dinoY, setDinoY] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('dinoHighScore')) || 0;
  });

  const jump = useCallback(() => {
    if (!isJumping && gameState === 'playing') {
      setIsJumping(true);
      setDinoY(100);
      
      setTimeout(() => {
        setDinoY(0);
        setIsJumping(false);
      }, 500);
    }
  }, [isJumping, gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setObstacles([{ id: Date.now(), x: 100 }]);
  };

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'idle' || gameState === 'gameover') {
          startGame();
        } else {
          jump();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        const updated = prev
          .map(obs => ({ ...obs, x: obs.x - 2 }))
          .filter(obs => obs.x > -10);
        
        // Add new obstacle
        if (updated.length === 0 || updated[updated.length - 1].x < 60) {
          if (Math.random() > 0.98) {
            updated.push({ id: Date.now(), x: 100 });
          }
        }
        
        return updated;
      });
      
      setScore(prev => prev + 1);
    }, 30);
    
    return () => clearInterval(gameLoop);
  }, [gameState]);

  // Collision detection
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    const dinoLeft = 10;
    const dinoRight = 20;
    const dinoBottom = dinoY;
    const dinoTop = dinoY + 30;
    
    for (const obs of obstacles) {
      if (obs.x > dinoLeft && obs.x < dinoRight + 5) {
        if (dinoBottom < 25) {
          setGameState('gameover');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('dinoHighScore', score.toString());
          }
          break;
        }
      }
    }
  }, [obstacles, dinoY, gameState, score, highScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-4">🦖 Dinosaur Game</h1>
        
        {/* Scores */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="text-white">Score: <span className="font-bold">{score}</span></div>
          <div className="text-yellow-400">High Score: <span className="font-bold">{highScore}</span></div>
        </div>
        
        {/* Game Area */}
        <div 
          className="relative bg-white/10 backdrop-blur rounded-2xl overflow-hidden h-48 cursor-pointer"
          onClick={() => {
            if (gameState === 'idle' || gameState === 'gameover') {
              startGame();
            } else {
              jump();
            }
          }}
        >
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40"></div>
          
          {/* Dinosaur */}
          <div 
            className="absolute left-[10%] text-4xl transition-all"
            style={{ 
              bottom: `${dinoY + 10}px`,
              transitionDuration: isJumping ? '0.25s' : '0.25s',
              transitionTimingFunction: isJumping ? 'ease-out' : 'ease-in'
            }}
          >
            🦖
          </div>
          
          {/* Obstacles */}
          {obstacles.map(obs => (
            <div 
              key={obs.id}
              className="absolute bottom-2 text-3xl"
              style={{ left: `${obs.x}%` }}
            >
              🌵
            </div>
          ))}
          
          {/* Start/Game Over Screen */}
          {gameState !== 'playing' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="text-4xl mb-4">{gameState === 'gameover' ? '💀' : '🦖'}</div>
                <div className="text-white text-xl font-bold mb-2">
                  {gameState === 'gameover' ? 'Game Over!' : 'Dinosaur Game'}
                </div>
                {gameState === 'gameover' && (
                  <div className="text-white/60 mb-4">Score: {score}</div>
                )}
                <div className="text-white/60 text-sm">
                  Press SPACE or tap to {gameState === 'gameover' ? 'restart' : 'start'}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center text-white/60 mt-4">
          Press SPACE or tap to jump
        </div>
      </div>
    </div>
  );
};

export default DinosaurGame;
