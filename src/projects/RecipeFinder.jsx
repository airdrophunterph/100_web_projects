import { useState } from 'react';
import { Link } from 'react-router-dom';

const recipesDB = [
  { id: 1, name: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'cheese', 'pepper'], time: '25 min', emoji: '🍝', instructions: 'Cook pasta. Mix eggs with cheese. Fry bacon. Combine all.' },
  { id: 2, name: 'Chicken Stir Fry', ingredients: ['chicken', 'vegetables', 'soy sauce', 'garlic', 'oil'], time: '20 min', emoji: '🥘', instructions: 'Cut chicken. Stir fry with vegetables. Add soy sauce.' },
  { id: 3, name: 'Caesar Salad', ingredients: ['lettuce', 'chicken', 'cheese', 'croutons', 'dressing'], time: '15 min', emoji: '🥗', instructions: 'Chop lettuce. Add toppings. Drizzle dressing.' },
  { id: 4, name: 'Omelette', ingredients: ['eggs', 'cheese', 'vegetables', 'butter', 'salt'], time: '10 min', emoji: '🍳', instructions: 'Beat eggs. Cook in butter. Add fillings. Fold.' },
  { id: 5, name: 'Grilled Cheese', ingredients: ['bread', 'cheese', 'butter'], time: '10 min', emoji: '🧀', instructions: 'Butter bread. Add cheese. Grill until golden.' },
  { id: 6, name: 'Tomato Soup', ingredients: ['tomatoes', 'onion', 'garlic', 'cream', 'basil'], time: '30 min', emoji: '🍅', instructions: 'Sauté onion and garlic. Add tomatoes. Blend. Add cream.' },
  { id: 7, name: 'Pancakes', ingredients: ['flour', 'eggs', 'milk', 'sugar', 'butter'], time: '20 min', emoji: '🥞', instructions: 'Mix ingredients. Pour batter. Flip when bubbles form.' },
  { id: 8, name: 'Tacos', ingredients: ['tortilla', 'beef', 'lettuce', 'cheese', 'salsa'], time: '25 min', emoji: '🌮', instructions: 'Cook beef. Warm tortillas. Assemble with toppings.' },
];

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [saved, setSaved] = useState(() => {
    const s = localStorage.getItem('savedRecipes');
    return s ? JSON.parse(s) : [];
  });

  const searchRecipes = () => {
    const userIngredients = ingredients.toLowerCase().split(',').map(i => i.trim());
    const matches = recipesDB.filter(recipe => {
      const matchCount = recipe.ingredients.filter(ing => 
        userIngredients.some(ui => ing.includes(ui) || ui.includes(ing))
      ).length;
      return matchCount >= 2;
    }).sort((a, b) => {
      const aMatch = a.ingredients.filter(ing => userIngredients.some(ui => ing.includes(ui))).length;
      const bMatch = b.ingredients.filter(ing => userIngredients.some(ui => ing.includes(ui))).length;
      return bMatch - aMatch;
    });
    setResults(matches);
  };

  const saveRecipe = (recipe) => {
    if (!saved.find(r => r.id === recipe.id)) {
      const updated = [...saved, recipe];
      setSaved(updated);
      localStorage.setItem('savedRecipes', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">🍳 Recipe Finder</h1>
        <p className="text-white/60 text-center mb-8">Find recipes based on what you have</p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <input
            type="text"
            placeholder="Enter ingredients (comma separated)..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 mb-4"
          />
          <button
            onClick={searchRecipes}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg"
          >
            🔍 Find Recipes
          </button>
        </div>

        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRecipe(null)}>
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="text-5xl text-center mb-4">{selectedRecipe.emoji}</div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{selectedRecipe.name}</h2>
              <div className="text-amber-400 text-center mb-4">⏱️ {selectedRecipe.time}</div>
              <div className="mb-4">
                <div className="text-white/60 text-sm mb-2">Ingredients:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 rounded text-white text-sm">{ing}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-white/60 text-sm mb-2">Instructions:</div>
                <p className="text-white">{selectedRecipe.instructions}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => saveRecipe(selectedRecipe)} className="flex-1 py-2 bg-amber-500 text-white rounded-lg">
                  💾 Save Recipe
                </button>
                <button onClick={() => setSelectedRecipe(null)} className="flex-1 py-2 bg-white/10 text-white rounded-lg">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {results.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white/10 backdrop-blur rounded-xl p-4 cursor-pointer hover:bg-white/20"
              >
                <div className="text-4xl text-center mb-2">{recipe.emoji}</div>
                <h3 className="text-white font-bold text-center">{recipe.name}</h3>
                <div className="text-white/60 text-sm text-center">⏱️ {recipe.time}</div>
              </div>
            ))}
          </div>
        )}

        {saved.length > 0 && (
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="text-white font-bold mb-3">💾 Saved Recipes</h3>
            <div className="flex flex-wrap gap-2">
              {saved.map(r => (
                <button key={r.id} onClick={() => setSelectedRecipe(r)} className="px-3 py-1 bg-white/20 text-white rounded-lg">
                  {r.emoji} {r.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
