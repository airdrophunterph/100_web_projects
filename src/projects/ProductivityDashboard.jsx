import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductivityDashboard = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('prodTasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [focusTime, setFocusTime] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    localStorage.setItem('prodTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => setFocusTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTracking]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority: 'medium' }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const productivity = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📊 Productivity Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{tasks.length}</div>
            <div className="text-white/60 text-sm">Total Tasks</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{completedCount}</div>
            <div className="text-white/60 text-sm">Completed</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{productivity}%</div>
            <div className="text-white/60 text-sm">Productivity</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">{formatTime(focusTime)}</div>
            <div className="text-white/60 text-sm">Focus Time</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tasks */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">📝 Today's Tasks</h2>
            
            <form onSubmit={addTask} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add task..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              />
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">+</button>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${task.completed ? 'bg-green-500/20' : 'bg-white/10'}`}
                >
                  <span className="text-xl">{task.completed ? '✅' : '⬜'}</span>
                  <span className={`text-white ${task.completed ? 'line-through opacity-60' : ''}`}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Timer */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">⏱️ Focus Timer</h2>
            
            <div className="text-center">
              <div className="text-5xl font-mono font-bold text-white mb-6">{formatTime(focusTime)}</div>
              
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={() => setIsTracking(!isTracking)}
                  className={`px-6 py-3 rounded-lg font-bold ${isTracking ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                  {isTracking ? '⏸ Pause' : '▶ Start'}
                </button>
                <button
                  onClick={() => { setFocusTime(0); setIsTracking(false); }}
                  className="px-6 py-3 bg-white/20 text-white rounded-lg"
                >
                  ↺ Reset
                </button>
              </div>

              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <circle
                    cx="64" cy="64" r="56"
                    stroke="#22c55e"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="352"
                    strokeDashoffset={352 - (productivity / 100) * 352}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{productivity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityDashboard;
