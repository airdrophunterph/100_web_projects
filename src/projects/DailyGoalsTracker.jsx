import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DailyGoalsTracker = () => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('dailyGoals');
    return saved ? JSON.parse(saved) : [];
  });
  const [newGoal, setNewGoal] = useState('');
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    localStorage.setItem('dailyGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, { id: Date.now(), text: newGoal, category, completed: false, date: new Date().toLocaleDateString() }]);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const clearCompleted = () => {
    setGoals(goals.filter(g => !g.completed));
  };

  const categories = { personal: '🏠', work: '💼', health: '💪', learning: '📚' };
  const completedCount = goals.filter(g => g.completed).length;
  const progress = goals.length ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🎯 Daily Goals</h1>
        <p className="text-white/60 text-center mb-8">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-white">Progress</span>
            <span className="text-white font-bold">{completedCount}/{goals.length}</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-teal-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-center text-white/60 mt-2">{progress}% Complete</div>
        </div>

        {/* Add Goal */}
        <form onSubmit={addGoal} className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6">
          <div className="flex gap-2 mb-3">
            {Object.entries(categories).map(([key, emoji]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`px-3 py-1 rounded-lg ${category === key ? 'bg-teal-500' : 'bg-white/10'} text-white`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a new goal..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <button type="submit" className="px-6 py-3 bg-teal-500 text-white rounded-lg font-bold">+</button>
          </div>
        </form>

        {/* Goals List */}
        <div className="space-y-3">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3 ${goal.completed ? 'opacity-60' : ''}`}
            >
              <button onClick={() => toggleGoal(goal.id)} className="text-2xl">
                {goal.completed ? '✅' : '⬜'}
              </button>
              <div className="flex-1">
                <span className={`text-white ${goal.completed ? 'line-through' : ''}`}>{goal.text}</span>
                <div className="text-white/40 text-sm">{categories[goal.category]} {goal.category}</div>
              </div>
              <button onClick={() => deleteGoal(goal.id)} className="text-red-400 hover:text-red-300">🗑️</button>
            </div>
          ))}
        </div>

        {goals.length > 0 && completedCount > 0 && (
          <button onClick={clearCompleted} className="w-full mt-4 py-2 bg-white/10 text-white/60 rounded-lg hover:bg-white/20">
            Clear Completed
          </button>
        )}

        {goals.length === 0 && (
          <div className="text-center text-white/40 py-12">No goals yet. Add your first goal!</div>
        )}
      </div>
    </div>
  );
};

export default DailyGoalsTracker;
