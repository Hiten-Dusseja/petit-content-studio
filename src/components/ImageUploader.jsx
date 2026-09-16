import { useState } from 'react';
import './ImageUploader.css';

export default function ImageUploader({ onAdd }) {
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onAdd?.({
          url: ev.target.result,
          alt: file.name,
          type: 'uploaded',
          section: 'hero',
          status: 'ready',
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    onAdd?.({
      url: urlInput.trim(),
      alt: 'User uploaded image',
      type: 'uploaded',
      section: 'hero',
      status: 'ready',
    });
    setUrlInput('');
    setShowUrlInput(false);
  };

  return (
    <div className="image-uploader">
      <div className="uploader-actions">
        <label className="btn-outline upload-btn" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload Files
          <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
        <button className="btn-outline" onClick={() => setShowUrlInput(!showUrlInput)}>
          Add Image URL
        </button>
      </div>
      {showUrlInput && (
        <div className="uploader-url-form">
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleUrlAdd()}
          />
          <button className="btn-primary" onClick={handleUrlAdd}>Add</button>
          <button className="btn-ghost" onClick={() => setShowUrlInput(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}