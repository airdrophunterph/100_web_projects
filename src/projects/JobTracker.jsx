import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobTracker = () => {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('jobApplications');
    return saved ? JSON.parse(saved) : [];
  });
  const [newJob, setNewJob] = useState({ company: '', position: '', status: 'applied', date: '', notes: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  const statuses = [
    { id: 'applied', label: 'Applied', color: 'bg-blue-500' },
    { id: 'screening', label: 'Screening', color: 'bg-yellow-500' },
    { id: 'interview', label: 'Interview', color: 'bg-purple-500' },
    { id: 'offer', label: 'Offer', color: 'bg-green-500' },
    { id: 'rejected', label: 'Rejected', color: 'bg-red-500' },
  ];

  const addJob = (e) => {
    e.preventDefault();
    if (!newJob.company || !newJob.position) return;
    setJobs([{ ...newJob, id: Date.now(), date: newJob.date || new Date().toISOString().split('T')[0] }, ...jobs]);
    setNewJob({ company: '', position: '', status: 'applied', date: '', notes: '' });
  };

  const updateStatus = (id, status) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status } : j));
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

  const stats = statuses.map(s => ({ ...s, count: jobs.filter(j => j.status === s.id).length }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
      <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">💼 Job Application Tracker</h1>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {stats.map(s => (
            <div key={s.id} className={`${s.color} rounded-xl p-3 text-center`}>
              <div className="text-2xl font-bold text-white">{s.count}</div>
              <div className="text-white/80 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add Job Form */}
        <form onSubmit={addJob} className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company"
              value={newJob.company}
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <input
              type="text"
              placeholder="Position"
              value={newJob.position}
              onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <input
              type="date"
              value={newJob.date}
              onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            />
            <select
              value={newJob.status}
              onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30"
            >
              {statuses.map(s => <option key={s.id} value={s.id} className="bg-gray-800">{s.label}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg">+ Add Application</button>
        </form>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'all' ? 'bg-white text-gray-900' : 'bg-white/10 text-white'}`}
          >
            All ({jobs.length})
          </button>
          {statuses.map(s => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === s.id ? s.color + ' text-white' : 'bg-white/10 text-white'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-white/40 py-12">No applications yet</div>
          ) : (
            filteredJobs.map(job => {
              const status = statuses.find(s => s.id === job.status);
              return (
                <div key={job.id} className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg">{job.position}</h3>
                      <div className="text-white/60">{job.company}</div>
                    </div>
                    <button onClick={() => deleteJob(job.id)} className="text-red-400">🗑️</button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-white/40 text-sm">📅 {job.date}</span>
                    <select
                      value={job.status}
                      onChange={(e) => updateStatus(job.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg text-white text-sm ${status?.color}`}
                    >
                      {statuses.map(s => <option key={s.id} value={s.id} className="bg-gray-800">{s.label}</option>)}
                    </select>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default JobTracker;
