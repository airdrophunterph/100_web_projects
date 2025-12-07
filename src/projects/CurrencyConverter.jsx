import { useState } from 'react';
import { Link } from 'react-router-dom';

const rates = {
  USD: { EUR: 0.92, GBP: 0.79, JPY: 149.50, CAD: 1.36, AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.12 },
  EUR: { USD: 1.09, GBP: 0.86, JPY: 162.50, CAD: 1.48, AUD: 1.66, CHF: 0.96, CNY: 7.88, INR: 90.45 },
  GBP: { USD: 1.27, EUR: 1.16, JPY: 189.20, CAD: 1.72, AUD: 1.94, CHF: 1.11, CNY: 9.17, INR: 105.23 },
  JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.010, CHF: 0.0059, CNY: 0.048, INR: 0.56 },
};

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState(null);

  const convert = () => {
    if (!amount) return;
    const numAmount = parseFloat(amount);
    
    if (from === to) {
      setResult(numAmount);
      return;
    }
    
    let rate;
    if (rates[from] && rates[from][to]) {
      rate = rates[from][to];
    } else if (rates[to] && rates[to][from]) {
      rate = 1 / rates[to][from];
    } else {
      const usdFromRate = rates['USD'][from] ? 1 / rates['USD'][from] : (rates[from]?.['USD'] || 1);
      const usdToRate = rates['USD'][to] || (rates[to]?.['USD'] ? 1 / rates[to]['USD'] : 1);
      rate = usdFromRate * usdToRate;
    }
    
    setResult(numAmount * rate);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  const getCurrency = (code) => currencies.find(c => c.code === code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💱 Currency Converter</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          {/* Amount */}
          <div className="mb-6">
            <label className="block text-white/60 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white text-2xl border border-white/30"
            />
          </div>

          {/* From */}
          <div className="mb-4">
            <label className="block text-white/60 mb-2">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-800">
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button onClick={swap} className="p-3 bg-white/20 rounded-full hover:bg-white/30 text-white text-xl">
              ⇅
            </button>
          </div>

          {/* To */}
          <div className="mb-6">
            <label className="block text-white/60 mb-2">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-800">
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={convert}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg"
          >
            Convert
          </button>

          {/* Result */}
          {result !== null && (
            <div className="mt-6 p-4 bg-white/10 rounded-xl text-center">
              <div className="text-white/60 mb-2">
                {getCurrency(from)?.flag} {amount} {from} =
              </div>
              <div className="text-3xl font-bold text-amber-400">
                {getCurrency(to)?.flag} {result.toFixed(2)} {to}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
