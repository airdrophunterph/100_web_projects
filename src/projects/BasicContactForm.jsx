import { useState } from 'react';
import { Link } from 'react-router-dom';

const BasicContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('contactSubmissions');
    return saved ? JSON.parse(saved) : [];
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      const newSubmission = { ...formData, id: Date.now(), date: new Date().toLocaleString() };
      const updated = [...submissions, newSubmission];
      setSubmissions(updated);
      localStorage.setItem('contactSubmissions', JSON.stringify(updated));
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Form</h1>
        
        {submitted && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-center">
            Message sent successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <div className="mb-4">
            <label className="block text-white/80 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => { setFormData({...formData, name: e.target.value}); setErrors({...errors, name: ''}); }}
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white border ${errors.name ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:border-cyan-400`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-4">
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ''}); }}
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white border ${errors.email ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:border-cyan-400`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-white/80 mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => { setFormData({...formData, message: e.target.value}); setErrors({...errors, message: ''}); }}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg bg-white/20 text-white border ${errors.message ? 'border-red-500' : 'border-white/30'} focus:outline-none focus:border-cyan-400 resize-none`}
              placeholder="Your message..."
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
        
        {submissions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Previous Submissions</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {submissions.slice().reverse().map((sub) => (
                <div key={sub.id} className="bg-white/10 rounded-lg p-3">
                  <div className="text-white font-medium">{sub.name}</div>
                  <div className="text-white/60 text-sm">{sub.email}</div>
                  <div className="text-white/40 text-xs mt-1">{sub.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicContactForm;
