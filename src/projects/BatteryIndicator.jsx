import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BatteryIndicator = () => {
  const [battery, setBattery] = useState({ level: 0.75, charging: false });
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const getBattery = async () => {
      try {
        if ('getBattery' in navigator) {
          const bat = await navigator.getBattery();
          const updateBattery = () => {
            setBattery({ level: bat.level, charging: bat.charging });
          };
          updateBattery();
          bat.addEventListener('levelchange', updateBattery);
          bat.addEventListener('chargingchange', updateBattery);
          return () => {
            bat.removeEventListener('levelchange', updateBattery);
            bat.removeEventListener('chargingchange', updateBattery);
          };
        } else {
          setSupported(false);
        }
      } catch {
        setSupported(false);
      }
    };
    getBattery();
  }, []);

  const percentage = Math.round(battery.level * 100);
  const getColor = () => {
    if (percentage > 50) return 'from-green-400 to-green-600';
    if (percentage > 20) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-900 via-green-900 to-emerald-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Battery Indicator</h1>
        
        {!supported ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <p className="text-white/80">Battery API not supported in this browser.</p>
            <p className="text-white/60 text-sm mt-2">Try using Chrome on a laptop.</p>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            {/* Battery Icon */}
            <div className="relative mx-auto w-48 h-24 bg-white/20 rounded-2xl border-4 border-white/40 overflow-hidden">
              <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 w-3 h-8 bg-white/40 rounded-r-lg"></div>
              <div 
                className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
              {battery.charging && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Percentage */}
            <div className="mt-8">
              <div className="text-6xl font-bold text-white">{percentage}%</div>
              <div className="text-white/60 mt-2">
                {battery.charging ? '⚡ Charging' : 'On Battery'}
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="mt-8 bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getColor()} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatteryIndicator;
