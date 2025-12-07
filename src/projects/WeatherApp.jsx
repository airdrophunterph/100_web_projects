import { useState } from 'react';
import { Link } from 'react-router-dom';

// Local weather data simulation
const weatherData = {
  'New York': { temp: 18, condition: 'Cloudy', humidity: 65, wind: 12, icon: '☁️' },
  'London': { temp: 12, condition: 'Rainy', humidity: 80, wind: 18, icon: '🌧️' },
  'Tokyo': { temp: 22, condition: 'Sunny', humidity: 55, wind: 8, icon: '☀️' },
  'Paris': { temp: 15, condition: 'Partly Cloudy', humidity: 70, wind: 10, icon: '⛅' },
  'Sydney': { temp: 28, condition: 'Sunny', humidity: 45, wind: 15, icon: '☀️' },
  'Dubai': { temp: 35, condition: 'Hot', humidity: 30, wind: 20, icon: '🔥' },
  'Moscow': { temp: -5, condition: 'Snowy', humidity: 85, wind: 25, icon: '❄️' },
  'Singapore': { temp: 30, condition: 'Humid', humidity: 90, wind: 5, icon: '🌤️' },
};

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  const searchWeather = () => {
    const found = Object.keys(weatherData).find(
      c => c.toLowerCase() === city.toLowerCase()
    );
    if (found) {
      setWeather({ city: found, ...weatherData[found] });
      setError('');
    } else {
      setWeather(null);
      setError('City not found. Try: New York, London, Tokyo, Paris, Sydney, Dubai, Moscow, Singapore');
    }
  };

  const addFavorite = () => {
    if (weather && !favorites.includes(weather.city)) {
      const updated = [...favorites, weather.city];
      setFavorites(updated);
      localStorage.setItem('weatherFavorites', JSON.stringify(updated));
    }
  };

  const loadFavorite = (cityName) => {
    setCity(cityName);
    setWeather({ city: cityName, ...weatherData[cityName] });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🌤️ Weather App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
          />
          <button
            onClick={searchWeather}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
          >
            🔍
          </button>
        </div>

        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        {weather && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center mb-6">
            <div className="text-6xl mb-4">{weather.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-1">{weather.city}</h2>
            <div className="text-5xl font-bold text-white mb-2">{weather.temp}°C</div>
            <div className="text-white/60 mb-6">{weather.condition}</div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white/60 text-sm">Humidity</div>
                <div className="text-white font-bold">{weather.humidity}%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-white/60 text-sm">Wind</div>
                <div className="text-white font-bold">{weather.wind} km/h</div>
              </div>
            </div>

            <button
              onClick={addFavorite}
              disabled={favorites.includes(weather.city)}
              className="mt-4 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg disabled:opacity-50"
            >
              {favorites.includes(weather.city) ? '⭐ Saved' : '☆ Add to Favorites'}
            </button>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">⭐ Favorites</h3>
            <div className="flex flex-wrap gap-2">
              {favorites.map((f) => (
                <button
                  key={f}
                  onClick={() => loadFavorite(f)}
                  className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30"
                >
                  {weatherData[f]?.icon} {f}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
