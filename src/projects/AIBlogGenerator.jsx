import { useState } from 'react';
import { Link } from 'react-router-dom';

const templates = {
  howTo: "# How to {topic}\n\nLearning {topic} can seem challenging at first, but with the right approach, you'll master it in no time.\n\n## Getting Started\n\nBefore diving in, make sure you have the basics covered...\n\n## Step 1: Understand the Fundamentals\n\nThe key to mastering {topic} is understanding its core concepts...\n\n## Step 2: Practice Regularly\n\nConsistent practice is essential when learning {topic}...\n\n## Step 3: Apply What You've Learned\n\nReal-world application is where true learning happens...\n\n## Conclusion\n\nWith dedication and practice, you'll become proficient in {topic} before you know it!",
  listicle: "# Top 10 Things About {topic}\n\n{topic} is fascinating! Here's why...\n\n## 1. It's More Important Than You Think\n\nMany people underestimate the impact of {topic}...\n\n## 2. There's Always More to Learn\n\nThe world of {topic} is constantly evolving...\n\n## 3. Community Matters\n\nConnecting with others interested in {topic} can accelerate your growth...\n\n## 4. Start Small\n\nDon't try to master everything at once...\n\n## 5. Mistakes Are Part of the Process\n\nEveryone makes mistakes when exploring {topic}...",
  review: "# {topic} Review: An Honest Assessment\n\n## Overview\n\nIn this review, we'll take a deep dive into {topic}...\n\n## The Good\n\nThere's a lot to love about {topic}:\n- Impressive features\n- Great value\n- User-friendly\n\n## The Not So Good\n\nHowever, there are some areas for improvement...\n\n## Final Verdict\n\nOverall, {topic} earns a solid recommendation from us...",
};

const AIBlogGenerator = () => {
  const [topic, setTopic] = useState('');
  const [template, setTemplate] = useState('howTo');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = () => {
    if (!topic.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const content = templates[template].replace(/{topic}/g, topic);
      setGeneratedContent(content);
      setLoading(false);
    }, 1500);
  };

  const copyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">✍️ AI Blog Generator</h1>
        <p className="text-white/60 text-center mb-8">Generate blog content with AI assistance</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Configure</h2>
            
            <div className="mb-4">
              <label className="block text-white/60 mb-2">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., React Hooks, Machine Learning, Cooking..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white/60 mb-2">Template</label>
              <div className="space-y-2">
                {[
                  { id: 'howTo', label: '📖 How-To Guide', desc: 'Step-by-step tutorial' },
                  { id: 'listicle', label: '📝 Listicle', desc: 'Top 10 format' },
                  { id: 'review', label: '⭐ Review', desc: 'Product/service review' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`w-full p-3 rounded-lg text-left ${template === t.id ? 'bg-purple-500' : 'bg-white/10'}`}
                  >
                    <div className="text-white font-medium">{t.label}</div>
                    <div className="text-white/60 text-sm">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateContent}
              disabled={loading || !topic.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg disabled:opacity-50"
            >
              {loading ? '🤖 Generating...' : '🤖 Generate Content'}
            </button>
          </div>

          {/* Output */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold">Generated Content</h2>
              {generatedContent && (
                <button onClick={copyContent} className="text-white/60 hover:text-white">📋 Copy</button>
              )}
            </div>
            
            {generatedContent ? (
              <div className="bg-white rounded-lg p-4 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-gray-800 text-sm font-sans">{generatedContent}</pre>
              </div>
            ) : (
              <div className="text-center text-white/40 py-12">
                Enter a topic and click generate
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogGenerator;
