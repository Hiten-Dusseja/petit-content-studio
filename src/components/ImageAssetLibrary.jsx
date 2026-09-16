import './ImageAssetLibrary.css';

export default function ImageAssetLibrary({ images = [], onRegenerate, onRemove }) {
  if (!images.length) {
    return (
      <div className="asset-lib">
        <h4>Image Assets</h4>
        <div className="empty-state" style={{ padding: '2rem 1rem' }}>
          <p style={{ fontSize: '0.9375rem' }}>No images yet. Upload or generate images for this article.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-lib">
      <h4>Image Assets ({images.length})</h4>
      <div className="asset-grid">
        {images.map(img => (
          <div key={img.id} className={`asset-card ${img.status === 'failed' ? 'failed' : ''}`}>
            <div className="asset-preview">
              {img.status === 'generating' ? (
                <div className="asset-loading">
                  <span className="spinner" />
                  <span>Generating...</span>
                </div>
              ) : img.status === 'failed' ? (
                <div className="asset-failed">
                  <span>Generation failed</span>
                </div>
              ) : (
                <img src={img.url} alt={img.alt} />
              )}
            </div>
            <div className="asset-info">
              <span className="asset-type">{img.type === 'uploaded' ? 'Uploaded' : 'AI Generated'}</span>
              <span className="asset-section">Section: {img.section === 'hero' ? 'Hero' : img.section}</span>
              <span className={`asset-status ${img.status}`}>{img.status}</span>
            </div>
            <div className="asset-actions">
              {img.status === 'ready' && (
                <button className="btn-ghost" style={{ fontSize: '0.8125rem' }} onClick={() => onRegenerate?.(img.id)}>
                  Regenerate
                </button>
              )}
              {img.status === 'failed' && (
                <button className="btn-ghost" style={{ fontSize: '0.8125rem', color: 'var(--primary)' }} onClick={() => onRegenerate?.(img.id)}>
                  Retry
                </button>
              )}
              <button className="btn-ghost" style={{ fontSize: '0.8125rem', color: 'var(--error)' }} onClick={() => onRemove?.(img.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}