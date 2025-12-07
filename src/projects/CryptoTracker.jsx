import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const cryptoData = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 43250.00, change: 2.5, icon: '₿', color: 'from-orange-400 to-orange-600' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 2280.00, change: -1.2, icon: 'Ξ', color: 'from-blue-400 to-purple-600' },
  { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', price: 312.50, change: 0.8, icon: '◉', color: 'from-yellow-400 to-yellow-600' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 98.40, change: 5.2, icon: '◎', color: 'from-purple-400 to-pink-600' },
  { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 0.62, change: -0.5, icon: '✕', color: 'from-gray-400 to-gray-600' },
  { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.58, change: 1.8, icon: '₳', color: 'from-blue-500 to-blue-700' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.085, change: -2.1, icon: 'Ð', color: 'from-yellow-500 to-amber-600' },
  { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.25, change: 3.4, icon: '●', color: 'from-pink-500 to-pink-700' },
];

const CryptoTracker = () => {
  const [prices, setPrices] = useState(cryptoData);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cryptoWatchlist');
    return saved ? JSON.parse(saved) : ['btc', 'eth'];
  });
  const [sortBy, setSortBy] = useState('marketCap');

  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
        change: coin.change + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleWatchlist = (id) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">📈 Crypto Tracker</h1>
        <p className="text-white/60 text-center mb-8">Live prices update every 3 seconds</p>

        {/* Watchlist */}
        {watchlist.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {prices.filter(c => watchlist.includes(c.id)).map(coin => (
              <div key={coin.id} className={`bg-gradient-to-br ${coin.color} rounded-xl p-4`}>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{coin.icon}</span>
                  <span className={`text-sm ${coin.change >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                    {coin.change >= 0 ? '↑' : '↓'} {Math.abs(coin.change).toFixed(2)}%
                  </span>
                </div>
                <div className="text-white font-bold text-lg mt-2">{coin.symbol}</div>
                <div className="text-white/80 text-sm">{formatPrice(coin.price)}</div>
              </div>
            ))}
          </div>
        )}

        {/* All Coins */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold">All Cryptocurrencies</h3>
          </div>
          
          <div className="divide-y divide-white/10">
            {prices.map((coin, i) => (
              <div key={coin.id} className="flex items-center p-4 hover:bg-white/5">
                <div className="w-8 text-white/40 text-sm">{i + 1}</div>
                <div className={`w-10 h-10 bg-gradient-to-br ${coin.color} rounded-full flex items-center justify-center text-white font-bold mr-3`}>
                  {coin.icon}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{coin.name}</div>
                  <div className="text-white/40 text-sm">{coin.symbol}</div>
                </div>
                <div className="text-right mr-4">
                  <div className="text-white font-bold">{formatPrice(coin.price)}</div>
                  <div className={`text-sm ${coin.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                  </div>
                </div>
                <button
                  onClick={() => toggleWatchlist(coin.id)}
                  className={`p-2 rounded-lg ${watchlist.includes(coin.id) ? 'text-yellow-400' : 'text-white/40'}`}
                >
                  {watchlist.includes(coin.id) ? '⭐' : '☆'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
