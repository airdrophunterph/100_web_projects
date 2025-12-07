import { useState } from 'react';
import { Link } from 'react-router-dom';

const questions = {
  behavioral: [
    { q: 'Tell me about yourself.', tips: 'Keep it professional, focus on your career journey and relevant skills.' },
    { q: 'Why do you want this job?', tips: 'Show enthusiasm and connect your skills to the role.' },
    { q: 'What is your greatest strength?', tips: 'Choose a strength relevant to the job with a specific example.' },
    { q: 'What is your biggest weakness?', tips: 'Be honest but show how you\'re working to improve.' },
    { q: 'Where do you see yourself in 5 years?', tips: 'Show ambition while aligning with company goals.' },
  ],
  technical: [
    { q: 'Explain the concept of RESTful APIs.', tips: 'Cover HTTP methods, statelessness, and resource-based URLs.' },
    { q: 'What is the difference between SQL and NoSQL?', tips: 'Compare structured vs flexible schemas, use cases.' },
    { q: 'How would you optimize a slow database query?', tips: 'Mention indexing, query analysis, caching strategies.' },
    { q: 'Explain the concept of closures in JavaScript.', tips: 'A function that has access to variables from its outer scope.' },
    { q: 'What is the difference between == and ===?', tips: 'Type coercion vs strict equality comparison.' },
  ],
  situational: [
    { q: 'How do you handle tight deadlines?', tips: 'Prioritization, communication, and time management.' },
    { q: 'Tell me about a conflict with a coworker.', tips: 'Focus on resolution and what you learned.' },
    { q: 'Describe a challenging project you completed.', tips: 'Use STAR method: Situation, Task, Action, Result.' },
  ]
};

const InterviewPrep = () => {
  const [category, setCategory] = useState('behavioral');
  const [currentQ, setCurrentQ] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [answer, setAnswer] = useState('');
  const [savedAnswers, setSavedAnswers] = useState({});
  const [mode, setMode] = useState('practice'); // practice, mock

  const currentQuestions = questions[category];
  const question = currentQuestions[currentQ];

  const nextQuestion = () => {
    if (answer.trim()) {
      setSavedAnswers({ ...savedAnswers, [`${category}-${currentQ}`]: answer });
    }
    setCurrentQ((currentQ + 1) % currentQuestions.length);
    setAnswer('');
    setShowTips(false);
  };

  const prevQuestion = () => {
    setCurrentQ((currentQ - 1 + currentQuestions.length) % currentQuestions.length);
    setAnswer(savedAnswers[`${category}-${currentQ - 1}`] || '');
    setShowTips(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🎯 Interview Prep</h1>
        <p className="text-white/60 text-center mb-8">AI-powered practice sessions</p>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {Object.keys(questions).map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setCurrentQ(0); setAnswer(''); }}
              className={`px-4 py-2 rounded-lg capitalize ${category === cat ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${((currentQ + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
          <span className="text-white/60">{currentQ + 1}/{currentQuestions.length}</span>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-6">
          <div className="text-purple-300 text-sm mb-2 capitalize">{category} Question</div>
          <h2 className="text-xl font-bold text-white mb-6">{question.q}</h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here... Practice answering out loud too!"
            rows="6"
            className="w-full bg-white/10 text-white rounded-lg p-4 resize-none mb-4"
          />

          {/* Tips */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="text-purple-300 text-sm hover:text-purple-200"
          >
            {showTips ? '🔒 Hide Tips' : '💡 Show Tips'}
          </button>

          {showTips && (
            <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
              <div className="text-purple-200 text-sm">{question.tips}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevQuestion}
            className="flex-1 py-3 bg-white/20 text-white rounded-lg"
          >
            ← Previous
          </button>
          <button
            onClick={nextQuestion}
            className="flex-1 py-3 bg-purple-500 text-white font-bold rounded-lg"
          >
            Next →
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{Object.keys(savedAnswers).length}</div>
            <div className="text-white/60 text-sm">Practiced</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{Object.keys(questions).length}</div>
            <div className="text-white/60 text-sm">Categories</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {Object.values(questions).reduce((sum, q) => sum + q.length, 0)}
            </div>
            <div className="text-white/60 text-sm">Total Questions</div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-white/10 backdrop-blur rounded-xl p-4">
          <h3 className="text-white font-bold mb-2">📚 Interview Tips</h3>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Research the company thoroughly before the interview</li>
            <li>• Use the STAR method for behavioral questions</li>
            <li>• Practice your answers out loud, not just in writing</li>
            <li>• Prepare questions to ask the interviewer</li>
            <li>• Follow up with a thank you email after the interview</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
