import { useState } from 'react';
import { Link } from 'react-router-dom';

const StoryBuilder = () => {
  const [story, setStory] = useState({
    title: 'The Adventure Begins',
    currentNode: 'start',
    nodes: {
      start: {
        text: 'You wake up in a mysterious forest. The sun is setting and you hear strange sounds around you.',
        choices: [
          { text: 'Follow the path deeper into the forest', next: 'forest' },
          { text: 'Look for shelter nearby', next: 'shelter' },
          { text: 'Climb a tree to get a better view', next: 'tree' }
        ]
      },
      forest: {
        text: 'You venture deeper into the forest. The trees grow denser and you spot a glowing light ahead.',
        choices: [
          { text: 'Approach the glowing light', next: 'light' },
          { text: 'Hide and observe from a distance', next: 'hide' }
        ]
      },
      shelter: {
        text: 'You find a small cave. Inside, you discover ancient markings on the walls and a warm fire pit.',
        choices: [
          { text: 'Rest by the fire', next: 'rest' },
          { text: 'Examine the markings', next: 'markings' }
        ]
      },
      tree: {
        text: 'From the treetop, you see a village in the distance and smoke rising from what looks like a campfire nearby.',
        choices: [
          { text: 'Head towards the village', next: 'village' },
          { text: 'Investigate the campfire', next: 'campfire' }
        ]
      },
      light: { text: 'The light leads you to a magical fairy who offers you a wish. Congratulations, you found the good ending! ✨', choices: [] },
      hide: { text: 'You wait too long and darkness falls. You must find your way in the dark... The End.', choices: [] },
      rest: { text: 'You wake up refreshed and ready for a new adventure. To be continued...', choices: [] },
      markings: { text: 'The markings reveal a treasure map! You\'ve discovered a great secret! 🗺️', choices: [] },
      village: { text: 'The villagers welcome you warmly. You\'ve found a new home! 🏠', choices: [] },
      campfire: { text: 'You meet friendly travelers who share their food and stories with you. 🔥', choices: [] },
    }
  });
  const [history, setHistory] = useState(['start']);
  const [isEditing, setIsEditing] = useState(false);

  const currentNode = story.nodes[story.currentNode];

  const makeChoice = (next) => {
    setStory({ ...story, currentNode: next });
    setHistory([...history, next]);
  };

  const restart = () => {
    setStory({ ...story, currentNode: 'start' });
    setHistory(['start']);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setStory({ ...story, currentNode: newHistory[newHistory.length - 1] });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-pink-900 to-rose-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">📖 {story.title}</h1>
        <p className="text-white/60 text-center mb-8">An interactive story adventure</p>

        {/* Story Display */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-6">
          <p className="text-white text-lg leading-relaxed mb-8">{currentNode.text}</p>

          {currentNode.choices.length > 0 ? (
            <div className="space-y-3">
              {currentNode.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => makeChoice(choice.next)}
                  className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-xl text-white text-left transition"
                >
                  {i + 1}. {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <p className="text-white/60 mb-4">The End</p>
              <button
                onClick={restart}
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg font-bold"
              >
                🔄 Play Again
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={goBack}
            disabled={history.length <= 1}
            className="flex-1 py-3 bg-white/10 text-white rounded-lg disabled:opacity-30"
          >
            ← Go Back
          </button>
          <button onClick={restart} className="flex-1 py-3 bg-white/10 text-white rounded-lg">
            🔄 Restart
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6 text-center text-white/40 text-sm">
          Chapters visited: {history.length} | Current: {story.currentNode}
        </div>
      </div>
    </div>
  );
};

export default StoryBuilder;
