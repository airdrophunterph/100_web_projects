import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Watchlist = () => {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem('movieWatchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [newMovie, setNewMovie] = useState({ title: '', year: '', genre: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title) return;
    
    const movie = {
      id: Date.now(),
      ...newMovie,
      watched: false,
      rating: 0,
      addedAt: new Date().toLocaleDateString()
    };
    
    setMovies([movie, ...movies]);
    setNewMovie({ title: '', year: '', genre: '' });
  };

  const toggleWatched = (id) => {
    setMovies(movies.map(m => m.id === id ? { ...m, watched: !m.watched } : m));
  };

  const setRating = (id, rating) => {
    setMovies(movies.map(m => m.id === id ? { ...m, rating, watched: true } : m));
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter(m => m.id !== id));
  };

  const filteredMovies = movies.filter(m => {
    if (filter === 'watched') return m.watched;
    if (filter === 'unwatched') return !m.watched;
    return true;
  });

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🎬 Movie Watchlist</h1>

        {/* Add Form */}
        <form onSubmit={addMovie} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              placeholder="Movie title"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <input
              type="text"
              placeholder="Year"
              value={newMovie.year}
              onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <select
              value={newMovie.genre}
              onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            >
              <option value="" className="bg-gray-800">Genre</option>
              {genres.map(g => <option key={g} value={g} className="bg-gray-800">{g}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-red-500 text-white font-bold rounded-lg">
            + Add Movie
          </button>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{movies.length}</div>
            <div className="text-white/60 text-sm">Total</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{movies.filter(m => m.watched).length}</div>
            <div className="text-white/60 text-sm">Watched</div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{movies.filter(m => !m.watched).length}</div>
            <div className="text-white/60 text-sm">To Watch</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {['all', 'unwatched', 'watched'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Movies List */}
        <div className="space-y-3">
          {filteredMovies.map(movie => (
            <div key={movie.id} className={`bg-white/10 backdrop-blur rounded-xl p-4 ${movie.watched ? 'opacity-70' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-white ${movie.watched ? 'line-through' : ''}`}>
                    {movie.title}
                  </h3>
                  <div className="flex gap-2 text-sm text-white/60">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.genre && <span className="px-2 py-0.5 bg-white/10 rounded">{movie.genre}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleWatched(movie.id)} className="text-xl">
                    {movie.watched ? '✅' : '⬜'}
                  </button>
                  <button onClick={() => deleteMovie(movie.id)} className="text-red-400">🗑️</button>
                </div>
              </div>
              {/* Rating */}
              <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(movie.id, star)}
                    className={star <= movie.rating ? 'text-yellow-400' : 'text-white/30'}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center text-white/40 py-12">No movies in this list</div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
