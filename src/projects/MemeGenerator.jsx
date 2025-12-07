import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const templates = [
  { id: 1, name: 'Drake', emoji: '🎤', topPos: 'top-4', bottomPos: 'bottom-4' },
  { id: 2, name: 'Distracted BF', emoji: '👀', topPos: 'top-4', bottomPos: 'bottom-4' },
  { id: 3, name: 'Two Buttons', emoji: '🔘', topPos: 'top-4', bottomPos: 'bottom-4' },
  { id: 4, name: 'Change My Mind', emoji: '💭', topPos: 'top-4', bottomPos: 'bottom-4' },
  { id: 5, name: 'Expanding Brain', emoji: '🧠', topPos: 'top-4', bottomPos: 'bottom-4' },
  { id: 6, name: 'This Is Fine', emoji: '🔥', topPos: 'top-4', bottomPos: 'bottom-4' },
];

const MemeGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [topText, setTopText] = useState('When you code works');
  const [bottomText, setBottomText] = useState('But you don\'t know why');
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState('#ffffff');
  const memeRef = useRef(null);

  const downloadMeme = () => {
    alert('In a production app, this would use html2canvas to download the meme as an image.');
  };

  const randomMeme = () => {
    const jokes = [
      { top: 'Me debugging', bottom: 'Console.log everywhere' },
      { top: 'Works on my machine', bottom: 'Ship it!' },
      { top: 'Comments in code', bottom: 'Future me will understand' },
      { top: 'Just one more feature', bottom: '3 hours later...' },
      { top: 'Tests passing', bottom: 'In production: chaos' },
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    setTopText(joke.top);
    setBottomText(joke.bottom);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-yellow-900 to-amber-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">😂 Meme Generator</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview */}
          <div>
            <div
              ref={memeRef}
              className="relative bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl aspect-square flex items-center justify-center overflow-hidden"
            >
              <div className="text-9xl">{selectedTemplate.emoji}</div>
              
              <div
                className={`absolute ${selectedTemplate.topPos} left-0 right-0 text-center px-4`}
                style={{ 
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
                }}
              >
                {topText.toUpperCase()}
              </div>
              
              <div
                className={`absolute ${selectedTemplate.bottomPos} left-0 right-0 text-center px-4`}
                style={{ 
                  fontSize: `${fontSize}px`,
                  color: textColor,
                  textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000'
                }}
              >
                {bottomText.toUpperCase()}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button onClick={randomMeme} className="flex-1 py-3 bg-white/20 text-white rounded-lg">
                🎲 Random
              </button>
              <button onClick={downloadMeme} className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-bold">
                ⬇️ Download
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Customize</h2>

            {/* Templates */}
            <div className="mb-4">
              <label className="text-white/60 text-sm block mb-2">Template</label>
              <div className="grid grid-cols-6 gap-2">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`p-3 rounded-lg text-2xl ${selectedTemplate.id === t.id ? 'bg-orange-500' : 'bg-white/10'}`}
                  >
                    {t.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Text */}
            <div className="mb-4">
              <label className="text-white/60 text-sm block mb-2">Top Text</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>

            {/* Bottom Text */}
            <div className="mb-4">
              <label className="text-white/60 text-sm block mb-2">Bottom Text</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="text-white/60 text-sm block mb-2">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="16"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Text Color */}
            <div className="mb-4">
              <label className="text-white/60 text-sm block mb-2">Text Color</label>
              <div className="flex gap-2">
                {['#ffffff', '#ffff00', '#ff0000', '#00ff00', '#00ffff'].map(c => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    className={`w-8 h-8 rounded ${textColor === c ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
