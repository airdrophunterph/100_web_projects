import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const stocksData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, change: 2.3 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.20, change: -0.8 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.90, change: 1.5 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 0.9 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -2.1 },
  { symbol: 'META', name: 'Meta Platforms', price: 505.75, change: 3.2 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.30, change: 4.5 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.40, change: 0.6 },
];

const StockPortfolio = () => {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('stockPortfolio');
    return saved ? JSON.parse(saved) : [];
  });
  const [stocks, setStocks] = useState(stocksData);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ symbol: '', shares: '' });

  useEffect(() => {
    localStorage.setItem('stockPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => ({
        ...s,
        price: s.price * (1 + (Math.random() - 0.5) * 0.01),
        change: s.change + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToPortfolio = () => {
    const stock = stocks.find(s => s.symbol === addForm.symbol);
    if (!stock || !addForm.shares) return;

    const existing = portfolio.find(p => p.symbol === addForm.symbol);
    if (existing) {
      setPortfolio(portfolio.map(p => 
        p.symbol === addForm.symbol 
          ? { ...p, shares: p.shares + parseInt(addForm.shares) }
          : p
      ));
    } else {
      setPortfolio([...portfolio, { ...stock, shares: parseInt(addForm.shares), avgCost: stock.price }]);
    }
    setAddForm({ symbol: '', shares: '' });
    setShowAdd(false);
  };

  const removeFromPortfolio = (symbol) => {
    setPortfolio(portfolio.filter(p => p.symbol !== symbol));
  };

  const getStockPrice = (symbol) => stocks.find(s => s.symbol === symbol)?.price || 0;
  const getStockChange = (symbol) => stocks.find(s => s.symbol === symbol)?.change || 0;

  const totalValue = portfolio.reduce((sum, p) => sum + getStockPrice(p.symbol) * p.shares, 0);
  const totalCost = portfolio.reduce((sum, p) => sum + p.avgCost * p.shares, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = totalCost > 0 ? (totalGain / totalCost) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-lime-900 to-emerald-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📈 Stock Portfolio</h1>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-white/60 text-sm">Portfolio Value</div>
            <div className="text-2xl font-bold text-white">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-white/60 text-sm">Total Cost</div>
            <div className="text-2xl font-bold text-white">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-white/60 text-sm">Total Gain/Loss</div>
            <div className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGain >= 0 ? '+' : ''}${totalGain.toFixed(2)}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-white/60 text-sm">Return</div>
            <div className={`text-2xl font-bold ${totalGainPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGainPercent >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Add Stock */}
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="w-full mb-4 py-3 bg-green-500 text-white font-bold rounded-lg"
        >
          + Add Stock
        </button>

        {showAdd && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <select
                value={addForm.symbol}
                onChange={(e) => setAddForm({ ...addForm, symbol: e.target.value })}
                className="px-4 py-2 rounded-lg bg-white/20 text-white"
              >
                <option value="" className="bg-gray-800">Select stock</option>
                {stocks.map(s => <option key={s.symbol} value={s.symbol} className="bg-gray-800">{s.symbol}</option>)}
              </select>
              <input
                type="number"
                placeholder="Shares"
                value={addForm.shares}
                onChange={(e) => setAddForm({ ...addForm, shares: e.target.value })}
                className="px-4 py-2 rounded-lg bg-white/20 text-white"
              />
              <button onClick={addToPortfolio} className="px-4 py-2 bg-green-500 text-white rounded-lg">Add</button>
            </div>
          </div>
        )}

        {/* Holdings */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          <div className="p-4 bg-white/10 font-bold text-white">Your Holdings</div>
          {portfolio.length === 0 ? (
            <div className="p-8 text-center text-white/40">No stocks in portfolio</div>
          ) : (
            <div className="divide-y divide-white/10">
              {portfolio.map(holding => {
                const currentPrice = getStockPrice(holding.symbol);
                const change = getStockChange(holding.symbol);
                const value = currentPrice * holding.shares;
                const gain = (currentPrice - holding.avgCost) * holding.shares;
                return (
                  <div key={holding.symbol} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold">{holding.symbol}</div>
                      <div className="text-white/60 text-sm">{holding.shares} shares @ ${holding.avgCost.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">${value.toFixed(2)}</div>
                      <div className={`text-sm ${gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {gain >= 0 ? '+' : ''}{gain.toFixed(2)} ({change >= 0 ? '+' : ''}{change.toFixed(2)}%)
                      </div>
                    </div>
                    <button onClick={() => removeFromPortfolio(holding.symbol)} className="ml-4 text-red-400">🗑️</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPortfolio;
