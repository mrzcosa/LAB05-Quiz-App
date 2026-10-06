import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { ProgressBar } from './components/ProgressBar'
import { QuestionCard } from './components/QuestionCard'
import { QuizHeader } from './components/QuizHeader'
import { ResultCard } from './components/ResultCard'
import { questions } from './data/questions'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="page-shell home-page">
      <QuizHeader title="Web Development Quiz" subtitle="Prove Your Web Skills. Take on 10 fast paced questions and see how well you know the fundamentals." />

      <button type="button" className="primary-button" onClick={() => navigate('/quiz')}>
        Start Quiz
      </button>
    </main>
  )
}

function QuizPage() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Array<string | null>>(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(60)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleAdvance = useCallback((answer: string | null) => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentIndex] = answer
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      navigate('/result', { state: { answers: updatedAnswers } })
      return
    }

    setCurrentIndex((previousIndex) => previousIndex + 1)
    setSelectedAnswer(null)
    setTimeLeft(60)
  }, [answers, currentIndex, isLastQuestion, navigate])

  const handleAdvanceRef = useRef(handleAdvance)
  const selectedAnswerRef = useRef(selectedAnswer)

  useEffect(() => {
    handleAdvanceRef.current = handleAdvance
    selectedAnswerRef.current = selectedAnswer
  }, [handleAdvance, selectedAnswer])

  useEffect(() => {
    let secondsRemaining = 60
    const timer = window.setInterval(() => {
      secondsRemaining -= 1
      setTimeLeft(secondsRemaining)

      if (secondsRemaining === 0) {
        window.clearInterval(timer)
        handleAdvanceRef.current(selectedAnswerRef.current)
      }
    }, 1000)

    return () => window.clearInterval(timer)
  }, [currentIndex])

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (!selectedAnswer?.trim()) {
      return
    }

    handleAdvance(selectedAnswer)
  }

  return (
    <main className="page-shell quiz-page">
      <QuizHeader title="Quiz Time" subtitle="Type your answer or choose an option, then continue until you finish." />

      <section className="quiz-panel">
        <ProgressBar current={currentIndex} total={questions.length} timeLeft={timeLeft} />

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelectAnswer}
          onNext={handleNext}
          isLastQuestion={isLastQuestion}
        />
      </section>
    </main>
  )
}

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const answerState = (location.state as { answers?: Array<string | null> } | null)?.answers
  const answers = answerState ?? Array(questions.length).fill(null)

  const correctAnswers = questions.reduce((total, question, index) => {
    const userAnswer = answers[index]?.trim().toLocaleLowerCase()
    const correctAnswer = question.correctAnswer.trim().toLocaleLowerCase()

    return total + (userAnswer === correctAnswer ? 1 : 0)
  }, 0)

  const incorrectAnswers = questions.length - correctAnswers
  const percentage = Math.round((correctAnswers / questions.length) * 100)

  const handleRetake = () => {
    navigate('/quiz')
  }

  const handleHome = () => {
    navigate('/')
  }

  return (
    <main className="page-shell result-page">
      <QuizHeader title="Your Results" subtitle="Here is your final score for the web development quiz." />

      <ResultCard
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        percentage={percentage}
        score={correctAnswers}
        passed={percentage >= 50}
        onRetake={handleRetake}
        onHome={handleHome}
      />
    </main>
  )
}

export default App
