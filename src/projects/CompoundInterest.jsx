import { useState } from 'react';
import { Link } from 'react-router-dom';

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(10);
  const [compound, setCompound] = useState(12);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);
    
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;
    
    // Calculate yearly breakdown
    const breakdown = [];
    for (let year = 1; year <= t; year++) {
      const yearAmount = p * Math.pow(1 + r / n, n * year);
      breakdown.push({
        year,
        amount: yearAmount,
        interest: yearAmount - p
      });
    }
    
    setResult({ amount, interest, breakdown });
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2 
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Compound Interest Calculator</h1>
        
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Principal Amount ($)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2">Time Period (Years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2">Compound Frequency</label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              >
                <option value="1">Annually</option>
                <option value="2">Semi-Annually</option>
                <option value="4">Quarterly</option>
                <option value="12">Monthly</option>
                <option value="365">Daily</option>
              </select>
            </div>
            
            <button
              onClick={calculate}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg hover:opacity-90"
            >
              Calculate
            </button>
          </div>
          
          {result && (
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-white/60 text-sm">Final Amount</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(result.amount)}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-white/60 text-sm">Total Interest</div>
                  <div className="text-2xl font-bold text-green-400">{formatCurrency(result.interest)}</div>
                </div>
              </div>
              
              {/* Growth chart */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-3">Growth Over Time</div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {result.breakdown.map((item) => (
                    <div key={item.year} className="flex items-center gap-3">
                      <span className="text-white/60 w-16">Year {item.year}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-4 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500"
                          style={{ width: `${(item.amount / result.amount) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm w-24 text-right">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompoundInterest;
