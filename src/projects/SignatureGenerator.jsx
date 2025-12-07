import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignatureGenerator = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoords(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoords(e);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const downloadSignature = (format) => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `signature.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  const colors = ['#000000', '#0000ff', '#ff0000', '#008000', '#800080'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">✍️ Digital Signature</h1>

        {/* Canvas */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="text-gray-400 text-sm text-center mb-2">Sign below</div>
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="w-full border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Colors */}
            <div>
              <label className="text-white/60 text-sm block mb-2">Ink Color</label>
              <div className="flex gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Line Width */}
            <div>
              <label className="text-white/60 text-sm block mb-2">Thickness: {lineWidth}px</label>
              <input
                type="range"
                min="1"
                max="8"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <button
            onClick={clearCanvas}
            className="w-full py-2 bg-red-500/20 text-red-300 rounded-lg mb-4"
          >
            🗑️ Clear Signature
          </button>

          {/* Download Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => downloadSignature('png')}
              disabled={!hasSignature}
              className="py-3 bg-white/20 text-white rounded-lg disabled:opacity-50"
            >
              ⬇️ Download PNG
            </button>
            <button
              onClick={() => downloadSignature('jpeg')}
              disabled={!hasSignature}
              className="py-3 bg-white/20 text-white rounded-lg disabled:opacity-50"
            >
              ⬇️ Download JPEG
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4">
          <h3 className="text-white font-bold mb-2">Tips</h3>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Sign with your mouse or finger (touch screens)</li>
            <li>• Use a stylus for best results on tablets</li>
            <li>• PNG preserves transparency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignatureGenerator;
