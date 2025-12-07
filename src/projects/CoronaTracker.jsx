import { useState } from 'react';
import { Link } from 'react-router-dom';

// Static COVID data (since APIs are deprecated)
const covidData = {
  global: { cases: 704753890, deaths: 7010681, recovered: 675619811 },
  countries: [
    { country: 'USA', cases: 103436829, deaths: 1127152, recovered: 101123456 },
    { country: 'India', cases: 44690738, deaths: 530779, recovered: 44154623 },
    { country: 'France', cases: 38997490, deaths: 167642, recovered: 38500000 },
    { country: 'Germany', cases: 38437756, deaths: 174979, recovered: 38000000 },
    { country: 'Brazil', cases: 37519960, deaths: 702116, recovered: 36500000 },
    { country: 'Japan', cases: 33803572, deaths: 74694, recovered: 33500000 },
    { country: 'South Korea', cases: 31564560, deaths: 34758, recovered: 31400000 },
    { country: 'Italy', cases: 25603510, deaths: 188322, recovered: 25300000 },
    { country: 'UK', cases: 24658705, deaths: 227492, recovered: 24200000 },
    { country: 'Russia', cases: 22075858, deaths: 399854, recovered: 21500000 },
  ]
};

const CoronaTracker = () => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const filteredCountries = covidData.countries.filter(c => 
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  const StatCard = ({ label, value, color }) => (
    <div className={`bg-white/10 backdrop-blur rounded-xl p-4 text-center`}>
      <div className={`text-2xl md:text-3xl font-bold ${color}`}>{formatNumber(value)}</div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-2">🦠 COVID-19 Tracker</h1>
        <p className="text-white/60 text-center mb-8">Historical data (APIs deprecated)</p>
        
        {/* Global Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Cases" value={covidData.global.cases} color="text-yellow-400" />
          <StatCard label="Deaths" value={covidData.global.deaths} color="text-red-400" />
          <StatCard label="Recovered" value={covidData.global.recovered} color="text-green-400" />
        </div>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 mb-6"
        />
        
        {/* Country Detail Modal */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCountry(null)}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-white mb-4">{selectedCountry.country}</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Total Cases</span>
                  <span className="text-yellow-400 font-bold">{formatNumber(selectedCountry.cases)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Deaths</span>
                  <span className="text-red-400 font-bold">{formatNumber(selectedCountry.deaths)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Recovered</span>
                  <span className="text-green-400 font-bold">{formatNumber(selectedCountry.recovered)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Fatality Rate</span>
                  <span className="text-white font-bold">
                    {((selectedCountry.deaths / selectedCountry.cases) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                className="w-full mt-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Countries List */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-2 p-3 bg-white/10 text-white/60 text-sm font-medium">
            <div>Country</div>
            <div className="text-right">Cases</div>
            <div className="text-right">Deaths</div>
            <div className="text-right">Recovered</div>
          </div>
          <div className="divide-y divide-white/10">
            {filteredCountries.map((country, i) => (
              <div
                key={i}
                onClick={() => setSelectedCountry(country)}
                className="grid grid-cols-4 gap-2 p-3 hover:bg-white/10 cursor-pointer"
              >
                <div className="text-white font-medium">{country.country}</div>
                <div className="text-right text-yellow-400">{formatNumber(country.cases)}</div>
                <div className="text-right text-red-400">{formatNumber(country.deaths)}</div>
                <div className="text-right text-green-400">{formatNumber(country.recovered)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoronaTracker;
