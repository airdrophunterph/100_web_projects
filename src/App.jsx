import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import Pagination from './components/Pagination';
import { projects } from './data/projects';
import skycodeLogo from './assets/S (4).png';

// Import project pages
import {
  AgeCalculator,
  BasicBackgroundGenerator,
  BasicContactForm,
  BatteryIndicator,
  BlackjackGame,
  BMICalculator,
  BMICalculatorFlask,
  BlogApplication,
  BreakingBadCharacters,
  CalculatorApp,
  CatGenerator,
  ChessGame,
  ChuckNorrisJokes,
  ColorGuessingGame,
  CompoundInterest,
  CountdownTimer,
  CoronaTracker,
  CustomRangeSlider,
  DigitalClock,
  DinosaurGame,
  DrumKit,
  ExpandButton,
  ExpenseTracker,
  FAQAccordion,
  FilmFinder,
  GlassmorphismForm,
  ImageCompressor,
  TextEncryption,
  WeatherApp,
  RecipeFinder,
  MusicPlayer,
  MemoryCardGame,
  TypingPractice,
  PasswordGenerator,
  Stopwatch,
  MusicVisualizer,
  UnitConverter,
  ClothingSuggester,
  FlashlightApp,
  ChatApp,
  Watchlist,
  PortfolioTemplate,
  QuoteGenerator,
  ImageCarousel,
  EmojiPicker,
  DictionaryApp,
  AnimationPlayground,
  MarkdownNotes,
  QuizApp,
  FileExplorer,
  DailyGoalsTracker,
  HabitTracker,
  ExpenseSplitter,
  PomodoroTimer,
  SpeechToText,
  AIChatbot,
  CurrencyConverter,
  TypingSpeedTest,
  QRCodeGenerator,
  TodoDragDrop,
  ImageCropper,
  VideoDownloader,
  LanguageTranslator,
  VirtualBusinessCard,
  ResumeBuilder,
  SocialMediaScheduler,
  MarkdownToHtml,
  PdfToText,
  ShoppingCart,
  BlogCommentSystem,
  NotesCloudSync,
  CustomCountdown,
  WeatherDashboard,
  CryptoTracker,
  DataVisualization,
  NewsAggregator,
  ProductivityDashboard,
  JobTracker,
  FlashcardsApp,
  ResumeAnalyzer,
  AIBlogGenerator,
  WorkoutPlanner,
  CodeCompiler,
  BusinessCardGenerator,
  StoryBuilder,
  EmojiKeyboard,
  StockPortfolio,
  FinanceDashboard,
  VirtualWhiteboard,
  AdventureGame,
  QuizMaker,
  MemeGenerator,
  FileSharing,
  GrammarChecker,
  VoiceBrowser,
  YoutubeSummarizer,
  PodcastPlayer,
  SignatureGenerator,
  SurveyCreator,
  InterviewPrep
} from './projects';

