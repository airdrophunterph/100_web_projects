import { useState } from 'react';
import { Link } from 'react-router-dom';

const SurveyCreator = () => {
  const [mode, setMode] = useState('create'); // create, preview, results
  const [survey, setSurvey] = useState({
    title: 'Customer Satisfaction Survey',
    questions: [
      { id: 1, type: 'rating', text: 'How satisfied are you with our service?', options: [1, 2, 3, 4, 5] },
      { id: 2, type: 'multiple', text: 'Which features do you use most?', options: ['Dashboard', 'Reports', 'Analytics', 'Settings'] },
      { id: 3, type: 'text', text: 'Any additional feedback?' }
    ]
  });
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleResponse = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const submitSurvey = () => {
    setSubmitted(true);
    setTimeout(() => setMode('results'), 1000);
  };

  if (mode === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">← Back</Link>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">Survey Results</h1>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="text-6xl text-center mb-4">📊</div>
            <h2 className="text-xl font-bold text-white text-center mb-6">Thank you for your feedback!</h2>
            
            <div className="space-y-4">
              {survey.questions.map(q => (
                <div key={q.id} className="bg-white/10 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-1">{q.text}</div>
                  <div className="text-white font-bold">
                    {responses[q.id] || 'Not answered'}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setMode('create'); setResponses({}); setSubmitted(false); }}
              className="w-full mt-6 py-3 bg-teal-500 text-white rounded-lg font-bold"
            >
              Create New Survey
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
        <button onClick={() => setMode('create')} className="inline-flex items-center text-white/80 hover:text-white mb-6">← Back to Editor</button>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">{survey.title}</h1>
          
          <div className="space-y-6">
            {survey.questions.map((q, idx) => (
              <div key={q.id} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <div className="text-white/60 text-sm mb-2">Question {idx + 1}</div>
                <h3 className="text-white font-bold mb-4">{q.text}</h3>
                
                {q.type === 'rating' && (
                  <div className="flex gap-2 justify-center">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleResponse(q.id, opt)}
                        className={`w-12 h-12 rounded-lg text-lg font-bold ${responses[q.id] === opt ? 'bg-teal-500 text-white' : 'bg-white/20 text-white'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'multiple' && (
                  <div className="space-y-2">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleResponse(q.id, opt)}
                        className={`w-full p-3 rounded-lg text-left ${responses[q.id] === opt ? 'bg-teal-500 text-white' : 'bg-white/20 text-white'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea
                    value={responses[q.id] || ''}
                    onChange={(e) => handleResponse(q.id, e.target.value)}
                    placeholder="Your answer..."
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 resize-none"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={submitSurvey}
            disabled={submitted}
            className="w-full mt-6 py-3 bg-teal-500 text-white rounded-lg font-bold disabled:opacity-50"
          >
            {submitted ? '✓ Submitted!' : 'Submit Survey'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📋 Survey Creator</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Sample Survey Ready!</h2>
          <p className="text-white/60 mb-2">"{survey.title}"</p>
          <p className="text-white/40 mb-6">{survey.questions.length} questions</p>
          
          <button
            onClick={() => setMode('preview')}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg"
          >
            ▶️ Preview & Take Survey
          </button>
        </div>

        <p className="text-white/40 text-center text-sm mt-6">
          Full survey editor would be available in a complete implementation.
        </p>
      </div>
    </div>
  );
};

export default SurveyCreator;
