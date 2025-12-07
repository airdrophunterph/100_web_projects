import { useState } from 'react';
import { Link } from 'react-router-dom';

const BasicBackgroundGenerator = () => {
  const [gradient, setGradient] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [angle, setAngle] = useState(135);

  const generateRandom = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const newColor1 = randomColor();
    const newColor2 = randomColor();
    const newAngle = Math.floor(Math.random() * 360);
    
    setColor1(newColor1);
    setColor2(newColor2);
    setAngle(newAngle);
    setGradient(`linear-gradient(${newAngle}deg, ${newColor1} 0%, ${newColor2} 100%)`);
  };

  const updateGradient = (c1, c2, a) => {
    setGradient(`linear-gradient(${a}deg, ${c1} 0%, ${c2} 100%)`);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    alert('CSS copied to clipboard!');
  };

  return (
    <div className="min-h-screen" style={{ background: gradient }}>
      <div className="p-4">
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Background Generator
          </h1>
          
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm">Color 1</label>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => { setColor1(e.target.value); updateGradient(e.target.value, color2, angle); }}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Color 2</label>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => { setColor2(e.target.value); updateGradient(color1, e.target.value, angle); }}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white/80 mb-2 text-sm">Angle: {angle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => { setAngle(e.target.value); updateGradient(color1, color2, e.target.value); }}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={generateRandom}
                className="flex-1 py-3 bg-white/30 text-white font-semibold rounded-lg hover:bg-white/40 transition"
              >
                Random
              </button>
              <button
                onClick={copyCSS}
                className="flex-1 py-3 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Copy CSS
              </button>
            </div>
            
            <div className="mt-4 p-3 bg-black/30 rounded-lg">
              <code className="text-white/80 text-sm break-all">background: {gradient};</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicBackgroundGenerator;
