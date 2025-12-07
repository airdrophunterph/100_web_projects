import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialFiles = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'Documents',
      type: 'folder',
      children: [
        { name: 'resume.pdf', type: 'file', size: '245 KB', icon: '📄' },
        { name: 'notes.txt', type: 'file', size: '12 KB', icon: '📝' },
        { name: 'budget.xlsx', type: 'file', size: '89 KB', icon: '📊' },
      ]
    },
    {
      name: 'Pictures',
      type: 'folder',
      children: [
        { name: 'vacation.jpg', type: 'file', size: '2.4 MB', icon: '🖼️' },
        { name: 'family.png', type: 'file', size: '1.8 MB', icon: '🖼️' },
        { name: 'screenshot.png', type: 'file', size: '456 KB', icon: '🖼️' },
      ]
    },
    {
      name: 'Music',
      type: 'folder',
      children: [
        { name: 'song1.mp3', type: 'file', size: '4.2 MB', icon: '🎵' },
        { name: 'song2.mp3', type: 'file', size: '3.8 MB', icon: '🎵' },
      ]
    },
    {
      name: 'Projects',
      type: 'folder',
      children: [
        {
          name: 'website',
          type: 'folder',
          children: [
            { name: 'index.html', type: 'file', size: '8 KB', icon: '🌐' },
            { name: 'style.css', type: 'file', size: '12 KB', icon: '🎨' },
            { name: 'script.js', type: 'file', size: '24 KB', icon: '⚙️' },
          ]
        }
      ]
    },
    { name: 'readme.md', type: 'file', size: '2 KB', icon: '📋' },
  ]
};

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const getCurrentFolder = () => {
    let folder = initialFiles;
    for (const name of currentPath) {
      folder = folder.children.find(f => f.name === name);
    }
    return folder;
  };

  const navigateTo = (name) => {
    setCurrentPath([...currentPath, name]);
    setSelectedFile(null);
  };

  const goBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
    setSelectedFile(null);
  };

  const goToPath = (idx) => {
    setCurrentPath(currentPath.slice(0, idx));
    setSelectedFile(null);
  };

  const currentFolder = getCurrentFolder();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📁 File Explorer</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={goBack}
                disabled={currentPath.length === 0}
                className="p-2 bg-white/10 rounded-lg disabled:opacity-30 text-white"
              >
                ←
              </button>
              
              {/* Breadcrumb */}
              <div className="flex items-center text-white/60">
                <button onClick={() => setCurrentPath([])} className="hover:text-white">📁 root</button>
                {currentPath.map((name, idx) => (
                  <span key={idx}>
                    <span className="mx-2">/</span>
                    <button onClick={() => goToPath(idx + 1)} className="hover:text-white">{name}</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white/20' : 'bg-white/10'} text-white`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white/20' : 'bg-white/10'} text-white`}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Files */}
          <div className="p-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {currentFolder.children?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.type === 'folder' ? navigateTo(item.name) : setSelectedFile(item)}
                    onDoubleClick={() => item.type === 'folder' && navigateTo(item.name)}
                    className={`p-4 rounded-xl text-center hover:bg-white/10 transition ${
                      selectedFile?.name === item.name ? 'bg-white/20' : ''
                    }`}
                  >
                    <div className="text-4xl mb-2">
                      {item.type === 'folder' ? '📁' : item.icon || '📄'}
                    </div>
                    <div className="text-white text-sm truncate">{item.name}</div>
                    {item.size && <div className="text-white/40 text-xs">{item.size}</div>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {currentFolder.children?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => item.type === 'folder' ? navigateTo(item.name) : setSelectedFile(item)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition ${
                      selectedFile?.name === item.name ? 'bg-white/20' : ''
                    }`}
                  >
                    <span className="text-2xl">{item.type === 'folder' ? '📁' : item.icon || '📄'}</span>
                    <span className="text-white flex-1 text-left">{item.name}</span>
                    <span className="text-white/40 text-sm">{item.size || '--'}</span>
                  </button>
                ))}
              </div>
            )}

            {currentFolder.children?.length === 0 && (
              <div className="text-center text-white/40 py-12">Empty folder</div>
            )}
          </div>

          {/* Status Bar */}
          <div className="p-3 border-t border-white/10 text-white/60 text-sm">
            {currentFolder.children?.length || 0} items
            {selectedFile && ` • Selected: ${selectedFile.name}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
