import { useState } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components."
  },
  {
    question: "What is Tailwind CSS?",
    answer: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML."
  },
  {
    question: "How do I start learning web development?",
    answer: "Start with HTML, CSS, and JavaScript fundamentals. Then move on to frameworks like React, Vue, or Angular. Practice by building projects and contributing to open source."
  },
  {
    question: "What is the difference between let, const, and var?",
    answer: "var is function-scoped, while let and const are block-scoped. const cannot be reassigned after declaration, while let can. Use const by default, let when you need to reassign, and avoid var."
  },
  {
    question: "What is responsive design?",
    answer: "Responsive design is an approach to web design that makes web pages render well on different devices and screen sizes. It uses flexible grids, flexible images, and media queries."
  },
  {
    question: "What is an API?",
    answer: "API stands for Application Programming Interface. It's a set of rules and protocols that allows different software applications to communicate with each other."
  },
  {
    question: "What is Git?",
    answer: "Git is a distributed version control system that tracks changes in source code during software development. It allows multiple developers to work together on the same project."
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(
    faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-2">FAQ</h1>
        <p className="text-white/60 text-center mb-8">Frequently Asked Questions</p>
        
        {/* Search */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-4 pl-12 rounded-xl bg-white/10 text-white border border-white/30 focus:outline-none focus:border-purple-400"
          />
          <svg className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <span className={`text-purple-400 text-xl transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="px-6 pb-4 text-white/70 leading-relaxed border-t border-white/10 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredFaqs.length === 0 && (
          <div className="text-center text-white/40 py-12">
            No questions found matching "{searchTerm}"
          </div>
        )}
        
        {/* Expand All / Collapse All */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setOpenIndex('all')}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
          >
            Expand All
          </button>
          <button
            onClick={() => setOpenIndex(null)}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
          >
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
