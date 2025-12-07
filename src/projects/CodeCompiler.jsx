import { useState } from 'react';
import { Link } from 'react-router-dom';

const CodeCompiler = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'html', name: 'HTML', icon: '🌐' },
  ];

  const templates = {
    javascript: '// JavaScript Example\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n\nfor (let i = 1; i <= 5; i++) {\n  console.log(`Count: ${i}`);\n}',
    python: '# Python Example\ngreeting = "Hello, World!"\nprint(greeting)\n\nfor i in range(1, 6):\n    print(f"Count: {i}")',
    html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>',
  };

  const runCode = () => {
    setRunning(true);
    setOutput('');

    setTimeout(() => {
      try {
        if (language === 'javascript') {
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.join(' '));
          
          try {
            eval(code);
            setOutput(logs.join('\n') || 'Code executed successfully (no output)');
          } catch (e) {
            setOutput(`Error: ${e.message}`);
          }
          
          console.log = originalLog;
        } else if (language === 'python') {
          setOutput('Python execution requires a backend server.\nSimulated output:\n\n> Hello, World!\n> Count: 1\n> Count: 2\n> ...');
        } else if (language === 'html') {
          setOutput('HTML Preview available in a real implementation.\n\nParsed elements:\n- DOCTYPE: html\n- Elements found: ' + (code.match(/<[^>]+>/g)?.length || 0));
        }
      } catch (e) {
        setOutput(`Error: ${e.message}`);
      }
      setRunning(false);
    }, 500);
  };

  const loadTemplate = () => {
    setCode(templates[language]);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💻 Code Compiler</h1>

        {/* Language Selector */}
        <div className="flex gap-2 mb-4">
          {languages.map(lang => (
            <button
              key={lang.id}
              onClick={() => { setLanguage(lang.id); setOutput(''); }}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${language === lang.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'}`}
            >
              {lang.icon} {lang.name}
            </button>
          ))}
          <button onClick={loadTemplate} className="ml-auto px-4 py-2 bg-white/10 text-white/60 rounded-lg hover:bg-white/20">
            📝 Load Template
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Editor */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
              <span className="text-white/60 text-sm">main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'html'}</span>
              <button
                onClick={runCode}
                disabled={running}
                className="px-4 py-1 bg-green-500 text-white rounded text-sm font-bold disabled:opacity-50"
              >
                {running ? '⏳ Running...' : '▶ Run'}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-gray-900 text-green-400 font-mono p-4 resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>

          {/* Output */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-gray-700 px-4 py-2">
              <span className="text-white/60 text-sm">Output</span>
            </div>
            <div className="h-80 bg-black p-4 overflow-auto">
              <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                {output || '// Output will appear here after running the code'}
              </pre>
            </div>
          </div>
        </div>

        <p className="text-white/40 text-center text-sm mt-4">
          Note: JavaScript runs in browser. Python/HTML require backend for full execution.
        </p>
      </div>
    </div>
  );
};

export default CodeCompiler;
