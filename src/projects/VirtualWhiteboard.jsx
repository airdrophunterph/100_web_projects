import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VirtualWhiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pen');
  const [history, setHistory] = useState([]);

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
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoords(e);

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      setHistory([...history, canvas.toDataURL()]);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (history.length === 1) {
      clearCanvas();
      return;
    }

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[history.length - 2];
    setHistory(history.slice(0, -1));
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = ['#000000', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-800 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-4">🎨 Virtual Whiteboard</h1>

        {/* Toolbar */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4 flex flex-wrap gap-4 items-center justify-center">
          {/* Tools */}
          <div className="flex gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-blue-500' : 'bg-white/20'} text-white`}
            >✏️</button>
            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-blue-500' : 'bg-white/20'} text-white`}
            >🧹</button>
          </div>

          {/* Colors */}
          <div className="flex gap-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-white' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Size:</span>
            <input
              type="range"
              min="1"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-20"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={undo} className="px-3 py-1 bg-white/20 text-white rounded-lg text-sm">↶ Undo</button>
            <button onClick={clearCanvas} className="px-3 py-1 bg-red-500/50 text-white rounded-lg text-sm">🗑️ Clear</button>
            <button onClick={downloadCanvas} className="px-3 py-1 bg-green-500/50 text-white rounded-lg text-sm">⬇️ Save</button>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualWhiteboard;
