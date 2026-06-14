import { useMemo, useState } from 'react'
import { QUIZ_FALLBACK_QUESTIONS } from '../data/quizFallback.js'

const QUIZ_HISTORY_KEY = 'awaaz-quiz-recent-questions'
const QUIZ_HISTORY_LIMIT = 12

function getResultMessage(score) {
  if (score <= 2) return 'Civic beginner — start with Learn.'
  if (score <= 4) return "You're getting civic aware."
  return 'Awaaz activated.'
}

function getSourceLabel(source) {
  return source === 'ai' ? 'Quiz source: AI-generated' : 'Quiz source: fallback questions'
}

function readRecentQuizQuestions() {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(QUIZ_HISTORY_KEY)
    const parsed = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string').slice(0, QUIZ_HISTORY_LIMIT) : []
  } catch {
    return []
  }
}

function saveRecentQuizQuestions(questions) {
  if (typeof window === 'undefined' || !Array.isArray(questions)) return

  const nextQuestions = questions
    .map((question) => (typeof question?.question === 'string' ? question.question.trim() : ''))
    .filter(Boolean)

  if (nextQuestions.length === 0) return

  const merged = [...nextQuestions, ...readRecentQuizQuestions()]
  const unique = [...new Set(merged)].slice(0, QUIZ_HISTORY_LIMIT)

  try {
    window.localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(unique))
  } catch {
    // Ignore storage write issues and keep quiz usable.
  }
}

async function fetchQuizQuestions() {
  try {
    const excludeQuestions = readRecentQuizQuestions()
    const response = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ excludeQuestions }),
    })

    if (!response.ok) {
      throw new Error(`Quiz request failed with status ${response.status}`)
    }

    const data = await response.json()

    console.info('Quiz /api/generate-quiz response', {
      ok: response.ok,
      source: data?.source ?? 'unknown',
      reason: data?.reason ?? null,
      questionCount: Array.isArray(data?.questions) ? data.questions.length : 0,
    })

    if (Array.isArray(data?.questions) && data.questions.length === 5) {
      saveRecentQuizQuestions(data.questions)

      return {
        questions: data.questions,
        source: data?.source === 'ai' ? 'ai' : 'fallback',
      }
    }
  } catch (error) {
    console.error('Quiz generation request failed:', {
      message: error instanceof Error ? error.message : String(error),
    })
  }

  return {
    questions: QUIZ_FALLBACK_QUESTIONS,
    source: 'fallback',
  }
}

