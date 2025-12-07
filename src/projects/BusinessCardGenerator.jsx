import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const BusinessCardGenerator = () => {
  const [card, setCard] = useState({
    name: 'John Developer',
    title: 'Full Stack Developer',
    company: 'Tech Solutions',
    email: 'john@example.com',
    phone: '+1 555-123-4567',
    website: 'johndeveloper.com'
  });
  const [template, setTemplate] = useState('modern');
  const cardRef = useRef(null);

  const templates = {
    modern: { bg: 'bg-gradient-to-br from-slate-800 to-slate-900', text: 'text-white', accent: 'text-cyan-400' },
    minimal: { bg: 'bg-white', text: 'text-gray-800', accent: 'text-gray-500' },
    bold: { bg: 'bg-gradient-to-br from-purple-600 to-pink-500', text: 'text-white', accent: 'text-yellow-300' },
    nature: { bg: 'bg-gradient-to-br from-green-600 to-emerald-700', text: 'text-white', accent: 'text-lime-300' },
    corporate: { bg: 'bg-gradient-to-br from-blue-800 to-indigo-900', text: 'text-white', accent: 'text-blue-300' },
  };

  const currentTemplate = templates[template];

  const downloadCard = () => {
    alert('In a production app, this would use html2canvas to download the card as an image.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🪪 Business Card Generator</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <h2 className="text-white font-bold mb-4">Preview</h2>
            <div
              ref={cardRef}
              className={`${currentTemplate.bg} rounded-2xl p-8 shadow-2xl aspect-[1.75/1]`}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${currentTemplate.text}`}>{card.name}</h3>
                  <p className={currentTemplate.accent}>{card.title}</p>
                  <p className={`${currentTemplate.text} opacity-60`}>{card.company}</p>
                </div>
                <div className={`space-y-1 text-sm ${currentTemplate.text}`}>
                  <div className="flex items-center gap-2">
                    <span>📧</span> {card.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span> {card.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌐</span> {card.website}
                  </div>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            <div className="mt-4">
              <label className="text-white/60 text-sm block mb-2">Template</label>
              <div className="flex gap-2">
                {Object.keys(templates).map(t => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-3 py-2 rounded-lg capitalize ${template === t ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white/60'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={downloadCard}
              className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-lg"
            >
              ⬇️ Download Card
            </button>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Edit Details</h2>
            
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
                { key: 'title', label: 'Job Title', placeholder: 'Software Engineer' },
                { key: 'company', label: 'Company', placeholder: 'Tech Corp' },
                { key: 'email', label: 'Email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone', placeholder: '+1 555-123-4567' },
                { key: 'website', label: 'Website', placeholder: 'example.com' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-white/60 text-sm mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={card[field.key]}
                    onChange={(e) => setCard({ ...card, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardGenerator;
