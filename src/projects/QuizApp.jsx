import { useState } from 'react';
import { Link } from 'react-router-dom';

const quizzes = {
  javascript: {
    title: 'JavaScript',
    questions: [
      { q: 'What does "DOM" stand for?', options: ['Document Object Model', 'Data Object Model', 'Document Order Model', 'Display Object Management'], answer: 0 },
      { q: 'Which keyword declares a constant in JavaScript?', options: ['var', 'let', 'const', 'constant'], answer: 2 },
      { q: 'What is the output of typeof null?', options: ['null', 'undefined', 'object', 'number'], answer: 2 },
      { q: 'Which method adds an element to the end of an array?', options: ['unshift()', 'push()', 'pop()', 'shift()'], answer: 1 },
      { q: 'What does === compare?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], answer: 2 },
    ]
  },
  react: {
    title: 'React',
    questions: [
      { q: 'What hook is used for side effects?', options: ['useState', 'useEffect', 'useContext', 'useRef'], answer: 1 },
      { q: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], answer: 0 },
      { q: 'How do you pass data to a child component?', options: ['state', 'props', 'context', 'refs'], answer: 1 },
      { q: 'What creates a React app?', options: ['npm init', 'create-react-app', 'react-create', 'init react'], answer: 1 },
      { q: 'What is the virtual DOM?', options: ['A copy of the real DOM', 'A database', 'A CSS framework', 'A testing tool'], answer: 0 },
    ]
  },
  general: {
    title: 'General Knowledge',
    questions: [
      { q: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], answer: 2 },
      { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 1 },
      { q: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
      { q: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Michelangelo'], answer: 2 },
      { q: 'What year did World War II end?', options: ['1943', '1944', '1945', '1946'], answer: 2 },
    ]
  }
};

const QuizApp = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startQuiz = (quizKey) => {
    setSelectedQuiz(quizzes[quizKey]);
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const selectAnswer = (idx) => {
    setSelectedAnswer(idx);
  };

  const nextQuestion = () => {
    setAnswers([...answers, selectedAnswer]);
    setSelectedAnswer(null);
    
    if (currentQ + 1 < selectedQuiz.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, ans, idx) => {
      return score + (ans === selectedQuiz.questions[idx].answer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">🧠 Quiz App</h1>
          <p className="text-white/60 text-center mb-8">Choose a quiz to get started</p>

          <div className="space-y-4">
            {Object.entries(quizzes).map(([key, quiz]) => (
              <button
                key={key}
                onClick={() => startQuiz(key)}
                className="w-full p-6 bg-white/10 backdrop-blur rounded-2xl text-left hover:bg-white/20 transition"
              >
                <h3 className="text-xl font-bold text-white">{quiz.title}</h3>
                <p className="text-white/60">{quiz.questions.length} questions</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '📚'}</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-white/60 mb-6">{selectedQuiz.title}</p>

          <div className="text-5xl font-bold text-white mb-2">{score}/{selectedQuiz.questions.length}</div>
          <div className={`text-xl ${percentage >= 80 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
            {percentage}%
          </div>

          <div className="mt-8 space-y-3">
            <button onClick={() => startQuiz(Object.keys(quizzes).find(k => quizzes[k] === selectedQuiz))} className="w-full py-3 bg-purple-500 text-white rounded-lg font-bold">
              Try Again
            </button>
            <button onClick={resetQuiz} className="w-full py-3 bg-white/20 text-white rounded-lg">
              Choose Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>Question {currentQ + 1}/{selectedQuiz.questions.length}</span>
            <span>{selectedQuiz.title}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all"
              style={{ width: `${((currentQ + 1) / selectedQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">{question.q}</h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className={`w-full p-4 rounded-xl text-left transition ${
                  selectedAnswer === idx 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
          className="w-full py-3 bg-purple-500 text-white rounded-lg font-bold disabled:opacity-50"
        >
          {currentQ + 1 === selectedQuiz.questions.length ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizApp;
