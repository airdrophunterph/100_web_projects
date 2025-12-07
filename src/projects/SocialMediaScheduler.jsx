import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SocialMediaScheduler = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('scheduledPosts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPost, setNewPost] = useState({ content: '', platform: 'twitter', scheduledTime: '' });

  useEffect(() => {
    localStorage.setItem('scheduledPosts', JSON.stringify(posts));
  }, [posts]);

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
  ];

  const addPost = (e) => {
    e.preventDefault();
    if (!newPost.content || !newPost.scheduledTime) return;
    
    setPosts([...posts, { 
      ...newPost, 
      id: Date.now(), 
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }]);
    setNewPost({ content: '', platform: 'twitter', scheduledTime: '' });
  };

  const deletePost = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const getPlatform = (id) => platforms.find(p => p.id === id);

  const sortedPosts = [...posts].sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📅 Post Scheduler</h1>

        {/* Create Post */}
        <form onSubmit={addPost} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="What do you want to share?"
            rows="3"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4 resize-none"
          />
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-white/60 text-sm mb-2">Platform</label>
              <div className="flex gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setNewPost({ ...newPost, platform: p.id })}
                    className={`p-2 rounded-lg ${newPost.platform === p.id ? p.color : 'bg-white/10'} text-xl`}
                  >
                    {p.icon}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Schedule Time</label>
              <input
                type="datetime-local"
                value={newPost.scheduledTime}
                onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-lg">
            📅 Schedule Post
          </button>
        </form>

        {/* Scheduled Posts */}
        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center text-white/40 py-12">No scheduled posts yet</div>
          ) : (
            sortedPosts.map(post => {
              const platform = getPlatform(post.platform);
              const isPast = new Date(post.scheduledTime) < new Date();
              
              return (
                <div key={post.id} className={`bg-white/10 backdrop-blur rounded-xl p-4 ${isPast ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 ${platform?.color} rounded-lg flex items-center justify-center`}>
                        {platform?.icon}
                      </span>
                      <span className="text-white font-medium">{platform?.name}</span>
                    </div>
                    <button onClick={() => deletePost(post.id)} className="text-red-400 hover:text-red-300">
                      🗑️
                    </button>
                  </div>
                  
                  <p className="text-white mb-3">{post.content}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className={isPast ? 'text-green-400' : 'text-white/60'}>
                      {isPast ? '✅ Posted' : '⏰ Scheduled'}: {new Date(post.scheduledTime).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaScheduler;
