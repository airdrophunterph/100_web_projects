import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ChatApp = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [
      { id: 1, user: 'Bot', text: 'Welcome to the chat! 👋', time: '12:00', isBot: true }
    ];
  });
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('chatUsername') || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "That's interesting! Tell me more.",
    "I see what you mean! 🤔",
    "Great point! 👍",
    "Hmm, let me think about that...",
    "Thanks for sharing!",
    "I agree with you on that!",
    "That's a good question!",
  ];

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !username) return;

    const userMessage = {
      id: Date.now(),
      user: username,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        user: 'Bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const setUser = (name) => {
    setUsername(name);
    localStorage.setItem('chatUsername', name);
  };

  const clearChat = () => {
    setMessages([{ id: 1, user: 'Bot', text: 'Chat cleared! Start fresh 🧹', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isBot: true }]);
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-white text-center mb-6">💬 Chat App</h1>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
            onKeyPress={(e) => e.key === 'Enter' && setUser(e.target.value)}
          />
          <button
            onClick={(e) => setUser(e.target.previousSibling.value)}
            className="w-full py-3 bg-teal-500 text-white font-bold rounded-lg"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">💬 Chat</h1>
          <div className="flex items-center gap-2">
            <span className="text-white/60">@{username}</span>
            <button onClick={clearChat} className="text-white/40 hover:text-white">🗑️</button>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 h-[60vh] overflow-y-auto mb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`mb-4 ${msg.isBot ? '' : 'text-right'}`}>
              <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                msg.isBot 
                  ? 'bg-white/20 rounded-tl-none' 
                  : 'bg-teal-500 rounded-tr-none'
              }`}>
                <div className="text-white/60 text-xs mb-1">{msg.user}</div>
                <div className="text-white">{msg.text}</div>
                <div className="text-white/40 text-xs mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="mb-4">
              <div className="inline-block bg-white/20 p-3 rounded-2xl rounded-tl-none">
                <div className="text-white/60">Bot is typing...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white border border-white/30"
          />
          <button type="submit" className="px-6 py-3 bg-teal-500 text-white rounded-full font-bold">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
