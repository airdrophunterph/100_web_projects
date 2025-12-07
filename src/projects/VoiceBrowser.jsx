import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VoiceBrowser = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const commands = {
    'open google': { action: 'open', url: 'https://google.com', response: 'Opening Google...' },
    'open youtube': { action: 'open', url: 'https://youtube.com', response: 'Opening YouTube...' },
    'open github': { action: 'open', url: 'https://github.com', response: 'Opening GitHub...' },
    'search for': { action: 'search', response: 'Searching for...' },
    'what time is it': { action: 'time', response: `The current time is ${new Date().toLocaleTimeString()}` },
    'what day is it': { action: 'date', response: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}` },
    'scroll down': { action: 'scroll', direction: 'down', response: 'Scrolling down...' },
    'scroll up': { action: 'scroll', direction: 'up', response: 'Scrolling up...' },
    'go back': { action: 'back', response: 'Going back...' },
    'refresh': { action: 'refresh', response: 'Refreshing page...' },
  };

  const processCommand = (text) => {
    const lower = text.toLowerCase().trim();
    
    for (const [command, details] of Object.entries(commands)) {
      if (lower.includes(command)) {
        setResponse(details.response);
        setHistory(prev => [...prev, { command: text, response: details.response, time: new Date().toLocaleTimeString() }]);
        
        // Execute action
        if (details.action === 'open') {
          window.open(details.url, '_blank');
        } else if (details.action === 'search' && lower.startsWith('search for ')) {
          const query = lower.replace('search for ', '');
          window.open(`https://google.com/search?q=${encodeURIComponent(query)}`, '_blank');
          setResponse(`Searching for "${query}"...`);
        } else if (details.action === 'scroll') {
          window.scrollBy(0, details.direction === 'down' ? 300 : -300);
        } else if (details.action === 'back') {
          window.history.back();
        } else if (details.action === 'refresh') {
          window.location.reload();
        }
        return;
      }
    }
    
    setResponse("Sorry, I didn't understand that command. Try 'open google' or 'what time is it'");
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      setTranscript(result);
      
      if (event.results[current].isFinal) {
        processCommand(result);
      }
    };

    recognition.start();
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
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎙️ Voice Browser</h1>

        {/* Mic Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl transition-all ${
              isListening 
                ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' 
                : 'bg-purple-500 hover:bg-purple-400 shadow-lg shadow-purple-500/50'
            }`}
          >
            🎤
          </button>
        </div>

        <div className="text-center text-white/60 mb-6">
          {isListening ? '🔴 Listening... Say a command!' : 'Click the microphone to start'}
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4 text-center">
            <span className="text-white/40">You said: </span>
            <span className="text-white font-bold">"{transcript}"</span>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="bg-purple-500/30 backdrop-blur rounded-xl p-4 mb-6 text-center">
            <span className="text-purple-200">{response}</span>
          </div>
        )}

        {/* Commands */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6">
          <h3 className="text-white font-bold mb-3">Available Commands:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.keys(commands).map(cmd => (
              <div key={cmd} className="text-white/60">• "{cmd}"</div>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Command History</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {history.slice(-5).reverse().map((h, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-white/60">{h.command}</span>
                  <span className="text-white/40">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceBrowser;
