import { useState } from 'react';
import { Link } from 'react-router-dom';

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('bar');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [65, 59, 80, 81, 56, 95],
    secondary: [28, 48, 40, 19, 86, 27]
  };

  const maxValue = Math.max(...data.values, ...data.secondary);

  const pieData = [
    { label: 'Product A', value: 35, color: 'bg-blue-500' },
    { label: 'Product B', value: 25, color: 'bg-green-500' },
    { label: 'Product C', value: 20, color: 'bg-yellow-500' },
    { label: 'Product D', value: 15, color: 'bg-purple-500' },
    { label: 'Other', value: 5, color: 'bg-gray-500' },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', up: true },
    { label: 'Active Users', value: '8,420', change: '+5.2%', up: true },
    { label: 'Conversion Rate', value: '3.2%', change: '-0.8%', up: false },
    { label: 'Avg. Order Value', value: '$85.40', change: '+2.1%', up: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📊 Data Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-white/60 text-sm">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className={`text-sm ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Chart Type Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {['bar', 'line', 'pie'].map(type => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeChart === type ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              {type} Chart
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Main Chart */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6">Monthly Performance</h3>
            
            {activeChart === 'bar' && (
              <div className="flex items-end justify-between h-64 gap-4">
                {data.labels.map((label, i) => (
                  <div key={label} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end h-48">
                      <div
                        className="flex-1 bg-blue-500 rounded-t transition-all"
                        style={{ height: `${(data.values[i] / maxValue) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-green-500 rounded-t transition-all"
                        style={{ height: `${(data.secondary[i] / maxValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            )}

            {activeChart === 'line' && (
              <div className="h-64 relative">
                <svg viewBox="0 0 300 200" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 50, 100, 150, 200].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.1)" />
                  ))}
                  {/* Line 1 */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    points={data.values.map((v, i) => `${i * 50 + 25},${200 - (v / maxValue) * 180}`).join(' ')}
                  />
                  {/* Line 2 */}
                  <polyline
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    points={data.secondary.map((v, i) => `${i * 50 + 25},${200 - (v / maxValue) * 180}`).join(' ')}
                  />
                  {/* Points */}
                  {data.values.map((v, i) => (
                    <circle key={i} cx={i * 50 + 25} cy={200 - (v / maxValue) * 180} r="5" fill="#3b82f6" />
                  ))}
                </svg>
              </div>
            )}

            {activeChart === 'pie' && (
              <div className="flex items-center justify-center gap-8">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {pieData.reduce((acc, item, i) => {
                      const offset = acc.offset;
                      acc.elements.push(
                        <circle
                          key={i}
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke={['#3b82f6', '#22c55e', '#eab308', '#a855f7', '#6b7280'][i]}
                          strokeWidth="20"
                          strokeDasharray={`${item.value * 2.51} 251`}
                          strokeDashoffset={-offset * 2.51}
                        />
                      );
                      acc.offset += item.value;
                      return acc;
                    }, { elements: [], offset: 0 }).elements}
                  </svg>
                </div>
                <div className="space-y-2">
                  {pieData.map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded ${item.color}`} />
                      <span className="text-white/80 text-sm">{item.label}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded" />
                <span className="text-white/60 text-sm">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded" />
                <span className="text-white/60 text-sm">Sales</span>
              </div>
            </div>
          </div>

          {/* Side Stats */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Top Products</h3>
              {pieData.slice(0, 4).map((item, i) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40">{i + 1}</span>
                    <span className="text-white">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="text-white/60 text-sm w-12 text-right">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-blue-400">436</div>
                  <div className="text-white/60 text-sm">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-3xl font-bold text-green-400">89%</div>
                  <div className="text-white/60 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
