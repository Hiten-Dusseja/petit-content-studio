export default function StatusBadge({ status }) {
  const classMap = {
    draft: 'badge-draft',
    published: 'badge-published',
    generating: 'badge-generating',
    failed: 'badge-failed',
  };
  const labelMap = {
    draft: 'Draft',
    published: 'Published',
    generating: 'Generating',
    failed: 'Failed',
  };

  return (
    <span className={`badge ${classMap[status] || 'badge-draft'}`}>
      {status === 'generating' && <span className="spinner" style={{ width: 12, height: 12, marginRight: 6 }} />}
      {labelMap[status] || status}
    </span>
  );
}