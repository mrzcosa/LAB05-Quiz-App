type ProgressBarProps = {
  current: number
  total: number
  timeLeft: number
}

export function ProgressBar({ current, total, timeLeft }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : (current / total) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="progress-wrap" aria-label="Quiz progress">
      <div className="progress-header">
        <span>Question {current + 1}</span>
        <span className="progress-details">
          <span>{current}/{total}</span>
          <span className={`question-timer ${timeLeft <= 10 ? 'urgent' : ''}`} aria-live="polite">
            {minutes}:{String(seconds).padStart(2, '0')}
          </span>
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
