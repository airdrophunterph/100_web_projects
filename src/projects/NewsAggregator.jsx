import { useState } from 'react';
import { Link } from 'react-router-dom';

const newsData = [
  { id: 1, title: 'Tech Giants Report Record Earnings', category: 'Technology', source: 'Tech Daily', time: '2h ago', image: '💻' },
  { id: 2, title: 'New Climate Agreement Reached', category: 'World', source: 'Global News', time: '3h ago', image: '🌍' },
  { id: 3, title: 'Stock Markets Hit All-Time High', category: 'Business', source: 'Finance Today', time: '4h ago', image: '📈' },
  { id: 4, title: 'AI Breakthrough in Medical Research', category: 'Science', source: 'Science Weekly', time: '5h ago', image: '🔬' },
  { id: 5, title: 'Championship Finals This Weekend', category: 'Sports', source: 'Sports Net', time: '6h ago', image: '🏆' },
  { id: 6, title: 'New Smartphone Launch Announced', category: 'Technology', source: 'Tech Daily', time: '7h ago', image: '📱' },
  { id: 7, title: 'Space Mission Success', category: 'Science', source: 'Space News', time: '8h ago', image: '🚀' },
  { id: 8, title: 'Health Tips for Winter', category: 'Health', source: 'Health Mag', time: '9h ago', image: '🏥' },
];

const categories = ['All', 'Technology', 'World', 'Business', 'Science', 'Sports', 'Health'];

const NewsAggregator = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = newsData.filter(news => {
    const matchesCategory = activeCategory === 'All' || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSave = (id) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getRecommended = () => {
    // Simple "AI" recommendation based on saved articles
    if (savedArticles.length === 0) return newsData.slice(0, 3);
    const savedCategories = newsData.filter(n => savedArticles.includes(n.id)).map(n => n.category);
    return newsData.filter(n => savedCategories.includes(n.category) && !savedArticles.includes(n.id)).slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">📰 News Aggregator</h1>
        <p className="text-white/60 text-center mb-8">AI-powered news recommendations</p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 mb-6"
        />

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg ${activeCategory === cat ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recommended Section */}
        {savedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-white font-bold mb-4">🤖 Recommended for You</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {getRecommended().map(news => (
                <div key={news.id} className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-xl p-4">
                  <div className="text-3xl mb-2">{news.image}</div>
                  <h3 className="text-white font-medium text-sm">{news.title}</h3>
                  <div className="text-white/40 text-xs mt-1">{news.source}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Grid */}
        <div className="space-y-4">
          {filteredNews.map(news => (
            <div key={news.id} className="bg-white/10 backdrop-blur rounded-xl p-4 flex gap-4">
              <div className="text-5xl">{news.image}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-purple-500/30 text-purple-300 text-xs rounded">{news.category}</span>
                  <button onClick={() => toggleSave(news.id)} className="text-xl">
                    {savedArticles.includes(news.id) ? '🔖' : '📑'}
                  </button>
                </div>
                <h3 className="text-white font-bold mt-2">{news.title}</h3>
                <div className="flex gap-4 mt-2 text-white/40 text-sm">
                  <span>{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center text-white/40 py-12">No news found</div>
        )}
      </div>
    </div>
  );
};

export default NewsAggregator;
