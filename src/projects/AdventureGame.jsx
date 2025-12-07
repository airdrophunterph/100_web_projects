import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdventureGame = () => {
  const [gameState, setGameState] = useState({
    location: 'start',
    inventory: [],
    health: 100,
    gold: 0,
    gameOver: false,
    message: ''
  });

  const locations = {
    start: {
      description: "You stand at the entrance of a dark cave. The wind howls behind you, pushing you forward. To the NORTH lies darkness. To the EAST, you see a faint light.",
      actions: {
        north: { next: 'cave', message: 'You venture into the darkness...' },
        east: { next: 'forest', message: 'You head towards the light...' },
        look: { message: 'You see moss on the walls and old footprints leading north.' }
      }
    },
    cave: {
      description: "The cave is pitch black. You hear dripping water echoing. Something glitters on the ground. You can go SOUTH to exit or venture DEEPER.",
      actions: {
        south: { next: 'start', message: 'You return to the entrance.' },
        deeper: { next: 'treasure', message: 'You carefully move deeper...' },
        take: { message: 'You pick up 50 gold coins!', effect: (s) => ({ ...s, gold: s.gold + 50, inventory: [...s.inventory, 'gold coins'] }) },
        look: { message: 'The glittering object appears to be gold coins!' }
      }
    },
    forest: {
      description: "A mystical forest surrounds you. Ancient trees tower above. A wise OLD MAN sits by a fire. Paths lead WEST and NORTH.",
      actions: {
        west: { next: 'start', message: 'You return to the cave entrance.' },
        north: { next: 'river', message: 'You follow the path north...' },
        talk: { message: '"Seek the treasure in the deep cave, but beware the dragon!"' },
        look: { message: 'The old man seems peaceful. Smoke rises from his small fire.' }
      }
    },
    treasure: {
      description: "You found the treasure room! Gold and jewels everywhere! But a sleeping DRAGON guards the exit. You can try to SNEAK past or FIGHT.",
      actions: {
        sneak: { 
          message: 'You carefully sneak past... SUCCESS! You escape with the treasure!',
          effect: (s) => ({ ...s, gold: s.gold + 500, gameOver: true, message: '🎉 YOU WIN! Final Score: ' + (s.gold + 500) })
        },
        fight: {
          message: 'The dragon awakens! After an epic battle...',
          effect: (s) => {
            if (s.inventory.includes('sword')) {
              return { ...s, gold: s.gold + 1000, gameOver: true, message: '⚔️ You defeat the dragon! LEGENDARY VICTORY! Score: ' + (s.gold + 1000) };
            }
            return { ...s, health: 0, gameOver: true, message: '💀 The dragon was too powerful... GAME OVER' };
          }
        }
      }
    },
    river: {
      description: "A river blocks your path. The water looks cold and deep. You spot a SWORD stuck in a rock nearby. You can SWIM across or go SOUTH.",
      actions: {
        south: { next: 'forest', message: 'You return to the forest.' },
        swim: { next: 'village', message: 'You swim across the cold river...', effect: (s) => ({ ...s, health: s.health - 20 }) },
        take: { 
          message: 'You pull the sword from the stone! You are the chosen one!',
          effect: (s) => ({ ...s, inventory: [...s.inventory, 'sword'] })
        }
      }
    },
    village: {
      description: "You reach a small village. Friendly villagers offer you food and rest. You can REST here or travel SOUTH.",
      actions: {
        south: { next: 'river', message: 'You head back to the river.' },
        rest: { message: 'You feel refreshed!', effect: (s) => ({ ...s, health: Math.min(100, s.health + 30) }) }
      }
    }
  };

  const handleCommand = (cmd) => {
    const loc = locations[gameState.location];
    const action = loc.actions[cmd.toLowerCase()];
    
    if (!action) {
      setGameState({ ...gameState, message: "You can't do that here. Try: " + Object.keys(loc.actions).join(', ').toUpperCase() });
      return;
    }

    let newState = { ...gameState, message: action.message };
    if (action.next) newState.location = action.next;
    if (action.effect) newState = action.effect(newState);
    
    setGameState(newState);
  };

  const restart = () => {
    setGameState({ location: 'start', inventory: [], health: 100, gold: 0, gameOver: false, message: '' });
  };

  const loc = locations[gameState.location];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-zinc-900 p-4 font-mono">
      <Link to="/" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6">← Back</Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-2">🗡️ TEXT ADVENTURE</h1>
        
        {/* Stats */}
        <div className="flex justify-center gap-6 mb-4 text-green-400">
          <span>❤️ {gameState.health}</span>
          <span>💰 {gameState.gold}</span>
          <span>🎒 {gameState.inventory.length > 0 ? gameState.inventory.join(', ') : 'empty'}</span>
        </div>

        {/* Game Screen */}
        <div className="bg-black rounded-xl p-6 border-2 border-green-500/30">
          {gameState.gameOver ? (
            <div className="text-center">
              <p className="text-green-400 text-xl mb-4">{gameState.message}</p>
              <button onClick={restart} className="px-6 py-2 bg-green-500 text-black rounded">PLAY AGAIN</button>
            </div>
          ) : (
            <>
              <p className="text-green-400 mb-4 leading-relaxed">{loc.description}</p>
              
              {gameState.message && (
                <p className="text-yellow-400 mb-4 italic">&gt; {gameState.message}</p>
              )}

              <div className="border-t border-green-500/30 pt-4 mt-4">
                <p className="text-green-500/60 mb-2">Available actions: {Object.keys(loc.actions).join(', ').toUpperCase()}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(loc.actions).map(action => (
                    <button
                      key={action}
                      onClick={() => handleCommand(action)}
                      className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 uppercase"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdventureGame;
