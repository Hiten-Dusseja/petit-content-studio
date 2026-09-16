import './GenerationProgress.css';

const steps = [
  { key: 'outline', label: 'Generating outline' },
  { key: 'writing', label: 'Writing article' },
  { key: 'images', label: 'Creating images' },
  { key: 'complete', label: 'Ready for review' },
];

const stepOrder = ['outline', 'writing', 'images', 'complete'];

export default function GenerationProgress({ progress }) {
  if (!progress) return null;
  const currentIndex = stepOrder.indexOf(progress.step);

  return (
    <div className="gen-progress">
      <div className="gen-progress-bar">
        <div className="gen-progress-fill" style={{ width: `${progress.progress}%` }} />
      </div>
      <p className="gen-progress-message">{progress.message}</p>
      <div className="gen-steps">
        {steps.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className={`gen-step ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              <div className="gen-step-circle">
                {done ? '✓' : i + 1}
              </div>
              <span className="gen-step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}