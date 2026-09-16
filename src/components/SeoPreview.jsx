import './SeoPreview.css';

export default function SeoPreview({ metaTitle, metaDescription, slug, primaryKeyword, wordCount }) {
  return (
    <div className="seo-preview card">
      <h4 className="seo-title">SEO Preview</h4>
      <div className="seo-fields">
        <div className="seo-field">
          <label>Title</label>
          <p className="seo-value">{metaTitle || '—'}</p>
        </div>
        <div className="seo-field">
          <label>Meta Description</label>
          <p className="seo-value seo-desc">{metaDescription || '—'}</p>
        </div>
        <div className="seo-field">
          <label>URL Slug</label>
          <p className="seo-value">{slug || '—'}</p>
        </div>
        <div className="seo-field">
          <label>Primary Keyword</label>
          <p className="seo-value">{primaryKeyword || '—'}</p>
        </div>
        <div className="seo-field">
          <label>Word Count</label>
          <p className="seo-value">{wordCount ? `${wordCount} words` : '—'}</p>
        </div>
      </div>
    </div>
  );
}