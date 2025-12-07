import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  { id: 1, title: 'Mountain Sunset', color: 'from-orange-400 to-pink-600', emoji: '🏔️' },
  { id: 2, title: 'Ocean Waves', color: 'from-blue-400 to-cyan-600', emoji: '🌊' },
  { id: 3, title: 'Forest Path', color: 'from-green-400 to-emerald-600', emoji: '🌲' },
  { id: 4, title: 'City Lights', color: 'from-purple-400 to-indigo-600', emoji: '🌃' },
  { id: 5, title: 'Desert Dunes', color: 'from-yellow-400 to-orange-600', emoji: '🏜️' },
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [transition, setTransition] = useState('slide');

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  const getTransitionClass = () => {
    switch (transition) {
      case 'fade': return 'transition-opacity duration-500';
      case 'zoom': return 'transition-transform duration-500';
      default: return 'transition-all duration-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-fuchsia-900 to-purple-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🖼️ Image Carousel</h1>

        {/* Main Carousel */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          <div className="relative aspect-video">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 bg-gradient-to-br ${slide.color} flex items-center justify-center ${getTransitionClass()} ${
                  idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
                }`}
              >
                <div className="text-center text-white">
                  <div className="text-8xl mb-4">{slide.emoji}</div>
                  <h2 className="text-3xl font-bold">{slide.title}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full text-white text-2xl z-20"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full text-white text-2xl z-20"
          >
            ›
          </button>

          {/* Slide Counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/30 rounded-full text-white text-sm z-20">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === current ? 'bg-white w-8' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-4">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goTo(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br ${slide.color} flex items-center justify-center text-2xl transition ${
                idx === current ? 'ring-4 ring-white' : 'opacity-60'
              }`}
            >
              {slide.emoji}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-4 py-2 rounded-lg ${isAutoPlay ? 'bg-green-500' : 'bg-white/20'} text-white`}
          >
            {isAutoPlay ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <select
            value={transition}
            onChange={(e) => setTransition(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/20 text-white"
          >
            <option value="slide" className="bg-gray-800">Slide</option>
            <option value="fade" className="bg-gray-800">Fade</option>
            <option value="zoom" className="bg-gray-800">Zoom</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
