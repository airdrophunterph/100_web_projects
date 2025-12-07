import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [cropArea, setCropArea] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - cropArea.x,
      y: e.clientY - rect.top - cropArea.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - cropArea.width, e.clientX - rect.left - dragStart.x));
    const y = Math.max(0, Math.min(rect.height - cropArea.height, e.clientY - rect.top - dragStart.y));
    setCropArea({ ...cropArea, x, y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const cropImage = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = containerRef.current.getBoundingClientRect();
      const scaleX = img.width / rect.width;
      const scaleY = img.height / rect.height;

      canvas.width = cropArea.width * scaleX;
      canvas.height = cropArea.height * scaleY;

      ctx.drawImage(
        img,
        cropArea.x * scaleX, cropArea.y * scaleY,
        cropArea.width * scaleX, cropArea.height * scaleY,
        0, 0,
        canvas.width, canvas.height
      );

      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = image;
  };

  const aspectRatios = [
    { label: 'Free', ratio: null },
    { label: '1:1', ratio: 1 },
    { label: '4:3', ratio: 4/3 },
    { label: '16:9', ratio: 16/9 },
  ];

  const setAspectRatio = (ratio) => {
    if (!ratio) return;
    setCropArea({ ...cropArea, height: cropArea.width / ratio });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">✂️ Image Cropper</h1>

        {!image ? (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-12 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="cursor-pointer block"
            >
              <div className="text-6xl mb-4">📷</div>
              <div className="text-white text-lg mb-2">Click to upload an image</div>
              <div className="text-white/60">or drag and drop</div>
            </label>
          </div>
        ) : (
          <>
            {/* Aspect Ratio Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              {aspectRatios.map(({ label, ratio }) => (
                <button
                  key={label}
                  onClick={() => setAspectRatio(ratio)}
                  className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Size Controls */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="text-white/60 text-sm">Width: {Math.round(cropArea.width)}px</label>
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={cropArea.width}
                  onChange={(e) => setCropArea({ ...cropArea, width: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="text-white/60 text-sm">Height: {Math.round(cropArea.height)}px</label>
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={cropArea.height}
                  onChange={(e) => setCropArea({ ...cropArea, height: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Image Container */}
            <div
              ref={containerRef}
              className="relative bg-black/50 rounded-xl overflow-hidden mb-6"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img src={image} alt="Upload" className="w-full" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Crop Area */}
              <div
                className="absolute border-2 border-white cursor-move"
                style={{
                  left: cropArea.x,
                  top: cropArea.y,
                  width: cropArea.width,
                  height: cropArea.height,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)'
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="absolute inset-0 border border-dashed border-white/50" />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setImage(null)}
                className="flex-1 py-3 bg-white/20 text-white rounded-lg"
              >
                New Image
              </button>
              <button
                onClick={cropImage}
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg"
              >
                ✂️ Crop & Download
              </button>
            </div>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageCropper;
