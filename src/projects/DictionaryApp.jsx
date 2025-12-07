import { useState } from 'react';
import { Link } from 'react-router-dom';

// Local dictionary data
const dictionary = {
  'react': { word: 'React', phonetic: '/riˈækt/', partOfSpeech: 'noun', definition: 'A JavaScript library for building user interfaces, maintained by Meta.', example: 'I built this app using React.' },
  'javascript': { word: 'JavaScript', phonetic: '/ˈdʒɑːvəˌskrɪpt/', partOfSpeech: 'noun', definition: 'A high-level, interpreted programming language that is one of the core technologies of the World Wide Web.', example: 'JavaScript makes websites interactive.' },
  'code': { word: 'Code', phonetic: '/koʊd/', partOfSpeech: 'noun/verb', definition: 'A system of words, letters, or symbols used to represent instructions to a computer.', example: 'She wrote some code to automate the task.' },
  'developer': { word: 'Developer', phonetic: '/dɪˈveləpər/', partOfSpeech: 'noun', definition: 'A person who creates software applications or websites.', example: 'He works as a full-stack developer.' },
  'programming': { word: 'Programming', phonetic: '/ˈproʊɡræmɪŋ/', partOfSpeech: 'noun', definition: 'The process of writing instructions for computers to perform specific tasks.', example: 'Programming requires logical thinking.' },
  'algorithm': { word: 'Algorithm', phonetic: '/ˈælɡəˌrɪðəm/', partOfSpeech: 'noun', definition: 'A step-by-step procedure for solving a problem or accomplishing a task.', example: 'The sorting algorithm improved performance.' },
  'function': { word: 'Function', phonetic: '/ˈfʌŋkʃən/', partOfSpeech: 'noun', definition: 'A reusable block of code that performs a specific task.', example: 'I created a function to calculate the total.' },
  'variable': { word: 'Variable', phonetic: '/ˈvɛriəbəl/', partOfSpeech: 'noun', definition: 'A container for storing data values in programming.', example: 'The variable stores the user\'s name.' },
  'component': { word: 'Component', phonetic: '/kəmˈpoʊnənt/', partOfSpeech: 'noun', definition: 'A reusable piece of UI in frameworks like React.', example: 'Each button is a separate component.' },
  'api': { word: 'API', phonetic: '/ˌeɪ.piːˈaɪ/', partOfSpeech: 'noun', definition: 'Application Programming Interface - a set of protocols for building software.', example: 'The API returns JSON data.' },
};

const DictionaryApp = () => {
  const [searchWord, setSearchWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const searchDictionary = () => {
    const word = searchWord.toLowerCase().trim();
    if (!word) return;

    if (dictionary[word]) {
      setResult(dictionary[word]);
      setError('');
      if (!history.includes(word)) {
        setHistory(prev => [word, ...prev.slice(0, 9)]);
      }
    } else {
      setResult(null);
      setError(`"${searchWord}" not found. Try: react, javascript, code, developer, programming, algorithm, function, variable, component, api`);
    }
  };

  const loadWord = (word) => {
    setSearchWord(word);
    setResult(dictionary[word]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📖 Dictionary</h1>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search a word..."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchDictionary()}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/30"
          />
          <button
            onClick={searchDictionary}
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold"
          >
            🔍
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 mb-6">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{result.word}</h2>
              <span className="text-gray-500">{result.phonetic}</span>
            </div>
            
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm mb-4">
              {result.partOfSpeech}
            </div>

            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-1">Definition</div>
              <p className="text-gray-800">{result.definition}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-500 text-sm mb-1">Example</div>
              <p className="text-gray-700 italic">"{result.example}"</p>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="text-white/60 text-sm mb-2">Search History</div>
            <div className="flex flex-wrap gap-2">
              {history.map(word => (
                <button
                  key={word}
                  onClick={() => loadWord(word)}
                  className="px-3 py-1 bg-white/20 text-white rounded-lg capitalize hover:bg-white/30"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {!result && !error && (
          <div className="text-center">
            <p className="text-white/60 mb-4">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(dictionary).slice(0, 5).map(word => (
                <button
                  key={word}
                  onClick={() => loadWord(word)}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg capitalize hover:bg-white/30"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DictionaryApp;
