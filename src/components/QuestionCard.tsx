import { AnswerOption } from './AnswerOption'

type QuestionBase = {
  id: number
  text: string
  correctAnswer: string
}

export type Question = QuestionBase &
  (
    | { answerType: 'text' }
    | { answerType: 'multiple-choice'; choices: string[] }
  )

type QuestionCardProps = {
  question: Question
  questionNumber: number
  selectedAnswer: string | null
  onSelect: (answer: string) => void
  onNext: () => void
  isLastQuestion: boolean
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelect,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <div className="question-card">
      <div className="question-topbar">
        <span className="question-badge">Question {questionNumber}</span>
        <span className="question-points">10 pts</span>
      </div>

      <h2>{question.text}</h2>

      {question.answerType === 'text' ? (
        <div className="answer-list">
          <label className="text-answer-field">
            <span>Your answer</span>
            <input
              className="answer-text-input"
              type="text"
              value={selectedAnswer ?? ''}
              onChange={(event) => onSelect(event.target.value)}
              placeholder="Type your answer here"
              autoComplete="off"
            />
          </label>
        </div>
      ) : (
        <div className="answer-list">
          {question.choices.map((choice) => (
            <AnswerOption
              key={choice}
              option={choice}
              isSelected={selectedAnswer === choice}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}

      <div className="navigation-row">
        <button
          type="button"
          className="primary-button next-button"
          onClick={onNext}
          disabled={!selectedAnswer?.trim()}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}
