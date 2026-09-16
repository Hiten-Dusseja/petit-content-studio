import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, domains } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import './Dashboard.css';

const domainColors = {
  'home-services': '#eb0033',
  'saas': '#003388',
  'healthcare': '#16a34a',
  'legal': '#7c3aed',
};

export default function Dashboard() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Projects</h1>
          <p className="dashboard-subtitle">{projects.length} total projects</p>
        </div>
        <Link to="/create" className="btn-primary" style={{ textDecoration: 'none' }}>
          New Project
        </Link>
      </div>

      <div className="dashboard-filters">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="dashboard-search"
        />
        <div className="dashboard-tabs">
          {['all', 'draft', 'generating', 'published'].map(f => (
            <button
              key={f}
              className={`btn-ghost dashboard-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state card">
          <h3>No projects found</h3>
          <p>Create your first project to get started.</p>
          <Link to="/create" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Create a Project
          </Link>
        </div>
      ) : (
        <div className="project-grid">
          {filtered.map(project => (
            <Link to={`/project/${project.id}`} key={project.id} className="project-card card">
              <div className="project-card-header">
                <StatusBadge status={project.status} />
                <span className="project-date">
                  {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <div className="project-card-meta">
                <span className="project-domain" style={{ '--domain-color': domainColors[project.domain] || '#64748b' }}>
                  {project.domainLabel}
                </span>
                {project.wordCount > 0 && (
                  <span className="project-words">{project.wordCount.toLocaleString()} words</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}