import { useState } from 'react';
import { Link } from 'react-router-dom';

const YoutubeSummarizer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const summarize = () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    
    // Simulate AI summarization
    setTimeout(() => {
      setResult({
        title: 'Sample Video Title - How to Learn Programming',
        duration: '15:42',
        thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        summary: `This video covers the fundamentals of learning programming effectively:

**Key Points:**
1. Start with the basics - Choose a beginner-friendly language like Python or JavaScript
2. Practice daily - Consistency is more important than long study sessions
3. Build projects - Apply what you learn by creating real applications
4. Read documentation - Learn to navigate official docs
5. Join communities - Connect with other developers for support

**Timestamps:**
- 0:00 Introduction
- 2:15 Choosing your first language
- 5:30 Setting up your development environment
- 8:45 Writing your first program
- 12:00 Resources for continued learning

**Conclusion:**
The best way to learn programming is through hands-on practice. Start small, be patient, and don't be afraid to make mistakes.`,
        keyPoints: [
          'Choose a beginner-friendly programming language',
          'Practice coding every day for at least 30 minutes',
          'Build real projects to apply your knowledge',
          'Join online communities for support',
          'Read official documentation regularly'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">📺 YouTube Summarizer</h1>
        <p className="text-white/60 text-center mb-8">AI-powered video summaries</p>

        {/* URL Input */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube video URL..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <button
              onClick={summarize}
              disabled={loading || !url}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? '🔄 Analyzing...' : '🤖 Summarize'}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center">
            <div className="text-4xl animate-bounce mb-4">🤖</div>
            <div className="text-white">Analyzing video content...</div>
            <div className="text-white/60 text-sm mt-2">This may take a few moments</div>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
            {/* Video Info */}
            <div className="flex gap-4 p-4 bg-white/10">
              <img src={result.thumbnail} alt="Thumbnail" className="w-32 rounded-lg" />
              <div>
                <h2 className="text-white font-bold">{result.title}</h2>
                <div className="text-white/60 text-sm mt-1">Duration: {result.duration}</div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-6">
              <h3 className="text-white font-bold mb-4">📝 Summary</h3>
              <div className="bg-white/10 rounded-xl p-4 mb-6">
                <pre className="text-white/80 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {result.summary}
                </pre>
              </div>

              {/* Key Points */}
              <h3 className="text-white font-bold mb-4">💡 Key Takeaways</h3>
              <div className="space-y-2">
                {result.keyPoints.map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-red-400">✓</span>
                    <span className="text-white/80">{point}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => navigator.clipboard.writeText(result.summary)}
                  className="flex-1 py-2 bg-white/20 text-white rounded-lg"
                >
                  📋 Copy Summary
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-2 bg-white/20 text-white rounded-lg"
                >
                  🔄 Analyze Another
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-white/40 text-center text-sm mt-6">
          Demo: Summaries are simulated. Real implementation requires YouTube API and AI backend.
        </p>
      </div>
    </div>
  );
};

export default YoutubeSummarizer;
