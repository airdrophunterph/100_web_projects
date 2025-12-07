import { useState } from 'react';
import { Link } from 'react-router-dom';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('bmiHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const calculateBMI = () => {
    if (!height || !weight) return;
    
    let bmi;
    if (unit === 'metric') {
      const heightM = parseFloat(height) / 100;
      bmi = parseFloat(weight) / (heightM * heightM);
    } else {
      bmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }
    
    bmi = bmi.toFixed(1);
    
    let category, color;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'text-green-400';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-400';
    } else {
      category = 'Obese';
      color = 'text-red-400';
    }
    
    const newResult = { bmi, category, color, date: new Date().toLocaleDateString() };
    setResult(newResult);
    
    const newHistory = [...history, newResult].slice(-10);
    setHistory(newHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
  };

  const getBMIPosition = () => {
    if (!result) return 0;
    const bmi = parseFloat(result.bmi);
    return Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">BMI Calculator</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          {/* Unit Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1 mb-6">
            <button
              onClick={() => setUnit('metric')}
              className={`flex-1 py-2 rounded-md font-medium transition ${unit === 'metric' ? 'bg-white text-gray-900' : 'text-white/60'}`}
            >
              Metric
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`flex-1 py-2 rounded-md font-medium transition ${unit === 'imperial' ? 'bg-white text-gray-900' : 'text-white/60'}`}
            >
              Imperial
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-cyan-400"
                placeholder={unit === 'metric' ? '170' : '67'}
              />
            </div>
            
            <div>
              <label className="block text-white/80 mb-2">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-cyan-400"
                placeholder={unit === 'metric' ? '70' : '154'}
              />
            </div>
          </div>
          
          <button
            onClick={calculateBMI}
            className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Calculate BMI
          </button>
          
          {result && (
            <div className="mt-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-white">{result.bmi}</div>
                <div className={`text-xl font-medium mt-2 ${result.color}`}>{result.category}</div>
              </div>
              
              {/* BMI Scale */}
              <div className="mt-6 relative">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500"></div>
                <div 
                  className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-gray-800 -translate-x-1/2 -translate-y-0.5"
                  style={{ left: `${getBMIPosition()}%` }}
                ></div>
                <div className="flex justify-between text-white/60 text-xs mt-2">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {history.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-4">
            <h3 className="text-white font-medium mb-3">History</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.slice().reverse().map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/60">{h.date}</span>
                  <span className={h.color}>{h.bmi} - {h.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
