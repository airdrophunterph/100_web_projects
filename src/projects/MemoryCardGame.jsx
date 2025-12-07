import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const emojis = ['🐶', '🐱', '🐼', '🦊', '🦁', '🐸', '🐵', '🐰'];

const MemoryCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('memoryBestScore')) || 999;
  });

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, flipped: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    if (matched.length === emojis.length * 2 && matched.length > 0) {
      setGameWon(true);
      if (moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('memoryBestScore', moves.toString());
      }
    }
  }, [matched, moves, bestScore]);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard.emoji === secondCard.emoji) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">🎴 Memory Game</h1>

        <div className="flex justify-center gap-6 mb-6">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">{moves}</div>
            <div className="text-white/60 text-sm">Moves</div>
          </div>
          <div className="text-yellow-400 text-center">
            <div className="text-2xl font-bold">{bestScore === 999 ? '-' : bestScore}</div>
            <div className="text-yellow-400/60 text-sm">Best</div>
          </div>
        </div>

        {gameWon && (
          <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 text-center mb-6">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-green-400 font-bold">You Won in {moves} moves!</div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map(card => {
            const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`aspect-square rounded-xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
                  isFlipped 
                    ? 'bg-white rotate-0' 
                    : 'bg-gradient-to-br from-pink-500 to-rose-500 hover:scale-105'
                } ${matched.includes(card.id) ? 'opacity-60' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {isFlipped ? card.emoji : '❓'}
              </button>
            );
          })}
        </div>

        <button
          onClick={initGame}
          className="w-full py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30"
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
};

export default MemoryCardGame;
