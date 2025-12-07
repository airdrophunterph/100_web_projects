import { useState } from 'react';
import { Link } from 'react-router-dom';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const generatePassword = () => {
    let chars = '';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setHistory(prev => [result, ...prev.slice(0, 4)]);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (options.uppercase) score++;
    if (options.lowercase) score++;
    if (options.numbers) score++;
    if (options.symbols) score++;
    
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🔑 Password Generator</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          {/* Password Display */}
          <div className="bg-black/30 rounded-xl p-4 mb-4">
            <div className="font-mono text-xl text-white break-all min-h-[56px] flex items-center">
              {password || 'Click generate'}
            </div>
          </div>

          {/* Strength Meter */}
          {password && !password.includes('Select') && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/60">Strength</span>
                <span className={`${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div className={`h-full ${strength.color} rounded-full transition-all`} style={{ width: strength.width }} />
              </div>
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={copyPassword}
            disabled={!password}
            className={`w-full py-3 rounded-lg font-bold mb-6 transition ${
              copied ? 'bg-green-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {copied ? '✓ Copied!' : '📋 Copy Password'}
          </button>

          {/* Length Slider */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-white/80">Length</span>
              <span className="text-white font-bold">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {[
              { key: 'uppercase', label: 'Uppercase (A-Z)' },
              { key: 'lowercase', label: 'Lowercase (a-z)' },
              { key: 'numbers', label: 'Numbers (0-9)' },
              { key: 'symbols', label: 'Symbols (!@#$)' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-white/80">{label}</span>
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
              </label>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePassword}
            className="w-full py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-bold rounded-lg hover:opacity-90"
          >
            🔄 Generate Password
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">Recent Passwords</h3>
            <div className="space-y-2">
              {history.map((pw, i) => (
                <div key={i} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                  <span className="text-white/60 font-mono text-sm truncate flex-1">{pw}</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(pw); }}
                    className="text-white/40 hover:text-white ml-2"
                  >
                    📋
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
