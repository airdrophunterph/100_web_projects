import { useState } from 'react';
import { Link } from 'react-router-dom';

const conversions = {
  length: {
    units: ['meters', 'feet', 'inches', 'kilometers', 'miles', 'centimeters'],
    toBase: { meters: 1, feet: 0.3048, inches: 0.0254, kilometers: 1000, miles: 1609.34, centimeters: 0.01 }
  },
  weight: {
    units: ['kilograms', 'pounds', 'ounces', 'grams', 'tons'],
    toBase: { kilograms: 1, pounds: 0.453592, ounces: 0.0283495, grams: 0.001, tons: 1000 }
  },
  temperature: {
    units: ['celsius', 'fahrenheit', 'kelvin'],
    convert: (value, from, to) => {
      let celsius;
      if (from === 'celsius') celsius = value;
      else if (from === 'fahrenheit') celsius = (value - 32) * 5/9;
      else celsius = value - 273.15;
      
      if (to === 'celsius') return celsius;
      if (to === 'fahrenheit') return celsius * 9/5 + 32;
      return celsius + 273.15;
    }
  },
  volume: {
    units: ['liters', 'gallons', 'milliliters', 'cups', 'pints'],
    toBase: { liters: 1, gallons: 3.78541, milliliters: 0.001, cups: 0.236588, pints: 0.473176 }
  }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const convert = () => {
    if (!value) return;
    const numValue = parseFloat(value);
    const cat = conversions[category];

    if (category === 'temperature') {
      const converted = cat.convert(numValue, fromUnit, toUnit);
      setResult(converted.toFixed(2));
    } else {
      const baseValue = numValue * cat.toBase[fromUnit];
      const converted = baseValue / cat.toBase[toUnit];
      setResult(converted.toFixed(4));
    }
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setFromUnit(conversions[newCat].units[0]);
    setToUnit(conversions[newCat].units[1]);
    setResult('');
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📐 Unit Converter</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(conversions).map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  category === cat ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* From */}
          <div className="mb-4">
            <label className="block text-white/60 text-sm mb-2">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 capitalize"
              >
                {conversions[category].units.map(u => (
                  <option key={u} value={u} className="bg-gray-800">{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button onClick={swapUnits} className="p-2 bg-white/20 rounded-full hover:bg-white/30">
              ⇅
            </button>
          </div>

          {/* To */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">To</label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white text-xl font-bold">
                {result || '—'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 capitalize"
              >
                {conversions[category].units.map(u => (
                  <option key={u} value={u} className="bg-gray-800">{u}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg"
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
