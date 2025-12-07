import { useState } from 'react';
import { Link } from 'react-router-dom';

const suggestions = {
  hot: { temp: '> 30°C', clothes: ['🩳 Shorts', '👕 T-shirt', '🩴 Sandals', '🧢 Cap', '🕶️ Sunglasses'], tip: 'Stay hydrated and wear sunscreen!' },
  warm: { temp: '20-30°C', clothes: ['👖 Light pants', '👕 T-shirt', '👟 Sneakers', '🧢 Optional hat'], tip: 'Perfect weather for outdoor activities!' },
  mild: { temp: '10-20°C', clothes: ['👖 Jeans', '👔 Long sleeve shirt', '🧥 Light jacket', '👟 Sneakers'], tip: 'Layer up for temperature changes.' },
  cold: { temp: '0-10°C', clothes: ['👖 Warm pants', '🧥 Coat', '🧣 Scarf', '🧤 Gloves', '👢 Boots'], tip: 'Keep your extremities warm!' },
  freezing: { temp: '< 0°C', clothes: ['🧥 Heavy coat', '🧣 Scarf', '🧤 Insulated gloves', '🎿 Thermal wear', '👢 Winter boots', '🧶 Beanie'], tip: 'Dress in layers and limit time outside!' },
};

const weatherTypes = {
  sunny: { emoji: '☀️', extra: ['🕶️ Sunglasses', '🧴 Sunscreen'] },
  rainy: { emoji: '🌧️', extra: ['☂️ Umbrella', '🧥 Raincoat', '👢 Waterproof boots'] },
  snowy: { emoji: '❄️', extra: ['🧤 Warm gloves', '🧣 Thick scarf', '👢 Snow boots'] },
  windy: { emoji: '💨', extra: ['🧥 Windbreaker', '🧣 Scarf'] },
  cloudy: { emoji: '☁️', extra: [] },
};

const ClothingSuggester = () => {
  const [temperature, setTemperature] = useState(20);
  const [weather, setWeather] = useState('sunny');
  const [suggestion, setSuggestion] = useState(null);

  const getSuggestion = () => {
    let tempCategory;
    if (temperature > 30) tempCategory = 'hot';
    else if (temperature > 20) tempCategory = 'warm';
    else if (temperature > 10) tempCategory = 'mild';
    else if (temperature > 0) tempCategory = 'cold';
    else tempCategory = 'freezing';

    const base = suggestions[tempCategory];
    const weatherExtra = weatherTypes[weather].extra;

    setSuggestion({
      ...base,
      weather: weatherTypes[weather].emoji,
      extraClothes: weatherExtra,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">👔 Clothing Suggester</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          {/* Temperature */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Temperature: {temperature}°C</label>
            <input
              type="range"
              min="-20"
              max="45"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-white/40 text-sm mt-1">
              <span>-20°C</span>
              <span>45°C</span>
            </div>
          </div>

          {/* Weather */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Weather Condition</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(weatherTypes).map(([key, { emoji }]) => (
                <button
                  key={key}
                  onClick={() => setWeather(key)}
                  className={`px-4 py-2 rounded-lg transition ${
                    weather === key ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {emoji} {key}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={getSuggestion}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-bold rounded-lg"
          >
            Get Suggestions
          </button>
        </div>

        {suggestion && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{suggestion.weather}</div>
              <div className="text-white/60">{suggestion.temp}</div>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-bold mb-2">Recommended Clothing:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestion.clothes.map((item, i) => (
                  <span key={i} className="px-3 py-1 bg-white/20 text-white rounded-lg">{item}</span>
                ))}
              </div>
            </div>

            {suggestion.extraClothes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-white font-bold mb-2">Weather Extras:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestion.extraClothes.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/30 text-blue-300 rounded-lg">{item}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <span className="text-yellow-300">💡 {suggestion.tip}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingSuggester;
