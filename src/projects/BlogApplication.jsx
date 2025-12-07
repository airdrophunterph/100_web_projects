import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogApplication = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Welcome to My Blog', content: 'This is my first blog post. Thanks for reading!', author: 'Admin', date: '2024-01-15', likes: 5 },
      { id: 2, title: 'Learning React', content: 'React is an amazing library for building user interfaces. Here are some tips...', author: 'Admin', date: '2024-01-16', likes: 12 }
    ];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', author: '' });
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...formData } : p));
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setPosts([newPost, ...posts]);
    }
    
    setFormData({ title: '', content: '', author: '' });
    setShowForm(false);
  };

  const deletePost = (id) => {
    if (confirm('Delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
      setSelectedPost(null);
    }
  };

  const editPost = (post) => {
    setFormData({ title: post.title, content: post.content, author: post.author });
    setEditingPost(post);
    setShowForm(true);
    setSelectedPost(null);
  };

  const likePost = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Application</h1>
          <button
            onClick={() => { setShowForm(!showForm); setEditingPost(null); setFormData({ title: '', content: '', author: '' }); }}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
          >
            {showForm ? 'Cancel' : '+ New Post'}
          </button>
        </div>
        
        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <input
              type="text"
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
            />
            <textarea
              placeholder="Write your content..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-3 resize-none"
            />
            <button type="submit" className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400">
              {editingPost ? 'Update Post' : 'Publish Post'}
            </button>
          </form>
        )}
        
        {/* Post Detail View */}
        {selectedPost && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <button onClick={() => setSelectedPost(null)} className="text-purple-600 mb-4 hover:underline">
              ← Back to posts
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedPost.title}</h2>
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <span>By {selectedPost.author}</span>
              <span className="mx-2">•</span>
              <span>{selectedPost.date}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap mb-6">{selectedPost.content}</p>
            <div className="flex items-center gap-4">
              <button onClick={() => likePost(selectedPost.id)} className="flex items-center text-pink-500 hover:text-pink-600">
                ❤️ {posts.find(p => p.id === selectedPost.id)?.likes || 0}
              </button>
              <button onClick={() => editPost(selectedPost)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => deletePost(selectedPost.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        )}
        
        {/* Posts List */}
        {!selectedPost && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center text-white/60 py-12">No posts yet. Create your first post!</div>
            ) : (
              posts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                  onClick={() => setSelectedPost(post)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2 mb-3">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {post.author} • {post.date}</span>
                    <span className="text-pink-500">❤️ {post.likes}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogApplication;
