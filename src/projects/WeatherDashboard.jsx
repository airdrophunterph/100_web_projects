import { useState } from 'react';
import { Link } from 'react-router-dom';

const weatherData = {
  current: { temp: 22, condition: 'Partly Cloudy', humidity: 65, wind: 12, uv: 6, feelsLike: 24 },
  hourly: [
    { time: '12:00', temp: 22, icon: '⛅' },
    { time: '13:00', temp: 24, icon: '☀️' },
    { time: '14:00', temp: 25, icon: '☀️' },
    { time: '15:00', temp: 24, icon: '⛅' },
    { time: '16:00', temp: 23, icon: '🌤️' },
    { time: '17:00', temp: 21, icon: '🌤️' },
    { time: '18:00', temp: 19, icon: '🌙' },
  ],
  daily: [
    { day: 'Mon', high: 25, low: 18, icon: '☀️' },
    { day: 'Tue', high: 23, low: 17, icon: '⛅' },
    { day: 'Wed', high: 20, low: 15, icon: '🌧️' },
    { day: 'Thu', high: 22, low: 16, icon: '⛅' },
    { day: 'Fri', high: 26, low: 19, icon: '☀️' },
    { day: 'Sat', high: 28, low: 20, icon: '☀️' },
    { day: 'Sun', high: 27, low: 19, icon: '🌤️' },
  ]
};

const WeatherDashboard = () => {
  const [city, setCity] = useState('New York');
  const [unit, setUnit] = useState('C');

  const toFahrenheit = (c) => Math.round(c * 9/5 + 32);
  const displayTemp = (temp) => unit === 'C' ? temp : toFahrenheit(temp);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{city}</h1>
            <p className="text-white/60">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded-lg ${unit === 'C' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded-lg ${unit === 'F' ? 'bg-white text-blue-600' : 'bg-white/20 text-white'}`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-8xl font-thin text-white">{displayTemp(weatherData.current.temp)}°</div>
              <div className="text-xl text-white/80">{weatherData.current.condition}</div>
            </div>
            <div className="text-9xl animate-pulse">⛅</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Feels Like', value: `${displayTemp(weatherData.current.feelsLike)}°`, icon: '🌡️' },
              { label: 'Humidity', value: `${weatherData.current.humidity}%`, icon: '💧' },
              { label: 'Wind', value: `${weatherData.current.wind} km/h`, icon: '💨' },
              { label: 'UV Index', value: weatherData.current.uv, icon: '☀️' },
            ].map(item => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-white font-bold">{item.value}</div>
                <div className="text-white/60 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">Hourly Forecast</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {weatherData.hourly.map((hour, i) => (
              <div key={i} className="flex-shrink-0 text-center bg-white/10 rounded-xl p-4 min-w-[80px]">
                <div className="text-white/60 text-sm">{hour.time}</div>
                <div className="text-3xl my-2">{hour.icon}</div>
                <div className="text-white font-bold">{displayTemp(hour.temp)}°</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">7-Day Forecast</h3>
          <div className="space-y-3">
            {weatherData.daily.map((day, i) => (
              <div key={i} className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                <div className="text-white font-medium w-16">{day.day}</div>
                <div className="text-3xl">{day.icon}</div>
                <div className="flex gap-4">
                  <span className="text-white font-bold">{displayTemp(day.high)}°</span>
                  <span className="text-white/40">{displayTemp(day.low)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
