import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MarkdownNotes = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('markdownNotes');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Welcome', content: '# Welcome to Markdown Notes\n\nWrite your notes in **Markdown** format!\n\n## Features\n- Bold text with **asterisks**\n- *Italic* with single asterisks\n- `code` with backticks\n- Links: [Google](https://google.com)\n\n> This is a blockquote', updatedAt: Date.now() }
    ];
  });
  const [activeNote, setActiveNote] = useState(notes[0]);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem('markdownNotes', JSON.stringify(notes));
  }, [notes]);

  const parseMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-700 px-1 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-400 underline">$1</a>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-500 pl-4 italic my-2">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/\n/gim, '<br>');
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '# New Note\n\nStart writing...',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const updateNote = (content) => {
    const title = content.split('\n')[0].replace(/^#+ /, '') || 'Untitled';
    const updated = notes.map(n => 
      n.id === activeNote.id 
        ? { ...n, content, title, updatedAt: Date.now() }
        : n
    );
    setNotes(updated);
    setActiveNote({ ...activeNote, content, title });
  };

  const deleteNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (activeNote?.id === id) {
      setActiveNote(filtered[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-black/30 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="text-white/60 hover:text-white text-sm mb-4 block">← Back</Link>
            <h1 className="text-xl font-bold text-white">📝 Notes</h1>
          </div>
          
          <button
            onClick={addNote}
            className="m-4 py-2 bg-blue-500 text-white rounded-lg font-bold"
          >
            + New Note
          </button>

          <div className="flex-1 overflow-y-auto">
            {notes.map(note => (
              <div
                key={note.id}
                onClick={() => setActiveNote(note)}
                className={`p-4 border-b border-white/10 cursor-pointer ${
                  activeNote?.id === note.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{note.title}</div>
                    <div className="text-white/40 text-sm">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                    className="text-red-400/60 hover:text-red-400 ml-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {activeNote ? (
            <>
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-white font-bold">{activeNote.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPreview(false)}
                    className={`px-3 py-1 rounded ${!isPreview ? 'bg-white/20 text-white' : 'text-white/60'}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsPreview(true)}
                    className={`px-3 py-1 rounded ${isPreview ? 'bg-white/20 text-white' : 'text-white/60'}`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                {isPreview ? (
                  <div 
                    className="prose prose-invert max-w-none text-white"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(activeNote.content) }}
                  />
                ) : (
                  <textarea
                    value={activeNote.content}
                    onChange={(e) => updateNote(e.target.value)}
                    className="w-full h-full bg-transparent text-white font-mono resize-none focus:outline-none"
                    placeholder="Write in Markdown..."
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/40">
              Select or create a note
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownNotes;
