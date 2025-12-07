import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = () => {
    if (!resumeText.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const text = resumeText.toLowerCase();
      const wordCount = resumeText.split(/\s+/).length;
      
      const skills = ['javascript', 'react', 'python', 'node', 'sql', 'aws', 'docker', 'git', 'typescript', 'java']
        .filter(s => text.includes(s));
      
      const actionVerbs = ['developed', 'created', 'managed', 'led', 'designed', 'implemented', 'improved', 'achieved', 'built', 'launched']
        .filter(v => text.includes(v));

      const hasEmail = text.includes('@');
      const hasPhone = /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(text);
      const hasLinkedIn = text.includes('linkedin');
      
      const suggestions = [];
      if (wordCount < 200) suggestions.push('Resume seems too short. Aim for 300-600 words.');
      if (wordCount > 800) suggestions.push('Resume might be too long. Try to keep it concise.');
      if (skills.length < 3) suggestions.push('Consider adding more technical skills.');
      if (actionVerbs.length < 3) suggestions.push('Use more action verbs to describe achievements.');
      if (!hasEmail) suggestions.push('Make sure to include your email address.');
      if (!hasPhone) suggestions.push('Consider adding a phone number.');
      if (!hasLinkedIn) suggestions.push('Adding a LinkedIn profile can boost your resume.');

      const score = Math.min(100, 
        40 + 
        (skills.length * 5) + 
        (actionVerbs.length * 5) + 
        (hasEmail ? 10 : 0) + 
        (hasPhone ? 5 : 0) + 
        (hasLinkedIn ? 5 : 0) +
        (wordCount >= 300 && wordCount <= 600 ? 10 : 0)
      );

      setAnalysis({ score, skills, actionVerbs, wordCount, suggestions, hasEmail, hasPhone, hasLinkedIn });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-emerald-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🤖 Resume Analyzer</h1>
        <p className="text-white/60 text-center mb-8">AI-powered resume feedback</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Paste Your Resume</h2>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              rows="15"
              className="w-full bg-white/10 text-white rounded-lg p-4 resize-none"
            />
            <button
              onClick={analyzeResume}
              disabled={loading || !resumeText.trim()}
              className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? '🔍 Analyzing...' : '🔍 Analyze Resume'}
            </button>
          </div>

          {/* Results */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Analysis Results</h2>
            
            {analysis ? (
              <div className="space-y-6">
                {/* Score */}
                <div className="text-center">
                  <div className={`text-6xl font-bold ${analysis.score >= 80 ? 'text-green-400' : analysis.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {analysis.score}
                  </div>
                  <div className="text-white/60">Resume Score</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-white">{analysis.wordCount}</div>
                    <div className="text-white/60 text-sm">Words</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{analysis.skills.length}</div>
                    <div className="text-white/60 text-sm">Skills Found</div>
                  </div>
                </div>

                {/* Skills */}
                {analysis.skills.length > 0 && (
                  <div>
                    <div className="text-white/60 text-sm mb-2">Skills Detected:</div>
                    <div className="flex flex-wrap gap-2">
                      {analysis.skills.map(s => (
                        <span key={s} className="px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded text-sm capitalize">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Checklist */}
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 ${analysis.hasEmail ? 'text-green-400' : 'text-red-400'}`}>
                    {analysis.hasEmail ? '✅' : '❌'} Email Address
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.hasPhone ? 'text-green-400' : 'text-red-400'}`}>
                    {analysis.hasPhone ? '✅' : '❌'} Phone Number
                  </div>
                  <div className={`flex items-center gap-2 ${analysis.hasLinkedIn ? 'text-green-400' : 'text-red-400'}`}>
                    {analysis.hasLinkedIn ? '✅' : '❌'} LinkedIn Profile
                  </div>
                </div>

                {/* Suggestions */}
                {analysis.suggestions.length > 0 && (
                  <div className="p-4 bg-yellow-500/20 rounded-lg">
                    <div className="text-yellow-400 font-bold mb-2">💡 Suggestions</div>
                    <ul className="text-yellow-200 text-sm space-y-1">
                      {analysis.suggestions.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-white/40 py-12">Paste your resume and click analyze</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
