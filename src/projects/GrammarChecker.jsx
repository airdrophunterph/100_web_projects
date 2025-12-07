import { useState } from 'react';
import { Link } from 'react-router-dom';

const commonErrors = [
  { pattern: /\bi\b/g, suggestion: 'I', message: '"i" should be capitalized' },
  { pattern: /\s\s+/g, suggestion: ' ', message: 'Multiple spaces detected' },
  { pattern: /\byour\s+(a|an)\b/gi, suggestion: "you're a", message: '"your" should be "you\'re"' },
  { pattern: /\bthier\b/gi, suggestion: 'their', message: 'Spelling: "thier" → "their"' },
  { pattern: /\bteh\b/gi, suggestion: 'the', message: 'Spelling: "teh" → "the"' },
  { pattern: /\brecieve\b/gi, suggestion: 'receive', message: 'Spelling: "recieve" → "receive"' },
  { pattern: /\boccured\b/gi, suggestion: 'occurred', message: 'Spelling: "occured" → "occurred"' },
  { pattern: /\bdefinate\b/gi, suggestion: 'definite', message: 'Spelling: "definate" → "definite"' },
  { pattern: /\bseperately\b/gi, suggestion: 'separately', message: 'Spelling: "seperately" → "separately"' },
  { pattern: /\buntill\b/gi, suggestion: 'until', message: 'Spelling: "untill" → "until"' },
  { pattern: /\.\s*[a-z]/g, suggestion: (match) => '. ' + match.slice(-1).toUpperCase(), message: 'Capitalize after period' },
  { pattern: /\s+\./g, suggestion: '.', message: 'No space before period' },
  { pattern: /\s+,/g, suggestion: ',', message: 'No space before comma' },
];

const GrammarChecker = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  const [correctedText, setCorrectedText] = useState('');
  const [checking, setChecking] = useState(false);

  const checkGrammar = () => {
    if (!text.trim()) return;
    setChecking(true);

    setTimeout(() => {
      const foundErrors = [];
      let corrected = text;

      commonErrors.forEach(({ pattern, suggestion, message }) => {
        const matches = text.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const replacement = typeof suggestion === 'function' ? suggestion(match) : suggestion;
            foundErrors.push({ original: match, suggestion: replacement, message });
            corrected = corrected.replace(match, replacement);
          });
        }
      });

      setErrors(foundErrors);
      setCorrectedText(corrected);
      setChecking(false);
    }, 1000);
  };

  const applyCorrection = () => {
    setText(correctedText);
    setErrors([]);
    setCorrectedText('');
  };

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">✍️ Grammar Checker</h1>
        <p className="text-white/60 text-center mb-8">AI-powered writing assistant</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur rounded-2xl p-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here to check for grammar errors..."
              rows="12"
              className="w-full bg-transparent text-white resize-none focus:outline-none"
            />
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/20">
              <div className="flex gap-4 text-white/40 text-sm">
                <span>{stats.words} words</span>
                <span>{stats.characters} chars</span>
                <span>{stats.sentences} sentences</span>
              </div>
              <button
                onClick={checkGrammar}
                disabled={checking || !text.trim()}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-bold disabled:opacity-50"
              >
                {checking ? '🔍 Checking...' : '🔍 Check Grammar'}
              </button>
            </div>
          </div>

          {/* Errors Panel */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">
              {errors.length > 0 ? `Found ${errors.length} issue(s)` : 'Suggestions'}
            </h3>

            {errors.length > 0 ? (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {errors.map((error, i) => (
                    <div key={i} className="bg-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-red-400 line-through">{error.original}</span>
                        <span className="text-white">→</span>
                        <span className="text-green-400">{error.suggestion}</span>
                      </div>
                      <p className="text-white/60 text-sm">{error.message}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={applyCorrection}
                  className="w-full py-2 bg-green-500 text-white rounded-lg"
                >
                  ✓ Apply All Corrections
                </button>
              </>
            ) : (
              <div className="text-center text-white/40 py-8">
                {text.trim() ? 'Click "Check Grammar" to analyze your text' : 'Start typing to check your grammar'}
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <h4 className="text-white/60 text-sm mb-2">Writing Tips</h4>
              <ul className="text-white/40 text-sm space-y-1">
                <li>• Keep sentences concise</li>
                <li>• Avoid passive voice</li>
                <li>• Check for subject-verb agreement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarChecker;
