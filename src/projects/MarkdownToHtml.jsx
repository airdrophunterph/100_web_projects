import { useState } from 'react';
import { Link } from 'react-router-dom';

const MarkdownToHtml = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Converter

## Features
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- \`inline code\` with backticks

### Code Block
\`\`\`javascript
const greeting = "Hello World";
console.log(greeting);
\`\`\`

### Links
[Visit Google](https://google.com)

> This is a blockquote

---

1. First item
2. Second item
3. Third item`);
  const [view, setView] = useState('split');

  const convertToHtml = (md) => {
    let html = md
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr class="my-4 border-gray-300">')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      // Line breaks
      .replace(/\n/g, '<br>');
    
    return html;
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(convertToHtml(markdown));
    alert('HTML copied to clipboard!');
  };

  const downloadHtml = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Converted Markdown</title>
  <style>
    body { font-family: system-ui; max-width: 800px; margin: 0 auto; padding: 20px; }
    pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
    code { background: #f5f5f5; padding: 2px 4px; border-radius: 4px; }
    blockquote { border-left: 4px solid #ccc; padding-left: 16px; font-style: italic; color: #666; }
  </style>
</head>
<body>
${convertToHtml(markdown)}
</body>
</html>`;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'converted.html';
    link.href = url;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">📝 Markdown to HTML</h1>

        {/* View Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          {['split', 'markdown', 'preview', 'html'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 rounded-lg capitalize ${view === v ? 'bg-gray-600 text-white' : 'bg-white/10 text-white/60'}`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className={`grid ${view === 'split' ? 'md:grid-cols-2' : ''} gap-4`}>
          {/* Markdown Editor */}
          {(view === 'split' || view === 'markdown') && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">Markdown</div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[500px] bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
              />
            </div>
          )}

          {/* Preview */}
          {(view === 'split' || view === 'preview') && (
            <div className="bg-white rounded-xl p-6">
              <div className="text-gray-400 text-sm mb-2">Preview</div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: convertToHtml(markdown) }}
              />
            </div>
          )}

          {/* HTML Output */}
          {view === 'html' && (
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-white/60 text-sm mb-2">HTML Output</div>
              <pre className="text-green-400 text-sm overflow-auto h-[500px] whitespace-pre-wrap">
                {convertToHtml(markdown)}
              </pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button onClick={copyHtml} className="flex-1 py-3 bg-white/20 text-white rounded-lg font-bold">
            📋 Copy HTML
          </button>
          <button onClick={downloadHtml} className="flex-1 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-lg font-bold">
            ⬇️ Download HTML File
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownToHtml;
