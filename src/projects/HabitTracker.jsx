import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HabitTracker = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Exercise', emoji: '💪', streak: 0, completedDates: [] },
      { id: 2, name: 'Read', emoji: '📚', streak: 0, completedDates: [] },
      { id: 3, name: 'Meditate', emoji: '🧘', streak: 0, completedDates: [] },
    ];
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const today = new Date().toDateString();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });

  const toggleHabit = (habitId, date) => {
    setHabits(habits.map(h => {
      if (h.id !== habitId) return h;
      const completed = h.completedDates.includes(date);
      const newDates = completed
        ? h.completedDates.filter(d => d !== date)
        : [...h.completedDates, date];
      
      // Calculate streak
      let streak = 0;
      const sortedDates = [...newDates].sort((a, b) => new Date(b) - new Date(a));
      for (let i = 0; i < sortedDates.length; i++) {
        const expected = new Date();
        expected.setDate(expected.getDate() - i);
        if (sortedDates.includes(expected.toDateString())) streak++;
        else break;
      }
      
      return { ...h, completedDates: newDates, streak };
    }));
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), name: newHabit, emoji: '✨', streak: 0, completedDates: [] }]);
    setNewHabit('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📅 Habit Tracker</h1>

        {/* Add Habit */}
        <form onSubmit={addHabit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add new habit..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          />
          <button type="submit" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-bold">Add</button>
        </form>

        {/* Habits Grid */}
        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-9 gap-2 p-4 bg-white/10">
            <div className="col-span-2 text-white font-bold">Habit</div>
            {last7Days.map((date, i) => (
              <div key={i} className="text-center text-white/60 text-sm">
                {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
              </div>
            ))}
          </div>

          {/* Habits */}
          {habits.map(habit => (
            <div key={habit.id} className="grid grid-cols-9 gap-2 p-4 border-t border-white/10 items-center">
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-xl">{habit.emoji}</span>
                <div>
                  <div className="text-white">{habit.name}</div>
                  <div className="text-xs text-orange-400">🔥 {habit.streak} day streak</div>
                </div>
              </div>
              {last7Days.map((date, i) => (
                <button
                  key={i}
                  onClick={() => toggleHabit(habit.id, date)}
                  className={`w-8 h-8 mx-auto rounded-lg transition ${
                    habit.completedDates.includes(date)
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {habit.completedDates.includes(date) ? '✓' : ''}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{habits.length}</div>
            <div className="text-white/60 text-sm">Habits</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {habits.filter(h => h.completedDates.includes(today)).length}
            </div>
            <div className="text-white/60 text-sm">Done Today</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {Math.max(...habits.map(h => h.streak), 0)}
            </div>
            <div className="text-white/60 text-sm">Best Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
