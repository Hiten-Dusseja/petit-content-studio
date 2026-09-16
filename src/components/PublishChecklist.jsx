import './PublishChecklist.css';

const items = [
  { key: 'content', label: 'Content reviewed and approved' },
  { key: 'images', label: 'Images reviewed and placed correctly' },
  { key: 'seo', label: 'SEO fields reviewed' },
  { key: 'brand', label: 'Brand assets and terminology consistent' },
  { key: 'ready', label: 'Ready to publish' },
];

export default function PublishChecklist({ checklist = {}, onToggle }) {
  const allChecked = items.every(item => checklist[item.key]);
  const checkedCount = items.filter(item => checklist[item.key]).length;

  return (
    <div className="publish-checklist card">
      <div className="checklist-header">
        <h4>Publish Checklist</h4>
        <span className="checklist-count">{checkedCount} / {items.length}</span>
      </div>
      <div className="checklist-items">
        {items.map(item => (
          <label key={item.key} className="checklist-item">
            <input
              type="checkbox"
              checked={!!checklist[item.key]}
              onChange={() => onToggle?.(item.key)}
            />
            <span className="checkmark" />
            <span className="checklist-label">{item.label}</span>
          </label>
        ))}
      </div>
      {allChecked && (
        <p className="checklist-ready">All items checked. Ready to publish.</p>
      )}
    </div>
  );
}