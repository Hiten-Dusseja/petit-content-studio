import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject, regenerateSection, regenerateImage, publishProject, addImage } from '../services/mockData';
import StatusBadge from '../components/StatusBadge';
import GenerationProgress from '../components/GenerationProgress';
import ImageAssetLibrary from '../components/ImageAssetLibrary';
import ImageUploader from '../components/ImageUploader';
import SeoPreview from '../components/SeoPreview';
import PublishChecklist from '../components/PublishChecklist';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(getProject(id));
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishConfirmed, setPublishConfirmed] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);

  useEffect(() => {
    if (!project) return;
    // Check if sensitive domain (healthcare/legal)
    if (project.domain === 'healthcare' || project.domain === 'legal') {
      setShowSensitiveWarning(true);
    }
    // Refresh from mock data periodically during generation
    if (project.status === 'generating') {
      const interval = setInterval(() => {
        const refreshed = getProject(id);
        if (refreshed) {
          setProject(refreshed);
          if (refreshed.status !== 'generating') clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [id, project?.status, project?.domain]);

  if (!project) {
    return (
      <div className="project-detail">
        <div className="empty-state">
          <h3>Project not found</h3>
          <p>The project you're looking for doesn't exist.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  const handleEdit = (field, value) => {
    updateProject(project.id, { [field]: value });
    setProject(prev => ({ ...prev, [field]: value }));
    setEditing(null);
  };

  const startEdit = (field, currentValue) => {
    setEditing(field);
    setEditValue(currentValue || '');
  };

  const handleRegenerateSection = (sectionId) => {
    regenerateSection(project.id, sectionId);
    // Simulate update
    setProject(prev => ({ ...prev }));
  };

  const handleRegenerateImage = (imageId) => {
    regenerateImage(project.id, imageId);
    setProject(prev => ({ ...prev }));
  };

  const handleRemoveImage = (imageId) => {
    const updated = updateProject(project.id, {
      images: project.images.filter(i => i.id !== imageId),
    });
    if (updated) setProject(updated);
  };

  const handleAddImage = (img) => {
    addImage(project.id, { ...img, id: undefined });
      setProject(prev => getProject(project.id));
  };

  const handleToggleChecklist = (key) => {
    const updated = updateProject(project.id, {
      checklist: { ...project.checklist, [key]: !project.checklist[key] },
    });
    if (updated) setProject(updated);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const result = publishProject(project.id);
      if (result) {
        setProject(result);
        setPublishSuccess(true);
      }
      setIsPublishing(false);
    }, 1500);
  };

  const isGenerating = project.status === 'generating';
  const isDraft = project.status === 'draft';
  const isPublished = project.status === 'published';
  const domainSensitive = project.domain === 'healthcare' || project.domain === 'legal';
  const canPublish = isDraft && project.checklist?.content && project.checklist?.images &&
    project.checklist?.seo && project.checklist?.brand && project.checklist?.ready;

  return (
    <div className="project-detail">
      <div className="detail-nav">
        <button className="btn-ghost" onClick={() => navigate('/')}>
          &larr; Back to Dashboard
        </button>
        <div className="detail-nav-right">
          <StatusBadge status={project.status} />
          {isPublished && project.publishUrl && (
            <a href={project.publishUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none' }}>
              View Published
            </a>
          )}
        </div>
      </div>

      {isGenerating && project.generationProgress && (
        <GenerationProgress progress={project.generationProgress} />
      )}

      {showSensitiveWarning && domainSensitive && (
        <div className="sensitive-warning">
          <strong>Content Advisory:</strong> This article covers a {project.domainLabel.toLowerCase()} topic.
          All factual claims, statistics, and recommendations should be reviewed by a qualified professional before publication.
        </div>
      )}

      <div className="detail-layout">
        <div className="detail-main">
          {/* Title */}
          <div className="detail-title-section">
            {editing === 'title' ? (
              <div className="inline-edit">
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleEdit('title', editValue)}
                  autoFocus
                />
                <div className="inline-edit-actions">
                  <button className="btn-primary" onClick={() => handleEdit('title', editValue)}>Save</button>
                  <button className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <h1 className="detail-title" onClick={() => isDraft && startEdit('title', project.title)}>
                {project.title || 'Untitled Article'}
                {isDraft && <span className="edit-hint">Click to edit</span>}
              </h1>
            )}
            <div className="detail-meta">
              <span>{project.domainLabel}</span>
              <span>{project.tone}</span>
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              {project.wordCount > 0 && <span>{project.wordCount.toLocaleString()} words</span>}
            </div>
          </div>

          {/* Article Content */}
          {project.body && (
            <div className="detail-content card">
              {/* Hero Image */}
              {project.images.filter(i => i.section === 'hero').length > 0 && (
                <div className="detail-hero">
                  <img
                    src={project.images.find(i => i.section === 'hero')?.url}
                    alt={project.images.find(i => i.section === 'hero')?.alt || ''}
                  />
                  {isDraft && (
                    <button className="btn-ghost hero-edit-btn" onClick={() => handleRegenerateImage(project.images.find(i => i.section === 'hero')?.id)}>
                      Regenerate Hero
                    </button>
                  )}
                </div>
              )}

              {/* Sections */}
              {project.sections.length > 0 ? (
                project.sections.map((section, idx) => (
                  <div key={section.id} className="detail-section">
                    {editing === `heading-${section.id}` ? (
                      <div className="inline-edit">
                        <input
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleEdit(`sections`, project.sections.map((s, i) => i === idx ? { ...s, heading: editValue } : s))}
                          autoFocus
                        />
                        <div className="inline-edit-actions">
                          <button className="btn-primary" onClick={() => {
                            const updated = project.sections.map((s, i) => i === idx ? { ...s, heading: editValue } : s);
                            updateProject(project.id, { sections: updated });
                            setProject(prev => ({ ...prev, sections: updated }));
                            setEditing(null);
                          }}>Save</button>
                          <button className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <h2 className="section-heading" onClick={() => isDraft && startEdit(`heading-${section.id}`, section.heading)}>
                        {section.heading}
                        {isDraft && <span className="edit-hint">Edit</span>}
                      </h2>
                    )}

                    {section.paragraphs.map((para, pi) => (
                      editing === `para-${section.id}-${pi}` ? (
                        <div className="inline-edit" key={pi}>
                          <textarea
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            rows={3}
                            autoFocus
                          />
                          <div className="inline-edit-actions">
                            <button className="btn-primary" onClick={() => {
                              const updated = project.sections.map((s, i) => i === idx ? { ...s, paragraphs: s.paragraphs.map((p, j) => j === pi ? editValue : p) } : s);
                              updateProject(project.id, { sections: updated });
                              setProject(prev => ({ ...prev, sections: updated }));
                              setEditing(null);
                            }}>Save</button>
                            <button className="btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p key={pi} className="section-para" onClick={() => isDraft && startEdit(`para-${section.id}-${pi}`, para)}>
                          {para}
                          {isDraft && <span className="edit-hint">Edit</span>}
                        </p>
                      )
                    ))}

                    {/* Inline images for this section */}
                    {project.images.filter(i => i.section === section.id && i.status === 'ready').length > 0 && (
                      <div className="inline-images">
                        {project.images.filter(i => i.section === section.id && i.status === 'ready').map(img => (
                          <div key={img.id} className="inline-image">
                            <img src={img.url} alt={img.alt} />
                            {isDraft && (
                              <button className="btn-ghost inline-image-btn" onClick={() => handleRegenerateImage(img.id)}>
                                Regenerate
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {isDraft && (
                      <div className="section-actions">
                        <button className="btn-ghost" style={{ fontSize: '0.8125rem' }} onClick={() => handleRegenerateSection(section.id)}>
                          Regenerate Section
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ padding: '2rem' }}>
                  <p>{isGenerating ? 'Article content is being generated...' : 'No content yet. Generate the article to see it here.'}</p>
                </div>
              )}
            </div>
          )}

          {!project.body && !isGenerating && (
            <div className="empty-state card" style={{ padding: '3rem' }}>
              <h3>No content generated yet</h3>
              <p style={{ marginBottom: '1rem' }}>This project has no article body. Generate content from the creation form.</p>
            </div>
          )}
        </div>

        <div className="detail-sidebar">
          {/* SEO Preview */}
          {project.metaTitle && (
            <SeoPreview
              metaTitle={project.metaTitle}
              metaDescription={project.metaDescription}
              slug={project.slug}
              primaryKeyword={project.primaryKeyword}
              wordCount={project.wordCount}
            />
          )}

          {/* Image Asset Library */}
          {isDraft && (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <ImageUploader onAdd={handleAddImage} />
            </div>
          )}
          <ImageAssetLibrary
            images={project.images}
            onRegenerate={handleRegenerateImage}
            onRemove={handleRemoveImage}
          />

          {/* Publish Checklist */}
          {isDraft && (
            <PublishChecklist
              checklist={project.checklist}
              onToggle={handleToggleChecklist}
            />
          )}

          {/* Publish Button */}
          {isDraft && (
            <div className="publish-section">
              {!publishConfirmed ? (
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.875rem', fontSize: '1rem' }}
                  disabled={!canPublish}
                  onClick={() => setPublishConfirmed(true)}
                >
                  {canPublish ? 'Ready to Publish' : 'Complete Checklist to Publish'}
                </button>
              ) : (
                <div className="publish-confirm">
                  <p>Are you sure you want to publish this article?</p>
                  <div className="publish-confirm-actions">
                    <button
                      className="btn-primary"
                      disabled={isPublishing}
                      onClick={handlePublish}
                    >
                      {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
                    </button>
                    <button className="btn-ghost" onClick={() => setPublishConfirmed(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {publishSuccess && (
            <div className="publish-success card">
              <h4>Published Successfully</h4>
              <p>Your article has been published.</p>
              {project.publishUrl && (
                <a href={project.publishUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-block', marginTop: '0.75rem', textDecoration: 'none' }}>
                  View Published Article
                </a>
              )}
            </div>
          )}

          {/* Sensitive domain disclaimer */}
          {(project.domain === 'healthcare' || project.domain === 'legal') && (
            <div className="card" style={{ marginTop: '1rem', borderLeft: `3px solid var(--warning)` }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <strong>Content disclaimer:</strong> This article covers {project.domainLabel.toLowerCase()} topics.
                All factual claims, medical statements, legal interpretations, and statistical data should be independently verified
                by a qualified professional before publication. This content is AI-generated and may contain inaccuracies.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}