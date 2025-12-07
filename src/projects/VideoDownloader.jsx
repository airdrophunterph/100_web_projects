import { useState } from 'react';
import { Link } from 'react-router-dom';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  const analyzeUrl = () => {
    if (!url) return;
    setLoading(true);
    
    // Simulate video analysis (in real app, you'd use a backend API)
    setTimeout(() => {
      const mockInfo = {
        title: 'Sample Video Title - Amazing Content',
        thumbnail: '🎬',
        duration: '10:35',
        platform: url.includes('youtube') ? 'YouTube' : url.includes('vimeo') ? 'Vimeo' : 'Unknown',
        qualities: ['1080p HD', '720p HD', '480p', '360p', 'Audio Only'],
      };
      setVideoInfo(mockInfo);
      setLoading(false);
    }, 1500);
  };

  const simulateDownload = (quality) => {
    alert(`In a real application, this would download the video in ${quality}.\n\nNote: Video downloading requires a backend service due to browser limitations and platform policies.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">📥 Video Downloader</h1>
        <p className="text-white/60 text-center mb-8">Demo - Requires backend for actual downloads</p>

        {/* URL Input */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL here..."
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
          />
          <button
            onClick={analyzeUrl}
            disabled={!url || loading}
            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-lg disabled:opacity-50"
          >
            {loading ? '🔍 Analyzing...' : '🔍 Analyze Video'}
          </button>
        </div>

        {/* Supported Platforms */}
        <div className="flex justify-center gap-4 mb-6">
          {['YouTube', 'Vimeo', 'Facebook', 'Twitter'].map(platform => (
            <div key={platform} className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl mb-1">
                {platform === 'YouTube' ? '📺' : platform === 'Vimeo' ? '🎬' : platform === 'Facebook' ? '📘' : '🐦'}
              </div>
              <div className="text-white/40 text-xs">{platform}</div>
            </div>
          ))}
        </div>

        {/* Video Info */}
        {videoInfo && (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex gap-4 mb-6">
              <div className="w-32 h-20 bg-white/20 rounded-lg flex items-center justify-center text-4xl">
                {videoInfo.thumbnail}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold line-clamp-2">{videoInfo.title}</h3>
                <div className="flex gap-4 mt-2 text-white/60 text-sm">
                  <span>⏱️ {videoInfo.duration}</span>
                  <span>📺 {videoInfo.platform}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {videoInfo.qualities.map((quality, i) => (
                <button
                  key={quality}
                  onClick={() => simulateDownload(quality)}
                  className={`w-full p-3 rounded-lg flex items-center justify-between ${
                    i === 0 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-white/10 hover:bg-white/20'
                  } text-white transition`}
                >
                  <span>{quality}</span>
                  <span>⬇️</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-500/20 rounded-xl">
          <p className="text-yellow-300 text-sm text-center">
            ⚠️ This is a demo. Actual video downloading requires a backend service and must comply with platform terms of service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;
