import { useState } from 'react';
import { Link } from 'react-router-dom';

const emojiData = {
  recent: [],
  smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥'],
  gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🙈', '🙉', '🙊', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🌽', '🌶️', '🫑', '🥒', '🥕', '🧄', '🧅', '🥔', '🍠', '🍕', '🍔', '🍟', '🌭', '🍿', '🧂'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '✈️', '🛫', '🛬', '🛩️', '💺', '🚀', '🛸', '🚁', '🛶', '⛵', '🚤', '🛥️', '🛳️', '⛴️', '🚢'],
  objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '✨', '⭐', '🌟', '💫', '⚡', '🔥', '💥', '❄️', '🌈', '☀️'],
};

const EmojiKeyboard = () => {
  const [activeTab, setActiveTab] = useState('smileys');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState('');
  const [recentEmojis, setRecentEmojis] = useState(() => {
    const saved = localStorage.getItem('recentEmojis2');
    return saved ? JSON.parse(saved) : [];
  });
  const [textArea, setTextArea] = useState('');

  const tabs = [
    { id: 'recent', icon: '🕐' },
    { id: 'smileys', icon: '😀' },
    { id: 'gestures', icon: '👋' },
    { id: 'animals', icon: '🐶' },
    { id: 'food', icon: '🍕' },
    { id: 'activities', icon: '⚽' },
    { id: 'travel', icon: '🚗' },
    { id: 'objects', icon: '💻' },
    { id: 'symbols', icon: '❤️' },
  ];

  const addEmoji = (emoji) => {
    setTextArea(prev => prev + emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(''), 1000);

    const updated = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 30);
    setRecentEmojis(updated);
    localStorage.setItem('recentEmojis2', JSON.stringify(updated));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(textArea);
    alert('Copied!');
  };

  const currentEmojis = activeTab === 'recent' ? recentEmojis : emojiData[activeTab] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-800 via-amber-900 to-orange-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">⌨️ Emoji Keyboard</h1>

        {/* Text Area */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="Click emojis to add them here..."
            rows="3"
            className="w-full bg-transparent text-white text-lg resize-none focus:outline-none"
          />
          <div className="flex justify-between mt-2">
            <button onClick={() => setTextArea('')} className="text-white/40 text-sm">Clear</button>
            <button onClick={copyAll} className="px-4 py-1 bg-amber-500 text-white rounded-lg text-sm">📋 Copy</button>
          </div>
        </div>

        {copied && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-lg z-50">
            {copied} added!
          </div>
        )}

        {/* Keyboard */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex overflow-x-auto bg-white/10 p-2 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2 rounded-lg text-xl flex-shrink-0 ${activeTab === tab.id ? 'bg-amber-500' : ''}`}
              >
                {tab.icon}
              </button>
            ))}
          </div>

          {/* Emoji Grid */}
          <div className="p-4 h-64 overflow-y-auto">
            {currentEmojis.length > 0 ? (
              <div className="grid grid-cols-8 gap-1">
                {currentEmojis.map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl p-2 hover:bg-white/20 rounded-lg transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/40 py-8">No recent emojis</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiKeyboard;
