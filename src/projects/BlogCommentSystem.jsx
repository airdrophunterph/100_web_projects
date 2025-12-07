import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogCommentSystem = () => {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('blogComments');
    return saved ? JSON.parse(saved) : [
      { id: 1, author: 'John Doe', text: 'Great article! Very informative.', date: '2024-01-15', likes: 5, replies: [] },
      { id: 2, author: 'Jane Smith', text: 'Thanks for sharing this. Really helped me understand the topic better.', date: '2024-01-16', likes: 3, replies: [
        { id: 3, author: 'Author', text: 'Glad you found it helpful!', date: '2024-01-16' }
      ] },
    ];
  });
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }, [comments]);

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.text.trim()) return;
    
    setComments([...comments, {
      id: Date.now(),
      ...newComment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      replies: []
    }]);
    setNewComment({ author: '', text: '' });
  };

  const addReply = (commentId) => {
    if (!replyText.trim()) return;
    
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now(),
            author: 'You',
            text: replyText,
            date: new Date().toLocaleDateString()
          }]
        };
      }
      return c;
    }));
    setReplyText('');
    setReplyingTo(null);
  };

  const likeComment = (id) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  const deleteComment = (id) => {
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-sky-900 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💬 Comment System</h1>

        {/* Sample Blog Post */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Understanding React Hooks</h2>
          <p className="text-gray-600 mb-4">A comprehensive guide to using React Hooks effectively in your applications...</p>
          <div className="text-gray-400 text-sm">Posted on January 15, 2024</div>
        </div>

        {/* Comment Form */}
        <form onSubmit={addComment} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">Leave a Comment</h3>
          <input
            type="text"
            placeholder="Your name"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-3"
          />
          <textarea
            placeholder="Write your comment..."
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            rows="3"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 mb-3 resize-none"
          />
          <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold">
            Post Comment
          </button>
        </form>

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="text-white font-bold">{comments.length} Comments</h3>
          
          {comments.map(comment => (
            <div key={comment.id} className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-white font-bold">{comment.author}</span>
                  <span className="text-white/40 text-sm ml-2">{comment.date}</span>
                </div>
                <button onClick={() => deleteComment(comment.id)} className="text-red-400 text-sm">Delete</button>
              </div>
              
              <p className="text-white/80 mb-3">{comment.text}</p>
              
              <div className="flex gap-4">
                <button onClick={() => likeComment(comment.id)} className="text-white/60 hover:text-white text-sm">
                  ❤️ {comment.likes}
                </button>
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  💬 Reply
                </button>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-3 border-l-2 border-white/20 pl-4">
                  {comment.replies.map(reply => (
                    <div key={reply.id}>
                      <span className="text-white font-bold text-sm">{reply.author}</span>
                      <span className="text-white/40 text-xs ml-2">{reply.date}</span>
                      <p className="text-white/70 text-sm">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === comment.id && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 text-sm"
                  />
                  <button
                    onClick={() => addReply(comment.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCommentSystem;
