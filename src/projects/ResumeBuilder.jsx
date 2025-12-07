import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResumeBuilder = () => {
  const [resume, setResume] = useState({
    personal: { name: 'John Doe', title: 'Software Developer', email: 'john@example.com', phone: '555-1234', location: 'New York, NY' },
    summary: 'Experienced software developer with 5+ years of experience in web development.',
    experience: [
      { id: 1, company: 'Tech Corp', title: 'Senior Developer', period: '2020-Present', description: 'Led development of key features' }
    ],
    education: [
      { id: 1, school: 'State University', degree: 'BS Computer Science', year: '2018' }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
  });
  const [activeSection, setActiveSection] = useState('personal');
  const [newSkill, setNewSkill] = useState('');

  const updatePersonal = (field, value) => {
    setResume({ ...resume, personal: { ...resume.personal, [field]: value } });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { id: Date.now(), company: '', title: '', period: '', description: '' }]
    });
  };

  const updateExperience = (id, field, value) => {
    setResume({
      ...resume,
      experience: resume.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setResume({ ...resume, skills: [...resume.skills, newSkill] });
    setNewSkill('');
  };

  const removeSkill = (skill) => {
    setResume({ ...resume, skills: resume.skills.filter(s => s !== skill) });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📄 Resume Builder</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            {/* Section Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['personal', 'summary', 'experience', 'education', 'skills'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-3 py-1 rounded-lg capitalize ${
                    activeSection === section ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Personal */}
            {activeSection === 'personal' && (
              <div className="space-y-3">
                {Object.entries(resume.personal).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-white/60 text-sm capitalize mb-1">{key}</label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updatePersonal(key, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Summary */}
            {activeSection === 'summary' && (
              <textarea
                value={resume.summary}
                onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                rows="4"
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 resize-none"
              />
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
              <div className="space-y-4">
                {resume.experience.map(exp => (
                  <div key={exp.id} className="bg-white/10 rounded-lg p-3 space-y-2">
                    <input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-2 py-1 rounded bg-white/20 text-white" />
                    <input placeholder="Title" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className="w-full px-2 py-1 rounded bg-white/20 text-white" />
                    <input placeholder="Period" value={exp.period} onChange={(e) => updateExperience(exp.id, 'period', e.target.value)} className="w-full px-2 py-1 rounded bg-white/20 text-white" />
                    <textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full px-2 py-1 rounded bg-white/20 text-white resize-none" rows="2" />
                  </div>
                ))}
                <button onClick={addExperience} className="w-full py-2 bg-white/20 text-white rounded-lg">+ Add Experience</button>
              </div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resume.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-teal-500/30 text-teal-300 rounded-full flex items-center gap-2">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="text-red-400">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                  <button onClick={addSkill} className="px-4 py-2 bg-teal-500 text-white rounded-lg">Add</button>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 shadow-xl text-gray-800">
            <div className="border-b-2 border-teal-500 pb-4 mb-4">
              <h2 className="text-2xl font-bold">{resume.personal.name}</h2>
              <p className="text-teal-600">{resume.personal.title}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span>📧 {resume.personal.email}</span>
                <span>📱 {resume.personal.phone}</span>
                <span>📍 {resume.personal.location}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-teal-600 mb-2">Summary</h3>
              <p className="text-sm">{resume.summary}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-teal-600 mb-2">Experience</h3>
              {resume.experience.map(exp => (
                <div key={exp.id} className="mb-2">
                  <div className="font-medium">{exp.title} at {exp.company}</div>
                  <div className="text-sm text-gray-500">{exp.period}</div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-bold text-teal-600 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 rounded text-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
