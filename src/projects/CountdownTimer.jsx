import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [savedEvents, setSavedEvents] = useState(() => {
    const saved = localStorage.getItem('countdownEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!targetDate) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds, expired: false });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);

  const saveEvent = () => {
    if (!eventName || !targetDate) return;
    
    const event = { id: Date.now(), name: eventName, date: targetDate };
    const updated = [...savedEvents, event];
    setSavedEvents(updated);
    localStorage.setItem('countdownEvents', JSON.stringify(updated));
  };

  const loadEvent = (event) => {
    setEventName(event.name);
    setTargetDate(event.date);
  };

  const deleteEvent = (id) => {
    const updated = savedEvents.filter(e => e.id !== id);
    setSavedEvents(updated);
    localStorage.setItem('countdownEvents', JSON.stringify(updated));
  };

  const TimeBlock = ({ value, label }) => (
    <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
      <div className="text-4xl md:text-5xl font-bold text-white">{String(value).padStart(2, '0')}</div>
      <div className="text-white/60 text-sm mt-1">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Countdown Timer</h1>
        
        {/* Input */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
          />
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
          />
          <button
            onClick={saveEvent}
            disabled={!eventName || !targetDate}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            Save Event
          </button>
        </div>
        
        {/* Countdown Display */}
        {countdown && (
          <div className="mb-6">
            {eventName && (
              <h2 className="text-xl text-white text-center mb-4">{eventName}</h2>
            )}
            
            {countdown.expired ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl text-white font-bold">Event Started!</div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                <TimeBlock value={countdown.days} label="Days" />
                <TimeBlock value={countdown.hours} label="Hours" />
                <TimeBlock value={countdown.minutes} label="Minutes" />
                <TimeBlock value={countdown.seconds} label="Seconds" />
              </div>
            )}
          </div>
        )}
        
        {/* Saved Events */}
        {savedEvents.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <h3 className="text-white font-bold mb-3">Saved Events</h3>
            <div className="space-y-2">
              {savedEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                  <button
                    onClick={() => loadEvent(event)}
                    className="text-left flex-1"
                  >
                    <div className="text-white font-medium">{event.name}</div>
                    <div className="text-white/60 text-sm">{new Date(event.date).toLocaleString()}</div>
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-400 hover:text-red-300 px-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
