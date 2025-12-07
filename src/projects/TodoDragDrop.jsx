import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TodoDragDrop = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('kanbanBoard');
    return saved ? JSON.parse(saved) : {
      todo: { title: 'To Do', items: [{ id: 1, text: 'Learn React' }, { id: 2, text: 'Build a project' }] },
      inProgress: { title: 'In Progress', items: [{ id: 3, text: 'Study Tailwind' }] },
      done: { title: 'Done', items: [{ id: 4, text: 'Setup environment' }] }
    };
  });
  const [newTask, setNewTask] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanbanBoard', JSON.stringify(columns));
  }, [columns]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setColumns({
      ...columns,
      todo: {
        ...columns.todo,
        items: [...columns.todo.items, { id: Date.now(), text: newTask }]
      }
    });
    setNewTask('');
  };

  const deleteTask = (columnId, taskId) => {
    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        items: columns[columnId].items.filter(item => item.id !== taskId)
      }
    });
  };

  const handleDragStart = (item, columnId) => {
    setDraggedItem(item);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId) => {
    if (!draggedItem || !draggedFrom) return;
    if (draggedFrom === targetColumnId) return;

    setColumns({
      ...columns,
      [draggedFrom]: {
        ...columns[draggedFrom],
        items: columns[draggedFrom].items.filter(item => item.id !== draggedItem.id)
      },
      [targetColumnId]: {
        ...columns[targetColumnId],
        items: [...columns[targetColumnId].items, draggedItem]
      }
    });

    setDraggedItem(null);
    setDraggedFrom(null);
  };

  const columnColors = {
    todo: 'border-blue-500',
    inProgress: 'border-yellow-500',
    done: 'border-green-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📋 Kanban Board</h1>

        {/* Add Task */}
        <form onSubmit={addTask} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          />
          <button type="submit" className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-bold">Add</button>
        </form>

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(columnId)}
              className={`bg-white/10 backdrop-blur rounded-xl p-4 border-t-4 ${columnColors[columnId]} min-h-[300px]`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-white">{column.title}</h2>
                <span className="px-2 py-1 bg-white/20 rounded-full text-white text-sm">
                  {column.items.length}
                </span>
              </div>

              <div className="space-y-2">
                {column.items.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item, columnId)}
                    className="bg-white/20 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:bg-white/30 transition group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-white">{item.text}</span>
                      <button
                        onClick={() => deleteTask(columnId, item.id)}
                        className="text-red-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {column.items.length === 0 && (
                <div className="text-white/40 text-center py-8">Drop tasks here</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoDragDrop;
