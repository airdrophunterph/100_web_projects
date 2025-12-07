import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target.result);
      compressImage(event.target.result, quality);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (dataUrl, q) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const compressed = canvas.toDataURL('image/jpeg', q / 100);
      setCompressedImage(compressed);
      setCompressedSize(Math.round((compressed.length * 3) / 4));
    };
    img.src = dataUrl;
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (originalImage) {
      compressImage(originalImage, newQuality);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.download = 'compressed-image.jpg';
    link.href = compressedImage;
    link.click();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const savings = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🖼️ Image Compressor</h1>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-400"
          />

          {originalImage && (
            <div className="mt-6">
              <label className="block text-white/80 mb-2">Quality: {quality}%</label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        {originalImage && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Original</div>
              <img src={originalImage} alt="Original" className="w-full rounded-lg" />
              <div className="text-white mt-2">{formatSize(originalSize)}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Compressed</div>
              <img src={compressedImage} alt="Compressed" className="w-full rounded-lg" />
              <div className="text-green-400 mt-2">{formatSize(compressedSize)} ({savings}% smaller)</div>
            </div>
          </div>
        )}

        {compressedImage && (
          <button
            onClick={downloadImage}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-lg"
          >
            Download Compressed Image
          </button>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageCompressor;
