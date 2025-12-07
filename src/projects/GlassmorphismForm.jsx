import { useState } from 'react';
import { Link } from 'react-router-dom';

const GlassmorphismForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLogin, setIsLogin] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-white/60 text-center mb-8">
                {isLogin ? 'Sign in to continue' : 'Sign up to get started'}
              </p>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 backdrop-blur rounded-xl border border-green-500/30 text-green-300 text-center">
                  ✓ {isLogin ? 'Login successful!' : 'Account created!'}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-4">
                    <label className="block text-white/80 text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                    placeholder="••••••••"
                  />
                </div>
                
                {!isLogin && (
                  <div className="mb-6">
                    <label className="block text-white/80 text-sm mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition"
                      placeholder="••••••••"
                    />
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition shadow-lg shadow-purple-500/30"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <span className="text-white/60">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
              
              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/40">Or continue with</span>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white hover:bg-white/20 transition">
                    Google
                  </button>
                  <button className="flex-1 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white hover:bg-white/20 transition">
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default GlassmorphismForm;
