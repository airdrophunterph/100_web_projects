import { useState } from 'react';
import { Link } from 'react-router-dom';

const FileSharing = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const fileList = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploaded: false
    }));
    setFiles([...files, ...fileList]);
    
    // Simulate upload
    setUploading(true);
    setTimeout(() => {
      setFiles(prev => prev.map(f => ({ ...f, uploaded: true })));
      setUploading(false);
      setShareLink(`https://share.example.com/${Math.random().toString(36).substring(7)}`);
    }, 1500);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎬';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('zip') || type.includes('rar')) return '📦';
    if (type.includes('text')) return '📝';
    return '📁';
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📤 File Sharing</h1>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="bg-white/10 backdrop-blur rounded-2xl p-12 text-center border-2 border-dashed border-white/30 mb-6"
        >
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer block">
            <div className="text-6xl mb-4">📁</div>
            <div className="text-white text-lg mb-2">Drop files here or click to browse</div>
            <div className="text-white/60">Maximum file size: 100MB</div>
          </label>
        </div>

        {/* Uploading */}
        {uploading && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="animate-spin text-2xl">⏳</div>
            <div className="flex-1">
              <div className="text-white">Uploading files...</div>
              <div className="h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-cyan-500 animate-pulse w-3/4" />
              </div>
            </div>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold mb-4">Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map(file => (
                <div key={file.id} className="flex items-center gap-4 p-3 bg-white/10 rounded-lg">
                  <span className="text-2xl">{getFileIcon(file.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate">{file.name}</div>
                    <div className="text-white/40 text-sm">{formatSize(file.size)}</div>
                  </div>
                  {file.uploaded && <span className="text-green-400">✓</span>}
                  <button onClick={() => removeFile(file.id)} className="text-red-400">×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Link */}
        {shareLink && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">🔗 Share Link</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              />
              <button onClick={copyLink} className="px-4 py-2 bg-cyan-500 text-white rounded-lg">
                📋 Copy
              </button>
            </div>
            <p className="text-white/40 text-sm mt-2">Link expires in 24 hours</p>
          </div>
        )}

        <p className="text-white/40 text-center text-sm mt-6">
          Demo only - files are not actually uploaded or stored
        </p>
      </div>
    </div>
  );
};

export default FileSharing;
