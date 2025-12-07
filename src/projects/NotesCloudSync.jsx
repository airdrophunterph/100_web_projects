import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotesCloudSync = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('cloudNotes');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNote, setActiveNote] = useState(null);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    localStorage.setItem('cloudNotes', JSON.stringify(notes));
  }, [notes]);

  const simulateSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSync(new Date().toLocaleTimeString());
    }, 1500);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      color: ['yellow', 'pink', 'blue', 'green', 'purple'][Math.floor(Math.random() * 5)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    simulateSync();
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
    if (activeNote?.id === id) setActiveNote({ ...activeNote, ...updates });
    setSyncStatus('pending');
    setTimeout(simulateSync, 1000);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
    simulateSync();
  };

  const colors = {
    yellow: 'bg-yellow-100 border-yellow-300',
    pink: 'bg-pink-100 border-pink-300',
    blue: 'bg-blue-100 border-blue-300',
    green: 'bg-green-100 border-green-300',
    purple: 'bg-purple-100 border-purple-300'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-800 via-orange-900 to-red-900 p-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          {syncStatus === 'syncing' && <span className="animate-spin">🔄</span>}
          {syncStatus === 'synced' && <span>☁️</span>}
          {syncStatus === 'pending' && <span>⏳</span>}
          <span>Last sync: {lastSync}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">📝 Cloud Notes</h1>
          <button
            onClick={createNote}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold"
          >
            + New Note
          </button>
        </div>

        {activeNote ? (
          /* Note Editor */
          <div className={`${colors[activeNote.color]} rounded-2xl p-6 border-2`}>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                className="text-2xl font-bold bg-transparent border-none focus:outline-none flex-1"
                placeholder="Note title..."
              />
              <div className="flex gap-2">
                {Object.keys(colors).map(color => (
                  <button
                    key={color}
                    onClick={() => updateNote(activeNote.id, { color })}
                    className={`w-6 h-6 rounded-full ${colors[color]} border-2 ${activeNote.color === color ? 'ring-2 ring-gray-400' : ''}`}
                  />
                ))}
              </div>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              placeholder="Start writing..."
              className="w-full h-64 bg-transparent resize-none focus:outline-none"
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
              <span className="text-gray-500 text-sm">
                Updated: {new Date(activeNote.updatedAt).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveNote(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => deleteNote(activeNote.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Notes Grid */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {notes.length === 0 ? (
              <div className="col-span-full text-center text-white/40 py-12">
                No notes yet. Create your first note!
              </div>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className={`${colors[note.color]} rounded-xl p-4 cursor-pointer hover:shadow-lg transition border-2`}
                >
                  <h3 className="font-bold mb-2 truncate">{note.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{note.content || 'Empty note'}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesCloudSync;
