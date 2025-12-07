import { useState } from 'react';
import { Link } from 'react-router-dom';

const QuizMaker = () => {
  const [mode, setMode] = useState('create'); // create, preview, results
  const [quiz, setQuiz] = useState({
    title: 'What Type of Learner Are You?',
    questions: [
      {
        id: 1,
        question: 'How do you prefer to study?',
        options: [
          { text: 'Reading books and notes', type: 'visual' },
          { text: 'Listening to lectures or podcasts', type: 'auditory' },
          { text: 'Hands-on practice and experiments', type: 'kinesthetic' }
        ]
      },
      {
        id: 2,
        question: 'When learning something new, you...',
        options: [
          { text: 'Watch videos or diagrams', type: 'visual' },
          { text: 'Prefer verbal explanations', type: 'auditory' },
          { text: 'Jump right in and try it', type: 'kinesthetic' }
        ]
      }
    ],
    results: {
      visual: { title: '👁️ Visual Learner', desc: 'You learn best through images, diagrams, and visual aids.' },
      auditory: { title: '👂 Auditory Learner', desc: 'You learn best through listening and verbal instruction.' },
      kinesthetic: { title: '🤲 Kinesthetic Learner', desc: 'You learn best through hands-on experience and practice.' }
    }
  });
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);

  const handleAnswer = (type) => {
    setAnswers({ ...answers, [currentQ]: type });
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setMode('results');
    }
  };

  const getResult = () => {
    const counts = {};
    Object.values(answers).forEach(type => {
      counts[type] = (counts[type] || 0) + 1;
    });
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return winner ? quiz.results[winner[0]] : null;
  };

  const restart = () => {
    setAnswers({});
    setCurrentQ(0);
    setMode('preview');
  };

  if (mode === 'results') {
    const result = getResult();
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">← Back</Link>
        
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Your Result</h1>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <div className="text-6xl mb-4">{result?.title.split(' ')[0]}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{result?.title}</h2>
            <p className="text-white/80 mb-6">{result?.desc}</p>
            
            <button onClick={restart} className="px-6 py-3 bg-pink-500 text-white rounded-lg font-bold">
              Take Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'preview') {
    const q = quiz.questions[currentQ];
    const progress = ((currentQ + 1) / quiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">← Back</Link>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-white text-center mb-4">{quiz.title}</h1>
          
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-white/60 text-sm mb-1">
              <span>Question {currentQ + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-xl text-white font-bold mb-6">{q.question}</h2>
            
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎭 Quiz Maker</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Sample Quiz Ready!</h2>
          <p className="text-white/60 mb-6">"{quiz.title}" with {quiz.questions.length} questions</p>
          
          <button
            onClick={() => setMode('preview')}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg"
          >
            ▶️ Take This Quiz
          </button>
        </div>

        <p className="text-white/40 text-center text-sm mt-6">
          Full quiz creation editor would go here in a complete implementation.
        </p>
      </div>
    </div>
  );
};

export default QuizMaker;
