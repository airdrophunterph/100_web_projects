import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [savedTexts, setSavedTexts] = useState(() => {
    const saved = localStorage.getItem('speechTexts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
    
    // Store recognition instance for stop
    window.currentRecognition = recognition;
  };

  const stopListening = () => {
    if (window.currentRecognition) {
      window.currentRecognition.stop();
    }
    setIsListening(false);
  };

  const saveText = () => {
    if (!transcript.trim()) return;
    const saved = { id: Date.now(), text: transcript, date: new Date().toLocaleString() };
    const updated = [saved, ...savedTexts];
    setSavedTexts(updated);
    localStorage.setItem('speechTexts', JSON.stringify(updated));
    setTranscript('');
  };

  const copyText = () => {
    navigator.clipboard.writeText(transcript);
    alert('Copied!');
  };

  const deleteText = (id) => {
    const updated = savedTexts.filter(t => t.id !== id);
    setSavedTexts(updated);
    localStorage.setItem('speechTexts', JSON.stringify(updated));
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold mb-2">Not Supported</h1>
          <p className="text-white/60">Your browser doesn't support Speech Recognition.</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 bg-purple-500 rounded-lg">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎤 Speech to Text</h1>

        {/* Mic Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all ${
              isListening 
                ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' 
                : 'bg-purple-500 hover:bg-purple-400 shadow-lg shadow-purple-500/50'
            }`}
          >
            🎤
          </button>
        </div>

        <div className="text-center text-white/60 mb-6">
          {isListening ? '🔴 Listening... Speak now!' : 'Click the microphone to start'}
        </div>

        {/* Transcript */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your speech will appear here..."
            rows="6"
            className="w-full bg-transparent text-white resize-none focus:outline-none"
          />
          
          {transcript && (
            <div className="flex gap-2 mt-4">
              <button onClick={copyText} className="flex-1 py-2 bg-white/20 text-white rounded-lg">📋 Copy</button>
              <button onClick={saveText} className="flex-1 py-2 bg-purple-500 text-white rounded-lg">💾 Save</button>
              <button onClick={() => setTranscript('')} className="py-2 px-4 bg-red-500/20 text-red-300 rounded-lg">Clear</button>
            </div>
          )}
        </div>

        {/* Saved Texts */}
        {savedTexts.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Saved Transcripts</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedTexts.map(item => (
                <div key={item.id} className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm line-clamp-2">{item.text}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/40 text-xs">{item.date}</span>
                    <button onClick={() => deleteText(item.id)} className="text-red-400 text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
