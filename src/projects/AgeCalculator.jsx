import { useState } from 'react';
import { Link } from 'react-router-dom';

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    setAge({ years, months, days });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Age Calculator</h1>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <label className="block text-white/80 mb-2">Enter your birth date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:border-pink-400"
          />
          
          <button
            onClick={calculateAge}
            className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Calculate Age
          </button>
          
          {age && (
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">{age.years}</div>
                <div className="text-white/60 text-sm">Years</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">{age.months}</div>
                <div className="text-white/60 text-sm">Months</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">{age.days}</div>
                <div className="text-white/60 text-sm">Days</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