// Home component (landing page)
function Home() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter projects based on search
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save search to history
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim() && !searchHistory.includes(value.trim())) {
      const updated = [value.trim(), ...searchHistory.slice(0, 9)];
      setSearchHistory(updated);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
    }
  };

  const itemsPerPage = isMobile ? 4 : 8;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProjectClick = (project) => {
    navigate(project.path);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="py-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
          100 Web Projects
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          A collection of web development projects showcasing various technologies and skills
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full text-gray-300 text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {projects.length} Projects Available
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full px-6 py-4 bg-gray-800/80 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <div className="mt-2 text-gray-400 text-sm">
              Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={handleProjectClick} />
          ))}
        </div>

        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          {filteredProjects.length > 0 ? (
            <>Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects</>
          ) : (
            <span className="text-gray-400">No projects found matching your search</span>
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <img src={skycodeLogo} alt="Skycode" className="w-12 h-12 rounded-lg" />
              <div>
                <div className="text-white font-bold text-lg">Made by Skycode</div>
                <div className="text-gray-400 text-sm">Software Development</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="https://github.com/airdrophunterph/100_web_projects" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573899091725" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@skycodesoftware" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.instagram.com/skycode_devs/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} 100 Web Projects. Built with React & TailwindCSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Coming Soon placeholder for unimplemented projects
function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-400 mb-8">This project is under development.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-400">
          Back to Home
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/age-calculator" element={<AgeCalculator />} />
      <Route path="/projects/basic-background-generator" element={<BasicBackgroundGenerator />} />
      <Route path="/projects/basic-contact-form" element={<BasicContactForm />} />
      <Route path="/projects/battery-percentage-indicator" element={<BatteryIndicator />} />
      <Route path="/projects/blackjack-game" element={<BlackjackGame />} />
      <Route path="/projects/bmi-calculator-js" element={<BMICalculator />} />
      <Route path="/projects/bmi-calculator-flask" element={<BMICalculatorFlask />} />
      <Route path="/projects/blog-application" element={<BlogApplication />} />
      <Route path="/projects/breaking-bad-characters" element={<BreakingBadCharacters />} />
      <Route path="/projects/calculator-app" element={<CalculatorApp />} />
      <Route path="/projects/cat-generator" element={<CatGenerator />} />
      <Route path="/projects/chess-game" element={<ChessGame />} />
      <Route path="/projects/chuck-norris-jokes" element={<ChuckNorrisJokes />} />
      <Route path="/projects/color-guessing-game" element={<ColorGuessingGame />} />
      <Route path="/projects/compound-interest" element={<CompoundInterest />} />
      <Route path="/projects/countdown-timer" element={<CountdownTimer />} />
      <Route path="/projects/corona-tracker" element={<CoronaTracker />} />
      <Route path="/projects/custom-range-slider" element={<CustomRangeSlider />} />
      <Route path="/projects/digital-clock" element={<DigitalClock />} />
      <Route path="/projects/dinosaur-game" element={<DinosaurGame />} />
      <Route path="/projects/drum-kit" element={<DrumKit />} />
      <Route path="/projects/expand-button" element={<ExpandButton />} />
      <Route path="/projects/expense-tracker" element={<ExpenseTracker />} />
      <Route path="/projects/faq-accordion" element={<FAQAccordion />} />
      <Route path="/projects/film-finder" element={<FilmFinder />} />
      <Route path="/projects/glassmorphism-animation-form" element={<GlassmorphismForm />} />
      <Route path="/projects/image-compressor" element={<ImageCompressor />} />
      <Route path="/projects/text-encryption" element={<TextEncryption />} />
      <Route path="/projects/weather-app" element={<WeatherApp />} />
      <Route path="/projects/recipe-finder" element={<RecipeFinder />} />
      <Route path="/projects/music-player" element={<MusicPlayer />} />
      <Route path="/projects/memory-card-game" element={<MemoryCardGame />} />
      <Route path="/projects/typing-practice" element={<TypingPractice />} />
      <Route path="/projects/password-generator" element={<PasswordGenerator />} />
      <Route path="/projects/stopwatch" element={<Stopwatch />} />
      <Route path="/projects/music-visualizer" element={<MusicVisualizer />} />
      <Route path="/projects/unit-converter" element={<UnitConverter />} />
      <Route path="/projects/clothing-suggester" element={<ClothingSuggester />} />
      <Route path="/projects/flashlight-app" element={<FlashlightApp />} />
      <Route path="/projects/chat-app" element={<ChatApp />} />
      <Route path="/projects/watchlist" element={<Watchlist />} />
      <Route path="/projects/portfolio-template" element={<PortfolioTemplate />} />
      <Route path="/projects/quote-generator" element={<QuoteGenerator />} />
      <Route path="/projects/image-carousel" element={<ImageCarousel />} />
      <Route path="/projects/emoji-picker" element={<EmojiPicker />} />
      <Route path="/projects/dictionary-app" element={<DictionaryApp />} />
      <Route path="/projects/animation-playground" element={<AnimationPlayground />} />
      <Route path="/projects/markdown-notes" element={<MarkdownNotes />} />
      <Route path="/projects/quiz-app" element={<QuizApp />} />
      <Route path="/projects/file-explorer" element={<FileExplorer />} />
      <Route path="/projects/daily-goals-tracker" element={<DailyGoalsTracker />} />
      <Route path="/projects/habit-tracker" element={<HabitTracker />} />
      <Route path="/projects/expense-splitter" element={<ExpenseSplitter />} />
      <Route path="/projects/pomodoro-timer" element={<PomodoroTimer />} />
      <Route path="/projects/speech-to-text" element={<SpeechToText />} />
      <Route path="/projects/ai-chatbot" element={<AIChatbot />} />
      <Route path="/projects/currency-converter" element={<CurrencyConverter />} />
      <Route path="/projects/typing-speed-test" element={<TypingSpeedTest />} />
      <Route path="/projects/qr-code-generator" element={<QRCodeGenerator />} />
      <Route path="/projects/todo-drag-drop" element={<TodoDragDrop />} />
      <Route path="/projects/image-cropper" element={<ImageCropper />} />
      <Route path="/projects/video-downloader" element={<VideoDownloader />} />
      <Route path="/projects/language-translator" element={<LanguageTranslator />} />
      <Route path="/projects/virtual-business-card" element={<VirtualBusinessCard />} />
      <Route path="/projects/resume-builder" element={<ResumeBuilder />} />
      <Route path="/projects/social-media-scheduler" element={<SocialMediaScheduler />} />
      <Route path="/projects/markdown-to-html" element={<MarkdownToHtml />} />
      <Route path="/projects/pdf-to-text" element={<PdfToText />} />
      <Route path="/projects/shopping-cart" element={<ShoppingCart />} />
      <Route path="/projects/blog-comment-system" element={<BlogCommentSystem />} />
      <Route path="/projects/notes-cloud-sync" element={<NotesCloudSync />} />
      <Route path="/projects/custom-countdown" element={<CustomCountdown />} />
      <Route path="/projects/weather-dashboard" element={<WeatherDashboard />} />
      <Route path="/projects/crypto-tracker" element={<CryptoTracker />} />
      <Route path="/projects/data-visualization" element={<DataVisualization />} />
      <Route path="/projects/news-aggregator" element={<NewsAggregator />} />
      <Route path="/projects/productivity-dashboard" element={<ProductivityDashboard />} />
      <Route path="/projects/job-tracker" element={<JobTracker />} />
      <Route path="/projects/flashcards-app" element={<FlashcardsApp />} />
      <Route path="/projects/resume-analyzer" element={<ResumeAnalyzer />} />
      <Route path="/projects/ai-blog-generator" element={<AIBlogGenerator />} />
      <Route path="/projects/workout-planner" element={<WorkoutPlanner />} />
      <Route path="/projects/code-compiler" element={<CodeCompiler />} />
      <Route path="/projects/business-card-generator" element={<BusinessCardGenerator />} />
      <Route path="/projects/story-builder" element={<StoryBuilder />} />
      <Route path="/projects/emoji-keyboard" element={<EmojiKeyboard />} />
      <Route path="/projects/stock-portfolio" element={<StockPortfolio />} />
      <Route path="/projects/finance-dashboard" element={<FinanceDashboard />} />
      <Route path="/projects/virtual-whiteboard" element={<VirtualWhiteboard />} />
      <Route path="/projects/adventure-game" element={<AdventureGame />} />
      <Route path="/projects/quiz-maker" element={<QuizMaker />} />
      <Route path="/projects/meme-generator" element={<MemeGenerator />} />
      <Route path="/projects/file-sharing" element={<FileSharing />} />
      <Route path="/projects/grammar-checker" element={<GrammarChecker />} />
      <Route path="/projects/voice-browser" element={<VoiceBrowser />} />
      <Route path="/projects/youtube-summarizer" element={<YoutubeSummarizer />} />
      <Route path="/projects/podcast-player" element={<PodcastPlayer />} />
      <Route path="/projects/signature-generator" element={<SignatureGenerator />} />
      <Route path="/projects/survey-creator" element={<SurveyCreator />} />
      <Route path="/projects/interview-prep" element={<InterviewPrep />} />
      <Route path="/projects/*" element={<ComingSoon />} />
    </Routes>
  );
}

export default App;
