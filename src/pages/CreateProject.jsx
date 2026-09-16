import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { domains, tones, lengths, createProject, updateProject } from '../services/mockData';
import ImageUploader from '../components/ImageUploader';
import './CreateProject.css';

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    domain: 'home-services',
    tone: 'professional',
    length: 'standard',
    targetAudience: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    companyWebsite: '',
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleAddImage = (img) => {
    setImages(prev => [...prev, img]);
  };

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.primaryKeyword.trim()) errs.primaryKeyword = 'Primary keyword is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;

    // Simulate generating the project
    const project = createProject({
      title: form.title,
      domain: form.domain,
      tone: form.tone,
      length: form.length,
      targetAudience: form.targetAudience || 'General audience',
      primaryKeyword: form.primaryKeyword,
      secondaryKeywords: form.secondaryKeywords ? form.secondaryKeywords.split(',').map(s => s.trim()) : [],
      companyWebsite: form.companyWebsite || '',
      images,
    });

    // Simulate generation progress
    let progress = 5;
    const steps = ['outline', 'writing', 'images', 'complete'];
    let stepIdx = 0;
    const messages = ['Generating outline...', 'Writing article...', 'Creating images...', 'Finalizing...'];
    const msgs = [50, 80, 100, 100];
    const intervals = [800, 1200, 1000, 600];

    const tick = () => {
      if (stepIdx >= steps.length) return;
      progress = msgs[stepIdx];
      const projectUpdate = {
        generationProgress: { step: steps[stepIdx], message: messages[stepIdx], progress },
        ...(stepIdx === 3 ? {
          status: 'draft',
          wordCount: 1500,
          body: 'Article content generated.',
          sections: [],
          metaTitle: form.title,
          metaDescription: `Learn about ${form.primaryKeyword} — a comprehensive guide for homeowners.`,
          generationProgress: undefined,
        } : {}),
        ...(steps[stepIdx] === 'images' ? {
          images: [
            ...images,
            { id: 'gen-img-1', url: 'https://petittheatingandcooling.com/wp-content/uploads/2026/01/Home-Solutions-Team-1024x683.jpg', alt: 'Generated hero image', type: 'ai-generated', section: 'hero', status: 'ready' },
            { id: 'gen-img-2', url: 'https://petittheatingandcooling.com/wp-content/uploads/2026/01/Petitt_ServiceMap-1024x1024.png', alt: 'Generated section image', type: 'ai-generated', section: 'sec-1', status: 'ready' },
          ],
        } : {}),
      };
      // Update the project (we're using the mock data's in-memory state)
      updateProject(project.id, projectUpdate);
      stepIdx++;
      if (stepIdx < steps.length) {
        setTimeout(tick, intervals[stepIdx - 1]);
      } else if (progress >= 100) {
        navigate(`/project/${project.id}`);
      }
    };
    setTimeout(tick, intervals[0]);

    // Navigate to the project page to show progress
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="create-project">
      <h1>New Project</h1>
      <p className="create-subtitle">Enter your article brief and generate content with AI.</p>

      <div className="create-layout">
        <div className="create-form card">
          <div className="form-section">
            <label htmlFor="title">Article Title *</label>
            <input
              id="title"
              placeholder="e.g. The Importance of Regular HVAC Maintenance"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="form-section">
              <label htmlFor="domain">Domain</label>
              <select id="domain" value={form.domain} onChange={e => handleChange('domain', e.target.value)}>
                {domains.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div className="form-section">
              <label htmlFor="tone">Tone</label>
              <select id="tone" value={form.tone} onChange={e => handleChange('tone', e.target.value)}>
                {tones.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div className="form-section">
              <label htmlFor="length">Length</label>
              <select id="length" value={form.length} onChange={e => handleChange('length', e.target.value)}>
                {lengths.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="audience">Target Audience</label>
            <input
              id="audience"
              placeholder="e.g. Homeowners in Middle Tennessee"
              value={form.targetAudience}
              onChange={e => handleChange('targetAudience', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-section">
              <label htmlFor="keyword">Primary Keyword *</label>
              <input
                id="keyword"
                placeholder="e.g. HVAC maintenance"
                value={form.primaryKeyword}
                onChange={e => handleChange('primaryKeyword', e.target.value)}
              />
              {errors.primaryKeyword && <span className="field-error">{errors.primaryKeyword}</span>}
            </div>
            <div className="form-section">
              <label htmlFor="seckeywords">Secondary Keywords</label>
              <input
                id="seckeywords"
                placeholder="Comma-separated"
                value={form.secondaryKeywords}
                onChange={e => handleChange('secondaryKeywords', e.target.value)}
              />
            </div>
          </div>

          <div className="form-section">
            <label htmlFor="website">Company Website</label>
            <input
              id="website"
              placeholder="https://example.com"
              value={form.companyWebsite}
              onChange={e => handleChange('companyWebsite', e.target.value)}
            />
            <small style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
              Optional. Used as context for brand-aware generation.
            </small>
          </div>

          <div className="form-section">
            <label>Upload Images</label>
            <ImageUploader onAdd={handleAddImage} />
            {images.length > 0 && (
              <div className="create-image-list">
                {images.map((img, i) => (
                  <div key={i} className="create-image-item">
                    <img src={img.url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{img.type}</span>
                    <button className="btn-ghost" style={{ color: 'var(--error)', fontSize: '0.8125rem' }} onClick={() => handleRemoveImage(i)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button className="btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }} onClick={handleGenerate}>
              Generate Article
            </button>
          </div>
        </div>

        <div className="create-sidebar">
          <div className="card">
            <h4>How it works</h4>
            <ol style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.25rem' }}>
              <li>Enter your article brief</li>
              <li>Select domain and tone</li>
              <li>Add keywords for SEO</li>
              <li>Upload images or provide URLs</li>
              <li>Generate article + images</li>
              <li>Review, edit, and publish</li>
            </ol>
          </div>
          <div className="card" style={{ marginTop: '1rem' }}>
            <h4>Domain safeguards</h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Healthcare and Legal domains include content disclaimers. Always review generated claims for accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}