import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProjectCard from './components/ProjectCard';
import Pagination from './components/Pagination';
import { projects } from './data/projects';

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
  DataVisualization
} from './projects';

// Home component (landing page)
function Home() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 4 : 8;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

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
          Showing {startIndex + 1}-{Math.min(endIndex, projects.length)} of {projects.length} projects
        </div>
      </main>

      <footer className="py-8 border-t border-gray-800 text-center text-gray-500">
        <p>© 2024 100 Web Projects. Built with React & TailwindCSS</p>
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
      <Route path="/projects/*" element={<ComingSoon />} />
    </Routes>
  );
}

export default App;
