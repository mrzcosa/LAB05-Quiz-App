type QuizHeaderProps = {
  title: string
  subtitle: string
}

export function QuizHeader({ title, subtitle }: QuizHeaderProps) {
  return (
    <header className="quiz-header">
      <p className="eyebrow">Quiz Challenge</p>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  )
}
