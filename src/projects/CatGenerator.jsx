import { useState } from 'react';
import { Link } from 'react-router-dom';

const CatGenerator = () => {
  const [catUrl, setCatUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('catFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const generateCat = async () => {
    setLoading(true);
    // Using a random seed to get different images
    const timestamp = Date.now();
    setCatUrl(`https://cataas.com/cat?${timestamp}`);
    setLoading(false);
  };

  const addToFavorites = () => {
    if (catUrl && !favorites.includes(catUrl)) {
      const updated = [...favorites, catUrl].slice(-12);
      setFavorites(updated);
      localStorage.setItem('catFavorites', JSON.stringify(updated));
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
      
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-2">🐱 Cat Generator</h1>
        <p className="text-white/60 mb-8">Click to generate random cat images!</p>
        
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <div className="aspect-square bg-white/10 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
            {loading ? (
              <div className="text-white/60">Loading...</div>
            ) : catUrl ? (
              <img src={catUrl} alt="Random Cat" className="w-full h-full object-cover" />
            ) : (
              <div className="text-white/40 text-lg">Click generate to see a cat!</div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={generateCat}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Loading...' : '🎲 Generate Cat'}
            </button>
            {catUrl && (
              <button
                onClick={addToFavorites}
                className="px-4 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30"
              >
                ❤️
              </button>
            )}
          </div>
        </div>
        
        {favorites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Favorites</h2>
            <div className="grid grid-cols-4 gap-2">
              {favorites.slice().reverse().map((url, i) => (
                <img key={i} src={url} alt="Favorite cat" className="aspect-square object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatGenerator;
