import { useState } from 'react';
import { Link } from 'react-router-dom';

const translations = {
  'hello': { es: 'hola', fr: 'bonjour', de: 'hallo', it: 'ciao', pt: 'olá', ja: 'こんにちは', ko: '안녕하세요', zh: '你好' },
  'goodbye': { es: 'adiós', fr: 'au revoir', de: 'auf wiedersehen', it: 'arrivederci', pt: 'adeus', ja: 'さようなら', ko: '안녕히 가세요', zh: '再见' },
  'thank you': { es: 'gracias', fr: 'merci', de: 'danke', it: 'grazie', pt: 'obrigado', ja: 'ありがとう', ko: '감사합니다', zh: '谢谢' },
  'please': { es: 'por favor', fr: 's\'il vous plaît', de: 'bitte', it: 'per favore', pt: 'por favor', ja: 'お願いします', ko: '제발', zh: '请' },
  'yes': { es: 'sí', fr: 'oui', de: 'ja', it: 'sì', pt: 'sim', ja: 'はい', ko: '네', zh: '是' },
  'no': { es: 'no', fr: 'non', de: 'nein', it: 'no', pt: 'não', ja: 'いいえ', ko: '아니요', zh: '不' },
  'i love you': { es: 'te amo', fr: 'je t\'aime', de: 'ich liebe dich', it: 'ti amo', pt: 'eu te amo', ja: '愛してる', ko: '사랑해요', zh: '我爱你' },
  'good morning': { es: 'buenos días', fr: 'bonjour', de: 'guten morgen', it: 'buongiorno', pt: 'bom dia', ja: 'おはよう', ko: '좋은 아침', zh: '早上好' },
  'good night': { es: 'buenas noches', fr: 'bonne nuit', de: 'gute nacht', it: 'buona notte', pt: 'boa noite', ja: 'おやすみ', ko: '안녕히 주무세요', zh: '晚安' },
  'how are you': { es: '¿cómo estás?', fr: 'comment allez-vous?', de: 'wie geht es dir?', it: 'come stai?', pt: 'como vai?', ja: 'お元気ですか', ko: '어떻게 지내세요?', zh: '你好吗' },
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
];

const LanguageTranslator = () => {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [history, setHistory] = useState([]);

  const translate = () => {
    if (!inputText.trim()) return;
    
    const lower = inputText.toLowerCase().trim();
    let result = '';
    
    if (fromLang === 'en' && translations[lower]) {
      result = translations[lower][toLang] || `[No translation for "${toLang}"]`;
    } else if (toLang === 'en') {
      // Reverse lookup
      for (const [eng, trans] of Object.entries(translations)) {
        if (trans[fromLang]?.toLowerCase() === lower) {
          result = eng;
          break;
        }
      }
      if (!result) result = `[Translation not found]`;
    } else {
      result = `[Demo: Only English ↔ Other languages supported]`;
    }
    
    setOutputText(result);
    setHistory(prev => [{ from: inputText, to: result, fromLang, toLang }, ...prev.slice(0, 4)]);
  };

  const swap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const getLang = (code) => languages.find(l => l.code === code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🌐 Translator</h1>

        {/* Language Selection */}
        <div className="flex items-center gap-4 mb-6">
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code} className="bg-gray-800">{l.flag} {l.name}</option>
            ))}
          </select>
          
          <button onClick={swap} className="p-3 bg-white/20 rounded-full text-white text-xl">⇄</button>
          
          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30"
          >
            {languages.map(l => (
              <option key={l.code} value={l.code} className="bg-gray-800">{l.flag} {l.name}</option>
            ))}
          </select>
        </div>

        {/* Translation Area */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-white/60 text-sm mb-2">{getLang(fromLang)?.flag} {getLang(fromLang)?.name}</div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text..."
              rows="4"
              className="w-full bg-transparent text-white resize-none focus:outline-none"
            />
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-white/60 text-sm mb-2">{getLang(toLang)?.flag} {getLang(toLang)?.name}</div>
            <div className="text-white min-h-[100px]">{outputText || 'Translation will appear here...'}</div>
          </div>
        </div>

        <button
          onClick={translate}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg"
        >
          🔄 Translate
        </button>

        {/* Quick Phrases */}
        <div className="mt-6">
          <div className="text-white/60 text-sm mb-2">Quick phrases:</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(translations).slice(0, 6).map(phrase => (
              <button
                key={phrase}
                onClick={() => setInputText(phrase)}
                className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20"
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="text-white font-bold mb-2">Recent</div>
            {history.map((h, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                <span className="text-white/60">{h.from}</span>
                <span className="text-white">{h.to}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageTranslator;
