import { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomRangeSlider = () => {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(25);
  const [value3, setValue3] = useState(75);
  const [minMax, setMinMax] = useState({ min: 20, max: 80 });

  const Slider = ({ value, onChange, min = 0, max = 100, color, label }) => {
    const percentage = ((value - min) / (max - min)) * 100;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-white/80">{label}</span>
          <span className="text-white font-bold">{value}</span>
        </div>
        <div className="relative h-3 bg-white/20 rounded-full">
          <div 
            className={`absolute h-full rounded-full ${color}`}
            style={{ width: `${percentage}%` }}
          ></div>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer"
            style={{ left: `calc(${percentage}% - 12px)` }}
          ></div>
        </div>
      </div>
    );
  };

  const RangeSlider = ({ min, max, onChange, label }) => {
    const minPercent = (min / 100) * 100;
    const maxPercent = (max / 100) * 100;
    
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-white/80">{label}</span>
          <span className="text-white font-bold">{min} - {max}</span>
        </div>
        <div className="relative h-3 bg-white/20 rounded-full">
          <div 
            className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          ></div>
          <input
            type="range"
            min={0}
            max={100}
            value={min}
            onChange={(e) => {
              const newMin = Math.min(parseInt(e.target.value), max - 5);
              onChange({ min: newMin, max });
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <input
            type="range"
            min={0}
            max={100}
            value={max}
            onChange={(e) => {
              const newMax = Math.max(parseInt(e.target.value), min + 5);
              onChange({ min, max: newMax });
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg"
            style={{ left: `calc(${minPercent}% - 12px)` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg"
            style={{ left: `calc(${maxPercent}% - 12px)` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Custom Range Sliders</h1>
        
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
          <Slider 
            value={value1} 
            onChange={setValue1} 
            color="bg-gradient-to-r from-cyan-500 to-blue-500"
            label="Volume"
          />
          
          <Slider 
            value={value2} 
            onChange={setValue2} 
            color="bg-gradient-to-r from-green-500 to-emerald-500"
            label="Brightness"
          />
          
          <Slider 
            value={value3} 
            onChange={setValue3} 
            color="bg-gradient-to-r from-orange-500 to-red-500"
            label="Temperature"
          />
          
          <RangeSlider
            min={minMax.min}
            max={minMax.max}
            onChange={setMinMax}
            label="Price Range"
          />
          
          {/* Preview */}
          <div className="mt-8 p-4 bg-white/10 rounded-xl">
            <h3 className="text-white font-bold mb-3">Current Values</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Volume:</span>
                <span className="text-white">{value1}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Brightness:</span>
                <span className="text-white">{value2}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Temperature:</span>
                <span className="text-white">{value3}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Price:</span>
                <span className="text-white">${minMax.min} - ${minMax.max}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
