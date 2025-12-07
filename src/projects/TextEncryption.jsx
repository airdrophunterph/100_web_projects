import { useState } from 'react';
import { Link } from 'react-router-dom';

const TextEncryption = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');

  const encrypt = (text, key) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
  };

  const decrypt = (text, key) => {
    try {
      const decoded = atob(text);
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
      }
      return result;
    } catch {
      return 'Invalid encrypted text';
    }
  };

  const handleProcess = () => {
    if (!text || !key) return;
    if (mode === 'encrypt') {
      setResult(encrypt(text, key));
    } else {
      setResult(decrypt(text, key));
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🔐 Text Encryption</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                mode === 'encrypt' ? 'bg-green-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              🔒 Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                mode === 'decrypt' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              🔓 Decrypt
            </button>
          </div>

          <textarea
            placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4 resize-none"
          />

          <input
            type="text"
            placeholder="Secret key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
          />

          <button
            onClick={handleProcess}
            className="w-full py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-bold rounded-lg mb-4"
          >
            {mode === 'encrypt' ? '🔒 Encrypt' : '🔓 Decrypt'}
          </button>

          {result && (
            <div className="bg-black/30 rounded-lg p-4">
              <div className="text-white/60 text-sm mb-2">Result:</div>
              <div className="text-white break-all mb-3 font-mono text-sm">{result}</div>
              <button
                onClick={copyResult}
                className="w-full py-2 bg-white/20 text-white rounded-lg hover:bg-white/30"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEncryption;
