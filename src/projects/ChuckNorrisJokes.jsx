import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Local jokes database
const jokes = [
  "Chuck Norris can divide by zero.",
  "Chuck Norris counted to infinity. Twice.",
  "When Chuck Norris does push-ups, he doesn't push himself up. He pushes the Earth down.",
  "Chuck Norris can slam a revolving door.",
  "Chuck Norris doesn't wear a watch. He decides what time it is.",
  "Chuck Norris can hear sign language.",
  "When Chuck Norris enters a room, he doesn't turn the lights on. He turns the dark off.",
  "Chuck Norris can win a game of Connect Four in three moves.",
  "Chuck Norris doesn't read books. He stares them down until he gets the information he wants.",
  "Chuck Norris once kicked a horse in the chin. Its descendants are known today as giraffes.",
  "Chuck Norris can cook minute rice in 30 seconds.",
  "Chuck Norris doesn't dial the wrong number. You answered the wrong phone.",
  "Chuck Norris can kill two stones with one bird.",
  "Chuck Norris can unscramble an egg.",
  "When Chuck Norris looks in a mirror, the mirror shatters. Because the mirror knows not to get between Chuck Norris and Chuck Norris.",
  "Chuck Norris doesn't sleep. He waits.",
  "Chuck Norris can strangle you with a cordless phone.",
  "Chuck Norris won the World Series of Poker using Pokemon cards.",
  "Chuck Norris can cut a knife with butter.",
  "When the Boogeyman goes to sleep, he checks his closet for Chuck Norris.",
];

const ChuckNorrisJokes = () => {
  const [joke, setJoke] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('chuckFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setJoke(jokes[randomIndex]);
  };

  useEffect(() => {
    getRandomJoke();
  }, []);

  const addToFavorites = () => {
    if (joke && !favorites.includes(joke)) {
      const updated = [...favorites, joke];
      setFavorites(updated);
      localStorage.setItem('chuckFavorites', JSON.stringify(updated));
    }
  };

  const removeFavorite = (j) => {
    const updated = favorites.filter(f => f !== j);
    setFavorites(updated);
    localStorage.setItem('chuckFavorites', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Chuck Norris Facts</h1>
        <p className="text-white/60 mb-8">Random Chuck Norris jokes & facts</p>
        
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
          <div className="text-6xl mb-6">👊</div>
          
          <p className="text-white text-xl leading-relaxed min-h-[100px] flex items-center justify-center">
            "{joke}"
          </p>
          
          <div className="flex gap-3 mt-8">
            <button
              onClick={getRandomJoke}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg hover:opacity-90"
            >
              🎲 Next Joke
            </button>
            <button
              onClick={addToFavorites}
              disabled={favorites.includes(joke)}
              className={`px-4 py-3 rounded-lg ${
                favorites.includes(joke) 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ⭐
            </button>
          </div>
        </div>
        
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="mt-6 text-white/60 hover:text-white"
        >
          {showFavorites ? 'Hide' : 'Show'} Favorites ({favorites.length})
        </button>
        
        {showFavorites && favorites.length > 0 && (
          <div className="mt-4 space-y-3">
            {favorites.map((f, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-4 text-left flex justify-between items-start gap-3">
                <p className="text-white text-sm">"{f}"</p>
                <button onClick={() => removeFavorite(f)} className="text-red-400 hover:text-red-300">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChuckNorrisJokes;
