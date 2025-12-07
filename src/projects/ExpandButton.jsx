import { useState } from 'react';
import { Link } from 'react-router-dom';

const ExpandButton = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Expand Buttons</h1>
        
        <div className="space-y-8">
          {/* Style 1: Width Expand */}
          <div className="text-center">
            <h3 className="text-white/60 mb-4">Width Expand</h3>
            <button
              onClick={() => setExpanded1(!expanded1)}
              className={`
                py-4 px-8 rounded-full font-bold text-white
                bg-gradient-to-r from-purple-500 to-pink-500
                transition-all duration-500 ease-out
                ${expanded1 ? 'w-full' : 'w-48'}
              `}
            >
              {expanded1 ? 'Click to Collapse' : 'Click to Expand'}
            </button>
          </div>
          
          {/* Style 2: Height Expand with Content */}
          <div className="text-center">
            <h3 className="text-white/60 mb-4">Content Reveal</h3>
            <div 
              className={`
                bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl
                overflow-hidden transition-all duration-500 ease-out
                ${expanded2 ? 'max-h-64' : 'max-h-16'}
              `}
            >
              <button
                onClick={() => setExpanded2(!expanded2)}
                className="w-full py-4 px-8 font-bold text-white text-left flex justify-between items-center"
              >
                <span>Click to {expanded2 ? 'Hide' : 'Show'} Content</span>
                <span className={`transition-transform duration-300 ${expanded2 ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className="p-6 pt-0 text-white/90">
                <p>This is the hidden content that appears when you expand the button. 
                   You can put any content here - text, images, forms, etc.</p>
              </div>
            </div>
          </div>
          
          {/* Style 3: Icon Expand */}
          <div className="text-center">
            <h3 className="text-white/60 mb-4">Icon Reveal</h3>
            <button
              onClick={() => setExpanded3(!expanded3)}
              onMouseEnter={() => setExpanded3(true)}
              onMouseLeave={() => setExpanded3(false)}
              className={`
                py-4 rounded-full font-bold text-white
                bg-gradient-to-r from-green-500 to-emerald-500
                transition-all duration-300 ease-out flex items-center justify-center gap-3
                ${expanded3 ? 'px-8' : 'px-6'}
              `}
            >
              <span className="text-2xl">✉️</span>
              <span className={`overflow-hidden transition-all duration-300 ${expanded3 ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
                Contact Us
              </span>
            </button>
          </div>
          
          {/* Style 4: Scale & Glow */}
          <div className="text-center">
            <h3 className="text-white/60 mb-4">Scale & Glow</h3>
            <button
              onClick={() => setExpanded4(!expanded4)}
              className={`
                py-4 px-8 rounded-2xl font-bold text-white
                bg-gradient-to-r from-orange-500 to-red-500
                transition-all duration-300 ease-out
                ${expanded4 
                  ? 'scale-125 shadow-2xl shadow-orange-500/50' 
                  : 'scale-100 shadow-lg shadow-orange-500/20 hover:scale-105'
                }
              `}
            >
              {expanded4 ? '🔥 Active!' : 'Click Me'}
            </button>
          </div>
          
          {/* Style 5: Social Buttons */}
          <div className="text-center">
            <h3 className="text-white/60 mb-4">Social FAB</h3>
            <div className="relative inline-block">
              <div className={`
                absolute bottom-full left-1/2 -translate-x-1/2 mb-3
                flex flex-col gap-2 items-center
                transition-all duration-300
                ${expanded1 && expanded2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
              `}>
                {['📘', '🐦', '📸', '💼'].map((icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setExpanded1(!expanded1); setExpanded2(!expanded2); }}
                className={`
                  w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500
                  flex items-center justify-center text-2xl
                  transition-all duration-300
                  ${expanded1 && expanded2 ? 'rotate-45' : ''}
                `}
              >
                ➕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandButton;
