import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CustomCountdown = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('countdownEvents');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'New Year 2025', date: '2025-01-01T00:00', color: 'from-purple-500 to-pink-500' }
    ];
  });
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('countdownEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date) return;
    
    const colors = ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500'];
    setEvents([...events, {
      id: Date.now(),
      ...newEvent,
      color: colors[Math.floor(Math.random() * colors.length)]
    }]);
    setNewEvent({ name: '', date: '' });
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getTimeLeft = (targetDate) => {
    const diff = new Date(targetDate) - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      passed: false
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-red-900 to-orange-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">⏰ Countdown Timer</h1>

        {/* Add Event */}
        <form onSubmit={addEvent} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Event name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <input
              type="datetime-local"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold rounded-lg">
            + Add Countdown
          </button>
        </form>

        {/* Events */}
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center text-white/40 py-12">No countdowns yet</div>
          ) : (
            events.map(event => {
              const time = getTimeLeft(event.date);
              return (
                <div key={event.id} className={`bg-gradient-to-r ${event.color} rounded-2xl p-6 relative overflow-hidden`}>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="absolute top-3 right-3 text-white/60 hover:text-white"
                  >
                    ×
                  </button>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                  <div className="text-white/60 text-sm mb-4">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>

                  {time.passed ? (
                    <div className="text-2xl font-bold text-white">🎉 Event has passed!</div>
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { value: time.days, label: 'Days' },
                        { value: time.hours, label: 'Hours' },
                        { value: time.minutes, label: 'Minutes' },
                        { value: time.seconds, label: 'Seconds' }
                      ].map(({ value, label }) => (
                        <div key={label} className="bg-white/20 rounded-xl p-3 text-center">
                          <div className="text-3xl font-bold text-white">{String(value).padStart(2, '0')}</div>
                          <div className="text-white/60 text-sm">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCountdown;
