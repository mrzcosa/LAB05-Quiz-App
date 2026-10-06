type AnswerOptionProps = {
  option: string
  isSelected: boolean
  onSelect: (option: string) => void
}

export function AnswerOption({ option, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <label className={`answer-option ${isSelected ? 'selected' : ''}`}>
      <input
        type="radio"
        name="answer-option"
        checked={isSelected}
        onChange={() => onSelect(option)}
      />
      <span>{option}</span>
    </label>
  )
}
