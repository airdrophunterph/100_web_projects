import { useState } from 'react';
import { Link } from 'react-router-dom';

const VirtualBusinessCard = () => {
  const [card, setCard] = useState({
    name: 'John Developer',
    title: 'Full Stack Developer',
    company: 'Tech Solutions Inc.',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    website: 'johndeveloper.com',
    linkedin: 'linkedin.com/in/johndeveloper',
    github: 'github.com/johndeveloper',
  });
  const [theme, setTheme] = useState('dark');
  const [isEditing, setIsEditing] = useState(false);

  const themes = {
    dark: 'from-gray-800 to-gray-900',
    blue: 'from-blue-600 to-indigo-700',
    green: 'from-emerald-600 to-teal-700',
    purple: 'from-purple-600 to-pink-700',
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
  };

  const shareCard = () => {
    const text = `${card.name}\n${card.title} at ${card.company}\n📧 ${card.email}\n📱 ${card.phone}\n🌐 ${card.website}`;
    if (navigator.share) {
      navigator.share({ title: card.name, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Card details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💼 Business Card</h1>

        {/* Theme Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.keys(themes).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${themes[t]} ${theme === t ? 'ring-2 ring-white' : ''}`}
            />
          ))}
        </div>

        {/* Card Preview */}
        <div className={`bg-gradient-to-br ${themes[theme]} rounded-3xl p-8 shadow-2xl mb-6`}>
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              👤
            </div>
            <h2 className="text-2xl font-bold text-white">{card.name}</h2>
            <p className="text-white/80">{card.title}</p>
            <p className="text-white/60 text-sm">{card.company}</p>
          </div>

          <div className="space-y-3">
            <a href={`mailto:${card.email}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span>📧</span> {card.email}
            </a>
            <a href={`tel:${card.phone}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span>📱</span> {card.phone}
            </a>
            <a href={`https://${card.website}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span>🌐</span> {card.website}
            </a>
            <a href={`https://${card.linkedin}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span>💼</span> {card.linkedin}
            </a>
            <a href={`https://${card.github}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <span>💻</span> {card.github}
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={shareCard}
            className="flex-1 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30"
          >
            📤 Share
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30"
          >
            ✏️ {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Editor */}
        {isEditing && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-3">
            {Object.entries(card).map(([key, value]) => (
              <div key={key}>
                <label className="block text-white/60 text-sm capitalize mb-1">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setCard({ ...card, [key]: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualBusinessCard;
