import { useState } from 'react';
import { Link } from 'react-router-dom';

// Local character data (no API needed)
const charactersData = [
  { id: 1, name: 'Walter White', nickname: 'Heisenberg', status: 'Deceased', occupation: ['High School Chemistry Teacher', 'Meth Manufacturer'], portrayed: 'Bryan Cranston', img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg' },
  { id: 2, name: 'Jesse Pinkman', nickname: 'Cap n Cook', status: 'Alive', occupation: ['Meth Manufacturer'], portrayed: 'Aaron Paul', img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441' },
  { id: 3, name: 'Skyler White', nickname: 'Sky', status: 'Alive', occupation: ['Accountant', 'Car Wash Manager'], portrayed: 'Anna Gunn', img: 'https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg' },
  { id: 4, name: 'Hank Schrader', nickname: 'ASAC Schrader', status: 'Deceased', occupation: ['DEA Agent'], portrayed: 'Dean Norris', img: 'https://vignette.wikia.nocookie.net/breakingbad/images/b/b7/HankS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620014136' },
  { id: 5, name: 'Saul Goodman', nickname: 'Jimmy McGill', status: 'Alive', occupation: ['Lawyer'], portrayed: 'Bob Odenkirk', img: 'https://vignette.wikia.nocookie.net/breakingbad/images/1/16/Saul_Goodman.jpg/revision/latest?cb=20120704065846' },
  { id: 6, name: 'Gustavo Fring', nickname: 'Gus', status: 'Deceased', occupation: ['Drug Kingpin', 'Restaurant Owner'], portrayed: 'Giancarlo Esposito', img: 'https://vignette.wikia.nocookie.net/breakingbad/images/1/1f/Gus_Fring.jpg/revision/latest?cb=20120620015633' },
  { id: 7, name: 'Mike Ehrmantraut', nickname: 'Mike', status: 'Deceased', occupation: ['Hitman', 'Private Investigator'], portrayed: 'Jonathan Banks', img: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_mike-702x1024.jpg' },
  { id: 8, name: 'Marie Schrader', nickname: 'Marie', status: 'Alive', occupation: ['Radiologic Technologist'], portrayed: 'Betsy Brandt', img: 'https://vignette.wikia.nocookie.net/breakingbad/images/d/da/MarieS5.jpg/revision/latest?cb=20120620015349' },
];

const BreakingBadCharacters = () => {
  const [search, setSearch] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCharacters = charactersData.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(search.toLowerCase()) ||
                         char.nickname.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || char.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-lime-900 to-green-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-2" style={{ fontFamily: 'serif' }}>
          Breaking Bad
        </h1>
        <p className="text-white/60 text-center mb-8">Character Directory</p>
        
        {/* Search & Filter */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:border-yellow-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          >
            <option value="all">All Status</option>
            <option value="alive">Alive</option>
            <option value="deceased">Deceased</option>
          </select>
        </div>
        
        {/* Character Modal */}
        {selectedCharacter && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedCharacter(null)}>
            <div className="bg-gray-900 rounded-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedCharacter.img} 
                alt={selectedCharacter.name}
                className="w-full h-64 object-cover object-top"
                onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white">{selectedCharacter.name}</h2>
                <p className="text-yellow-400 mb-4">"{selectedCharacter.nickname}"</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Status:</span>
                    <span className={selectedCharacter.status === 'Alive' ? 'text-green-400' : 'text-red-400'}>
                      {selectedCharacter.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Portrayed by:</span>
                    <span className="text-white">{selectedCharacter.portrayed}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Occupation:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCharacter.occupation.map((occ, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 rounded text-white text-xs">{occ}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedCharacter(null)}
                  className="w-full mt-6 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Characters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredCharacters.map(char => (
            <div 
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className="bg-white/10 backdrop-blur rounded-xl overflow-hidden cursor-pointer hover:bg-white/20 transition group"
            >
              <img 
                src={char.img} 
                alt={char.name}
                className="w-full h-40 object-cover object-top group-hover:scale-105 transition"
                onError={(e) => e.target.src = 'https://via.placeholder.com/200x200?text=No+Image'}
              />
              <div className="p-3">
                <h3 className="font-bold text-white truncate">{char.name}</h3>
                <p className="text-yellow-400 text-sm truncate">{char.nickname}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                  char.status === 'Alive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {char.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCharacters.length === 0 && (
          <div className="text-center text-white/60 py-12">No characters found</div>
        )}
      </div>
    </div>
  );
};

export default BreakingBadCharacters;
