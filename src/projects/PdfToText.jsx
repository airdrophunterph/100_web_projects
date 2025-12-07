import { useState } from 'react';
import { Link } from 'react-router-dom';

const PdfToText = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      extractText(selectedFile);
    }
  };

  const extractText = async (pdfFile) => {
    setLoading(true);
    
    // Simulate PDF text extraction (in real app, you'd use pdf.js or a backend)
    setTimeout(() => {
      const mockText = `PDF Text Extraction Demo

This is a simulated text extraction from your PDF file: "${pdfFile.name}"

File Size: ${(pdfFile.size / 1024).toFixed(2)} KB

---

In a real application, you would use libraries like:
• pdf.js (Mozilla's PDF viewer library)
• pdf-parse (Node.js library)
• A backend API service

These libraries can:
1. Parse PDF structure
2. Extract text content
3. Handle multi-page documents
4. Preserve formatting when possible

---

Note: Browser-based PDF text extraction has limitations due to the complexity of the PDF format. For production use, consider using a server-side solution.`;
      
      setExtractedText(mockText);
      setLoading(false);
    }, 1500);
  };

  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'extracted-text.txt';
    link.href = url;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-rose-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📄 PDF to Text</h1>

        {/* Upload Area */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdfInput"
          />
          <label htmlFor="pdfInput" className="cursor-pointer block">
            <div className="text-6xl mb-4">📑</div>
            <div className="text-white text-lg mb-2">
              {file ? file.name : 'Click to upload PDF'}
            </div>
            <div className="text-white/60">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : 'or drag and drop'}
            </div>
          </label>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-4xl animate-spin mb-4">⏳</div>
            <div className="text-white">Extracting text...</div>
          </div>
        )}

        {/* Extracted Text */}
        {extractedText && !loading && (
          <>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold">Extracted Text</h3>
                <span className="text-white/60 text-sm">{extractedText.length} characters</span>
              </div>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows="15"
                className="w-full bg-white/10 text-white rounded-lg p-4 resize-none font-mono text-sm"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={copyText}
                className="flex-1 py-3 bg-white/20 text-white rounded-lg font-bold"
              >
                📋 Copy Text
              </button>
              <button
                onClick={downloadText}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold"
              >
                ⬇️ Download .txt
              </button>
            </div>
          </>
        )}

        {/* Info */}
        <div className="mt-6 p-4 bg-yellow-500/20 rounded-xl">
          <p className="text-yellow-300 text-sm text-center">
            ⚠️ Demo mode: This simulates PDF extraction. Real implementation requires pdf.js or a backend service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PdfToText;
