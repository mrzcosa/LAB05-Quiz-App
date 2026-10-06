type ResultCardProps = {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  percentage: number
  score: number
  passed: boolean
  onRetake: () => void
  onHome: () => void
}

export function ResultCard({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  percentage,
  score,
  passed,
  onRetake,
  onHome,
}: ResultCardProps) {
  const confettiColors = ['#2bb673', '#5b5ce6', '#f4c542', '#56b4e9', '#f06b78']

  return (
    <>
      {passed && (
        <div className="confetti-layer" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${(index * 37) % 100}%`,
                backgroundColor: confettiColors[index % confettiColors.length],
                animationDelay: `${(index % 8) * 0.12}s`,
                animationDuration: `${3.2 + (index % 4) * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

    <div className={`result-card ${passed ? 'passed' : 'failed'}`}>
      <div className="result-header">
        <p className="eyebrow">Final Results</p>
        <h2>{passed ? 'You Passed!' : 'Keep Practicing!'}</h2>
      </div>

      <div
        className={`score-ring ${passed ? 'passed' : 'failed'}`}
        aria-label={`Quiz score percentage: ${percentage}%, ${passed ? 'passed' : 'not passed'}`}
        style={{ '--percentage': percentage } as React.CSSProperties}
      >
        <span>{percentage}%</span>
      </div>

      <div className="score-grid">
        <div className="score-stat">
          <span className="label">Correct</span>
          <strong>{correctAnswers}</strong>
        </div>
        <div className="score-stat">
          <span className="label">Incorrect</span>
          <strong>{incorrectAnswers}</strong>
        </div>
        <div className="score-stat">
          <span className="label">Total</span>
          <strong>{totalQuestions}</strong>
        </div>
        <div className="score-stat accent">
          <span className="label">Score</span>
          <strong>{score}/{totalQuestions}</strong>
        </div>
      </div>

      <div className="result-actions">
        <button type="button" className="primary-button" onClick={onRetake}>
          Retake Quiz
        </button>
        <button type="button" className="secondary-button" onClick={onHome}>
          Return Home
        </button>
      </div>
    </div>
    </>
  )
}
