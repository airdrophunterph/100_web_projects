import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const responses = {
  greeting: ["Hello! How can I help you today? 👋", "Hi there! What's on your mind?", "Hey! I'm here to assist you."],
  weather: ["I'd check the weather for you, but I'm just a demo bot! ☀️", "Looks like a great day! (I'm guessing 😄)"],
  name: ["I'm ChatBot, your friendly AI assistant!", "You can call me ChatBot! Nice to meet you."],
  help: ["I can chat with you, answer simple questions, and keep you company!", "Just type anything and I'll do my best to respond!"],
  joke: ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛", "Why did the developer go broke? Because he used up all his cache! 💰"],
  time: [`The current time is ${new Date().toLocaleTimeString()}`, `It's ${new Date().toLocaleTimeString()} right now!`],
  bye: ["Goodbye! Have a great day! 👋", "See you later! Take care!", "Bye! Come back anytime!"],
  default: ["That's interesting! Tell me more.", "I see! What else is on your mind?", "Hmm, I'm not sure about that. Can you try rephrasing?", "Interesting! I'm still learning about that."]
};

const getResponse = (input) => {
  const lower = input.toLowerCase();
  if (lower.match(/\b(hi|hello|hey|greetings)\b/)) return responses.greeting;
  if (lower.match(/\b(weather|temperature|forecast)\b/)) return responses.weather;
  if (lower.match(/\b(your name|who are you|what are you)\b/)) return responses.name;
  if (lower.match(/\b(help|what can you do)\b/)) return responses.help;
  if (lower.match(/\b(joke|funny|laugh)\b/)) return responses.joke;
  if (lower.match(/\b(time|clock)\b/)) return responses.time;
  if (lower.match(/\b(bye|goodbye|see you|later)\b/)) return responses.bye;
  return responses.default;
};

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today? 🤖", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const possibleResponses = getResponse(input);
      const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
      setMessages(prev => [...prev, { id: Date.now(), text: response, isBot: true }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const clearChat = () => {
    setMessages([{ id: 1, text: "Chat cleared! How can I help you? 🤖", isBot: true }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">🤖 AI Chatbot</h1>
          <button onClick={clearChat} className="text-white/60 hover:text-white">Clear</button>
        </div>

        {/* Chat Container */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages.map(msg => (
              <div key={msg.id} className={`mb-4 ${msg.isBot ? '' : 'text-right'}`}>
                <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                  msg.isBot 
                    ? 'bg-white/20 rounded-tl-none' 
                    : 'bg-cyan-500 rounded-tr-none'
                }`}>
                  <div className="text-white">{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4">
                <div className="inline-block bg-white/20 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white border border-white/30"
              />
              <button type="submit" className="px-6 py-3 bg-cyan-500 text-white rounded-full font-bold">
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {['Tell me a joke', 'What time is it?', 'What can you do?'].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="px-3 py-1 bg-white/10 text-white/60 rounded-full text-sm hover:bg-white/20"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
