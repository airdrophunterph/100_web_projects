import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
];

const colors = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-blue-500',
];

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const [color, setColor] = useState(colors[0]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteQuotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setQuote(randomQuote);
      setColor(randomColor);
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = () => {
    const exists = favorites.some(f => f.text === quote.text);
    let updated;
    if (exists) {
      updated = favorites.filter(f => f.text !== quote.text);
    } else {
      updated = [...favorites, quote];
    }
    setFavorites(updated);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updated));
  };

  const isFavorite = favorites.some(f => f.text === quote.text);

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quote',
        text: `"${quote.text}" - ${quote.author}`,
      });
    } else {
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color} p-4 transition-all duration-500`}>
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-6xl mb-6">💬</div>
          <blockquote className="text-2xl md:text-3xl text-gray-800 font-medium mb-6 leading-relaxed">
            "{quote.text}"
          </blockquote>
          <p className="text-gray-500 text-lg">— {quote.author}</p>

          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={getNewQuote}
              className={`px-6 py-3 bg-gradient-to-r ${color} text-white rounded-full font-bold hover:opacity-90 transition`}
            >
              New Quote
            </button>
            <button
              onClick={toggleFavorite}
              className={`p-3 rounded-full transition ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button
              onClick={shareQuote}
              className="p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              📤
            </button>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <button className="text-white/80 hover:text-white">
              ❤️ {favorites.length} favorite{favorites.length > 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