export default function Quiz() {
  const [started, setStarted] = useState(false)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [questions, setQuestions] = useState(QUIZ_FALLBACK_QUESTIONS)
  const [quizSource, setQuizSource] = useState('fallback')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const isFinished = started && currentIndex >= totalQuestions
  const progressCount = isFinished ? totalQuestions : started ? currentIndex + 1 : 0
  const progress = totalQuestions > 0 ? (progressCount / totalQuestions) * 100 : 0

  const feedback = useMemo(() => {
    if (!submitted || !currentQuestion) return null

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    return {
      isCorrect,
      label: isCorrect ? 'Correct' : 'Incorrect',
      explanation: currentQuestion.explanation,
    }
  }, [submitted, selectedAnswer, currentQuestion])

  async function startNewQuiz() {
    setLoadingQuiz(true)
    setStarted(false)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setScore(0)

    const result = await fetchQuizQuestions()

    setQuestions(result.questions)
    setQuizSource(result.source)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setScore(0)
    setStarted(true)
    setLoadingQuiz(false)
  }

  function handleSelect(option) {
    if (submitted) return
    setSelectedAnswer(option)
  }

  function handleSubmitAnswer() {
    if (!selectedAnswer || !currentQuestion || submitted) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    setSubmitted(true)

    if (isCorrect) {
      setScore((current) => current + 1)
    }
  }

  function handleNextQuestion() {
    const nextIndex = currentIndex + 1
    setCurrentIndex(nextIndex)
    setSelectedAnswer(null)
    setSubmitted(false)
  }

  return (
    <div className="quiz-page page-wrap">
      <div className="page-header">
        <p className="page-eyebrow">Test Yourself</p>
        <h1 className="page-title">
          Civic <span className="page-title-accent">Quiz</span>
        </h1>
        <p className="page-sub">5 questions. How well do you know your rights?</p>
      </div>

      <div className="quiz-progress-bar-wrap">
        <div className="quiz-progress-label">
          <span>Progress</span>
          <span>{progressCount} / {totalQuestions}</span>
        </div>
        <div className="quiz-progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {!started && !loadingQuiz && (
        <>
          <div className="quiz-question-card" id="quiz-question-card">
            <p className="quiz-q-number">Ready?</p>
            <p className="quiz-question">Start the quiz to get 5 civic questions and test yourself one by one.</p>
          </div>

          <button
            id="quiz-start-btn"
            className="quiz-start-btn"
            onClick={startNewQuiz}
            type="button"
          >
            Start Quiz ▶
          </button>

          <p className="quiz-helper-text">
            Fresh questions are generated when available · Static questions stay as fallback
          </p>
        </>
      )}

      {loadingQuiz && (
        <div className="quiz-question-card quiz-loading-card">
          <p className="quiz-q-number">Loading</p>
          <p className="quiz-question">Generating your civic quiz…</p>
          <p className="quiz-results-sub">Awaaz is preparing 5 civic questions for you.</p>
        </div>
      )}

      {started && !loadingQuiz && (
        <p className="quiz-source-label">{getSourceLabel(quizSource)}</p>
      )}

      {started && !loadingQuiz && !isFinished && currentQuestion && (
        <>
          <div className="quiz-question-card" id="quiz-question-card">
            <p className="quiz-q-number">
              Question {currentIndex + 1} of {totalQuestions}
              <span className="quiz-category-pill">{currentQuestion.category}</span>
            </p>
            <p className="quiz-question">{currentQuestion.question}</p>

            <div className="quiz-options" role="group" aria-label="Answer options">
              {currentQuestion.options.map((option, index) => {
                const letter = String.fromCharCode(65 + index)
                const isSelected = selectedAnswer === option
                const isCorrectOption = submitted && option === currentQuestion.correctAnswer
                const isWrongSelected = submitted && isSelected && option !== currentQuestion.correctAnswer

                let optionClassName = 'quiz-option'
                if (isSelected) optionClassName += ' quiz-option-selected'
                if (isCorrectOption) optionClassName += ' quiz-option-correct'
                if (isWrongSelected) optionClassName += ' quiz-option-incorrect'

                return (
                  <button
                    key={option}
                    id={`quiz-option-${letter.toLowerCase()}`}
                    className={optionClassName}
                    disabled={submitted}
                    aria-pressed={isSelected}
                    onClick={() => handleSelect(option)}
                    type="button"
                  >
                    <span className="quiz-option-letter">{letter}</span>
                    {option}
                  </button>
                )
              })}
            </div>

            {feedback && (
              <div className={`quiz-feedback ${feedback.isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-incorrect'}`}>
                <p className="quiz-feedback-label">{feedback.label}</p>
                <p className="quiz-feedback-text">{feedback.explanation}</p>
              </div>
            )}
          </div>

          {!submitted ? (
            <button
              id="quiz-submit-btn"
              className="quiz-start-btn"
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              type="button"
              style={{ opacity: selectedAnswer ? 1 : 0.45 }}
            >
              Check Answer
            </button>
          ) : (
            <button
              id="quiz-next-btn"
              className="quiz-start-btn"
              onClick={handleNextQuestion}
              type="button"
            >
              {currentIndex === totalQuestions - 1 ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </>
      )}

      {started && !loadingQuiz && isFinished && (
        <>
          <p className="quiz-source-label">{getSourceLabel(quizSource)}</p>

          <div className="quiz-question-card quiz-results-card">
            <p className="quiz-q-number">Final Score</p>
            <p className="quiz-results-score">{score} / {totalQuestions}</p>
            <p className="quiz-results-message">{getResultMessage(score)}</p>
            <p className="quiz-results-sub">
              {score === totalQuestions
                ? 'You nailed all five. Keep that civic energy going.'
                : 'Try again to get a fresh quiz or head to Learn to build more confidence.'}
            </p>
          </div>

          <button
            id="quiz-try-again-btn"
            className="quiz-start-btn"
            onClick={startNewQuiz}
            type="button"
          >
            Try Again
          </button>
        </>
      )}

      <div style={{ paddingBottom: '24px' }} />
    </div>
  )
}
