import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FlashcardsApp = () => {
  const [decks, setDecks] = useState(() => {
    const saved = localStorage.getItem('flashcardDecks');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'JavaScript Basics', cards: [
        { id: 1, front: 'What is a closure?', back: 'A function that has access to variables from its outer scope' },
        { id: 2, front: 'What does === check?', back: 'Value and type equality' },
        { id: 3, front: 'What is hoisting?', back: 'Moving declarations to the top of the scope' },
      ]}
    ];
  });
  const [activeDeck, setActiveDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newDeck, setNewDeck] = useState('');

  useEffect(() => {
    localStorage.setItem('flashcardDecks', JSON.stringify(decks));
  }, [decks]);

  const addDeck = () => {
    if (!newDeck.trim()) return;
    setDecks([...decks, { id: Date.now(), name: newDeck, cards: [] }]);
    setNewDeck('');
  };

  const addCard = (deckId, front, back) => {
    setDecks(decks.map(d => 
      d.id === deckId 
        ? { ...d, cards: [...d.cards, { id: Date.now(), front, back }] }
        : d
    ));
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((currentCard + 1) % activeDeck.cards.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((currentCard - 1 + activeDeck.cards.length) % activeDeck.cards.length);
    }, 200);
  };

  if (activeDeck) {
    const card = activeDeck.cards[currentCard];
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4">
        <button onClick={() => { setActiveDeck(null); setCurrentCard(0); setIsFlipped(false); }} className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Decks
        </button>

        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-white text-center mb-2">{activeDeck.name}</h1>
          <p className="text-white/60 text-center mb-8">Card {currentCard + 1} of {activeDeck.cards.length}</p>

          {activeDeck.cards.length > 0 ? (
            <>
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative h-64 cursor-pointer transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                <div className={`absolute inset-0 bg-white rounded-2xl p-8 flex items-center justify-center text-center shadow-xl transition-all duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                  <p className="text-xl text-gray-800">{card?.front}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 flex items-center justify-center text-center shadow-xl transition-all duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-xl text-white">{card?.back}</p>
                </div>
              </div>

              <div className="text-center text-white/40 text-sm mt-4 mb-6">Click card to flip</div>

              <div className="flex gap-4 justify-center">
                <button onClick={prevCard} className="px-6 py-3 bg-white/20 text-white rounded-lg">← Previous</button>
                <button onClick={nextCard} className="px-6 py-3 bg-purple-500 text-white rounded-lg">Next →</button>
              </div>
            </>
          ) : (
            <div className="text-center text-white/40 py-12">No cards in this deck</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📚 Flashcards</h1>

        {/* Add Deck */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newDeck}
            onChange={(e) => setNewDeck(e.target.value)}
            placeholder="New deck name..."
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          />
          <button onClick={addDeck} className="px-6 py-3 bg-purple-500 text-white rounded-lg">+ Add</button>
        </div>

        {/* Decks */}
        <div className="space-y-4">
          {decks.map(deck => (
            <div
              key={deck.id}
              onClick={() => setActiveDeck(deck)}
              className="bg-white/10 backdrop-blur rounded-xl p-6 cursor-pointer hover:bg-white/20 transition"
            >
              <h3 className="text-white font-bold text-lg">{deck.name}</h3>
              <p className="text-white/60">{deck.cards.length} cards</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsApp;
