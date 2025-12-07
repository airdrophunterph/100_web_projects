import { useState } from 'react';
import { Link } from 'react-router-dom';

const PortfolioTemplate = () => {
  const [activeSection, setActiveSection] = useState('about');

  const projects = [
    { id: 1, title: 'E-commerce Website', tech: ['React', 'Node.js'], color: 'from-blue-500 to-purple-500' },
    { id: 2, title: 'Mobile App', tech: ['React Native', 'Firebase'], color: 'from-green-500 to-teal-500' },
    { id: 3, title: 'Dashboard UI', tech: ['Vue.js', 'Tailwind'], color: 'from-orange-500 to-red-500' },
    { id: 4, title: 'API Service', tech: ['Python', 'FastAPI'], color: 'from-yellow-500 to-orange-500' },
  ];

  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'CSS', 'Git', 'SQL'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Link to="/" className="fixed top-4 left-4 inline-flex items-center text-white/80 hover:text-white z-50">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Hero */}
      <header className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-5xl">
            👨‍💻
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">John Developer</h1>
          <p className="text-xl text-white/60 mb-8">Full Stack Developer & UI Designer</p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100">
              View Work
            </button>
            <button className="px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10">
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 bg-black/50 backdrop-blur z-40">
        <div className="flex justify-center gap-8 py-4">
          {['about', 'projects', 'skills', 'contact'].map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`capitalize ${activeSection === section ? 'text-white' : 'text-white/60'}`}
            >
              {section}
            </button>
          ))}
        </div>
      </nav>

      {/* About */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
          <p className="text-white/70 text-lg leading-relaxed">
            I'm a passionate full-stack developer with 5+ years of experience building 
            web applications. I love creating beautiful, functional, and user-friendly 
            interfaces that solve real problems. When I'm not coding, you can find me 
            exploring new technologies or contributing to open source projects.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div 
                key={project.id}
                className={`bg-gradient-to-br ${project.color} rounded-2xl p-6 cursor-pointer hover:scale-105 transition`}
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <div className="flex gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 bg-white/20 rounded text-white text-sm">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span key={skill} className="px-4 py-2 bg-white/10 text-white rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-8 bg-black/20">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-white/60 mb-8">I'm always open to new opportunities and collaborations.</p>
          <a href="mailto:hello@example.com" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold inline-block">
            Say Hello 👋
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/40 border-t border-white/10">
        <p>© 2024 Portfolio Template • Built with React & Tailwind</p>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;
