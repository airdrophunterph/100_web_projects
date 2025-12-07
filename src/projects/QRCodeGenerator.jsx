import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QRCodeGenerator = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    generateQR();
  }, [text, size, bgColor, fgColor]);

  const generateQR = () => {
    if (!text) return;
    // Using Google Charts API for QR code generation
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=${bgColor.replace('#', '')}&color=${fgColor.replace('#', '')}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    link.click();
  };

  const presets = [
    { label: 'URL', value: 'https://' },
    { label: 'Email', value: 'mailto:email@example.com' },
    { label: 'Phone', value: 'tel:+1234567890' },
    { label: 'SMS', value: 'sms:+1234567890?body=Hello' },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:NetworkName;P:Password;;' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📱 QR Code Generator</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Preview */}
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center">
            {qrUrl ? (
              <img src={qrUrl} alt="QR Code" className="max-w-full" style={{ width: size, height: size }} />
            ) : (
              <div className="text-gray-400">Enter text to generate QR</div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            {/* Presets */}
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button
                    key={p.label}
                    onClick={() => setText(p.value)}
                    className="px-2 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/20"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Content</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text..."
                rows="3"
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 text-sm resize-none"
              />
            </div>

            {/* Size */}
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Size: {size}px</label>
              <input
                type="range"
                min="100"
                max="400"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/60 text-sm mb-2">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-white/20 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-2">Foreground</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-white/20 text-white text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={downloadQR}
              disabled={!qrUrl}
              className="w-full py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-bold rounded-lg disabled:opacity-50"
            >
              ⬇️ Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
