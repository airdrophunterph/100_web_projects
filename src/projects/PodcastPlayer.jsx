import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const podcasts = [
  { id: 1, title: 'Tech Talk Daily', episode: 'The Future of AI', duration: '45:30', host: 'Sarah Tech' },
  { id: 2, title: 'Developer Stories', episode: 'From Zero to Hero', duration: '32:15', host: 'John Code' },
  { id: 3, title: 'Startup Insights', episode: 'Building Your First Company', duration: '58:00', host: 'Mike Business' },
];

const PodcastPlayer = () => {
  const [currentPodcast, setCurrentPodcast] = useState(podcasts[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const transcript = `[00:00] Welcome to today's episode! I'm excited to discuss the future of artificial intelligence.

[01:30] Let's start with what's happening in the industry right now. AI has transformed how we work and live.

[03:45] The key breakthrough this year has been in large language models. These models can understand and generate human-like text.

[06:20] But what does this mean for developers? It means we need to adapt our skills...

[09:00] Here's my prediction for the next five years: AI will become an integral part of every application we build.

[12:30] The tools available today are incredible. From GitHub Copilot to ChatGPT, developers have amazing assistants.

[15:00] Let's talk about the ethical considerations...

[18:45] Now, how can you get started with AI development? First, learn the fundamentals of machine learning.

[22:00] Practice with frameworks like TensorFlow or PyTorch. Build small projects to understand the concepts.

[25:30] Remember, AI is a tool to augment human capabilities, not replace them.

[28:00] That's all for today's episode. Thanks for listening!`;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => Math.min(100, p + (0.1 * playbackSpeed)));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const formatTime = (percent) => {
    const totalSeconds = 45 * 60 + 30; // 45:30
    const currentSeconds = Math.floor((percent / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎙️ Podcast Player</h1>

        {/* Now Playing */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl">
              🎙️
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{currentPodcast.title}</h2>
              <p className="text-white/60">{currentPodcast.episode}</p>
              <p className="text-white/40 text-sm">Host: {currentPodcast.host}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect();
                const percent = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(percent);
              }}
            >
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-white/40 text-sm mt-1">
              <span>{formatTime(progress)}</span>
              <span>{currentPodcast.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={() => setProgress(Math.max(0, progress - 5))} className="text-white/60 text-xl">⏪</button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-2xl text-white"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={() => setProgress(Math.min(100, progress + 5))} className="text-white/60 text-xl">⏩</button>
          </div>

          {/* Speed Control */}
          <div className="flex justify-center gap-2 mt-4">
            {[0.5, 1, 1.5, 2].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-3 py-1 rounded-lg text-sm ${playbackSpeed === speed ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/60'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Transcript Toggle */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full py-3 bg-white/10 text-white rounded-xl mb-4"
        >
          {showTranscript ? '📝 Hide Transcript' : '📝 Show Transcript'}
        </button>

        {/* Transcript */}
        {showTranscript && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <h3 className="text-white font-bold mb-4">Transcript</h3>
            <div className="max-h-64 overflow-y-auto">
              <pre className="text-white/70 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {transcript}
              </pre>
            </div>
          </div>
        )}

        {/* Episode List */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
          <h3 className="text-white font-bold mb-4">Episodes</h3>
          <div className="space-y-2">
            {podcasts.map(podcast => (
              <button
                key={podcast.id}
                onClick={() => { setCurrentPodcast(podcast); setProgress(0); }}
                className={`w-full p-3 rounded-lg text-left ${currentPodcast.id === podcast.id ? 'bg-indigo-500' : 'bg-white/10'}`}
              >
                <div className="text-white font-medium">{podcast.episode}</div>
                <div className="text-white/60 text-sm">{podcast.title} • {podcast.duration}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
