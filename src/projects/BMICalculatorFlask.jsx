import { useState } from 'react';
import { Link } from 'react-router-dom';

// This simulates a Flask-style BMI calculator (frontend only version)
const BMICalculatorFlask = () => {
  const [formData, setFormData] = useState({ height: '', weight: '', age: '', gender: 'male' });
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    
    const heightM = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.weight);
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    
    let category, advice, color;
    if (bmi < 18.5) {
      category = 'Underweight';
      advice = 'You may need to gain some weight. Consult a healthcare provider.';
      color = 'bg-blue-500';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      advice = 'Great! You have a healthy weight. Keep maintaining it.';
      color = 'bg-green-500';
    } else if (bmi < 30) {
      category = 'Overweight';
      advice = 'Consider a balanced diet and regular exercise.';
      color = 'bg-yellow-500';
    } else {
      category = 'Obese';
      advice = 'Please consult a healthcare provider for guidance.';
      color = 'bg-red-500';
    }
    
    // Calculate ideal weight range
    const idealMin = (18.5 * heightM * heightM).toFixed(1);
    const idealMax = (24.9 * heightM * heightM).toFixed(1);
    
    setResult({ bmi, category, advice, color, idealMin, idealMax });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">BMI Calculator</h1>
        <p className="text-white/60 text-center mb-8">Flask-style Implementation</p>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
            <h2 className="text-white font-semibold text-center">Enter Your Details</h2>
          </div>
          
          <form onSubmit={calculateBMI} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="170"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="70"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Calculate BMI
            </button>
          </form>
          
          {result && (
            <div className="border-t p-6">
              <div className="text-center mb-4">
                <div className={`inline-block px-4 py-2 rounded-full text-white font-medium ${result.color}`}>
                  {result.category}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800">{result.bmi}</div>
                <div className="text-gray-500 mt-1">Your BMI</div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">{result.advice}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Ideal weight range: {result.idealMin} - {result.idealMax} kg
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculatorFlask;
