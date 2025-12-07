import { useState } from 'react';
import { Link } from 'react-router-dom';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const createDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

const getCardValue = (cards) => {
  let value = 0;
  let aces = 0;
  
  for (let card of cards) {
    if (card.value === 'A') {
      aces++;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }
  
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }
  
  return value;
};

const Card = ({ card, hidden }) => (
  <div className={`w-16 h-24 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg ${
    hidden ? 'bg-blue-600' : 'bg-white'
  } ${card && !hidden && (card.suit === '♥' || card.suit === '♦') ? 'text-red-500' : 'text-gray-800'}`}>
    {hidden ? '?' : `${card.value}${card.suit}`}
  </div>
);

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('betting'); // betting, playing, dealerTurn, ended
  const [message, setMessage] = useState('Place your bet to start!');
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('blackjackBalance');
    return saved ? parseInt(saved) : 1000;
  });
  const [bet, setBet] = useState(100);

  const saveBalance = (newBalance) => {
    setBalance(newBalance);
    localStorage.setItem('blackjackBalance', newBalance.toString());
  };

  const startGame = () => {
    if (bet > balance) {
      setMessage('Not enough balance!');
      return;
    }
    
    const newDeck = createDeck();
    const pHand = [newDeck.pop(), newDeck.pop()];
    const dHand = [newDeck.pop(), newDeck.pop()];
    
    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setGameState('playing');
    
    if (getCardValue(pHand) === 21) {
      endGame(dHand, pHand, newDeck, 'Blackjack!');
    } else {
      setMessage('Hit or Stand?');
    }
  };

  const hit = () => {
    const newCard = deck.pop();
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck([...deck]);
    
    if (getCardValue(newHand) > 21) {
      setGameState('ended');
      setMessage('Bust! You lose.');
      saveBalance(balance - bet);
    }
  };

  const stand = () => {
    setGameState('dealerTurn');
    dealerPlay();
  };

  const dealerPlay = () => {
    let currentDeck = [...deck];
    let dHand = [...dealerHand];
    
    while (getCardValue(dHand) < 17) {
      dHand.push(currentDeck.pop());
    }
    
    setDealerHand(dHand);
    setDeck(currentDeck);
    endGame(dHand, playerHand, currentDeck);
  };

  const endGame = (dHand, pHand) => {
    const playerValue = getCardValue(pHand);
    const dealerValue = getCardValue(dHand);
    
    setGameState('ended');
    
    if (playerValue > 21) {
      setMessage('Bust! You lose.');
      saveBalance(balance - bet);
    } else if (dealerValue > 21) {
      setMessage('Dealer busts! You win!');
      saveBalance(balance + bet);
    } else if (playerValue > dealerValue) {
      setMessage('You win!');
      saveBalance(balance + bet);
    } else if (dealerValue > playerValue) {
      setMessage('Dealer wins!');
      saveBalance(balance - bet);
    } else {
      setMessage('Push! It\'s a tie.');
    }
  };

  const resetGame = () => {
    setGameState('betting');
    setPlayerHand([]);
    setDealerHand([]);
    setMessage('Place your bet to start!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-4">Blackjack</h1>
        
        {/* Balance */}
        <div className="text-center mb-4">
          <span className="text-yellow-400 font-bold text-xl">${balance}</span>
        </div>
        
        {/* Dealer Hand */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
          <div className="text-white/60 text-sm mb-2">
            Dealer {gameState !== 'playing' && dealerHand.length > 0 ? `(${getCardValue(dealerHand)})` : ''}
          </div>
          <div className="flex gap-2 justify-center min-h-[96px]">
            {dealerHand.map((card, i) => (
              <Card key={i} card={card} hidden={gameState === 'playing' && i === 1} />
            ))}
          </div>
        </div>
        
        {/* Player Hand */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4">
          <div className="text-white/60 text-sm mb-2">
            You {playerHand.length > 0 ? `(${getCardValue(playerHand)})` : ''}
          </div>
          <div className="flex gap-2 justify-center flex-wrap min-h-[96px]">
            {playerHand.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
        
        {/* Message */}
        <div className="text-center text-white text-xl font-bold mb-4">{message}</div>
        
        {/* Controls */}
        {gameState === 'betting' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setBet(Math.max(10, bet - 10))} className="w-10 h-10 bg-white/20 rounded-full text-white text-xl">-</button>
              <span className="text-white text-2xl font-bold w-24 text-center">${bet}</span>
              <button onClick={() => setBet(Math.min(balance, bet + 10))} className="w-10 h-10 bg-white/20 rounded-full text-white text-xl">+</button>
            </div>
            <button onClick={startGame} className="w-full py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400">
              Deal
            </button>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="flex gap-4">
            <button onClick={hit} className="flex-1 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400">Hit</button>
            <button onClick={stand} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400">Stand</button>
          </div>
        )}
        
        {gameState === 'ended' && (
          <button onClick={resetGame} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400">
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default BlackjackGame;
