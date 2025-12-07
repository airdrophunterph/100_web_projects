import { useState } from 'react';
import { Link } from 'react-router-dom';

// Local movie database
const moviesDB = [
  { id: 1, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Drama", poster: "🎬", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
  { id: 2, title: "The Godfather", year: 1972, rating: 9.2, genre: "Crime", poster: "🎭", plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
  { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Action", poster: "🦇", plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests." },
  { id: 4, title: "Inception", year: 2010, rating: 8.8, genre: "Sci-Fi", poster: "🌀", plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea." },
  { id: 5, title: "Forrest Gump", year: 1994, rating: 8.8, genre: "Drama", poster: "🏃", plot: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75." },
  { id: 6, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", poster: "💊", plot: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers." },
  { id: 7, title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci-Fi", poster: "🚀", plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 8, title: "Parasite", year: 2019, rating: 8.6, genre: "Thriller", poster: "🏠", plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
  { id: 9, title: "The Lord of the Rings", year: 2003, rating: 8.9, genre: "Fantasy", poster: "💍", plot: "A meek Hobbit and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth." },
  { id: 10, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Crime", poster: "💼", plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption." },
];

const genres = ["All", "Drama", "Crime", "Action", "Sci-Fi", "Thriller", "Fantasy"];

const FilmFinder = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('filmWatchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredMovies = moviesDB.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const toggleWatchlist = (movie) => {
    const isInList = watchlist.some(m => m.id === movie.id);
    const updated = isInList 
      ? watchlist.filter(m => m.id !== movie.id)
      : [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem('filmWatchlist', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🎬 Film Finder</h1>
        <p className="text-white/60 text-center mb-8">Discover your next favorite movie</p>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedGenre === genre 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Movie Modal */}
        {selectedMovie && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMovie(null)}>
            <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
              <div className="text-6xl text-center mb-4">{selectedMovie.poster}</div>
              <h2 className="text-2xl font-bold text-white text-center">{selectedMovie.title}</h2>
              <div className="flex justify-center gap-4 my-4 text-sm">
                <span className="text-amber-400">⭐ {selectedMovie.rating}</span>
                <span className="text-white/60">{selectedMovie.year}</span>
                <span className="px-2 py-0.5 bg-white/10 rounded">{selectedMovie.genre}</span>
              </div>
              <p className="text-white/70 text-center mb-6">{selectedMovie.plot}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWatchlist(selectedMovie)}
                  className={`flex-1 py-3 rounded-lg font-bold ${
                    watchlist.some(m => m.id === selectedMovie.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {watchlist.some(m => m.id === selectedMovie.id) ? '✓ In Watchlist' : '+ Add to Watchlist'}
                </button>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="px-4 py-3 bg-white/10 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="bg-white/10 backdrop-blur rounded-xl p-4 cursor-pointer hover:bg-white/20 transition"
            >
              <div className="text-5xl text-center mb-3">{movie.poster}</div>
              <h3 className="text-white font-medium text-sm text-center truncate">{movie.title}</h3>
              <div className="flex justify-center gap-2 mt-2 text-xs">
                <span className="text-amber-400">⭐ {movie.rating}</span>
                <span className="text-white/40">{movie.year}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Watchlist */}
        {watchlist.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">📋 My Watchlist ({watchlist.length})</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {watchlist.map(movie => (
                <div key={movie.id} className="flex-shrink-0 text-center">
                  <div className="text-3xl mb-1">{movie.poster}</div>
                  <div className="text-white text-xs w-16 truncate">{movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmFinder;
