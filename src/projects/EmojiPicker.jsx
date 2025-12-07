import { useState } from 'react';
import { Link } from 'react-router-dom';

const emojiCategories = {
  'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐'],
  'Gestures': ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋'],
  'Food': ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🥦', '🥬', '🌽', '🌶️', '🫑', '🥒', '🥕', '🧄', '🧅', '🥔', '🍠', '🍕'],
  'Travel': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '✈️', '🚀', '🛸', '🚁', '⛵', '🚤', '🛳️', '🚂', '🚆', '🚇', '🏠', '🏢', '🏣', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '⛪'],
  'Objects': ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '💾', '💿', '📷', '📹', '🎥', '📞', '☎️', '📺', '📻', '🎙️', '⏰', '🔋', '🔌', '💡', '🔦', '🕯️', '💰', '💳', '💎', '⚖️', '🔧', '🔨', '⚙️'],
  'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '✨', '⭐', '🌟', '💫', '⚡', '🔥', '💥', '❄️', '🌈', '☀️', '🌙', '⭕'],
};

const EmojiPicker = () => {
  const [activeCategory, setActiveCategory] = useState('Smileys');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState('');
  const [recent, setRecent] = useState(() => {
    const saved = localStorage.getItem('recentEmojis');
    return saved ? JSON.parse(saved) : [];
  });

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(''), 1500);

    // Add to recent
    const updated = [emoji, ...recent.filter(e => e !== emoji)].slice(0, 20);
    setRecent(updated);
    localStorage.setItem('recentEmojis', JSON.stringify(updated));
  };

  const allEmojis = Object.values(emojiCategories).flat();
  const filteredEmojis = searchTerm 
    ? allEmojis 
    : emojiCategories[activeCategory];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">😀 Emoji Picker</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30 mb-4"
        />

        {/* Copied Notification */}
        {copied && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg z-50 animate-bounce">
            {copied} Copied!
          </div>
        )}

        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          {/* Category Tabs */}
          {!searchTerm && (
            <div className="flex overflow-x-auto p-2 gap-1 border-b border-white/10">
              {Object.keys(emojiCategories).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm ${
                    activeCategory === cat ? 'bg-amber-500 text-white' : 'text-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Emoji Grid */}
          <div className="p-4 grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
            {filteredEmojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => copyEmoji(emoji)}
                className="text-2xl p-2 hover:bg-white/20 rounded-lg transition"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Recent */}
          {recent.length > 0 && !searchTerm && (
            <div className="p-4 border-t border-white/10">
              <div className="text-white/60 text-sm mb-2">Recent</div>
              <div className="flex flex-wrap gap-1">
                {recent.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => copyEmoji(emoji)}
                    className="text-2xl p-2 hover:bg-white/20 rounded-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-white/40 text-center text-sm mt-4">
          Click an emoji to copy to clipboard
        </p>
      </div>
    </div>
  );
};

export default EmojiPicker;
